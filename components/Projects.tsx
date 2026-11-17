"use client";
import { useCallback, useEffect, useState } from "react";
import { filters, projects, type Project } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";

type Filter = (typeof filters)[number];

// Hash slugs: "AI/ML" -> "ai-ml", "Computer Vision" -> "computer-vision"
const slug = (f: string) => f.toLowerCase().replace(/[^a-z]+/g, "-");
// Read "#projects/<slug>" from the URL; default to All
function filterFromHash(): Filter {
  const m = window.location.hash.match(/^#projects\/(.+)$/);
  return filters.find((f) => f !== "All" && slug(f) === m?.[1]) ?? "All";
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Project | null>(null);

  // Sync state from the hash on load and whenever it changes (back/forward)
  useEffect(() => {
    const sync = () => setFilter(filterFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    // replaceState avoids a scroll jump and keeps history clean
    history.replaceState(null, "", f === "All" ? "#projects" : `#projects/${slug(f)}`);
  };

  const close = useCallback(() => setOpen(null), []); // stable ref for the modal effect
  const visible = projects.filter((p) => filter === "All" || p.categories.includes(filter));

  return (
    <section id="projects" aria-labelledby="projects-title" className="wrap section-pad">
      <Reveal>
        <SectionHeading id="projects-title" kicker="01 / Work">Projects</SectionHeading>
        <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => choose(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${filter === f ? "border-accent bg-accent text-white dark:text-bg" : "border-line text-muted hover:text-fg"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      {/* key=filter remounts cards so the .pop animation replays on every change */}
      <ul key={filter} className="grid gap-5 md:grid-cols-2" aria-live="polite">
        {visible.map((p, i) => (
          <li key={p.id} className="pop" style={{ animationDelay: `${i * 60}ms` }}>
            <button
              onClick={() => setOpen(p)}
              aria-haspopup="dialog"
              className="flex h-full w-full flex-col card card-hover p-6 text-left"
            >
              <span className="text-lg font-semibold">{p.title}</span>
              <span className="mt-0.5 text-sm text-muted">{p.subtitle}</span>
              <span className="mt-3 text-sm leading-relaxed">{p.summary}</span>
              {p.note && <span className="mt-2 text-xs text-muted">{p.note}</span>}
              <span className="mt-4 flex flex-wrap gap-2">
                {p.categories.map((c) => <span key={c} className="rounded-lg bg-accent-muted px-2 py-0.5 font-mono text-xs text-accent">{c}</span>)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && <ProjectModal project={open} onClose={close} />}
    </section>
  );
}
