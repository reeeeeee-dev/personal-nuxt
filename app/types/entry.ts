export type EntryImage = {
  src: string;
  alt: string;
  class: string;
};

export type EntryVideo = {
  sources: { src: string; type: string }[];
  poster?: string;
  alt: string;
  class: string;
};

/**
 * A page rendered live inside a scaled-down frame, in place of a screenshot,
 * so a project shows an actual working miniature of itself. `src` may be
 * same-origin or a full cross-origin URL.
 */
export type EntryEmbed = {
  src: string;
  title: string;
  /** Logical viewport rendered inside the frame, before it is scaled down. */
  frameWidth?: number;
  frameHeight?: number;
};

/**
 * Shared shape used by the Projects and Journey pages. Both render an
 * alternating list of sections with a title, tech-stack pill list, a body
 * (either a plain string or a rich per-entry slot), and an optional media
 * column (one or more images, or an autoplaying video).
 */
export type Entry = {
  id: string;
  title: string;
  tocLabel: string;
  stack: string[];
  /** Plain-text body. Omit when using the rich `#body` slot on EntryList. */
  body?: string;
  images?: EntryImage[];
  /** Extra classes for the inner media wrapper (e.g. Divvy + Bill.com row). */
  imageRowClass?: string;
  video?: EntryVideo;
  /** Live page preview. Takes precedence over `video` and `images`. */
  embed?: EntryEmbed;
};
