import "./globals.css";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import AuthProvider from "@/component/AuthProvider"; // AuthProvider Import Kiya
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "PropertyHub | Luxury Real Estate Marketplace",
  description: "Industry-level premium marketplace to buy, sell, and rent verified properties across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", jakartaSans.variable, "font-sans", geist.variable)}>
      <body className="w-full min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
        
        {/* NextAuth Global Session Wrapping Layer */}
        <AuthProvider>
          <Navbar />

          {/* Global Structural Main Node */}
          <main className="w-full flex-1 flex flex-col items-center justify-start shrink-0">
            {children}
          </main>

          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}