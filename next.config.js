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
      },
    ],
  },

  // Webpack configuration
  webpack: (config) => {
    // Add any webpack configurations here if needed
    return config;
  },

  // Experimental features
  experimental: {
    // Server actions configuration
    serverActions: {
      bodySizeLimit: 2 * 1024 * 1024, // 2MB in bytes
    },

    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
    ],
  },

  // File extensions to consider for pages
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // Enable production source maps
  productionBrowserSourceMaps: true,

  // Configure output type
  output: 'standalone',

  // Static page generation timeout (in seconds)
  staticPageGenerationTimeout: 1000,

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Compiler options
  compiler: {
    // Enable styled-components support
    styledComponents: true,
  },

  // Disable the static directory in favor of the app directory
  useFileSystemPublicRoutes: false,

  // Enable ESLint during build
  eslint: {
    ignoreDuringBuilds: false,
  }
};

module.exports = nextConfig;
