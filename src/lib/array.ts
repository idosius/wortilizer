// Reference: ChatGPT
export function moveIndexToFirst<T>(array: T[], index: number): T[] {
  if (index <= 0) return array // Already at front or not found

  const item = array[index]
  const newArray = [...array]
  newArray.splice(index, 1)
  newArray.unshift(item)
  return newArray
}
