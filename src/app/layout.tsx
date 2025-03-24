import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
