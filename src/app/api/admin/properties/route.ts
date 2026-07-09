import { NextResponse } from "next/server";
import { client, withDbRetry } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface SessionUser {
  id?: string;
  role?: string;
}

interface Session {
  user?: SessionUser;
}

export async function GET() {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const properties = await withDbRetry(() =>
      client.db("propertyhub").collection("Property").find({}).sort({ createdAt: -1 }).toArray()
    );

    const formatted = properties.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      category: p.category,
      price: p.price,
      location: p.location,
      status: p.status || "PENDING",
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: unknown) {
    console.error("Admin API GET error:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing Parameters" }, { status: 400 });
    }

    const result = await withDbRetry(() =>
      client.db("propertyhub").collection("Property").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status } },
        { returnDocument: "after" }
      )
    );

    if (!result?.value) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.value });
  } catch (error: unknown) {
    console.error("Admin API UPDATE error:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
