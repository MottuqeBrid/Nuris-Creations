import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

export default function FooterPage() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* <h3 className="text-lg font-semibold">Nuri&apos;s Creations</h3> */}
            <Logo />
            <p className="mt-2 text-xs text-base-content/70">
              Hand-finished frocks, nimas, blouses, and essentials crafted by
              local artisans with love.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="text-base-content/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-base-content/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-base-content/60 hover:text-primary transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterest className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-base-content/60 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h6 className="text-sm font-semibold uppercase tracking-wide">
              Shop
            </h6>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/shop/frocks" className="link link-hover">
                  Frocks
                </Link>
              </li>
              <li>
                <Link href="/shop/nimas" className="link link-hover">
                  Nimas
                </Link>
              </li>
              <li>
                <Link href="/shop/blouses" className="link link-hover">
                  Blouses
                </Link>
              </li>
              <li>
                <Link href="/shop/others" className="link link-hover">
                  Others
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h6 className="text-sm font-semibold uppercase tracking-wide">
              Support
            </h6>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="link link-hover">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-sm font-semibold uppercase tracking-wide">
              Company
            </h6>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="link link-hover">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="text-sm font-semibold uppercase tracking-wide">
              Legal
            </h6>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="link link-hover">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-base-300 pt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
            <p className="text-xs text-base-content/60">
              © {new Date().getFullYear()} Nuri&apos;s Creations. All rights
              reserved.
            </p>
            <div className="flex gap-4 text-xs text-base-content/60">
              <a href="#" className="link link-hover">
                Privacy
              </a>
              <a href="#" className="link link-hover">
                Terms
              </a>
              <a href="#" className="link link-hover">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
