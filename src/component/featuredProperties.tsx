import PropertyCard from "./propertycard";
import Link from "next/link";
import { client } from "@/lib/db";

async function getFeaturedProperties() {
  try {
    const properties = await client
      .db("propertyhub")
      .collection("Property")
      .find({ status: "APPROVED" })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    return properties.map((p: any) => ({
      image: p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      price: typeof p.price === "number" ? `₹${(p.price / 10000000).toFixed(2)} Crore` : p.price,
      title: p.title,
      location: p.location,
      beds: p.beds || 0,
      baths: p.baths || 0,
      area: `${p.sqft || 0} sqft`,
      type: p.category || "Property",
    }));
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
}

export default async function FeaturedProperties() {
  const propertiesData = await getFeaturedProperties();

  return (
    <section className="w-full py-10">
      
      {/* Title Layout Section Block Area */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            Marketplace Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Featured Properties
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Handpicked institutional assets selected exclusively based on high-scale appraisal data.
          </p>
        </div>
        <Link href="/properties" passHref>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700 tracking-wider uppercase border border-slate-200 hover:border-blue-200 bg-white px-5 py-3 rounded-xl shadow-xs transition-all shrink-0 self-start md:self-auto hover:cursor-pointer">
              View All Listings
          </button>
        </Link>
      </div>

      {/* Main Structural Asymmetric Response Column Grid Layout Assembly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {propertiesData.length > 0 ? (
          propertiesData.map((item, idx) => (
            <PropertyCard key={idx} property={item} />
          ))
        ) : (
          <p className="text-slate-400 text-sm col-span-full">No featured properties available. Add properties to see them here.</p>
        )}
      </div>

    </section>
  );
}