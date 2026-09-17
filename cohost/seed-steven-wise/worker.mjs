/**
 * One-off seeder for the co-hosted Steven Wise preview.
 *
 * The preview Worker serves artwork out of its own R2 bucket, so that bucket has
 * to be filled from the client account's bucket before the gallery renders. The
 * two buckets live in different Cloudflare accounts and R2 has no cross-account
 * copy, so the bytes have to travel through something.
 *
 * They travel through here rather than through the REST API on purpose: reading
 * an object with `GET /r2/buckets/{b}/objects/{key}` hands back a lossily decoded
 * string (a 21850-byte webp arrives as 21218 characters), which silently corrupts
 * every image. A Worker gets real `ArrayBuffer`s, so this runs at the edge and
 * pulls each object from the client site's public `/img/:key` route instead —
 * byte-for-byte identical to the object in the source bucket, and no R2
 * credentials for the client account are needed.
 *
 * Keys are content-addressed (sha256 of the bytes), so copying is idempotent: a
 * key that is already present is left alone, which makes this safe to re-run and
 * safe to call in batches after a partial failure.
 *
 * Deploy it, walk it with ?offset=, confirm /verify, then delete the Worker.
 * `limit` stays small because each pass issues one subrequest per object and the
 * free plan allows 50 per invocation.
 */

const SOURCE = "https://stevenfwise.com";

async function seed(env, offset, limit) {
	const { results } = await env.DB.prepare(
		"SELECT image_key, image_type FROM works ORDER BY id LIMIT ?1 OFFSET ?2",
	)
		.bind(limit, offset)
		.all();

	const out = [];
	for (const row of results) {
		const key = row.image_key;

		const existing = await env.BUCKET.head(key);
		if (existing) {
			out.push({ key, status: "exists", size: existing.size });
			continue;
		}

		const res = await fetch(`${SOURCE}/img/${key}`);
		if (!res.ok) {
			out.push({ key, status: "fetch-failed", code: res.status });
			continue;
		}

		const body = await res.arrayBuffer();
		await env.BUCKET.put(key, body, {
			httpMetadata: {
				contentType: res.headers.get("content-type") ?? row.image_type,
				cacheControl: "public, max-age=31536000, immutable",
			},
		});
		out.push({ key, status: "copied", size: body.byteLength });
	}

	return out;
}

/**
 * Compares the bucket against `works`, which is the only check that matters:
 * a gallery row whose object is missing renders a broken image.
 */
async function verify(env) {
	const { results } = await env.DB.prepare(
		"SELECT image_key FROM works ORDER BY id",
	).all();

	const missing = [];
	let bytes = 0;
	for (const row of results) {
		const head = await env.BUCKET.head(row.image_key);
		if (head) bytes += head.size;
		else missing.push(row.image_key);
	}

	return {
		works: results.length,
		present: results.length - missing.length,
		missing,
		bytes,
	};
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname === "/seed") {
			const offset = Number(url.searchParams.get("offset") ?? 0);
			const limit = Number(url.searchParams.get("limit") ?? 10);
			const results = await seed(env, offset, limit);
			const total = await env.DB.prepare(
				"SELECT COUNT(*) AS n FROM works",
			).first();
			return Response.json({
				offset,
				limit,
				totalWorks: total.n,
				copied: results.filter((r) => r.status === "copied").length,
				skipped: results.filter((r) => r.status === "exists").length,
				failed: results.filter((r) => r.status === "fetch-failed"),
				results,
			});
		}

		if (url.pathname === "/verify") {
			return Response.json(await verify(env));
		}

		return new Response("Use /seed?offset=&limit= or /verify\n", {
			status: 404,
		});
	},
};
