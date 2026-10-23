import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import { Loader, Nav, WhatsAppFloat } from "@/components/Chrome";
import { About, GitHub, Journey, Leadership, Skills, Teaching, Work } from "@/components/Sections";
import { Contact, Footer } from "@/components/Contact";
import { fallbackRepos, type Repo } from "@/lib/data";

// Repos shown first, in this order, when they are public. Others fill remaining slots by recent activity.
const PINNED = [
  "ucp-university-lms-portal",
  "Artificial-Intelligence",
  "Mobile-Application-Development",
  "Game-Design-Development",
  "AI-chatbot",
  "Time-Table-Portal",
  "Introduction-to-modern-Computer-Science",
  "Operating-System-Learning-Hub",
  "react-learning-hub",
];

// Most repos have no GitHub description; these fill the gap (a description set on GitHub wins).
const DESCRIPTIONS: Record<string, string> = {
  "ucp-university-lms-portal": "University LMS with admin, teacher and student portals on Firebase.",
  "Artificial-Intelligence": "Interactive AI course portal — 16 lectures, assessments and AI labs.",
  "Mobile-Application-Development": "Complete Android course in Kotlin with quizzes and flashcards.",
  "Game-Design-Development": "15-lecture Unity & C# game production course with mini-games.",
  "AI-chatbot": "RAG help-desk chatbot that answers from your documents, with sources.",
  "Time-Table-Portal": "School timetable office with auto-build, leave cover and print.",
  "Introduction-to-modern-Computer-Science": "Interactive first lecture with simulations and quizzes.",
  "Operating-System-Learning-Hub": "React learning hub for operating-system concepts.",
  "excel-sales-dashboard": "Excel KPI dashboard with VBA reports and Power Query clean-up.",
  "University-LMS-Portal": "Teachers manage quizzes, assignments and lectures; students respond.",
  "Quiz-Portal": "Web-based quiz portal for classroom assessment.",
  "Computer-Networks": "Computer Networks course material.",
};

/** Fetched once at build time from the public GitHub API — only public repositories are ever returned. */
async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch("https://api.github.com/users/tahir8203/repos?per_page=100&sort=pushed&type=owner", {
      headers: { Accept: "application/vnd.github+json" },
      cache: "force-cache",
    });
    if (!res.ok) throw new Error(String(res.status));
    const all = (await res.json()) as (Repo & { fork: boolean; private: boolean })[];
    const pub = all.filter((r) => !r.fork && !r.private && r.name !== "Portfolio");
    const pinned = PINNED.map((n) => pub.find((r) => r.name === n)).filter(Boolean) as Repo[];
    const rest = pub.filter((r) => !PINNED.includes(r.name));
    return [...pinned, ...rest].slice(0, 9).map((r) => ({ ...r, description: r.description || DESCRIPTIONS[r.name] || null }));
  } catch {
    return fallbackRepos;
  }
}

export default async function Page() {
  const repos = await getRepos();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Loader />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Teaching />
        <Leadership />
        <Skills />
        <Journey />
        <GitHub repos={repos} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Motion />
    </>
  );
}
