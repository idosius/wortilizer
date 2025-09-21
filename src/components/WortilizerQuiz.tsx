import { useLocalStorage } from 'usehooks-ts'
import {
  GermanNounArticle,
  Wortschatz,
  WortschatzEntry,
} from '@/types/wortilizer.types'
import { useMemo, useState } from 'react'
import { getRandomIndices } from '@/lib/array'
import { Button } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import WordCard from '@/components/WordCard'

type Score = {
  richtig: number
  falsch: number
}

export default function WortilizerQuiz() {
  const [wortschatz] = useLocalStorage<Wortschatz>('wortschatz', [])
  const quizIndices = useMemo(
    () => getRandomIndices(wortschatz.length),
    [wortschatz.length]
  )
  const [score, setScore] = useState<Score>({ richtig: 0, falsch: 0 })
  const [index, setIndex] = useState<number>(0)
  const [answerArticle, setAnswerArticle] = useState<
    GermanNounArticle | undefined
  >()

  const wortschatzIndex = quizIndices[index]

  function handleArticleClick(
    wortschatzEntry: WortschatzEntry,
    article: GermanNounArticle
  ) {
    if (answerArticle) {
      return
    }

    setAnswerArticle(article)
    const isRight = article === wortschatzEntry.article
    if (isRight) {
      setScore((prevScore) => ({
        ...prevScore,
        richtig: prevScore.richtig + 1,
      }))
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        falsch: prevScore.falsch + 1,
      }))
    }
  }

  function getArticleButtonEmoji(
    wortschatzEntry: WortschatzEntry,
    article: GermanNounArticle
  ) {
    if (article !== answerArticle) {
      return null
    }

    return article === wortschatzEntry.article ? '✅ ' : '❌ '
  }

  function handleNextClick() {
    setAnswerArticle(undefined)
    setIndex((prevIndex) => prevIndex + 1)
  }

  function handleRestartClick() {
    setAnswerArticle(undefined)
    setScore({ richtig: 0, falsch: 0 })
    setIndex(0)
  }

  return (
    <div className="flex flex-col gap-2 max-w-[300px]">
      <div className="flex gap-4">
        <span>✅ Richtig: {score.richtig}</span>
        <span>❌ Falsch: {score.falsch}</span>
      </div>

      {index < wortschatz.length && (
        <>
          {!answerArticle && <Card>{wortschatz[wortschatzIndex].word}</Card>}
          {answerArticle && (
            <WordCard wortschatzEntry={wortschatz[wortschatzIndex]} />
          )}
          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={!!answerArticle}
              onClick={() =>
                handleArticleClick(wortschatz[wortschatzIndex], 'der')
              }
            >
              {getArticleButtonEmoji(wortschatz[wortschatzIndex], 'der')}
              Der
            </Button>
            <Button
              className="flex-1"
              disabled={!!answerArticle}
              onClick={() =>
                handleArticleClick(wortschatz[wortschatzIndex], 'die')
              }
            >
              {getArticleButtonEmoji(wortschatz[wortschatzIndex], 'die')}
              Die
            </Button>
            <Button
              className="flex-1"
              disabled={!!answerArticle}
              onClick={() =>
                handleArticleClick(wortschatz[wortschatzIndex], 'das')
              }
            >
              {getArticleButtonEmoji(wortschatz[wortschatzIndex], 'das')}
              Das
            </Button>
          </div>
          <Button disabled={!answerArticle} onClick={handleNextClick}>
            ➡️ Nächste bitte!
          </Button>
        </>
      )}
      {index === wortschatz.length && (
        <>
          <h3 className="text-xl">Fertig!</h3>
          <Button onClick={handleRestartClick}>🔄 Wiederholen?</Button>
        </>
      )}
    </div>
  )
}
