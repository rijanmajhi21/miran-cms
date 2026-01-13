import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
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

// Supabase S3 configuration
const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF || ''
const s3Bucket = process.env.S3_BUCKET || 'media'
const s3Endpoint = process.env.S3_ENDPOINT || ''
const s3Region = process.env.S3_REGION || 'ap-southeast-1'

// Create S3 client for Supabase Storage
const getS3Client = () =>
  new S3Client({
    endpoint: s3Endpoint,
    region: s3Region,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true,
  })

// Generate public URL for Supabase Storage
const getPublicUrl = (fname: string) =>
  `https://${supabaseProjectRef}.supabase.co/storage/v1/object/public/${s3Bucket}/${fname}`

// Custom Supabase storage adapter
const supabaseStorageAdapter: Adapter = ({
  collection,
  prefix,
}: {
  collection: CollectionConfig
  prefix?: string
}): GeneratedAdapter => ({
  name: 'supabase-s3',

  // Generate public URL for Supabase Storage
  generateURL: ({ filename: fname }) => {
    const key = prefix ? `${prefix}/${fname}` : fname
    return getPublicUrl(key)
  },

  // Handle file uploads to Supabase S3
  handleUpload: async ({ file }) => {
    const client = getS3Client()
    const key = prefix ? `${prefix}/${file.filename}` : file.filename
    await client.send(
      new PutObjectCommand({
        Bucket: s3Bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimeType,
      }),
    )
  },

  // Handle file deletion from Supabase S3
  handleDelete: async ({ filename: fname }) => {
    const client = getS3Client()
    const key = prefix ? `${prefix}/${fname}` : fname
    await client.send(
      new DeleteObjectCommand({
        Bucket: s3Bucket,
        Key: key,
      }),
    )
  },

  // Static handler - redirect to public URL or proxy the file
  staticHandler: async (req, { params: { filename: fname } }) => {
    const key = prefix ? `${prefix}/${fname}` : fname
    const publicUrl = getPublicUrl(key)

    // Redirect to the public Supabase URL
    return Response.redirect(publicUrl, 302)
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
        },
      },
    }),
  ],
})
