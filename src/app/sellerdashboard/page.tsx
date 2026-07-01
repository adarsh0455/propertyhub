import Link from "next/link";
import { client } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation"; // 🚀 NEW: Server redirect helper

// 🔄 Database layer connection mapping logic for specific user
async function getUserProperties(userId: string) {
  try {
    const properties = await client
      .db("propertyhub")
      .collection("Property")
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .toArray();

    return properties.map((p: any) => ({
      id: p._id.toString(),
      title: p.title,
      category: p.category,
      price: Number(p.price) || 0, // Ensure numeric parsing evaluation
      status: p.status || "PENDING", // Fallback standard status string
    }));
  } catch (error) {
    console.error("Error fetching user properties:", error);
    return [];
  }
}

export default async function SellerDashboardPage() {
  const session = await getServerSession(authOptions);

  // 🛡️ SECURITY SHIELD: Agar valid login session nahi hai, access deny aur direct redirect login page par!
  if (!session?.user) {
    redirect("/login");
  }

  // 🔥 100% Dynamic ID Mapping without any hardcoded fallback node
  const userId = session.user.id;
  const properties = await getUserProperties(userId);

  // Dynamic Valuation Formatter Utility Node
  const totalValuation = properties.reduce((acc: number, p: any) => acc + (p.price || 0), 0);
  const formattedValuation = totalValuation >= 10000000 
    ? `₹${(totalValuation / 10000000).toFixed(2)} Cr` 
    : `₹${(totalValuation / 100000).toFixed(2)} Lakh`;

  const operationalMetrics = [
    { value: properties.length.toString(), text: "Total Listed Assets", color: "text-blue-600", bg: "bg-blue-50" },
    { value: "12", text: "Active Buyer Leads", color: "text-emerald-600", bg: "bg-emerald-50" },
    { value: formattedValuation, text: "Listed Pipeline Valuation", color: "text-indigo-600", bg: "bg-indigo-50" },
    { value: properties.filter((p: any) => p.status === "PENDING").length.toString(), text: "Pending Approvals", color: "text-amber-600", bg: "bg-amber-50" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      
      {/* Navbar Top Fixed Buffer Spacer */}
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />

      {/* Main Structural Layout Grid Console Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col space-y-8 text-left">
        
        {/* Dynamic Title Onboarding Badge Node */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Control Center
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seller Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">
              Welcome back, <span className="text-blue-600 font-bold">{session.user.name || "Agent"}</span>. Tracking live real-time escrow analytics.
            </p>
          </div>
          
          {/* Action Link to easily navigate to Property Posting Wizard Form */}
          <Link 
            href="/post-property" 
            className="px-5 py-3 bg-[#090D16] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-colors self-start sm:self-auto text-center"
          >
            + Post New Property
          </Link>
        </div>

        {/* 1. Core Analytics Parameters Grid Framework */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {operationalMetrics.map((metrics, index) => (
            <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.01)] text-left flex flex-col justify-center space-y-2">
              <span className={`w-8 h-8 rounded-lg ${metrics.bg} flex items-center justify-center font-bold text-sm ${metrics.color}`}>📈</span>
              <h3 className={`text-2xl font-black tracking-tight ${metrics.color}`}>{metrics.value}</h3>
              <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">{metrics.text}</p>
            </div>
          ))}
        </div>

        {/* 2. Dual-Panel Pipeline Status Records Workspace Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full pt-4">
          
          {/* Heavy Records Table Grid Left Array Area */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-widest font-black text-slate-800">Your Active Property Assets Index</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-md text-slate-500">Live</span>
            </div>
            
            {/* Standard Spreadsheet Layout Matrix Block */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-black">
                    <th className="p-4">Property Identity Asset</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price Target</th>
                    <th className="p-4">Status Code</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-slate-600">
                  {properties.length > 0 ? (
                    properties.map((property, index) => (
                      <tr key={property.id || index} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-800">{property.title}</td>
                        <td className="p-4 uppercase tracking-wider text-[10px] font-black text-slate-400">{property.category}</td>
                        <td className="p-4 font-bold text-slate-700">
                          ₹{property.price >= 10000000 
                            ? `${(property.price / 10000000).toFixed(2)} Cr` 
                            : `${(property.price / 100000).toFixed(2)} Lakh`}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            property.status === "APPROVED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                            property.status === "REJECTED" ? "bg-red-50 text-red-600 border border-red-100" :
                            "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse"
                          }`}>
                            {property.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-slate-400 font-semibold">No properties found. Add properties to view them here.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Logs Stream Console Right Box Wrapper */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs text-left space-y-4 w-full">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-800 border-b border-slate-100 pb-2">Recent Notifications Stream</h3>
            <div className="space-y-4">
              <div className="text-xs border-l-2 border-blue-500 pl-3 py-0.5 space-y-0.5">
                <p className="font-bold text-slate-700">System Pipeline Online</p>
                <p className="text-[10px] text-slate-400">Database node synchronized successfully</p>
              </div>
              <div className="text-xs border-l-2 border-slate-200 pl-3 py-0.5 space-y-0.5">
                <p className="font-semibold text-slate-500">Asset Verification Engine</p>
                <p className="text-[10px] text-slate-400">Monitoring admin verification channels</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}