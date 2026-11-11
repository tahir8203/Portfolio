"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { contact, profile } from "@/lib/data";
import { GitHubIcon } from "./icons";

// Three.js is heavy: load it on the client only, after the page shell renders.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}#*";

/** Cycles through the roles with a decode/scramble effect. The text is driven by the DOM, not React state. */
function RotatingRole() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let frame = 0;
    const scrambleTo = (text: string) => {
      const total = 24;
      let f = 0;
      clearInterval(frame);
      frame = window.setInterval(() => {
        f++;
        const shown = Math.floor((text.length * f) / total);
        node.textContent =
          text.slice(0, shown) +
          Array.from(text.slice(shown), (c) => (c === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
        if (f >= total) {
          node.textContent = text;
          clearInterval(frame);
        }
      }, 32);
    };
    const id = setInterval(() => {
      i = (i + 1) % profile.roles.length;
      scrambleTo(profile.roles[i]);
    }, 3000);
    return () => {
      clearInterval(id);
      clearInterval(frame);
    };
  }, []);

  return (
    <span ref={el} className="text-gradient inline-block font-semibold" suppressHydrationWarning>
      {profile.roles[0]}
    </span>
  );
}

/** Splits a line into letters (kept together per word) so each letter can animate on its own. */
function Chars({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(w, (c, ci) => (
            <span key={ci} data-char className="inline-block will-change-transform">
              {c}
            </span>
          ))}
          {wi < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.35, defaults: { ease: "power4.out" } });
      tl.from("[data-char]", { yPercent: 120, rotation: 8, opacity: 0, duration: 0.95, stagger: 0.028, transformOrigin: "0% 100%" })
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")
        .from("[data-hero-scene]", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0)
        .from("[data-hero-portrait] > *", { opacity: 0, scale: 0.6, duration: 1.1, ease: "back.out(1.6)", stagger: 0.08 }, 0.3);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      {/* Canvas covers exactly one viewport so the 3D core and the portrait stay aligned. */}
      <div data-hero-scene className="absolute inset-x-0 top-0 h-[100svh]">
        <HeroScene />
      </div>
      <figure
        data-hero-portrait
        className="absolute top-[26svh] left-1/2 z-10 w-[150px] -translate-x-1/2 -translate-y-1/2 [@media(min-aspect-ratio:115/100)]:top-[50svh] [@media(min-aspect-ratio:115/100)]:left-[77%] [@media(min-aspect-ratio:115/100)]:w-[clamp(220px,21vw,300px)]"
      >
        <div className="portrait-ring absolute -inset-[5px] rounded-full opacity-90 blur-[1px]" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-full border-4 border-ink bg-ink shadow-[0_25px_70px_-20px_rgba(37,99,235,0.55)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/portrait-hero.jpg" alt="Muhammad Tahir Mehmood" width={560} height={560} fetchPriority="high" className="aspect-square w-full object-cover" />
        </div>
        <figcaption className="glass absolute -bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap [@media(min-aspect-ratio:115/100)]:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" /> Open to collaborate
        </figcaption>
      </figure>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div data-hero-content className="max-w-3xl pt-[calc(26svh-8px)] [@media(min-aspect-ratio:115/100)]:max-w-[min(42rem,60vw)] [@media(min-aspect-ratio:115/100)]:pt-0">
          <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-cyan" /> {profile.location}
          </p>
          <h1 aria-label={profile.name} className="font-display text-[clamp(2.6rem,7.5vw,5.8rem)] font-bold leading-[0.95] tracking-tight">
            <span aria-hidden="true" className="block overflow-hidden pb-1">
              <Chars text="Muhammad" />
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-1">
              <Chars text="Tahir Mehmood" />
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
              data-magnetic
              className="btn-shine group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-electric to-violet px-6 py-3 font-semibold text-on-accent shadow-[0_10px_40px_-10px_rgba(34,211,238,0.7)]"
            >
              Explore my work <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium hover:border-cyan/50"
            >
              <GitHubIcon width={18} height={18} /> View GitHub <ArrowUpRight size={16} />
            </a>
            <a href="#contact" data-magnetic className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium hover:border-cyan/50">
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
        <span className="relative h-10 w-px overflow-hidden bg-fg/15">
          <span className="scroll-dot absolute inset-x-0 top-0 h-1/2 bg-cyan" />
        </span>
      </a>
    </section>
  );
}
