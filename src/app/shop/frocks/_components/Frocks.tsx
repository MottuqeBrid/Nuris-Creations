"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Frock {
  _id: string;
  image: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  badge?: string | null;
  slug: string;
  description: string;
  category: string;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  images: string[];
  sku?: string | null;
  createdAt: string;
  updatedAt: string;
}

// {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 2,
//       maxlength: 120,
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 2000,
//     },
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//       enum: ["Frock"],
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     compareAtPrice: {
//       type: Number,
//       min: 0,
//       default: null,
//     },
//     image: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     images: {
//       type: [String],
//       default: [],
//       validate: {
//         validator: (value: string[]) => value.length <= 8,
//         message: "A product can have up to 8 images.",
//       },
//     },
//     badge: {
//       type: String,
//       enum: ["Best Seller", "New", "Limited", "Sale", null],
//       default: null,
//     },
//     sku: {
//       type: String,
//       trim: true,
//       uppercase: true,
//       unique: true,
//       sparse: true,
//       default: null,
//     },
//     stock: {
//       type: Number,
//       required: true,
//       min: 0,
//       default: 0,
//     },
//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     tags: {
//       type: [String],
//       default: [],
//     },
//   },

export default function Frocks() {
  const [frocks, setFrocks] = useState<Frock[]>([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value);

  const fetchFrocks = async () => {
    try {
      const response = await fetch("/api/products?category=Frock");
      const data = await response.json();
      if (data.success) {
        setFrocks(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch frocks:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFrocks();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-base-content/70 sm:text-base">
          Loading frocks...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">
          <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
            Frocks Collection
          </h2>
          <p className="text-sm text-base-content/70 sm:text-base">
            Total: {frocks.length}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {frocks.map((frock: Frock) => (
            <article
              key={frock._id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100"
            >
              <div className="hover-3d group cursor-pointer w-full">
                <figure className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    width={400}
                    height={400}
                    src={frock.image}
                    alt={frock.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>

                {/* 8 empty divs needed for the 3D effect */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              {/* Product details */}
              <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm font-medium sm:text-base">
                    {frock.name}
                  </p>
                  {frock.badge ? (
                    <span className="shrink-0 rounded-full bg-base-200 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-base-content/80 sm:text-xs">
                      {frock.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-wide text-base-content/60 sm:text-sm">
                    {frock.category}
                  </p>
                  <span
                    className={`text-xs font-medium sm:text-sm ${
                      frock.stock > 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {frock.stock > 0
                      ? `${frock.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="mt-1 flex items-end gap-2">
                  <p className="text-base font-semibold sm:text-lg">
                    {formatPrice(frock.price)}
                  </p>
                  {frock.compareAtPrice &&
                  frock.compareAtPrice > frock.price ? (
                    <>
                      <span className="text-xs line-through text-base-content/50 sm:text-sm">
                        {formatPrice(frock.compareAtPrice)}
                      </span>
                      <span className="text-xs font-medium text-success sm:text-sm">
                        Save{" "}
                        {Math.round(
                          ((frock.compareAtPrice - frock.price) /
                            frock.compareAtPrice) *
                            100,
                        )}
                        %
                      </span>
                    </>
                  ) : null}
                </div>

                <p className="line-clamp-2 text-xs text-base-content/70 sm:text-sm">
                  {frock.description}
                </p>

                {frock.tags?.length ? (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {frock.tags.slice(0, 3).map((tag) => (
                      <span
                        key={`${frock._id}-${tag}`}
                        className="rounded-md bg-base-200 px-2 py-1 text-[10px] text-base-content/70 sm:text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-auto flex items-center justify-between pt-1 text-[10px] text-base-content/55 sm:text-xs">
                  <span>SKU: {frock.sku || "N/A"}</span>
                  <span>{frock.isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!frocks.length ? (
          <p className="py-10 text-center text-sm text-base-content/70 sm:text-base">
            No frocks available right now.
          </p>
        ) : null}
      </div>
    </section>
  );
}
