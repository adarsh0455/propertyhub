"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PostPropertiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "plot",
    price: "",
    location: "",
    area: "",
    beds: 0,
    baths: 0,
    description: "",
    amenities: [] as string[],
  });
  const availableAmenities = ["Swimming Pool", "Gym", "Parking", "Garden", "Security", "Elevator", "Power Backup", "WiFi"];

// 🛡️ Route Access Security: If user session is loading or not signed in
  if (status === "loading") {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-sm font-bold text-slate-500 animate-pulse">Verifying Security Session Node...</p>
      </div>
    );
  }

  // 🛡️ Role-based access - only OWNER/AGENT can post properties
  interface SessionUser {
    id?: string;
    role?: string;
  }
  const userRole = (session?.user as SessionUser)?.role;
  if (status === "unauthenticated" || !session?.user || (userRole !== "OWNER" && userRole !== "AGENT")) {
     return (
       <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
         <p className="text-sm font-black text-red-500">Access Denied: Only Property Owners and Agents can post listings.</p>
         <button onClick={() => router.push("/login")} className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md">
           Go To Login
         </button>
       </div>
     );
   }

  const handleCheckboxChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const onSymbolClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImageUrls: string[] = [];

      // 1. Cloudinary Multi-Image Upload Loop
      for (const file of selectedFiles) {
        const formDataCloud = new FormData();
        formDataCloud.append("file", file);
        formDataCloud.append("upload_preset", "property_preset");

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/du4fsn3m2/image/upload`,
          { method: "POST", body: formDataCloud }
        );

        if (cloudRes.ok) {
          const cloudData = await cloudRes.json();
          if (cloudData.secure_url) {
            uploadedImageUrls.push(cloudData.secure_url);
          }
        }
      }

      if (selectedFiles.length > 0 && uploadedImageUrls.length === 0) {
        alert("All image uploads failed.");
        setLoading(false);
        return;
      }

  const priceNum = formData.price === "" ? 0 : Number(formData.price);
  if (priceNum <= 0) {
    alert("Please enter a valid property price.");
    setLoading(false);
    return;
  }

      // 2. Dispatch Stream to Next.js API Node with Dynamic Session User ID
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          price: formData.price,
          location: formData.location,
          area: formData.area, 
          beds: formData.beds,
          baths: formData.baths,
          description: formData.description,
          amenities: formData.amenities,
          images: uploadedImageUrls, 
          userId: session.user.id, // 🔥 DYNAMIC ID: Extracted straight from active session token!
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`🎉 Property submitted successfully! Pending admin validation.`);
        setFormData({
          title: "",
          category: "plot",
          price: "",
          location: "",
          area: "",
          beds: 0,
          baths: 0,
          description: "",
          amenities: [],
        });
        setSelectedFiles([]);
      } else {
        alert(`Operational Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Network exception or server connection crash.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />

      <div className="w-full max-w-3xl mx-auto px-4 py-10 text-left space-y-8">
        <div className="border-b border-slate-200/60 pb-5 space-y-1.5">
          <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            Asset Submission Wizard
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Post New Property</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Logged in as Seller ID: <span className="text-blue-600 font-mono text-[11px]">{session.user.id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.01)] space-y-8">
          {/* Form details input grids */}
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Property Title / Asset Name</label>
              <input 
                type="text" required disabled={loading}
                placeholder="e.g., The Grande Orchard Luxury Mansion"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Property Category</label>
                <select 
                  disabled={loading}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="plot">Plot / Land</option>
                  <option value="house">House</option>
                  <option value="flat">Apartment / Flat</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Target Valuation (₹)</label>
                <input 
                  type="number" required disabled={loading} placeholder="e.g., 24000000"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Complete Location Node</label>
                <input 
                  type="text" required disabled={loading} placeholder="e.g., Hazratganj, Lucknow"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Total Covered Area (Sq. Ft.)</label>
                <input 
                  type="number" required disabled={loading} placeholder="e.g., 3500"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Total Bedrooms</label>
                <input 
                  type="number" disabled={loading} placeholder="e.g., 3" min="0"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  value={formData.beds || ""}
                  onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Total Bathrooms</label>
                <input 
                  type="number" disabled={loading} placeholder="e.g., 2" min="0"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                  value={formData.baths || ""}
                  onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 border-t border-slate-100 pt-6">
              <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Comprehensive Asset Description</label>
              <textarea 
                rows={4} required disabled={loading} placeholder="Elaborate details here..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* Media Galleries Component UI */}
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h3 className="text-xs uppercase tracking-wider font-black text-[#090D16]">2. Media Galleries</h3>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple disabled={loading} accept="image/png, image/jpeg" className="hidden" />
            <div className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 bg-slate-50/50">
              <button type="button" onClick={onSymbolClick} disabled={loading} className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl hover:border-blue-500 transition-all cursor-pointer disabled:opacity-50">
                📁
              </button>
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm font-black text-[#090D16]">Drag and drop high-resolution architecture imagery</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">PNG, JPG formats up to 10MB index</p>
              </div>
              {selectedFiles.length > 0 && (
                <div className="w-full max-w-md bg-blue-50/80 border border-blue-100 rounded-xl p-2.5 mt-2 text-center">
                  <p className="text-[11px] font-black text-blue-700 uppercase tracking-wider">{selectedFiles.length} Architecture Files Attached Ready</p>
                </div>
              )}
            </div>
          </div>

          {/* Amenities selection */}
          <div className="flex flex-col space-y-2.5 border-t border-slate-100 pt-6">
            <label className="text-[11px] uppercase tracking-wider font-black text-slate-500">Select Available Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableAmenities.map((amenity, idx) => (
                <label key={idx} className={`flex items-center space-x-2.5 p-3 border rounded-xl cursor-pointer transition-all ${formData.amenities.includes(amenity) ? "bg-blue-50/60 border-blue-200 text-blue-700" : "bg-slate-50/40 border-slate-200"}`}>
                  <input type="checkbox" disabled={loading} className="w-3.5 h-3.5 rounded text-blue-600" checked={formData.amenities.includes(amenity)} onChange={() => handleCheckboxChange(amenity)} />
                  <span className="text-xs font-bold">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button type="submit" disabled={loading} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all">
              {loading ? "Uploading & Publishing..." : "Publish Asset Node"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}