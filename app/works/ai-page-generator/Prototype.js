"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const aiAckReplies = [
  "Got it — noted. I'll keep that in mind as we refine the draft.",
  "Makes sense. I'll keep the output within the design system.",
  "Understood. I'll factor that into the structure.",
  "Good note — logged for the final review step.",
  "Okay. I'll hold this thread and come back to it if needed.",
];

/* -------------------------------------------------------------------------- */
/*  Design tokens                                                             */
/* -------------------------------------------------------------------------- */

const T = {
  bg: "#ffffff",
  surface: "#f7f7f5",
  surfaceMuted: "#fafaf8",
  border: "#e5e5e3",
  borderStrong: "#d8d8d4",
  black: "#1d1d1b",
  text: "#1d1d1b",
  muted: "rgba(29,29,27,0.62)",
  softMuted: "rgba(29,29,27,0.45)",
  veryMuted: "rgba(29,29,27,0.22)",
  green: "#00c67a",
  greenBg: "#f0fdf7",
  greenBorder: "#b3eed9",
  greenText: "#0a7e55",
  amber: "#e08a00",
  amberBg: "#fff8ea",
  amberBorder: "#f3dca6",
};

const fontStack =
  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

/* -------------------------------------------------------------------------- */
/*  Shared atoms                                                              */
/* -------------------------------------------------------------------------- */

function ChromeBar() {
  return (
    <div
      className="flex items-center gap-3 border-b px-4 py-3"
      style={{ borderColor: T.border, background: T.surface }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: "#ff5f56" }}
        />
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: "#ffbd2e" }}
        />
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: "#27c93f" }}
        />
      </div>
      <div
        className="ml-2 flex flex-1 items-center gap-2 rounded-[6px] border px-3 py-1.5 text-[11px]"
        style={{
          borderColor: T.border,
          background: T.bg,
          color: T.softMuted,
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: T.green }}
        />
        cms.qonto.com / ai-generator
      </div>
      <span
        className="rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]"
        style={{
          borderColor: T.borderStrong,
          color: T.softMuted,
          background: T.bg,
        }}
      >
        CMS Prototype
      </span>
    </div>
  );
}

function StepNav({ step }) {
  const steps = [
    { n: 1, label: "CMS Entry" },
    { n: 2, label: "Onboarding" },
    { n: 3, label: "AI Conversation" },
    { n: 4, label: "Review & Publish" },
  ];
  return (
    <div
      className="flex flex-wrap items-center gap-2 border-b px-4 py-3 sm:gap-3 sm:px-6"
      style={{ borderColor: T.border, background: T.bg }}
    >
      {steps.map((s, i) => {
        const active = s.n === step;
        const done = s.n < step;
        return (
          <div key={s.n} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold"
                style={{
                  background: active
                    ? T.black
                    : done
                    ? T.green
                    : "transparent",
                  color: active || done ? "#fff" : T.softMuted,
                  border: active || done ? "none" : `1px solid ${T.borderStrong}`,
                }}
              >
                {done ? "✓" : s.n}
              </span>
              <span
                className="text-[11px] font-medium sm:text-xs"
                style={{ color: active ? T.black : T.softMuted }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <span
                className="h-px w-4 sm:w-8"
                style={{ background: T.border }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function Sidebar() {
  const items = [
    { key: "pages", label: "Pages", active: true },
    { key: "blog", label: "Blog" },
    { key: "media", label: "Media" },
    { key: "components", label: "Components" },
    { key: "tokens", label: "Tokens" },
    { key: "settings", label: "Settings" },
  ];
  return (
    <aside
      className="hidden shrink-0 flex-col border-r p-5 md:flex"
      style={{
        width: 220,
        background: T.surfaceMuted,
        borderColor: T.border,
      }}
    >
      <div
        className="mb-8 flex items-center gap-2 text-sm font-bold"
        style={{ color: T.black }}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-[6px]"
          style={{ background: T.black, color: "#fff", fontSize: 12 }}
        >
          Q
        </span>
        <span className="tracking-tight">Qonto CMS</span>
      </div>
      <nav className="flex flex-col gap-0.5">
        {items.map((it) => (
          <span
            key={it.key}
            className="rounded-[6px] px-3 py-2 text-[13px]"
            style={{
              background: it.active ? T.bg : "transparent",
              color: it.active ? T.black : T.muted,
              fontWeight: it.active ? 600 : 500,
              border: it.active ? `1px solid ${T.border}` : "1px solid transparent",
            }}
          >
            {it.label}
          </span>
        ))}
      </nav>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*  Screen 1 — CMS Pages list                                                 */
/* -------------------------------------------------------------------------- */

const pageRows = [
  {
    title: "Business account · France",
    type: "Landing",
    edited: "2 hours ago",
    status: "Published",
  },
  {
    title: "Instant invoicing launch",
    type: "Product Launch",
    edited: "Yesterday",
    status: "Draft",
  },
  {
    title: "Qonto vs. Revolut",
    type: "Comparator",
    edited: "3 days ago",
    status: "Published",
  },
  {
    title: "SEO · micro-entrepreneur",
    type: "SEO Content",
    edited: "Last week",
    status: "Published",
  },
  {
    title: "Partnerships · Pennylane",
    type: "Landing",
    edited: "Last week",
    status: "Draft",
  },
];

function StatusBadge({ status }) {
  const published = status === "Published";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium"
      style={{
        borderColor: published ? T.greenBorder : T.borderStrong,
        background: published ? T.greenBg : T.surface,
        color: published ? T.greenText : T.softMuted,
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: published ? T.green : T.veryMuted }}
      />
      {status}
    </span>
  );
}

function CmsEntryScreen({ onNewPage }) {
  return (
    <div
      className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 md:p-8"
      style={{ background: T.bg }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3
            className="text-lg font-bold tracking-tight md:text-xl"
            style={{ color: T.black }}
          >
            Pages
          </h3>
          <p className="mt-1 text-[12px]" style={{ color: T.softMuted }}>
            Manage every page on qonto.com
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-[6px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color:var(--s)]"
            style={{
              borderColor: T.border,
              color: T.black,
              background: T.bg,
              ["--s"]: T.surface,
            }}
          >
            Filter
          </button>
          <button
            type="button"
            onClick={onNewPage}
            className="rounded-[6px] px-3 py-1.5 text-[12px] font-medium transition hover:opacity-90"
            style={{ background: T.black, color: "#fff" }}
          >
            + New Page
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden rounded-[10px] border"
        style={{ borderColor: T.border, background: T.bg }}
      >
        <div
          className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ borderColor: T.border, color: T.softMuted, background: T.surfaceMuted }}
        >
          <span>Title</span>
          <span>Type</span>
          <span>Last edited</span>
          <span>Status</span>
        </div>
        {pageRows.map((row, i) => (
          <div
            key={row.title}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 px-5 py-3.5 text-[13px]"
            style={{
              borderTop: i === 0 ? "none" : `1px solid ${T.border}`,
              color: T.black,
            }}
          >
            <span className="font-medium">{row.title}</span>
            <span style={{ color: T.muted }}>{row.type}</span>
            <span style={{ color: T.muted }}>{row.edited}</span>
            <span>
              <StatusBadge status={row.status} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewPageModal({ choice, setChoice, onCancel, onContinue }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-4"
      style={{ background: "rgba(29,29,27,0.4)" }}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-[18px] border shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
        style={{ background: T.bg, borderColor: T.border }}
      >
        <div className="p-6 md:p-7">
          <h4
            className="text-lg font-bold tracking-tight"
            style={{ color: T.black }}
          >
            Create a new page
          </h4>
          <p className="mt-1.5 text-[13px]" style={{ color: T.muted }}>
            How do you want to start?
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => setChoice("ai")}
              className="flex items-start justify-between gap-4 rounded-[14px] border p-4 text-left transition"
              style={{
                borderColor: choice === "ai" ? T.black : T.border,
                background: choice === "ai" ? T.surface : T.bg,
              }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[14px] font-semibold"
                    style={{ color: T.black }}
                  >
                    Generate with AI
                  </span>
                  <span
                    className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
                    style={{
                      borderColor: T.greenBorder,
                      background: T.greenBg,
                      color: T.greenText,
                    }}
                  >
                    Recommended
                  </span>
                </div>
                <p
                  className="mt-1 text-[12px] leading-relaxed"
                  style={{ color: T.muted }}
                >
                  Describe the page and let the assistant build a compliant draft.
                </p>
              </div>
              <span
                className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                style={{
                  borderColor: choice === "ai" ? T.black : T.borderStrong,
                  background: choice === "ai" ? T.black : T.bg,
                }}
              >
                {choice === "ai" ? (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "#fff" }}
                  />
                ) : null}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setChoice("blank")}
              className="flex items-start justify-between gap-4 rounded-[14px] border p-4 text-left transition"
              style={{
                borderColor: choice === "blank" ? T.black : T.border,
                background: choice === "blank" ? T.surface : T.bg,
              }}
            >
              <div>
                <span
                  className="text-[14px] font-semibold"
                  style={{ color: T.black }}
                >
                  Start from blank
                </span>
                <p
                  className="mt-1 text-[12px] leading-relaxed"
                  style={{ color: T.muted }}
                >
                  Build from an empty canvas with manual component selection.
                </p>
              </div>
              <span
                className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                style={{
                  borderColor: choice === "blank" ? T.black : T.borderStrong,
                  background: choice === "blank" ? T.black : T.bg,
                }}
              >
                {choice === "blank" ? (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "#fff" }}
                  />
                ) : null}
              </span>
            </button>
          </div>
        </div>
        <div
          className="flex items-center justify-end gap-2 border-t px-6 py-4"
          style={{ borderColor: T.border, background: T.surfaceMuted }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[6px] px-3 py-1.5 text-[12px] font-medium"
            style={{ color: T.muted }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="rounded-[6px] px-3.5 py-1.5 text-[12px] font-semibold transition hover:opacity-90"
            style={{ background: T.black, color: "#fff" }}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Screen 2 — Intent selection                                               */
/* -------------------------------------------------------------------------- */

const intents = [
  {
    id: "launch",
    emoji: "🚀",
    title: "Product Launch",
    body: "Announce a new feature or product",
  },
  {
    id: "seo",
    emoji: "📈",
    title: "SEO Content",
    body: "Target a keyword or financing topic",
    disabled: true,
  },
  {
    id: "comparator",
    emoji: "⚖️",
    title: "Comparator",
    body: "Qonto vs. a competitor",
    disabled: true,
  },
  {
    id: "blank",
    emoji: "✏️",
    title: "Build from Scratch",
    body: "Start with a blank canvas",
    disabled: true,
  },
];

function OnboardingScreen({ intent, setIntent, onContinue }) {
  return (
    <div
      className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 md:p-10"
      style={{ background: T.bg }}
    >
      <div
        className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: T.softMuted }}
      >
        <span style={{ color: T.muted }}>Start</span>
        <span>→</span>
        <span style={{ color: T.black }}>Intent</span>
        <span>→</span>
        <span>Generate</span>
        <span>→</span>
        <span>Publish</span>
      </div>
      <h3
        className="text-2xl font-bold leading-tight tracking-tight md:text-3xl"
        style={{ color: T.black }}
      >
        What type of page are you creating?
      </h3>
      <p className="mt-3 text-[13px]" style={{ color: T.muted }}>
        The AI will tailor the conversation and structure to your choice.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {intents.map((it) => {
          const active = intent === it.id;
          const isDisabled = it.disabled;
          return (
            <button
              key={it.id}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (isDisabled) return;
                setIntent(it.id);
              }}
              aria-disabled={isDisabled}
              className="relative flex flex-col items-start gap-3 rounded-[14px] border p-5 text-left transition"
              style={{
                borderColor: active ? T.black : T.border,
                background: active ? T.surface : T.bg,
                boxShadow: active ? `0 0 0 1px ${T.black}` : "none",
                opacity: isDisabled ? 0.45 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <span className="text-2xl">{it.emoji}</span>
              <div>
                <div
                  className="text-[14px] font-semibold"
                  style={{ color: T.black }}
                >
                  {it.title}
                </div>
                <p
                  className="mt-1 text-[12px] leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {it.body}
                </p>
              </div>
              {isDisabled ? (
                <span
                  className="absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: T.border,
                    background: T.surface,
                    color: T.softMuted,
                  }}
                >
                  Coming soon
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-[6px] px-4 py-2 text-[13px] font-semibold transition hover:opacity-90"
          style={{ background: T.black, color: "#fff" }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Screen 3 — AI Conversation                                                */
/* -------------------------------------------------------------------------- */

const structureByIntent = {
  launch: [
    "Hero",
    "Benefit Pills",
    "Feature Tabs",
    "CTA Banner",
  ],
  seo: [
    "SEO Hero",
    "Keyword Intro",
    "Structured Answer List",
    "Related FAQs",
    "CTA Banner",
  ],
  comparator: [
    "Comparator Hero",
    "Feature Comparison Table",
    "Why Qonto Block",
    "CTA Banner",
  ],
  blank: ["Blank Canvas"],
};

function deriveBlocks(intent, benefitStyle, addedTestimonial) {
  let blocks = [...(structureByIntent[intent] || structureByIntent.launch)];
  if (intent === "launch" && benefitStyle === "cards") {
    blocks = blocks.map((b) => (b === "Benefit Pills" ? "Benefit Cards" : b));
  }
  if (addedTestimonial) {
    const ctaIdx = blocks.indexOf("CTA Banner");
    if (ctaIdx >= 0) {
      blocks = [
        ...blocks.slice(0, ctaIdx),
        "Testimonial",
        ...blocks.slice(ctaIdx),
      ];
    } else {
      blocks = [...blocks, "Testimonial"];
    }
  }
  return blocks;
}

const assetRows = [
  {
    block: "Hero",
    filename: "instant-invoicing-hero.png",
    type: "UI Screenshot",
    dims: "2400×1600",
    match: 96,
    tint: "#e8f1ff",
    icon: "◈",
  },
  {
    block: "Feature Tabs · Create",
    filename: "invoice-create.png",
    type: "UI Screenshot",
    dims: "1600×1000",
    match: 92,
    tint: "#f0fdf7",
    icon: "⚡",
  },
  {
    block: "Feature Tabs · Track",
    filename: "invoice-track.png",
    type: "UI Screenshot",
    dims: "1600×1000",
    match: 88,
    tint: "#fff4e0",
    icon: "€",
  },
];

const copyRows = [
  { label: "Headline", value: "Invoicing — reinvented. Done in 60 seconds." },
  {
    label: "Subline",
    value:
      "Create, send and track compliant invoices without leaving your Qonto account.",
  },
  { label: "Primary CTA", value: "Open an account" },
  { label: "Secondary CTA", value: "Compare plans" },
];

function AiAvatar() {
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] text-[10px] font-bold"
      style={{ background: T.black, color: "#fff", letterSpacing: "0.05em" }}
    >
      AI
    </div>
  );
}

function QuickAction({ children, onClick, disabled, primary = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition hover:bg-black/[0.04] disabled:opacity-40"
      style={{
        borderColor: primary ? T.black : T.border,
        color: primary ? T.black : T.muted,
        background: "transparent",
      }}
    >
      <span
        className="inline-block"
        aria-hidden
        style={{ opacity: 0.55, fontSize: 11, lineHeight: 1 }}
      >
        ✎
      </span>
      {children}
    </button>
  );
}

function Chip({ children, onClick, variant = "default", disabled }) {
  const styles =
    variant === "primary"
      ? { background: T.black, color: "#fff", border: `1px solid ${T.black}` }
      : variant === "ghost"
      ? {
          background: T.bg,
          color: T.muted,
          border: `1px solid ${T.border}`,
        }
      : {
          background: T.surface,
          color: T.black,
          border: `1px solid ${T.border}`,
        };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full px-3 py-1.5 text-[12px] font-medium transition hover:opacity-90 disabled:opacity-50"
      style={styles}
    >
      {children}
    </button>
  );
}

function MessageBubble({ role, children }) {
  if (role === "ai") {
    return (
      <div className="flex items-start gap-3">
        <AiAvatar />
        <div
          className="max-w-[82%] rounded-[14px] px-4 py-3 text-[13px] leading-relaxed"
          style={{
            background: T.surface,
            color: T.black,
            border: `1px solid ${T.border}`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start justify-end gap-3">
      <div
        className="max-w-[82%] rounded-[14px] px-4 py-3 text-[13px] leading-relaxed"
        style={{ background: T.black, color: "#fff" }}
      >
        {children}
      </div>
    </div>
  );
}

function StructureCard({ blocks }) {
  return (
    <div
      className="mt-3 rounded-[10px] border p-3"
      style={{ background: T.bg, borderColor: T.border }}
    >
      <p
        className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: T.softMuted }}
      >
        Proposed structure
      </p>
      <ol className="space-y-1.5">
        {blocks.map((b, i) => (
          <li
            key={b}
            className="flex items-center gap-2.5 text-[12.5px]"
            style={{ color: T.black }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-[6px] text-[10px] font-semibold"
              style={{
                background: T.surface,
                color: T.muted,
                border: `1px solid ${T.border}`,
              }}
            >
              {i + 1}
            </span>
            <span className="font-medium">{b}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function AssetWarningCard() {
  return (
    <div
      className="mt-3 rounded-[10px] border p-4"
      style={{ background: T.amberBg, borderColor: T.amberBorder }}
    >
      <p
        className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: T.amber }}
      >
        ⚠ Assets required
      </p>
      <p className="text-[12.5px] leading-relaxed" style={{ color: T.black }}>
        A UI screenshot and feature illustration are required but not found in your Media Library.
      </p>
      <p className="mt-2 text-[11.5px]" style={{ color: T.muted }}>
        Don&apos;t have them?{" "}
        <span
          className="underline underline-offset-2"
          style={{ color: T.black }}
        >
          Contact the Brand team →
        </span>
      </p>
    </div>
  );
}

function AssetSuggestionsCard({ used, setUsed, replacing, setReplacing }) {
  return (
    <div
      className="mt-3 rounded-[10px] border p-4"
      style={{ background: T.bg, borderColor: T.border }}
    >
      <p
        className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: T.softMuted }}
      >
        ✦ Asset suggestions
      </p>
      <p className="mb-3 text-[12px]" style={{ color: T.muted }}>
        I found assets in your Media Library that match each block. Confirm or replace before we
        finalise.
      </p>
      <div className="space-y-2.5">
        {assetRows.map((row, i) => {
          const isUsed = used[i];
          const isReplacing = replacing[i];
          return (
            <div
              key={row.block}
              className="flex items-center gap-3 rounded-[10px] border p-2.5"
              style={{
                borderColor: isUsed ? T.greenBorder : T.border,
                background: isUsed ? T.greenBg : T.surfaceMuted,
              }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] text-lg"
                style={{
                  background: row.tint,
                  border: `1px solid ${T.border}`,
                }}
              >
                {row.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: T.softMuted }}
                  >
                    {row.block}
                  </span>
                </div>
                <div
                  className="truncate text-[12px] font-medium"
                  style={{ color: T.black }}
                >
                  {isReplacing ? "Uploading new asset…" : row.filename}
                </div>
                <div
                  className="mt-0.5 flex items-center gap-2 text-[10.5px]"
                  style={{ color: T.muted }}
                >
                  <span>
                    {row.type} · {row.dims}
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    aria-label={`Match ${row.match}%`}
                  >
                    <span
                      className="h-1 w-14 overflow-hidden rounded-full"
                      style={{ background: T.border }}
                    >
                      <span
                        className="block h-full"
                        style={{
                          width: `${row.match}%`,
                          background: T.green,
                        }}
                      />
                    </span>
                    <span className="tabular-nums">{row.match}%</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const next = [...used];
                    next[i] = true;
                    setUsed(next);
                  }}
                  className="rounded-[6px] border px-2.5 py-1 text-[11px] font-semibold transition"
                  style={{
                    borderColor: isUsed ? T.greenBorder : T.borderStrong,
                    background: isUsed ? T.green : T.bg,
                    color: isUsed ? "#fff" : T.black,
                  }}
                >
                  {isUsed ? "✓ Used" : "Use"}
                </button>
                <button
                  type="button"
                  aria-label="Replace asset"
                  onClick={() => {
                    const r = [...replacing];
                    r[i] = true;
                    setReplacing(r);
                    setTimeout(() => {
                      const r2 = [...r];
                      r2[i] = false;
                      setReplacing(r2);
                      const u = [...used];
                      u[i] = true;
                      setUsed(u);
                    }, 900);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-[6px] border text-[13px] transition"
                  style={{
                    borderColor: T.borderStrong,
                    background: T.bg,
                    color: T.muted,
                  }}
                >
                  ↻
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CopySuggestionsCard({ accepted, setAccepted }) {
  return (
    <div
      className="mt-3 rounded-[10px] border p-4"
      style={{ background: T.bg, borderColor: T.border }}
    >
      <p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: T.softMuted }}
      >
        ✦ Copy suggestions · Qonto tone of voice
      </p>
      <div className="space-y-2">
        {copyRows.map((row, i) => {
          const used = accepted[i];
          return (
            <div
              key={row.label}
              className="flex items-center gap-3 rounded-[10px] border p-2.5"
              style={{
                borderColor: used ? T.greenBorder : T.border,
                background: used ? T.greenBg : T.surfaceMuted,
              }}
            >
              <div className="min-w-0 flex-1">
                <div
                  className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: T.softMuted }}
                >
                  {row.label}
                </div>
                <div
                  className="mt-0.5 truncate text-[12.5px] italic"
                  style={{ color: T.black }}
                >
                  &ldquo;{row.value}&rdquo;
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = [...accepted];
                  next[i] = true;
                  setAccepted(next);
                }}
                className="rounded-[6px] border px-2.5 py-1 text-[11px] font-semibold transition"
                style={{
                  borderColor: used ? T.greenBorder : T.borderStrong,
                  background: used ? T.green : T.bg,
                  color: used ? "#fff" : T.black,
                }}
              >
                {used ? "✓ Used" : "Use"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Live preview (right panel during chat) */
function LivePreviewBlock({ label, children, ghost }) {
  return (
    <div
      className="rounded-[10px] border p-3"
      style={{
        background: ghost ? T.surface : T.bg,
        borderColor: T.border,
      }}
    >
      <div
        className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: T.softMuted }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function LivePreview({ chatStage, intent, benefitStyle, addedTestimonial }) {
  const show = (min) => {
    const order = [
      "structure-offered",
      "assets-warning",
      "assets-suggest",
      "copy-suggest",
      "ready",
    ];
    return order.indexOf(chatStage) >= order.indexOf(min);
  };
  const benefits = [
    { e: "⚡", t: "60-second setup" },
    { e: "✓", t: "100% compliant" },
    { e: "€", t: "Included in Basic" },
    { e: "◈", t: "All-in-one" },
  ];

  return (
    <div
      className="flex h-full flex-col gap-3 overflow-y-auto overscroll-contain p-4"
      style={{ background: T.surfaceMuted, fontFamily: fontStack }}
    >
      <div
        className="text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: T.softMuted }}
      >
        Live preview
      </div>

      {/* Hero */}
      <div
        className="rounded-[10px] p-4 text-white"
        style={{ background: T.black }}
      >
        <span
          className="inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
          style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
        >
          New feature
        </span>
        <div className="mt-3 h-3 w-11/12 rounded" style={{ background: "rgba(255,255,255,0.9)" }} />
        <div className="mt-1.5 h-3 w-7/12 rounded" style={{ background: "rgba(255,255,255,0.9)" }} />
        <div className="mt-3 space-y-1">
          <div className="h-2 w-10/12 rounded" style={{ background: "rgba(255,255,255,0.4)" }} />
          <div className="h-2 w-8/12 rounded" style={{ background: "rgba(255,255,255,0.4)" }} />
        </div>
        <div className="mt-3 flex gap-1.5">
          <div
            className="h-6 w-24 rounded-[6px]"
            style={{ background: "#fff" }}
          />
          <div
            className="h-6 w-20 rounded-[6px] border"
            style={{ borderColor: "rgba(255,255,255,0.35)" }}
          />
        </div>
      </div>

      {/* Benefit pills / cards */}
      {show("structure-offered") ? (
        benefitStyle === "cards" ? (
          <LivePreviewBlock label="Benefit cards">
            <div className="grid grid-cols-2 gap-1.5">
              {benefits.map((b) => (
                <div
                  key={b.t}
                  className="flex flex-col items-start gap-1.5 rounded-[8px] border p-2"
                  style={{
                    background: T.bg,
                    borderColor: T.border,
                    color: T.muted,
                  }}
                >
                  <span className="text-base">{b.e}</span>
                  <span
                    className="text-[9px] font-semibold leading-tight"
                    style={{ color: T.black }}
                  >
                    {b.t}
                  </span>
                  <div
                    className="h-1 w-10 rounded"
                    style={{ background: T.border }}
                  />
                </div>
              ))}
            </div>
          </LivePreviewBlock>
        ) : (
          <LivePreviewBlock label="Benefit pills">
            <div className="grid grid-cols-4 gap-1.5">
              {benefits.map((b) => (
                <div
                  key={b.t}
                  className="flex flex-col items-center rounded-[6px] py-2 text-[10px]"
                  style={{ background: T.surface, color: T.muted }}
                >
                  <span>{b.e}</span>
                  <div
                    className="mt-1 h-1.5 w-8 rounded"
                    style={{ background: T.border }}
                  />
                </div>
              ))}
            </div>
          </LivePreviewBlock>
        )
      ) : null}

      {/* Feature section */}
      {show("assets-suggest") ? (
        <LivePreviewBlock label="Feature tabs">
          <div className="flex gap-1.5">
            {["Create", "Track", "Paid"].map((t, i) => (
              <div
                key={t}
                className="rounded-[6px] px-2 py-1 text-[10px]"
                style={{
                  background: i === 0 ? T.black : T.surface,
                  color: i === 0 ? "#fff" : T.muted,
                  border: `1px solid ${i === 0 ? T.black : T.border}`,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-2 w-10/12 rounded" style={{ background: T.border }} />
            <div className="h-2 w-8/12 rounded" style={{ background: T.border }} />
            <div className="h-2 w-9/12 rounded" style={{ background: T.border }} />
          </div>
          <div
            className="mt-2 h-16 w-full rounded-[6px]"
            style={{ background: T.surface, border: `1px dashed ${T.borderStrong}` }}
          />
        </LivePreviewBlock>
      ) : null}

      {/* Testimonial — 4th block when requested (before CTA) */}
      {addedTestimonial ? (
        <LivePreviewBlock label="Testimonial">
          <div
            className="text-[10.5px] italic leading-relaxed"
            style={{ color: T.black }}
          >
            &ldquo;We cut our invoice follow-ups in half.&rdquo;
          </div>
          <div
            className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: T.softMuted }}
          >
            — Léa R. · Founder, Atelier Nord
          </div>
        </LivePreviewBlock>
      ) : null}

      {/* CTA block */}
      {show("copy-suggest") ? (
        <LivePreviewBlock label="CTA banner" ghost>
          <div className="h-2 w-8/12 rounded" style={{ background: T.borderStrong }} />
          <div className="mt-1.5 h-2 w-6/12 rounded" style={{ background: T.border }} />
          <div
            className="mt-2 h-6 w-24 rounded-[6px]"
            style={{ background: T.black }}
          />
        </LivePreviewBlock>
      ) : null}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-start gap-3">
      <AiAvatar />
      <div
        className="flex items-center gap-1 rounded-[14px] px-4 py-3"
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
        }}
      >
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: T.softMuted,
              animation: "ai-typing-bounce 1.2s infinite ease-in-out",
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes ai-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function AiConversationScreen({
  intent,
  chatStage,
  setChatStage,
  assetsUsed,
  setAssetsUsed,
  assetsReplacing,
  setAssetsReplacing,
  copyAccepted,
  setCopyAccepted,
  freeMessages,
  setFreeMessages,
  isTyping,
  setIsTyping,
  benefitStyle,
  setBenefitStyle,
  cardsSuggestUsed,
  setCardsSuggestUsed,
  testimonialSuggestUsed,
  setTestimonialSuggestUsed,
  addedTestimonial,
  setAddedTestimonial,
  onPublish,
}) {
  const structure = deriveBlocks(intent, benefitStyle, addedTestimonial);
  const allAssetsUsed = assetsUsed.every(Boolean);
  const allCopyAccepted = copyAccepted.every(Boolean);
  const [input, setInput] = useState("");
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const typingTimerRef = useRef(null);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [freeMessages, isTyping, chatStage, isAutoTyping]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const isBusy = isTyping || isAutoTyping;

  // Animates the user-message into the input field, submits, then replies as AI.
  const typeAndSend = ({
    userText,
    aiText,
    onAfter,
    typeSpeed = 28,
    aiDelay = 1000,
  }) => {
    if (isBusy) return;
    setIsAutoTyping(true);
    setInput("");
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i += 1;
      setInput(userText.slice(0, i));
      if (i >= userText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        typingTimerRef.current = setTimeout(() => {
          setFreeMessages((prev) => [...prev, { role: "user", text: userText }]);
          setInput("");
          setIsAutoTyping(false);
          setIsTyping(true);
          typingTimerRef.current = setTimeout(() => {
            setFreeMessages((prev) => [...prev, { role: "ai", text: aiText }]);
            setIsTyping(false);
            if (onAfter) onAfter();
          }, aiDelay);
        }, 280);
      }
    }, typeSpeed);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    setFreeMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);
    typingTimerRef.current = setTimeout(() => {
      const reply =
        aiAckReplies[Math.floor(Math.random() * aiAckReplies.length)];
      setFreeMessages((prev) => [...prev, { role: "ai", text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  const onSwapPillsForCards = () => {
    if (isBusy || cardsSuggestUsed || benefitStyle === "cards") return;
    setCardsSuggestUsed(true);
    typeAndSend({
      userText: "Can we change the Benefit Pills to cards instead?",
      aiText:
        "Sure — swapping Benefit Pills for Benefit Cards. Still within the design system, and each benefit gets more visual weight.",
      onAfter: () => setBenefitStyle("cards"),
    });
  };

  const onRequestTestimonialSecond = () => {
    if (isBusy || testimonialSuggestUsed || addedTestimonial) return;
    setTestimonialSuggestUsed(true);
    typeAndSend({
      userText: "Can we add a testimonial as the 2nd block?",
      aiText:
        "I can't place a testimonial that high — it goes against our page guidelines. Social proof lands better after benefits and features. Want me to add it as the 4th block, right before the CTA?",
      aiDelay: 1200,
    });
  };

  const onAcceptTestimonialFifth = () => {
    if (isBusy || addedTestimonial) return;
    typeAndSend({
      userText: "Ok, add it as the 4th block.",
      aiText:
        "Added — Testimonial is now the 4th block, just before the CTA. Structure updated on the preview.",
      onAfter: () => setAddedTestimonial(true),
    });
  };

  const canSwapCards =
    intent === "launch" && benefitStyle === "pills" && !cardsSuggestUsed;
  const canRequestTestimonial = !testimonialSuggestUsed && !addedTestimonial;
  const canAcceptFifth =
    testimonialSuggestUsed && !addedTestimonial;
  const hasQuickActions = canSwapCards || canRequestTestimonial;

  const intentCopy = {
    launch: {
      intro:
        "Let's build your product launch page. I'll match Qonto's page structure and tone automatically. What's the name of the feature or product you're launching?",
      userReply:
        "It's called Instant Invoicing — create and send invoices in under 60 seconds.",
      structureIntro:
        "Here's the structure I'd use for a product launch. It surfaces the core promise, supports it with benefits, then offers a way to act.",
      subtitle: "Product Launch",
    },
    seo: {
      intro:
        "Let's build an SEO content page. Which keyword or topic should this page rank for?",
      userReply:
        "How to invoice as a micro-entrepreneur in France — long-tail informational intent.",
      structureIntro:
        "For SEO-informational intent, this structure ranks well and covers the key facets search engines and users expect.",
      subtitle: "SEO Content",
    },
    comparator: {
      intro:
        "Let's build a comparator page. Which competitor should we compare Qonto against?",
      userReply:
        "Qonto vs. Revolut Business — focus on invoicing, fees and customer support.",
      structureIntro:
        "For comparators, this structure balances fairness and clarity. Note: every data point will require your verification before publish.",
      subtitle: "Comparator",
    },
    blank: {
      intro:
        "You chose to build from scratch. I'll stay minimal and only validate design system compliance.",
      userReply:
        "Start with a blank hero and I'll add blocks as I go.",
      structureIntro:
        "Okay — only one block to start. I'll validate each new block you add.",
      subtitle: "Blank Canvas",
    },
  };

  const copy = intentCopy[intent] || intentCopy.launch;

  return (
    <div
      className="flex min-h-0 flex-1 flex-col md:flex-row"
      style={{ background: T.bg }}
    >
      {/* Chat */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Chat header */}
        <div
          className="flex shrink-0 items-center gap-3 border-b px-5 py-3.5"
          style={{ borderColor: T.border, background: T.bg }}
        >
          <AiAvatar />
          <div className="flex-1 min-w-0">
            <div
              className="text-[13px] font-semibold"
              style={{ color: T.black }}
            >
              Qonto Page AI
            </div>
            <div className="text-[11px]" style={{ color: T.softMuted }}>
              {copy.subtitle}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => {
              const order = ["structure-offered", "assets-warning", "assets-suggest", "copy-suggest"];
              const idx = order.indexOf(chatStage);
              const active = i <= idx || chatStage === "ready";
              return (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: active ? T.black : T.veryMuted }}
                />
              );
            })}
          </div>
        </div>

        {/* Chat body */}
        <div
          ref={chatBodyRef}
          className="flex-1 min-h-0 space-y-4 overflow-y-auto overscroll-contain p-5"
          style={{ background: T.surfaceMuted }}
        >
          <MessageBubble role="ai">{copy.intro}</MessageBubble>
          <MessageBubble role="user">{copy.userReply}</MessageBubble>
          <MessageBubble role="ai">
            <p>{copy.structureIntro}</p>
            <StructureCard blocks={structure} />
          </MessageBubble>

          {freeMessages.map((m, i) => (
            <MessageBubble key={`${i}-${m.role}`} role={m.role}>
              {m.text}
            </MessageBubble>
          ))}

          {isTyping ? <TypingDots /> : null}

          {canAcceptFifth && !isBusy ? (
            <div className="flex flex-wrap gap-2 pl-10">
              <Chip variant="primary" onClick={onAcceptTestimonialFifth}>
                Ok, add as 4th block
              </Chip>
            </div>
          ) : null}

          {chatStage === "structure-offered" && !isBusy ? (
            <div className="flex flex-wrap gap-2 pl-10">
              <Chip
                variant="primary"
                disabled={isBusy}
                onClick={() => {
                  if (isBusy) return;
                  if (intent === "launch") setChatStage("assets-warning");
                  else setChatStage("copy-suggest");
                }}
              >
                Looks good
              </Chip>
            </div>
          ) : null}

          {chatStage === "assets-warning" && intent === "launch" ? (
            <MessageBubble role="ai">
              <p>
                Before we continue, your Media Library doesn&apos;t yet contain all the assets this
                page type needs.
              </p>
              <AssetWarningCard />
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip
                  variant="primary"
                  onClick={() => setChatStage("assets-suggest")}
                >
                  I have assets ready
                </Chip>
                <Chip onClick={() => setChatStage("assets-warning")}>
                  Contact Brand team
                </Chip>
              </div>
            </MessageBubble>
          ) : null}

          {chatStage === "assets-suggest" && intent === "launch" ? (
            <MessageBubble role="ai">
              <p>
                Great — here&apos;s what I found. Confirm the matches or replace any asset that
                doesn&apos;t fit.
              </p>
              <AssetSuggestionsCard
                used={assetsUsed}
                setUsed={setAssetsUsed}
                replacing={assetsReplacing}
                setReplacing={setAssetsReplacing}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip
                  variant={allAssetsUsed ? "primary" : "default"}
                  disabled={!allAssetsUsed}
                  onClick={() => setChatStage("copy-suggest")}
                >
                  Confirm all assets →
                </Chip>
              </div>
            </MessageBubble>
          ) : null}

          {chatStage === "copy-suggest" ? (
            <MessageBubble role="ai">
              <p>
                Now the copy. These are written in Qonto&apos;s tone of voice — accept, edit inline,
                or regenerate.
              </p>
              <CopySuggestionsCard
                accepted={copyAccepted}
                setAccepted={setCopyAccepted}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip
                  variant={allCopyAccepted ? "primary" : "default"}
                  disabled={!allCopyAccepted}
                  onClick={() => setChatStage("ready")}
                >
                  Accept all &amp; continue →
                </Chip>
              </div>
            </MessageBubble>
          ) : null}

          {chatStage === "ready" ? (
            <MessageBubble role="ai">
              <p>Your page is ready to review.</p>
              <div className="mt-3">
                <Chip variant="primary" onClick={onPublish}>
                  Preview &amp; Publish →
                </Chip>
              </div>
            </MessageBubble>
          ) : null}
        </div>

        {/* Quick actions (persistent — simulate typing into the input) */}
        {hasQuickActions ? (
          <div
            className="flex shrink-0 flex-wrap items-center gap-1.5 border-t px-4 pt-2.5"
            style={{ borderColor: T.border, background: T.bg }}
          >
            <span
              className="mr-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: T.softMuted }}
            >
              Try asking
            </span>
            {canSwapCards ? (
              <QuickAction
                onClick={onSwapPillsForCards}
                disabled={isBusy}
              >
                Change pills to cards
              </QuickAction>
            ) : null}
            {canRequestTestimonial ? (
              <QuickAction
                onClick={onRequestTestimonialSecond}
                disabled={isBusy}
              >
                Add a testimonial as 2nd
              </QuickAction>
            ) : null}
          </div>
        ) : null}

        {/* Input bar */}
        <form
          onSubmit={handleSend}
          className="flex shrink-0 items-center gap-2 border-t px-4 py-3"
          style={{ borderColor: T.border, background: T.bg }}
        >
          <div
            className="flex flex-1 items-center gap-2 rounded-full border px-4 py-1.5"
            style={{
              borderColor: T.border,
              background: T.surface,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAutoTyping ? "" : "Message the AI…"}
              disabled={isBusy}
              readOnly={isAutoTyping}
              aria-label="Message the AI"
              className="w-full bg-transparent text-[13px] leading-relaxed outline-none placeholder:opacity-60 disabled:opacity-100"
              style={{
                color: T.black,
              }}
            />
            {isAutoTyping ? (
              <span
                className="inline-block h-3.5 w-[1.5px] animate-pulse"
                style={{ background: T.black }}
                aria-hidden
              />
            ) : null}
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isBusy}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold transition hover:opacity-90 disabled:opacity-40"
            style={{ background: T.black, color: "#fff" }}
          >
            ↑
          </button>
        </form>
      </div>

      {/* Live preview */}
      <div
        className="shrink-0 border-t md:border-l md:border-t-0"
        style={{
          width: "100%",
          maxWidth: 340,
          borderColor: T.border,
        }}
      >
        <LivePreview
          chatStage={chatStage}
          intent={intent}
          benefitStyle={benefitStyle}
          addedTestimonial={addedTestimonial}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Screen 4 — Review & Publish                                               */
/* -------------------------------------------------------------------------- */

function ReviewScreen({ intent, benefitStyle, addedTestimonial, onRevise }) {
  const [active, setActive] = useState(0);
  const reviewBlocks = deriveBlocks(intent, benefitStyle, addedTestimonial);

  useEffect(() => {
    if (active >= reviewBlocks.length) setActive(0);
  }, [reviewBlocks.length, active]);
  const benefits = [
    { emoji: "⚡", label: "60-second setup", body: "From a blank screen to a sent invoice in under a minute." },
    { emoji: "✓", label: "100% compliant", body: "VAT, numbering and legal mentions handled automatically." },
    { emoji: "€", label: "Included in Basic", body: "No add-on. Part of every Qonto plan from day one." },
    { emoji: "◈", label: "All-in-one", body: "Banking, invoicing and tracking in a single tool." },
  ];
  return (
    <div
      className="flex min-h-0 flex-1 flex-col md:flex-row"
      style={{ background: T.bg }}
    >
      {/* Left — page preview */}
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
        style={{ background: T.surfaceMuted, fontFamily: fontStack }}
      >
        {/* Sticky top bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b px-4 py-2.5"
          style={{ borderColor: T.border, background: T.bg }}
        >
          <span
            className="truncate text-[12px]"
            style={{ color: T.muted }}
          >
            qonto.com/en/invoicing
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{
              borderColor: T.greenBorder,
              background: T.greenBg,
              color: T.greenText,
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: T.green }}
            />
            Design-compliant
          </span>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Nav bar */}
          <div
            className="flex items-center justify-between border-b px-6 py-3.5 md:px-8"
            style={{ borderColor: T.border, background: T.bg }}
          >
            <div
              className="flex items-center gap-2 text-[13px] font-semibold tracking-tight"
              style={{ color: T.black }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-[7px] text-[11px] font-bold"
                style={{ background: T.black, color: "#fff" }}
              >
                Q
              </span>
              Qonto
            </div>
            <div
              className="hidden items-center gap-5 text-[11.5px] md:flex"
              style={{ color: T.muted }}
            >
              <span>Business account</span>
              <span>Invoicing</span>
              <span>Pricing</span>
              <span>Resources</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden rounded-[7px] px-2.5 py-1.5 text-[11.5px] font-medium md:inline"
                style={{ color: T.muted }}
              >
                Sign in
              </button>
              <button
                type="button"
                className="rounded-[7px] px-3 py-1.5 text-[11.5px] font-semibold"
                style={{ background: T.black, color: "#fff" }}
              >
                Open an account
              </button>
            </div>
          </div>

          {/* Hero */}
          <section
            className="relative overflow-hidden px-6 pb-12 pt-12 text-white md:px-10 md:pb-16 md:pt-16"
            style={{ background: T.black }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.55]"
              style={{
                background:
                  "radial-gradient(900px 420px at 80% -10%, rgba(123,92,255,0.28), transparent 60%), radial-gradient(600px 360px at 10% 110%, rgba(0,200,150,0.22), transparent 60%)",
              }}
              aria-hidden
            />
            <div className="relative grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-center">
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    borderColor: "rgba(255,255,255,0.16)",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#7bd7a3" }}
                  />
                  New · Instant Invoicing
                </span>
                <h3 className="mt-6 max-w-xl text-[26px] font-semibold leading-[1.02] tracking-[-0.025em] md:text-[40px]">
                  Invoicing, reinvented.
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>
                    Done in 60&nbsp;seconds.
                  </span>
                </h3>
                <p
                  className="mt-5 max-w-md text-[12.5px] leading-relaxed md:text-[13.5px]"
                  style={{ color: "rgba(255,255,255,0.66)" }}
                >
                  Create, send and track compliant invoices without leaving your Qonto account — with reminders and smart tracking built in.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    className="rounded-[8px] px-4 py-2 text-[12px] font-semibold"
                    style={{ background: "#fff", color: T.black }}
                  >
                    Open an account →
                  </button>
                  <button
                    type="button"
                    className="rounded-[8px] border px-4 py-2 text-[12px] font-semibold"
                    style={{
                      borderColor: "rgba(255,255,255,0.22)",
                      color: "#fff",
                      background: "transparent",
                    }}
                  >
                    See pricing
                  </button>
                </div>
                <div
                  className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] font-medium uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <span>· No card required</span>
                  <span>· Cancel anytime</span>
                  <span>· EU-regulated</span>
                </div>
              </div>

              {/* Product mock */}
              <div className="relative">
                <div
                  className="rounded-[14px] border p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="rounded-[10px] border p-3.5"
                    style={{
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "rgba(17,17,19,0.82)",
                    }}
                  >
                    <div className="flex items-center justify-between text-[9.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <span>Invoice · INV-2026-041</span>
                      <span
                        className="rounded-full px-2 py-0.5"
                        style={{ background: "rgba(123,215,163,0.18)", color: "#7bd7a3" }}
                      >
                        Sent
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-[22px] font-semibold tracking-tight">€ 2,480</span>
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                        .00
                      </span>
                    </div>
                    <div className="mt-1 text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                      Atelier Nord · due Apr 30
                    </div>
                    <div className="mt-4 space-y-2">
                      {[
                        { l: "Design sprint · week 12", v: "€ 1,800.00" },
                        { l: "Revision — landing page", v: "€ 480.00" },
                        { l: "VAT (20%)", v: "€ 200.00" },
                      ].map((row) => (
                        <div
                          key={row.l}
                          className="flex items-center justify-between border-t pt-2 text-[11px]"
                          style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                        >
                          <span>{row.l}</span>
                          <span className="tabular-nums" style={{ color: "rgba(255,255,255,0.9)" }}>
                            {row.v}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="mt-4 w-full rounded-[8px] py-2 text-[11.5px] font-semibold"
                      style={{ background: "#fff", color: T.black }}
                    >
                      Remind client
                    </button>
                  </div>
                </div>
                <div
                  className="absolute -bottom-3 -left-3 hidden rounded-[10px] border px-3 py-2 text-[10.5px] font-medium backdrop-blur md:block"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    background: "rgba(22,22,25,0.85)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <span style={{ color: "#7bd7a3" }}>●</span> Paid · 2 min ago
                </div>
              </div>
            </div>
          </section>

          {/* Trust strip */}
          <section
            className="border-b px-6 py-5 md:px-10"
            style={{ borderColor: T.border, background: T.bg }}
          >
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: T.softMuted }}
              >
                Trusted by 500,000+ businesses across Europe
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-semibold tracking-tight" style={{ color: T.muted }}>
                <span>ATELIER NORD</span>
                <span>FINN &amp; CO.</span>
                <span>LUNA STUDIO</span>
                <span>VERDE LABS</span>
                <span>NORDEA OY</span>
              </div>
            </div>
          </section>

          {/* Section label */}
          <div className="px-6 pt-12 md:px-10">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: T.softMuted }}
            >
              Why teams pick Qonto
            </span>
            <h4 className="mt-2 max-w-xl text-[20px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[26px]" style={{ color: T.black }}>
              Everything you need to get paid — nothing you don&apos;t.
            </h4>
          </div>

          {/* Benefit pills / cards */}
          {benefitStyle === "cards" ? (
            <section className="grid grid-cols-1 gap-3 px-6 py-7 sm:grid-cols-2 md:grid-cols-4 md:px-10">
              {benefits.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col gap-3 rounded-[14px] border p-5 transition-shadow hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]"
                  style={{ borderColor: T.border, background: T.bg }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[17px]"
                    style={{
                      background: "linear-gradient(145deg, #f6f6f4, #eeeeea)",
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    {b.emoji}
                  </span>
                  <span
                    className="text-[13.5px] font-semibold leading-tight tracking-tight"
                    style={{ color: T.black }}
                  >
                    {b.label}
                  </span>
                  <span
                    className="text-[11.5px] leading-relaxed"
                    style={{ color: T.muted }}
                  >
                    {b.body}
                  </span>
                </div>
              ))}
            </section>
          ) : (
            <section className="grid grid-cols-2 gap-2.5 px-6 py-7 md:grid-cols-4 md:px-10">
              {benefits.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2.5 rounded-[999px] border px-3.5 py-2.5"
                  style={{ borderColor: T.border, background: T.bg }}
                >
                  <span className="text-[15px]">{b.emoji}</span>
                  <span
                    className="text-[12px] font-semibold tracking-tight"
                    style={{ color: T.black }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </section>
          )}

          {/* Feature tabs */}
          <section className="px-6 pb-10 md:px-10">
            <div
              className="overflow-hidden rounded-[16px] border"
              style={{ borderColor: T.border, background: T.bg }}
            >
              <div className="flex flex-wrap items-center gap-1 border-b px-4 py-3 md:px-6" style={{ borderColor: T.border, background: T.surface }}>
                {["Create & send", "Track payments", "Get paid instantly"].map(
                  (t, i) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1.5 text-[11.5px] font-semibold"
                      style={{
                        background: i === 0 ? T.black : "transparent",
                        color: i === 0 ? "#fff" : T.muted,
                        border: `1px solid ${i === 0 ? T.black : "transparent"}`,
                      }}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.1fr]">
                <div className="p-5 md:p-7">
                  <h5 className="text-[15px] font-semibold leading-tight tracking-tight md:text-[17px]" style={{ color: T.black }}>
                    From blank screen to sent invoice — in under a minute.
                  </h5>
                  <ul className="mt-4 space-y-3 text-[12.5px]">
                    {[
                      "Generate invoices in two clicks. VAT, numbering and legal mentions — handled.",
                      "Send with a branded template and know the moment your client opens it.",
                      "Automatic reminders before the due date so no invoice slips through.",
                    ].map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <span
                          className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                          style={{ background: T.greenBg, color: T.greenText }}
                        >
                          ✓
                        </span>
                        <span style={{ color: T.muted }}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="relative min-h-[220px] border-l p-5 md:p-7"
                  style={{
                    borderColor: T.border,
                    background: `linear-gradient(155deg, #f7f7f4 0%, #ececea 100%)`,
                  }}
                >
                  {/* mock invoice list */}
                  <div
                    className="rounded-[10px] border p-3"
                    style={{ borderColor: T.border, background: T.bg }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: T.softMuted }}>
                      <span>Invoices</span>
                      <span>This month</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {[
                        { n: "INV-041", c: "Atelier Nord", v: "€ 2,480", s: "Paid", tone: "ok" },
                        { n: "INV-040", c: "Finn & Co.", v: "€ 1,120", s: "Sent", tone: "info" },
                        { n: "INV-039", c: "Luna Studio", v: "€ 860", s: "Overdue", tone: "warn" },
                      ].map((r) => (
                        <div
                          key={r.n}
                          className="flex items-center justify-between rounded-[8px] border px-2.5 py-2 text-[11px]"
                          style={{ borderColor: T.border, background: T.bg }}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className="inline-block h-1.5 w-1.5 rounded-full"
                              style={{
                                background:
                                  r.tone === "ok"
                                    ? T.green
                                    : r.tone === "warn"
                                    ? "#e8a33b"
                                    : "#5b8def",
                              }}
                            />
                            <span className="truncate font-semibold" style={{ color: T.black }}>
                              {r.n}
                            </span>
                            <span className="truncate" style={{ color: T.muted }}>
                              · {r.c}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="tabular-nums" style={{ color: T.black }}>
                              {r.v}
                            </span>
                            <span
                              className="rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em]"
                              style={{
                                background:
                                  r.tone === "ok"
                                    ? T.greenBg
                                    : r.tone === "warn"
                                    ? "#fff1dc"
                                    : "#eef2ff",
                                color:
                                  r.tone === "ok"
                                    ? T.greenText
                                    : r.tone === "warn"
                                    ? "#a56a11"
                                    : "#3148a0",
                              }}
                            >
                              {r.s}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10.5px]" style={{ color: T.muted }}>
                    <span>Avg. time to paid: 6 days</span>
                    <span className="font-semibold" style={{ color: T.greenText }}>
                      ▲ 38% faster
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial — added as 4th block (before CTA) */}
          {addedTestimonial ? (
            <section className="px-6 pb-10 md:px-10">
              <div
                className="rounded-[16px] border p-6 md:p-9"
                style={{ borderColor: T.border, background: T.bg }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: T.softMuted }}
                  >
                    Customer story
                  </span>
                  <span
                    className="text-[11px] font-semibold tracking-tight"
                    style={{ color: T.black }}
                  >
                    ★★★★★ <span style={{ color: T.muted, fontWeight: 500 }}>4.9 · 2,400 reviews</span>
                  </span>
                </div>
                <p
                  className="mt-4 text-[16px] font-medium leading-[1.35] tracking-tight md:text-[20px]"
                  style={{ color: T.black }}
                >
                  <span style={{ color: T.softMuted }}>“</span>
                  We cut our invoice follow-ups in half. The whole flow just works — from creating the invoice to watching it get paid.
                  <span style={{ color: T.softMuted }}>”</span>
                </p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[11.5px] font-bold"
                      style={{
                        background: "linear-gradient(145deg, #efece4, #d9d4c4)",
                        color: T.black,
                      }}
                    >
                      LR
                    </span>
                    <div>
                      <div className="text-[12.5px] font-semibold tracking-tight" style={{ color: T.black }}>
                        Léa Roussel
                      </div>
                      <div className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: T.softMuted }}>
                        Founder · Atelier Nord
                      </div>
                    </div>
                  </div>
                  <div className="hidden items-center gap-5 text-[10.5px] font-semibold md:flex" style={{ color: T.muted }}>
                    <div>
                      <div className="text-[17px] font-semibold tracking-tight" style={{ color: T.black }}>
                        –52%
                      </div>
                      <div className="uppercase tracking-[0.14em]">follow-ups</div>
                    </div>
                    <div>
                      <div className="text-[17px] font-semibold tracking-tight" style={{ color: T.black }}>
                        6 d
                      </div>
                      <div className="uppercase tracking-[0.14em]">avg. to paid</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {/* CTA banner */}
          <section className="px-6 pb-14 md:px-10">
            <div
              className="relative overflow-hidden rounded-[18px] p-7 text-white md:p-10"
              style={{ background: T.black }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(500px 240px at 90% 110%, rgba(123,215,163,0.18), transparent 60%), radial-gradient(500px 300px at 10% -10%, rgba(123,92,255,0.22), transparent 60%)",
                }}
                aria-hidden
              />
              <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    Ready when you are
                  </span>
                  <h4 className="mt-2 max-w-md text-[22px] font-semibold leading-[1.08] tracking-tight md:text-[28px]">
                    Start invoicing in 60 seconds. Free for 30 days.
                  </h4>
                  <p className="mt-2.5 max-w-md text-[12px]" style={{ color: "rgba(255,255,255,0.62)" }}>
                    No credit card. Cancel anytime. Migrate from another tool — we&apos;ll help.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    className="rounded-[8px] px-4 py-2 text-[12px] font-semibold"
                    style={{ background: "#fff", color: T.black }}
                  >
                    Open an account →
                  </button>
                  <button
                    type="button"
                    className="rounded-[8px] border px-4 py-2 text-[12px] font-semibold"
                    style={{
                      borderColor: "rgba(255,255,255,0.22)",
                      color: "#fff",
                      background: "transparent",
                    }}
                  >
                    Book a demo
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            className="border-t px-6 py-6 md:px-10"
            style={{ borderColor: T.border, background: T.surface }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11.5px] font-semibold" style={{ color: T.black }}>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-[6px] text-[10px] font-bold"
                  style={{ background: T.black, color: "#fff" }}
                >
                  Q
                </span>
                Qonto
                <span className="ml-2 font-normal" style={{ color: T.softMuted }}>
                  © 2026 · Regulated by ACPR
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px]" style={{ color: T.muted }}>
                <span>Security</span>
                <span>Pricing</span>
                <span>Status</span>
                <span>Legal</span>
                <span>Careers</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Right — panel */}
      <div
        className="shrink-0 border-t md:border-l md:border-t-0"
        style={{
          width: "100%",
          maxWidth: 300,
          borderColor: T.border,
          background: T.bg,
        }}
      >
        <div className="flex h-full flex-col">
          <div
            className="border-b px-5 py-4"
            style={{ borderColor: T.border }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: T.softMuted }}
            >
              Page structure
            </p>
            <p
              className="mt-1 text-[12px]"
              style={{ color: T.muted }}
            >
              {reviewBlocks.length} blocks · All compliant
            </p>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-3">
            <ul className="space-y-1">
              {reviewBlocks.map((b, i) => {
                const isActive = active === i;
                return (
                  <li key={b}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="flex w-full items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-[12.5px] transition"
                      style={{
                        background: isActive ? T.surface : "transparent",
                        border: `1px solid ${isActive ? T.border : "transparent"}`,
                        color: T.black,
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-[6px] text-[10px] font-semibold"
                        style={{
                          background: isActive ? T.black : T.surface,
                          color: isActive ? "#fff" : T.muted,
                          border: `1px solid ${isActive ? T.black : T.border}`,
                        }}
                      >
                        {i + 1}
                      </span>
                      {b}
                      <span className="ml-auto text-[10px]" style={{ color: T.greenText }}>
                        ✓
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div
              className="mt-5 rounded-[10px] border p-3"
              style={{
                borderColor: T.greenBorder,
                background: T.greenBg,
              }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: T.greenText }}
              >
                ✦ Design Check
              </p>
              <p
                className="mt-1 text-[12px] leading-relaxed"
                style={{ color: T.black }}
              >
                All components match the Qonto design system.
              </p>
            </div>
          </div>
          <div
            className="flex items-center justify-end gap-2 border-t px-4 py-3"
            style={{ borderColor: T.border, background: T.surfaceMuted }}
          >
            <button
              type="button"
              onClick={onRevise}
              className="rounded-[6px] px-3 py-1.5 text-[12px] font-medium"
              style={{ color: T.muted }}
            >
              ← Revise
            </button>
            <button
              type="button"
              className="rounded-[6px] px-3.5 py-1.5 text-[12px] font-semibold transition hover:opacity-90"
              style={{ background: T.black, color: "#fff" }}
            >
              Publish →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root Prototype                                                            */
/* -------------------------------------------------------------------------- */

export default function Prototype() {
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalChoice, setModalChoice] = useState("ai");
  const [intent, setIntent] = useState("launch");
  const [chatStage, setChatStage] = useState("structure-offered");
  const [assetsUsed, setAssetsUsed] = useState([false, false, false]);
  const [assetsReplacing, setAssetsReplacing] = useState([false, false, false]);
  const [copyAccepted, setCopyAccepted] = useState([false, false, false, false]);
  const [freeMessages, setFreeMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [benefitStyle, setBenefitStyle] = useState("pills");
  const [cardsSuggestUsed, setCardsSuggestUsed] = useState(false);
  const [testimonialSuggestUsed, setTestimonialSuggestUsed] = useState(false);
  const [addedTestimonial, setAddedTestimonial] = useState(false);

  const resetConversationState = () => {
    setChatStage("structure-offered");
    setAssetsUsed([false, false, false]);
    setAssetsReplacing([false, false, false]);
    setCopyAccepted([false, false, false, false]);
    setFreeMessages([]);
    setIsTyping(false);
    setBenefitStyle("pills");
    setCardsSuggestUsed(false);
    setTestimonialSuggestUsed(false);
    setAddedTestimonial(false);
  };

  const reset = () => {
    setStep(1);
    setModalOpen(false);
    setModalChoice("ai");
    setIntent("launch");
    resetConversationState();
  };

  const label = useMemo(() => {
    switch (step) {
      case 1:
        return "CMS · Pages";
      case 2:
        return "New page · Onboarding";
      case 3:
        return "AI Conversation";
      case 4:
        return "Review & Publish";
      default:
        return "";
    }
  }, [step]);

  return (
    <div
      className="w-full"
      style={{ fontFamily: fontStack, color: T.black }}
    >
      <div
        className="relative overflow-hidden rounded-[18px] border shadow-[0_40px_80px_-50px_rgba(0,0,0,0.55)]"
        style={{ borderColor: T.border, background: T.bg }}
      >
        <ChromeBar />
        <StepNav step={step} />

        {/* Toolbar row with reset */}
        <div
          className="flex items-center justify-between gap-4 border-b px-4 py-2.5 sm:px-6"
          style={{ borderColor: T.border, background: T.surfaceMuted }}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: T.softMuted }}
          >
            {label}
          </span>
          <button
            type="button"
            onClick={reset}
            className="rounded-[6px] border px-2.5 py-1 text-[11px] font-medium transition hover:opacity-80"
            style={{
              borderColor: T.borderStrong,
              background: T.bg,
              color: T.muted,
            }}
          >
            ↻ Reset prototype
          </button>
        </div>

        <div
          className="flex"
          style={{
            background: T.bg,
            height: "min(620px, calc(100vh - 200px))",
            minHeight: 460,
          }}
        >
          <Sidebar />
          <div className="relative flex min-w-0 flex-1 flex-col">
            {step === 1 ? (
              <CmsEntryScreen onNewPage={() => setModalOpen(true)} />
            ) : null}
            {step === 2 ? (
              <OnboardingScreen
                intent={intent}
                setIntent={setIntent}
                onContinue={() => {
                  resetConversationState();
                  setStep(3);
                }}
              />
            ) : null}
            {step === 3 ? (
              <AiConversationScreen
                intent={intent}
                chatStage={chatStage}
                setChatStage={setChatStage}
                assetsUsed={assetsUsed}
                setAssetsUsed={setAssetsUsed}
                assetsReplacing={assetsReplacing}
                setAssetsReplacing={setAssetsReplacing}
                copyAccepted={copyAccepted}
                setCopyAccepted={setCopyAccepted}
                freeMessages={freeMessages}
                setFreeMessages={setFreeMessages}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
                benefitStyle={benefitStyle}
                setBenefitStyle={setBenefitStyle}
                cardsSuggestUsed={cardsSuggestUsed}
                setCardsSuggestUsed={setCardsSuggestUsed}
                testimonialSuggestUsed={testimonialSuggestUsed}
                setTestimonialSuggestUsed={setTestimonialSuggestUsed}
                addedTestimonial={addedTestimonial}
                setAddedTestimonial={setAddedTestimonial}
                onPublish={() => setStep(4)}
              />
            ) : null}
            {step === 4 ? (
              <ReviewScreen
                intent={intent}
                benefitStyle={benefitStyle}
                addedTestimonial={addedTestimonial}
                onRevise={() => setStep(3)}
              />
            ) : null}

            {modalOpen ? (
              <NewPageModal
                choice={modalChoice}
                setChoice={setModalChoice}
                onCancel={() => setModalOpen(false)}
                onContinue={() => {
                  setModalOpen(false);
                  if (modalChoice === "ai") {
                    setStep(2);
                  } else {
                    setIntent("blank");
                    resetConversationState();
                    setStep(3);
                  }
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
