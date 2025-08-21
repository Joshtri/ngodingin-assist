/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    // ⛔️ Abaikan error TypeScript saat build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
