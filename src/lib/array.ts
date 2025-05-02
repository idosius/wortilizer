// Reference: ChatGPT
export function moveIndexToFirst<T>(array: T[], index: number): T[] {
  if (index <= 0) return array // Already at front or not found

  const item = array[index]
  const newArray = [...array]
  newArray.splice(index, 1)
  newArray.unshift(item)
  return newArray
}

// Reference: ChatGPT
export function getRandomIndices(i: number): number[] {
  const indices = Array.from({ length: i }, (_, index) => index)

  // Fisher-Yates shuffle
  for (let j = indices.length - 1; j > 0; j--) {
    const rand = Math.floor(Math.random() * (j + 1))
    ;[indices[j], indices[rand]] = [indices[rand], indices[j]]
  }

  return indices
}
