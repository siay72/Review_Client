/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Loader2,
  ImagePlus,
  Package,
  Save,
} from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Product title is required.");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }

    if (!image) {
      toast.error("Please select a product image.");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const res = await fetch(
        "https://review-project-backend.onrender.com/api/products/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();

        throw new Error(
          error.detail || "Failed to create product."
        );
      }

      toast.success("Product created successfully!");

      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <button
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center gap-2 text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Add New Product
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new product for your platform.
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-blue-100 p-3">

              <Package
                className="text-blue-600"
                size={26}
              />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Status
              </p>

              <h2 className="text-lg font-semibold text-green-600">
                New Product
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Form Card */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
                  {/* Form Content */}

          <div className="grid gap-8 lg:grid-cols-2">

            {/* Left Side */}

            <div className="space-y-6">

              {/* Product Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Title
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-slate-50
                    px-4
                    py-3
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

              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  rows={8}
                  required
                  placeholder="Write a detailed description..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-300
                    bg-slate-50
                    px-4
                    py-3
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

            </div>

            {/* Right Side */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Image
              </label>

              <label
                htmlFor="image"
                className="
                  flex
                  min-h-[320px]
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-slate-300
                  bg-slate-50
                  transition-all
                  duration-300
                  hover:border-blue-500
                  hover:bg-blue-50
                "
              >

                {preview ? (

                  <img
                    src={preview}
                    alt="Preview"
                    className="
                      h-72
                      w-full
                      rounded-2xl
                      object-cover
                    "
                  />

                ) : (

                  <>

                    <div className="rounded-full bg-blue-100 p-5">

                      <ImagePlus
                        size={36}
                        className="text-blue-600"
                      />

                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-800">
                      Upload Product Image
                    </h3>

                    <p className="mt-2 text-center text-sm text-slate-500">
                      Click to upload or drag an image here
                      <br />
                      PNG, JPG or JPEG
                    </p>

                  </>

                )}

                <input
                  id="image"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {

                    if (!e.target.files?.length) return;

                    const file = e.target.files[0];

                    // Optional validation
                    if (!file.type.startsWith("image/")) {
                      toast.error("Please select a valid image.");
                      return;
                    }

                    if (file.size > 2 * 1024 * 1024) {
                      toast.error("Image must be smaller than 2MB.");
                      return;
                    }

                    setImage(file);

                    setPreview(URL.createObjectURL(file));

                    toast.success("Image selected successfully.");
                  }}
                />

              </label>

              {image && (
                <p className="mt-3 text-center text-sm text-slate-500">
                  {image.name}
                </p>
              )}

            </div>

          </div>
                    {/* Action Buttons */}

          <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => router.back()}
              disabled={saving}
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-slate-300
                bg-white
                px-6
                py-3
                font-medium
                text-slate-700
                transition-all
                duration-300
                hover:bg-slate-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                px-6
                py-3
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Creating Product...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Product
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}