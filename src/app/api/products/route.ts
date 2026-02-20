import { connectDB } from "@/lib/connectDB";
import { Product } from "@/Schema/Products.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const badge = searchParams.get("badge");
  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit");
  await connectDB();
  const query: {
    category?: string;
    badge?: string;
    featured?: boolean;
    isFeatured?: boolean;
  } = {};
  if (category) {
    query.category = category.trim();
  }
  if (badge) {
    query.badge = badge.trim();
  }
  if (featured === "true") {
    query.isFeatured = true;
  }
  try {
    let productsQuery = Product.find(query).sort({ createdAt: -1 });
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }
    const products = await productsQuery.lean();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("GET /api/products failed", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      { status: 500 },
    );
  }
}
