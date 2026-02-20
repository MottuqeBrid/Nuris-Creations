"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CaruselType } from "@/Schema/Carusel.model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Carousel() {
  const [slides, setSlides] = useState<CaruselType[]>([]);
  const [loading, setLoading] = useState(true);
  // const slides = [
  //   {
  //     image: "/logo.png",
  //     title: "Custom Mugs",
  //     description: "Personalized ceramic mugs for your loved ones",
  //     link: "/shop/mugs",
  //   },
  //   {
  //     image: "/logo.png",
  //     title: "Premium T-Shirts",
  //     description: "High-quality custom printed t-shirts",
  //     link: "/shop/tshirts",
  //   },
  //   {
  //     image: "/logo.png",
  //     title: "Phone Cases",
  //     description: "Unique and durable phone protection",
  //     link: "/shop/phone-cases",
  //   },
  // ];
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/admin/carusel", {
          cache: "no-store",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to load carousel slides.");
        }
        const payload = await response.json();
        setSlides(payload.data || []);
      } catch (err) {
        console.error("Error fetching carousel slides:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div
          className="rounded-lg overflow-hidden shadow-lg w-full mx-auto"
          style={{
            height: "400px",
            aspectRatio: "16/9",
          }}
        >
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="rounded-lg overflow-hidden shadow-lg w-full mx-auto"
        style={{
          height: "70dvh",
          aspectRatio: "16/9",
        }}
      >
        <ReactCarousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={3500}
          transitionTime={600}
          swipeable
          emulateTouch
          preventMovementUntilSwipeScrollTolerance
          showArrows={true}
          showIndicators={true}
          dynamicHeight={false}
          className="carousel-container"
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-full">
              {/* Image */}
              <Image
                width={400}
                height={400}
                src={slide.image}
                alt={slide.title}
                placeholder="blur"
                blurDataURL={slide.image}
                sizes="100dvw"
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 lg:p-8">
                <div className="text-center space-y-3 sm:space-y-4 w-full max-w-2xl">
                  {/* Title */}
                  <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold leading-tight">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-gray-100">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  {slide.link && (
                    <div className="pt-2 sm:pt-3">
                      <Link
                        href={slide.link}
                        className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        Shop Now
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ReactCarousel>
      </div>

      {/* Custom styles */}
      <style>{`
        .carousel-container {
          height: 100%;
        }

        .carousel-container .carousel {
          height: 100%;
        }

        .carousel-container .slider-wrapper {
          height: 100%;
        }

        .carousel-container .slider {
          height: 100%;
        }

        .carousel-container .slide {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Custom arrow styling */
        .carousel-container .control-arrow {
          background: rgba(160, 32, 240, 0.5);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: all 0.3s ease;
          top: 50%;
          transform: translateY(-50%);
        }

        .carousel-container .control-arrow:hover {
          background: rgba(160, 32, 240, 0.8);
          opacity: 1;
        }

        .carousel-container .control-arrow.control-prev {
          left: 10px;
        }

        .carousel-container .control-arrow.control-next {
          right: 10px;
        }

        /* Custom indicator styling */
        .carousel-container .carousel-status {
          display: none;
        }

        .carousel-container .slider-decorator-list {
          bottom: 20px;
        }

        .carousel-container .dot {
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid transparent;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .carousel-container .dot.active {
          background: var(--color-primary);
          width: 32px;
          border-radius: 6px;
        }

        .carousel-container .dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}
