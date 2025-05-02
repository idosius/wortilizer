'use client'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'

type WordFormProps = {
  onAddWordAction: (word: string) => void
}

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

function sanitizeWord(word: string) {
  return capitalizeFirstLetter(word.trim())
}

export default function WordForm({ onAddWordAction }: WordFormProps) {
  function handleSubmit(formData: FormData) {
    const word = formData.get('word')

    if (word) {
      const sanitizedWord = sanitizeWord(word as string)
      onAddWordAction(sanitizedWord)
    }
  }

  return (
    <form className="flex gap-2 max-w-screen-sm" action={handleSubmit}>
      <Input
        className="px-4"
        name="word"
        placeholder="Wort eingeben, z.B. Brief"
        required
      />
      <Button className="px-4 py-2" type="submit">
        + Hinzufügen
      </Button>
    </form>
  )
}
