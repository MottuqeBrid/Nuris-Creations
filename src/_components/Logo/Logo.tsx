import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3">
      {/* Logo Container */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0">
        <Image
          src="/logo.png"
          alt="Logo"
          width={48}
          height={48}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Logo Text */}
      <div className="hidden sm:flex flex-col">
        <span
          className="text-sm sm:text-base md:text-lg font-bold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Nuris
        </span>
        <span
          className="text-xs sm:text-sm md:text-base bg-clip-text text-transparent font-semibold"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Creations
        </span>
      </div>
    </Link>
  );
}
