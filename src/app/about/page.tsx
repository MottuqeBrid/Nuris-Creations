export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">
              About Nuri&#x27;s Creations
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Crafted stories in fabric, stitched with Bangladeshi heart.
            </h1>
            <p className="text-sm leading-relaxed text-base-content/70 sm:text-base">
              We design hand-finished frocks, nimas, blouses, and everyday
              essentials that feel personal. Each piece is built for comfort and
              detail, made in small batches by local artisans who love the
              craft.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-base-300 bg-base-100 px-3 py-1 text-xs">
                Ethical sourcing
              </span>
              <span className="rounded-full border border-base-300 bg-base-100 px-3 py-1 text-xs">
                Small-batch production
              </span>
              <span className="rounded-full border border-base-300 bg-base-100 px-3 py-1 text-xs">
                Custom sizing
              </span>
              <span className="rounded-full border border-base-300 bg-base-100 px-3 py-1 text-xs">
                Hand finishing
              </span>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Our promise</h2>
              <p className="mt-2 text-sm text-base-content/70 sm:text-base">
                We work with natural, breathable fabrics whenever possible and
                build silhouettes that move with you. If a piece is not perfect,
                we will make it right.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Behind the label</h3>
              <p className="mt-3 text-sm text-base-content/70 sm:text-base">
                Founded by a mother-daughter duo, Nuri&#x27;s Creations blends
                traditional Bengali craftsmanship with modern silhouettes. We
                partner with local tailors and illustrators to bring every
                collection to life.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-base-200/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-base-content/60">
                    Since
                  </p>
                  <p className="text-2xl font-semibold">2018</p>
                </div>
                <div className="rounded-2xl bg-base-200/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-base-content/60">
                    Artisans
                  </p>
                  <p className="text-2xl font-semibold">28+</p>
                </div>
                <div className="rounded-2xl bg-base-200/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-base-content/60">
                    Styles
                  </p>
                  <p className="text-2xl font-semibold">120+</p>
                </div>
                <div className="rounded-2xl bg-base-200/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-base-content/60">
                    Happy clients
                  </p>
                  <p className="text-2xl font-semibold">4.9/5</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-base-300 bg-base-100 p-6">
              <h3 className="text-xl font-semibold">How we work</h3>
              <ol className="mt-4 space-y-4 text-sm text-base-content/70 sm:text-base">
                <li>
                  <span className="font-semibold text-base-content">01.</span>
                  <span className="ml-2">
                    Design sketches and fabric tests.
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-base-content">02.</span>
                  <span className="ml-2">Cut, stitch, and hand finish.</span>
                </li>
                <li>
                  <span className="font-semibold text-base-content">03.</span>
                  <span className="ml-2">
                    Quality check and careful packing.
                  </span>
                </li>
              </ol>
              <button className="btn btn-primary mt-6">See latest drops</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
