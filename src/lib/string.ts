export function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Normalizes a user-entered word for dictionary lookup: trims surrounding
 * whitespace, then capitalizes the first letter and lowercases the rest.
 * Returns `undefined` when the input is empty or whitespace-only.
 */
export function sanitizeWord(word: string): string | undefined {
  const trimmedWord = word.trim()
  if (trimmedWord === '') {
    return
  }

  return capitalizeFirstLetter(trimmedWord)
}
