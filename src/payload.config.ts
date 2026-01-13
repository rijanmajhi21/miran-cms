import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Boards } from './collections/Boards'
import { BoardImages } from './collections/BoardImages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ============ SUPABASE STORAGE CONFIG ============
// IMPORTANT: Set these in your environment variables!
const S3_BUCKET = process.env.S3_BUCKET || 'media'
const S3_ENDPOINT = process.env.S3_ENDPOINT || ''
const S3_REGION = process.env.S3_REGION || 'ap-southeast-1'
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY_ID || ''
const S3_SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY || ''

// Public URL base - THIS IS THE KEY SETTING!
// Format: https://[project-ref].supabase.co/storage/v1/object/public/[bucket]
const IMAGE_BASE_URL =
  process.env.IMAGE_BASE_URL ||
  'https://fwcsnhkbxinhqwcgotvo.supabase.co/storage/v1/object/public/media'

// Create S3 client
const getS3Client = () =>
  new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    },
    forcePathStyle: true,
  })

// Custom Supabase storage adapter
const supabaseStorageAdapter: Adapter = ({
  prefix,
}: {
  collection: CollectionConfig
  prefix?: string
}): GeneratedAdapter => ({
  name: 'supabase-s3',

  // Generate public URL - returns FULL Supabase URL
  generateURL: ({ filename: fname }) => {
    const key = prefix ? `${prefix}/${fname}` : fname
    return `${IMAGE_BASE_URL}/${key}`
  },

  // Upload file to Supabase S3
  handleUpload: async ({ file }) => {
    const client = getS3Client()
    const key = prefix ? `${prefix}/${file.filename}` : file.filename
    await client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimeType,
      }),
    )
  },

  // Delete file from Supabase S3
  handleDelete: async ({ filename: fname }) => {
    const client = getS3Client()
    const key = prefix ? `${prefix}/${fname}` : fname
    await client.send(
      new DeleteObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
      }),
    )
  },

  // Static handler - redirect to public Supabase URL
  staticHandler: async (req, { params: { filename: fname } }) => {
    const key = prefix ? `${prefix}/${fname}` : fname
    return Response.redirect(`${IMAGE_BASE_URL}/${key}`, 302)
  },
})

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
    // Supabase Storage with custom adapter
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: supabaseStorageAdapter,
          disableLocalStorage: true,
          disablePayloadAccessControl: true, // Use adapter's URL, not Payload's
        },
      },
    }),
  ],
})
