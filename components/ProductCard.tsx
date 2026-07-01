"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Star,
} from "lucide-react";

import { Product } from "@/types";
import RatingStars from "./RatingStars";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const imageUrl = product.image_url.startsWith("http")
    ? product.image_url
    : `http://127.0.0.1:8000${product.image_url}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl"
    >
      {/* Product Image */}

      <div className="relative h-52 overflow-hidden">

        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Rating */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg">

          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold">
            {product.average_rating.toFixed(1)}
          </span>

        </div>

        {/* Reviews */}

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-white shadow-lg">

          <MessageSquare size={15} />

          <span className="text-sm">
            {product.review_count}
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="p-5">

        <h2 className="truncate text-xl font-bold text-slate-900">
          {product.title}
        </h2>

        <div className="mt-3">

          <RatingStars rating={product.average_rating} />

        </div>
         <p className="mt-4 text-sm text-slate-500">
          {product.description} 
        </p>

        <p className="mt-4 text-sm text-slate-500">
          {product.review_count} Customer Reviews
        </p>

        <Link
          href={`/products/${product.id}`}
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-blue-600"
        >
          View Details

          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />

        </Link>

      </div>
    </motion.div>
  );
}