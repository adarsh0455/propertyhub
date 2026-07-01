import { NextResponse } from "next/server";
import { client, withDbRetry } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 🛡️ BSON Crash Guard: Validation node check before initializing native query structure
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Property ID string specification mapping layer." },
        { status: 400 }
      );
    }

    // Explicitly targeting correct cluster database namespace
    const db = client.db("propertyhub");
    
    const property = await withDbRetry(() =>
      db.collection("Property").findOne({
        _id: new ObjectId(id),
      })
    );

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property matrix entry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error("DYNAMIC_ROUTE_FETCH_CRASH_LOG:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch property asset due to internal runtime sync error." },
      { status: 500 }
    );
  }
}