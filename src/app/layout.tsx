import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wörtilizer',
  description: 'Zaps your German vocab into shape ⚡🇩🇪',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-4 md:py-8">
        <header className="flex flex-col gap-2 mb-4">
          <h1 className="text-4xl">
            <Link href="/">Wörtilizer</Link>
          </h1>
          <p>Zaps your German vocab into shape ⚡🇩🇪</p>
          <nav>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
            >
              Home
            </Link>{' '}
            |{' '}
            <Link
              href="/quiz"
              className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
            >
              Quiz
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
