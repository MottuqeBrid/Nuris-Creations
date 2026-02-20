import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/Schema/Products.model";
import { connectDB } from "@/lib/connectDB";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || 9), 1),
      50,
    );

    const skip = (page - 1) * limit;

    const [products, totalItems] = await Promise.all([
      Product.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments({}),
    ]);

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
      success: true,
    });
  } catch (error) {
    console.error("GET /api/admin/products failed", error);
    return NextResponse.json(
      { message: "Failed to fetch products.", success: false },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const name = String(body.name || "").trim();
    const description = String(body.description || "").trim();
    const category = String(body.category || "").trim();
    const image = String(body.image || "").trim();
    const about = String(body.about || "").trim();
    const price = Number(body.price);
    const stock = Number(body.stock);

    if (!name || !description || !category || !image) {
      return NextResponse.json(
        {
          message: "name, description, category and image are required.",
          success: false,
        },
        { status: 400 },
      );
    }

    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json(
        {
          message: "price must be a valid non-negative number.",
          success: false,
        },
        { status: 400 },
      );
    }

    if (Number.isNaN(stock) || stock < 0) {
      return NextResponse.json(
        {
          message: "stock must be a valid non-negative number.",
          success: false,
        },
        { status: 400 },
      );
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      compareAtPrice:
        body.compareAtPrice === "" || body.compareAtPrice === null
          ? null
          : Number(body.compareAtPrice),
      image,
      images: Array.isArray(body.images)
        ? (body.images as unknown[])
            .map((value: unknown) => String(value).trim())
            .filter(Boolean)
        : [],
      badge: body.badge ? String(body.badge) : null,
      sku: body.sku ? String(body.sku).trim() : null,
      stock,
      isFeatured: Boolean(body.isFeatured),
      isActive: body.isActive !== false,
      tags: Array.isArray(body.tags)
        ? (body.tags as unknown[])
            .map((tag: unknown) => String(tag).trim())
            .filter(Boolean)
        : [],
      about: about || null,
    });

    return NextResponse.json({ data: product, success: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/products failed", error);
    return NextResponse.json(
      { message: "Failed to create product.", success: false },
      { status: 500 },
    );
  }
}
