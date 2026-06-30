"use server";

import { client, withDbRetry } from "@/lib/db";

export async function fetchAllProperties() {
  try {
    const db = client.db();
    const properties = await withDbRetry(() =>
      db.collection("Property").find({}).sort({ createdAt: -1 }).toArray()
    );

    return { success: true, data: properties };
  } catch (error: any) {
    console.error("PROPERTY_FETCH_PIPELINE_ERROR:", error);
    return { success: false, error: "Failed to extract properties from database." };
  }
}