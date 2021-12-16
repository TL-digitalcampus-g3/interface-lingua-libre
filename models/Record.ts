export enum Tag {
  Valid = 'valid',
  NoSound = 'noSound',
  Parasite = 'parasite',
  CutWord = 'cutWord',
  NoMatchSpelling = 'noMatchSpelling',
  NoMatchLanguage = 'noMatchLanguage',
  Vandalism = 'vandalism',
}

export interface RecordT {
  fileName: string
  commonsURL: string
  locutor: string
  word: string
  gender: 'M' | 'F'
}

export type TagMap = Record<RecordT['fileName'], Tag>
