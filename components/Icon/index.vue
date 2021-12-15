<template>
  <component :is="componentName" :style="iconStyle" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

enum AvailableIcons {
  Play = 'play',
  Pause = 'pause',
  Refresh = 'refresh',
}

const availableIcons: AvailableIcons[] = Object.values(AvailableIcons)

@Component({
  components: {
    play: () => import('./Play.vue'),
    pause: () => import('./Pause.vue'),
    refresh: () => import('./Refresh.vue'),
  },
})
export default class IconWrapper extends Vue {
  @Prop({ required: true }) readonly name!: AvailableIcons
  @Prop({ default: 3 }) readonly size!: number
  @Prop({ default: 'var(--color-primary)' }) readonly color!: string

  get componentName(): AvailableIcons {
    if (!availableIcons.includes(this.name)) {
      throw new Error(`Icon ${this.name} is not available`)
    }

    return this.name
  }

  get iconStyle(): Record<string, string> {
    return {
      width: `${this.size}rem`,
      height: `${this.size}rem`,
      color: this.color,
    }
  }
}
</script>
