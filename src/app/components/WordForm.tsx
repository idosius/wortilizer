"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useLocalStorage } from "@uidotdev/usehooks";
import { GermanWord } from "@/app/types/word.types";
import { Genders, WordsInfo } from "german-words-dict";
import { getGenderGermanWord } from "german-words";
import GermanWordsList from "german-words-dict/dist/words.json";

const genderArticles: Record<Genders, GermanWord["article"]> = {
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

export default function WordForm() {
  const [germanWords, saveGermanWords] = useLocalStorage<GermanWord[]>(
    "germanWords",
    [],
  );

  function handleSubmit(formData: FormData) {
    const word = formData.get("word");
    if (!word) {
      console.error("No word submitted");
    }

    if (germanWords.find((germanWord) => germanWord.word === word)) {
      console.error("Word exists in vocabulary");
      return;
    }
    const article = getWordArticle(word as string);

    if (!article) {
      console.error("Article not found");
      return;
    }

    const germanWord: GermanWord = {
      word: word as string,
      article,
      createdAt: new Date().toISOString(),
    };
    saveGermanWords([germanWord, ...germanWords]);
  }

  return (
    <form className="flex gap-2 max-w-screen-sm" action={handleSubmit}>
      <Input
        className="px-4"
        name="word"
        placeholder="Deutsches Wort eingeben"
      />
      <Button className="px-4 py-2" type="submit">
        + Wort
      </Button>
    </form>
  );
}
