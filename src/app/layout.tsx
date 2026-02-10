import type { Metadata } from "next";
import {  Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700","800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Nuri’s Creations",
    template: "%s | Nuri’s Creations",
  },
  description: "Nuri’s Creations is a small business that specializes in creating unique and personalized gifts for all occasions. We offer a wide range of products, including custom mugs, t-shirts, phone cases, and more. Our mission is to provide our customers with high-quality, one-of-a-kind gifts that they can cherish for years to come.",
  keywords: [
    "Nuri’s Creations",
    "personalized gifts",
    "custom mugs",
    "custom t-shirts",
    "custom phone cases",
    "unique gifts",
    "high-quality gifts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
