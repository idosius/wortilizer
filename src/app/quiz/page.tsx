'use client'

import { useIsClient } from '@uidotdev/usehooks'
import WortilizerQuiz from '@/components/WortilizerQuiz'

export default function HomePage() {
  // Fix "is a client only hook" error
  // Reference: https://github.com/uidotdev/usehooks/issues/218#issuecomment-1681205155
  const isClient = useIsClient()

  return <>{isClient && <WortilizerQuiz />}</>
}
