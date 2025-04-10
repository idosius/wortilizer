import {
  GermanNounArticle,
  WortschatzEntry,
} from '@/app/types/wortilizer.types'

type WordCardProps = {
  wortschatzEntry: WortschatzEntry
  animate?: boolean
}

// Tailwind class names need to be explicitly coded to be included in the CSS code
const articleToClassName: Record<GermanNounArticle, string> = {
  der: 'border-blue-200 bg-blue-100 hover:bg-blue-300 text-blue-900',
  die: 'border-pink-200 bg-pink-100 hover:bg-pink-300 text-pink-900',
  das: 'border-green-200 bg-green-100 hover:bg-green-300 text-green-900',
}

export default function WordCard({
  wortschatzEntry: { article, word },
  animate,
}: WordCardProps) {
  return (
    <article
      className={`flex justify-center items-center aspect-video text-xl sm:text-2xl text-blue-900 capitalize border transition-all ${articleToClassName[article]} ${animate ? 'animate-wiggle' : ''}`}
    >
      {article} {word}
    </article>
  )
}
