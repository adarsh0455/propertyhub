"use server";

import { client } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProperty(formData: FormData, activeUserId: string) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const bedsStr = formData.get("beds") as string;
    const bathsStr = formData.get("baths") as string;
    const sqftStr = formData.get("sqft") as string;

    if (!title || !description || !priceStr || !location || !category || !activeUserId) {
      return { success: false, error: "All fundamental fields are strictly required." };
    }

    const price = parseFloat(priceStr);
    const beds = parseInt(bedsStr) || 0;
    const baths = parseInt(bathsStr) || 0;
    const sqft = parseInt(sqftStr) || 0;

    const db = client.db();
    const result = await db.collection("Property").insertOne({
      title,
      description,
      price,
      location,
      category,
      beds,
      baths,
      sqft,
      userId: activeUserId,
      images: [],
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/");
    return { 
      success: true, 
      message: "Property listed on PropertyHub successfully!", 
      propertyId: result.insertedId.toString()
    };

  } catch (error: any) {
    console.error("PROPERTY_CREATION_PIPELINE_ERROR:", error);
    return { success: false, error: error.message || "Failed to create property profile." };
  }
}