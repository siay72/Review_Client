"use client";

import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Star,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";

interface Props {
  review: {
    id: number;
    user: string;
    user_id: number;
    rating: number;
    comment: string;
    created_at: string;
    isOwner?: boolean;
  };

  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ReviewCard({
  review,
  onEdit,
  onDelete,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
      transition-all
      hover:shadow-xl
      "
    >
      <div className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-4">

            {/* Avatar */}

            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-xl
              font-bold
              text-white
              shadow-lg
              "
            >
              {review.user.charAt(0).toUpperCase()}
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h3 className="text-lg font-bold text-slate-900">
                  {review.user}
                </h3>

                <BadgeCheck
                  size={18}
                  className="text-blue-600"
                />

              </div>

              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">

                <CalendarDays size={14} />

                {review.created_at &&
                  new Date(
                    review.created_at
                  ).toLocaleDateString()}

              </div>

            </div>

          </div>

          {/* Rating */}

          <div
            className="
            rounded-2xl
            bg-yellow-50
            px-4
            py-2
            "
          >

            <div className="flex items-center gap-1">

              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}

            </div>

            <p className="mt-1 text-center text-sm font-semibold text-yellow-700">
              {review.rating}.0
            </p>

          </div>

        </div>

        {/* Comment */}

        <div
          className="
          mt-6
          rounded-2xl
          bg-slate-50
          p-5
          "
        >
          <p className="leading-8 text-gray-700">
            {review.comment}
          </p>
        </div>

        {/* Footer */}

        {review.isOwner && (

          <div className="mt-6 flex flex-wrap justify-end gap-3">

            <button
              onClick={onEdit}
              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              transition-all
              hover:-translate-y-0.5
              hover:bg-blue-700
              "
            >
              <Pencil size={18} />
              Edit Review
            </button>

            <button
              onClick={onDelete}
              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-5
              py-3
              font-medium
              text-white
              transition-all
              hover:-translate-y-0.5
              hover:bg-red-700
              "
            >
              <Trash2 size={18} />
              Delete Review
            </button>

          </div>

        )}

      </div>
    </motion.div>
  );
}