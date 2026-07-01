/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Trash2, Search, Star } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  id: number;
  user: string;
  product: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadReviews() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://review-project-backend.onrender.com/api/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("API returned:", data);
      toast.error(data.detail || "Failed to load reviews");
      return;
    }

    setReviews(data);
    setFilteredReviews(data);
    
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter((review) =>
      review.user.toLowerCase().includes(search.toLowerCase()) ||
      review.product.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredReviews(filtered);
  }, [search, reviews]);

  async function deleteReview(id: number) {
    if (!confirm("Delete this review?")) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(
        `https://review-project-backend.onrender.com/api/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review deleted");

      loadReviews();
    } catch {
      toast.error("Delete failed");
    }
  }

  if (loading)
    return (
      <div className="flex h-96 items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="p-6">

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Review Management
          </h1>

          <p className="text-gray-500">
            Manage customer reviews
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Reviewer
                </th>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Rating
                </th>

                <th className="p-4 text-left">
                  Comment
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-right">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredReviews.map((review) => (

                <tr
                  key={review.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4 font-semibold">
                    {review.user}
                  </td>

                  <td className="p-4">
                    {review.product}
                  </td>

                  <td className="p-4">

                    <div className="flex">

                      {Array.from({
                        length: review.rating,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill="#facc15"
                          className="text-yellow-400"
                        />
                      ))}

                    </div>

                  </td>

                  <td className="max-w-xs truncate p-4">
                    {review.comment}
                  </td>

                  <td className="p-4 text-gray-500">
                    {new Date(
                      review.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-end">

                      <button
                        onClick={() =>
                          deleteReview(review.id)
                        }
                        className="rounded-lg bg-red-100 p-2 hover:bg-red-200"
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}