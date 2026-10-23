# Muhammad Tahir Mehmood — Portfolio (v2, 3D)

Interactive portfolio of **Muhammad Tahir Mehmood** — Computer Science Educator, Software Developer, AI & Automation enthusiast and Educational Administration professional (Okara, Pakistan).

**Stack:** Next.js 15 (static export) · React 19 · TypeScript · Tailwind CSS 4 · Three.js / React Three Fiber / Drei · GSAP + ScrollTrigger · Lenis smooth scroll · Lucide icons.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site written to ./out
```

## Updating content

Almost everything lives in **`lib/data.ts`** — edit it and push; Vercel redeploys automatically.

| To change… | Edit |
|---|---|
| Name, headline, rotating roles, intro | `profile` |
| Email, WhatsApp, Instagram, Facebook, GitHub | `contact` |
| Featured projects (PGC LMS, DEA Okara) | `featured` — screenshots in `public/shots/` |
| Other software / teaching portals | `moreSoftware`, `teaching` |
| DEA / leadership text, government platforms | `leadership`, `govPlatforms` |
| Skills, experience timeline, education, research | `skills`, `timeline`, `education`, `research` |
| GitHub cards | Pulled from the public GitHub API at build time; order and fallback descriptions in `app/page.tsx` |
| CV / portrait | Replace `public/Muhammad-Tahir-Mehmood-CV.pdf` / `public/portrait-web.jpg` (keep the names) |
| Social preview image | `public/og.png` (1200×630) |
| Site address used in SEO tags | `SITE_URL` in `lib/data.ts` |

To refresh a project screenshot, save a 1440×900 JPG over the file in `public/shots/`.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) (free, no account or API key). **The first message sent through the live site triggers a one-time activation email to tahir8203@gmail.com — click the link in it once** and every later message is delivered. If the service is ever unavailable the form shows the email address and WhatsApp as a fallback.

## Project structure

```
app/          layout (SEO, JSON-LD), page, globals.css, sitemap, robots, icon
components/   Hero + HeroScene (3D), Sections, Contact/Footer, Chrome (loader, nav, WhatsApp button), Motion (GSAP/Lenis)
lib/data.ts   all content
public/       CV, portrait, og.png, project screenshots
```

## Accessibility & performance

- Respects `prefers-reduced-motion`: no loader, no smooth scroll, static 3D scene, all content visible.
- Three.js is code-split and loaded after first paint; the canvas stops rendering when the hero is off-screen; fewer particles and lower pixel ratio on phones.
- Skip link, visible focus rings, labelled controls, `aria-current` navigation, external links announced.

## Deploy (free)

Vercel (Hobby plan, free) builds this automatically from GitHub — `vercel.json` sets the framework to Next.js and the output to `out/`.
Because it is a fully static export, the same `out/` folder can also be hosted free on GitHub Pages, Netlify or Cloudflare Pages.
