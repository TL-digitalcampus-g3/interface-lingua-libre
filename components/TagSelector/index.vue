<template>
  <div class="badges">
    <button v-for="tag in tags" :key="tag" class="mx-1" @click="setTag(tag)">
      <TagBadge :tag="tag" :class="[
        {'badge--active' : (currentTag === tag)}
      ]"/>
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

  currentTag: Tag | null = null

  get activeAudio(): RecordT['fileName'] {
    return this.$store.state.activeAudio
  }

  setTag(tag: Tag): void {
    this.currentTag = tag
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

  .badge--active {
    background: white !important;
  }
}

</style>
