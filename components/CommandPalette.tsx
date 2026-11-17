"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { goTo, toggleTheme } from "@/lib/theme";
import { sections } from "./Nav";

type Cmd = { id: string; label: string; hint: string; run: () => void };

/** Fuzzy match: query chars must appear in order. Returns score (lower = better) or -1 */
function fuzzy(query: string, text: string): number {
  const q = query.toLowerCase(), t = text.toLowerCase();
  let pos = 0, score = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, pos);
    if (found === -1) return -1; // a character is missing -> no match
    score += found - pos; // penalize gaps between matched characters
    pos = found + 1;
  }
  return score + t.indexOf(q[0]); // slight preference for early matches
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const prev = useRef<HTMLElement | null>(null);

  // All available commands
  const commands: Cmd[] = useMemo(() => [
    ...sections.map((s) => ({ id: s.id, label: `Go to ${s.label}`, hint: "Section", run: () => goTo(s.id) })),
    { id: "gh", label: "Open GitHub", hint: "Link", run: () => window.open(profile.links.github, "_blank", "noopener") },
    { id: "li", label: "Open LinkedIn", hint: "Link", run: () => window.open(profile.links.linkedin, "_blank", "noopener") },
    { id: "lc", label: "Open LeetCode", hint: "Link", run: () => window.open(profile.links.leetcode, "_blank", "noopener") },
    { id: "cv", label: "Open Resume (PDF)", hint: "Link", run: () => window.open(profile.links.resume, "_blank", "noopener") },
    { id: "mail", label: "Send email", hint: "Link", run: () => { window.location.href = `mailto:${profile.email}`; } },
    { id: "theme", label: "Toggle dark / light theme", hint: "Action", run: toggleTheme },
  ], []);

  // Filter and rank by fuzzy score
  const results = useMemo(() => {
    if (!query.trim()) return commands;
    return commands
      .map((c) => ({ c, s: fuzzy(query.trim(), c.label) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => a.s - b.s)
      .map((x) => x.c);
  }, [query, commands]);

  // Reset state and manage focus/scroll lock when opening or closing
  useEffect(() => {
    if (!open) return;
    prev.current = document.activeElement as HTMLElement;
    setQuery(""); setIndex(0);
    input.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; prev.current?.focus(); };
  }, [open]);

  useEffect(() => setIndex(0), [query]); // top result is selected after typing

  if (!open) return null;

  const run = (c?: Cmd) => { if (!c) return; onClose(); setTimeout(c.run, 0); }; // close first, then act

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); run(results[index]); }
    else if (e.key === "Tab") e.preventDefault(); // focus stays on the input (the only control)
  };

  return (
    <div className="fade fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[15vh]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={onKeyDown} className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
        <input
          ref={input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command..."
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
          className="w-full border-b border-line bg-transparent px-4 py-3 text-base outline-none"
        />
        <ul id="palette-list" role="listbox" className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
          {results.map((c, i) => (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={i === index}
              onMouseEnter={() => setIndex(i)}
              onClick={() => run(c)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm ${i === index ? "bg-accent-muted text-accent" : ""}`}
            >
              <span>{c.label}</span>
              <span className="font-mono text-xs text-muted">{c.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
