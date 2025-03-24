import {
  GermanNounArticle,
  WortschatzEntry,
} from "@/app/types/wortilizer.types";

type WordListProps = {
  article: GermanNounArticle;
  wortschatzEntries: WortschatzEntry[];
};

const articleToClassName: Record<GermanNounArticle, string> = {
  der: "bg-blue-100",
  die: "bg-red-100",
  das: "bg-green-100",
};

export default function WordListColumn({
  article,
  wortschatzEntries,
}: WordListProps) {
  return (
    <section
      className={`flex flex-col gap-2 ${articleToClassName[article]} pt-2 pb-4 px-4 rounded-2xl`}
    >
      <h2 className="text-2xl underline">{article}</h2>
      <ul className="flex flex-col gap-2">
        {wortschatzEntries.map(({ word }) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </section>
  );
}
