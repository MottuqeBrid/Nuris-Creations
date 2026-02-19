"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import Logo from "@/_components/Logo/Logo";
import ThemeToggle from "@/_components/ThemeToggle/ThemeToggle";
import { FaProductHunt } from "react-icons/fa";

export default function AdminNavbar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: MdOutlineDashboard },
    { name: "Products", href: "/admin/products", icon: FaProductHunt },
    { name: "Home", href: "/", icon: AiOutlineHome },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-secondary border-b border-[(--border-color)] shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
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
            <ul className="menu menu-sm dropdown-content bg-base-100/80 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-[(--border-color)]">
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 ${
                        isActive(item.href)
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
          </div>

          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 ${
                      isActive(item.href)
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
        </div>

        <div className="navbar-end">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
