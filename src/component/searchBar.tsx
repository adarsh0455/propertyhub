"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState("buy");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const location = (formData.get("location") as string)?.trim();
    const category = formData.get("category") as string;
    const priceRange = formData.get("priceRange") as string;

    if (location) params.set("location", location);
    if (category) params.set("category", category);
    if (priceRange) params.set("priceRange", priceRange);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-40 px-4">
      
      {/* 1. Filter Type Navigation Tab Grid Layout */}
      <div className="flex space-x-1.5 mb-2 ml-2">
        {["buy", "rent", "sell"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-t-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow-xs"
                : "bg-[#090D16]/40 text-slate-300 hover:text-white backdrop:blur-md border-t border-x border-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2. Main Glassmorphism Form Container Matrix */}
      <form className="w-full bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-slate-200/60" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center">
          
          {/* Option field 1: Search by text keywords */}
          <div className="flex flex-col space-y-1.5 text-left border-b md:border-b-0 md:border-r border-slate-200/80 pb-3 md:pb-0 md:pr-4">
            <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Where</label>
            <input
              type="text"
              name="location"
              placeholder="Enter city, locality..."
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Option field 2: Property Type Dropdown */}
          <div className="flex flex-col space-y-1.5 text-left border-b md:border-b-0 md:border-r border-slate-200/80 pb-3 md:pb-0 md:pr-4">
            <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Property Type</label>
            <select name="category" className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer appearance-none text-ellipsis">
              <option value="">All Categories</option>
              <option value="apartment">Apartment / Flat</option>
              <option value="villa">Luxury Villa</option>
              <option value="plot">Verified Plot</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </div>

          {/* Option field 3: Price Range Selector */}
          <div className="flex flex-col space-y-1.5 text-left pb-2 md:pb-0">
            <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Price Range</label>
            <select name="priceRange" className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer appearance-none text-ellipsis">
              <option value="">Any Budget</option>
              <option value="under-1">Below ₹1 Crore</option>
              <option value="1-3">₹1 Crore - ₹3 Crore</option>
              <option value="above-3">Above ₹3 Crore</option>
            </select>
          </div>

          {/* Core Action Submit Button Node */}
          <div className="w-full pt-1 md:pt-0">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl md:rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>Search</span>
            </button>
          </div>

        </div>
      </form>

    </div>
  );
}