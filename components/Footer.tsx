import { profile } from "@/data/profile";

// Minimal footer; back-to-top is a plain anchor so it works without JS
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col items-start justify-between gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {profile.name} · Built with Next.js</p>
        <a href="#hero" className="rounded-lg hover:text-accent">Back to top ↑</a>
      </div>
    </footer>
  );
}
