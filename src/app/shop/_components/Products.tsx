"use client";

import { saveProdectIdToLocalStorage } from "@/lib/ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbShoppingCart } from "react-icons/tb";
import Swal from "sweetalert2";
interface ProductItem {
  _id: string;
  image: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  badge?: string | null;
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

export default function Products({ page }: { page: string }) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      let url = "/api/products";
      if (page === "frocks") {
        url += `?category=Frock`;
      } else {
        url += `?category=${page}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const addToCart = (productId: string) => {
    saveProdectIdToLocalStorage(productId, 1);
    Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: "Product added to cart successfully",
    });
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value);

  if (loading) {
    return (
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-base-content/70 sm:text-base">
          Loading products...
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
            Total: {products.length}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {products.map((product: ProductItem) => (
            <article
              key={product._id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100"
            >
              <Link
                href={`/shop/${page.toLowerCase()}/${product._id}`}
                className="hover-3d group cursor-pointer w-full"
              >
                <figure className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    width={400}
                    height={400}
                    src={product.image}
                    alt={product.name}
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
              </Link>
              {/* Product details */}
              <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/shop/${page.toLowerCase()}/${product._id}`}
                    className="line-clamp-2 text-sm font-medium text-primary sm:text-xl"
                  >
                    {product.name}
                  </Link>
                  {product.badge ? (
                    <span className="shrink-0 rounded-full bg-base-200 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-base-content/80 sm:text-xs">
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-wide text-base-content/60 sm:text-sm">
                    {product.category}
                  </p>
                  <span
                    className={`text-xs font-medium sm:text-sm ${
                      product.stock > 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="mt-1 flex items-end gap-2">
                  <p className="text-base font-semibold sm:text-lg">
                    {formatPrice(product.price)}
                  </p>
                  {product.compareAtPrice &&
                  product.compareAtPrice > product.price ? (
                    <>
                      <span className="text-xs line-through text-base-content/50 sm:text-sm">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <span className="text-xl font-medium text-success sm:text-2xl">
                        Save{" "}
                        {Math.round(
                          ((product.compareAtPrice - product.price) /
                            product.compareAtPrice) *
                            100,
                        )}
                        %
                      </span>
                    </>
                  ) : null}
                </div>

                <p className="line-clamp-2 text-xs text-base-content/70 sm:text-sm">
                  {product.description}
                </p>

                {product.tags?.length ? (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={`${product._id}-${tag}`}
                        className="rounded-md bg-base-200 px-2 py-1 text-[10px] text-base-content/70 sm:text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-auto flex items-center justify-between pt-1 text-[10px] text-base-content/55 sm:text-xs">
                  <button
                    onClick={() => addToCart(product._id)}
                    className="btn btn-outline btn-xs w-full flex items-center gap-1 justify-center sm:btn-sm py-4"
                  >
                    <TbShoppingCart className="h-4 w-4" />
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!products.length ? (
          <p className="py-10 text-center text-sm text-base-content/70 sm:text-base">
            No {page.toLowerCase()} available right now.
          </p>
        ) : null}
      </div>
    </section>
  );
}
