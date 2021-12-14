<template>
  <div>
    <audio
      ref="audio"
      :src="audioUrl"
      controls
      @ended="endedHandler"
      @timeupdate="setTime"
    ></audio>
    <button @click="togglePlay">
      <PlayIcon v-if="!isPlaying" />
      <PauseIcon v-else />
    </button>
    {{ currentTime }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import PlayIcon from '~/components/icons/Play.vue'
import PauseIcon from '~/components/icons/Pause.vue'

@Component({ components: { PlayIcon, PauseIcon } })
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly fileName!: string
  @Ref() readonly audio!: HTMLAudioElement

  isPlaying: boolean = false
  currentSeconds: number = 0

  get audioUrl(): string {
    return `/datas/Millars/${this.fileName}`
  }

  get currentTime(): string {
    const minutes = Math.round(this.currentSeconds / 60)
    const seconds = Math.round(this.currentSeconds - minutes * 60)
    const minuteValue = minutes < 10 ? `0${minutes}` : minutes
    const secondValue = seconds < 10 ? `0${seconds}` : seconds

    return `${minuteValue}:${secondValue}`
  }

  play(): void {
    this.$emit('played')
    this.isPlaying = true
    this.audio.play()
  }

  pause(): void {
    this.isPlaying = false
    this.audio.pause()
  }

  togglePlay(): void {
    if (this.audio.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  endedHandler(): void {
    this.isPlaying = false
  }

  setTime(): void {
    this.currentSeconds = this.audio.currentTime
  }
}
</script>
