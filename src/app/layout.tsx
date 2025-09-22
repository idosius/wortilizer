import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Wörtilizer',
  description: 'Zaps your German vocab into shape ⚡🇩🇪',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-4 md:py-8 min-h-screen flex flex-col gap-4">
        <header className="flex gap-4 items-baseline">
          <h1 className="text-2xl md:text-4xl leading-none">
            <Link href="/">Wörtilizer</Link>
          </h1>
          <nav className="flex gap-2">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
            >
              Home
            </Link>
            <span>|</span>
            <Link
              href="/quiz"
              className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
            >
              Quiz
            </Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="my-4 text-sm text-center">
          <a
            href="https://github.com/idosius/wortilizer"
            className="text-blue-600 underline"
          >
            View on GitHub
          </a>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
