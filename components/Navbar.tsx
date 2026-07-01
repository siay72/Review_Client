"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../src/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import {
  FiHome,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

import { MdRateReview } from "react-icons/md";

export default function Navbar() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("mousedown", close);

    return () => {
      window.removeEventListener("mousedown", close);
    };
  }, []);

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully 👋");

    setProfileOpen(false);
    setMobileOpen(false);

    router.push("/login");
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <FiHome size={18} />,
    },
  ];

  return (
    <>
      {/* Backdrop */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Navbar */}

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.55,
        }}
        className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-sm"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.08,
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
            >
              <MdRateReview size={23} />
            </motion.div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              Review Platform
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Trusted Product Reviews
            </p>
          </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300

                  ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  }
                  `}
                >
                  {item.icon}

                  {item.name}

                  {active && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-xl border border-blue-200"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">
            {!user ? (
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href="/login"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
                >
                  Login
                </Link>
              </motion.div>
            ) : (
              <div
                ref={profileRef}
                className="relative"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className="flex items-center gap-2 rounded-full"
                >
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                  </div>

                  <FiChevronDown
                    className={`hidden transition duration-300 md:block ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 12,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                            {user.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <h3 className="font-semibold">
                              {user.name}
                            </h3>

                            <p className="text-sm text-blue-100">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">

                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                        >
                          <FiLogOut />

                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Button */}

          </div>
        </div>
      </motion.nav>
</>
  );
}