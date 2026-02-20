"use client";

import { ProductItem } from "@/lib/MyInterface";
import { saveProdectIdToLocalStorage } from "@/lib/ShoppingCart";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";

export default function SingleProduct({ id }: { id: string }) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value);

  //   const formatDate = (value: string) =>
  //     new Date(value).toLocaleDateString("en-BD", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     });
  const addToCart = (productId: string) => {
    saveProdectIdToLocalStorage(productId, 1);
    Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: "Product added to cart successfully",
    });
  };
  const fetchFrock = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      } else {
        setError("Product not found.");
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFrock();
  }, [fetchFrock]);

  if (loading) {
    return (
      <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 rounded-2xl border border-base-300 bg-base-100 p-4 sm:gap-8 sm:p-6 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="space-y-3">
            <Skeleton className="aspect-4/5 rounded-xl" />
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Badges */}
            <div className="flex gap-2">
              <Skeleton width={80} height={24} borderRadius={999} />
              <Skeleton width={100} height={24} borderRadius={999} />
            </div>

            {/* Title */}
            <div>
              <Skeleton height={32} width="75%" />
              <Skeleton height={32} width="50%" className="mt-2" />
            </div>

            {/* Description */}
            <div>
              <Skeleton count={3} />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <Skeleton width={120} height={40} />
              <Skeleton width={80} height={24} />
              <Skeleton width={100} height={24} />
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-base-300 p-3 sm:gap-4 sm:p-4">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <Skeleton width={80} height={16} className="mb-2" />
                  <Skeleton width={100} height={20} />
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} width={60} height={28} borderRadius={6} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-error/30 bg-error/10 p-4 sm:p-5">
          <p className="text-sm text-error sm:text-base">{error}</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm text-base-content/70 sm:text-base">
            No product data available.
          </p>
        </div>
      </section>
    );
  }

  const gallery = [
    product.image,
    ...product.images.filter((img) => img !== product.image),
  ];
  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;
  const savePercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100,
      )
    : 0;

  return (
    <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 rounded-2xl border border-base-300 bg-base-100 p-4 sm:gap-8 sm:p-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-base-300 bg-base-200/40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {gallery.length > 1 ? (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {gallery.slice(0, 5).map((img, index) => (
                <div
                  key={`${img}-${index}`}
                  className="relative aspect-square overflow-hidden rounded-lg border border-base-300 bg-base-200/40"
                >
                  <button
                    type="button"
                    className="group relative h-full w-full"
                    onClick={() => setActiveImage(img)}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-wrap items-center gap-2">
            {product.badge ? (
              <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-base-content/80">
                {product.badge}
              </span>
            ) : null}
            {product.isFeatured ? (
              <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-base-content/80">
                Featured
              </span>
            ) : null}
            {/* <span
              className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                product.isActive
                  ? "bg-success/20 text-success"
                  : "bg-error/20 text-error"
              }`}
            >
              {product.isActive ? "Active" : "Inactive"}
            </span> */}
          </div>

          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
            {product.name}
          </h1>

          <p className="text-sm leading-relaxed text-base-content/80 sm:text-base">
            {product.description}
          </p>

          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <p className="text-2xl font-bold sm:text-3xl">
              {formatPrice(product.price)}
            </p>
            {hasDiscount ? (
              <>
                <span className="text-sm line-through text-base-content/55 sm:text-base">
                  {formatPrice(product.compareAtPrice!)}
                </span>
                <span className="text-xl sm:text-2xl font-medium text-success">
                  Save {savePercent}%
                </span>
              </>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl border border-base-300 p-3 sm:gap-4 sm:p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">
                Category
              </p>
              <p className="text-sm font-medium sm:text-base">
                {product.category}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">
                Stock
              </p>
              <p
                className={`text-sm font-medium sm:text-base ${
                  product.stock > 0 ? "text-success" : "text-error"
                }`}
              >
                {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
              </p>
            </div>
            {product.sku && (
              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/60">
                  SKU
                </p>
                <p className="text-sm font-medium sm:text-base">{product.sku}</p>
              </div>
            )}
            {/* <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">
                Created
              </p>
              <p className="text-sm font-medium sm:text-base">
                {formatDate(product.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/60">
                Updated
              </p>
              <p className="text-sm font-medium sm:text-base">
                {formatDate(product.updatedAt)}
              </p>
            </div> */}
          </div>
          <div className="">
            <button
              onClick={() => addToCart(product._id)}
              className="btn btn-primary w-full flex items-center justify-center gap-2 flex-1"
            >
              <FaShoppingCart className="mr-2" />
              <span>Add to Cart</span>
            </button>
          </div>
          {product.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={`${product._id}-${tag}`}
                  className="rounded-md bg-base-200 px-2.5 py-1 text-xs text-base-content/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {product?.about && (
        <div className="">
          <h3 className="mt-8 text-xl font-semibold">About</h3>
          <p className="mt-2 text-base-content/80 text-justify sm:text-xl">
            {product.about}
          </p>
        </div>
      )}

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-base-100 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-3 top-3 z-10"
              onClick={() => setActiveImage(null)}
              aria-label="Close image"
            >
              ✕
            </button>
            <div className="relative aspect-4/5 w-full bg-base-200">
              <Image
                src={activeImage}
                alt="Selected gallery image"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
