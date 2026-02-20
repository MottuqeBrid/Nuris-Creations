"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSubNavbar() {
  const navItems = [
    {
      name: "Carusel",
      link: "/admin",
    },
    {
      name: "Orders",
      link: "/admin/orders",
    },
    {
      name: "Users",
      link: "/admin/users",
    },
  ];
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full border-b border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        {navItems.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive(item.link)
                ? "bg-primary text-primary-content"
                : "bg-base-200 text-base-content hover:bg-base-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
