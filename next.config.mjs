import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose Supabase storage config to client
  env: {
    NEXT_PUBLIC_SUPABASE_PROJECT_REF: process.env.SUPABASE_PROJECT_REF || 'fwcsnhkbxinhqwcgotvo',
    NEXT_PUBLIC_S3_BUCKET: process.env.S3_BUCKET || 'media',
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
  // Allow images from Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'fwcsnhkbxinhqwcgotvo.supabase.co',
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
