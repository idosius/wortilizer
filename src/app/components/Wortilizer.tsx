"use client";

import WordForm from "@/app/components/WordForm";
import WordList from "@/app/components/WordList";
import { WortschatzEntry, Wortschatz } from "@/app/types/wortilizer.types";
import { Genders, WordsInfo } from "german-words-dict";
import { getGenderGermanWord } from "german-words";
import GermanWordsList from "german-words-dict/dist/words.json";
import { useLocalStorage } from "@uidotdev/usehooks";

const genderArticles: Record<Genders, WortschatzEntry["article"]> = {
  M: "der",
  F: "die",
  N: "das",
};

function getWordArticle(word: string) {
  try {
    const gender = getGenderGermanWord({}, GermanWordsList as WordsInfo, word);
    return genderArticles[gender];
  } catch {
    return undefined;
  }
}

export default function Wortilizer() {
  const [wortschatz, saveWortschatz] = useLocalStorage<Wortschatz>(
    "wortschatz",
    { der: [], die: [], das: [] },
  );

  function handleAddWordAction(word: string) {
    const article = getWordArticle(word as string);

    if (!article) {
      console.error("Article not found");
      return;
    }

    const articleWortschatz = wortschatz[article];
    if (
      articleWortschatz.find((wortschatzEntry) => wortschatzEntry.word === word)
    ) {
      console.error("Word exists in vocabulary");
      return;
    }

    const wortschatzEntry: WortschatzEntry = {
      word,
      article,
      createdAt: new Date().toISOString(),
    };
    const newWortschatz: Wortschatz = {
      ...wortschatz,
      [article]: [wortschatzEntry, ...articleWortschatz],
    };
    saveWortschatz(newWortschatz);
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl mb-2">Wörtilizer</h1>
        <p>Zaps your German vocab into shape, one word at a time ⚡🇩🇪</p>
      </header>
      <WordForm onAddWordAction={handleAddWordAction} />
      <WordList wortschatz={wortschatz} />
    </div>
  );
}
