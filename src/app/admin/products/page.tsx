"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

type ProductItem = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  badge: "Best Seller" | "New" | "Limited" | "Sale" | null;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
};

type ProductFormState = {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: string;
  compareAtPrice: string;
  image: string;
  stock: string;
  badge: string;
  sku: string;
  tags: string;
  isFeatured: boolean;
  isActive: boolean;
};

const PAGE_SIZE = 9;

const initialForm: ProductFormState = {
  name: "",
  slug: "",
  description: "",
  category: "Frock",
  price: "",
  compareAtPrice: "",
  image: "",
  stock: "0",
  badge: "",
  sku: "",
  tags: "",
  isFeatured: false,
  isActive: true,
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function Page() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProductFormState>(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasProducts = useMemo(() => products.length > 0, [products.length]);

  const fetchProducts = async (nextPage: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/products?page=${nextPage}&limit=${PAGE_SIZE}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Could not load products");
      }

      const payload = await response.json();
      setProducts(payload.data || []);
      setPage(payload.pagination?.page || 1);
      setTotalPages(payload.pagination?.totalPages || 1);
      setTotalItems(payload.pagination?.totalItems || 0);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load products.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts(1);
  }, []);

  const handleChange = (
    key: keyof ProductFormState,
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitError(null);
    setForm(initialForm);
  };

  const handleAddProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const body = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      category: form.category,
      price: Number(form.price),
      compareAtPrice:
        form.compareAtPrice.trim() === "" ? null : Number(form.compareAtPrice),
      image: form.image,
      stock: Number(form.stock),
      badge: form.badge || null,
      sku: form.sku || null,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isFeatured: form.isFeatured,
      isActive: form.isActive,
    };

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || "Failed to create product.");
      }

      closeModal();
      await fetchProducts(1);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create product.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>
          <p className="text-sm sm:text-base text-(--text-secondary)">
            Manage your catalog, add new products, and browse paginated results.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </button>
      </div>

      <div className="rounded-xl border border-(--border-color) bg-(--bg-secondary) p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-(--text-secondary)">
            Total products: <span className="font-semibold">{totalItems}</span>
          </p>
          <p className="text-sm text-(--text-secondary)">
            Page {page} of {totalPages}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 rounded-xl bg-base-300 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : !hasProducts ? (
        <div className="rounded-xl border border-(--border-color) bg-(--bg-secondary) p-8 text-center">
          <p className="text-(--text-secondary)">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product._id}
              className="rounded-xl overflow-hidden border border-(--border-color) bg-(--bg-secondary) shadow-sm"
            >
              <div className="h-44 w-full overflow-hidden bg-base-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-outline">
                    {product.category}
                  </span>
                  {product.badge ? (
                    <span className="badge badge-secondary">
                      {product.badge}
                    </span>
                  ) : null}
                  {product.isFeatured ? (
                    <span className="badge badge-accent">Featured</span>
                  ) : null}
                  <span
                    className={`badge ${
                      product.isActive ? "badge-success" : "badge-ghost"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <h2 className="text-lg font-semibold line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-sm text-(--text-secondary) line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-base text-(--text-primary)">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-(--text-secondary)">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="btn btn-outline w-full sm:w-auto"
          onClick={() => void fetchProducts(page - 1)}
          disabled={page <= 1 || loading}
        >
          Previous
        </button>
        <p className="text-center text-sm text-(--text-secondary)">
          Showing page {page} of {totalPages}
        </p>
        <button
          type="button"
          className="btn btn-outline w-full sm:w-auto"
          onClick={() => void fetchProducts(page + 1)}
          disabled={page >= totalPages || loading}
        >
          Next
        </button>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 bg-black/50 px-4 py-6 sm:px-6 overflow-y-auto">
          <div className="mx-auto w-full max-w-2xl rounded-xl bg-(--bg-primary) border border-(--border-color) shadow-xl">
            <div className="flex items-center justify-between border-b border-(--border-color) p-4">
              <h2 className="text-xl font-semibold">Add Product</h2>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <form className="p-4 sm:p-5 space-y-4" onSubmit={handleAddProduct}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <span className="label-text mb-1">Name *</span>
                  <input
                    required
                    className="input input-bordered w-full"
                    value={form.name}
                    onChange={(event) =>
                      handleChange("name", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1">Slug (optional)</span>
                  <input
                    className="input input-bordered w-full"
                    value={form.slug}
                    onChange={(event) =>
                      handleChange("slug", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full sm:col-span-2">
                  <span className="label-text mb-1">Description *</span>
                  <textarea
                    required
                    className="textarea textarea-bordered min-h-24 w-full"
                    value={form.description}
                    onChange={(event) =>
                      handleChange("description", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1">Category *</span>
                  <select
                    className="select select-bordered w-full"
                    value={form.category}
                    onChange={(event) =>
                      handleChange("category", event.currentTarget.value)
                    }
                  >
                    <option value="Frock">Frock</option>
                  </select>
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1">Badge</span>
                  <select
                    className="select select-bordered w-full"
                    value={form.badge}
                    onChange={(event) =>
                      handleChange("badge", event.currentTarget.value)
                    }
                  >
                    <option value="">None</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="New">New</option>
                    <option value="Limited">Limited</option>
                    <option value="Sale">Sale</option>
                  </select>
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1">Price *</span>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    className="input input-bordered w-full"
                    value={form.price}
                    onChange={(event) =>
                      handleChange("price", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1">Compare Price</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="input input-bordered w-full"
                    value={form.compareAtPrice}
                    onChange={(event) =>
                      handleChange("compareAtPrice", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1">Stock *</span>
                  <input
                    required
                    type="number"
                    min="0"
                    className="input input-bordered w-full"
                    value={form.stock}
                    onChange={(event) =>
                      handleChange("stock", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1">SKU</span>
                  <input
                    className="input input-bordered w-full"
                    value={form.sku}
                    onChange={(event) =>
                      handleChange("sku", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full sm:col-span-2">
                  <span className="label-text mb-1">Image URL *</span>
                  <input
                    required
                    className="input input-bordered w-full"
                    value={form.image}
                    onChange={(event) =>
                      handleChange("image", event.currentTarget.value)
                    }
                  />
                </label>

                <label className="form-control w-full sm:col-span-2">
                  <span className="label-text mb-1">
                    Tags (comma separated)
                  </span>
                  <input
                    className="input input-bordered w-full"
                    value={form.tags}
                    onChange={(event) =>
                      handleChange("tags", event.currentTarget.value)
                    }
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={form.isFeatured}
                    onChange={(event) =>
                      handleChange("isFeatured", event.currentTarget.checked)
                    }
                  />
                  <span>Featured product</span>
                </label>
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={form.isActive}
                    onChange={(event) =>
                      handleChange("isActive", event.currentTarget.checked)
                    }
                  />
                  <span>Active</span>
                </label>
              </div>

              {submitError ? (
                <div className="alert alert-error">
                  <span>{submitError}</span>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
