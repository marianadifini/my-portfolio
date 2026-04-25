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

/** Images in public/simulator-ux/ ux-01…05 — shown in a square frame (object-contain). GIFs work with <img>. */
const keyUxDecisions = [
  {
    title: "Calculator-Like Interaction",
    body: "Inputs are placed directly next to results, creating a fast, familiar interaction pattern that feels reliable and reassuring.",
    media: {
      src: "/simulator/1.png",
      alt: "Calculator-like simulator layout with inputs beside results",
    },
  },
  {
    title: "Earnings before features",
    body: "Users care about results, not rates. Monthly and yearly earnings are shown before plan details so users can easily understand the amount.",
    media: {
      src: "/simulator/2.png",
      alt: "Earnings shown before plan feature details",
    },
  },
  {
    title: "Boosted Rate as a Clear Incentive",
    body: "The 4% boosted rate for the first two months is clearly highlighted and labeled, preventing misleading expectations.",
    media: {
      src: "/simulator/3.png",
      alt: "Boosted rate callout and labeling",
    },
  },
  {
    title: "Effortless Plan Comparison",
    body: "Each plan exposes: interest rate, monthly earnings, and cap. This allows users to scan and compare without reading dense explanations.",
    media: {
      src: "/simulator/4.png",
      alt: "Plan comparison with rate, earnings, and cap",
    },
  },
  {
    title: "Acquisition Boost",
    body: "The Basic plan doesn’t include Account Remuneration, so we block the results to give users a reason to choose higher plans.",
    media: {
      src: "/simulator/5.png",
      alt: "Basic plan blocked state driving upgrade",
    },
  },
];

const impactMetrics = [
  "+18–25% increase in higher-tier plan selection at signup",
  "–30% time to decision (from landing to CTA click)",
  "Increased interaction with the deposit slider",
];

function SectionTitle({ children }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55 md:text-base">
      {children}
    </h2>
  );
}

function UxDecisionMedia({ src, alt }) {
  if (!src) {
    return (
      <div className="flex h-[474px] w-full items-center justify-center rounded-2xl bg-[#1E1E1E] text-center">
        <p className="text-[10px] leading-snug text-white/35">
          Add <code className="text-white/45">simulator-ux/</code>
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[474px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#1E1E1E]">
      <img
        src={src}
        alt={alt || ""}
        className="h-full w-full object-contain object-center"
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

export default function SimulatorCaseStudy() {
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
        {/* Hero — match comparators-table scale */}
        <motion.section
          className="border-b border-white/[0.06] px-6 pb-20 pt-4 sm:px-10 md:px-16 md:pb-28 md:pt-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="mx-auto max-w-7xl space-y-8 md:space-y-10">
            <p className="w-fit rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/65 md:text-xs md:tracking-[0.2em]">
              Fintech · UI/UX Design · 2025
            </p>
            <div className="space-y-6">
              <h1 className="max-w-5xl text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                Account Remuneration Simulator
              </h1>
              <p className="text-xl font-medium text-white/50 md:text-2xl">
                Client: <span className="text-white/85">Qonto</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Intro row — same grid + type as comparators intro */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28"
          {...fadeUp}
        >
          <div className="grid gap-12 border-b border-white/[0.06] pb-20 md:grid-cols-2 md:gap-16 md:pb-28">
            <p className="max-w-xl text-lg leading-relaxed text-white/72 md:text-xl">
              The Account Remuneration Simulator was designed to give freelancers and small
              businesses a clear and transparent way to understand how much they can earn with the
              new remuneration offer, turning complex financial information into an intuitive and
              actionable experience.
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
                  {deliverables.join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </motion.section>

        {/* Challenge — SectionTitle + body rhythm like comparators */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28"
          {...fadeUp}
        >
          <div className="max-w-3xl space-y-8">
            <SectionTitle>( Challenge )</SectionTitle>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Design Challenge</p>
            <p className="text-lg font-medium leading-relaxed text-white/85 md:text-xl">
              How can we make remuneration instantly understandable and motivate users to choose
              higher-value plans when opening an account?
            </p>
          </div>
        </motion.section>

        {/* Key UX Decisions — 2-up grid, vertical items (image → title → text) */}
        <section className="px-6 sm:px-10 md:px-16">
          <motion.div
            className="mx-auto flex w-full max-w-[1120px] flex-col items-start gap-16 py-[80px]"
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            <motion.div variants={itemReveal}>
              <SectionTitle>( Key UX Decisions )</SectionTitle>
            </motion.div>
            <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-14 md:gap-y-16">
              {keyUxDecisions.map((item) => (
                <motion.article
                  key={item.title}
                  variants={itemReveal}
                  className="flex w-full flex-col gap-6"
                >
                  <UxDecisionMedia src={item.media?.src} alt={item.media?.alt} />
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
                      {item.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
                      {item.body}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <motion.section className="mt-20 w-full overflow-hidden pb-20 md:mt-28 md:pb-28" {...fadeUp}>
          <ImagePlaceholder
            src="/simulator/detail.png"
            alt="Account Remuneration Simulator — mobile phone mockup"
          />
        </motion.section>

        {/* Impact — SectionTitle + stat cards like comparators Results */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={itemReveal} className="mb-12 md:mb-16">
            <SectionTitle>( Impact &amp; Metrics )</SectionTitle>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {impactMetrics.map((text, i) => (
              <motion.p
                key={i}
                variants={itemReveal}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-lg font-semibold leading-snug tracking-tight text-white/90 md:p-10 md:text-xl"
              >
                {text}
              </motion.p>
            ))}
          </div>
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
              href="/#works"
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
