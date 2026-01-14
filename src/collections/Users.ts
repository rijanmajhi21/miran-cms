import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    // Session lasts 30 days (in seconds)
    tokenExpiration: 60 * 60 * 24 * 30, // 2,592,000 seconds = 30 days
    // Keep user logged in across browser sessions
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
