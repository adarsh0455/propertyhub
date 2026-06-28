"use client";

export default function Categories() {
  const categories = [
    { name: "Apartments", count: "140+ Properties", icon: "🏢" },
    { name: "Luxury Villas", count: "80+ Properties", icon: "🏡" },
    { name: "Verified Plots", count: "210+ Properties", icon: "🗺️" },
    { name: "Commercial", count: "45+ Properties", icon: "🏪" },
    { name: "Townhouses", count: "30+ Properties", icon: "🏰" },
  ];

  return (
    // pb-0 karke bottom inner container ka extra gap mita diya gaya hai
    <div className="w-full text-center flex flex-col space-y-8 pb-0">
      
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
          Categorized Listings
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Browse By Property Type
        </h2>
      </div>

      {/* ⚡ FIXED: py-10 scale implemented to make cards physically bigger on screen */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 w-full pt-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/60 rounded-2xl py-10 px-5 flex flex-col items-center justify-center space-y-4 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="text-3xl bg-slate-50 group-hover:bg-blue-50 h-14 w-14 rounded-2xl flex items-center justify-center transition-colors duration-300 border border-slate-100">
              {cat.icon}
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm md:text-base text-slate-800 tracking-tight">
                {cat.name}
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {cat.count}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}