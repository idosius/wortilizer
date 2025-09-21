'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Wortilizer = dynamic(() => import('@/components/Wortilizer'), {
  ssr: false,
})

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wortilizer />
    </Suspense>
  )
}
