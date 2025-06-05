/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Webpack configuration
  webpack: (config) => {
    // Add any webpack configurations here if needed
    return config;
  },
  
  // Experimental features (enable only what you need)
  experimental: {
    // Enable the new React compiler if needed
    // reactCompiler: true,
    
    // Enable server actions with proper type
    serverActions: {
      bodySizeLimit: '2mb',
    },
    
    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
    ],
  },
  
  // Enable static exports if needed
  // output: 'export',
};

module.exports = nextConfig;
