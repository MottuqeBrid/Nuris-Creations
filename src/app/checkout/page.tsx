export default function CheckoutPage() {
  return (
    <div
      className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,231,198,0.6),rgba(255,255,255,0)_55%),radial-gradient(circle_at_20%_80%,rgba(214,239,255,0.7),rgba(255,255,255,0)_50%)]"
      style={{ fontFamily: '"Playfair Display", "Cinzel", serif' }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">
            Checkout
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Finalize your order
          </h1>
          <p className="max-w-2xl text-sm text-base-content/70 sm:text-base">
            Review your details and confirm payment. Orders are processed within
            24 hours and shipped with tracking.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
              <h2 className="text-xl font-semibold">Contact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                    className="input input-bordered"
                    placeholder="Rahman"
                    type="text"
                  />
                </label>
                <label className="form-control sm:col-span-2">
                  <span className="label-text text-sm">Email</span>
                  <input
                    className="input input-bordered"
                    placeholder="hello@nuris.com"
                    type="email"
                  />
                </label>
                <label className="form-control sm:col-span-2">
                  <span className="label-text text-sm">Phone</span>
                  <input
                    className="input input-bordered"
                    placeholder="+880 1XXXXXXXXX"
                    type="tel"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
              <h2 className="text-xl font-semibold">Shipping</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="form-control sm:col-span-2">
                  <span className="label-text text-sm">Address</span>
                  <input
                    className="input input-bordered"
                    placeholder="House, road, area"
                    type="text"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text text-sm">City</span>
                  <input
                    className="input input-bordered"
                    placeholder="Dhaka"
                    type="text"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text text-sm">Postal code</span>
                  <input
                    className="input input-bordered"
                    placeholder="1207"
                    type="text"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text text-sm">Delivery method</span>
                  <select className="select select-bordered">
                    <option>Standard (2-4 days)</option>
                    <option>Express (1-2 days)</option>
                  </select>
                </label>
                <label className="form-control">
                  <span className="label-text text-sm">Payment</span>
                  <select className="select select-bordered">
                    <option>Cash on delivery</option>
                    <option>Card payment</option>
                    <option>Mobile wallet</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
              <h2 className="text-xl font-semibold">Order notes</h2>
              <textarea
                className="textarea textarea-bordered mt-4 min-h-30"
                placeholder="Add delivery notes or special requests"
              ></textarea>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-4 space-y-4">
                {[
                  { name: "Ivory Frock", qty: 1, price: 4200 },
                  { name: "Silk Nima", qty: 2, price: 3600 },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-base-content/60">Qty {item.qty}</p>
                    </div>
                    <span className="font-semibold">
                      ৳{(item.price * item.qty).toLocaleString("en-BD")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider my-5"></div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">৳11,400</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">৳200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <span className="font-semibold text-success">-৳400</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>৳11,200</span>
              </div>

              <button className="btn btn-primary mt-6 w-full">
                Place order
              </button>
              <p className="mt-3 text-xs text-base-content/60">
                By placing your order, you agree to our delivery and return
                policy.
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Need help?</h2>
              <p className="mt-2 text-sm text-base-content/70">
                Chat with our support team or call us at +880 1XXXXXXXXX.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-outline btn-sm">Live chat</button>
                <button className="btn btn-ghost btn-sm">Call now</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
