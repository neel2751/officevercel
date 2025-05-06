/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@tanstack/react-query"], // for react-query
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: 1024 * 1024 * 10, // 10MB
    },
  },
};

export default nextConfig;
