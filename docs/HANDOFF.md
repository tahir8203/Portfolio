# Portfolio — technical handoff

Written so the work can continue from another Claude account. Covers the original build chat (Oct–Nov 2026).

## 1. Where things are

| Thing | Location |
|---|---|
| Source | https://github.com/tahir8203/Portfolio, branch `main` |
| Live site | https://tahir-portfolio-teal.vercel.app |
| Hosting | Vercel, free Hobby plan, team `tahirs-projects-44e2c3df`. Two projects deploy from this repo: **`tahir-portfolio`** (serves the live address above) and **`portfolio`** (serves `portfolio-ashen-five-57.vercel.app`) |
| Original static site | Still in git history before PR #1 (`index.html`, `style.css`, `script.js`) |
| CV | `public/Muhammad-Tahir-Mehmood-CV.pdf` (download button on the site) |
| Photos | `public/portrait-web.jpg` (full length), `public/portrait-hero.jpg` (square crop for the hero) |
| Project screenshots | `public/shots/*.jpg` (1440×900) |

## 2. Stack and structure

Next.js 15 (static export to `out/`) · React 19 · TypeScript · Tailwind CSS 4 · React Three Fiber / Drei / Three.js · GSAP + ScrollTrigger · Lenis smooth scroll · lucide-react (brand icons are custom SVGs in `components/icons.tsx`).

```
app/layout.tsx        SEO metadata, Open Graph image (public/og.png), JSON-LD Person, theme bootstrap script
app/page.tsx          Page order; GitHub repos fetched at build time (public only) + fallback descriptions
app/globals.css       Theme tokens (light default, dark via [data-theme="dark"]), aurora, grain, cursor ring, gallery, view transitions
components/Hero.tsx       Letter-by-letter name, scramble role text, portrait centred on the 3D core, magnetic buttons
components/HeroScene.tsx  3D "knowledge core", rings with satellites, particles; theme-aware palette; pauses off-screen
components/Sections.tsx   About (bento), KineticBand, Work (stacking cards), Teaching (pinned horizontal gallery),
                          Leadership, Skills, Journey (timeline + education + research), GitHub
components/Contact.tsx    Contact cards, copy-email, FormSubmit form, footer with outline wordmark
components/Chrome.tsx     Loader, nav, theme toggle (circular view transition), Aurora, WhatsApp button
components/Motion.tsx     Lenis, word-split headings, IntersectionObserver reveals, stacking, pinned gallery, marquee,
                          tilt, magnetic, cursor ring. Everything off under prefers-reduced-motion.
lib/data.ts           ALL content
vercel.json           framework: nextjs + security headers
```

Build check: `npx tsc --noEmit` then `npx next build` (must end with `✓ Exporting`).

## 3. Pull request history

| PR | What |
|---|---|
| #1 | Rebuild as Next.js 3D site; later white/light theme, hero portrait inside the 3D core, dark toggle |
| #2 | LinkedIn link (contact card, footer, JSON-LD) |
| #3 | Timeline: Headmaster GES 53/2-L since Feb 2026; Assistant Director (P&D) additional charge since Sep 2026 |
| #4 | GHS 44/3-R: Secondary School Teacher Mar 2018 – Jun 2023, Headmaster (Additional Charge) Jun 2023 – Feb 2026 |
| #5 | Compiler Construction course card |
| #6 | Compiler card mentions Bloom's Taxonomy |
| #7 | v3 motion system and layout |
| #8 | Applications of ICT course card |
| #9 | Compiler Construction card → complete course |

## 4. Verified facts (supplied or confirmed by Tahir — do not change without asking)

- **10+ years** experience (the user's own figure; the old site said 9+).
- **Assistant Director (Planning & Development) — additional charge**, Office of the CEO, DEA Okara — **Sep 2026 – present**.
- **Headmaster, Govt. Elementary School 53/2-L, Okara** — **Feb 2026 – present**.
- **Lecturer, University of Central Punjab, Okara Campus** — Nov 2023 – present.
- **Visiting Lecturer, University of Okara** — 2018 – Jun 2026 (LinkedIn: Jun 2018 – Jun 2026, part-time).
- **Govt. High School 44/3-R, Okara:** Secondary School Teacher Mar 2018 – Jun 2023, then **Headmaster (Additional Charge) Jun 2023 – Feb 2026**.
- **ILM College, Renala:** Visiting Lecturer & Head of IT, **Sep 2017 – Jun 2022, part-time**.
- Education: MS/M.Phil. CS, GCU Faisalabad 2018–2020 (CGPA 3.71); B.Ed. AIOU 2018–2019 (Grade A); BS (Hons.) IT, University of Education Lahore 2013–2017 (CGPA 3.57).
- Publication: *Deep learning method to detect the road cracks and potholes for smart cities*, Computers, Materials & Continua 75(1), 2023.
- Government portals (SIS, GRADES, SMU, SMU IPMS) are **used, not built** by Tahir — the site says so explicitly. Keep that note.
- Public contact details on the site: tahir8203@gmail.com, WhatsApp +92 343 4021446, LinkedIn `in/tahir8203`, Instagram `m.tahir.mehmod`, Facebook `mtahirmehmood`, GitHub `tahir8203`.

## 5. Decisions worth keeping

- **Light theme by default** (Tahir asked for a white background); dark mode is a remembered toggle.
- Skills have **no percentages** (avoid invented proficiency).
- Private repos (PGC-LMS-Portal, dea-okara-school-reporting) are described from their READMEs only; the GitHub section shows **public repos only**.
- The timetable screenshot was left out because it showed real staff names.
- `vercel.json` must **not** set `outputDirectory` — Vercel's Next.js builder handles the static export (setting it broke the first preview).
- Merging to `main` publishes the live site, so ask before merging.

## 6. LinkedIn (updated in the same chat, by hand in the browser)

Profile https://www.linkedin.com/in/tahir8203 was updated to match the portfolio: headline (Headmaster | Assistant Director (P&D) | CS Lecturer | Software Developer | AI & Automation), About text, portfolio website, all experience entries above, MS + B.Ed. education, the publication, 14 skills and 4 Featured links (portfolio, PGC LMS, DEA reporting, AI course). Network notifications were kept off; nothing was posted. Note: adding a position can silently overwrite the headline — check it after adding roles.

## 7. Open items

- **Contact form (FormSubmit):** the first message sent from the live site triggers a one-time activation email to tahir8203@gmail.com; click it once, then messages arrive normally.
- **`mtahirmehmood.vercel.app`** was added in the Vercel dashboard but never served the site (DEPLOYMENT_NOT_FOUND). Either fix it in Vercel → `tahir-portfolio` → Settings → Domains, or remove it. Free alternatives checked available on 2026-10-23: `tahir8203.vercel.app`, `tahir.is-a.dev`, `tahir8203.github.io`.
- **Vercel connector:** the Claude Vercel connector never got access to team `tahirs-projects-44e2c3df`; domain and project changes were done by hand in the dashboard.
- **LinkedIn location** still shows Lahore District (set from postal code in Edit intro).
- **`D:\Fall 2026\Compiler\Compiler_Construction_Lectures_1_2_3.html`** (the non-`v2` file) was never updated.
