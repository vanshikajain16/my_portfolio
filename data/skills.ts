// Skill groups copied verbatim from the resume's TECHNICAL SKILLS section
export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript/JavaScript", "Python", "Java", "SQL", "C++ (DSA, OOP)"] },
  { label: "Data & Analysis", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Jupyter", "EDA"] },
  { label: "AI/ML", items: ["PyTorch", "MONAI", "OpenCV", "RAG", "LangChain", "Prompt Engineering"] },
  { label: "Full-Stack", items: ["Node.js", "React.js", "Next.js", "RESTful APIs", "Prisma ORM", "MySQL/PostgreSQL"] },
  { label: "Dev Tools", items: ["Git/GitHub", "Docker", "Agile/Scrum", "CI/CD basics"] },
];
