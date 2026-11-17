// Experience entries copied from the resume (no added metrics)
export type Experience = { role: string; company: string; period: string; points: string[] };

export const experience: Experience[] = [
  {
    role: "R&D Intern",
    company: "ApexOne Studios",
    period: "January 2026 – February 2026",
    points: [
      "Contributed to research-driven development projects, supporting experimentation, prototyping, and testing.",
      "Analyzed data and assisted in implementing and validating solutions derived from research findings.",
    ],
  },
  {
    role: "Generative AI Intern",
    company: "Prodigy InfoTech",
    period: "July 2025 – August 2025",
    points: [
      "Built and tested generative AI prototypes during a 1-month remote internship, using prompt engineering to refine output quality and relevance.",
      "Researched GenAI tools and deployment workflows to evaluate model and architecture choices.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "CodSoft",
    period: "July 2025 – August 2025",
    points: [
      "Implemented end-to-end ML models for data analysis and prediction during a 4-week virtual internship, submitting each task through GitHub.",
      "Wrote test cases to validate model outputs across edge cases, catching preprocessing bugs that were degrading prediction accuracy.",
    ],
  },
];
