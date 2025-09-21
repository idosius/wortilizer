'use client'

import dynamic from 'next/dynamic'

const Wortilizer = dynamic(() => import('@/components/Wortilizer'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function HomePage() {
  return <Wortilizer />
}
