"use client";

import { useState } from "react";

export default function AddPropertyPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    beds: 0,
    baths: 0,
    area: "",
    type: "Apartment",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // API Route integration wiring (Is route ko hum iske baad banayenge)
    console.log("Submitting Architecture Blueprint Data Model: ", formData);
    
    // Temporary client simulation success alert
    setTimeout(() => {
      alert("Property uploaded successfully into verification pipeline!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center">
      <div className="w-full h-20 md:h-24 bg-[#090D16] shrink-0" />
      
      <div className="w-full max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm text-left space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">List New Asset Portfolio</h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">Fill the verified parameters to showcase your estate inside the catalog matrix.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Property Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Skyline Imperial Penthouse"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Price (in INR)</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 15000000"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Property Segment</label>
                <select 
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Apartment">Apartment / Flat</option>
                  <option value="Luxury Villa">Luxury Villa</option>
                  <option value="Verified Plot">Verified Land / Plot</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Location Area</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Hazratganj Main Corridor, Lucknow"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Bedrooms</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Bathrooms</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Area (e.g. 1850 sqft)</label>
                <input 
                  type="text" 
                  placeholder="1,850 sqft"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe premium features, modular interior setups, and transit access specifications..."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 shadow-md disabled:bg-slate-400"
            >
              {loading ? "Injecting Node Pipeline..." : "Publish Commercial Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}