"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface PropertyProps {
  id: string;
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  type: string;
}

interface PropertyCardProps {
  property: PropertyProps;
  defaultLiked?: boolean;
  onUnlike?: (propertyId: string) => void;
}

export default function PropertyCard({ property, defaultLiked = false, onUnlike }: PropertyCardProps) {
  const [liked, setLiked] = useState(defaultLiked);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(!defaultLiked);
  const { data: session } = useSession();

  useEffect(() => {
    if (defaultLiked) {
      return;
    }
    async function checkLikeStatus() {
      if (!session?.user?.id) {
        setChecking(false);
        return;
      }
      try {
        const res = await fetch(`/api/likes?propertyId=${property.id}`);
        const json = await res.json();
        if (json.success) {
          setLiked(json.liked);
        }
      } catch (error) {
        console.error("Failed to check like status:", error);
      } finally {
        setChecking(false);
      }
    }
    checkLikeStatus();
  }, [property.id, session?.user?.id, defaultLiked]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.id) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property.id }),
      });
      const json = await res.json();
      if (json.success) {
        setLiked(json.liked);
        if (!json.liked && onUnlike) {
          onUnlike(property.id);
        }
      }
    } catch (error) {
      console.error("Like action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group w-full bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col text-left cursor-pointer relative">
        
        {/* Property Image Header Block */}
        <div className="w-full h-52 sm:h-56 relative overflow-hidden bg-slate-100 shrink-0">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md z-10">
            For Sale
          </span>
          <span className="absolute bottom-4 left-4 text-white text-base sm:text-lg font-black tracking-tight z-10">
            {property.price}
          </span>

          {/* Heart Like Button */}
          <button
            onClick={handleLike}
            disabled={loading || checking}
            className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg hover:scale-110 transition-all duration-200 cursor-pointer disabled:opacity-50"
            aria-label={liked ? "Unlike property" : "Like property"}
          >
            <svg
              className="w-5 h-5 transition-colors duration-200"
              viewBox="0 0 24 24"
              fill={liked ? "#EF4444" : "none"}
              stroke={liked ? "#EF4444" : "#334155"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Property Information Body Area */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-blue-600 tracking-wider uppercase">
              {property.type}
            </span>
            <h3 className="text-base font-bold text-slate-800 tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-xs font-medium text-slate-400 flex items-center space-x-1 line-clamp-1">
              <svg className="h-3.5 w-3.5 shrink-0 text-slate-300 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{property.location}</span>
            </p>
          </div>

          {/* Technical Metrics Specifications */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-semibold">
            <div className="flex items-center space-x-1">
              <span className="text-slate-400">🛏️</span>
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-slate-400">🛁</span>
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-slate-400">📐</span>
              <span>{property.area}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
