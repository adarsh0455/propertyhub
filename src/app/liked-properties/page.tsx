"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import PropertyCard from "@/component/propertycard";

interface PropertyDoc {
  _id?: string;
  images?: string[];
  price?: number | string;
  title?: string;
  location?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  category?: string;
}

function formatPrice(price: number | string | undefined): string {
  if (typeof price === "number") {
    return price >= 10000000
      ? `₹${(price / 10000000).toFixed(2)} Crore`
      : `₹${(price / 100000).toFixed(0)} Lakh`;
  }
  return String(price ?? "");
}

export default function LikedPropertiesPage() {
  const [likedProperties, setLikedProperties] = useState<PropertyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchLikedProperties() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/likes");
        const json = await res.json();
        if (json.success && json.data) {
          const mapped = json.data.map((like: { property: PropertyDoc }) => like.property);
          setLikedProperties(mapped);
        }
      } catch (error) {
        console.error("Error fetching liked properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLikedProperties();
  }, [session?.user?.id]);

  const handleUnlike = (propertyId: string) => {
    setLikedProperties((prev) => prev.filter((p) => p._id !== propertyId));
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col space-y-8">
        <div className="text-left space-y-2 border-b border-slate-200/60 pb-6">
          <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            Your Favorites
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Liked Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Showing {likedProperties.length} properties you have saved for later.
          </p>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center">
            <p className="text-sm font-bold text-slate-500 animate-pulse">Loading your liked properties...</p>
          </div>
        ) : likedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {likedProperties.map((propertyDoc, index) => {
              const property = {
                id: propertyDoc._id || "",
                image: propertyDoc.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
                price: formatPrice(propertyDoc.price),
                title: String(propertyDoc.title ?? ""),
                location: String(propertyDoc.location ?? ""),
                beds: propertyDoc.beds || 0,
                baths: propertyDoc.baths || 0,
                area: `${propertyDoc.sqft || 0} sqft`,
                type: propertyDoc.category || "Property",
              };

              return (
                <PropertyCard
                  key={property.id || index}
                  property={property}
                  defaultLiked={true}
                  onUnlike={handleUnlike}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <div className="text-4xl mb-4">💔</div>
            <p className="text-sm font-black text-slate-700 uppercase tracking-wider">No liked properties yet</p>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Browse properties and tap the heart icon to save your favorites.
            </p>
            <Link
              href="/properties"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
            >
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
