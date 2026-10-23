"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { contact, profile } from "@/lib/data";
import { GitHubIcon } from "./icons";

// Three.js is heavy: load it on the client only, after the page shell renders.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

function RotatingRole() {
  const [i, setI] = useState(0);
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      gsap.to(el.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setI((n) => (n + 1) % profile.roles.length);
          gsap.fromTo(el.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        },
      });
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <span ref={el} className="text-gradient inline-block font-semibold">
        {profile.roles[i]}
      </span>
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.35, defaults: { ease: "power4.out" } });
      tl.from("[data-hero-line] > span", { yPercent: 110, duration: 1.1, stagger: 0.09 })
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")
        .from("[data-hero-scene]", { opacity: 0, scale: 0.92, duration: 1.6, ease: "power2.out" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div data-hero-scene className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="max-w-3xl pt-48 md:pt-0">
          <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-cyan" /> {profile.location}
          </p>
          <h1 className="font-display text-[clamp(2.6rem,7.5vw,5.8rem)] font-bold leading-[0.95] tracking-tight">
            <span data-hero-line className="block overflow-hidden pb-1">
              <span className="block">Muhammad</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-1">
              <span className="block">Tahir Mehmood</span>
            </span>
          </h1>
          <p data-hero-fade className="mt-6 text-xl text-fg/90 sm:text-2xl">
            <RotatingRole />
          </p>
          <p data-hero-fade className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </p>
          <p data-hero-fade className="sr-only">{profile.headline}</p>

          <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-electric to-violet px-6 py-3 font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(34,211,238,0.7)] transition-transform hover:scale-[1.03]"
            >
              Explore my work <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-colors hover:border-cyan/50"
            >
              <GitHubIcon width={18} height={18} /> View GitHub <ArrowUpRight size={16} />
            </a>
            <a href="#contact" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-colors hover:border-cyan/50">
              <Mail size={18} /> Contact me
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              <Download size={18} /> Download CV
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted md:flex"
        aria-label="Scroll to About section"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="scroll-dot absolute inset-x-0 top-0 h-1/2 bg-cyan" />
        </span>
      </a>
    </section>
  );
}
