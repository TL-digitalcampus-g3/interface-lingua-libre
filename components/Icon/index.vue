<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    :style="iconStyle"
  >
    <g :fill="fillColor" :strokeColor="strokeColor">
      <component :is="componentName" />
    </g>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

enum AvailableIcons {
  Play = 'play',
  Pause = 'pause',
  Collection = 'pause',
}

const availableIcons: AvailableIcons[] = Object.values(AvailableIcons)

@Component({
  components: {
    play: () => import('./Play.vue'),
    pause: () => import('./Pause.vue'),
    collection: () => import('./Collection.vue'),
  },
})
export default class IconWrapper extends Vue {
  @Prop({ required: true }) readonly name!: AvailableIcons
  @Prop({ default: 3 }) readonly size!: number
  @Prop({ default: 'var(--color-primary)' }) readonly fillColor!: string
  @Prop({ default: 'var(--color-primary)' }) readonly strokeColor!: string

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
    }
  }
}
</script>
