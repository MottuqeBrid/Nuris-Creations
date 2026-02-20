import Link from "next/link";
import styles from "./login.module.css";
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(124,58,237,0.14),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(212,160,23,0.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.14),transparent_32%)]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Sign in to your account
            </h1>
            <p className="mt-3 text-sm text-base-content/70 sm:text-base">
              Access your saved favorites, order history, and exclusive member
              offers.
            </p>

            <form className={`${styles["input-form"]} mt-7 space-y-4`}>
              <label className="form-control">
                <span className="label-text text-sm">Email</span>
                <input
                  type="email"
                  placeholder="hello@nuris.com"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control">
                <span className="label-text text-sm">Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                />
              </label>

              <div className="flex items-center justify-between mt-2">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="label-text text-sm">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="link link-hover text-xs"
                >
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Sign in
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 border-t border-base-300"></div>
              <span className="text-xs text-base-content/60">OR</span>
              <div className="flex-1 border-t border-base-300"></div>
            </div>

            <button type="button" className="btn btn-outline w-full mt-4">
              Continue with Google
            </button>

            <p className="mt-5 text-center text-sm text-base-content/70">
              Don&apos;t have an account?{" "}
              <a href="/register" className="link link-hover font-medium">
                Create one
              </a>
            </p>
          </div>

          <aside className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold">Member perks</h2>
            <ul className="mt-5 space-y-3 text-sm text-base-content/75 sm:text-base">
              <li className="rounded-xl bg-base-200/50 p-3">
                ✓ Faster checkout with saved addresses.
              </li>
              <li className="rounded-xl bg-base-200/50 p-3">
                ✓ Order tracking from confirmation to delivery.
              </li>
              <li className="rounded-xl bg-base-200/50 p-3">
                ✓ Early access to new drops and sales.
              </li>
              <li className="rounded-xl bg-base-200/50 p-3">
                ✓ Exclusive member-only discounts.
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-base-300 bg-base-200/40 p-4">
              <p className="text-xs uppercase tracking-wide text-base-content/60">
                Trouble signing in?
              </p>
              <p className="mt-1 text-sm text-base-content/70">
                Contact our support team at support@nuris.com
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
