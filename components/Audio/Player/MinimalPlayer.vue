<template>
  <div class="minimal-player">
    <button class="state-button" @click="$emit('state-button-clicked')">
      <CustomIcon v-show="state === 'pause'" name="play" :color="color" />
      <CustomIcon v-show="state === 'play'" name="pause" :color="color" />
      <CustomIcon v-show="state === 'ended'" name="refresh" :color="color" />
    </button>
    <div class="title">{{ title }}</div>
    <div class="duration">{{ currentTime }} / {{ audioDuration }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { PlayerState } from '~/models/Audio'
import CustomIcon from '~/components/Icon/index.vue'

function formatTimeToMMSS(timeInSeconds: number): string {
  const minutes = Math.round(timeInSeconds / 60)
  const seconds = Math.round(timeInSeconds - minutes * 60)
  const minuteValue = minutes < 10 ? `0${minutes}` : minutes
  const secondValue = seconds < 10 ? `0${seconds}` : seconds

  return `${minuteValue}:${secondValue}`
}

@Component({ components: { CustomIcon } })
export default class MinimalPlayer extends Vue {
  @Prop({ required: true }) readonly title!: string
  @Prop({ default: 0 }) readonly duration!: number
  @Prop({ default: 0 }) readonly currentTimeInSeconds!: number
  @Prop({ required: true }) readonly state!: PlayerState
  @Prop({ default: 'var(--color-primary)' }) readonly color!: string

  get currentTime(): string {
    return formatTimeToMMSS(this.currentTimeInSeconds)
  }

  get audioDuration(): string | null {
    return formatTimeToMMSS(this.duration)
  }
}
</script>

<style lang="scss" scoped>
.minimal-player {
  display: flex;
  align-items: center;
}

.title,
.duration {
  @apply ml-4;
}

.title {
  font-weight: bold;
}
</style>
