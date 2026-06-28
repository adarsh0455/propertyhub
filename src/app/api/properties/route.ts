import { NextResponse } from "next/server";
import { client } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";
    
    const db = client.db();
    const properties = await db
      .collection("Property")
      .find(isAdmin ? {} : { status: "APPROVED" })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Data fetch karne mein dikkat aayi hai." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, location, category, beds, baths, sqft, images, userId } = body;

    if (!title || !price || !location || !category || !userId) {
      return NextResponse.json(
        { success: false, error: "Zaroori fields missing hain." },
        { status: 400 }
      );
    }

    const db = client.db();
    const newProperty = await db.collection("Property").insertOne({
      title,
      description,
      price: parseFloat(price),
      location,
      category,
      beds: parseInt(beds) || 0,
      baths: parseInt(baths) || 0,
      sqft: parseInt(sqft) || 0,
      images: images || [],
      userId,
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, data: { ...body, _id: newProperty.insertedId } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Property save nahi ho payi." },
      { status: 500 }
    );
  }
}