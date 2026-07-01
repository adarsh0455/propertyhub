import { NextResponse } from "next/server";
import { client, withDbRetry } from "@/lib/db";

// 🔍 GET: Fetch all approved or admin properties
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    const db = client.db();
    const properties = await withDbRetry(() =>
      db
        .collection("Property")
        .find(isAdmin ? {} : { status: "APPROVED" })
        .sort({ createdAt: -1 })
        .toArray()
    );

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Data fetch karne mein dikkat aayi hai." },
      { status: 500 }
    );
  }
}

// 🚀 POST: Save new property with dynamic real seller ID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Frontend se 'area' aa raha hai, use hum yahan parse kar lete hain fallback ke saath
    const { title, description, price, location, category, beds, baths, sqft, area, images, amenities, userId } = body;

    // Strict validation gate (Koi bhi core field missing nahi honi chahiye)
    if (!title || !description || !price || !location || !category || !userId) {
      return NextResponse.json(
        { success: false, error: "Missing required core property fields (Title, Description, Price, Location, Category, or User ID)." },
        { status: 400 }
      );
    }

    const db = client.db();
    const newProperty = await withDbRetry(() =>
      db.collection("Property").insertOne({
        title,
        description,
        price: parseFloat(price),
        location,
        category,
        beds: parseInt(beds) || 0,
        baths: parseInt(baths) || 0,
        sqft: parseInt(sqft || area) || 0, // 🔥 FIX: frontend ka 'area' aur backend ka 'sqft' dono handle ho gaya
        amenities: amenities || [],
        images: images || [], // Real Cloudinary Links saved inside document matrix
        userId, // 🔥 DYNAMIC: Logged-in Real User ID mapping
        status: "PENDING", // Needs admin validation flag approval
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    return NextResponse.json({ 
      success: true, 
      message: "Property listing integrated successfully!",
      data: { ...body, _id: newProperty.insertedId } 
    });
  } catch (error) {
    console.error("PROPERTY_POST_ROUTE_CRASH:", error);
    return NextResponse.json(
      { success: false, error: "Property save nahi ho payi server sync issue ki wajah se." },
      { status: 500 }
    );
  }
}