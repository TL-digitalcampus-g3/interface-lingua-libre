import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RecordT, Tag, TagMap } from '~/models/Record'

export interface TagMutationPayload {
  fileName: RecordT['fileName']
  tag: Tag
}

interface State {
  // tagMap should be a Map structure but Map ar not reactive yet in Vue.js
  tagMap: TagMap
  activeAudio: RecordT['fileName'] | null
  isAutoplayMode: boolean
  isAutoplayStarted: boolean
  lastRecordIndexPlayed: number | null
}

export const state = (): State => ({
  tagMap: {},
  activeAudio: null,
  isAutoplayMode: false,
  isAutoplayStarted: false,
  lastRecordIndexPlayed: null
})

export const getters: GetterTree<State, State> = {
  taggedRecords: (state: State): RecordT['fileName'][] =>
    Object.keys(state.tagMap),
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
  SET_ACTIVE_AUDIO: (state: State, fileName: RecordT['fileName']) => {
    state.activeAudio = fileName
  },
  UPDATE_AUTOPLAY_MODE: (state, newValue: boolean) => {
    state.isAutoplayMode = newValue
  },
  UPDATE_AUTOPLAY_STARTED: (state, newValue: boolean) => {
    state.isAutoplayStarted = newValue
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
