import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full min-h-[75vh] md:min-h-[80vh] bg-[#090D16] relative flex items-center justify-center text-center px-4 overflow-hidden pb-20">
      
      {/* High-end ambient backdrop glowing mesh rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Hero Typography Content Layer Assembly */}
      {/* ⚡ FIXED: Content padding ko wapis normal standard (pt-16) par laya taaki SearchBar ka upar wala gap pehle jaisa perfect ho jaye */}
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 md:space-y-8 relative z-10 pt-16">
        
        {/* ⚡ FIXED: Sirf is badge ke upar 'pt-8 md:pt-12' lagaya hai taaki navbar se content halka sa niche shift ho, bina baaki layout ko disturb kiye */}
        <span className="mt-8 md:mt-12 text-[10px] sm:text-[11px] uppercase tracking-widest font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full shadow-inner animate-pulse">
          ✨ Premium Real Estate Portal
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] max-w-3xl">
          Discover Your Next{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
            Institutional Asset
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-400 font-medium max-w-2xl leading-relaxed">
          Streamlined peer-to-peer property trading environment with automated compliance check tools, secure escrow settlement modules, and direct owner tracking frameworks.
        </p>

        {/* Dual Responsive CTA Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center pt-2">
          <Link
            href="/properties"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-center"
          >
            Browse Listings
          </Link>
          <Link
            href="/sellerdashboard"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl border border-white/10 hover:border-white/20 transition-all active:scale-95 text-center"
          >
            Seller Console
          </Link>
        </div>

      </div>
      
    </section>
  );
}