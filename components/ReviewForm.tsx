"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, SendHorizonal, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/services/api";

interface Props {
  productId: number;
  onSuccess: () => void;
}

export default function ReviewForm({
  productId,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a review.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/reviews", {
        product_id: productId,
        name,
        rating,
        comment,
      });

      toast.success(
        "Review submitted successfully 🎉"
      );

      setName("");
      setRating(5);
      setComment("");

      onSuccess();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to submit review."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: .5,
      }}
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-xl
      "
    >

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            text-white
            "
          >
            <MessageSquare size={24} />
          </div>

          <div>

            <h2 className="text-3xl font-black">

              Write a Review

            </h2>

            <p className="text-gray-500">

              Share your experience with
              other customers.

            </p>

          </div>

        </div>

      </div>

      <form
        onSubmit={submitReview}
        className="space-y-6"
      >

        {/* Name */}

        <div>

          <label className="mb-2 block font-semibold">

            Your Name

          </label>

          <input
            required
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your name"
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            p-4
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            "
          />

        </div>

        {/* Rating */}

        <div>

          <label className="mb-3 block font-semibold">

            Your Rating

          </label>

          <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                type="button"
                onClick={() =>
                  setRating(star)
                }
                className="transition hover:scale-125"
              >

                <Star
                  size={34}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />

              </button>

            ))}

          </div>

        </div>

        {/* Comment */}

        <div>

          <label className="mb-2 block font-semibold">

            Your Review

          </label>

          <textarea
            rows={6}
            required
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Tell everyone what you think about this product..."
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            p-4
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            "
          />

        </div>

        {/* Submit */}

        <button
          disabled={loading}
          className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-blue-600
          py-4
          text-lg
          font-semibold
          text-white
          transition-all
          hover:-translate-y-1
          hover:bg-blue-700
          disabled:opacity-60
          "
        >

          <SendHorizonal size={20} />

          {loading
            ? "Submitting..."
            : "Submit Review"}

        </button>

      </form>

    </motion.div>
  );
}