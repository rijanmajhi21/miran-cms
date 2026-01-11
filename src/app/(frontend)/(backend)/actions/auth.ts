'use server'

import { cookies, headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

// Payload's default cookie name for JWT token
const PAYLOAD_TOKEN_COOKIE = 'payload-token'

export interface AuthUser {
  id: string
  email: string
}

export interface AuthResult {
  success: boolean
  error?: string
  user?: AuthUser
}

// Check if user is logged in using Payload's native auth
export async function getSession(): Promise<AuthUser | null> {
  try {
    const payload = await getPayload({ config })
    const headersList = await headers()

    // Get the payload-token cookie
    const cookieStore = await cookies()
    const token = cookieStore.get(PAYLOAD_TOKEN_COOKIE)?.value

    if (!token) return null

    // Create a headers object with the cookie for auth verification
    const reqHeaders = new Headers()
    reqHeaders.set('Cookie', `${PAYLOAD_TOKEN_COOKIE}=${token}`)

    // Use Payload's auth method to verify the token
    const { user } = await payload.auth({ headers: reqHeaders })

    if (!user) return null

    return {
      id: String(user.id),
      email: user.email,
    }
  } catch (error) {
    console.error('Session check error:', error)
    return null
  }
}

// Logout user - clears Payload's token cookie
export async function logout(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies()
    // Delete Payload's auth cookie
    cookieStore.delete(PAYLOAD_TOKEN_COOKIE)
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false }
  }
}
