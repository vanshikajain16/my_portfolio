"use client";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

// Types each phrase, pauses, deletes it, then moves to the next
function useTyping(words: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    // Reduced motion: show the first phrase statically, no timers
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    let w = 0, i = 0, deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let delay = deleting ? 40 : 80;
      if (!deleting && i === word.length) { deleting = true; delay = 1400; } // pause when complete
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 400; }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t); // stop on unmount
  }, [words]);

  return text;
}

export default function Hero() {
  const typed = useTyping(profile.typedRoles);

  return (
    <section id="hero" className="wrap relative pb-20 pt-20 sm:pt-28">
      <div className="hero-bg" aria-hidden="true" />
      <p className="font-mono text-sm text-muted">Hi, I&apos;m</p>
      {/* Name leads: biggest and boldest in primary color (h1) */}
      <h1 className="mt-2 text-balance font-bold tracking-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>{profile.name}</h1>
      {/* Tagline supports the name: smaller, lighter weight, muted */}
      <p className="mt-3 text-balance font-semibold tracking-tight text-muted" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.15 }}>{profile.tagline}</p>
      {/* Visual typing line is hidden from screen readers; the sr-only copy is stable */}
      {/* Fixed min-height reserves space (the longest phrase wraps to 2 lines at 360px) so nothing shifts */}
      <p className="mt-4 min-h-[3.25rem] font-mono text-base text-muted sm:min-h-[1.75rem]" aria-hidden="true">
        I build {typed}<span className="caret text-accent">|</span>
      </p>
      <p className="sr-only">I build {profile.typedRoles.join(", ")}.</p>
      <div className="mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed">
        {/* First paragraph in primary color, second muted */}
        <p>{profile.bio[0]}</p>
        <p className="text-muted">{profile.bio[1]}</p>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="At a glance">
        {profile.heroChips.map((c) => (
          <li key={c} className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">{c}</li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover dark:text-bg">View projects</a>
        {/* Resume served from /public/resume.pdf */}
        <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium hover:border-accent">Resume</a>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium hover:border-accent">GitHub</a>
      </div>
    </section>
  );
}
