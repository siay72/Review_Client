"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaStar,
} from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0f172a] text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <Link href="/" className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <MdRateReview size={26} />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Review Platform
              </h2>

              <p className="-mt-1 text-sm text-slate-400">
                Trusted Product Reviews
              </p>
            </div>

            </Link>

            <p className="mt-6 leading-8 text-slate-400">
              Empowering users with authentic reviews and
              transparent feedback. Make informed decisions
              with confidence.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="rounded-lg border border-slate-700 p-3 transition hover:border-blue-500 hover:bg-blue-600"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-lg border border-slate-700 p-3 transition hover:border-pink-500 hover:bg-pink-600"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-lg border border-slate-700 p-3 transition hover:border-blue-500 hover:bg-blue-700"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li>
                <Link
                  href="/products"
                  className="transition hover:text-blue-400"
                >
                  Browse Reviews
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="transition hover:text-blue-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Reviewers */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              For Reviewers
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li>
                <Link
                  href="/products"
                  className="transition hover:text-blue-400"
                >
                  Write a Review
                </Link>
              </li>

              <li>
                <Link
                  href="/my-reviews"
                  className="transition hover:text-blue-400"
                >
                  My Reviews
                </Link>
              </li>

              <li>
                <Link
                  href="/guidelines"
                  className="transition hover:text-blue-400"
                >
                  Review Guidelines
                </Link>
              </li>

              <li>
                <Link
                  href="/support"
                  className="transition hover:text-blue-400"
                >
                  Contact Support
                </Link>
              </li>

            </ul>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Stay Updated
            </h3>

            <p className="mb-6 leading-7 text-slate-400">
              Subscribe to our newsletter for the latest
              reviews and product updates.
            </p>

            <form className="flex">

              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-l-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <button
                type="submit"
                className="rounded-r-xl bg-blue-600 px-6 font-semibold transition hover:bg-blue-700"
              >
                Join
              </button>

            </form>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 Review Platform. All rights reserved.
          </p>

          <div className="flex gap-8">

            <Link
              href="/privacy"
              className="transition hover:text-blue-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-blue-400"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}