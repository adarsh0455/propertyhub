"use server";

// 🔥 NextAuth ke functional system ko bypass karne ke liye import nahi kiya ja sakta, direct authorization triggers chahiye hote hain
export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Email and password fields are strictly required." };
    }

    // NextAuth Client-side form handler ya server layer handlers par trigger logic pass hoti hai.
    // Hum direct string return karenge taaki aapke UI component ke andar is data se NextAuth ka 'signIn' method hit ho sake.
    return { 
      success: true, 
      message: "Form verified locally. Forwarding payload execution parameters to NextAuth pipeline...",
      payload: {
        email: email.toLowerCase().trim(),
        password: password
      }
    };

  } catch (error: any) {
    console.error("LOGIN_PIPELINE_ERROR:", error);
    return { success: false, error: error.message || "Internal Server Authentication Error" };
  }
}