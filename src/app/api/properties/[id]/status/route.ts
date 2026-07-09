import { NextResponse } from "next/server";
import { client } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const db = client.db();
    const updatedProperty = await db.collection("Property").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return NextResponse.json({ success: true, data: updatedProperty });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Status update failed" },
      { status: 500 }
    );
  }
}