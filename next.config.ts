import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Enable webpack 5
  future: {
    webpack5: true,
  },
  
  // Enable static exports if needed
  // output: 'export',
};

export default nextConfig;
