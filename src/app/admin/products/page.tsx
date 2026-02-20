"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import imgbbImageUpload from "@/lib/imgbbImageUpload";
import { generateSKU } from "@/lib/generateSKU";
import Skeleton from "react-loading-skeleton";
import { FaEdit, FaTrash } from "react-icons/fa";

type ProductItem = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  images: string[];
  badge: "Best Seller" | "New" | "Limited" | "Sale" | null;
  stock: number;
  sku: string | null;
  tags: [string] | null;
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
    currency: "BDT",
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
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null,
  );

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
    if (coverPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }
    galleryPreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });

    setIsModalOpen(false);
    setSubmitError(null);
    setForm(initialForm);
    setCoverImageFile(null);
    setCoverPreview(null);
    setGalleryImageFiles([]);
    setGalleryPreviews([]);
    setSelectedProduct(null);
  };

  const handleCoverImageChange = (file: File | null) => {
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverImageFile(file);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleGalleryImagesChange = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const selectedFiles = Array.from(files);

    const remainingSlots = Math.max(8 - galleryImageFiles.length, 0);

    if (remainingSlots === 0) {
      Swal.fire({
        title: "Limit Reached",
        text: "You can upload a maximum of 8 additional images.",
        icon: "info",
      });
      return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    if (selectedFiles.length > remainingSlots) {
      Swal.fire({
        title: "Some images skipped",
        text: "Only first images were added due to the 8-image limit.",
        icon: "warning",
      });
    }

    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
    setGalleryImageFiles((prev) => [...prev, ...filesToAdd]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setGalleryPreviews((prevPreviews) => {
      const previewToRemove = prevPreviews[indexToRemove];
      if (previewToRemove?.startsWith("blob:")) {
        URL.revokeObjectURL(previewToRemove);

        const blobIndex = prevPreviews
          .slice(0, indexToRemove)
          .filter((preview) => preview.startsWith("blob:")).length;

        setGalleryImageFiles((prevFiles) =>
          prevFiles.filter((_, index) => index !== blobIndex),
        );
      }

      return prevPreviews.filter((_, index) => index !== indexToRemove);
    });
  };

  const clearGalleryImages = () => {
    galleryPreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });
    setGalleryImageFiles([]);
    setGalleryPreviews([]);
  };

  const openCreateModal = () => {
    setSelectedProduct(null);
    setForm({
      ...initialForm,
      sku: generateSKU(), // Pre-populate with generated SKU
    });
    setCoverImageFile(null);
    setCoverPreview(null);
    setGalleryImageFiles([]);
    setGalleryPreviews([]);
    setSubmitError(null);
    setIsModalOpen(true);
  };

  const handleAddProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const isEditMode = Boolean(selectedProduct);

    if (!isEditMode && !coverImageFile) {
      const message = "Please select a cover image.";
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
      setSubmitError(message);
      setIsSubmitting(false);
      return;
    }

    let coverImageUrl = selectedProduct?.image || "";
    let galleryImageUrls = selectedProduct
      ? galleryPreviews.filter((preview) => !preview.startsWith("blob:"))
      : [];

    try {
      if (coverImageFile) {
        coverImageUrl = await imgbbImageUpload(coverImageFile);
      }

      if (galleryImageFiles.length > 0) {
        const uploadedGalleryImages = await Promise.all(
          galleryImageFiles.map((file) => imgbbImageUpload(file)),
        );
        galleryImageUrls = [...galleryImageUrls, ...uploadedGalleryImages];
      }

      // Auto-generate SKU for new products if not provided
      const productSKU = selectedProduct
        ? form.sku || null // Keep existing or null for edits
        : form.sku.trim() || generateSKU(); // Use provided or generate for new

      const body = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        compareAtPrice:
          form.compareAtPrice.trim() === ""
            ? null
            : Number(form.compareAtPrice),
        image: coverImageUrl,
        images: galleryImageUrls,
        stock: Number(form.stock),
        badge: form.badge || null,
        sku: productSKU,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        isFeatured: form.isFeatured,
        isActive: form.isActive,
      };

      const endpoint = selectedProduct
        ? `/api/admin/products/${selectedProduct._id}`
        : "/api/admin/products";

      const method = selectedProduct ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        Swal.fire({
          title: "Error",
          text: payload?.message || "Failed to create product.",
          icon: "error",
        });
        throw new Error(payload?.message || "Failed to create product.");
      }

      Swal.fire({
        title: "Success",
        text: selectedProduct
          ? "Product updated successfully."
          : "Product created successfully.",
        icon: "success",
      });

      closeModal();
      await fetchProducts(isEditMode ? page : 1);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create product.";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirm = await Swal.fire({
      title: "Delete product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to delete product.");
      }

      await Swal.fire({
        title: "Deleted",
        text: "Product deleted successfully.",
        icon: "success",
      });

      const nextPage = products.length === 1 && page > 1 ? page - 1 : page;
      await fetchProducts(nextPage);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete product.";
      await Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  const handleUpdateProduct = (product: ProductItem) => {
    console.log(product);
    setSelectedProduct(product);
    setSubmitError(null);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      category: product.category,
      price: String(product.price),
      compareAtPrice:
        product.compareAtPrice === null ? "" : String(product.compareAtPrice),
      stock: String(product.stock),
      badge: product.badge || "",
      sku: product.sku || "",
      tags: product.tags?.join(", ") || "",
      isFeatured: product.isFeatured,
      isActive: product.isActive,
    });
    setCoverImageFile(null);
    setCoverPreview(product.image);
    setGalleryImageFiles([]);
    setGalleryPreviews(product.images || []);
    setIsModalOpen(true);
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
          onClick={openCreateModal}
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
              className="rounded-xl overflow-hidden border border-(--border-color) bg-(--bg-secondary) p-4"
            >
              <Skeleton height={176} className="mb-4 rounded-md" />
              <Skeleton height={18} width="40%" className="mb-2" />
              <Skeleton height={22} width="75%" className="mb-2" />
              <Skeleton height={16} count={2} className="mb-2" />
              <Skeleton height={20} width="35%" />
            </div>
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
              <div className="space-y-3 p-4 h-full flex-1 border">
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
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => handleUpdateProduct(product)}
                    className="btn btn-outline btn-sm gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="btn btn-outline btn-sm gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
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
              <h2 className="text-xl font-semibold">
                {selectedProduct ? "Update Product" : "Add Product"}
              </h2>
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
                {/* {console.log(form)} */}
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
                  <span className="label-text mb-1">
                    Cover Image {selectedProduct ? "" : "*"}
                  </span>
                  <input
                    required={!selectedProduct}
                    type="file"
                    accept="image/*"
                    className="input input-bordered w-full"
                    onChange={(event) =>
                      handleCoverImageChange(
                        event.currentTarget.files?.[0] || null,
                      )
                    }
                  />
                </label>

                {coverPreview ? (
                  <div className="sm:col-span-2 rounded-lg border border-(--border-color) p-3">
                    <p className="text-sm font-medium mb-2">Cover Preview</p>
                    <div className="relative h-44 w-full overflow-hidden rounded-md bg-base-200">
                      <Image
                        src={coverPreview}
                        alt="Cover preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : null}

                <label className="form-control w-full sm:col-span-2">
                  <span className="label-text mb-1">Additional Images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(event) => {
                      handleGalleryImagesChange(event.currentTarget.files);
                      event.currentTarget.value = "";
                    }}
                  />
                  <span className="label-text-alt mt-1 text-(--text-secondary)">
                    You can select multiple at once or add one-by-one (max 8).
                  </span>
                </label>

                {galleryPreviews.length > 0 ? (
                  <div className="sm:col-span-2 rounded-lg border border-(--border-color) p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">
                        Gallery Preview ({galleryPreviews.length}/8)
                      </p>
                      <button
                        type="button"
                        className="btn btn-xs btn-ghost"
                        onClick={clearGalleryImages}
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {galleryPreviews.map((preview, index) => (
                        <div
                          key={`${preview}-${index}`}
                          className="relative h-28 overflow-hidden rounded-md bg-base-200"
                        >
                          <button
                            type="button"
                            className="btn btn-xs btn-circle absolute top-1 right-1 z-10"
                            onClick={() => removeGalleryImage(index)}
                            aria-label={`Remove image ${index + 1}`}
                          >
                            ✕
                          </button>
                          <Image
                            src={preview}
                            alt={`Gallery preview ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

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
                  {isSubmitting
                    ? "Saving..."
                    : selectedProduct
                      ? "Update Product"
                      : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
