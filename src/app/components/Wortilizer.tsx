'use client'

import WordForm from '@/app/components/WordForm'
import WordList from '@/app/components/WordList'
import { WortschatzEntry, Wortschatz } from '@/app/types/wortilizer.types'
import { Genders, WordsInfo } from 'german-words-dict'
import { getGenderGermanWord } from 'german-words'
import GermanWordsList from 'german-words-dict/dist/words.json'
import { useLocalStorage } from '@uidotdev/usehooks'

const genderArticles: Record<Genders, WortschatzEntry['article']> = {
  M: 'der',
  F: 'die',
  N: 'das',
}

function getWordArticle(word: string) {
  try {
    const gender = getGenderGermanWord({}, GermanWordsList as WordsInfo, word)
    return genderArticles[gender]
  } catch {
    return undefined
  }
}

export default function Wortilizer() {
  const [wortschatz, saveWortschatz] = useLocalStorage<Wortschatz>(
    'wortschatz',
    []
  )

  function handleAddWordAction(word: string) {
    const article = getWordArticle(word as string)

    if (!article) {
      console.error('Article not found')
      return
    }

    // If a word is already in the vocab, move it to first position
    const foundWortschatzEntry = wortschatz.find(
      (wortschatzEntry) => wortschatzEntry.word === word
    )
    if (foundWortschatzEntry) {
      saveWortschatz((prevWortschatz) => {
        const restPrevWortschatz = prevWortschatz.filter(
          (wortschatzEntry) => wortschatzEntry.word !== word
        )
        return [foundWortschatzEntry, ...restPrevWortschatz]
      })
      return
    }

    // All good, just add the word
    const wortschatzEntry: WortschatzEntry = {
      word,
      article,
      createdAt: new Date().toISOString(),
    }

    saveWortschatz([wortschatzEntry, ...wortschatz])
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <header>
        <h1 className="text-4xl mb-2">Wörtilizer</h1>
        <p>Zaps your German vocab into shape ⚡🇩🇪</p>
      </header>
      <WordForm onAddWordAction={handleAddWordAction} />
      <WordList wortschatz={wortschatz} />
    </div>
  )
}
