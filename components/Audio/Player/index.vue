<template>
  <div
    class="player"
    :class="[{ 'player--played': isPlayed }, { 'player--active': isActive }]"
    @dblclick="play"
  >
    <audio
      ref="audio"
      :src="audioUrl"
      @pause="pause"
      @ended="ended"
      @timeupdate="setTime"
      @loadeddata="loadHandler"
    />
    <MinimalPlayer
      :title="title"
      :duration="duration"
      :current-time-in-seconds="currentSeconds"
      :state="state"
      @state-button-clicked="togglePlay"
    />
    <SpeedRateSelector class="player__speed-rate" v-model="speedRate" />
    <TagBadge v-if="tag" class="player__tag" :tag="tag" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator'
import SpeedRateSelector from './SpeedRateSelector.vue'
import MinimalPlayer from './MinimalPlayer.vue'
import { SpeedRate, PlayerState, AudioData } from '~/models/Audio'
import TagBadge from '~/components/TagSelector/TagBadge.vue'
import { RecordT, Tag } from '~/models/Record'
import { AudioPlayerStateMutationPayload } from '~/store'

@Component({ components: { MinimalPlayer, SpeedRateSelector, TagBadge } })
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly record!: RecordT
  @Ref() readonly audio!: HTMLAudioElement

  state: PlayerState = PlayerState.Pause
  currentSeconds: number = 0
  speedRateValue: SpeedRate = SpeedRate.Normal
  isPlayed: boolean = false
  duration: number = 0

  get fileName(): RecordT['fileName'] {
    return this.record.fileName
  }

  get title(): RecordT['word'] {
    return this.record.word
  }

  get audioUrl(): string {
    return `/datas/Millars/${this.fileName}`
  }

  get speedRate(): number {
    return this.speedRateValue
  }

  set speedRate(speedRate: SpeedRate) {
    this.speedRateValue = speedRate
    this.audio.playbackRate = speedRate
  }

  get tag(): Tag | null {
    return this.$store.getters.taggedRecords.includes(this.fileName)
      ? this.$store.state.tagMap[this.fileName]
      : null
  }

  get audioData(): AudioData {
    return {
      ...this.record,
      playerState: this.playerState,
      duration: this.duration,
      currentTimeSecondes: this.currentSeconds,
    }
  }

  get activeAudioName(): RecordT['fileName'] {
    return this.$store.getters.activeAudioName
  }

  get isActive(): boolean {
    return this.activeAudioName === this.record.fileName
  }

  get playerState(): PlayerState {
    return this.state
  }

  set playerState(state: PlayerState) {
    const payload: AudioPlayerStateMutationPayload = {
      playerState: state,
      fileName: this.record.fileName,
    }

    this.state = state
    this.$store.commit('SET_ACTIVE_AUDIO_STATE', payload)
  }

  ended(): void {
    this.$emit('recordPlayed')
    this.playerState = PlayerState.Ended
    this.isPlayed = true
  }

  play(): void {
    console.log('play')
    if (this.activeAudioName !== this.record.fileName) {
      this.$store.commit('SET_ACTIVE_AUDIO', this.audioData)
    }

    this.$emit('recordIsPlaying')
    this.playerState = PlayerState.Play
    this.audio.play()
    this.isPlayed = false
  }

  pause(): void {
    if (this.playerState === PlayerState.Play) {
      this.playerState = PlayerState.Pause
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

  loadHandler(): void {
    this.duration = this.audio.duration
  }
}
</script>

<style lang="scss" scoped>
.player {
  @apply rounded-md bg-backgroundBlock-light dark:bg-backgroundBlock-dark my-2 p-4;
  display: flex;
  align-items: center;

  &__speed-rate {
    @apply ml-4;
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

.player__word,
.player__time,
.player__speed-rate {
  @apply text-text-light dark:text-text-dark;
}
</style>
