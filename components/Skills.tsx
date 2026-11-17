import { skills } from "@/data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="wrap section-pad">
      <Reveal>
        <SectionHeading id="skills-title" kicker="04 / Toolbox">Skills</SectionHeading>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.label} delay={i * 60}>
            <div className="card h-full p-6">
              <h3 className="text-sm font-semibold">{g.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => <li key={s} className="rounded-lg border border-line px-2.5 py-1 font-mono text-xs text-muted">{s}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
