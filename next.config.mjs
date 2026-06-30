/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // 🔥 Cloudinary domains ko allow karne ke liye
      },
    ],
  },
};

export default nextConfig;