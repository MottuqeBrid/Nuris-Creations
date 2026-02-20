import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Carusel } from "@/Schema/Carusel.model";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const item = await Carusel.findById(id).lean();

    if (!item) {
      return NextResponse.json(
        { message: "Carousel item not found.", success: false },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: item, success: true });
  } catch (error) {
    console.error("GET /api/admin/carusel/:id failed", error);
    return NextResponse.json(
      { message: "Failed to fetch carousel item.", success: false },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();
    const updates: Record<string, string> = {};

    if (body.image !== undefined) {
      updates.image = String(body.image || "").trim();
    }
    if (body.title !== undefined) {
      updates.title = String(body.title || "").trim();
    }
    if (body.description !== undefined) {
      updates.description = String(body.description || "").trim();
    }
    if (body.link !== undefined) {
      updates.link = String(body.link || "").trim();
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: "No updates provided.", success: false },
        { status: 400 },
      );
    }

    const item = await Carusel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!item) {
      return NextResponse.json(
        { message: "Carousel item not found.", success: false },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: item, success: true });
  } catch (error) {
    console.error("PATCH /api/admin/carusel/:id failed", error);
    return NextResponse.json(
      { message: "Failed to update carousel item.", success: false },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const item = await Carusel.findByIdAndDelete(id);

    if (!item) {
      return NextResponse.json(
        { message: "Carousel item not found.", success: false },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/carusel/:id failed", error);
    return NextResponse.json(
      { message: "Failed to delete carousel item.", success: false },
      { status: 500 },
    );
  }
}
