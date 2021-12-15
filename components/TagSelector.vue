<template>
  <div class="badges">
    <button v-for="tag in tags" :key="tag" class="mx-1" @click="setTag(tag)">
      <Badge>
        {{ tag }}
      </Badge>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Tag, RecordT } from '~/models/Record'
import Badge from '~/components/ui/Badge.vue'
import { TagMutationPayload } from '~/store'

@Component({ components: { Badge } })
export default class TagSelector extends Vue {
  readonly tags: Tag[] = Object.values(Tag)

  get activeAudio(): RecordT['fileName'] {
    return this.$store.state.activeAudio
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