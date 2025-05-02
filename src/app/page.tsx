'use client'

import Wortilizer from '@/components/Wortilizer'
import { useIsClient } from '@uidotdev/usehooks'

export default function Home() {
  // Fix "is a client only hook" error
  // Reference: https://github.com/uidotdev/usehooks/issues/218#issuecomment-1681205155
  const isClient = useIsClient()

  return (
    <main className="container mx-auto px-4 py-4 md:py-8">
      {isClient && <Wortilizer />}
    </main>
  )
}
