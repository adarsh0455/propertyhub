import type { NextConfig } from "next";
import "dotenv/config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['10.201.234.243', 'localhost:3000']
};

export default nextConfig;