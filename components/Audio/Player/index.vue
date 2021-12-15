<template>
  <div
    class="player"
    :class="[{ 'player--played': isPlayed }, { 'player--active': isActive }]"
    @dblclick="play"
  >
    <audio
      ref="audio"
      :src="audioUrl"
      @play="play"
      @pause="pause"
      @ended="ended"
      @timeupdate="setTime"
    />
    <button class="player__controls" @click="togglePlay">
      <CustomIcon v-show="state === 'pause'" name="play" />
      <CustomIcon v-show="state === 'play'" name="pause" />
      <CustomIcon v-show="state === 'ended'" name="refresh" />
    </button>
    <div class="player__word">{{ word }}</div>
    <div class="player__time">
      {{ currentTime }}
    </div>
    <SpeedRateSelector class="player__speed-rate" v-model="speedRate" />
    <TagBadge v-if="tag" class="player__tag" :tag="tag" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator'
import { SpeedRate, PlayerState } from './types'
import SpeedRateSelector from './SpeedRateSelector.vue'
import CustomIcon from '~/components/Icon/index.vue'
import TagBadge from '~/components/TagSelector/TagBadge.vue'
import { RecordT, Tag } from '~/models/Record'

function formatTimeToMMSS(timeInSeconds: number): string {
  const minutes = Math.round(timeInSeconds / 60)
  const seconds = Math.round(timeInSeconds - minutes * 60)
  const minuteValue = minutes < 10 ? `0${minutes}` : minutes
  const secondValue = seconds < 10 ? `0${seconds}` : seconds

  return `${minuteValue}:${secondValue}`
}

@Component({ components: { CustomIcon, SpeedRateSelector, TagBadge } })
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly record!: RecordT
  @Ref() readonly audio!: HTMLAudioElement

  state: PlayerState = PlayerState.Pause
  currentSeconds: number = 0
  speedRateValue: SpeedRate = SpeedRate.Normal
  isPlayed: boolean = false
  isActive: boolean = false

  get fileName(): RecordT['fileName'] {
    return this.record.fileName
  }

  get word(): RecordT['word'] {
    return this.record.word
  }

  get audioUrl(): string {
    return `/datas/Millars/${this.fileName}`
  }

  get currentTime(): string {
    return formatTimeToMMSS(this.currentSeconds)
  }

  get speedRate(): number {
    return this.speedRateValue
  }

  get tag(): Tag | null {
    return this.$store.getters.taggedRecords.includes(this.fileName)
      ? this.$store.state.tagMap[this.fileName]
      : null
  }

  set speedRate(speedRate: SpeedRate) {
    this.speedRateValue = speedRate
    this.audio.playbackRate = speedRate
  }

  ended(): void {
    this.$emit('recordPlayed')
    this.state = PlayerState.Ended
    this.isPlayed = true
    this.isActive = false
  }

  play(): void {
    this.$emit('recordIsPlaying')
    this.state = PlayerState.Play
    this.audio.play()
    this.isActive = true
  }

  pause(): void {
    if (this.state === PlayerState.Play) {
      this.state = PlayerState.Pause
    }

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

<style lang="scss" scoped>
.player {
  @apply rounded-md bg-white my-2 p-4 text-lg;
  display: flex;
  align-items: center;

  &__word,
  &__time,
  &__speed-rate {
    @apply ml-4;
  }

  &__word {
    font-weight: bold;
  }

  &__tag {
    margin-left: auto;
  }
}

.player--active {
  @apply shadow-2xl transition duration-500;
}

.player--played {
  @apply bg-gray-300;
}
</style>
