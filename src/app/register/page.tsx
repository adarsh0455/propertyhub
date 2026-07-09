"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/actions/register"; // 🚀 Backend server action handler link kiye

export default function RegisterPage() {
  // Core signup form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER"); // 💡 Updated to match schema standard (USER, OWNER, etc.)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation feedback tracking states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New backend status indicators
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Core Registration Validation Framework Logic
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error text monitors instantly
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setSubmitStatus(null);

    let hasValidationError = false;

    // 1. Full Name Verification Check
    if (!name.trim()) {
      setNameError("Full name is strictly required for verification.");
      hasValidationError = true;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters long.");
      hasValidationError = true;
    }

    // 2. Email Structure Verification Check
    if (!email.trim()) {
      setEmailError("Email address field cannot be left blank.");
      hasValidationError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid institutional or personal email.");
      hasValidationError = true;
    }

    // 3. Strict Password Policy Verification Check
    if (!password) {
      setPasswordError("Security password parameters cannot be empty.");
      hasValidationError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      hasValidationError = true;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one capital letter (A-Z).");
      hasValidationError = true;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one small letter (a-z).");
      hasValidationError = true;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must include at least one numerical digit (0-9).");
      hasValidationError = true;
    } else if (!/[@$!%*#?&]/.test(password)) {
      setPasswordError("Password must include at least one special character (e.g., @, $, !, %, *, #, ?, &).");
      hasValidationError = true;
    }

    // Block database pipeline sync if active errors are found
    if (hasValidationError) {
      return;
    }

    // Success State Transition
    setIsSubmitting(true);

    try {
      // 🚀 Pure native HTML FormData structure coordinate compile kar rahe hain actions ke liye
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      // Sending dynamic stream directly down onto Server Action Node
      const result = await registerUser(formData);

      if (result.success) {
        setSubmitStatus({ success: true, message: result.message || "Account created successfully!" });
        // Resetting state matrices upon live success handshake
        setName("");
        setEmail("");
        setPassword("");
        setRole("USER");
      } else {
        setSubmitStatus({ success: false, message: result.error || "Database registration failed." });
      }
    } catch {
      setSubmitStatus({ success: false, message: "An unexpected runtime matrix network loop error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      
      {/* Navbar Top Fixed Buffer Spacer - Content visibility safeguard */}
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />

      {/* Main Form Center Layout Matrix */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/70 shadow-[0_20px_50px_rgba(15,23,42,0.04)] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[580px]">
          
          {/* Left Block: Luxury Visual Banner Showcase */}
          <div className="hidden md:block relative bg-slate-900 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
              alt="Luxury Estate Showcase"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/50 via-transparent to-[#090D16] pointer-events-none" />
            <div className="absolute bottom-10 left-10 right-10 text-left space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Join Over 50K+ Users</span>
              <h3 className="text-xl font-extrabold text-white tracking-tight">Discover custom tailored investment opportunities before they strike the mass markets.</h3>
            </div>
          </div>

          {/* Right Block: The Interactive Form Section */}
          <div className="p-8 sm:p-12 flex flex-col justify-center text-left space-y-6 w-full">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Create Platform Account</h1>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold">
                Gain institutional-level access to verified listings, interactive charts, and direct owner nodes.
              </p>
            </div>

            {/* Live Database Response Status Display Node */}
            {submitStatus && (
              <div 
                className={`p-3 text-xs font-bold rounded-xl border ${
                  submitStatus.success 
                    ? "bg-green-50 border-green-200 text-green-700" 
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {submitStatus.success ? "✓" : "⚠"} {submitStatus.message}
              </div>
            )}

            <form className="space-y-4 w-full" onSubmit={handleRegisterSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name Node Input */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    style={{ border: nameError ? '2px solid #ef4444' : '1px solid #e2e8f0' }}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white transition-all duration-200"
                  />
                  {nameError && (
                    <span style={{ color: '#ef4444' }} className="text-[10px] font-bold tracking-wide mt-1 block">
                      ⚠ {nameError}
                    </span>
                  )}
                </div>

                {/* Account Type Option Selection Dropdown */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Account Type</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 cursor-pointer"
                  >
                    <option value="USER">Buyer / Tenant</option>
                    <option value="OWNER">Property Owner</option>
                    <option value="AGENT">Agent</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>

              {/* Email Input Node Field */}
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
                  <span style={{ color: '#ef4444' }} className="text-[10px] font-bold tracking-wide mt-1 block">
                    ⚠ {emailError}
                  </span>
                )}
              </div>

              {/* Password Configuration Input Node Field */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  style={{ border: passwordError ? '2px solid #ef4444' : '1px solid #e2e8f0' }}
                  className="w-full px-4 py-3.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white transition-all duration-200"
                />
                {passwordError && (
                  <span style={{ color: '#ef4444' }} className="text-[10px] font-bold tracking-wide mt-1 block">
                    ⚠ {passwordError}
                  </span>
                )}
              </div>

              {/* Form Submission Registration Trigger Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 transform active:scale-[0.99] mt-2 cursor-pointer flex items-center justify-center"
              >
                {isSubmitting ? "Processing Node Security..." : "Register Account"}
              </button>
            </form>

            <div className="text-center pt-1">
              <p className="text-xs font-semibold text-slate-400">
                Already have an active account?{" "}
                <Link href="/login" className="text-blue-500 hover:text-blue-600 font-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}