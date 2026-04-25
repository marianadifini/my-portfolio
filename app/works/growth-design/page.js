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

const deliverables = [
  "Website Design",
  "UI/UX Design",
  "Product Design",
  "CMS Integration",
];

const approach = [
  {
    title: "Conversion mindset by default",
    body: "Each experience is designed with a conversion mindset — ensuring users quickly understand the value proposition, feel confident in their next step, and are guided toward meaningful actions without friction.",
  },
  {
    title: "System-level design thinking",
    body: "Beyond individual pages, I work at the system level, contributing to the evolution of design systems by identifying gaps, introducing new modules when needed, and ensuring scalability across markets and use cases while preserving consistency and core design principles.",
  },
  {
    title: "Visual storytelling for growth",
    body: "I also create custom UI illustrations and isometric visuals to support growth initiatives, translating complex concepts into clear, engaging visuals that improve comprehension and strengthen storytelling across acquisition funnels.",
  },
];

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

export default function GrowthDesignCaseStudy() {
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
              Fintech · Growth Design · 2025
            </p>
            <div className="space-y-6">
              <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                Growth Design
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
              I design and optimize high-impact landing pages and conversion tools across multiple websites, products, and markets. My work involve both Marketing and SEO-driven initiatives, always guided by clear user journeys, strong value communication, and measurable outcomes.
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
                <dd className="leading-relaxed text-white/90">{deliverables.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </motion.section>

        <motion.section className="mt-20 w-full overflow-hidden md:mt-28" {...fadeUp}>
          <ImagePlaceholder src="/growth/02.webp" alt="Growth Design — main view" />
        </motion.section>

        <motion.section
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={itemReveal} className="mb-12 md:mb-16">
            <SectionTitle>( Growth approach )</SectionTitle>
          </motion.div>
          <div className="grid gap-8 md:gap-10">
            {approach.map((item) => (
              <motion.article
                key={item.title}
                variants={itemReveal}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10"
              >
                <h3 className="mb-4 text-lg font-bold tracking-tight text-white md:text-xl">{item.title}</h3>
                <p className="max-w-3xl text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="w-full overflow-hidden pb-20 md:pb-28" {...fadeUp}>
          <ImagePlaceholder src="/growth/03.webp" alt="Growth Design — detail view" />
        </motion.section>

        <motion.section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 md:px-16 md:pb-28" {...fadeUp}>
          <p className="max-w-4xl text-lg font-medium leading-relaxed text-white/82 md:text-xl">
            This approach allows me to design experiences that are not only visually cohesive, but also adaptable, scalable, and optimized for growth across diverse products and audiences.
          </p>
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
              href="/works/company-name-generator"
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
