"use client";

import Link from "next/link";

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

export default function PropertyCard({ property }: { property: PropertyProps }) {
  return (
    <Link href={`/properties/id/${property.id}`}>
      <div className="group w-full bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col text-left cursor-pointer">
       
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