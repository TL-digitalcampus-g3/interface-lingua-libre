<template>
  <Badge :bg-color="bgColor">
    {{ tag }}
  </Badge>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Badge from '~/components/ui/Badge.vue'
import { Tag } from '@/models/Record'

@Component({ components: { Badge } })
export default class className extends Vue {
  @Prop({ required: true }) readonly tag!: Tag

  get bgColor(): string {
    if (this.tag === Tag.Patroled) {
      return 'var(--color-light-green)'
    } else {
      return 'var(--color-light-red)'
    }
  }
}
</script>