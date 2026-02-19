"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/_components/Logo/Logo";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Error Code */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-primary">
              Page Not Found
            </p>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Oops! We couldn&apos;t find the page you&apos;re looking for. It
              might have been moved or deleted.
            </p>
            <p className="text-sm sm:text-base text-tertiary">
              Error Code: 404 - Page Does Not Exist
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent"></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/"
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
            >
              Go Home
            </Link>
            <button
              onClick={() => router.back()}
              className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
            >
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="pt-4">
            <p className="text-sm text-tertiary mb-4">Quick Links:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link
                href="/shop/mugs"
                className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200 text-sm"
              >
                Custom Mugs
              </Link>
              <Link
                href="/shop/tshirts"
                className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200 text-sm"
              >
                T-Shirts
              </Link>
              <Link
                href="/shop/phone-cases"
                className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200 text-sm"
              >
                Phone Cases
              </Link>
              <Link
                href="/about"
                className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200 text-sm"
              >
                Contact
              </Link>
              <Link
                href="/shop"
                className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200 text-sm"
              >
                All Products
              </Link>
            </div>
          </div>

          {/* Footer Message */}
          <div className="pt-4 border-t border-tertiary">
            <p className="text-xs sm:text-sm text-tertiary">
              If you think this is an error, please{" "}
              <Link
                href="/contact"
                className="text-accent hover:text-accent-dark font-semibold transition-colors duration-200"
              >
                contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
