"use client";

import Link from "next/link";
import { FaLayerGroup, FaTshirt } from "react-icons/fa";
import { GiLargeDress, GiTankTop } from "react-icons/gi";

export default function HomeSubmenu() {
  const links = [
    { name: "Frocks", href: "/shop/frocks", icon: GiLargeDress },
    { name: "Nimas", href: "/shop/nimas", icon: FaTshirt },
    { name: "Blouses", href: "/shop/blouses", icon: GiTankTop },
    { name: "Others", href: "/shop/others", icon: FaLayerGroup },
  ];

  return (
    <div className="w-full my-8 px-4 sm:px-6 lg:px-8">
      <div className="gap-3 sm:gap-4 mb-6 w-full flex justify-start sm:justify-between items-center flex-wrap">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="
                flex items-center gap-2 px-4 sm:px-6 py-3 
                rounded-lg border border-[(--border-color)] 
                bg-transparent text-text-primary
                font-semibold text-sm sm:text-base
                transition-all duration-300
                hover:border-primary hover:bg-primary hover:text-color-primary
                hover:shadow-md transform hover:-translate-y-1 active:translate-y-0
              "
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
