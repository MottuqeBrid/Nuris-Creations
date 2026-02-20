"use client";

import { ProductItem } from "@/lib/MyInterface";
import { getProdectIdFromLocalStorage } from "@/lib/ShoppingCart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface CartItemWithProduct extends ProductItem {
  cartQuantity: number;
}

export default function ShoppingCartModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    const fetchCartProducts = async () => {
      setLoading(true);
      try {
        const cartItemIds = getProdectIdFromLocalStorage();
        const productIds = Object.keys(cartItemIds);

        if (productIds.length === 0) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        const responses = await Promise.all(
          productIds.map((id) => fetch(`/api/products/${id}`)),
        );

        const products: CartItemWithProduct[] = [];
        for (let i = 0; i < responses.length; i++) {
          const data = await responses[i].json();
          if (data.success) {
            products.push({
              ...data.data,
              cartQuantity: cartItemIds[productIds[i]],
            });
          }
        }

        setCartItems(products);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isModalOpen) {
      fetchCartProducts();
    }
  }, [isModalOpen]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId
          ? { ...item, cartQuantity: Math.max(1, newQuantity) }
          : item,
      ),
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0,
  );

  return (
    <div
      className={`modal ${isModalOpen ? "modal-open" : ""}`}
      role="dialog"
      aria-hidden={!isModalOpen}
    >
      <div className="modal-box max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Shopping Cart</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="divider my-2"></div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-base-content/70">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item._id}
                className="flex gap-4 rounded-lg border border-base-300 p-3"
              >
                <figure className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-base-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </figure>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-base-content/60">
                        {item.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-bold">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() =>
                          updateQuantity(item._id, item.cartQuantity - 1)
                        }
                      >
                        <FaMinus />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.cartQuantity}
                      </span>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() =>
                          updateQuantity(item._id, item.cartQuantity + 1)
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end text-sm font-medium">
                    Subtotal: {formatPrice(item.price * item.cartQuantity)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="divider my-4"></div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Shipping:</span>
            <span className="text-base-content/60">Calculated at checkout</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2 text-lg font-bold">
            <span>Total:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <div className="modal-action gap-2">
          <button
            className="btn btn-ghost flex-1"
            onClick={() => setIsModalOpen(false)}
          >
            Continue Shopping
          </button>
          <Link
            href="/checkout"
            className={`btn btn-primary flex-1 ${cartItems.length === 0 ? "btn-disabled" : ""}`}
            // disabled={(cartItems.length === 0)}
          >
            Checkout
          </Link>
        </div>
      </div>

      <form
        method="dialog"
        className="modal-backdrop"
        onClick={() => setIsModalOpen(false)}
      >
        <button></button>
      </form>
    </div>
  );
}
