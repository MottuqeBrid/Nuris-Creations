import { connectDB } from "@/lib/connectDB";
import { Product } from "@/Schema/Products.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  await connectDB();
  const query: { category?: string } = {};
  if (category) {
    query.category = category.trim();
  }
  try {
    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
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
