import Hero from "@/component/hero";
import SearchBar from "@/component/searchBar";
import Categories from "@/component/categories";
import FeaturedProperties from "@/component/featuredProperties";
import Cities from "@/component/cities";
import Stats from "@/component/stats";
import Testimonials from "@/component/testimonials";

export default function Home() {
  const workflowSteps = [
    { num: "01", title: "Advanced Search Node", desc: "Filter premium properties using localized smart-mapping systems and real-time category queries." },
    { num: "02", title: "Direct Legal Clearance", desc: "Connect instantly with verified owners with escrow protection and zero hidden institutional loops." },
    { num: "03", title: "Secure Asset Ownership", desc: "Finalize document verification securely and transfer title clearings through automated pipelines." }
  ];

  const marketInsights = [
    {
      tag: "Market Analysis",
      title: "The Rise of Decentralized Premium Hubs in Tier-1 Corridors",
      date: "June 2026",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80"
    },
    {
      tag: "Investment Guide",
      title: "Maximizing Asset Valuation: Portfolio Restructuring for Modern Spaces",
      date: "May 2026",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80"
    },
    {
      tag: "Architecture Trends",
      title: "Sustainable Infrastructure Tiers and High-Velocity Real Estate Demands",
      date: "April 2026",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start bg-[#F8FAFC]">
      
      {/* 1. Hero Content & Solid Dark Background Layer */}
      <div className="w-full bg-[#090D16] relative pb-6">
        <Hero />
        
        {/* SearchBar wrapper with exact margin spacing */}
        <div className="w-full relative z-30 -mt-16 md:-mt-20">
          <SearchBar />
        </div>

        {/* Compressed gradient heights forcing transition to end at exact vector zone */}
        <div className="absolute top-full left-0 w-full h-20 bg-gradient-to-b from-[#090D16] via-[#090D16]/30 to-[#F8FAFC] via-30% pointer-events-none z-10" />
      </div>

      {/* 2. Main Structural Content Grid Wrapper */}
      {/* ⚡ FIXED: General inner spacing decreased to snap layers cleaner */}
      <div className="w-full max-w-7xl flex flex-col space-y-12 md:space-y-16 pb-20 pt-24 px-4 sm:px-6 lg:px-8 relative z-20">
        
        <Categories />

        {/* ⚡ FIXED (Red line white space fix): Reduced pt-16 to pt-4 to remove excessive whitespace below cards */}
        <div className="w-full border-t border-slate-200/50 pt-4 flex flex-col space-y-12 text-left">
          <div className="space-y-2 pt-4">
            <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Platform Workflow
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">How PropertyHub Secures Transactions</h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-400">A streamlined end-to-end framework engineered for corporate agents and elite buyers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 border border-slate-200/60 rounded-2xl space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-blue-500/40 transition-all duration-300">
                <p className="text-2xl font-black text-blue-600/30 tracking-tight font-mono">{step.num}</p>
                <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">{step.title}</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <FeaturedProperties />

        <Cities />

        <Stats />

        <div className="w-full border-t border-slate-200/50 pt-16 flex flex-col space-y-12 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                Industry Intelligence
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">Latest Market Insights</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-400">Stay upgraded with corporate asset valuation shifts and structural growth trends.</p>
            </div>
            <button className="shrink-0 self-start sm:self-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-colors">
              View All Insights
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {marketInsights.map((insight, idx) => (
              <div key={idx} className="group flex flex-col space-y-4 bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-300">
                <div className="w-full h-44 overflow-hidden relative bg-slate-100">
                  <img 
                    src={insight.img} 
                    alt={insight.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {insight.tag}
                    </span>
                    <h3 className="font-black text-xs sm:text-sm text-slate-800 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                      {insight.title}
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100">
                    Published: {insight.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Testimonials />

      </div>
      
    </div>
  );
}