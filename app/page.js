"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Account Remuneration Simulator",
    category: "Fintech",
    year: "2025",
    image: "/simulator.png",
    href: "/works/simulator",
  },
  {
    title: "AI Page Creator",
    category: "AI · CMS",
    year: "2026",
    image: "/ai-page-generator-thumb.svg",
    href: "/works/ai-page-generator",
  },
  {
    title: "Comparison Tables",
    category: "Fintech",
    year: "2025",
    image: "/comparators/hero.png",
    href: "/works/comparators-table",
  },
  {
    title: "Growth Design",
    category: "Various",
    year: "2022–2026",
    image: "/growth-design.png",
    href: "/works/growth-design",
  },
  {
    title: "AI Company Name Generator",
    category: "Fintech",
    year: "2024",
    image: "/company-name-generator.png",
    href: "/works/company-name-generator",
  },
];

const stats = [
  { label: "experience", value: "6+ years" },
  { label: "markets", value: "7+" },
  { label: "approach", value: "SaaS mindset" },
];

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease },
};

const heroIn = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease },
};

const cardVariants = {
  rest: {},
  hover: {},
};

const imageVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

const cursorCopy = {
  "view-project": { text: "View project", arrow: true },
  "view-more": { text: "View more", arrow: true },
  "contact-me": { text: "Contact me", arrow: true },
};

function CustomCursor() {
  const dotRef = useRef(null);
  const [label, setLabel] = useState(null);
  const rafRef = useRef(0);
  const pos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const apply = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = 0;
    };

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    const onOver = (e) => {
      const target =
        e.target && e.target.closest
          ? e.target.closest("[data-cursor]")
          : null;
      if (target) {
        setLabel(target.getAttribute("data-cursor"));
      }
    };

    const onOut = (e) => {
      const target =
        e.target && e.target.closest
          ? e.target.closest("[data-cursor]")
          : null;
      if (!target) return;
      const next = e.relatedTarget;
      if (next && target.contains(next)) return;
      setLabel(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", () => setLabel(null));

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const sync = () => {
      const isFinePointer = !window.matchMedia("(pointer: coarse)").matches;
      const isMdUp = window.matchMedia("(min-width: 768px)").matches;
      if (label && isFinePointer && isMdUp) {
        document.body.classList.add("cursor-pill-active");
      } else {
        document.body.classList.remove("cursor-pill-active");
      }
    };

    sync();
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqPtr = window.matchMedia("(pointer: coarse)");
    mqMd.addEventListener("change", sync);
    mqPtr.addEventListener("change", sync);
    return () => {
      mqMd.removeEventListener("change", sync);
      mqPtr.removeEventListener("change", sync);
      document.body.classList.remove("cursor-pill-active");
    };
  }, [label]);

  const copy = label ? cursorCopy[label] : null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    >
      <AnimatePresence>
        {copy ? (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
          >
            <span>{copy.text}</span>
            {copy.arrow ? <span aria-hidden>→</span> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, priority }) {
  const inner = (
    <motion.article
      className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080809] shadow-[0_32px_90px_-40px_rgba(0,0,0,0.85)] md:rounded-3xl"
      initial="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[5/3]"
        variants={cardVariants}
      >
        <motion.div
          className="absolute inset-0"
          variants={imageVariants}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-black/65"
          variants={overlayVariants}
          aria-hidden
        />
      </motion.div>

      <div className="flex flex-col gap-5 px-7 py-8 md:px-9 md:py-10">
        <h3 className="text-2xl font-semibold leading-[1.15] tracking-tight text-white md:text-[1.65rem]">
          {project.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full border border-white/18 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
            {project.category}
          </span>
          <span className="text-sm tabular-nums text-white/45">{project.year}</span>
        </div>
      </div>
    </motion.article>
  );

  if (project.href) {
    return (
      <Link
        href={project.href}
        data-cursor="view-project"
        className="block outline-none ring-white/40 focus-visible:ring-2 md:cursor-none"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <CustomCursor />

      {/* STICKY WRAPPER — hero stays pinned while projects slide up over it */}
      <div className="relative">
        {/* SECTION 1 — HERO (light, sticky) */}
        <section className="sticky top-0 h-screen overflow-hidden bg-white text-[#0a0a0b]">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 pb-16 pt-10 sm:px-10 md:px-16 md:pb-20 md:pt-14">
            <motion.header
              className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-black/60"
              {...heroIn}
            >
              <span className="text-black/80">Mariana Difini</span>
              <nav className="flex items-center gap-7">
                <a className="transition hover:text-black" href="#works">
                  Works
                </a>
                <a className="transition hover:text-black" href="#info">
                  Info
                </a>
              </nav>
            </motion.header>

            <motion.div className="flex flex-1 flex-col justify-center pt-16 md:pt-24" {...heroIn}>
              <h1 className="w-full whitespace-nowrap text-[clamp(2.25rem,11vw,8.9rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
                Mariana Difini
              </h1>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-black/60 md:text-base">
                Senior Product Designer · UX/UI
              </p>
              <p className="mt-10 max-w-3xl text-lg leading-relaxed text-black/75 md:text-xl">
                Self-taught, deeply curious, and focused on building thoughtful, scalable Fintech and
                SaaS products. 6+ years designing B2B experiences — from discovery and friction mapping
                through QA.
              </p>
              <p className="mt-10 w-fit rounded-full border border-black/15 bg-black/[0.03] px-3 py-1 text-xs uppercase tracking-[0.12em] text-black/55">
                Vibe coded with Next.js &amp; Cursor
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — PROJECTS (dark) — slides up over the sticky hero */}
        <section className="relative z-10 bg-[#0a0a0b] text-white">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <motion.section id="works" className="space-y-10" {...fadeUp}>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Selected work</h2>
              <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-white/50">
                2022–2026
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-9 lg:gap-10">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} priority={i === 0} />
              ))}
            </div>
          </motion.section>
          </div>
        </section>
      </div>

      {/* SECTION 3 — ABOUT / INFO (light) */}
      <section id="info" className="relative z-20 bg-white text-[#0a0a0b]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28">
          <motion.div className="space-y-10 md:space-y-14" {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              ( WHO? )
            </p>

            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-black/75 md:text-xl">
                  I'm Mariana — a Senior Product Designer born in Brazil, based in Europe. I design B2B
                  SaaS end-to-end: discovery, friction mapping, prototyping, and QA. Currently part of
                  an ~80-person design org at Qonto. Previously, I built a design system from scratch at
                  carbmee (climate-tech SaaS).
                </p>

                <details className="group border-t border-black/10 pt-6">
                  <summary
                    data-cursor="view-more"
                    className="flex list-none items-center justify-between gap-6 text-lg font-bold tracking-tight text-black cursor-pointer md:cursor-none"
                  >
                    Stuff I'm good at.
                    <span className="text-xl leading-none text-black/45 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {[
                      "Product Design",
                      "Onboarding Flows",
                      "Conversion Optimisation",
                      "Design Systems",
                      "AI Prototyping",
                      "Design QA",
                    ].map((x) => (
                      <li
                        key={x}
                        className="rounded-full bg-[#1E1E1E] px-3 py-1.5 text-xs font-medium tracking-[0.01em] text-white"
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </details>

                <details className="group border-t border-black/10 pt-6">
                  <summary
                    data-cursor="view-more"
                    className="flex list-none items-center justify-between gap-6 text-lg font-bold tracking-tight text-black cursor-pointer md:cursor-none"
                  >
                    Stuff I'm still working on.
                    <span className="text-xl leading-none text-black/45 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="mt-5 border-t border-black/8">
                    {[
                      "Accepting that Figma files are never truly done",
                      "German (the language)",
                      "Saying no to new side projects",
                      "Pretending I don't have opinions in stakeholder reviews",
                    ].map((x) => (
                      <li
                        key={x}
                        className="flex items-center gap-3 border-b border-black/10 py-3 text-sm leading-relaxed text-black/70"
                      >
                        <span className="text-black/45">→</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#1E1E1E]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/profile-photo.jpeg"
                    alt="Mariana Difini"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="mt-20 md:mt-28" {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              ( EXPERIENCE )
            </p>
            <div className="mt-10 space-y-10 border-l border-black/10 pl-8 md:mt-12 md:space-y-12 md:pl-12">
              {[
                {
                  title: "Senior Product Designer · Qonto — European Neobank",
                  time: "Jun 2023 – Present",
                  body: "Led end-to-end UX/UI design for a high-traffic B2B product. Improved sign-up funnel conversion through user research and A/B testing. Scaled design system components across an ~80-person design organisation. Collaborated cross-functionally with PMs, engineers, and brand designers.",
                },
                {
                  title: "UX/Visual Designer · carbmee — Global Climate-Tech SaaS",
                  time: "Feb 2022 – Apr 2023",
                  body: "Designed complex onboarding UX and scenario-builder flows for an emissions-tracking platform. Built and owned the design system from scratch. Ran UX audits and usability testing.",
                },
                {
                  title: "Visual Designer · Freelance — Multiple Clients",
                  time: "2018 – 2022",
                  body: "Delivered branding, web, and campaign design. Created landing pages for events and product launches. Ran A/B tests to improve conversion rates.",
                },
              ].map((item) => (
                <div key={item.title} className="relative">
                  <div className="absolute -left-[2.02rem] top-1.5 h-3 w-3 rounded-full bg-black/70 md:-left-[2.88rem]" />
                  <h4 className="text-base font-bold tracking-tight text-black">{item.title}</h4>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-black/50">{item.time}</p>
                  <p className="mt-4 max-w-3xl leading-relaxed text-black/70">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="mt-20 md:mt-28" {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
              ( CONTACT )
            </p>
            <a
              data-cursor="contact-me"
              className="mt-8 inline-block text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-black underline decoration-black/20 underline-offset-8 transition hover:decoration-black/50 md:cursor-none"
              href="mailto:marianadifini@gmail.com"
            >
              marianadifini@gmail.com
            </a>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-black/55">
              Based in Europe · Open to remote/hybrid
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white text-[#0a0a0b]">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 text-sm text-black/50 sm:px-10 md:px-16">
          <span>© {new Date().getFullYear()} Mariana Difini</span>
        </div>
      </footer>
    </div>
  );
}
