'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'

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
  const [error, setError] = useState<string>()

  function handleSubmit(formData: FormData) {
    const word = formData.get('word')
    if (!word) {
      return
    }

    try {
      const sanitizedWord = sanitizeWord(word as string)
      onAddWordAction(sanitizedWord)
    } catch (e) {
      setError(String(e).replace('Error', 'Fehler'))
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
        className="text-sm h-5"
      >
        {error && <span>❌ {error}</span>}
      </div>
    </form>
  )
}
