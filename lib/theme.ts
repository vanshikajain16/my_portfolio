// Theme helpers shared by the toggle and the command palette
const KEY = "theme";

/** Is dark mode currently applied to <html>? */
export function isDark(): boolean {
  return document.documentElement.classList.contains("dark");
}

/** Flip the theme, persist the choice, and notify listeners */
export function toggleTheme(): void {
  const next = !isDark();
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem(KEY, next ? "dark" : "light"); // storage may be blocked
  } catch {}
  window.dispatchEvent(new Event("themechange")); // lets the toggle icon update
}

/** Inline script run before first paint to avoid a flash of wrong theme */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

/** Smooth-scroll to a section id (instant when reduced motion is requested) */
export function goTo(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
