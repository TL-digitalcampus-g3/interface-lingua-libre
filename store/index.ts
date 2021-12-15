import { MutationTree } from 'vuex'
import { TaggedRecord } from '~/models/Record'

interface State {
  taggedRecords: TaggedRecord[]
}

export const state = (): State => ({
  taggedRecords: [],
})

export const mutations: MutationTree<State> = {
  ADD_TAGGED_RECORD: (state, newTaggedRecord: TaggedRecord) => {
    state.taggedRecords.push(newTaggedRecord)
  },
}
