"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

type WordFormProps = {
  onAddWordAction: (word: string) => void;
};

export default function WordForm({ onAddWordAction }: WordFormProps) {
  function handleSubmit(formData: FormData) {
    const word = formData.get("word");
    if (word) {
      onAddWordAction(word as string);
    }
  }

  return (
    <form className="flex gap-2 max-w-screen-sm" action={handleSubmit}>
      <Input
        className="px-4"
        name="word"
        placeholder="Deutsches Wort eingeben"
        required
      />
      <Button className="px-4 py-2" type="submit">
        + Wort
      </Button>
    </form>
  );
}
