"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/** Wraps every word of `el` in a masked span so words can rise into place one by one. */
function splitWords(el: HTMLElement) {
  if (el.classList.contains("is-split")) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((n) => {
    // background-clip:text does not follow transformed children, so the gradient moves onto each word.
    const grad = !!n.parentElement?.closest(".text-gradient");
    const frag = document.createDocumentFragment();
    (n.textContent ?? "").split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) return void frag.appendChild(document.createTextNode(" "));
      const w = document.createElement("span");
      w.className = "w";
      const wi = document.createElement("span");
      wi.className = grad ? "wi text-gradient" : "wi";
      wi.textContent = part;
      w.appendChild(wi);
      frag.appendChild(w);
    });
    n.replaceWith(frag);
  });
  el.querySelectorAll(".text-gradient:not(.wi)").forEach((g) => g.classList.remove("text-gradient"));
  el.classList.add("is-split");
}

/**
 * Global motion layer: Lenis smooth scrolling synced with GSAP ScrollTrigger, word-by-word
 * heading reveals, scroll reveals, stacking project cards, the pinned horizontal course
 * gallery, velocity-reactive marquees, magnetic buttons, card tilt and the cursor ring.
 * Everything is skipped under reduced motion, where the page stays fully readable.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("js-motion");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      window.addEventListener(t, fn, opts);
      cleanups.push(() => window.removeEventListener(t, fn));
    };

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation (keeps native behaviour for keyboard focus).
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#" ? null : document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      history.replaceState(null, "", id);
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    // Stacking cards only stick when the whole card fits under the nav, so nothing is ever cut off.
    const stack = gsap.utils.toArray<HTMLElement>("[data-stack]");
    const fitStack = () => stack.forEach((c) => c.classList.toggle("is-sticky", innerWidth >= 1024 && c.offsetHeight <= innerHeight - 120));
    fitStack();

    const ctx = gsap.context(() => {
      // Pinned horizontal gallery. Created first so every trigger below it accounts for the pin spacing.
      const pinEl = document.querySelector<HTMLElement>("[data-hscroll-pin]");
      const hs = pinEl?.querySelector<HTMLElement>("[data-hscroll]");
      const track = pinEl?.querySelector<HTMLElement>("[data-hscroll-track]");
      if (pinEl && hs && track && fine) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          const fits = () => pinEl.offsetHeight <= innerHeight - 96;
          pinEl.classList.add("hs-pinned");
          if (!fits()) pinEl.classList.add("hs-tight");
          if (!fits()) {
            pinEl.classList.remove("hs-pinned", "hs-tight");
            return;
          }
          const dist = () => Math.max(0, track.scrollWidth - hs.clientWidth);
          const bar = pinEl.querySelector<HTMLElement>("[data-hscroll-bar]");
          gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: pinEl,
              start: () => `top ${Math.max(92, (innerHeight - pinEl.offsetHeight) / 2)}px`,
              end: () => `+=${dist()}`,
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => bar && (bar.style.transform = `scaleX(${self.progress})`),
            },
          });
          return () => pinEl.classList.remove("hs-pinned", "hs-tight");
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        splitWords(el);
        gsap.set(el.querySelectorAll(".wi"), { yPercent: 115 });
      });

      // Images open up from a rounded inset as they scroll into view.
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 10% 14% 10% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.6 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax) || -12,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: -10,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: "#home", start: "top top", end: "bottom 25%", scrub: true },
        });
      }

      stack.forEach((card, i) => {
        const next = stack[i + 1];
        const inner = card.firstElementChild;
        if (!next || !inner) return;
        const sticky = () => card.classList.contains("is-sticky");
        gsap.to(inner, {
          scale: () => (sticky() ? 0.94 : 1),
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 100px", scrub: true, invalidateOnRefresh: true },
        });
      });

      const line = document.querySelector<HTMLElement>("[data-timeline-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: line.parentElement, start: "top 70%", end: "bottom 60%", scrub: true },
          },
        );
      }

    });

    // Entrance animations run off an IntersectionObserver, so nothing stays hidden when the page
    // jumps (reload at the bottom, End key, find-in-page) instead of scrolling past smoothly.
    const enter = (el: HTMLElement, i: number) => {
      const delay = i * 0.07;
      if (el.hasAttribute("data-split")) {
        gsap.to(el.querySelectorAll(".wi"), { yPercent: 0, duration: 0.95, ease: "power4.out", stagger: 0.04, delay });
      }
      if (el.hasAttribute("data-reveal")) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay, overwrite: "auto" });
      }
      if (el.dataset.count) {
        const obj = { v: 0 };
        const suffix = el.dataset.suffix ?? "";
        gsap.to(obj, { v: Number(el.dataset.count), duration: 1.6, ease: "power2.out", delay, onUpdate: () => (el.textContent = Math.round(obj.v) + suffix) });
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        entries.forEach((e) => {
          // also catch elements that are already above the viewport
          if (!e.isIntersecting && e.boundingClientRect.top > 0) return;
          io.unobserve(e.target);
          enter(e.target as HTMLElement, e.isIntersecting ? i++ : 0);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-split], [data-reveal], [data-count]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Marquee rows drift on their own and speed up with the scroll velocity.
    const bands = gsap.utils.toArray<HTMLElement>("[data-marquee]").map((el) => ({ el, dir: Number(el.dataset.marquee) || 1, x: 0, half: 0 }));
    const measure = () => bands.forEach((b) => (b.half = b.el.scrollWidth / 2));
    measure();
    const marquee = (_t: number, dt: number) => {
      const v = Math.min(60, Math.abs(lenis.velocity || 0));
      bands.forEach((b) => {
        if (!b.half) return;
        b.x -= b.dir * (0.05 + v * 0.02) * dt;
        if (b.x <= -b.half) b.x += b.half;
        if (b.x > 0) b.x -= b.half;
        b.el.style.transform = `translate3d(${b.x}px,0,0)`;
      });
    };
    gsap.ticker.add(marquee);

    if (fine) {
      // 3D tilt + spotlight on cards.
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        gsap.set(card, { transformPerspective: 900, transformStyle: "preserve-3d" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });

      // Magnetic buttons lean toward the pointer and spring back.
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - (r.left + r.width / 2)) * 0.28,
            y: (e.clientY - (r.top + r.height / 2)) * 0.28,
            duration: 0.35,
            ease: "power3",
            overwrite: true,
          });
        };
        const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)", overwrite: true });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      // A ring that trails the pointer and grows over interactive things. The native cursor stays.
      const ring = document.createElement("div");
      ring.className = "cursor-ring";
      ring.setAttribute("aria-hidden", "true");
      document.body.appendChild(ring);
      const qx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
      const qy = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
      on(
        "pointermove",
        (e) => {
          qx(e.clientX);
          qy(e.clientY);
          const t = e.target as Element | null;
          ring.classList.toggle("on", !t?.closest?.("input, textarea, select"));
          ring.classList.toggle("hot", !!t?.closest?.("a, button, summary, [data-tilt]"));
        },
        { passive: true },
      );
      const hide = () => ring.classList.remove("on");
      document.addEventListener("pointerleave", hide);
      cleanups.push(() => {
        document.removeEventListener("pointerleave", hide);
        ring.remove();
      });
    }

    // Images/fonts can shift layout after first paint.
    const refresh = () => {
      fitStack();
      measure();
      ScrollTrigger.refresh();
    };
    on("load", refresh);
    on("resize", () => {
      fitStack();
      measure();
    });
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      ctx.revert();
      cleanups.forEach((c) => c());
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      gsap.ticker.remove(marquee);
      lenis.destroy();
    };
  }, []);

  return null;
}
