"use client";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import CommandPalette from "./CommandPalette";

// Owns palette open state and the global Ctrl/Cmd+K shortcut
export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // stop the browser's own Ctrl+K (search focus)
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a href="#projects" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <Nav onOpenPalette={() => setOpen(true)} />
      <main>{children}</main>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
