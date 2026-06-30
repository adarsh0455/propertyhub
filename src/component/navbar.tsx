"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // NextAuth session listeners nodes import kiye

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // NextAuth hooks core session monitoring destructured matrices
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsMounted(true);

    const checkScrollPosition = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    checkScrollPosition();
    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  // Safe programmatic global state management system trigger logout function
  const handleLogoutAction = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[9999] border-b transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-[#090D16] py-4 border-white/5 shadow-lg"
          : "bg-[#090D16] py-5 border-transparent md:bg-[#090D16]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-[9999]">
        
        {/* Brand Logo Identity */}
        <Link href="/" className="text-xl font-black tracking-tight text-white flex items-center space-x-1.5">
          <span className="text-blue-500">🏢</span>
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            PropertyHub
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-slate-300">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/properties" className="hover:text-blue-400 transition-colors">Properties</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          <Link href="/sellerdashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
        </div>

        {/* Right Action Block — Desktop Only Dynamic Matrix */}
        <div className="hidden md:flex items-center space-x-6">
          {status === "loading" ? (
            <span className="text-[10px] uppercase tracking-widest font-black text-slate-500 animate-pulse">Sync...</span>
          ) : session ? (
            // 💡 IF LOGGED IN (DESKTOP): Show user identity node and inline clear logout trigger
            <div className="flex items-center space-x-5">
              <div className="flex flex-col text-right">
                <span className="text-[9px] uppercase tracking-widest font-black text-blue-400">Authenticated</span>
                <span className="text-xs font-extrabold text-white tracking-tight">{session.user?.name}</span>
              </div>
              <button
                onClick={handleLogoutAction}
                className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            // 💡 IF LOGGED OUT (DESKTOP): Show normal access state navigation links
            <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
          )}

          <Link
            href="/post-property"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest px-5 py-3.5 rounded-xl transition-all shadow-md shadow-blue-600/10 active:scale-95"
          >
            + Post New Properties
          </Link>
        </div>

        {/* Hamburger Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer select-none"
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "transform rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "transform -rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

      </div>

      {/* FIXED DROPDOWN MOUNTING: Pure viewport context layer mapping */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#090D16] border-t border-white/5 z-[9990] animate-fadeIn block overflow-y-auto">
          <div className="px-6 pt-6 pb-12 space-y-5 flex flex-col text-left text-sm font-bold uppercase tracking-widest text-slate-200">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400 py-2.5 transition-colors border-b border-white/5 block cursor-pointer">Home</Link>
            <Link href="/properties" onClick={() => setIsOpen(false)} className="hover:text-blue-400 py-2.5 transition-colors border-b border-white/5 block cursor-pointer">Properties</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-400 py-2.5 transition-colors border-b border-white/5 block cursor-pointer">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-400 py-2.5 transition-colors border-b border-white/5 block cursor-pointer">Contact</Link>
            <Link href="/sellerdashboard" onClick={() => setIsOpen(false)} className="hover:text-blue-400 py-2.5 transition-colors border-b border-white/5 block cursor-pointer">Dashboard</Link>
            
            {status === "loading" ? (
              <span className="text-xs font-bold text-slate-500 py-2.5 block">Syncing Session...</span>
            ) : session ? (
              // 💡 IF LOGGED IN (MOBILE DROPDOWN VIEW): Identity parameters display layout mapping
              <div className="py-2.5 border-b border-white/5 flex flex-col space-y-2 text-left">
                <div className="flex flex-col">
                  <span className="text-[10px] text-blue-400 lowercase tracking-wider font-semibold">User Connected:</span>
                  <span className="text-sm normal-case font-black text-white">{session.user?.name}</span>
                </div>
                <button 
                  onClick={() => { setIsOpen(false); handleLogoutAction(); }}
                  className="text-left text-xs font-black text-red-400 uppercase tracking-widest pt-2 cursor-pointer"
                >
                  [ Logout Session ]
                </button>
              </div>
            ) : (
              // 💡 IF LOGGED OUT (MOBILE DROPDOWN VIEW): Normal sign-in links matrix
              <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-white py-2.5 transition-colors border-b border-white/5 block cursor-pointer">
                Sign In
              </Link>
            )}
            
            <Link href="/post-property" onClick={() => setIsOpen(false)} className="pt-3 block">
              <button className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-md shadow-blue-600/10 active:scale-95 cursor-pointer">
                + Post New Properties
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Isolated Animation Wrapper Injector */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInDown {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeInDown 0.15s ease-out forwards;
        }
      `}} />

    </nav>
  );
}