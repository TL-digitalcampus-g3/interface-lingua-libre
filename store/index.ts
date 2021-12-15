import { MutationTree } from 'vuex'
import { Record } from '~/models/Record'

interface State {
  taggedRecords: Record[]
}

export const state = (): State => ({
  taggedRecords: [],
})

export const mutations: MutationTree<State> = {
  ADD_TAGGED_RECORD: (state, newTaggedRecord: Record) => {
    state.taggedRecords.push(newTaggedRecord)
  },
}
