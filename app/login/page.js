import LoginForm from "./LoginForm";

export const metadata = {
  title: "Enter password — Mariana Difini",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }) {
  const params = (await searchParams) || {};
  const from = typeof params.from === "string" ? params.from : "/";

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16 sm:px-10">
        <div className="space-y-10">
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
              ( Private )
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              This portfolio is password-protected
            </h1>
            <p className="text-sm leading-relaxed text-white/60">
              Enter the password to continue. If you don't have it, reach out at{" "}
              <a
                href="mailto:marianadifini@gmail.com"
                className="text-white/90 underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
              >
                marianadifini@gmail.com
              </a>
              .
            </p>
          </div>

          <LoginForm from={from} />
        </div>
      </main>
    </div>
  );
}
