"use client";

import { Wortschatz } from "@/app/types/wortilizer.types";
import WordListColumn from "@/app/components/WordListColumn";

type WordListProps = { wortschatz: Wortschatz };

export default function WordList({ wortschatz }: WordListProps) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-4">
      <WordListColumn article="der" wortschatzEntries={wortschatz["der"]} />
      <WordListColumn article="die" wortschatzEntries={wortschatz["die"]} />
      <WordListColumn article="das" wortschatzEntries={wortschatz["das"]} />
    </div>
  );
}
