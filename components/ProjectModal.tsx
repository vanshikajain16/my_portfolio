"use client";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";

// Selector for everything focusable inside the dialog (for the focus trap)
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null; // restore focus on close
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock background scroll
    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus(); // move focus inside

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      // Keep Tab / Shift+Tab cycling within the dialog
      const items = panel.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    // Backdrop: clicking it (but not the panel) closes the modal
    <div className="fade fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="modal-title" className="text-xl font-bold">{project.title}</h3>
            <p className="text-sm text-muted">{project.subtitle}</p>
          </div>
          <button onClick={onClose} aria-label="Close dialog" className="rounded-lg border border-line px-2.5 py-1 text-sm text-muted hover:text-fg">✕</button>
        </div>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {project.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        {project.note && <p className="mt-3 text-xs text-muted">{project.note}</p>}
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
          {project.stack.map((s) => <li key={s} className="rounded-lg bg-accent-muted px-2 py-1 font-mono text-xs text-accent">{s}</li>)}
        </ul>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover dark:text-bg">View on GitHub ↗</a>
      </div>
    </div>
  );
}
