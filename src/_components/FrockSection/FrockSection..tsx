"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BsCupHot } from "react-icons/bs";
import { MdOutlinePhoneIphone, MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbShirt } from "react-icons/tb";

export default function FrockSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "Custom Ceramic Mug",
      category: "Mug",
      price: "$12.99",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeuwYuuHdj5S7D7v1zxVEphTgdJoZ6RNFnA&s",
      icon: BsCupHot,
      description: "Personalized ceramic mug perfect for daily use",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Premium Frock",
      category: "Frock",
      price: "$19.99",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeuwYuuHdj5S7D7v1zxVEphTgdJoZ6RNFnA&s",
      icon: TbShirt,
      description: "High-quality custom printed Frock",
      badge: "New",
    },
    {
      id: 3,
      name: "Protective Phone Case",
      category: "Phone Case",
      price: "$15.99",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeuwYuuHdj5S7D7v1zxVEphTgdJoZ6RNFnA&s",
      icon: MdOutlinePhoneIphone,
      description: "Durable phone case with custom design",
      badge: null,
    },
    {
      id: 4,
      name: "Artisan Mug Set",
      category: "Mug",
      price: "$24.99",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeuwYuuHdj5S7D7v1zxVEphTgdJoZ6RNFnA&s",
      icon: BsCupHot,
      description: "Set of 2 matching ceramic mugs",
      badge: "Limited",
    },
    {
      id: 5,
      name: "Graphic Frock",
      category: "Frock",
      price: "$22.99",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeuwYuuHdj5S7D7v1zxVEphTgdJoZ6RNFnA&s",
      icon: TbShirt,
      description: "Trendy graphic design Frock",
      badge: "Sale",
    },
    {
      id: 6,
      name: "Premium Phone Case",
      category: "Phone Case",
      price: "$18.99",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeuwYuuHdj5S7D7v1zxVEphTgdJoZ6RNFnA&s",
      icon: MdOutlinePhoneIphone,
      description: "Premium protective phone case",
      badge: null,
    },
  ];

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Section Header with animation */}
      <div className="mb-10 sm:mb-12 lg:mb-16 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transform transition-all duration-500">
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <div className="h-1 w-24 bg-linear-to-r from-primary to-secondary rounded-full mb-4"></div>
        <p className="text-base sm:text-lg text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
        {products.map((product, index) => {
          const IconComponent = product.icon;
          const isWishlisted = wishlist.includes(product.id);
          return (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group bg-base-100 border border-[(--border-color)] rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform grid grid-rows-12"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-linear-to-br from-tertiary to-secondary grid row-span-5">
                <Image
                  width={500}
                  height={500}
                  placeholder="blur"
                  blurDataURL="/logo.png"
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-all duration-700 ease-out"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Icon Badge */}
                <div
                  className="absolute top-3 right-3 p-2 sm:p-3 bg-linear-to-r from-primary to-secondary rounded-full text-white shadow-lg transform transition-all duration-300"
                  style={{
                    transform:
                      hoveredCard === product.id
                        ? "scale(1.1) rotate(12deg)"
                        : "scale(1) rotate(0deg)",
                  }}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-linear-to-r from-accent to-secondary text-white text-xs font-bold rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    {product.badge}
                  </div>
                )}

                {/* Heart Icon */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-3 left-3 p-2 sm:p-2.5 bg-white rounded-full hover:bg-linear-to-r from-primary to-secondary transition-all duration-300 shadow-md transform hover:scale-110 active:scale-95"
                >
                  {isWishlisted ? (
                    <AiFillHeart className="w-5 h-5 text-primary animate-pulse" />
                  ) : (
                    <AiOutlineHeart className="w-5 h-5 text-primary hover:text-secondary" />
                  )}
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-6 transform transition-all duration-300 flex flex-col justify-between row-span-7">
                {/* Category */}
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3 transition-all duration-300 group-hover:bg-primary/20">
                  {product.category}
                </span>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-4 line-clamp-2 transition-all duration-300">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-500 transform group-hover:scale-110 origin-left">
                    {product.price}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-2 sm:py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-md hover:shadow-xl group/btn">
                  <MdOutlineShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  <span className="transition-all duration-300">
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="flex justify-center pt-4 sm:pt-6 lg:pt-8">
        <Link
          href="/shop"
          className="px-8 sm:px-10 py-3 sm:py-4 bg-linear-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-center shadow-lg hover:shadow-2xl inline-block"
        >
          View All Products
        </Link>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
