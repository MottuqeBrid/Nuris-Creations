"use client";

import { ProductItem } from "@/lib/MyInterface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomeProducts({
  text,
  badge,
  Featured = false,
}: {
  text?: string;
  badge?: string;
  Featured?: boolean;
}) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCategoryRoute = (category: string) => {
    const normalized = category.toLowerCase();

    if (normalized === "frock") return "frocks";
    if (normalized === "blouse") return "blouses";
    if (normalized === "nima") return "nimas";
    if (normalized === "other") return "others";

    return normalized;
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();

      if (badge) {
        params.set("badge", badge);
      }

      if (Featured) {
        params.set("featured", "true");
      }

      params.set("limit", "6");

      const queryString = params.toString();
      const response = await fetch(
        `/api/products${queryString ? `?${queryString}` : ""}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load products.");
      }

      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError("No products were returned.");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Unable to load products right now.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badge, Featured]);

  const sectionTitle = text || "Products";

  return (
    <section
      className={`w-full px-4 py-6 sm:px-6 rounded-2xl sm:py-8 lg:px-8 ${products.length > 0 ? "bg-base-100" : "hidden"}`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">
          <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
            {sectionTitle}
          </h2>
          {/* {!loading && !error ? (
            <p className="text-sm text-base-content/70 sm:text-base">
              {products.length} products
            </p>
          ) : null} */}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 w-full border border-base-300 shadow-sm"
              >
                <figure className="relative overflow-hidden">
                  <Skeleton className="aspect-4/5 w-full" />
                </figure>

                <div className="card-body gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <Skeleton width="80%" height={24} />
                    </div>
                    <Skeleton width={60} height={20} borderRadius={4} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={100} height={20} />
                  </div>

                  <Skeleton count={2} />

                  <div className="flex flex-wrap gap-1">
                    <Skeleton width={50} height={20} borderRadius={4} />
                    <Skeleton width={50} height={20} borderRadius={4} />
                    <Skeleton width={50} height={20} borderRadius={4} />
                  </div>

                  <div className="card-actions justify-end">
                    <Skeleton width={70} height={32} borderRadius={4} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="rounded-xl border border-error/30 bg-error/10 p-3 text-sm text-error sm:text-base">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className="text-sm text-base-content/70 sm:text-base">
            No products available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product._id}
                className="card bg-base-100 w-full border border-base-300 shadow-sm"
              >
                <figure className="relative overflow-hidden">
                  <Link
                    href={`/shop/${getCategoryRoute(product.category)}/${product._id}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={500}
                      loading="lazy"
                      className="aspect-4/5 object-cover w-full transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  {product.badge && (
                    <span className="absolute right-2 top-2 rounded-lg bg-primary px-2 py-1 text-xs text-white">
                      {product.badge}
                    </span>
                  )}
                </figure>

                <div className="card-body gap-2">
                  <div className="flex justify-between items-center">
                    <h3 className="card-title text-base">{product.name}</h3>
                    <span className="badge badge-outline">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <p className="font-semibold">
                      {formatPrice(product.price)}
                    </p>
                    <span
                      className={
                        product.stock > 0 ? "text-success" : "text-error"
                      }
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>

                  <p className="text-sm text-base-content/70">
                    {product.description.length > 100
                      ? product.description.slice(0, 100) + "..."
                      : product.description}
                  </p>

                  {product.tags?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={`${product._id}-${tag}`}
                          className="rounded-md bg-base-200 px-2 py-1 text-[10px] text-base-content/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="card-actions justify-end">
                    <Link
                      href={`/shop/${getCategoryRoute(product.category)}/${product._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
