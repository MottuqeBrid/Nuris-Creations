import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Product } from "@/Schema/Products.model";
import { connectDB } from "@/lib/connectDB";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product id." },
        { status: 400 },
      );
    }

    const body = await request.json();

    const payload = {
      name: String(body.name || "").trim(),
      description: String(body.description || "").trim(),
      about: String(body.about || "").trim() || null,
      category: String(body.category || "").trim(),
      price: Number(body.price),
      compareAtPrice:
        body.compareAtPrice === "" || body.compareAtPrice === null
          ? null
          : Number(body.compareAtPrice),
      image: String(body.image || "").trim(),
      images: Array.isArray(body.images)
        ? (body.images as unknown[])
            .map((value: unknown) => String(value).trim())
            .filter(Boolean)
        : [],
      badge: body.badge ? String(body.badge) : null,
      sku: body.sku ? String(body.sku).trim() : null,
      stock: Number(body.stock),
      isFeatured: Boolean(body.isFeatured),
      isActive: body.isActive !== false,
      tags: Array.isArray(body.tags)
        ? (body.tags as unknown[])
            .map((tag: unknown) => String(tag).trim())
            .filter(Boolean)
        : [],
    };

    if (
      !payload.name ||
      !payload.description ||
      !payload.category ||
      !payload.image
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "name, description, category and image are required.",
        },
        { status: 400 },
      );
    }

    if (Number.isNaN(payload.price) || payload.price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "price must be a valid non-negative number.",
        },
        { status: 400 },
      );
    }

    if (Number.isNaN(payload.stock) || payload.stock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "stock must be a valid non-negative number.",
        },
        { status: 400 },
      );
    }

    const updated = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/admin/products/[id] failed", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product id." },
        { status: 400 },
      );
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Product deleted." });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id] failed", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product." },
      { status: 500 },
    );
  }
}
