import { RecordT } from '~/models/Record'

export enum SpeedRate {
  Normal = 1,
  Slow = 0.5,
  Fast = 1.5,
}

export enum PlayerState {
  Play = 'play',
  Pause = 'pause',
  Ended = 'ended',
}

export interface AudioData {
  fileName: RecordT['fileName']
  word: RecordT['word']
  playerState: PlayerState
  duration: number
  currentTimeSecondes: number
}

export type AudioDataMap = Record<AudioData['fileName'], AudioData>
