// Education entries, newest first. Omit `period` where none is given (don't invent years).
export type Education = { title: string; institution: string; period?: string; score: string };

export const education: Education[] = [
  {
    title: "B.Tech, Computer Science & Engineering (AI/ML)",
    institution: "Jain University, Bangalore",
    period: "Expected 2027",
    score: "CGPA 7.5 / 10",
  },
  {
    title: "Class XII (PUC)",
    institution: "Global City International PUC",
    score: "70.71%",
  },
  {
    title: "Class X",
    institution: "Shishya BEML Public School",
    score: "86%",
  },
];
