import { describe, expect, it, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WortilizerQuiz from '@/components/WortilizerQuiz'
import { GermanNounArticle } from '@/types/wortilizer.types'

// The quiz shuffles the vocab indices via `getRandomIndices` (Fisher–Yates).
// That function has its own unit tests in `src/lib/array.test.ts`; here we
// neutralise it to identity so the quiz walks words in the seeded order.
vi.mock('@/lib/array', () => ({
  getRandomIndices: (n: number) => Array.from({ length: n }, (_, i) => i),
}))

type Pair = [word: string, article: GermanNounArticle]

function seed(pairs: Pair[]) {
  const wortschatz = pairs.map(([word, article]) => ({
    word,
    article,
    createdAt: '2026-01-01T00:00:00.000Z',
  }))
  localStorage.setItem('wortschatz', JSON.stringify(wortschatz))
}

describe('WortilizerQuiz', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the score at zero and shows the first word', () => {
    seed([
      ['Brief', 'der'],
      ['Katze', 'die'],
    ])
    render(<WortilizerQuiz />)

    expect(screen.getByText('✅ Richtig: 0')).toBeInTheDocument()
    expect(screen.getByText('❌ Falsch: 0')).toBeInTheDocument()
    expect(screen.getByRole('article')).toHaveTextContent(/^Brief$/)

    expect(screen.getByRole('button', { name: 'Der' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Die' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Das' })).toBeEnabled()
    expect(screen.getByRole('button', { name: /Nächste bitte/ })).toBeDisabled()
  })

  it('shows the finished screen immediately when the vocab is empty', () => {
    render(<WortilizerQuiz />)

    expect(screen.getByRole('heading', { name: 'Fertig!' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Wiederholen/ })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Der' })
    ).not.toBeInTheDocument()
  })

  it('increments the right score and reveals the word on a correct answer', async () => {
    const user = userEvent.setup()
    seed([['Brief', 'der']])
    render(<WortilizerQuiz />)

    await user.click(screen.getByRole('button', { name: 'Der' }))

    expect(screen.getByText('✅ Richtig: 1')).toBeInTheDocument()
    expect(screen.getByText('❌ Falsch: 0')).toBeInTheDocument()
    expect(screen.getByRole('article')).toHaveTextContent('der Brief')

    // The picked button gains a "✅ " prefix, so it needs a partial match.
    expect(screen.getByRole('button', { name: /Der/ })).toHaveAccessibleName(
      '✅ Der'
    )
    expect(screen.getByRole('button', { name: /Der/ })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Die' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Das' })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Nächste bitte/ })).toBeEnabled()
  })

  it('increments the wrong score and marks the picked button on a wrong answer', async () => {
    const user = userEvent.setup()
    seed([['Brief', 'der']])
    render(<WortilizerQuiz />)

    await user.click(screen.getByRole('button', { name: 'Die' }))

    expect(screen.getByText('✅ Richtig: 0')).toBeInTheDocument()
    expect(screen.getByText('❌ Falsch: 1')).toBeInTheDocument()

    // Only the picked button gains an emoji prefix.
    expect(screen.getByRole('button', { name: /Die/ })).toHaveAccessibleName(
      '❌ Die'
    )
    expect(screen.getByRole('button', { name: 'Der' })).toHaveAccessibleName(
      'Der'
    )
    expect(screen.getByRole('button', { name: 'Das' })).toHaveAccessibleName(
      'Das'
    )

    // The answer card reveals the correct article.
    expect(screen.getByRole('article')).toHaveTextContent('der Brief')
  })

  it('walks the words in order and accumulates the score', async () => {
    const user = userEvent.setup()
    seed([
      ['Brief', 'der'],
      ['Katze', 'die'],
      ['Haus', 'das'],
    ])
    render(<WortilizerQuiz />)

    // First word: Brief (der) — answer correctly.
    expect(screen.getByRole('article')).toHaveTextContent(/^Brief$/)
    await user.click(screen.getByRole('button', { name: 'Der' }))
    await user.click(screen.getByRole('button', { name: /Nächste bitte/ }))

    // Second word: Katze (die) — answer wrongly with "Das".
    expect(screen.getByRole('article')).toHaveTextContent(/^Katze$/)
    await user.click(screen.getByRole('button', { name: 'Das' }))
    await user.click(screen.getByRole('button', { name: /Nächste bitte/ }))

    // Third word: Haus (das) — answer correctly.
    expect(screen.getByRole('article')).toHaveTextContent(/^Haus$/)
    await user.click(screen.getByRole('button', { name: 'Das' }))
    await user.click(screen.getByRole('button', { name: /Nächste bitte/ }))

    // Two correct, one wrong.
    expect(screen.getByText('✅ Richtig: 2')).toBeInTheDocument()
    expect(screen.getByText('❌ Falsch: 1')).toBeInTheDocument()
  })

  it('shows the restart screen after the last word and starts over on restart', async () => {
    const user = userEvent.setup()
    seed([['Brief', 'der']])
    render(<WortilizerQuiz />)

    await user.click(screen.getByRole('button', { name: 'Der' }))
    await user.click(screen.getByRole('button', { name: /Nächste bitte/ }))

    // The quiz is finished: only the restart screen is shown.
    expect(screen.getByRole('heading', { name: 'Fertig!' })).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Der' })
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Wiederholen/ }))

    // Back to the first word with a fresh score.
    expect(screen.getByText('✅ Richtig: 0')).toBeInTheDocument()
    expect(screen.getByText('❌ Falsch: 0')).toBeInTheDocument()
    expect(screen.getByRole('article')).toHaveTextContent(/^Brief$/)
    expect(screen.getByRole('button', { name: 'Der' })).toBeEnabled()
  })

  it('ignores repeated answers on an already-answered card', async () => {
    const user = userEvent.setup()
    seed([['Brief', 'der']])
    render(<WortilizerQuiz />)

    await user.click(screen.getByRole('button', { name: 'Der' }))
    await user.click(screen.getByRole('button', { name: 'Die' }))

    expect(screen.getByText('✅ Richtig: 1')).toBeInTheDocument()
    expect(screen.getByText('❌ Falsch: 0')).toBeInTheDocument()
  })
})
