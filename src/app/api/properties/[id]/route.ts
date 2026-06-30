import { NextResponse } from "next/server";
import { client, withDbRetry } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = client.db();
    const property = await withDbRetry(() =>
      db.collection("Property").findOne({
        _id: new ObjectId(id),
      })
    );

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch property." },
      { status: 500 }
    );
  }
}
