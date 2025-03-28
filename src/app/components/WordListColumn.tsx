import { GermanNounArticle, Wortschatz } from '@/app/types/wortilizer.types'

type WordListProps = {
  article: GermanNounArticle
  wortschatz: Wortschatz
}

const articleToClassName: Record<GermanNounArticle, string> = {
  der: 'bg-blue-100',
  die: 'bg-red-100',
  das: 'bg-green-100',
}

const articleToBullet: Record<GermanNounArticle, string> = {
  der: '🔵',
  die: '🔴',
  das: '🟢',
}

export default function WordListColumn({ article, wortschatz }: WordListProps) {
  const currentWortschatz = wortschatz[article]

  return (
    <section
      className={`flex flex-col gap-2 ${articleToClassName[article]} pt-2 pb-4 px-4 rounded-2xl`}
    >
      <header className="flex items-center justify-between">
        <h2 className="text-2xl underline">{article}</h2>
        <p className="text-sm">({currentWortschatz.length})</p>
      </header>
      {currentWortschatz.length === 0 && <p>Nothing words here yet</p>}
      {currentWortschatz.length > 0 && (
        <ul className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
          {currentWortschatz.map(({ word }) => (
            <li key={word}>
              {articleToBullet[article]} {article} {word}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
