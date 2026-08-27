'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { sanitizeWord } from '@/lib/string'
import { useState } from 'react'

type WordFormProps = {
  onAddWordAction: (word: string) => void
}

export default function WordForm({ onAddWordAction }: WordFormProps) {
  const [error, setError] = useState<string>()

  function handleSubmit(formData: FormData) {
    const word = formData.get('word')
    if (!word || typeof word !== 'string') {
      return
    }

    try {
      const sanitizedWord = sanitizeWord(word)
      if (!sanitizedWord) {
        return
      }
      onAddWordAction(sanitizedWord)
    } catch (error) {
      const fehler = String(error).replace('Error', 'Fehler')
      setError(fehler)
    }
  }

  function handleChange() {
    setError(undefined)
  }

  return (
    <form className="flex flex-col gap-1 max-w-screen-sm" action={handleSubmit}>
      <div className="flex gap-2">
        <Input
          name="word"
          placeholder="Wort eingeben, z.B. Brief"
          required
          onChange={handleChange}
        />
        <Button className="px-4 py-2" type="submit">
          + Hinzufügen
        </Button>
      </div>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="text-sm h-7 md:h-5"
      >
        {error && <span>❌ {error}</span>}
      </div>
    </form>
  )
}
