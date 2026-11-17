import { experience } from "@/data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="wrap section-pad">
      <Reveal>
        <SectionHeading id="experience-title" kicker="02 / Background">Experience</SectionHeading>
      </Reveal>
      {/* Left border acts as a simple timeline rail */}
      <ol className="space-y-8 border-l border-line pl-6">
        {experience.map((e, i) => (
          <li key={e.role + e.company} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            <Reveal delay={i * 80}>
              <h3 className="font-semibold">{e.role} <span className="text-muted">· {e.company}</span></h3>
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {e.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
