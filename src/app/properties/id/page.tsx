"use client";

import { useState, useEffect } from "react";
import Navbar from "@/component/navbar";

export default function PropertyDetailsPage() {
  const showcaseImages = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % showcaseImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [showcaseImages.length]);

  return (
    <>
      <Navbar />

      <section className="bg-[#F4F7FA] pt-36 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Info Frame */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Dynamic Ken Burns Continuous Panning Showcase Slider */}
              <div className="relative h-[480px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm">
                {showcaseImages.map((img, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out transform ${
                        isActive 
                          ? "opacity-100 scale-100 rotate-0" 
                          : "opacity-0 scale-105 rotate-1"
                      }`}
                      style={{ backgroundImage: `url('${img}')` }}
                    />
                  );
                })}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] px-3 py-1.5 rounded-lg tracking-wider">
                  VIEW INDEX {activeSlide + 1} / {showcaseImages.length}
                </div>
              </div>

              {/* Specification Meta Box */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded tracking-wider uppercase">Verified Listing</span>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">Premium Luxury Villa Portfolio</h1>
                  <p className="text-xs font-bold text-slate-400 mt-1">📍 Gomti Nagar, Lucknow</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">Valuation Price</span>
                  <p className="text-3xl font-black text-blue-600 tracking-tight">₹75,00,000</p>
                </div>
              </div>

              {/* Description Node */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Overview</h3>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  Designed under professional architectural guidance, this high-end premium villa model combines extensive spacing with private botanical yards, automatic secure access parking frames, and state-of-the-art climate configurations.
                </p>
              </div>

            </div>

            {/* Right Action Framework Box */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs sticky top-28 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-xl mx-auto shadow-inner">👤</div>
                <h4 className="text-base font-black text-slate-900 mt-3">Rahul Sharma</h4>
                <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">Verified Owner</p>
                
                <div className="mt-6 space-y-2">
                  <button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl tracking-wide shadow-md shadow-blue-600/10 transition-all">
                    Connect With Partner
                  </button>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </section>
    </>
  );
}