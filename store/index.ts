import {MutationTree} from 'vuex'
import {TaggedRecord} from '~/models/Record'

interface State {
  taggedRecords: TaggedRecord[]
  isAutoplayMode: boolean
  isAutoplayStarted: boolean
  isPlayingRecord: boolean
  lastRecordIndexPlayed: number | null
}

export const state = (): State => ({
  taggedRecords: [],
  isAutoplayMode: false,
  isAutoplayStarted: false,
  isPlayingRecord: false,
  lastRecordIndexPlayed: null
})

export const mutations: MutationTree<State> = {
  ADD_TAGGED_RECORD: (state, newTaggedRecord: TaggedRecord) => {
    state.taggedRecords.push(newTaggedRecord)
  },
  UPDATE_AUTOPLAY_MODE: (state, newValue: boolean) => {
    state.isAutoplayMode = newValue
  },
  UPDATE_AUTOPLAY_STARDED: (state, newValue: boolean) => {
    state.isAutoplayStarted = newValue
  },
  UPDATE_RECORD_IS_PLAYING: (state, newValue: boolean) => {
    state.isPlayingRecord = newValue
  },
  UPDATE_LAST_RECORD_INDEX_PLAYED: (state, newRecordIndex: number) => {
    state.lastRecordIndexPlayed = newRecordIndex
  },
  NEED_TO_PLAY_RECORD: (state, recordIndex: number) => {
    state.lastRecordIndexPlayed = recordIndex
  },
}
