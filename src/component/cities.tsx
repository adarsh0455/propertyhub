"use client";

export default function Cities() {
  const citiesData = [
    {
      name: "Lucknow",
      properties: "240+ Properties",
      imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Delhi NCR",
      properties: "510+ Properties",
      imgUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Noida",
      properties: "380+ Properties",
      imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Bhopal",
      properties: "120+ Properties",
      imgUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Infinite duplicate list node pipeline
  const infiniteLoopArray = [...citiesData, ...citiesData, ...citiesData];

  return (
    <section className="w-full bg-white py-12 overflow-hidden flex flex-col items-center">
      
      <div className="text-center space-y-2 mb-10">
        <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
          Regional Coverage
        </span>
        <h2 className="text-3xl font-black text-[#090D16] tracking-tight">
          Explore Top Institutional Cities
        </h2>
        <div className="w-8 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
      </div>

      <div className="w-full max-w-7xl relative mx-auto px-4 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />

        {/* CSS Native Continuous Rail Layout */}
        <div className="flex w-max gap-6 py-4 pure-marquee-track">
          {infiniteLoopArray.map((city, index) => (
            <div
              key={index}
              className="w-[280px] h-[360px] relative rounded-3xl overflow-hidden shadow-md group border border-slate-100 flex-shrink-0"
            >
              <img
                src={city.imgUrl}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-left space-y-1 z-20">
                <h3 className="text-white text-xl font-black tracking-tight">{city.name}</h3>
                <p className="text-slate-300 text-[11px] font-bold uppercase tracking-wider">{city.properties}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pure-marquee-track {
          animation: slideMarquee 30s linear infinite;
        }
        .pure-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes slideMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
      `}} />
    </section>
  );
}