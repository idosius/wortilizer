"use client";

import { GermanWord } from "@/app/types/word.types";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function WordList() {
  const [germanWords] = useLocalStorage<GermanWord[]>("germanWords", []);

  return (
    <ul>
      {germanWords.map(({ article, word }) => (
        <li key={word}>
          {article} {word}
        </li>
      ))}
    </ul>
  );
}
