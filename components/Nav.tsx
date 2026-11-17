"use client";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { goTo } from "@/lib/theme";
import ThemeToggle from "./ThemeToggle";

// Section ids in page order; also used by the palette
export const sections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false); // drives the bottom border

  // Show the thin bottom border only after the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Thin band across the viewport middle: whichever section crosses it is "active"
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["hero", ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b bg-bg/70 backdrop-blur-md transition-colors ${scrolled ? "border-line" : "border-transparent"}`}>
      <nav aria-label="Primary" className="wrap flex h-14 items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); goTo("hero"); }}
          className="font-mono text-sm font-semibold"
        >
          {profile.name.split(" ")[0]}<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Section links hidden on the smallest screens (palette covers them) */}
          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); goTo(s.id); }}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${active === s.id ? "text-accent" : "text-muted hover:text-fg"}`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Always-visible palette button (the only way in on touch devices) */}
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted hover:text-fg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
            </svg>
            <kbd className="hidden font-mono text-xs sm:inline">Ctrl K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
