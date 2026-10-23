import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_URL, contact, profile } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

const title = `${profile.name} — CS Educator, Software Developer & Education Leader`;
const description =
  "10+ years across Computer Science teaching, software development, AI & automation, and educational administration in Okara, Pakistan. LMS platforms, district reporting systems and interactive learning portals.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    "Muhammad Tahir Mehmood",
    "Computer Science Lecturer Okara",
    "Software Developer Pakistan",
    "LMS developer",
    "DEA Okara",
    "Educational technology",
    "AI automation",
    "Flutter Firebase",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05060f" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}${profile.portrait}`,
  email: `mailto:${contact.email}`,
  jobTitle: "Computer Science Educator & Software Developer",
  address: { "@type": "PostalAddress", addressLocality: "Okara", addressRegion: "Punjab", addressCountry: "PK" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Government College University Faisalabad" },
    { "@type": "CollegeOrUniversity", name: "University of Education, Lahore" },
  ],
  sameAs: [contact.github, contact.instagram, contact.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Mark motion support before paint so reveal targets don't flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js-motion');try{if(localStorage.getItem('theme')==='dark')d.dataset.theme='dark'}catch(e){}",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
