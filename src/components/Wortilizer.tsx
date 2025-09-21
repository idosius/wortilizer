'use client'

import WordForm from '@/components/WordForm'
import WordList from '@/components/WordList'
import { WortschatzEntry, Wortschatz } from '@/types/wortilizer.types'
import { Genders, WordsInfo } from 'german-words-dict'
import { getGenderGermanWord } from 'german-words'
import GermanWordsList from 'german-words-dict/dist/words.json'
import { useLocalStorage } from 'usehooks-ts'
import { moveIndexToFirst } from '@/lib/array'

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
    const article = getWordArticle(word)

    if (!article) {
      throw new Error(`"${word}" wurde im Wörterbuch nicht gefunden.`)
    }

    // If a word is already in the vocab, move it to first position
    const wortschatzEntryIndex = wortschatz.findIndex(
      (wortschatzEntry) => wortschatzEntry.word === word
    )
    if (wortschatzEntryIndex >= 0) {
      saveWortschatz((prevWortschatz) =>
        moveIndexToFirst(prevWortschatz, wortschatzEntryIndex)
      )
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
    <div className="flex flex-col gap-4">
      <WordForm onAddWordAction={handleAddWordAction} />
      <WordList wortschatz={wortschatz} />
    </div>
  )
}
