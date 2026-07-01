"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export default function RatingStars({
  rating,
  size = 18,
  showValue = true,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex items-center">

        {[1, 2, 3, 4, 5].map((star) => (

          <Star
            key={star}
            size={size}
            className={`mr-1 transition-all duration-300 ${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />

        ))}

      </div>

      {showValue && (
        <span
          className="
          rounded-full
          bg-yellow-100
          px-3
          py-1
          text-sm
          font-semibold
          text-yellow-700
          "
        >
          {rating.toFixed(1)}
        </span>
      )}

    </div>
  );
}