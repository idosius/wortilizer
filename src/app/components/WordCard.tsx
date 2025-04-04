import {
  GermanNounArticle,
  WortschatzEntry,
} from '@/app/types/wortilizer.types'

type WordCardProps = {
  wortschatzEntry: WortschatzEntry
}

// Tailwind class names need to be explicitly coded to be included in the CSS code
const articleToClassName: Record<GermanNounArticle, string> = {
  der: 'border-blue-200 bg-blue-100 hover:bg-blue-300 text-blue-900',
  die: 'border-red-200 bg-red-100 hover:bg-red-300 text-red-900',
  das: 'border-green-200 bg-green-100 hover:bg-green-300 text-green-900',
}

export default function WordCard({
  wortschatzEntry: { article, word },
}: WordCardProps) {
  return (
    <article
      className={`flex rounded justify-center items-center h-30 text-2xl text-blue-900 capitalize border ${articleToClassName[article]}`}
    >
      {article} {word}
    </article>
  )
}
