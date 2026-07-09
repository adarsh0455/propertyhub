"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState<{ id: string; title: string; category?: string; price: number; location?: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login?error=UnauthorizedAdmin");
      return;
    }

    if (sessionStatus === "loading" || !session?.user) return;

    (async () => {
      try {
        const res = await fetch("/api/admin/properties");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login?error=UnauthorizedAdmin");
            return;
          }
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data.success) setProperties(data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionStatus, session, router]);

  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch("/api/admin/properties", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
      }
    }
  };

  const stats = {
    total: properties.length,
    pending: properties.filter((p) => p.status === "PENDING").length,
    approved: properties.filter((p) => p.status === "APPROVED").length,
    rejected: properties.filter((p) => p.status === "REJECTED").length,
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 space-y-8">
        
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Properties", value: stats.total, color: "text-slate-900" },
            { label: "Pending Review", value: stats.pending, color: "text-amber-600" },
            { label: "Approved", value: stats.approved, color: "text-emerald-600" },
            { label: "Rejected", value: stats.rejected, color: "text-rose-600" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] uppercase font-black tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-semibold">Loading properties...</td>
                  </tr>
                ) : properties.length > 0 ? (
                  properties.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
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
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            p.status === "APPROVED"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : p.status === "REJECTED"
                              ? "bg-rose-50 text-rose-600 border border-rose-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100"
                          }`}
                        >
                          {p.status || "PENDING"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {p.status === "APPROVED" && (
                            <button
                              onClick={() => handleStatusChange(p.id, "REJECTED")}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-colors"
                            >
                              Reject
                            </button>
                          )}
                          {p.status === "REJECTED" && (
                            <button
                              onClick={() => handleStatusChange(p.id, "APPROVED")}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          {p.status === "PENDING" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(p.id, "APPROVED")}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusChange(p.id, "REJECTED")}
                                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-slate-400 font-semibold">No properties found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}