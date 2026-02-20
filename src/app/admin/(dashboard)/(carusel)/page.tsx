"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import imgbbImageUpload from "@/lib/imgbbImageUpload";
import styles from "./carusel.module.css";

type CaruselItem = {
  _id: string;
  image: string;
  title?: string;
  description?: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
};

type CaruselFormState = {
  image: string;
  title: string;
  description: string;
  link: string;
};

const initialForm: CaruselFormState = {
  image: "",
  title: "",
  description: "",
  link: "",
};

export default function CaruselPage() {
  const [items, setItems] = useState<CaruselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CaruselFormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/carusel", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load carousel items.");
      }

      const payload = await response.json();
      setItems(payload.data || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load carousel items.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchItems();
  }, []);

  const handleChange = (key: keyof CaruselFormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setForm(initialForm);
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (file: File | null) => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrl = imageFile
        ? await imgbbImageUpload(imageFile)
        : form.image;

      if (!imageUrl) {
        throw new Error("Please upload an image or provide an image URL.");
      }

      const response = await fetch(
        editingId ? `/api/admin/carusel/${editingId}` : "/api/admin/carusel",
        {
          method: editingId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            image: imageUrl,
          }),
        },
      );

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || "Failed to save carousel item.");
      }

      await fetchItems();
      resetForm();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save carousel item.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: CaruselItem) => {
    setEditingId(item._id);
    setForm({
      image: item.image || "",
      title: item.title || "",
      description: item.description || "",
      link: item.link || "",
    });
    setImageFile(null);
    setImagePreview(item.image || null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this carousel item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/carusel/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message || "Failed to delete carousel item.");
      }

      await fetchItems();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete carousel item.";
      setError(message);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Carousel Manager</h1>
          <p className="text-sm text-base-content/60">
            Add and manage hero slides shown on the homepage.
          </p>
        </div>
        <button className="btn btn-outline" onClick={resetForm}>
          New slide
        </button>
      </div>

      {error ? (
        <div className="mb-6 rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className={`rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6 ${styles["input-form"]}`}
        >
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit slide" : "Create new slide"}
          </h2>

          <div className="mt-4 space-y-4">
            <label className="form-control">
              <span className="label-text text-sm">Upload image</span>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(event) =>
                  handleImageChange(event.target.files?.[0] || null)
                }
              />
              <span className="mt-2 text-xs text-base-content/60">
                Or paste an image URL below if you prefer.
              </span>
            </label>

            <label className="form-control">
              <span className="label-text text-sm">Image URL</span>
              <input
                className="input input-bordered w-full"
                placeholder="https://..."
                value={form.image}
                onChange={(event) => handleChange("image", event.target.value)}
              />
            </label>

            {imagePreview ? (
              <div className="rounded-xl border border-base-300 bg-base-200/40 p-3">
                <p className="text-xs text-base-content/60">Preview</p>
                <div className="relative mt-2 h-40 w-full overflow-hidden rounded-lg">
                  <Image
                    src={imagePreview}
                    alt="Carousel preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : null}

            <label className="form-control">
              <span className="label-text text-sm">Title</span>
              <input
                className="input input-bordered w-full"
                placeholder="New collection"
                value={form.title}
                onChange={(event) => handleChange("title", event.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="label-text text-sm">Description</span>
              <textarea
                className="textarea textarea-bordered min-h-28 w-full"
                placeholder="Short hero message"
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
              ></textarea>
            </label>

            <label className="form-control">
              <span className="label-text text-sm">Button link</span>
              <input
                className="input input-bordered w-full"
                placeholder="/shop/frocks"
                value={form.link}
                onChange={(event) => handleChange("link", event.target.value)}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : editingId
                  ? "Update slide"
                  : "Add slide"}
            </button>
            {editingId ? (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={resetForm}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Current slides</h2>
            <span className="text-sm text-base-content/60">
              {items.length} total
            </span>
          </div>

          {loading ? (
            <p className="text-sm text-base-content/60">Loading slides...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-base-content/60">No slides added yet.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item._id}
                  className="flex flex-col gap-3 rounded-xl border border-base-300 p-3 sm:flex-row"
                >
                  <figure className="relative h-32 w-full overflow-hidden rounded-lg sm:h-28 sm:w-40">
                    <Image
                      src={item.image}
                      alt={item.title || "Carousel image"}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </figure>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold">
                      {item.title || "Untitled slide"}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-base-content/70">
                      {item.description || "No description provided."}
                    </p>
                    {item.link ? (
                      <p className="mt-2 text-xs text-base-content/60">
                        Link: {item.link}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-row gap-2 sm:flex-col">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-ghost text-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
