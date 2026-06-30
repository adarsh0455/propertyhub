import { NextResponse } from "next/server";
import { db, withDbRetry } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing Parameters" }, { status: 400 });
    }

    const updatedProperty = await withDbRetry(() =>
      db.collection("Property").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status } },
        { returnDocument: "after" }
      )
    );

    if (!updatedProperty) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProperty });
  } catch (error: any) {
    console.error("Admin API error stack:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}