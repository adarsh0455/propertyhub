"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react"; // NextAuth ka signin provider method
import { useRouter } from "next/navigation"; // Redirection control node ke liye

export default function LoginPage() {
  // Form input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Validation tracking states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NextJS Router Instance
  const router = useRouter();

  // Core Form Validation & NextAuth Execution Framework
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous errors instantly
    setEmailError("");
    setPasswordError("");
    
    let hasError = false;

    // 1. Email Address Validation Check
    if (!email.trim()) {
      setEmailError("Email address is strictly required.");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address structure.");
      hasError = true;
    }

    // 2. Strict Password Policy Validation Check
    if (!password) {
      setPasswordError("Authentication password cannot be empty.");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      hasError = true;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one capital letter (A-Z).");
      hasError = true;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one small letter (a-z).");
      hasError = true;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must include at least one numerical digit (0-9).");
      hasError = true;
    } else if (!/[@$!%*#?&]/.test(password)) {
      setPasswordError("Password must include at least one special character (e.g., @, $, !, %, *, #, ?, &).");
      hasError = true;
    }

    // If any client-side error exists, block execution immediately
    if (hasError) {
      return;
    }

    // 🚀 START: Real NextAuth Integration Execution Pipeline
    setIsSubmitting(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false, // Page reload hone se rokne ke liye taaki custom UI control ho ske
        email: email,
        password: password,
      });

      if (result?.error) {
        // Agar credentials API Router (`route.ts`) me mock check se match nhi hue
        setPasswordError("Invalid credentials identity or cryptographic mismatch.");
        setIsSubmitting(false);
      } else {
        // Successful dynamic login loop sync
        alert("Login Successful! Syncing verified session token...");
        
        // User ko automatic homepage ya asset route par shift karna
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Auth Pipeline Error:", err);
      setPasswordError("Internal Server Sync Error. Please retry.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      
      {/* Navbar Top Fixed Buffer Spacer */}
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />

      {/* Main Form Center Layout Matrix */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/70 shadow-[0_20px_50px_rgba(15,23,42,0.04)] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[550px]">
          
          {/* Left Block: The Interactive Form Section */}
          <div className="p-8 sm:p-12 flex flex-col justify-center text-left space-y-6 w-full">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">
                Sign in to manage your shortlists, chat with verified owners, and unlock premium insights.
              </p>
            </div>

            <form className="space-y-4 w-full" onSubmit={handleLoginSubmit} noValidate>
              
              {/* Email Input Field */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{ border: emailError ? '2px solid #ef4444' : '1px solid #e2e8f0' }}
                  className="w-full px-4 py-3.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white transition-all duration-200"
                />
                {emailError && (
                  <span style={{ color: '#ef4444' }} className="text-[11px] font-bold tracking-wide mt-1 block">
                    ⚠ {emailError}
                  </span>
                )}
              </div>

              {/* Password Input Field */}
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Password</label>
                  <a href="#" className="text-[10px] uppercase tracking-widest font-black text-blue-500 hover:text-blue-600">Forgot?</a>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ border: passwordError ? '2px solid #ef4444' : '1px solid #e2e8f0' }}
                  className="w-full px-4 py-3.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white transition-all duration-200"
                />
                {passwordError && (
                  <span style={{ color: '#ef4444' }} className="text-[11px] font-bold tracking-wide mt-1 block">
                    ⚠ {passwordError}
                  </span>
                )}
              </div>

              {/* Form Action Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 transform active:scale-[0.99] mt-2 cursor-pointer flex items-center justify-center"
              >
                {isSubmitting ? "Verifying Token Node..." : "Sign In to Account"}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs font-semibold text-slate-400">
                Don't have a marketplace account?{" "}
                <Link href="/register" className="text-blue-500 hover:text-blue-600 font-bold">
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Right Block */}
          <div className="hidden md:block relative bg-slate-900 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80" 
              alt="Luxury Interior Showcase"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-10 left-10 right-10 text-left space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Verified Platform</span>
              <h3 className="text-xl font-extrabold text-white tracking-tight">Your premium secure bridge to verified luxury properties in India.</h3>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}