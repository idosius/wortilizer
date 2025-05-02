export type GermanNounArticle = 'der' | 'die' | 'das'

export type WortschatzEntry = {
  word: string
  article: GermanNounArticle
  createdAt: string
}

export type Wortschatz = WortschatzEntry[]
