<template>
  <div>
    <div class="badges">
      <button v-for="tag in tags" :key="tag" class="mx-1">
        <Badge>
          {{ tag }}
        </Badge>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Tag } from '~/models/Record'
import Badge from '~/components/ui/Badge.vue'

@Component({ components: { Badge } })
export default class TagSelector extends Vue {
  readonly tags: Tag[] = Object.values(Tag)
}
</script>

<style lang="scss" scoped>
.badges {
  display: flex;
  justify-content: center;
}
</style>