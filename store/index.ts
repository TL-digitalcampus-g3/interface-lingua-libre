import { MutationTree, GetterTree } from 'vuex'
import { RecordT, Tag, TagMap } from '~/models/Record'

export interface SetTagPayload {
  fileName: RecordT['fileName']
  tag: Tag
}

interface State {
  // tagMap should be a Map structure but Map ar not reactive yet in Vue.js
  tagMap: TagMap
  activeAudio: RecordT['fileName'] | null
}

export const state = (): State => ({
  tagMap: {},
  activeAudio: null,
})

export const getters: GetterTree<State, State> = {
  taggedRecords: (state: State): RecordT['fileName'][] =>
    Object.keys(state.tagMap),
}

export const mutations: MutationTree<State> = {
  SET_TAG: (state: State, payload: SetTagPayload): void => {
    const { fileName, tag } = payload
    state.tagMap = {
      ...state.tagMap,
      [fileName]: tag,
    }
  },
  SET_ACTIVE_AUDIO: (state: State, fileName: RecordT['fileName']) => {
    state.activeAudio = fileName
  },
}
