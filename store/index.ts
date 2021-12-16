import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RecordT, Tag, TagMap } from '~/models/Record'
import { AudioData } from '~/models/Audio'

export interface TagMutationPayload {
  fileName: RecordT['fileName']
  tag: Tag
}

interface State {
  // tagMap should be a Map structure but Map are not reactive yet in Vue.js
  tagMap: TagMap
  activeAudio: AudioData | null
  isAutoplayMode: boolean
  isAutoplayStarted: boolean
  lastRecordIndexPlayed: number | null
  recordsCount: number
}

export const state = (): State => ({
  tagMap: {},
  activeAudio: null,
  isAutoplayMode: false,
  isAutoplayStarted: false,
  lastRecordIndexPlayed: null,
  recordsCount: 0,
})

export const getters: GetterTree<State, State> = {
  taggedRecords: (state: State): RecordT['fileName'][] =>
    Object.keys(state.tagMap),
  activeAudioName: (state: State): RecordT['fileName'] | undefined =>
    state.activeAudio?.fileName,
  taggedRecordsCount: (state: State): number =>
    Object.keys(state.tagMap).length,
}

export const mutations: MutationTree<State> = {
  ADD_TAG: (state: State, payload: TagMutationPayload): void => {
    const { fileName, tag } = payload
    state.tagMap = {
      ...state.tagMap,
      [fileName]: tag,
    }
  },
  UPDATE_TAG: (state: State, payload: TagMutationPayload): void => {
    const { fileName, tag } = payload
    state.tagMap[fileName] = tag
  },
  SET_ACTIVE_AUDIO: (state: State, activeAudio: AudioData) => {
    state.activeAudio = activeAudio
  },
  SET_LATEST_AUDIO_INDEX_PLAYED: (state: State, index: number) => {
    state.lastRecordIndexPlayed = index
  },
  UPDATE_AUTOPLAY_MODE: (state, newValue: boolean) => {
    state.isAutoplayMode = newValue
  },
  UPDATE_AUTOPLAY_STARTED: (state, newValue: boolean) => {
    state.isAutoplayStarted = newValue
  },
  UPDATE_RECORDS_COUNT: (state, updatedCount: number) => {
    state.recordsCount = updatedCount
  },
}

export const actions: ActionTree<State, State> = {
  setTag({ commit, getters }, payload: TagMutationPayload): void {
    const { fileName } = payload
    const isNewFile: boolean = !getters.taggedRecords.includes(fileName)

    if (isNewFile) {
      commit('ADD_TAG', payload)
    } else {
      commit('UPDATE_TAG', payload)
    }
  },
}
