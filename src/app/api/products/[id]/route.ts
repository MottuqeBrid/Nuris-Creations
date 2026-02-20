import { connectDB } from "@/lib/connectDB";
import { Product } from "@/Schema/Products.model";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const products = await Product.findById(id).lean();
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
