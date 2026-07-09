"use server";

import { client, withDbRetry } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string || "USER";

    if (!name || !email || !password) {
      return { success: false, error: "All input data fields are strictly required structure blocks." };
    }

    const db = client.db();
    const existingUser = await withDbRetry(() =>
      db.collection("User").findOne({
        email: email.toLowerCase().trim(),
      })
    );

    if (existingUser) {
      return { success: false, error: "This email entity is already registered inside cloud nodes." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await withDbRetry(() =>
      db.collection("User").insertOne({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    return { success: true, message: "User registered successfully onto cluster cloud database network!" };

  } catch (error: unknown) {
    console.error("DATABASE_REGISTRATION_PIPELINE_ERROR:", error);
    return { success: false, error: "Internal Server Error in database connectivity matrix loops." };
  }
}