export enum Tag {
  Patroled = 'patroled',
  NoSound = 'noSound',
  Parasite = 'parasite',
  CutWord = 'cutWord',
  NoMatchSpelling = 'noMatchSpelling',
  NoMatchLanguage = 'noMatchLanguage',
  Vandalism = 'Vandalism',
}

export interface Record {
  fileName: string
  commonsURL: string
  locutor: string
  word: string
}

export interface TaggedRecord extends Record {
  tag: Tag
}
