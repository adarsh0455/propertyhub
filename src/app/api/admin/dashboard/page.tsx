"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  const fetchAllProperties = async () => {
    try {
      const res = await fetch("/api/properties?admin=true");
      const result = await res.json();
      if (result.success) setProperties(result.data);
    } catch (err) {
      console.error("Admin console fetch crash:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const handleStatusChange = async (property: any, newStatus: string) => {
    const targetId = property.id || property._id;
    if (!targetId) {
      alert("Error: Property ID missing from database payload.");
      return;
    }

    try {
      const res = await fetch("/api/admin/properties", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: targetId, status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        alert(`Property marked as ${newStatus}!`);
        fetchAllProperties();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      alert("Failed to modify property status.");
    }
  };

  const filteredProperties = filter === "ALL"
    ? properties
    : properties.filter((p) => p.status === filter);

  const stats = {
    total: properties.length,
    pending: properties.filter((p) => p.status === "PENDING").length,
    approved: properties.filter((p) => p.status === "APPROVED").length,
    rejected: properties.filter((p) => p.status === "REJECTED").length,
  };

  if (loading) {
    return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
        <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center justify-center py-32">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-500">Loading operations console...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Admin Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Property Operations Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">
              Review, approve, or reject property submissions across the platform.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 text-xs font-bold text-blue-600 hover:text-blue-700 tracking-wider uppercase border border-slate-200 hover:border-blue-200 bg-white px-5 py-3 rounded-xl shadow-xs transition-all"
          >
            ← Back to Site
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Properties", value: stats.total, color: "bg-slate-900" },
            { label: "Pending Review", value: stats.pending, color: "bg-amber-500" },
            { label: "Approved", value: stats.approved, color: "bg-emerald-500" },
            { label: "Rejected", value: stats.rejected, color: "bg-rose-500" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color.replace('bg-', 'text-')}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                filter === f
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {f.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Properties Table */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-sm font-black text-slate-700 uppercase tracking-wider">No properties found</p>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              {filter === "ALL" ? "Submit properties to see them here." : `No ${filter.toLowerCase()} properties.`}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] uppercase font-black tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProperties.map((p) => {
                    const id = p.id || p._id?.toString() || p._id;
                    return (
                      <tr key={id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 text-sm">{p.title}</span>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                              {p.category || "Property"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-600">📍 {p.location}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-black text-slate-900">
                            ₹{typeof p.price === "number" ? p.price.toLocaleString("en-IN") : p.price}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                              p.status === "APPROVED"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : p.status === "REJECTED"
                                ? "bg-rose-50 text-rose-600 border border-rose-100"
                                : "bg-amber-50 text-amber-600 border border-amber-100"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 mt-0.5 ${
                              p.status === "APPROVED" ? "bg-emerald-500" :
                              p.status === "REJECTED" ? "bg-rose-500" : "bg-amber-500"
                            }`} />
                            {p.status || "PENDING"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {p.status !== "APPROVED" && (
                              <button
                                onClick={() => handleStatusChange(p, "APPROVED")}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-sm"
                              >
                                Approve
                              </button>
                            )}
                            {p.status !== "REJECTED" && (
                              <button
                                onClick={() => handleStatusChange(p, "REJECTED")}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-sm"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}