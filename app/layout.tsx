import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Esteros del Iberá — Guided Nature Experiences',
  description:
    'Discover the Iberá Wetlands with an expert park ranger. Authentic eco-tourism, wildlife encounters, and conservation-driven travel experiences in Corrientes, Argentina.',
  keywords: [
    'Iberá Wetlands',
    'Esteros del Iberá',
    'eco-tourism Argentina',
    'park ranger',
    'wildlife tours',
    'nature experiences',
    'Corrientes',
    'rewilding',
  ],
}

export const viewport: Viewport = {
  themeColor: '#3a5a40',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es" className={`${dmSans.variable} ${playfair.variable}`}>
        <body className="font-sans antialiased">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: 'var(--font-dm-sans), sans-serif',
              },
            }}
            richColors
            closeButton
          />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
