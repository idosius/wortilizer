import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Wortilizer from '@/components/Wortilizer'

const PLACEHOLDER = 'Wort eingeben, z.B. Brief'
const SUBMIT = '+ Hinzufügen'

function getCardTexts(): string[] {
  return screen
    .queryAllByRole('article')
    .map((el) => (el.textContent ?? '').replace(/\s+/g, ' ').trim())
}

describe('Wortilizer', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows an empty state before any words are added', () => {
    render(<Wortilizer />)

    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: SUBMIT })).toBeInTheDocument()
    expect(screen.queryAllByRole('article')).toHaveLength(0)
  })

  it('adds a word and shows its card', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Brief')
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    expect(await screen.findByText('der Brief')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toHaveValue('')
  })

  it('sanitizes the entered word', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), '  bRiEf  ')
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    expect(await screen.findByText('der Brief')).toBeInTheDocument()
  })

  it('shows each noun with its correct article', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    for (const word of ['Mann', 'Frau', 'Haus']) {
      await user.clear(screen.getByPlaceholderText(PLACEHOLDER))
      await user.type(screen.getByPlaceholderText(PLACEHOLDER), word)
      await user.click(screen.getByRole('button', { name: SUBMIT }))
    }

    await waitFor(() =>
      expect(getCardTexts()).toEqual(['das Haus', 'die Frau', 'der Mann'])
    )
  })

  it('shows the newest word first', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    for (const word of ['Haus', 'Katze']) {
      await user.clear(screen.getByPlaceholderText(PLACEHOLDER))
      await user.type(screen.getByPlaceholderText(PLACEHOLDER), word)
      await user.click(screen.getByRole('button', { name: SUBMIT }))
    }

    await waitFor(() =>
      expect(getCardTexts()).toEqual(['die Katze', 'das Haus'])
    )
  })

  it('moves an existing word to the front instead of adding it twice', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    for (const word of ['Brief', 'Haus', 'Brief']) {
      await user.clear(screen.getByPlaceholderText(PLACEHOLDER))
      await user.type(screen.getByPlaceholderText(PLACEHOLDER), word)
      await user.click(screen.getByRole('button', { name: SUBMIT }))
    }

    await waitFor(() =>
      expect(getCardTexts()).toEqual(['der Brief', 'das Haus'])
    )
  })

  it('treats differently-cased input as the same word', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    for (const word of ['Brief', 'Haus', '  brief  ']) {
      await user.clear(screen.getByPlaceholderText(PLACEHOLDER))
      await user.type(screen.getByPlaceholderText(PLACEHOLDER), word)
      await user.click(screen.getByRole('button', { name: SUBMIT }))
    }

    await waitFor(() =>
      expect(getCardTexts()).toEqual(['der Brief', 'das Haus'])
    )
  })

  it('shows a German error for a word that is not in the dictionary', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Xyzabc')
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    const alert = await screen.findByRole('alert')
    await waitFor(() =>
      expect(alert).toHaveTextContent(
        '"Xyzabc" wurde im Wörterbuch nicht gefunden.'
      )
    )
    expect(alert).not.toHaveTextContent('Error')
    expect(screen.queryAllByRole('article')).toHaveLength(0)
  })

  it('keeps existing words when an add fails', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Brief')
    await user.click(screen.getByRole('button', { name: SUBMIT }))
    await screen.findByText('der Brief')

    await user.clear(screen.getByPlaceholderText(PLACEHOLDER))
    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Xyzabc')
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Fehler')
    )
    expect(getCardTexts()).toEqual(['der Brief'])
  })

  it('hides the error once the user edits the input', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Xyzabc')
    await user.click(screen.getByRole('button', { name: SUBMIT }))
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Fehler')
    )

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'B')

    expect(screen.getByRole('alert')).toHaveTextContent('')
  })

  it('ignores a whitespace-only submission', async () => {
    const user = userEvent.setup()
    render(<Wortilizer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), '   ')
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    await waitFor(() => {
      const alert = screen.getByRole('alert')
      expect(alert).toHaveTextContent('')
      expect(alert).not.toHaveTextContent('TypeError')
    })
    expect(screen.queryAllByRole('article')).toHaveLength(0)
  })

  it('still shows the words after remounting', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<Wortilizer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Brief')
    await user.click(screen.getByRole('button', { name: SUBMIT }))
    await screen.findByText('der Brief')

    unmount()
    render(<Wortilizer />)

    expect(screen.getByText('der Brief')).toBeInTheDocument()
  })
})
