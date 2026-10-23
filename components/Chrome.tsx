"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { contact, nav } from "@/lib/data";
import { WhatsAppIcon } from "./icons";

/** Short branded intro. Never blocks longer than ~1.4s and is skipped under reduced motion. */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setGone(true) });
    tl.fromTo(el.querySelector("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" })
      .to(el.querySelector("[data-mark]"), { y: -12, opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.05")
      .to(el, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "-=0.1");
    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[100] grid place-items-center bg-ink" role="status" aria-label="Loading">
      <div data-mark className="text-center">
        <div className="font-display text-5xl font-bold tracking-tight">
          <span className="text-gradient">MTM</span>
        </div>
        <div className="mx-auto mt-5 h-px w-44 overflow-hidden bg-white/10">
          <div data-bar className="h-full origin-left bg-gradient-to-r from-cyan via-electric to-violet" />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">Education · Technology · Leadership</p>
      </div>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        setScrolled(scrollY > 24);
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
    return () => {
      removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div ref={bar} className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan via-electric to-violet" />
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${scrolled ? "glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]" : ""}`}
      >
        <a href="#home" className="font-display text-lg font-bold tracking-tight" aria-label="Muhammad Tahir Mehmood — home">
          tahir<span className="text-cyan">.</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                aria-current={active === n.href ? "location" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-fg ${active === n.href ? "bg-white/[0.07] text-fg" : "text-muted"}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-electric px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        className={`mx-4 mt-2 overflow-hidden rounded-2xl glass transition-all duration-500 lg:hidden ${open ? "max-h-[480px] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
        hidden={!open}
      >
        <ul className="grid gap-1 p-3">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-base hover:bg-white/5">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Tahir on WhatsApp"
      className="pulse-ring group fixed bottom-5 right-5 z-40 isolate grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
    >
      <WhatsAppIcon width={28} height={28} />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-ink-2 px-3 py-1.5 text-sm text-fg opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        WhatsApp me
      </span>
    </a>
  );
}
