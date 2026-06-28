"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#090D16] text-white pt-16 pb-8 border-t border-white/5 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        
        {/* Brand Information Frame */}
        <div className="space-y-4">
          <h3 className="text-lg font-black tracking-tight flex items-center space-x-2">
            <span>PropertyHub</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs">
            India's most innovative high-end digital real estate platform. We make discovering, leasing, and trading residential spaces absolutely seamless.
          </p>
        </div>

        {/* QUICK LINKS SECTION - RESOLVED 404 LINK TARGET PIPE */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">Quick Links</h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
            <li><Link href="/properties" className="hover:text-blue-400 transition-colors">Browse Marketplace</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition-colors">Our Identity Story</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Get In Touch</Link></li>
            {/* FIXED 404 LINK TO POST-PROPERTIES PAGE */}
            <li><Link href="/post-property" className="hover:text-blue-400 transition-colors">List Your Asset</Link></li>
          </ul>
        </div>

        {/* Legal Framework Column Layout */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">Legal Framework</h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Charter</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Operations</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">RERA Compliance Data</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Corporate Security</Link></li>
          </ul>
        </div>

        {/* Stay Tuned Newsletter Component Grid Node */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">Stay Tuned</h4>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Subscribe to our weekly premium luxury asset updates catalog pipeline.
          </p>
          <div className="flex w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-1 items-center">
            <input 
              type="email" 
              placeholder="Your professional email" 
              className="w-full bg-transparent px-3 py-2 text-xs font-semibold text-white focus:outline-none placeholder-slate-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg transition-colors shrink-0">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Ground Watermark Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-12 pt-6 text-center text-[10px] font-bold tracking-wider text-slate-500 uppercase">
        PropertyHub Core Registry Engine © 2026. All Rights Reserved.
      </div>
    </footer>
  );
}