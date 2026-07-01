/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Save,
  Loader2,
  ImagePlus,
  Package,
} from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://review-project-backend.onrender.com/api/products/${id}`
        );

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setTitle(data.title);
        setDescription(data.description);

        if (data.image_url) {
          setPreview(
            data.image_url.startsWith("http")
              ? data.image_url
              : `http://127.0.0.1:8000${data.image_url}`
          );
        }
      } catch {
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(
        `https://review-project-backend.onrender.com/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Product updated successfully!");

      router.push("/admin/products");
    } catch {
      toast.error("Failed to update product.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={42}
            className="animate-spin text-blue-600"
          />

          <p className="text-slate-500">
            Loading product...
          </p>
        </div>
      </div>
    );
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
            Edit Product
          </h1>

          <p className="mt-2 text-slate-500">
            Update product information and images.
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
                Product ID
              </p>

              <h2 className="text-lg font-semibold">
                #{id}
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
        {/* Content Grid */}

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
                placeholder="Enter product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
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
                placeholder="Write product description..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
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
                    Click here to select an image
                    <br />
                    PNG, JPG or JPEG
                  </p>

                </>

              )}

              <input
                id="image"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {

                  if (!e.target.files?.length) return;

                  const file = e.target.files[0];

                  setImage(file);

                  setPreview(
                    URL.createObjectURL(file)
                  );

                  toast.success("Image selected");
                }}
              />

            </label>

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
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-blue-700
                hover:shadow-lg
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
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Product
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}