"use client";

import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaFemale,
  FaHome,
  FaInfoCircle,
  FaLayerGroup,
  FaShoppingBag,
  FaShoppingBasket,
  FaTshirt,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import ShoppingCartModal from "../ShoppingCart/ShoppingCartModal";

export default function HomeNavbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const shopMenuRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!shopMenuRef.current) return;

      if (!shopMenuRef.current.contains(event.target as Node)) {
        shopMenuRef.current.open = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mainLinks = [
    { name: "Home", link: "/", icon: FaHome },
    { name: "About", link: "/about", icon: FaInfoCircle },
    { name: "Contact", link: "/contact", icon: FaEnvelope },
    { name: "Admin", link: "/admin", icon: FaUserShield },
  ];

  const shopLinks = [
    { name: "Frocks", link: "/shop/frocks", icon: FaFemale },
    { name: "Nimas", link: "/shop/nimas", icon: FaTshirt },
    { name: "Blouses", link: "/shop/blouses", icon: FaShoppingBag },
    { name: "Others", link: "/shop/others", icon: FaLayerGroup },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-secondary border-b border-[(--border-color)] shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          {/* Mobile Menu Button */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Mobile Dropdown Menu */}
            <ul className="menu menu-sm dropdown-content bg-base-100/80 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-[(--border-color)]">
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-2 ${
                    isActive("/")
                      ? "active font-semibold"
                      : "hover:text-primary"
                  }`}
                >
                  <FaHome className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <details>
                  <summary className="flex items-center gap-2 hover:text-primary">
                    <FaShoppingBag className="w-4 h-4" />
                    Shop
                  </summary>
                  <ul className="p-2">
                    {shopLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.link}
                            className={`flex items-center gap-2 ${
                              isActive(item.link)
                                ? "active font-semibold"
                                : "hover:text-primary"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </li>
              {mainLinks.slice(1).map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.link}
                      className={`flex items-center gap-2 ${
                        isActive(link.link)
                          ? "active font-semibold"
                          : "hover:text-primary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link
                href="/"
                className={`flex items-center gap-2 ${
                  isActive("/") ? "active font-semibold" : "hover:text-primary"
                }`}
              >
                <FaHome className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li>
              <details ref={shopMenuRef}>
                <summary className="flex items-center gap-2 hover:text-primary">
                  <FaShoppingBag className="w-5 h-5" />
                  Shop
                </summary>
                <ul className="p-2 bg-base-100/90 w-52 z-1 shadow-lg hover:bg-base-100 hover:shadow-lg border border-[(--border-color)] rounded-box">
                  {shopLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.link}
                          className={`flex items-center gap-2 ${
                            isActive(item.link)
                              ? "active font-semibold"
                              : "hover:text-primary"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
            {mainLinks.slice(1).map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <Link
                    href={link.link}
                    className={`flex items-center gap-2 ${
                      isActive(link.link)
                        ? "active font-semibold"
                        : "hover:text-primary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeToggle />
          <Link href="/register" className="btn btn-accent btn-sm">
            Register / Login
          </Link>
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <FaShoppingBasket className="w-8 h-8" />
          </button>
          <ShoppingCartModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
    </nav>
  );
}
