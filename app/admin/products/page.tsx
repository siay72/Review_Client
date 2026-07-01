/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Loader2,
  Package,
  Search,
  Boxes,
} from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
  average_rating: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://review-project-backend.onrender.com/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id: number) {
    if (!confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://review-project-backend.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Product deleted successfully");

      loadProducts();
    } catch {
      toast.error("Delete failed");
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
        <div className="space-y-8 p-4 md:p-6">

          {/* Header */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Admin Dashboard
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                Product Management
              </h1>

              <p className="mt-3 max-w-2xl text-slate-500">
                Manage all your products, edit existing items, monitor ratings,
                and quickly search through your catalog.
              </p>

            </div>

            <Link
              href="/admin/products/new"
              className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-6
              py-3.5
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              "
            >
              <Plus size={20} />

              Add Product
            </Link>

          </div>

          {/* Dashboard Cards */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total Products */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Total Products
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {products.length}
                  </h2>

                </div>

                <div className="rounded-2xl bg-blue-100 p-4">

                  <Boxes
                    size={28}
                    className="text-blue-600"
                  />

                </div>

              </div>

            </div>

            {/* Average Rating */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Average Rating
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {products.length
                      ? (
                          products.reduce(
                            (sum, item) =>
                              sum + item.average_rating,
                            0
                          ) / products.length
                        ).toFixed(1)
                      : "0.0"}
                  </h2>

                </div>

                <div className="rounded-2xl bg-yellow-100 p-4">

                  <Star
                    size={28}
                    fill="currentColor"
                    className="text-yellow-500"
                  />

                </div>

              </div>

            </div>

            {/* Search Result */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Search Results
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {filteredProducts.length}
                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">

                  <Search
                    size={28}
                    className="text-green-600"
                  />

                </div>

              </div>

            </div>

            {/* Highest Rating */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    Highest Rating
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {products.length
                      ? Math.max(
                          ...products.map(
                            (p) => p.average_rating
                          )
                        ).toFixed(1)
                      : "0.0"}
                  </h2>

                </div>

                <div className="rounded-2xl bg-purple-100 p-4">

                  <Package
                    size={28}
                    className="text-purple-600"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Search Toolbar */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-900">
                  Products
                </h2>

                <p className="text-sm text-slate-500">
                  Search and manage your products.
                </p>

              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">

                <div className="relative w-full md:w-80">

                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    py-3
                    pl-11
                    pr-4
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-100
                    "
                  />

                </div>

                {search && (

                  <button
                    onClick={() => setSearch("")}
                    className="
                    rounded-xl
                    border
                    border-slate-200
                    px-5
                    py-3
                    font-medium
                    text-slate-600
                    transition
                    hover:bg-slate-100
                    "
                  >
                    Clear
                  </button>

                )}

              </div>

            </div>

          </div>


      {/* Product Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-[750px] w-full">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Description
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Rating
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
              {loading ? (
              <tr>
                <td colSpan={4} className="py-16">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2
                      size={36}
                      className="animate-spin text-blue-600"
                    />

                    <p className="text-slate-500">
                      Loading products...
                    </p>
                  </div>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-16">
                  <div className="flex flex-col items-center justify-center">

                    <div className="mb-5 rounded-full bg-slate-100 p-5">
                      <Package
                        size={42}
                        className="text-slate-400"
                      />
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800">
                      No Products Found
                    </h3>

                    <p className="mt-2 text-slate-500">
                      Try another search or create a new product.
                    </p>

                    <Link
                      href="/admin/products/new"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      <Plus size={18} />
                      Add Product
                    </Link>

                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b transition-all duration-300 hover:bg-slate-50"
                >
                  {/* Product */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={
                          product.image_url.startsWith("http")
                            ? product.image_url
                            : `http://127.0.0.1:8000${product.image_url}`
                        }
                        alt={product.title}
                        className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                      />

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          {product.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Product #{product.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Description */}

                  <td className="max-w-sm px-6 py-5">

                    <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                      {product.description}
                    </p>

                  </td>

                  {/* Rating */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <Star
                        size={18}
                        fill="currentColor"
                        className="text-yellow-500"
                      />

                      <span className="font-semibold text-slate-700">
                        {Number(product.average_rating).toFixed(1)}
                      </span>

                    </div>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-3">

                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-xl bg-blue-50 p-3 text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-100"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-xl bg-red-50 p-3 text-red-600 transition-all duration-300 hover:scale-105 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}