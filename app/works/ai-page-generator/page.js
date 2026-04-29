"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Prototype from "./Prototype";

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
  "UX Research",
  "Conversational UI",
  "AI System Design",
  "CMS Integration",
];

const problems = [
  {
    n: "01",
    title: "Brand compliance failures",
    body: "Stakeholders had the correct modules, but had a hard time telling the story properly. Choosing wrong modules for the page, not adding CTAs when necessary or choosing assets that didn't fit was only some of the problems",
  },
  {
    n: "02",
    title: "Design as a bottleneck",
    body: "We had a funnel where a designer needs to approve the page, but that was creating a lot of extra work, since every page had small issues. Creating a backlog that slowed go-to-market velocity for marketing and growth initiatives across multiple markets.",
  },
  {
    n: "03",
    title: "Rework as the default",
    body: "Every page needed to go trough a Designer, that would spend a big part of their day re-working the page, or contacting different stakeholders to make changes on the page.",
  },
];

const discovery = [
  {
    title: "CMS Audit",
    body: "Reviewed 80+ stakeholder-created pages across markets. Found that the majority had at least one design system violation — most commonly incorrect section usage and assets.",
  },
  {
    title: "Stakeholder Interviews",
    body: "Spoke with partnership managers, SEO leads, and product managers across three markets. The friction wasn't laziness — it was a genuine lack of visibility into what \u201Ccorrect\u201D actually looked like in practice.",
  },
  {
    title: "Design Review Logs",
    body: "Six months of review data showed a consistent pattern: the same types of mistakes, repeated across teams, with no feedback loop to prevent recurrence. The system had no memory of its own failures.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Reframing",
    body: "The initial thought was \u201Cimprove the CMS onboarding.\u201D But the audit told a different story — this wasn't an onboarding problem, it was a system problem. Stakeholders weren't failing because they didn't understand the tool. They were failing because the tool gave them too much freedom without enough guidance.",
    aside:
      "Reframing from a UX task to a system design problem changed everything. It opened the door to an AI-driven solution that wouldn't have been visible through a narrower lens.",
  },
  {
    n: "02",
    title: "Mapping the stakeholder landscape",
    body: "Three distinct user types emerged — each with different motivations and different tolerance for complexity. Partnership managers needed speed and autonomy. SEO leads needed structured, keyword-aware templates. Product managers needed to launch without full design cycles. Designing for one \u201Cnon-designer user\u201D would have produced a mediocre tool. Designing for three distinct contexts — with shared infrastructure — produced something specific enough to actually work.",
  },
  {
    n: "03",
    title: "Exploring directions",
    body: "Before landing on conversational AI, We analyzed the current situation and the new possibility on: flexibility, compliance guarantee, learning curve, and maintenance overhead.",
    concepts: [
      {
        label: "Current situation",
        name: "Block Builder/Templates",
        description:
          "Visual editor with pre-approved component library. Or stakeholders select a template and fill structured fields.",
        verdict:
          "High learning curve. Still allows invalid combinations. And requires ongoing Maintance",
        selected: false,
      },
      {
        label: "New solution",
        name: "Conversational AI",
        description:
          "An AI assistant guides users through a natural conversation, then generates a compliant page using real design system components.",
        verdict: "Flexible. Scales without maintenance. Handles ambiguity.",
        selected: true,
      },
    ],
  },
  {
    n: "04",
    title: "Designing the conversation — and its limits",
    body: "Choosing conversational AI was the easy part. Designing what it actually says — and when — took significantly longer. The conversation had to be short enough to feel effortless, structured enough to produce reliable output, and smart enough to know when to stop and ask the human for something it couldn't decide alone. The most important design work was invisible: deciding what the AI was and wasn't allowed to do. It could propose structures, suggest copy, and validate compliance. It couldn't invent components, confirm unverified data, or proceed without flagging missing assets.",
    aside:
      "Every chip, every branching question, every alert is a design decision about where human judgment is irreplaceable. The UI is not decoration — it's the guardrail.",
  },
];

const failureModesLeft = [
  {
    title: "Hallucinated components",
    problem: "The AI invents a block that doesn't exist in the design system.",
    fix: "Output constrained to a closed list of valid component IDs. The AI can only select, not invent.",
  },
  {
    title: "Generic AI copy tone",
    problem: "Output sounds nothing like Qonto's voice.",
    fix: "Few-shot examples of real Qonto copy embedded in the system prompt establish tone before any generation.",
  },
  {
    title: "Confident but wrong",
    problem: "The AI presents unverified competitor data as fact.",
    fix: "Comparator flow surfaces a verification requirement. The AI cannot proceed without human confirmation of data.",
  },
];

const failureModesRight = [
  {
    title: "Context drift",
    problem: "In longer conversations, the AI forgets early constraints.",
    fix: "Key design system constraints re-injected into every prompt turn, not just the first message.",
  },
  {
    title: "Misread intent",
    problem: "The AI builds the wrong page type because the user's description was ambiguous.",
    fix: "Onboarding forces explicit page type selection before any generation. Intent is declared, not inferred.",
  },
  {
    title: "Over-generation",
    problem: "The AI produces too many blocks.",
    fix: "Maximum block counts per page type enforced at the prompt level. Structure is bounded, not open-ended.",
  },
];

const keyDecisions = [
  {
    n: "01",
    title: "Conversation over form",
    body: [
      "The first instinct was a form-based template picker — familiar, safe, fast to build. The problem was that forms require users to know what they want before they start. Most stakeholders didn't know what a good page structure looked like. They knew what outcome they needed.",
      "A conversation meets users where they are. It asks what it needs to know, in the order it needs to know it. The shift from form to conversation is a shift in where the design knowledge lives — from the user to the system.",
    ],
  },
  {
    n: "02",
    title: "The asset check as a design moment",
    body: [
      "Product launch pages require assets that the AI can't generate and that need to come from the Brand team. The easy solution was to let users proceed and add assets later. The right solution was to surface this friction deliberately.",
      "The asset check isn't a warning — it's a checkpoint that protects the Brand team's work and gives stakeholders a clear, actionable path. Designing friction in the right place creates faster outcomes than removing friction everywhere.",
    ],
  },
  {
    n: "03",
    title: "Copy as a first-class output",
    body: [
      "Most CMS tools treat copy as the user's problem. This creates a second bottleneck immediately after the first: stakeholders who know what page they want but don't know how to phrase it in Qonto's voice.",
      "The AI's copy suggestions aren't autocomplete — they're a grounded starting position. The defaults are always on-brand. Nobody starts from nothing.",
    ],
  },
  {
    n: "04",
    title: "Compliance as infrastructure, not review",
    body: [
      "The existing process made compliance the design team's responsibility — a review step at the end of every request. This didn't scale, and it solved the wrong problem: catching mistakes after they were made rather than preventing them from happening.",
      "The result: design review became the exception, not the rule. Reserved for genuinely novel pages — not for every co-marketing landing page that follows a pattern the AI already knows.",
    ],
  },
];

const reflections = [
  {
    title: "What I'd do differently",
    body: "The onboarding type-selection is the right constraint for known pages — but it creates a hard wall for anything that doesn't fit a category. The more honest version of this tool would let ambiguity into the conversation earlier, and let the AI ask clarifying questions rather than forcing a declaration upfront.",
  },
  {
    title: "What surprised me",
    body: "The most contentious decisions weren't about the AI — they were about process ownership. Who decides when a page is \u201Cgood enough\u201D? Who maintains the system prompt as the design system evolves? Designing the governance model was harder than designing the tool.",
  },
  {
    title: "On designing with AI",
    body: "The instinct when using AI in a design tool is to let it do more. The discipline was knowing where to hold back. Every place the AI makes a decision without a human checkpoint is a place where mistakes scale. The best AI-powered tools aren't the ones that automate the most — they're the ones that automate the right things.",
  },
  {
    title: "On starting without a brief",
    body: "This project started without a defined scope or a named problem. The signal was just friction — things that were slow, things that broke, things nobody had formally complained about yet. Learning to find the real problem underneath the surface one was the most useful thing this project developed.",
  },
];

function SectionTitle({ children }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55 md:text-base">
      {children}
    </h2>
  );
}

function PullQuote({ quote, attribution }) {
  return (
    <motion.figure
      className="mx-auto w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12"
      {...fadeUp}
    >
      <blockquote className="text-xl font-medium leading-[1.35] tracking-[-0.01em] text-white/92 md:text-2xl lg:text-[1.75rem]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution ? (
        <figcaption className="mt-6 text-[10px] uppercase tracking-[0.22em] text-white/50 md:text-xs">
          {attribution}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

function FailureModeCard({ title, rows }) {
  return (
    <motion.article
      variants={itemReveal}
      className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#080809] p-8 md:p-9"
    >
      <h3 className="mb-6 text-lg font-bold tracking-tight text-white md:text-xl">
        {title}
      </h3>
      <ul className="space-y-6">
        {rows.map((row) => (
          <li key={row.title} className="flex gap-4 border-t border-white/[0.06] pt-6 first:border-t-0 first:pt-0">
            <span className="pt-0.5 text-white/45">→</span>
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-tight text-white md:text-[0.9375rem]">
                {row.title}
              </p>
              <p className="text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
                {row.problem}
              </p>
              <p className="text-sm leading-relaxed text-white/75 md:text-[0.9375rem]">
                <span className="font-semibold uppercase tracking-[0.18em] text-white/45 text-[10px] mr-2">
                  Fix
                </span>
                {row.fix}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function AiPageGeneratorCaseStudy() {
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
        {/* HERO */}
        <motion.section
          className="border-b border-white/[0.06] px-6 pb-20 pt-4 sm:px-10 md:px-16 md:pb-28 md:pt-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="mx-auto max-w-7xl space-y-8 md:space-y-10">
            <p className="w-fit rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/65 md:text-xs md:tracking-[0.2em]">
              AI · Product Design · CMS · 2026
            </p>
            <div className="space-y-6">
              <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                AI Page Creator
              </h1>
              <p className="text-xl font-medium text-white/50 md:text-2xl">
                Client: <span className="text-white/85">Qonto</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* OVERVIEW */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:px-16 md:py-28"
          {...fadeUp}
        >
          <div className="mb-12 md:mb-16">
            <SectionTitle>( Overview )</SectionTitle>
          </div>
          <div className="grid gap-12 border-b border-white/[0.06] pb-20 md:grid-cols-2 md:gap-16 md:pb-28">
            <div className="space-y-6">
              <p className="max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                Qonto's CMS was being used by teams who moved fast and thought in outcomes, not
                design systems. The pages they built were almost right — which is worse than
                obviously wrong. This project was about closing that gap without making the design
                team the solution.
              </p>
            </div>
            <dl className="space-y-6 text-sm md:text-base">
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">Year</dt>
                <dd className="text-white/90">2026</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">Client</dt>
                <dd className="text-white/90">Qonto</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">Role</dt>
                <dd className="text-white/90">Senior Product designer</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  Deliverables
                </dt>
                <dd className="leading-relaxed text-white/90">{deliverables.join(", ")}</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">Status</dt>
                <dd className="leading-relaxed text-white/90">
                  In progress — currently being validated with SEO, Content, Development, and Brand
                  teams.
                </dd>
              </div>
            </dl>
          </div>
        </motion.section>

        {/* PROBLEM */}
        <motion.section
          className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16"
          {...fadeUp}
        >
          <div className="mb-12 md:mb-16">
            <SectionTitle>( Problem )</SectionTitle>
          </div>
          <p className="mb-14 max-w-3xl text-lg leading-relaxed text-white/80 md:mb-20 md:text-xl">
            The design team was a bottleneck they hadn't designed themselves into. The CMS gave
            stakeholders full freedom, without enough guidance. The result was predictable.
          </p>
        </motion.section>

        <motion.section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 sm:px-10 md:grid-cols-3 md:gap-y-8 md:px-16"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
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

        <section className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16">
          <PullQuote
            quote="I spend more time chasing the design team than building the actual partnership."
            attribution="Partnership Manager, Qonto · User interview"
          />
        </section>

        {/* DISCOVERY */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <div className="mb-12 md:mb-16">
            <SectionTitle>( Discovery )</SectionTitle>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 sm:px-10 md:grid-cols-3 md:gap-y-8 md:px-16"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
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

        <motion.section
          className="mx-auto mt-14 max-w-7xl px-6 sm:px-10 md:mt-20 md:px-16"
          {...fadeUp}
        >
          <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-8 md:p-12">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55 md:text-xs">
              How Might We
            </p>
            <p className="max-w-4xl text-xl font-medium leading-[1.35] tracking-[-0.01em] text-white/92 md:text-2xl lg:text-[1.75rem]">
              How might we give non-designer stakeholders the freedom to build pages fast — while
              ensuring every output is automatically compliant with Qonto's design system?
            </p>
          </div>
        </motion.section>

        {/* BEFORE / AFTER */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <figure className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white p-6 md:p-10">
            <img
              src="/before_after_horizontal.svg"
              alt="Before and after comparison of stakeholder-generated pages — pre-AI templates vs. AI-generated compliant output"
              className="block h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </motion.section>

        {/* PROCESS */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <div className="mb-12 md:mb-16">
            <SectionTitle>( Process )</SectionTitle>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          <ol className="space-y-16 md:space-y-20">
            {processSteps.map((step) => (
              <motion.li
                key={step.n}
                variants={itemReveal}
                className="grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-10 md:grid-cols-[120px_1fr] md:gap-12 md:pt-12"
              >
                <span className="font-mono text-xs tabular-nums text-white/45 md:text-sm">
                  {step.n}
                </span>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.01em] text-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
                    {step.body}
                  </p>
                  {step.aside ? (
                    <aside className="max-w-3xl border-l-2 border-white/20 pl-5 text-sm italic leading-relaxed text-white/55 md:text-[0.9375rem]">
                      {step.aside}
                    </aside>
                  ) : null}
                  {step.concepts ? (
                    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                      {step.concepts.map((concept) => (
                        <article
                          key={concept.name}
                          className={`flex flex-col rounded-2xl border p-6 md:p-7 ${
                            concept.selected
                              ? "border-white/30 bg-white/[0.05]"
                              : "border-white/[0.08] bg-white/[0.02]"
                          }`}
                        >
                          <div className="mb-5 flex items-center justify-between">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                              {concept.label}
                            </span>
                            {concept.selected ? (
                              <span className="rounded-full border border-white/30 bg-white/[0.06] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/85">
                                Selected
                              </span>
                            ) : null}
                          </div>
                          <h4 className="mb-3 text-base font-bold tracking-tight text-white md:text-lg">
                            {concept.name}
                          </h4>
                          <p className="mb-5 text-sm leading-relaxed text-white/65">
                            {concept.description}
                          </p>
                          <p className="mt-auto text-sm italic leading-relaxed text-white/50">
                            {concept.verdict}
                          </p>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* AI SYSTEM DIAGRAM */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <figure className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white p-6 md:p-10">
            <img
              src="/ai_system_diagram_v2.svg"
              alt="AI system architecture diagram — how user input, design system constraints, and content guidelines flow through the model"
              className="block h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </motion.section>

        {/* DESIGNING FOR AI BEHAVIOUR */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <div className="mb-12 md:mb-16">
            <SectionTitle>( Designing for AI behaviour )</SectionTitle>
          </div>
          <p className="mb-14 max-w-3xl text-lg leading-relaxed text-white/80 md:mb-20 md:text-xl">
            Choosing AI was the straightforward part. The harder question was: what happens when
            it's wrong? These are the failure modes that shaped every decision in this project —
            and the design response to each.
          </p>
        </motion.section>

        <motion.section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 sm:px-10 md:grid-cols-2 md:gap-y-8 md:px-16"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <FailureModeCard title="Failure modes" rows={failureModesLeft} />
          <FailureModeCard title="Failure modes" rows={failureModesRight} />
        </motion.section>

        <section className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16">
          <PullQuote
            quote="The conversation is not free-form by accident. Every chip, every branching path, every pause for a human checkpoint — these are the design. The AI is capable of producing output without them. The question is whether that output is trustworthy enough to publish."
            attribution="Design rationale"
          />
        </section>

        {/* PROTOTYPE */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <div className="mb-10 md:mb-14">
            <SectionTitle>( Prototype )</SectionTitle>
          </div>
          <div className="mb-10 space-y-4 md:mb-14">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/55 md:text-xs">
              Interactive Prototype
            </p>
            <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              The prototype demonstrates the full end-to-end flow. Select the Product Launch page
              type on the onboarding step and follow the suggestions to experience the full journey.
              This prototype was rebuilt to hide key company information.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-7xl px-6 pb-4 sm:px-10 md:px-16"
          {...fadeUp}
        >
          <Prototype />
        </motion.section>

        {/* KEY DESIGN DECISIONS */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <div className="mb-12 md:mb-16">
            <SectionTitle>( Key design decisions )</SectionTitle>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-7xl px-6 sm:px-10 md:px-16"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          <ol className="space-y-14 md:space-y-20">
            {keyDecisions.map((item) => (
              <motion.li
                key={item.n}
                variants={itemReveal}
                className="grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-10 md:grid-cols-[260px_1fr] md:gap-12 md:pt-12"
              >
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs tabular-nums text-white/45 md:text-sm">
                    {item.n}
                  </span>
                  <h3 className="text-xl italic leading-[1.15] tracking-[-0.01em] text-white/90 md:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <div className="space-y-5">
                  {item.body.map((para, i) => (
                    <p
                      key={i}
                      className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* REFLECTION */}
        <motion.section
          className="mx-auto mt-20 max-w-7xl px-6 sm:px-10 md:mt-28 md:px-16"
          {...fadeUp}
        >
          <div className="mb-12 md:mb-16">
            <SectionTitle>( Reflection )</SectionTitle>
          </div>
        </motion.section>

        <motion.section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 pb-20 sm:px-10 md:grid-cols-2 md:gap-y-10 md:px-16 md:pb-28"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reflections.map((item) => (
            <motion.article
              key={item.title}
              variants={itemReveal}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#080809] p-8 md:p-10"
            >
              <h3 className="mb-5 text-lg font-bold tracking-tight text-white md:text-xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.section>

        {/* FOOTER NAV */}
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
