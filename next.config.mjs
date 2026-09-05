/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // 🔥 Cloudinary domains ko allow karne ke liye
      },
    ],
  },
  allowedDevOrigins: ['10.201.234.243', 'localhost:3000'], // ⚡ Moved from next.config.ts
};

export default nextConfig;
