"use client";

import Link from "next/link";

export default function AboutPage() {
  const brandValues = [
    { title: "Escrow Integrity", desc: "Every transaction node undergoes extreme vetting for 100% fraud-proof security." },
    { title: "Curated Portfolio", desc: "We focus heavily on elite sub-markets and modern institutional real estate tiers." },
    { title: "Direct Connect", desc: "Eliminating opaque loops by creating high-speed verified peer-to-peer owner pipelines." }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      
      {/* Navbar Top Fixed Buffer Spacer - Content alignment protection */}
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />

      {/* Main Structural Container Content Block */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col space-y-20 text-left">
        
        {/* Section 1: Brand Narrative Dual-Split Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-5">
            <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Corporate Vision
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Redefining Luxury Real Estate Discovery
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
              Launched with a mission to eliminate institutional fragmentation, PropertyHub operates as India&#39;s premier decentralized marketplace framework. We serve high-velocity buyers, corporate agents, and developers with absolute data transparency.
            </p>
            <div className="pt-2">
              <Link href="/properties" className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/10 transition-colors inline-block">
                Explore Our Catalog
              </Link>
            </div>
          </div>

          {/* Premium Homez Aesthetics Image Framework Box */}
          <div className="w-full h-64 sm:h-96 rounded-3xl relative overflow-hidden shadow-xl border border-slate-200/50">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
              alt="Luxury Architecture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* NEW SECTION: Market Stats & Milestone Impact Block (Added before Principles) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full border-t border-slate-200/60 pt-16">
          
          {/* Left Column: Premium Architectural Asset View */}
          <div className="w-full h-64 sm:h-96 rounded-3xl relative overflow-hidden shadow-xl border border-slate-200/50 order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
              alt="Premium Elite Villa" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Narrative & Counter Matrices */}
          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Market Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Driven by Data, Trusted by Thousands
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
              By deploying cutting-edge automation pipelines and direct multi-party sync architectures, we reduce listing validation bottlenecks down to near zero. Our footprint secures premier premium real estate assets across major Tier-1 growth corridors.
            </p>
            
            {/* Stats Numeric Panel Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-blue-600">₹4500 Cr+</p>
                <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider">Trading Volume</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-slate-900">12,000+</p>
                <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider">Verified Nodes</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-slate-900">99.8%</p>
                <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider">Secure Clearance</p>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Core Institutional Corporate Pillars */}
        <div className="w-full border-t border-slate-200/60 pt-16 space-y-10">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Our Operational Principles</h2>
            <p className="text-xs font-semibold text-slate-400">The high-scale baseline compliance standard that powers our ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {brandValues.map((value, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 border border-slate-200/80 rounded-2xl text-left space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                <span className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold">✓</span>
                <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">{value.title}</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}