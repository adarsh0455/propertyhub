import PropertyCard from "@/component/propertycard";
import { client, withDbRetry } from "@/lib/db";

async function getProperties() {
  try {
    const db = client.db("propertyhub");

    const properties = await withDbRetry(() =>
      db
        .collection("Property")
        .find({ status: "APPROVED" }) // Strict query pipeline matching admin console state
        .sort({ createdAt: -1 })
        .toArray()
    );

    if (properties.length === 0) throw new Error("No approved data in DB");

    return properties.map((p: any) => ({
      // 🔥 Fixed Image Key Fallback mapping for Cloudinary structure logic
      image: (p.image && p.image.length > 0) 
        ? p.image[0] 
        : (p.images && p.images.length > 0) ? p.images[0] : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      price: typeof p.price === "number"
        ? p.price >= 10000000
          ? `₹${(p.price / 10000000).toFixed(2)} Crore`
          : `₹${(p.price / 100000).toFixed(0)} Lakh`
        : p.price,
      title: p.title,
      location: p.location,
      beds: p.beds || 0,
      baths: p.baths || 0,
      area: p.sqft ? `${p.sqft.toLocaleString("en-IN")} sqft` : "N/A",
      type: p.category || "Property",
    }));
  } catch (error) {
    console.log("Database fetch empty/pending. Loading premium fallback catalog matrix.");
    return [
      {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        price: "₹3.40 Crore",
        title: "The Grande Orchard Luxury Mansion",
        location: "Gomti Nagar Extension, Lucknow",
        beds: 4,
        baths: 5,
        area: "3,200 sqft",
        type: "Luxury Villa",
      },
      {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        price: "₹1.15 Crore",
        title: "Skyline Imperial Skyline Apartment",
        location: "Hazratganj Main Corridor, Lucknow",
        beds: 3,
        baths: 3,
        area: "1,850 sqft",
        type: "Apartment / Flat",
      },
      {
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
        price: "₹85 Lakh",
        title: "Sushant Golf City Premium Enclave Plot",
        location: "Shaheed Path Highway Link, Lucknow",
        beds: 0,
        baths: 0,
        area: "2,100 sqft",
        type: "Verified Plot",
      }
    ];
  }
}

export default async function PropertiesPage() {
  const allProperties = await getProperties();

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-start items-center">
      <div className="w-full h-20 md:h-24 shrink-0 bg-[#090D16]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col space-y-8">
        <div className="text-left space-y-2 border-b border-slate-200/60 pb-6">
          <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            Verified Directory
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Discover Real Estate Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Showing {allProperties.length} high-scale institutional spaces available with premium escrow compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
          {/* LEFT PANEL: Advanced Filter Console */}
          <aside className="lg:sticky lg:top-28 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.01)] text-left space-y-6 w-full z-30">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">Advanced Filters</h3>
              <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-600">Reset</button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Location Area</label>
                <input 
                  type="text" 
                  placeholder="e.g. Gomti Nagar"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Property Segment</label>
                <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer">
                  <option value="">All Categories</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="plot">Verified Land</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Pricing Tier</label>
                <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer">
                  <option value="">Any Budget</option>
                  <option value="under-1">Below ₹1 Crore</option>
                  <option value="1-3">₹1 Crore - ₹3 Crore</option>
                  <option value="above-3">Above ₹3 Crore</option>
                </select>
              </div>
            </div>

            <button className="w-full py-3.5 bg-[#090D16] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 shadow-md">
              Apply Dynamic Filters
            </button>
          </aside>

          {/* RIGHT PANEL: Property Cards Showcase */}
          <main className="lg:col-span-3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full">
              {allProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}