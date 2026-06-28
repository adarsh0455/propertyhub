"use client";

export default function Stats() {
  const statsData = [
    { value: "₹4500 Cr+", label: "Trading Volume" },
    { value: "12,000+", label: "Verified Listings" },
    { value: "99.8%", label: "Safe Transactions" },
    { value: "150+", label: "Institutional Partners" }
  ];

  return (
    <section className="w-full py-12 bg-[#090D16] text-white rounded-3xl px-6 md:px-12 shadow-xl border border-white/5 overflow-hidden relative">
      {/* Subtle modern glowing ambient blob in background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
        {statsData.map((stat, idx) => (
          <div key={idx} className="space-y-2 flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">
              {stat.value}
            </h3>
            <p className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}