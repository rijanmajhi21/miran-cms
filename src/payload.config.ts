import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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
    'https://miranrai.com.np',
    'https://www.miranrai.com.np',
    process.env.NEXT_PUBLIC_SITE_URL || '',
    process.env.FRONTEND_URL || '',
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'https://miranrai.com.np',
    'https://www.miranrai.com.np',
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
    // Vercel Blob storage for media uploads (only enabled on Vercel)
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
