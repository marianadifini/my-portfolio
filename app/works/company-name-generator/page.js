"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.75, ease },
};

function SectionTitle({ children }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55 md:text-base">
      {children}
    </h2>
  );
}

function ImagePlaceholder({ label = "Project Image", hint, src, alt }) {
  if (src) {
    return (
      <div className="relative w-full overflow-hidden bg-[#141416]">
        <img
          src={src}
          alt={alt || label}
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }
  return (
    <div
      className="relative flex min-h-[min(70vh,52rem)] w-full items-center justify-center bg-[#141416] text-center"
      role="img"
      aria-label={hint ?? label}
    >
      <div className="space-y-2 px-6">
        <p className="text-lg font-medium tracking-tight text-white/35 md:text-xl">{label}</p>
        {hint ? <p className="text-xs tracking-wide text-white/20">{hint}</p> : null}
      </div>
    </div>
  );
}

export default function CompanyNameGeneratorCaseStudy() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 text-sm uppercase tracking-[0.24em] text-white/70 sm:px-10 md:px-16">
        <Link href="/" className="transition hover:text-white">
          Mariana Difini
        </Link>
        <nav className="flex items-center gap-7">
          <Link href="/#works" className="transition hover:text-white">
            Works
          </Link>
          <Link href="/#info" className="transition hover:text-white">
            Info
          </Link>
        </nav>
      </header>

      <main>
        <motion.section
          className="border-b border-white/[0.06] px-6 pb-20 pt-4 sm:px-10 md:px-16 md:pb-28 md:pt-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="mx-auto max-w-7xl space-y-8 md:space-y-10">
            <p className="w-fit rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/65 md:text-xs md:tracking-[0.2em]">
              Fintech · AI Tool · 2025
            </p>
            <div className="space-y-6">
              <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                AI Company Name Generator
              </h1>
              <p className="text-xl font-medium text-white/50 md:text-2xl">
                Client: <span className="text-white/85">Qonto</span>
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28" {...fadeUp}>
          <div className="grid gap-12 border-b border-white/[0.06] pb-20 md:grid-cols-2 md:gap-16 md:pb-28">
            <p className="max-w-xl text-lg leading-relaxed text-white/72 md:text-xl">
              The goal of this project was to design an AI-powered tool that helps users generate company names while driving high-quality company creation leads for Qonto.
            </p>
            <dl className="space-y-6 text-sm md:text-base">
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">Year</dt>
                <dd className="text-white/90">2025</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">Client</dt>
                <dd className="text-white/90">Qonto</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">Deliverables</dt>
                <dd className="leading-relaxed text-white/90">Website Design, UI/UX Design, Product Design, CMS Integration</dd>
              </div>
            </dl>
          </div>
        </motion.section>

        <motion.section className="mt-20 w-full overflow-hidden md:mt-28" {...fadeUp}>
          <ImagePlaceholder
            src="/name-generator/01.avif"
            alt="AI Company Name Generator — main view"
          />
        </motion.section>

        <motion.section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28" {...fadeUp}>
          <div className="max-w-4xl space-y-8">
            <SectionTitle>( Problem statement )</SectionTitle>
            <p className="text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              How might we design an AI-powered company name generator that scales across hundreds of industries, drives qualified leads for Qonto, and remains intuitive and SEO-friendly for users?
            </p>
            <p className="text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
              I collaborated with a cross-functional team including a Product Manager, SEO specialists, and a Developer to design a scalable system composed of a main landing page and hundreds of industry-specific child pages, all optimized for SEO performance.
            </p>
            <p className="text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
              The primary UX challenge was enabling smooth navigation between the main page and the numerous child pages. To solve this, we structured the main page around key industries, using a clear and intuitive tagging system. Users could quickly explore broad categories or, if they belonged to a more niche industry, be guided to a dedicated child page offering a more tailored experience.
            </p>
            <p className="text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
              This project balanced usability and SEO requirements, improving discoverability while maintaining a clear and intuitive user journey. The two-week timeline pushed us to work efficiently and launch hundreds of pages without compromising quality.
            </p>
          </div>
        </motion.section>

        <motion.section className="w-full overflow-hidden pb-20 md:pb-28" {...fadeUp}>
          <ImagePlaceholder
            src="/name-generator/02.webp"
            alt="AI Company Name Generator — detail view"
          />
        </motion.section>

        <motion.footer
          className="border-t border-white/10 px-6 py-16 sm:px-10 md:px-16 md:py-20"
          {...fadeUp}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <Link
              href="/#works"
              className="text-2xl font-bold tracking-tight text-white/80 transition hover:text-white md:text-3xl lg:text-4xl"
            >
              ← Back to Works
            </Link>
            <Link
              href="/works/ai-page-generator"
              className="text-2xl font-bold tracking-tight text-white/80 transition hover:text-white md:text-3xl lg:text-4xl"
            >
              Next Project →
            </Link>
          </nav>
        </motion.footer>
      </main>
    </div>
  );
}
