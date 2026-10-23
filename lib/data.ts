// All site content lives here. Every fact below comes from the previous portfolio,
// the project repositories / live apps, or details supplied by Tahir — nothing invented.

export const SITE_URL = "https://mtahirmehmood.vercel.app";

export const profile = {
  name: "Muhammad Tahir Mehmood",
  shortName: "Tahir",
  location: "Okara, Punjab, Pakistan",
  headline:
    "Computer Science Educator | Software Developer | AI & Automation Enthusiast | Educational Administration Professional",
  roles: [
    "Computer Science Educator",
    "Software Developer",
    "AI & Automation Enthusiast",
    "Educational Administrator",
  ],
  intro:
    "For more than a decade I have taught computing, built software for real institutions, and helped run schools and district education workflows. I design tools that make teaching clearer, administration faster, and data easier to trust.",
  cv: "/Muhammad-Tahir-Mehmood-CV.pdf",
  portrait: "/portrait-web.jpg",
};

export const contact = {
  email: "tahir8203@gmail.com",
  whatsappDisplay: "+92 343 4021446",
  whatsapp: "https://wa.me/923434021446",
  instagram: "https://www.instagram.com/m.tahir.mehmod/",
  facebook: "https://web.facebook.com/mtahirmehmood",
  github: "https://github.com/tahir8203",
};

export const stats = [
  { value: "10+", label: "Years in education & technology" },
  { value: "8+", label: "Live apps & learning portals" },
  { value: "MS", label: "M.Phil. Computer Science (CGPA 3.71)" },
  { value: "2023", label: "Peer-reviewed AI research" },
];

export const pillars = [
  {
    title: "Classroom teaching",
    text: "University-level teaching in operating systems, AI, web and mobile development, digital logic, databases and software engineering — taught through projects, not slides alone.",
  },
  {
    title: "Software development",
    text: "Full-stack web portals, Flutter and Android apps, Firebase back-ends and automation that institutions actually use day to day.",
  },
  {
    title: "AI & automation",
    text: "Deep-learning research, RAG chatbots with OpenAI and Claude APIs, and automated reporting pipelines that replace hours of manual data work.",
  },
  {
    title: "Educational leadership",
    text: "School headship, district planning & development, and data-driven reporting — bringing practical problem-solving to how education is managed.",
  },
];

export type Project = {
  id: string;
  title: string;
  kicker: string;
  url: string;
  repo?: string;
  image: string;
  problem: string;
  features: string[];
  outcome: string;
  tags: string[];
  accent: "cyan" | "violet";
};

export const featured: Project[] = [
  {
    id: "pgc",
    title: "PGC Learning Management System",
    kicker: "Punjab College Okara · Education platform",
    url: "https://pgc-portal.vercel.app/",
    image: "/shots/pgc.jpg",
    problem:
      "Activities, marks and results were spread across registers and spreadsheets, with no single place for administrators, teachers and students to work from.",
    features: [
      "Three fully separated portals — Administration, Teacher and Student Services",
      "Course offerings by term, class, section, subject and teacher",
      "Lectures, assignments, quizzes, presentations, mid and final terms",
      "Marks sheets, result graphs and printable / CSV-exportable reports",
      "Bulk CSV student import with validation preview, plus an audit log",
    ],
    outcome:
      "A complete college LMS that runs on Firebase's free Spark plan — zero hosting cost for the institution.",
    tags: ["React", "Vite", "Firebase Auth", "Cloud Firestore", "Storage", "Vercel"],
    accent: "cyan",
  },
  {
    id: "dea",
    title: "DEA Okara School Reporting System",
    kicker: "Office of the CEO (DEA) Okara · Android app + web portal",
    url: "https://dea-okara-school-reporting.vercel.app/",
    image: "/shots/dea.jpg",
    problem:
      "District officers needed data from 1,000+ schools quickly, but collection relied on paper, phone calls and repeated manual compilation.",
    features: [
      "Officers publish data-collection forms; assigned schools fill and submit them",
      "Android app and web portal built from one Flutter codebase",
      "Real-time sync — new forms reach schools in about a second, no new APK needed",
      "Live response monitoring and one-click consolidated Excel workbooks",
      "School list reconciled against official SIS data; role-based security rules",
    ],
    outcome:
      "District-wide reporting moved from manual compilation to a live, auditable digital workflow.",
    tags: ["Flutter", "Dart", "Firebase", "Firestore Rules", "Android", "Excel export"],
    accent: "violet",
  },
];

export const moreSoftware = [
  {
    title: "UCP University LMS Portal",
    text: "Admin, teacher and student portals with certificates and file storage, built in vanilla JavaScript on Firebase — no framework, no server.",
    tags: ["JavaScript", "Firebase"],
    url: "https://ucp-university-lms-portal.vercel.app/",
    repo: "https://github.com/tahir8203/ucp-university-lms-portal",
  },
  {
    title: "AI Document Q&A Chatbot",
    text: "A help-desk chatbot that answers only from an organisation's documents and cites the source of each answer. Includes a free keyword-search demo mode and tests.",
    tags: ["Python", "FastAPI", "OpenAI", "RAG"],
    repo: "https://github.com/tahir8203/AI-chatbot",
  },
  {
    title: "School Timetable Office",
    text: "Class and teacher timetables, auto-build, cover for teachers on leave, and print / export — built for running a real school.",
    tags: ["HTML", "JavaScript"],
    url: "https://time-table-portal.vercel.app/",
    repo: "https://github.com/tahir8203/Time-Table-Portal",
  },
  {
    title: "Excel Sales Performance Dashboard",
    text: "Region filter, KPIs, target vs actual and live charts, with VBA macros for PDF reports and a Power Query clean-up script.",
    tags: ["Excel", "VBA", "Power Query"],
    repo: "https://github.com/tahir8203/excel-sales-dashboard",
  },
];

export const teaching = [
  {
    title: "Artificial Intelligence",
    text: "Lectures 1–16, assessments and practical AI labs in one visual, interactive learning portal with search and progress tracking.",
    url: "https://artificial-intelligence-lake.vercel.app/",
    repo: "https://github.com/tahir8203/Artificial-Intelligence",
    image: "/shots/ai.jpg",
    tags: ["16 lectures", "AI Lab", "Quizzes"],
  },
  {
    title: "Mobile Application Development",
    text: "16 lectures from Kotlin foundations and Android UI to databases, Firebase, threads, services and broadcast receivers — with flashcards, quizzes and a certificate.",
    url: "https://mobile-application-development-five.vercel.app/",
    repo: "https://github.com/tahir8203/Mobile-Application-Development",
    image: "/shots/mad.jpg",
    tags: ["Kotlin", "Android", "Offline-ready"],
  },
  {
    title: "Game Design & Development",
    text: "15 lectures that follow a real production pipeline — Unity & C#, physics, optimisation, audio and publishing — with interactive demos and mini-games.",
    url: "https://game-design-development.vercel.app/",
    repo: "https://github.com/tahir8203/Game-Design-Development",
    image: "/shots/gdd.jpg",
    tags: ["Unity", "C#", "Mini-games"],
  },
  {
    title: "Introduction to Modern Computer Science",
    text: "An interactive first lecture with simulations, a detective challenge, careers explorer and quiz — built to hook new CS students.",
    url: "https://intro-modern-computer-science.vercel.app/",
    repo: "https://github.com/tahir8203/Introduction-to-modern-Computer-Science",
    image: "/shots/icms.jpg",
    tags: ["Simulations", "Quiz"],
  },
];

export const govPlatforms = [
  { name: "SIS Portal", url: "https://sis.pesrp.edu.pk/", use: "School Information System — school, student and attendance data" },
  { name: "GRADES Dashboard", url: "https://grades.pesrp.edu.pk/dashboard", use: "Programme Monitoring & Implementation Unit dashboard" },
  { name: "SMU Portal", url: "https://smu.pesrp.edu.pk/", use: "SMC & missing-facilities reporting (SEDP)" },
  { name: "SMU IPMS", url: "https://smu-ipms.pesrp.edu.pk/", use: "SMU monitoring information system" },
];

export const leadership = [
  {
    title: "Planning & Development",
    text: "As Assistant Director (Planning & Development) at the Office of the Chief Executive Officer, District Education Authority Okara — supporting planning, data and reporting for schools across the district.",
  },
  {
    title: "District reporting automation",
    text: "Built the DEA Okara School Reporting system and automated recurring enrolment and attendance reports from official portal data into consolidated workbooks and PDFs.",
  },
  {
    title: "School headship",
    text: "Years as In-Charge Headmaster and Headmaster — academic planning, staff coordination, timetabling and institutional duties.",
  },
];

export const skills = [
  {
    group: "Programming & web",
    items: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js / Express", "HTML & CSS", "REST APIs"],
  },
  {
    group: "Mobile & desktop",
    items: ["Flutter / Dart", "Kotlin", "Android Studio", "Python desktop (PyQt, Tkinter)", "C++"],
  },
  {
    group: "AI & automation",
    items: ["OpenAI & Claude APIs", "RAG / LangChain", "Prompt engineering", "Deep learning (CNNs)", "n8n · Make · Zapier", "Browser automation"],
  },
  {
    group: "Data & back-end",
    items: ["Firebase / Firestore", "SQL & MySQL", "SQLite", "FastAPI / Django", "Excel, VBA & Power Query", "Reporting & dashboards"],
  },
  {
    group: "Education systems",
    items: ["LMS design", "Course portals", "Assessment & marks systems", "School management", "Government data portals"],
  },
  {
    group: "Delivery",
    items: ["Git & GitHub", "Vercel deployment", "Security rules", "Accessibility", "Curriculum design"],
  },
];

export type TimelineItem = { period: string; role: string; org: string; text: string; kind: "admin" | "teach" | "both" };

export const timeline: TimelineItem[] = [
  {
    period: "Planning & Development",
    role: "Assistant Director (P&D)",
    org: "Office of the CEO, District Education Authority Okara",
    text: "Planning, development and district-level education reporting; digital reporting workflows for schools.",
    kind: "admin",
  },
  {
    period: "Jul 2026 — Present",
    role: "Headmaster",
    org: "Govt. Elementary School 44/3-R, Okara",
    text: "School administration, academic planning, staff coordination and institutional duties.",
    kind: "admin",
  },
  {
    period: "Nov 2023 — Present",
    role: "Lecturer",
    org: "University of Central Punjab · Okara Campus",
    text: "Operating systems, digital logic, web and mobile development, and artificial intelligence.",
    kind: "teach",
  },
  {
    period: "2018 — Jun 2026",
    role: "Visiting Lecturer",
    org: "University of Okara",
    text: "Programming, software engineering, databases, computing tools, mobile application development and visual programming.",
    kind: "teach",
  },
  {
    period: "Mar 2018 — Mar 2026",
    role: "Secondary School Teacher → In-Charge Headmaster",
    org: "Govt. High School 44/3-R, Okara",
    text: "Secondary School Teacher (Mar 2018 – Jul 2023), then In-Charge Headmaster (Jul 2023 – Mar 2026).",
    kind: "both",
  },
  {
    period: "2017 — 2022",
    role: "Visiting Lecturer & Head of IT",
    org: "ILM College, Renala",
    text: "IT department supervision and student capstone project guidance.",
    kind: "both",
  },
];

export const education = [
  { years: "2018 — 2020", degree: "MS / M.Phil. Computer Science", school: "Govt. College University, Faisalabad", grade: "CGPA 3.71 / 4" },
  { years: "2018 — 2019", degree: "Bachelor of Education", school: "Allama Iqbal Open University, Islamabad", grade: "Grade A" },
  { years: "2013 — 2017", degree: "BS (Hons.) Information Technology", school: "University of Education, Lahore", grade: "CGPA 3.57 / 4" },
];

export const research = {
  venue: "Computers, Materials & Continua · 2023",
  title: "Deep learning method to detect the road cracks and potholes for smart cities",
  authors: "H. Chu, M. R. Saeed, J. Rashid, M. T. Mehmood, I. Ahmad et al.",
  meta: "Volume 75, No. 1 · Pages 1863–1881",
  url: "https://www.techscience.com/cmc/v75n1/51494",
  text: "My MS research: a CNN-based system that classifies road conditions, connecting computer vision with a practical smart-city infrastructure problem.",
};

export type Repo = { name: string; description: string | null; language: string | null; html_url: string; homepage: string | null; stargazers_count: number; pushed_at: string };

// Used if the GitHub API is unreachable at build time. Public repositories only.
export const fallbackRepos: Repo[] = [
  ["ucp-university-lms-portal", "University LMS on Firebase", "JavaScript", "https://ucp-university-lms-portal.vercel.app"],
  ["Artificial-Intelligence", "Interactive AI learning portal", "HTML", "https://artificial-intelligence-lake.vercel.app"],
  ["Mobile-Application-Development", "Complete Android course", "HTML", "https://mobile-application-development-five.vercel.app"],
  ["Game-Design-Development", "Game design lecture series", "HTML", "https://game-design-development.vercel.app"],
  ["Time-Table-Portal", "School timetable office", "HTML", "https://time-table-portal.vercel.app"],
  ["AI-chatbot", "RAG document Q&A chatbot", "Python", null],
].map(([name, description, language, homepage]) => ({
  name: name as string,
  description: description as string,
  language: language as string,
  homepage: homepage as string | null,
  html_url: `https://github.com/tahir8203/${name}`,
  stargazers_count: 0,
  pushed_at: "",
}));

export const nav = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#teaching", label: "Teaching" },
  { href: "#leadership", label: "Leadership" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];
