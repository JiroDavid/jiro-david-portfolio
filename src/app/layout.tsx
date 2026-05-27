import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Jiro David / Full-Stack Developer',
  description:
    'Full-stack developer building tools for creators and gamers. BSc Computer Science, UAL 2026.',
  openGraph: {
    title: 'Jiro David / Full-Stack Developer',
    description: 'Full-stack developer building tools for creators and gamers.',
    url: 'https://jirodavid.dev',
    siteName: 'Jiro David',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable} style={{ height: '100%' }}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>
      <body className="font-mono antialiased" style={{ height: '100%', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
