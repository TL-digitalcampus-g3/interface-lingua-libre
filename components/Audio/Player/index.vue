<template>
  <div>
    <audio
      ref="audio"
      :src="audioUrl"
      controls
      @play="play"
      @pause="pause"
      @ended="handleEnded"
      @timeupdate="setTime"
    />
    <button @click="togglePlay">
      <CustomIcon v-show="state === 'pause'" name="play" />
      <CustomIcon v-show="state === 'play'" name="pause" />
      <CustomIcon v-show="state === 'ended'" name="refresh" />
    </button>
    {{ currentTime }}
    <SpeedRateSelector v-model="speedRate" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator'
import CustomIcon from '@/components/Icon/index.vue'
import SpeedRateSelector from './SpeedRateSelector.vue'
import { SpeedRate, PlayerState } from './types'

function formatTimeToMMSS(timeInseconds: number): string {
  const minutes = Math.round(timeInseconds / 60)
  const seconds = Math.round(timeInseconds - minutes * 60)
  const minuteValue = minutes < 10 ? `0${minutes}` : minutes
  const secondValue = seconds < 10 ? `0${seconds}` : seconds

  return `${minuteValue}:${secondValue}`
}

@Component({ components: { CustomIcon, SpeedRateSelector } })
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly fileName!: string
  @Ref() readonly audio!: HTMLAudioElement

  state: PlayerState = PlayerState.Pause
  currentSeconds: number = 0
  speedRateValue: SpeedRate = SpeedRate.Normal

  get audioUrl(): string {
    return `/datas/Millars/${this.fileName}`
  }

  get currentTime(): string {
    return formatTimeToMMSS(this.currentSeconds)
  }

  get speedRate(): number {
    return this.speedRateValue
  }
  set speedRate(speedRate: SpeedRate) {
    this.speedRateValue = speedRate
    this.audio.playbackRate = speedRate
  }

  handleEnded(): void {
    this.$emit('recordPlayed')
    this.state = PlayerState.Ended
  }

  play(): void {
    this.$emit('recordIsPlaying')
    this.state = PlayerState.Play
    this.audio.play()
  }

  pause(): void {
    this.state = PlayerState.Pause
    this.audio.pause()
  }

  togglePlay(): void {
    if (this.audio.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  setTime(): void {
    this.currentSeconds = this.audio.currentTime
  }
}
</script>
