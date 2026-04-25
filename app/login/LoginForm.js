"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

const initialState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Checking…" : "Enter"} <span aria-hidden>→</span>
    </button>
  );
}

export default function LoginForm({ from }) {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5" autoComplete="off">
      <input type="hidden" name="from" value={from} />
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-white/40 focus:bg-white/[0.06]"
          placeholder="••••••••"
        />
      </div>

      {state?.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/[0.07] px-4 py-2.5 text-xs text-red-200"
        >
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
