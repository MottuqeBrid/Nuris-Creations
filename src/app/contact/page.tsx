import styles from "./contact.module.css";
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">
            Contact
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            We would love to hear from you
          </h1>
          <p className="max-w-2xl text-sm text-base-content/70 sm:text-base">
            Share your request, custom sizing needs, or collaboration ideas. Our
            team responds within 24 hours.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            className={`${styles["input-form"]} rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-control">
                <span className="label-text text-sm">First name</span>
                <input
                  className="input input-bordered"
                  placeholder="Nuri"
                  type="text"
                />
              </label>
              <label className="form-control">
                <span className="label-text text-sm">Last name</span>
                <input
                  className="input input-bordered w-full"
                  placeholder="Rahman"
                  type="text"
                />
              </label>
              <label className="form-control sm:col-span-2">
                <span className="label-text text-sm">Email</span>
                <input
                  className="input input-bordered w-full"
                  placeholder="hello@nuris.com"
                  type="email"
                />
              </label>
              <label className="form-control sm:col-span-2">
                <span className="label-text text-sm">Phone</span>
                <input
                  className="input input-bordered w-full"
                  placeholder="+880 1XXXXXXXXX"
                  type="tel"
                />
              </label>
              <label className="form-control sm:col-span-2">
                <span className="label-text text-sm">Subject</span>
                <input
                  className="input input-bordered w-full"
                  placeholder="Custom order, sizing, or support"
                  type="text"
                />
              </label>
              <label className="form-control sm:col-span-2">
                <span className="label-text text-sm">Message</span>
                <textarea
                  className="textarea textarea-bordered min-h-35 w-full"
                  placeholder="Tell us more about your request"
                ></textarea>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-base-content/60">
                By sending this form you agree to our privacy policy.
              </p>
              <button className="btn btn-primary">Send message</button>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <h2 className="text-xl font-semibold">Visit or call</h2>
              <div className="mt-4 space-y-3 text-sm text-base-content/70">
                <p>
                  House 12, Road 5, Dhanmondi
                  <br />
                  Dhaka 1207, Bangladesh
                </p>
                <p>
                  Phone: +880 1XXXXXXXXX
                  <br />
                  Email: support@nuris.com
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <h2 className="text-xl font-semibold">Studio hours</h2>
              <div className="mt-4 space-y-2 text-sm text-base-content/70">
                <div className="flex items-center justify-between">
                  <span>Saturday - Thursday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Friday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <h2 className="text-xl font-semibold">Quick support</h2>
              <p className="mt-2 text-sm text-base-content/70">
                For urgent order updates, send us a WhatsApp message and we will
                respond quickly.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-outline btn-sm">WhatsApp</button>
                <button className="btn btn-ghost btn-sm">Email us</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
