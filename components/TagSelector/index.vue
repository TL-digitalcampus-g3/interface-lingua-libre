<template>
  <div class="badges">
    <button v-for="tag in tags" :key="tag" class="mx-1" @click="setTag(tag)">
      <TagBadge :tag="tag" :is-active="tag === currentTag" />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TagBadge from './TagBadge.vue'
import { Tag, RecordT } from '~/models/Record'
import { TagMutationPayload } from '~/store'

@Component({ components: { TagBadge } })
export default class TagSelector extends Vue {
  readonly tags: Tag[] = Object.values(Tag)

  get activeAudio(): RecordT['fileName'] {
    return this.$store.state.activeAudio
  }

  get currentTag(): Tag {
    return this.$store.state.tagMap[this.activeAudio]
  }

  setTag(tag: Tag): void {
    if (this.activeAudio) {
      const payload: TagMutationPayload = { fileName: this.activeAudio, tag }
      this.$store.dispatch('setTag', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.badges {
  display: flex;
  justify-content: center;
}
</style>
