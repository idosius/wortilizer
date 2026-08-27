import { describe, expect, it } from 'vitest'
import { getRandomIndices, moveIndexToFirst } from './array'

describe('moveIndexToFirst', () => {
  it('moves the item at the given index to the front, keeping the rest in order', () => {
    expect(moveIndexToFirst(['a', 'b', 'c', 'd'], 2)).toEqual([
      'c',
      'a',
      'b',
      'd',
    ])
  })

  it('moves the last item to the front', () => {
    expect(moveIndexToFirst(['a', 'b', 'c'], 2)).toEqual(['c', 'a', 'b'])
  })

  it('returns the same array reference when index <= 0', () => {
    const arr = ['a', 'b', 'c']
    expect(moveIndexToFirst(arr, 0)).toBe(arr)
    expect(moveIndexToFirst(arr, -1)).toBe(arr)
  })

  it('does not mutate the input array', () => {
    const arr = ['a', 'b', 'c']
    moveIndexToFirst(arr, 1)
    expect(arr).toEqual(['a', 'b', 'c'])
  })

  it('prepends undefined when the index is out of range (current behavior)', () => {
    expect(moveIndexToFirst(['a', 'b'], 5)).toEqual([undefined, 'a', 'b'])
  })
})

describe('getRandomIndices', () => {
  it('returns a permutation of 0..i-1', () => {
    const result = getRandomIndices(5)
    expect([...result].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4])
  })

  it('returns an empty array for 0', () => {
    expect(getRandomIndices(0)).toEqual([])
  })

  it('returns [0] for 1', () => {
    expect(getRandomIndices(1)).toEqual([0])
  })
})
