/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 💡 Nayi allocated IP ko yahan inject karo
    allowedDevOrigins: ['10.201.234.243', 'localhost:3000']
  },
  
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default nextConfig;