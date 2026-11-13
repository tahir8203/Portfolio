# START HERE

This repository is the **personal portfolio of Muhammad Tahir Mehmood** — Computer Science educator, software developer, AI & automation, and educational administration (Okara, Pakistan). Everything needed to continue the work is in this repo, so a new person or a new Claude account can pick it up from here.

- **Live site:** https://tahir-portfolio-teal.vercel.app
- **Repo:** https://github.com/tahir8203/Portfolio (branch `main` is production)
- **Full handoff:** [`docs/HANDOFF.md`](docs/HANDOFF.md) — what was built, every decision, verified facts, open items

## Starting with a new Claude account

1. Get the code:
   ```bash
   git clone https://github.com/tahir8203/Portfolio.git
   ```
2. Install and run it (Node 20+):
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```
3. Open Claude Code in that folder and paste:

> I am continuing my portfolio website. Read `START-HERE.md` and `docs/HANDOFF.md` first. Keep the same stack (Next.js static export, Tailwind 4, React Three Fiber, GSAP), the light-by-default design, my verified career facts and the Bloom's Taxonomy wording for courses. Work on a branch and open a pull request; ask me before merging to `main`, because `main` publishes the live site. After reading, tell me in a few lines what you understood, then wait for my request.

## Everyday edits

- **Text, roles, dates, projects, courses, links:** almost all of it is in [`lib/data.ts`](lib/data.ts).
- **Publishing:** merge to `main` → Vercel builds and publishes automatically in about a minute.
- **Adding a course card:** add an entry to `teaching` in `lib/data.ts` and a 1440×900 screenshot in `public/shots/`.

## Related repositories

| Repo | What it is | Live |
|---|---|---|
| [tahir8203/Portfolio](https://github.com/tahir8203/Portfolio) | This portfolio | https://tahir-portfolio-teal.vercel.app |
| [tahir8203/Compiler-Construction](https://github.com/tahir8203/Compiler-Construction) | Compiler Construction course portal + Android app (has its own `START-HERE.md`) | https://compiler-construction-phi.vercel.app |
| [tahir8203/Artificial-Intelligence](https://github.com/tahir8203/Artificial-Intelligence) | AI course portal | https://artificial-intelligence-lake.vercel.app |
| [tahir8203/Mobile-Application-Development](https://github.com/tahir8203/Mobile-Application-Development) | Mobile App Development course | https://mobile-application-development-five.vercel.app |
| [tahir8203/Game-Design-Development](https://github.com/tahir8203/Game-Design-Development) | Game Design & Development course | https://game-design-development.vercel.app |
| [tahir8203/Introduction-to-modern-Computer-Science](https://github.com/tahir8203/Introduction-to-modern-Computer-Science) | Intro to Modern CS lecture | https://intro-modern-computer-science.vercel.app |
