import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose image base URL to client
  env: {
    NEXT_PUBLIC_IMAGE_BASE_URL:
      process.env.IMAGE_BASE_URL ||
      'https://fwcsnhkbxinhqwcgotvo.supabase.co/storage/v1/object/public/media',
  },
  // Increase body size limit for file uploads (default is 1MB)
  serverActions: {
    bodySizeLimit: '5mb',
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  // Allow images from Supabase Storage (both domains)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.storage.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'fwcsnhkbxinhqwcgotvo.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'fwcsnhkbxinhqwcgotvo.storage.supabase.co',
      },
    ],
  },
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
