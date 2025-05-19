/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Disable caching during development
    disableOptimizedLoading: true,
    optimizeCss: false,
  },
  // Force full page refreshes instead of React Fast Refresh
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Disable React Fast Refresh
      config.cache = false;
    }
    return config;
  },
}

export default nextConfig;
