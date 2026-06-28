"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const reviews = [
    {
      text: "PropertyHub has completely transformed my portfolio strategy. The transparent dashboard metrics and verified RERA listings allowed me to trade assets with extreme conviction and zero friction.",
      name: "Pritoo Singh",
      role: "REAL ESTATE INVESTOR"
    },
    {
      text: "Finding premium villa plots in fast-developing zones used to take months. With the direct owner verification module, I locked my transaction in less than a week.",
      name: "Aditya Sharma",
      role: "ASSET MANAGER"
    },
    {
      text: "The seller console provides institutional-grade analytical tracking. Managing property listings and buyer documentation stream is absolutely seamless.",
      name: "Rohan Verma",
      role: "PORTFOLIO DEVELOPER"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Clean 3-second auto slider (stable + no timeout bugs)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-16 flex flex-col items-center px-4">
      
      <div className="text-center space-y-2 mb-12">
        <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
          Institutional Trust
        </span>
        <h2 className="text-3xl font-black text-[#090D16] tracking-tight">
          Client Testimonials & Feedback
        </h2>
        <div className="w-8 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
      </div>

      <div className="w-full max-w-4xl bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 text-center shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative flex flex-col items-center justify-center min-h-[320px]">
        
        <span className="text-4xl text-blue-200 font-serif absolute top-6 left-12 select-none">“</span>
        
        <div key={currentIndex} className="w-full space-y-6">
          <p className="text-slate-600 font-medium italic text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mx-auto px-4 min-h-[90px] flex items-center justify-center">
            "{reviews[currentIndex].text}"
          </p>
          
          <div className="space-y-1">
            <div className="text-amber-400 text-xs tracking-wider">⭐⭐⭐⭐⭐</div>
            <h4 className="text-sm font-black text-[#090D16] tracking-tight">
              {reviews[currentIndex].name}
            </h4>
            <p className="text-[10px] font-black tracking-widest text-blue-600 uppercase">
              {reviews[currentIndex].role}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-8 relative z-30">
          <button 
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 active:bg-slate-100 transition-colors text-xs font-bold select-none cursor-pointer"
          >
            &lt;
          </button>
          
          <div className="flex items-center space-x-1.5">
            {reviews.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer inline-block ${
                  idx === currentIndex ? "w-6 bg-blue-600" : "w-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 active:bg-slate-100 transition-colors text-xs font-bold select-none cursor-pointer"
          >
            &gt;
          </button>
        </div>

      </div>
    </section>
  );
}