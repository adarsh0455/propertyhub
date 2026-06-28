"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center overflow-hidden">
      
      {/* Navbar Top Fixed Buffer Spacer - Content alignment protection */}
      <motion.div 
        className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Main Framework Form Grid Centered Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col space-y-10 text-left">
        
        {/* Title Header Block */}
        <motion.div 
          className="space-y-2 border-b border-slate-200/60 pb-6 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.span 
            className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Support Pipeline
          </motion.span>
          <motion.h1 
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect With Our Agents
          </motion.h1>
          <motion.p 
            className="text-xs sm:text-sm text-slate-400 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Have queries regarding escrow verification, premium asset bids, or dashboard API onboarding? Shoot us a message.
          </motion.p>
        </motion.div>

        {/* Master Dual-Panel Contact Split Layout Mesh */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start w-full">
          
          {/* Left Panel: Corporate Headquarters Communication Nodes */}
          <motion.div 
            className="lg:col-span-2 space-y-6 text-left w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Operational Channels</h2>
            
            <div className="space-y-4">
              {[
                { icon: "📍", title: "Corporate Node HQ", text: "Cyber Heights Level 4, Vibhuti Khand, Gomti Nagar, Lucknow, IN." },
                { icon: "✉️", title: "Institutional Support", text: "corporate@propertyhub.com", highlight: true },
                { icon: "📞", title: "Hotline Registry", text: "+91 (522) 400-8821 / 400-8822" }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="flex items-start space-x-3.5 text-xs sm:text-sm font-semibold text-slate-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
                >
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider">{item.title}</h4>
                    <p className={`mt-0.5 ${item.highlight ? 'text-blue-500 font-bold' : 'text-slate-400'}`}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Panel: Homez Standard Lead Intake Interactive Console Form */}
          <motion.div 
            className="lg:col-span-3 bg-white border border-slate-200/80 p-6 sm:p-10 rounded-3xl shadow-[0_4px_25px_rgba(15,23,42,0.01)] w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <form className="space-y-5 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Your Full Name", type: "text", placeholder: "e.g. Kabir Singh" },
                  { label: "Business Email", type: "email", placeholder: "kabir@example.com" }
                ].map((field, index) => (
                  <motion.div 
                    key={field.label}
                    className="flex flex-col space-y-1.5 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  >
                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">{field.label}</label>
                    <motion.input 
                      type={field.type} 
                      placeholder={field.placeholder} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>
                ))}
              </div>

              {[
                { label: "Subject Objective", type: "text", placeholder: "e.g. Requesting RERA papers for Villa 04" },
                { label: "Message Description Block", type: "textarea", placeholder: "Describe your asset requirements or institutional investment parameters..." }
              ].map((field, index) => (
                <motion.div 
                  key={field.label}
                  className="flex flex-col space-y-1.5 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 + index * 0.05 }}
                >
                  <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">{field.label}</label>
                  {field.type === "textarea" ? (
                    <motion.textarea 
                      rows={5} 
                      placeholder={field.placeholder} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                      whileFocus={{ scale: 1.01 }}
                    />
                  ) : (
                    <motion.input 
                      type={field.type} 
                      placeholder={field.placeholder} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      whileFocus={{ scale: 1.01 }}
                    />
                  )}
                </motion.div>
              ))}

              <motion.button 
                type="submit" 
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 35px rgba(37, 99, 235, 0.15)" }}
                whileTap={{ scale: 0.98 }}
              >
                Dispatch Lead Signal
              </motion.button>
            </form>
          </motion.div>

        </div>

      </div>
    </div>
  );
}