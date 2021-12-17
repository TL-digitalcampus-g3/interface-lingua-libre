<template>
  <Badge
    :bg-color="backgroundColor"
    border-color="white"
    :text-color="textColor"
  >
    {{ $t('TAGS.' + tag.toUpperCase()) }}
  </Badge>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Badge from '~/components/ui/Badge.vue'
import { Tag } from '@/models/Record'

@Component({ components: { Badge } })
export default class className extends Vue {
  @Prop({ required: true }) readonly tag!: Tag
  @Prop({ required: true }) readonly isActive!: boolean

  get backgroundColor(): string {
    if (this.isActive) {
      return 'white'
    } else {
      return 'transparent'
    }
  }

  get textColor(): string {
    if (this.isActive) {
      return 'black'
    } else {
      return 'white'
    }
  }
}
</script>
