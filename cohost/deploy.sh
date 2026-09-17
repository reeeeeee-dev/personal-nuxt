#!/usr/bin/env bash
#
# Deploys the project sites that /projects embeds as live miniatures.
#
# The Projects page renders each project inside an iframe (MiniSitePreview). It
# deliberately does not point those iframes at the sites' production hostnames:
# two of the three are client-owned, and a portfolio page should not send its
# traffic to a client's origin, nor break when a client changes or retires their
# site. So every embeddable project is deployed a second time here, into my own
# Cloudflare account, and the page embeds that copy.
#
# Each site keeps its own wrangler.jsonc pointed at its own production domain.
# Those files are never touched. Instead a wrangler.cohost.jsonc is generated
# into the clone at deploy time, overriding three things:
#
#   - account_id  pinned to mine, so a co-host deploy can never land in a
#                 client's account (wrangler's autoconfig picks one of the seven
#                 accounts this login can see, which is how personal-nuxt once
#                 got uploaded into a client's account)
#   - routes      replaced with a subdomain of reetikpatel.me, so a co-host
#                 deploy can never bind the client's own hostname. These match
#                 the convention the other side projects already follow
#                 (job, now-playing, puracoco, arkanpute, cl, hackathon).
#   - workers_dev left enabled as a fallback origin if the custom domain is
#                 still provisioning
#
# Pura Coco is deliberately absent: it is already co-hosted at
# puracoco.reetikpatel.me by the `official-puracoco` Worker, deployed from its
# own repo. A second copy here would just be a duplicate.
#
# Usage:
#   ./cohost/deploy.sh                       # both
#   ./cohost/deploy.sh steven-wise           # a subset
#
set -euo pipefail

# Pinned on purpose; see above. Every generated config repeats this.
readonly ACCOUNT_ID=99b02cd48e530b9897b662a011131ab3

readonly HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly ROOT="$(cd "$HERE/.." && pwd)"
readonly WORK="$HERE/.work"

# personal-nuxt's own wrangler, so every co-host deploy uses one known version
# rather than whatever each site happens to pin.
readonly WRANGLER="$ROOT/node_modules/.bin/wrangler"

log() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }

# Clones on first run, fast-forwards afterwards, so re-running picks up whatever
# the site's default branch has since moved to.
sync_repo() {
	local slug="$1" dir="$WORK/$2"
	if [[ -d "$dir/.git" ]]; then
		log "$2: pulling"
		git -C "$dir" fetch --depth 1 origin HEAD
		git -C "$dir" reset --hard FETCH_HEAD
	else
		log "$2: cloning"
		mkdir -p "$WORK"
		gh repo clone "$slug" "$dir" -- --depth 1 --single-branch
	fi
}

deploy() { # $1=clone dir name
	log "$1: deploying"
	"$WRANGLER" deploy --config "$WORK/$1/wrangler.cohost.jsonc"
}

# Workers static assets reject any single file over 25 MiB, which a site that
# ships unoptimised source photography exceeds several times over.
#
# Re-encoded rather than excluded: these previews are live iframes, and a
# dropped asset renders as a broken image or a dead video player. Nothing
# visible is lost either, since the iframe renders at 1440px before being
# scaled down. Only build output is rewritten; the repo's originals are left
# alone and every run re-clones and re-shrinks from them.
#
# Paths are read null-delimited because several of these assets have spaces in
# their names, which word-splitting would tear apart.
shrink_oversized_assets() { # $1=assets dir
	local dir="$1" f tmp count=0

	while IFS= read -r -d '' f; do
		tmp="$f.shrunk"
		magick "$f" -auto-orient -strip -resize '2560x2560>' -quality 82 "$tmp"
		mv -f "$tmp" "$f"
		count=$((count + 1))
	done < <(find "$dir" -type f -size +8M \
		\( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0)

	while IFS= read -r -d '' f; do
		tmp="${f%.*}.shrunk.mp4"
		ffmpeg -nostdin -loglevel error -y -i "$f" \
			-vf "scale='min(1920,iw)':-2" \
			-c:v libx264 -crf 30 -preset veryfast \
			-c:a aac -b:a 128k -movflags +faststart "$tmp"
		mv -f "$tmp" "$f"
		count=$((count + 1))
	done < <(find "$dir" -type f -size +8M \
		\( -iname '*.mp4' -o -iname '*.webm' -o -iname '*.mov' \) -print0)

	log "shrank $count oversized assets; $(du -sh "$dir" | cut -f1) total"

	local still_too_big
	still_too_big=$(find "$dir" -type f -size +25M | wc -l | tr -d ' ')
	if [[ "$still_too_big" != "0" ]]; then
		echo "still over the 25 MiB asset limit:" >&2
		find "$dir" -type f -size +25M >&2
		exit 1
	fi
}

# ---------------------------------------------------------------------------
# All AV Services — Next.js 13 with `output: "export"`, so the build emits a
# fully static ./out and this needs no SSR runtime at all. Deployed as an
# assets-only Worker: no "main", just a directory.
#
# html_handling defaults to auto-trailing-slash, which maps /about-us to the
# exported about-us.html, and not_found_handling serves the exported 404.html.
# ---------------------------------------------------------------------------
cohost_allavservices() {
	sync_repo reeeeeee-dev/allavservices-v2 allavservices-v2
	local dir="$WORK/allavservices-v2"

	cat >"$dir/wrangler.cohost.jsonc" <<-JSON
		{
		  "name": "allavservices-preview",
		  "account_id": "$ACCOUNT_ID",
		  "compatibility_date": "2026-02-26",
		  "assets": {
		    "directory": "out",
		    "not_found_handling": "404-page"
		  },
		  "workers_dev": true,
		  "routes": [{ "pattern": "allav.reetikpatel.me", "custom_domain": true }]
		}
	JSON

	# This repo is the one holdout on Yarn 1, and reaching Yarn 1 on this
	# machine takes two workarounds.
	#
	# ~/.yarnrc.yml sets `yarnPath: .yarn/releases/yarn-4.12.0.cjs`. Being in
	# $HOME it applies to every directory, and yarn honours it before doing
	# anything else, so corepack, `npx yarn@1.22.19`, and even a directly
	# installed yarn 1.22.19 binary all hand off to Yarn 4. Yarn 4 then refuses
	# this Yarn 1 lockfile outright (YN0028) rather than just warning about the
	# unmet tsparticles peer the way Yarn 1 does. YARN_IGNORE_PATH disables the
	# handoff; the private prefix then guarantees what runs is really Yarn 1.
	#
	# Left alone, Yarn 4 also drops a .yarnrc.yml here on its way out, and
	# `git reset` does not remove untracked files, so it is cleared explicitly
	# or Yarn 1 inherits Berry settings on the next run.
	local yarn1="$WORK/.yarn1/node_modules/.bin/yarn"
	if [[ ! -x "$yarn1" ]]; then
		log "allavservices: fetching yarn 1"
		npm install --silent --no-audit --no-fund --prefix "$WORK/.yarn1" yarn@1.22.19
	fi
	rm -f "$dir/.yarnrc.yml"

	log "allavservices: install + build"
	(
		cd "$dir"
		export YARN_IGNORE_PATH=1
		"$yarn1" install --frozen-lockfile
		"$yarn1" build
	)

	shrink_oversized_assets "$dir/out"
	deploy allavservices-v2
}

# ---------------------------------------------------------------------------
# Steven Wise — Nuxt 4 on Workers, backed by D1 (artwork metadata) and R2
# (image bytes). The copy gets its own -preview database and bucket, seeded from
# the client's by cohost/seed-steven-wise.
#
# ACCESS_AUD is intentionally not a real Access audience. requireAccess() in
# that app fails closed, so /admin and /api/admin 403 on this copy: an anonymous
# visitor has no token at all, and a visitor holding a genuine token for the
# real Access application fails the audience check. The gallery is public and
# unaffected. Pointing this at the real AUD would stand up a second, unguarded
# admin console for the client's data.
# ---------------------------------------------------------------------------
cohost_steven_wise() {
	sync_repo reeeeeee-dev/steven-wise-website steven-wise-website
	local dir="$WORK/steven-wise-website"

	cat >"$dir/wrangler.cohost.jsonc" <<-JSON
		{
		  "name": "steven-wise-preview",
		  "account_id": "$ACCOUNT_ID",
		  "compatibility_date": "2026-08-14",
		  "compatibility_flags": ["nodejs_compat"],
		  "main": "./.output/server/index.mjs",
		  "assets": {
		    "binding": "ASSETS",
		    "directory": "./.output/public"
		  },
		  "observability": { "enabled": true },
		  "workers_dev": true,
		  "d1_databases": [
		    {
		      "binding": "DB",
		      "database_name": "steven-wise-portfolio-preview",
		      "database_id": "8a624be0-472b-43e5-ac00-a13c8cd8ef6f"
		    }
		  ],
		  "r2_buckets": [
		    {
		      "binding": "BUCKET",
		      "bucket_name": "steven-wise-works-preview"
		    }
		  ],
		  "vars": {
		    "ACCESS_TEAM_DOMAIN": "https://stevenfwise.cloudflareaccess.com",
		    "ACCESS_AUD": "cohost-preview-admin-disabled"
		  },
		  "routes": [{ "pattern": "stevenwise.reetikpatel.me", "custom_domain": true }]
		}
	JSON

	log "steven-wise: install + build"
	(cd "$dir" && bun install --frozen-lockfile && bun run build)
	deploy steven-wise-website
}

main() {
	local sites=("$@")
	if [[ ${#sites[@]} -eq 0 ]]; then
		sites=(allavservices steven-wise)
	fi

	for site in "${sites[@]}"; do
		case "$site" in
			allavservices) cohost_allavservices ;;
			steven-wise) cohost_steven_wise ;;
			*)
				echo "unknown site: $site (expected allavservices, steven-wise)" >&2
				exit 64
				;;
		esac
	done

	log "done"
}

main "$@"
