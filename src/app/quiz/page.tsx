'use client'

import dynamic from 'next/dynamic'

const WortilizerQuiz = dynamic(() => import('@/components/WortilizerQuiz'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function HomePage() {
  return <WortilizerQuiz />
}
