/**
 * Single source of truth for site-wide navigation, social links, and contact
 * info. Consumed by Navbar, SiteFooter, and the About page.
 *
 * Change a URL / phone / handle here and every surface picks it up.
 */

export type NavLink = {
	readonly to: string;
	readonly label: string;
};

export const siteNav: readonly NavLink[] = [
	{ to: "/", label: "Home" },
	{ to: "/journey", label: "Journey" },
	{ to: "/projects", label: "Projects" },
	{ to: "/about", label: "About" },
] as const;

export type SocialLinks = {
	readonly github: string;
	readonly linkedin: string;
	readonly instagram: string;
	readonly buyMeACoffee: string;
};

export const socialLinks: SocialLinks = {
	github: "https://github.com/reeeeeee-dev",
	linkedin: "https://linkedin.com/in/reetik",
	instagram: "https://instagram.com/reetik_photography",
	buyMeACoffee: "https://buymeacoffee.com/reetik",
} as const;

export type ContactInfo = {
	readonly email: string;
	/** E.164 for the `tel:` href. */
	readonly phoneHref: string;
	/** Human-formatted display. */
	readonly phoneDisplay: string;
	readonly resumeUrl: string;
};

export const contactInfo: ContactInfo = {
	email: "reetikp@gmail.com",
	phoneHref: "+14793851212",
	phoneDisplay: "(479) 385-1212",
	resumeUrl: "/resume.pdf",
} as const;
