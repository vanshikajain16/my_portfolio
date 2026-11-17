// Projects: exact titles/metrics from the resume. Category drives the filter chips.
export type Category = "AI/ML" | "Full-Stack" | "Computer Vision";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  categories: Category[]; // a project can match several chips
  summary: string; // short text for the card
  bullets: string[]; // full detail for the modal
  stack: string[]; // tech named in the resume bullets
  github: string;
  note?: string; // optional small muted line (e.g. co-authorship)
};

export const projects: Project[] = [
  {
    id: "reposcope",
    title: "RepoScope",
    subtitle: "Full-Stack AI Repository Health Auditor",
    categories: ["Full-Stack", "AI/ML"],
    summary: "Full-stack AI code auditor that scores public GitHub repos 0-100 with severity-tagged issues and fix suggestions.",
    bullets: [
      "Built RepoScope, a full-stack AI code auditor (Next.js 14, TypeScript, Prisma) that scores public GitHub repos 0-100 with severity-tagged issues and fix suggestions.",
      "Implemented secure email/password auth (NextAuth, bcrypt, JWT) and a UserRepoAuditIssue schema with Zod input validation.",
      "Integrated the GitHub API and Groq LLM with size-capped ingestion, plus branch/commit comparison and PDF export.",
    ],
    stack: ["Next.js 14", "TypeScript", "Prisma", "NextAuth", "bcrypt", "JWT", "Zod", "GitHub API", "Groq LLM"],
    github: "https://github.com/vanshikajain16/Reposcope",
  },
  {
    id: "skynav",
    title: "SkyNav",
    subtitle: "Monocular Visual-Inertial Odometry with Detection and Tracking",
    categories: ["Computer Vision", "AI/ML"],
    summary: "Monocular visual odometry front end tracking 92.6% of frames on TUM VI at 59 FPS on CPU.",
    bullets: [
      "Built a monocular visual odometry front end from scratch (LK tracking, fisheye masking, PnP against a sparse map), tracking 92.6% of frames on TUM VI at 59 FPS on CPU.",
      "Designed an error-state EKF fusing IMU and VO that estimates scale online, cutting ATE to 0.16 m vs 0.34 m for vision-only, while IMU-only drifted to 246 m.",
      "Integrated YOLOX-nano ONNX detection (14.9 ms/frame) and a SORT tracker with fused-pose localization (MOTA 0.94 on synthetic scenes).",
    ],
    stack: ["LK tracking", "PnP", "Error-state EKF", "YOLOX-nano", "ONNX", "SORT"],
    github: "https://github.com/vanshikajain16/SkyNav",
  },
  {
    id: "local-ai-workspace",
    title: "Local-First AI Knowledge Workspace",
    subtitle: "Offline RAG System",
    categories: ["AI/ML"],
    summary: "Fully offline RAG system for querying local documents on a 6GB GPU with no external API calls.",
    bullets: [
      "Built a fully offline RAG system for querying local documents, using Llama 3 (Ollama), MiniLM embeddings and a ChromaDB vector store, running on a 6GB GPU with no external API calls.",
      "Implemented the retrieval pipeline with LangChain (LCEL) for chunking, embedding, semantic search and context-grounded answer generation, served through a Streamlit chat interface.",
      "Debugged and hardened the pipeline, fixing ChromaDB file locking, empty-chunk validation errors and a RetrievalQA to LCEL migration so ingestion and querying run reliably.",
    ],
    stack: ["Llama 3", "Ollama", "MiniLM", "ChromaDB", "LangChain (LCEL)", "Streamlit"],
    github: "https://github.com/vanshikajain16/local-ai-workspace",
  },
  {
    id: "brainiac",
    title: "Brainiac",
    subtitle: "MRI Risk Stratification System",
    categories: ["AI/ML", "Computer Vision"],
    summary: "Hybrid 2D/3D brain tumor segmentation and risk classification on multi-modal BraTS MRI.",
    bullets: [
      "Built a hybrid 2D/3D segmentation pipeline using Swin-UNETR (PyTorch/MONAI), reaching a mean Dice of 0.86 ± 0.03, with a lighter 2D branch for fast screening on limited hardware.",
      "Designed a Counterfactual Sensitivity Score and combined it with radiomics and attention-entropy features in a gradient-boosted classifier, raising accuracy from 82.1% to 86.4% (AUC 0.84 to 0.88).",
    ],
    stack: ["PyTorch", "MONAI", "Swin-UNETR", "Radiomics", "Gradient Boosting"],
    github: "https://github.com/vanshikajain16/brainiac_",
    note: "Co-authored with 4 others.",
  },
];

// Chip labels, "All" first
export const filters = ["All", "AI/ML", "Full-Stack", "Computer Vision"] as const;
