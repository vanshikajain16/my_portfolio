"use client";
import { useRef, useState } from "react";
import { Code2, FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Gmail compose URL built from the profile email (works without a configured mail app)
const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=Hello%20Vanshika`;

// Every URL comes from data/profile.ts; external flag drives target/rel
const items = [
  { name: "Email", href: `mailto:${profile.email}`, icon: <Mail size={20} aria-hidden="true" />, external: false, gmail: true },
  { name: "GitHub", href: profile.links.github, icon: <GithubIcon />, external: true },
  { name: "LinkedIn", href: profile.links.linkedin, icon: <LinkedinIcon />, external: true },
  { name: "LeetCode", href: profile.links.leetcode, icon: <Code2 size={20} aria-hidden="true" />, external: true },
  { name: "Resume", href: profile.links.resume, icon: <FileText size={20} aria-hidden="true" />, external: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Copy the email, then show the toast for 2 seconds
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Fallback for blocked/unfocused Clipboard API: select a hidden textarea and use execCommand
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      ta.setAttribute("aria-hidden", "true");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus(); // some browsers only copy from a focused, non-readonly field
      ta.select();
      const ok = document.execCommand("copy"); // deprecated but widely supported
      document.body.removeChild(ta);
      if (!ok) return; // truly blocked: don't claim success
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap section-pad">
      <Reveal>
        <SectionHeading id="contact-title" kicker="05 / Say hi">Contact</SectionHeading>
        <p className="prose-measure text-muted">Open to internships and ML or full-stack projects. The fastest way to reach me is email.</p>

        <ul className="mt-8 flex flex-wrap gap-4">
          {items.map((it) => (
            <li key={it.name} className="group relative">
              <a
                href={it.href}
                aria-label={it.name}
                className="icon-btn"
                {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                // Email: mailto stays as the href fallback; mouse click opens Gmail compose instead
                {...("gmail" in it ? { onClick: (e: React.MouseEvent) => { e.preventDefault(); window.open(gmailUrl, "_blank", "noopener,noreferrer"); } } : {})}
              >
                {it.icon}
              </a>
              {/* Tooltip shows on hover and keyboard focus; the link's aria-label already names it */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-fg px-2.5 py-1 text-xs text-bg opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
              >
                {it.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative mt-5 inline-block">
          <button onClick={copy} className="cursor-pointer rounded-lg py-1 font-mono text-xs text-muted underline decoration-dotted underline-offset-4 transition-colors hover:text-accent hover:decoration-solid" aria-label={`Copy email address ${profile.email}`}>
            {profile.email}
          </button>
          {/* Polite live region so screen readers hear the confirmation */}
          <span role="status" aria-live="polite" className="sr-only">{copied ? "Copied" : ""}</span>
          {copied && (
            <span aria-hidden="true" className="fade absolute -top-8 left-0 rounded-lg bg-accent px-2.5 py-1 text-xs font-medium text-white dark:text-bg">Copied</span>
          )}
        </div>
      </Reveal>
    </section>
  );
}
