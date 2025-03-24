import WordForm from "@/app/components/WordForm";
import WordList from "@/app/components/WordList";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-4 flex flex-col gap-4">
      <h1 className="text-4xl">Wörtilizer</h1>
      <WordForm />
      <WordList />
    </main>
  );
}
