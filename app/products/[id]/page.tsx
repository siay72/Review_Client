/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Pencil,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import api from "@/services/api";
import { ProductDetails } from "@/types";

import Loader from "@/components/Loader";
import ReviewCard from "@/components/ReviewCard";
import RatingStars from "@/components/RatingStars";
import ReviewForm from "@/components/ReviewForm";

import toast from "react-hot-toast";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailsPage({
  params,
}: Props) {

  const [product, setProduct] =
    useState<ProductDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  const [editingReview, setEditingReview] =
    useState<any>(null);

  const [editRating, setEditRating] =
    useState(5);

  const [editComment, setEditComment] =
    useState("");

  async function loadProduct() {
    setLoading(true);

    try {
      const { id } = await params;

      const response = await api.get(
        `/products/${id}`
      );

      setProduct(response.data);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [params]);

  useEffect(() => {
    const user =
      localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  async function handleDelete(
    reviewId: number
  ) {
    if (!confirm("Delete this review?"))
      return;

    try {
      const token =
        localStorage.getItem("token");

      await api.delete(
        `/reviews/${reviewId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Review deleted successfully"
      );

      loadProduct();
    } catch {
      toast.error("Delete failed");
    }
  }

  async function updateReview() {
    if (!editingReview) return;

    try {
      const token =
        localStorage.getItem("token");

      await api.put(
        `/reviews/${editingReview.id}`,
        {
          rating: editRating,
          comment: editComment,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Review updated successfully"
      );

      setEditingReview(null);

      loadProduct();

    } catch {

      toast.error("Update failed");

    }
  }

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">

        Product not found.

      </div>
    );
  }

  const imageUrl =
    product.image_url.startsWith("http")
      ? product.image_url
      : `http://127.0.0.1:8000${product.image_url}`;

  return (
  <div className="min-h-screen bg-slate-50">

    {/* Hero */}
    <section className="border-b bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="grid items-center gap-14 lg:grid-cols-2"
        >

          {/* Product Image */}

          <div>

            <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl">

              <img
                src={imageUrl}
                alt={product.title}
                className="h-[450px] w-full rounded-2xl object-cover transition duration-500 hover:scale-105"
              />

            </div>

          </div>

          {/* Product Info */}

          <div className="text-white">

            <span
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-500/20
              px-4
              py-2
              text-sm
              "
            >
              <BadgeCheck size={16} />
              Verified Product
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight">

              {product.title}

            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4">

              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white/10
                px-4
                py-3
                "
              >

                <Star
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-bold text-xl">

                  {product.average_rating}

                </span>

              </div>

              <div
                className="
                rounded-xl
                bg-white/10
                px-4
                py-3
                "
              >

                {product.reviews.length} Reviews

              </div>

            </div>

            <div className="mt-8">

              <RatingStars
                rating={product.average_rating}
              />

            </div>

            <p
              className="
              mt-8
              text-lg
              leading-9
              text-slate-200
              "
            >
              {product.description}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">

              <div
                className="
                rounded-2xl
                bg-white/10
                p-5
                backdrop-blur
                "
              >

                <ShoppingBag
                  className="mb-3"
                  size={30}
                />

                <h3 className="font-semibold">

                  Premium Quality

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Carefully selected product with
                  excellent customer feedback.

                </p>

              </div>

              <div
                className="
                rounded-2xl
                bg-white/10
                p-5
                backdrop-blur
                "
              >

                <ShieldCheck
                  className="mb-3"
                  size={30}
                />

                <h3 className="font-semibold">

                  Secure Purchase

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  Trusted reviews from verified users.

                </p>

              </div>

              <div
                className="
                rounded-2xl
                bg-white/10
                p-5
                backdrop-blur
                "
              >

                <BadgeCheck
                  className="mb-3"
                  size={30}
                />

                <h3 className="font-semibold">

                  Highly Rated

                </h3>

                <p className="mt-2 text-sm text-slate-300">

                  One of our most reviewed products.

                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

    {/* Reviews */}

    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black text-slate-900">

            Customer Reviews

          </h2>

          <p className="mt-2 text-gray-500">

            Real experiences from verified buyers.

          </p>

        </div>

        <div
          className="
          rounded-2xl
          bg-blue-600
          px-6
          py-4
          text-white
          shadow-lg
          "
        >

          <p className="text-sm">

            Average Rating

          </p>

          <p className="text-3xl font-bold">

            {product.average_rating}

          </p>

        </div>

      </div>

      <div className="space-y-6">        {product.reviews.length > 0 ? (

          product.reviews.map((review, index) => (

            <motion.div
              key={review.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .08,
              }}
            >

              <ReviewCard
                review={{
                  ...review,
                  isOwner:
                    currentUser?.id === review.user_id,
                }}
                onDelete={() =>
                  handleDelete(review.id)
                }
                onEdit={() => {
                  setEditingReview(review);
                  setEditRating(review.rating);
                  setEditComment(review.comment);
                }}
              />

            </motion.div>

          ))

        ) : (

          <div
            className="
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-white
            py-20
            text-center
            shadow-sm
            "
          >

            <Star
              size={60}
              className="mx-auto mb-5 text-yellow-400"
            />

            <h3 className="text-2xl font-bold">

              No Reviews Yet

            </h3>

            <p className="mt-3 text-gray-500">

              Be the first customer to share
              your experience.

            </p>

          </div>

        )}

      </div>

    </section>

    {/* Review Form */}

    <section className="bg-white py-20">

      <div className="mx-auto max-w-4xl px-6">

        <div
          className="
          rounded-3xl
          border
          bg-gradient-to-br
          from-white
          to-slate-50
          p-8
          shadow-xl
          "
        >
          <ReviewForm
            productId={product.id}
            onSuccess={loadProduct}
          />

        </div>

      </div>

    </section>

    {/* Edit Modal */}

    <AnimatePresence>

      {editingReview && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
          backdrop-blur-sm
          p-4
          "
        >

          <motion.div
            initial={{
              scale: .8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: .8,
              opacity: 0,
            }}
            className="
            w-full
            max-w-lg
            rounded-3xl
            bg-white
            p-8
            shadow-2xl
            "
          >

            <h2 className="text-3xl font-black">

              Edit Review

            </h2>

            <p className="mt-2 text-gray-500">

              Update your feedback anytime.

            </p>

            <div className="mt-8">

              <label className="font-semibold">

                Rating

              </label>

              <select
                value={editRating}
                onChange={(e) =>
                  setEditRating(
                    Number(e.target.value)
                  )
                }
                className="
                mt-2
                w-full
                rounded-xl
                border
                p-4
                "
              >

                {[5,4,3,2,1].map((item)=>(

                  <option
                    key={item}
                    value={item}
                  >

                    {item} ⭐

                  </option>

                ))}

              </select>

            </div>

            <div className="mt-6">

              <label className="font-semibold">

                Comment

              </label>

              <textarea
                rows={5}
                value={editComment}
                onChange={(e)=>
                  setEditComment(
                    e.target.value
                  )
                }
                className="
                mt-2
                w-full
                rounded-xl
                border
                p-4
                "
              />

            </div>

            <div className="mt-10 flex justify-end gap-4">

              <button
                onClick={() =>
                  setEditingReview(null)
                }
                className="
                rounded-xl
                border
                px-6
                py-3
                font-medium
                "
              >

                Cancel

              </button>

              <button
                onClick={updateReview}
                className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                "
              >

                Update Review

              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  </div>
);
}