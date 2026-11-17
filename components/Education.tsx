import { education } from "@/data/education";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Same timeline markup as Experience (rail, dot, title row, mono meta line)
export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="wrap section-pad">
      <Reveal>
        <SectionHeading id="education-title" kicker="03 / Education">Education</SectionHeading>
      </Reveal>
      <ol className="space-y-8 border-l border-line pl-6">
        {education.map((e, i) => (
          <li key={e.title} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            <Reveal delay={i * 80}>
              <h3 className="font-semibold">{e.title} <span className="text-muted">· {e.institution}</span></h3>
              {/* Meta line: period (when given) then score */}
              <p className="font-mono text-xs text-muted">{[e.period, e.score].filter(Boolean).join(" · ")}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
