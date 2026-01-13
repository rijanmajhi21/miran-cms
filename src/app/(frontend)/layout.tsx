import { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import '@/assets/app.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miran.com.np'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Miran Photography | Professional Photographer in Nepal',
    template: '%s | Miran Photography',
  },
  description:
    'Professional photography services in Nepal. Specializing in landscape photography, portraits, concerts, and travel photography. Capturing moments that tell your story.',
  keywords: [
    'photography',
    'photographer',
    'Nepal photographer',
    'landscape photography',
    'portrait photography',
    'concert photography',
    'travel photography',
    'Kathmandu photographer',
    'professional photographer',
    'photo gallery',
    'Miran',
  ],
  authors: [{ name: 'Miran', url: siteUrl }],
  creator: 'Miran',
  publisher: 'Miran Photography',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Miran Photography',
    title: 'Miran Photography | Professional Photographer in Nepal',
    description:
      'Professional photography services in Nepal. Specializing in landscape photography, portraits, concerts, and travel photography.',
    images: [
      {
        url: '/featured-images/landscape.jpg',
        width: 1200,
        height: 630,
        alt: 'Miran Photography - Capturing Moments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miran Photography | Professional Photographer in Nepal',
    description:
      'Professional photography services in Nepal. Specializing in landscape, portrait, and travel photography.',
    images: ['/featured-images/landscape.jpg'],
    creator: '@miranphoto',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className="bg-pure-white overflow-x-hidden">{children}</body>
    </html>
  )
}
