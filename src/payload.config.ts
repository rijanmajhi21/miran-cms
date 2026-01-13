import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Boards } from './collections/Boards'
import { BoardImages } from './collections/BoardImages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Get the server URL from environment or use default
const serverURL = process.env.NEXT_PUBLIC_SITE_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || ''

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Miran Gallery',
    },
  },
  collections: [Users, Media, Boards, BoardImages],
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://miranrai.com.np',
    'https://www.miranrai.com.np',
    process.env.NEXT_PUBLIC_SITE_URL || '',
    process.env.FRONTEND_URL || '',
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'https://miranrai.com.np',
    'https://www.miranrai.com.np',
    process.env.NEXT_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    // Supabase Storage (S3-compatible)
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || 'media',
      config: {
        endpoint: process.env.S3_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'ap-southeast-1',
        forcePathStyle: true,
      },
      acl: 'public-read',
      // Generate public URL for Supabase Storage
      generateFileURL: ({ filename }) => {
        const projectRef = process.env.SUPABASE_PROJECT_REF || 'fwcsnhkbxinhqwcgotvo'
        const bucket = process.env.S3_BUCKET || 'media'
        return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${filename}`
      },
    }),
  ],
})
