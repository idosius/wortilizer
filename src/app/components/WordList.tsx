'use client'

import { Wortschatz } from '@/app/types/wortilizer.types'
import WordCard from '@/app/components/WordCard'

type WordListProps = { wortschatz: Wortschatz }

export default function WordList({ wortschatz }: WordListProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
      {wortschatz.map((wortschatzEntry) => (
        <WordCard
          key={wortschatzEntry.word}
          wortschatzEntry={wortschatzEntry}
        />
      ))}
    </div>
  )
}
