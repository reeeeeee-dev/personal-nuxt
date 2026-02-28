const theme = {
  sage: "#8f9b82",
  ink: "#151514",
  cream: "#ceb9a1",
  red: "#d0253e",
  orange: "#fba337",
} as const;

/**
 * Theme color values for use in components (e.g. shaders, charts).
 */
export function useTheme() {
  return {
    ...theme,
    getVar: (name: string): string =>
      (theme as Record<string, string>)[name] ?? "",
  };
}
