import { ArrowUpRight, BookOpen, Building2, CheckCircle2, Code2, GraduationCap, Landmark, Sparkles, Star } from "lucide-react";
import {
  education,
  featured,
  govPlatforms,
  leadership,
  moreSoftware,
  pillars,
  profile,
  research,
  skills,
  stats,
  teaching,
  timeline,
  type Repo,
} from "@/lib/data";
import { GitHubIcon } from "./icons";

function Heading({ n, eyebrow, title, sub }: { n: string; eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-14 max-w-3xl">
      <p data-reveal className="eyebrow mb-4">
        <span className="text-muted">{n} /</span> {eyebrow}
      </p>
      <h2 data-reveal className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
        {title}
      </h2>
      {sub && (
        <p data-reveal className="mt-5 text-lg leading-relaxed text-muted">
          {sub}
        </p>
      )}
    </div>
  );
}

function Ext({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${className}`}>
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">{children}</span>;
}

const wrap = "mx-auto max-w-6xl px-5 sm:px-6";

/* ───────────────────────── About ───────────────────────── */
export function About() {
  const icons = [GraduationCap, Code2, Sparkles, Landmark];
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className={wrap}>
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
            <div className="ring-glow glass relative overflow-hidden rounded-[2rem] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.portrait}
                alt="Portrait of Muhammad Tahir Mehmood"
                width={640}
                height={800}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
              />
              <div className="glass absolute bottom-5 left-5 right-5 rounded-2xl px-4 py-3">
                <p className="font-display font-semibold">{profile.name}</p>
                <p className="text-sm text-muted">MS / M.Phil. Computer Science</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-cyan/20 via-electric/10 to-violet/25 blur-3xl" />
          </div>

          <div>
            <Heading
              n="01"
              eyebrow="About me"
              title={
                <>
                  A teacher&apos;s perspective. <span className="text-gradient">A builder&apos;s mindset.</span>
                </>
              }
              sub="I have spent more than ten years in classrooms, computer labs and education offices. That mix shapes how I build: I start with the people who will use a system — students, teachers, school heads, district officers — and then write the software that removes their friction."
            />
            <p data-reveal className="-mt-6 mb-10 text-lg leading-relaxed text-muted">
              Today I teach computer science at university level, build learning platforms and reporting systems, explore applied AI, and work in
              educational planning and administration in Okara. Each role sharpens the others: teaching keeps my explanations clear, development keeps my
              administration practical, and administration shows me which problems are worth solving.
            </p>

            <dl className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div data-reveal key={s.label} className="glass rounded-2xl p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-gradient">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>

            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => {
                const Icon = icons[i];
                return (
                  <div data-reveal data-tilt key={p.title} className="ring-glow glass rounded-2xl p-6">
                    <Icon className="mb-4 text-cyan" size={26} aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Featured work ───────────────────────── */
function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_30px_80px_-30px_rgba(59,130,246,0.45)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 text-[11px] text-muted">{url.replace("https://", "")}</span>
      </div>
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={1440} height={900} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className={wrap}>
        <Heading
          n="02"
          eyebrow="Featured software"
          title={
            <>
              Systems built for <span className="text-gradient">real institutions.</span>
            </>
          }
          sub="Two platforms in daily use — one running a college's teaching and assessment, one connecting a district education office with its schools."
        />

        <div className="space-y-24">
          {featured.map((p, i) => (
            <article key={p.id} className={`group grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div data-reveal data-tilt className="relative rounded-2xl">
                <div
                  className={`pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl ${p.accent === "cyan" ? "bg-cyan/15" : "bg-violet/20"}`}
                />
                <BrowserFrame src={p.image} alt={`Screenshot of ${p.title}`} url={p.url} />
              </div>
              <div>
                <p data-reveal className="eyebrow mb-3">
                  {p.kicker}
                </p>
                <h3 data-reveal className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {p.title}
                </h3>
                <p data-reveal className="mt-4 leading-relaxed text-muted">
                  <span className="font-semibold text-fg">The problem. </span>
                  {p.problem}
                </p>
                <ul data-reveal className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p data-reveal className="glass mt-6 rounded-xl border-l-2 !border-l-cyan px-4 py-3 text-sm leading-relaxed">
                  <span className="font-semibold">Outcome: </span>
                  {p.outcome}
                </p>
                <div data-reveal className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div data-reveal className="mt-7">
                  <Ext
                    href={p.url}
                    className="rounded-full bg-gradient-to-r from-cyan to-electric px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                  >
                    Visit live app
                  </Ext>
                </div>
              </div>
            </article>
          ))}
        </div>

        <h3 data-reveal className="mt-32 mb-8 font-display text-2xl font-semibold">
          More software I&apos;ve built
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          {moreSoftware.map((p) => (
            <article data-reveal data-tilt key={p.title} className="ring-glow glass flex flex-col rounded-2xl p-6">
              <h4 className="font-display text-lg font-semibold">{p.title}</h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-5 flex gap-5 text-sm font-medium text-cyan">
                {p.url && <Ext href={p.url}>Live</Ext>}
                {p.repo && <Ext href={p.repo}>Source</Ext>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Teaching ───────────────────────── */
export function Teaching() {
  return (
    <section id="teaching" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet/[0.05] to-transparent" />
      <div className={wrap}>
        <Heading
          n="03"
          eyebrow="Interactive teaching"
          title={
            <>
              Courses students can <span className="text-gradient">click, play and explore.</span>
            </>
          }
          sub="I turn my university courses into interactive web portals — lectures, visual demonstrations, labs, quizzes, flashcards and progress tracking — so students can learn at their own pace, on any device."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {teaching.map((t) => (
            <article data-reveal data-tilt key={t.title} className="group ring-glow glass overflow-hidden rounded-3xl">
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={`Screenshot of the ${t.title} learning portal`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <BookOpen className="absolute top-4 right-4 text-cyan" size={22} aria-hidden="true" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.tags.map((x) => (
                    <Tag key={x}>{x}</Tag>
                  ))}
                </div>
                <div className="mt-5 flex gap-5 text-sm font-medium text-cyan">
                  <Ext href={t.url}>Open course</Ext>
                  <Ext href={t.repo}>Source</Ext>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p data-reveal className="mt-8 text-sm text-muted">
          Also on GitHub: <Ext href="https://github.com/tahir8203/react-learning-hub" className="text-cyan">React Learning Hub</Ext>
          {" · "}
          <Ext href="https://github.com/tahir8203/Operating-System-Learning-Hub" className="text-cyan">Operating System Learning Hub</Ext>
          {" · "}
          <Ext href="https://github.com/tahir8203/Quiz-Portal" className="text-cyan">Quiz Portal</Ext>
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Leadership ───────────────────────── */
export function Leadership() {
  return (
    <section id="leadership" className="relative py-28 sm:py-36">
      <div className={wrap}>
        <Heading
          n="04"
          eyebrow="Educational administration"
          title={
            <>
              Leadership grounded in <span className="text-gradient">data and delivery.</span>
            </>
          }
          sub="Beyond the classroom I work where education is planned and managed — in schools and at the District Education Authority, Okara."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {leadership.map((l, i) => (
            <div data-reveal data-tilt key={l.title} className="ring-glow glass rounded-2xl p-7">
              <span className="font-display text-sm text-cyan">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{l.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{l.text}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="glass mt-10 rounded-3xl p-7 sm:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-3 flex items-center gap-2">
                <Building2 size={14} aria-hidden="true" /> Government platforms I work with
              </p>
              <h3 className="font-display text-2xl font-semibold">PESRP / School Education Department, Punjab</h3>
            </div>
            <p className="max-w-md rounded-xl border border-amber-300/25 bg-amber-300/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-100/90">
              <strong>Note:</strong> these are official Government of Punjab platforms. I use them for reporting, data and monitoring work — I did not
              develop them.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {govPlatforms.map((g) => (
              <li key={g.name}>
                <a
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors hover:border-cyan/40 hover:bg-white/[0.04]"
                >
                  <span className="flex items-center justify-between font-display font-semibold">
                    {g.name} <ArrowUpRight size={16} className="text-muted transition-colors group-hover:text-cyan" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted">{g.use}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Skills ───────────────────────── */
export function Skills() {
  const marquee = skills.flatMap((s) => s.items);
  return (
    <section id="skills" className="relative overflow-hidden py-28 sm:py-36">
      <div className={wrap}>
        <Heading
          n="05"
          eyebrow="Technical expertise"
          title={
            <>
              A practical, <span className="text-gradient">connected toolkit.</span>
            </>
          }
          sub="Skills proven in shipped projects and taught in class — no made-up percentages."
        />
      </div>
      <div className="relative mb-14 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl text-white/25">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s} <span className="text-cyan/50">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className={`${wrap} grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
        {skills.map((s) => (
          <div data-reveal data-tilt key={s.group} className="ring-glow glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold">{s.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li
                  key={it}
                  className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-sm text-fg/85 transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Journey ───────────────────────── */
export function Journey() {
  const kindLabel = { admin: "Administration", teach: "Teaching", both: "Teaching & leadership" } as const;
  return (
    <section id="journey" className="relative py-28 sm:py-36">
      <div className={wrap}>
        <Heading
          n="06"
          eyebrow="Experience"
          title={
            <>
              Classrooms, campuses and <span className="text-gradient">education offices.</span>
            </>
          }
        />
        <ol className="relative ml-3 sm:ml-0">
          <span className="absolute top-0 bottom-0 left-0 w-px bg-white/10 sm:left-1/2" aria-hidden="true" />
          <span
            data-timeline-line
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-cyan via-electric to-violet sm:left-1/2"
            aria-hidden="true"
          />
          {timeline.map((t, i) => (
            <li key={t.role + t.org} className={`relative mb-10 pl-8 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
              <span
                className={`absolute top-6 -left-[7px] h-3.5 w-3.5 rounded-full border-2 border-ink bg-cyan shadow-[0_0_0_4px_rgba(34,211,238,0.18)] ${i % 2 ? "sm:-left-[7px]" : "sm:right-[-7px] sm:left-auto"}`}
                aria-hidden="true"
              />
              <div data-reveal data-tilt className="ring-glow glass rounded-2xl p-6 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-sm text-cyan">{t.period}</span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-muted">{kindLabel[t.kind]}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{t.role}</h3>
                <p className="text-sm text-fg/80">{t.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 data-reveal className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
              <GraduationCap className="text-cyan" aria-hidden="true" /> Education
            </h3>
            <div className="space-y-4">
              {education.map((e) => (
                <div data-reveal key={e.degree} className="glass rounded-2xl p-5">
                  <p className="text-xs text-cyan">{e.years}</p>
                  <p className="mt-1 font-display font-semibold">{e.degree}</p>
                  <p className="text-sm text-muted">
                    {e.school} · {e.grade}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 data-reveal className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
              <Sparkles className="text-violet" aria-hidden="true" /> Applied research
            </h3>
            <article data-reveal data-tilt className="ring-glow glass rounded-2xl p-7">
              <p className="eyebrow">{research.venue}</p>
              <h4 className="mt-3 font-display text-xl leading-snug font-semibold">{research.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{research.text}</p>
              <p className="mt-4 text-xs text-muted">{research.authors}</p>
              <p className="text-xs text-muted">{research.meta}</p>
              <Ext href={research.url} className="mt-5 text-sm font-medium text-cyan">
                Read publication
              </Ext>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── GitHub ───────────────────────── */
const langColor: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  Python: "#3572A5",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
};

export function GitHub({ repos }: { repos: Repo[] }) {
  return (
    <section id="github" className="relative py-28 sm:py-36">
      <div className={wrap}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading
            n="07"
            eyebrow="Open source"
            title={
              <>
                Selected <span className="text-gradient">public repositories.</span>
              </>
            }
          />
          <Ext
            href="https://github.com/tahir8203?tab=repositories"
            className="glass mb-14 shrink-0 self-start rounded-full px-5 py-2.5 text-sm font-medium md:self-auto"
          >
            <GitHubIcon width={16} height={16} /> All repositories
          </Ext>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <li key={r.name} data-reveal className="min-w-0">
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                data-tilt
                className="ring-glow glass flex h-full flex-col rounded-2xl p-5 transition-colors hover:border-cyan/30"
              >
                <span className="flex min-w-0 items-center gap-2 font-display font-semibold">
                  <GitHubIcon width={16} height={16} className="shrink-0 text-muted" />
                  <span className="min-w-0 truncate">{r.name}</span>
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.description || "Project repository"}</span>
                <span className="mt-4 flex items-center gap-4 text-xs text-muted">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[r.language] ?? "#94a3b8" }} />
                      {r.language}
                    </span>
                  )}
                  {r.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star size={12} aria-hidden="true" /> {r.stargazers_count}
                    </span>
                  )}
                  {r.homepage && <span className="text-cyan">Live demo</span>}
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
