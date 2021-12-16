import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { RecordT, Tag, TagMap } from '~/models/Record'
import { AudioData, AudioDataMap, PlayerState, SpeedRate } from '~/models/Audio'

export interface TagMutationPayload {
  fileName: RecordT['fileName']
  tag: Tag
}

export interface AudioDataStateMutation {
  fileName: RecordT['fileName']
  value: PlayerState
}

interface State {
  // tagMap should be a Map structure but Map are not reactive yet in Vue.js
  tagMap: TagMap
  audioDataMap: AudioDataMap
  activeAudio: AudioData['fileName'] | null
  audioSpeedRate: SpeedRate
  isAutoplayMode: boolean
  isAutoplayStarted: boolean
  lastRecordIndexPlayed: number | null
  recordsCount: number
  isDarkMode: boolean
}

export const state = (): State => ({
  tagMap: {},
  audioDataMap: {},
  activeAudio: null,
  audioSpeedRate: SpeedRate.Normal,
  isAutoplayMode: false,
  isAutoplayStarted: false,
  lastRecordIndexPlayed: null,
  recordsCount: 0,
  isDarkMode: false,
})

export const getters: GetterTree<State, State> = {
  taggedRecords: (state: State): RecordT['fileName'][] =>
    Object.keys(state.tagMap),
  taggedRecordsCount: (state: State): number =>
    Object.keys(state.tagMap).length,
  isDarkMode: (state: State): boolean => state.isDarkMode,
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
  SET_ACTIVE_AUDIO: (state: State, activeAudio: AudioData['fileName']) => {
    state.activeAudio = activeAudio
  },
  SET_LATEST_AUDIO_INDEX_PLAYED: (state: State, index: number) => {
    state.lastRecordIndexPlayed = index
  },
  SET_SPEED_RATE: (state: State, speedRate: SpeedRate) => {
    state.audioSpeedRate = speedRate
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
  SET_AUDIO_MAP: (state: State, audioDatas: AudioData[]) => {
    const audioMap: AudioDataMap = {}

    for (const audioData of audioDatas) {
      audioMap[audioData.fileName] = audioData
    }

    state.audioDataMap = audioMap
  },
  UPDATE_AUDIO_DATA_STATE: (state: State, payload: AudioDataStateMutation) => {
    const { fileName, value } = payload

    state.audioDataMap[fileName].playerState = value
  },
  UPDATE_DARK_MODE: (state, updatedDarkMode: boolean) => {
    state.isDarkMode = updatedDarkMode
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
