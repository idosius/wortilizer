'use client'

import { Wortschatz } from '@/app/types/wortilizer.types'
import WordListColumn from '@/app/components/WordListColumn'

type WordListProps = { wortschatz: Wortschatz }

export default function WordList({ wortschatz }: WordListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <WordListColumn article="der" wortschatz={wortschatz} />
      <WordListColumn article="die" wortschatz={wortschatz} />
      <WordListColumn article="das" wortschatz={wortschatz} />
    </div>
  )
}
