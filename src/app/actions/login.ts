"use server";

import { client } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Email and password fields are strictly required." };
    }

    const db = client.db();
    const user = await db.collection("User").findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user || !user.password) {
      return { success: false, error: "No user found with this email registered." };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return { success: false, error: "Invalid account password credentials." };
    }

    return { 
      success: true, 
      message: "Authentication successful! Credentials verified.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }
    };

  } catch (error: any) {
    console.error("LOGIN_PIPELINE_ERROR:", error);
    return { success: false, error: error.message || "Internal Server Authentication Error" };
  }
}