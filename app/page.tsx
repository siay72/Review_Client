"use client";

import {
  ArrowRight,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { useEffect, useState } from "react";

import api from "@/services/api";
import { Product } from "@/types";

import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (loading) return <Loader />;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .7 }}
            >

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-blue-200">

                <ShieldCheck size={18} />

                Trusted Review Platform

              </div>

              <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl">

                Discover Products Through

                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                  Honest Customer Reviews

                </span>

              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

                Browse thousands of products, compare ratings,
                and share your own experience to help others
                make smarter buying decisions.

              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700">

                  Browse Products

                  <ArrowRight size={18} />

                </button>

                <button className="rounded-xl border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900">

                  Learn More

                </button>

              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .7 }}
              className="grid gap-6 sm:grid-cols-2"
            >

              {[
                {
                  icon: Package,
                  title: "Products",
                  value: products.length,
                },
                {
                  icon: Users,
                  title: "Users",
                  value: "500+",
                },
                {
                  icon: Star,
                  title: "Reviews",
                  value: "1K+",
                },
                {
                  icon: TrendingUp,
                  title: "Rating",
                  value: "4.9",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl"
                >

                  <item.icon
                    size={34}
                    className="mb-6 text-cyan-300"
                  />

                  <h2 className="text-4xl font-black text-white">

                    {item.value}

                  </h2>

                  <p className="mt-2 text-slate-300">

                    {item.title}

                  </p>

                </div>
              ))}

            </motion.div>

          </div>

        </div>

      </section>

      {/* Products Section */}
      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Our Collection
              </span>

              <h2 className="mt-5 text-4xl font-black text-slate-900">
                Featured Products
              </h2>

              <p className="mt-4 max-w-2xl text-lg text-slate-500">
                Read trusted reviews from real users before making your next purchase decision.
              </p>

            </div>

            <div className="w-full lg:w-96">

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <div className="col-span-full rounded-3xl border bg-white p-16 text-center">

                <h3 className="text-2xl font-bold">
                  No Products Found
                </h3>

                <p className="mt-3 text-slate-500">
                  Try searching with another keyword.
                </p>

              </div>
            )}

          </div>

        </div>

      </section>
    </>
  );
}