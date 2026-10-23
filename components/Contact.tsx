"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Loader2, Mail, Send } from "lucide-react";
import { contact, profile } from "@/lib/data";
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./icons";

// FormSubmit forwards submissions to the inbox below — free, no account or API key.
// The very first submission triggers a one-time activation email to that inbox.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`;

const channels = [
  { label: "Email me", value: contact.email, href: `mailto:${contact.email}`, Icon: Mail, color: "from-cyan to-electric", external: false },
  { label: "WhatsApp me", value: contact.whatsappDisplay, href: contact.whatsapp, Icon: WhatsAppIcon, color: "from-[#25d366] to-[#128c7e]", external: true },
  { label: "LinkedIn", value: "in/tahir8203", href: contact.linkedin, Icon: LinkedInIcon, color: "from-[#0a66c2] to-[#004182]", external: true },
  { label: "Instagram", value: "@m.tahir.mehmod", href: contact.instagram, Icon: InstagramIcon, color: "from-[#f58529] via-[#dd2a7b] to-[#8134af]", external: true },
  { label: "Facebook", value: "mtahirmehmood", href: contact.facebook, Icon: FacebookIcon, color: "from-[#1877f2] to-[#0b5fcc]", external: true },
  { label: "GitHub", value: "tahir8203", href: contact.github, Icon: GitHubIcon, color: "from-slate-500 to-slate-700", external: true },
] as const;

export const socials = channels.filter((c) => c.label !== "Email me");

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      // Fallback for browsers without async clipboard permission.
      const ta = document.createElement("textarea");
      ta.value = contact.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-cyan/50 hover:text-cyan"
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? "Email copied" : "Copy email"}
      <span className="sr-only" aria-live="polite">
        {copied ? `${contact.email} copied to clipboard` : ""}
      </span>
    </button>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data._honey) return; // bot
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _replyto: data.email,
          _subject: `Portfolio: ${data.subject}`,
          message: data.message,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") throw new Error(json.message || "Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-fg/[0.03] px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition focus:border-cyan/60 focus:bg-fg/[0.05] focus:ring-2 focus:ring-cyan/20";

  return (
    <form onSubmit={onSubmit} className="glass ring-glow rounded-3xl p-6 sm:p-8" aria-describedby="form-status">
      <h3 className="font-display text-2xl font-semibold">Send a message</h3>
      <p className="mt-1 text-sm text-muted">I usually reply within a day or two.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          Name
          <input name="name" required autoComplete="name" maxLength={100} className={field} placeholder="Your name" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Email
          <input name="email" type="email" required autoComplete="email" maxLength={150} className={field} placeholder="you@example.com" />
        </label>
      </div>
      <label className="mt-4 grid gap-1.5 text-sm">
        Subject
        <input name="subject" required maxLength={150} className={field} placeholder="Project, collaboration, training…" />
      </label>
      <label className="mt-4 grid gap-1.5 text-sm">
        Message
        <textarea name="message" required rows={5} maxLength={4000} className={`${field} resize-y`} placeholder="Tell me a little about it" />
      </label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan via-electric to-violet px-6 py-3.5 font-semibold text-on-accent transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p id="form-status" role="status" aria-live="polite" className="mt-4 min-h-5 text-sm">
        {status === "sent" && <span className="text-emerald-600 dark:text-emerald-300">Thank you — your message has been sent.</span>}
        {status === "error" && (
          <span className="text-rose-600 dark:text-rose-300">
            Couldn&apos;t send right now. Please email{" "}
            <a className="underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{" "}
            or use WhatsApp.
          </span>
        )}
      </p>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-gradient-to-r from-cyan/10 via-electric/10 to-violet/15 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-14 max-w-3xl">
          <p data-reveal className="eyebrow mb-4">
            <span className="text-muted">08 /</span> Contact &amp; connect
          </p>
          <h2 data-reveal className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
            Have an idea? <span className="text-gradient">Let&apos;s make it meaningful.</span>
          </h2>
          <p data-reveal className="mt-5 text-lg text-muted">
            Software for a school or college, an AI or automation project, training, or a collaboration — reach me on whichever channel suits you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <ul className="grid gap-3">
              {channels.map(({ label, value, href, Icon, color, external }) => (
                <li key={label} data-reveal>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-tilt
                    className="group ring-glow glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-fg/20"
                  >
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                      <Icon width={22} height={22} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-semibold">{label}</span>
                      <span className="block truncate text-sm text-muted">{value}</span>
                    </span>
                    <ArrowUpRight size={18} className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden="true" />
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-5 flex flex-wrap items-center gap-3">
              <CopyEmail />
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                Download CV
              </a>
            </div>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pt-10 pb-28 sm:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <a href="#home" className="font-display text-lg font-bold">
            tahir<span className="text-cyan">.</span>
          </a>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
        </div>
        <ul className="flex items-center gap-2" aria-label="Social links">
          <li>
            <a href={`mailto:${contact.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan">
              <Mail size={18} aria-hidden="true" />
            </a>
          </li>
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <Icon width={18} height={18} aria-hidden="true" />
              </a>
            </li>
          ))}
          <li>
            <a href="#home" aria-label="Back to top" className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-fg/5 text-fg transition-colors hover:bg-fg/10">
              <ArrowUp size={18} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
