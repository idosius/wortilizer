import { Wortschatz } from '@/types/wortilizer.types'
import WordCard from '@/components/WordCard'

type WordListProps = { wortschatz: Wortschatz }

export default function WordList({ wortschatz }: WordListProps) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {wortschatz.map((wortschatzEntry, i) => (
        <WordCard
          key={wortschatzEntry.word}
          wortschatzEntry={wortschatzEntry}
          animate={i === 0}
        />
      ))}
    </div>
  )
}
