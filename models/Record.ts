export enum Tag {
  Patroled = 'patroled',
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
}

export type TagMap = Record<RecordT['fileName'], Tag>
