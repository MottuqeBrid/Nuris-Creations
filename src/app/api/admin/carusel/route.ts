import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Carusel } from "@/Schema/Carusel.model";

export async function GET() {
  try {
    await connectDB();

    const items = await Carusel.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ data: items, success: true });
  } catch (error) {
    console.error("GET /api/admin/carusel failed", error);
    return NextResponse.json(
      { message: "Failed to fetch carousel items.", success: false },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const image = String(body.image || "").trim();
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const link = String(body.link || "").trim();

    if (!image) {
      return NextResponse.json(
        { message: "image is required.", success: false },
        { status: 400 },
      );
    }

    const item = await Carusel.create({
      image,
      title: title || undefined,
      description: description || undefined,
      link: link || undefined,
    });

    return NextResponse.json({ data: item, success: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/carusel failed", error);
    return NextResponse.json(
      { message: "Failed to create carousel item.", success: false },
      { status: 500 },
    );
  }
}
