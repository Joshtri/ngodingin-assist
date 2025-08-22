/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⛔️ Abaikan error TypeScript saat build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
