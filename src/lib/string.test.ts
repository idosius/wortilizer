import { describe, expect, it } from 'vitest'
import { capitalizeFirstLetter, sanitizeWord } from './string'

describe('capitalizeFirstLetter', () => {
  it('upper-cases the first letter and lower-cases the rest', () => {
    expect(capitalizeFirstLetter('bRIEF')).toBe('Brief')
  })

  it('leaves an already-capitalized word unchanged', () => {
    expect(capitalizeFirstLetter('Brief')).toBe('Brief')
  })

  it('handles a single character', () => {
    expect(capitalizeFirstLetter('a')).toBe('A')
  })
})

describe('sanitizeWord', () => {
  it('trims surrounding whitespace', () => {
    expect(sanitizeWord('  brief  ')).toBe('Brief')
  })

  it('normalizes casing', () => {
    expect(sanitizeWord('bRiEf')).toBe('Brief')
  })

  it('returns undefined for an empty string', () => {
    expect(sanitizeWord('')).toBeUndefined()
  })

  it('returns undefined for a whitespace-only string', () => {
    expect(sanitizeWord('   ')).toBeUndefined()
  })
})
