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

const sectionStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.07 },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const problems = [
  {
    n: "01",
    title: "Hidden Content",
    body: "Crucial SEO content was buried behind dropdowns, making it invisible to search engines and hard for users to discover.",
  },
  {
    n: "02",
    title: "Information Overload",
    body: "Users faced walls of unstructured text with no clear hierarchy, making scanning nearly impossible.",
  },
  {
    n: "03",
    title: "Poor Comparability",
    body: "Side-by-side comparison was unclear, reducing user confidence and increasing decision fatigue.",
  },
];

const discovery = [
  {
    title: "Content & SEO Audit",
    body: "Analyzed analytics and search data to identify where content was hidden from crawlers and users.",
  },
  {
    title: "User Flow Analysis",
    body: "Mapped existing user journeys to pinpoint where drop-offs and confusion occurred.",
  },
  {
    title: "Competitive Benchmarking",
    body: "Reviewed 6+ competitor comparison pages to identify best practices in structure and clarity.",
  },
];

const process = [
  {
    n: "01",
    title: "Layout Iterations",
    body: "Reimagined the table structure to surface comparison points without overwhelming users.",
  },
  {
    n: "02",
    title: "Prototype & Test",
    body: "Built interactive prototypes to validate hierarchy and readability improvements.",
  },
  {
    n: "03",
    title: "Refine & Ship",
    body: "Collaborated with SEO and engineering teams to align final designs with technical requirements.",
  },
];

const results = [
  {
    text: "Replaced deep dropdowns with optimized horizontal scrolling and additional comparators.",
    media: {
      src: "/comparators/result-01.png",
      alt: "Horizontal scroll navigation with left and right arrow controls",
    },
  },
  {
    text: "Reduced text volume by 40%, grouping content into digestible, scannable blocks.",
    media: {
      src: "/comparators/result-02.png",
      alt: "Scannable pricing and support cards with concise content",
    },
  },
  {
    text: "Highlighted core comparison points to support faster, more confident decision-making.",
    media: {
      src: "/comparators/result-03.png",
      alt: "Differences-only toggle with Pricing & legal forms and Payment methods filters",
    },
  },
];

function SectionTitle({ children }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55 md:text-base">
      {children}
    </h2>
  );
}

function ResultCardMedia({ src, alt }) {
  if (!src) {
    return (
      <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center bg-[#141416] px-4 text-center">
        <p className="text-[11px] leading-snug text-white/35">
          Add an image or GIF · set <code className="text-white/45">media.src</code> in{" "}
          <code className="text-white/45">page.js</code>
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#141416]">
      <img
        src={src}
        alt={alt || ""}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
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
        {hint ? (
          <p className="text-xs tracking-wide text-white/20">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function ComparatorsTableCaseStudy() {
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
        {/* 1. HERO */}
        <motion.section
          className="border-b border-white/[0.06] px-6 pb-20 pt-4 sm:px-10 md:px-16 md:pb-28 md:pt-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="mx-auto max-w-7xl space-y-8 md:space-y-10">
            <p className="w-fit rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/65 md:text-xs md:tracking-[0.2em]">
              Fintech · Website Design · 2025
            </p>
            <div className="space-y-6">
              <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                Comparison Tables
              </h1>
              <p className="text-xl font-medium text-white/50 md:text-2xl">
                Client: <span className="text-white/85">Qonto</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* 2. INTRO ROW */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28"
          {...fadeUp}
        >
          <div className="grid gap-12 border-b border-white/[0.06] pb-20 md:grid-cols-2 md:gap-16 md:pb-28">
            <p className="max-w-xl text-lg leading-relaxed text-white/72 md:text-xl">
              Qonto’s comparison experience needed to balance dense product information with
              discoverability and trust. This project focused on surfacing what matters—clearly,
              for humans and for search—without sacrificing depth.
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
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  Deliverables
                </dt>
                <dd className="leading-relaxed text-white/90">
                  Website Design, UI/UX Design, Product Design, CMS Integration
                </dd>
              </div>
            </dl>
          </div>
        </motion.section>

        {/* 3. PROBLEM */}
        <motion.section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 sm:px-10 md:grid-cols-3 md:gap-y-8 md:px-16"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={itemReveal} className="md:col-span-3">
            <SectionTitle>( Problem )</SectionTitle>
          </motion.div>
          {problems.map((item) => (
            <motion.article
              key={item.n}
              variants={itemReveal}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-9"
            >
              <span className="mb-6 font-mono text-xs tabular-nums text-white/35">
                {item.n}
              </span>
              <h3 className="mb-4 text-lg font-bold tracking-tight text-white md:text-xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.section>

        {/* 4. DISCOVERY */}
        <motion.section
          className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 sm:px-10 md:mt-28 md:grid-cols-3 md:gap-y-8 md:px-16"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={itemReveal} className="md:col-span-3">
            <SectionTitle>( Discovery )</SectionTitle>
          </motion.div>
          {discovery.map((item) => (
            <motion.article
              key={item.title}
              variants={itemReveal}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#080809] p-8 md:p-9"
            >
              <h3 className="mb-4 text-lg font-bold tracking-tight text-white md:text-xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.section>

        {/* 5. PROCESS */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <div className="space-y-12 md:space-y-16">
            <SectionTitle>( Process )</SectionTitle>
            <ol className="relative mx-auto max-w-3xl space-y-0 border-l border-white/10 pl-8 md:pl-12">
              {process.map((step, i) => (
                <motion.li
                  key={step.n}
                  className="relative pb-16 pl-2 last:pb-0 md:pb-20"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                >
                  <span className="absolute -left-8 top-0 flex h-6 w-6 -translate-x-[calc(50%-0.5px)] items-center justify-center rounded-full border border-white/15 bg-[#0a0a0b] font-mono text-[10px] text-white/50 md:-left-12 md:h-7 md:w-7 md:text-xs">
                    {step.n}
                  </span>
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-white md:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
                    {step.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* 6. FULL WIDTH IMAGE */}
        <motion.section
          className="mt-20 w-full overflow-hidden md:mt-28"
          {...fadeUp}
        >
          <ImagePlaceholder
            src="/comparators/hero.png"
            alt="Comparison tables — hero view"
          />
        </motion.section>

        {/* 7. RESULTS */}
        <motion.section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-20 sm:px-10 md:grid-cols-3 md:gap-y-8 md:px-16 md:py-28"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemReveal} className="md:col-span-3">
            <SectionTitle>( Results )</SectionTitle>
          </motion.div>
          {results.map((item, i) => (
            <motion.article
              key={i}
              variants={itemReveal}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
            >
              <ResultCardMedia src={item.media?.src} alt={item.media?.alt} />
              <p className="p-8 text-lg font-semibold leading-snug tracking-tight text-white/90 md:p-10 md:text-xl">
                {item.text}
              </p>
            </motion.article>
          ))}
        </motion.section>

        {/* 8. SECOND IMAGE */}
        <motion.section className="w-full overflow-hidden pb-20 md:pb-28" {...fadeUp}>
          <ImagePlaceholder
            src="/comparators/01.webp"
            alt="Comparison tables — detail view"
          />
        </motion.section>

        {/* 9. FOOTER NAV */}
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
              href="/works/simulator"
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
