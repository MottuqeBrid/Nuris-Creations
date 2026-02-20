import styles from "./register.module.css";
export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(124,58,237,0.14),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(212,160,23,0.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.14),transparent_32%)]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">
              Join Nuri&apos;s Creations
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-sm text-base-content/70 sm:text-base">
              Register to save favorites, track orders, and get access to new
              collection drops first.
            </p>

            <form className={`${styles["input-form"]} mt-7 space-y-4`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control">
                  <span className="label-text text-sm">First name</span>
                  <input
                    type="text"
                    placeholder="Nuri"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control">
                  <span className="label-text text-sm">Last name</span>
                  <input
                    type="text"
                    placeholder="Rahman"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <label className="form-control">
                <span className="label-text text-sm">Email</span>
                <input
                  type="email"
                  placeholder="hello@nuris.com"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control">
                <span className="label-text text-sm">Phone</span>
                <input
                  type="tel"
                  placeholder="+880 1XXXXXXXXX"
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

              <label className="form-control">
                <span className="label-text text-sm">Confirm password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="label cursor-pointer justify-start gap-3 rounded-xl border border-base-300 bg-base-200/40 p-3">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="label-text text-sm">
                  I agree to the terms and privacy policy.
                </span>
              </label>

              <button type="submit" className="btn btn-primary w-full">
                Create account
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-base-content/70">
              Already have an account?{" "}
              <a href="/login" className="link link-hover font-medium">
                Sign in
              </a>
            </p>
          </div>

          <aside className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold">Why register?</h2>
            <ul className="mt-5 space-y-3 text-sm text-base-content/75 sm:text-base">
              <li className="rounded-xl bg-base-200/50 p-3">
                Track orders and delivery updates in one place.
              </li>
              <li className="rounded-xl bg-base-200/50 p-3">
                Save your preferred sizes and checkout faster.
              </li>
              <li className="rounded-xl bg-base-200/50 p-3">
                Get early access to new drops and special offers.
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-base-300 bg-base-200/40 p-4">
              <p className="text-xs uppercase tracking-wide text-base-content/60">
                Support
              </p>
              <p className="mt-1 text-sm text-base-content/70">
                Need help creating your account? Contact us at support@nuris.com
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
