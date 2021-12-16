<template>
  <div
    class="player"
    :class="[
      { 'player--played': isPlayed },
      { 'player--active': isActive && isPlaying },
    ]"
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
      :state="playerState"
      @state-button-clicked="togglePlay"
    />
    <SpeedRateSelector class="player__speed-rate" v-model="speedRate" />
    <TagBadge v-if="tag" class="player__tag" :tag="tag" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'nuxt-property-decorator'
import SpeedRateSelector from './SpeedRateSelector.vue'
import MinimalPlayer from './MinimalPlayer.vue'
import { SpeedRate, PlayerState } from '~/models/Audio'
import TagBadge from '~/components/TagSelector/TagBadge.vue'
import { RecordT, Tag } from '~/models/Record'
import { AudioDataStateMutation } from '~/store'

@Component({ components: { MinimalPlayer, SpeedRateSelector, TagBadge } })
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly record!: RecordT
  @Ref() readonly audio!: HTMLAudioElement

  currentSeconds: number = 0
  speedRateValue: SpeedRate = SpeedRate.Normal
  isPlaying: boolean = false
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

  get activeAudio(): RecordT['fileName'] {
    return this.$store.getters.activeAudio
  }

  get isActive(): boolean {
    return this.activeAudio === this.fileName
  }

  get playerState(): PlayerState {
    return this.$store.state.audioDataMap[this.fileName].playerState
  }

  ended(): void {
    const stateMutationPayload: AudioDataStateMutation = {
      fileName: this.record.fileName,
      value: PlayerState.Ended,
    }
    this.$emit('recordPlayed')
    this.$store.commit('UPDATE_AUDIO_DATA_STATE', stateMutationPayload)
    this.isPlayed = true
    this.isPlaying = false
  }

  play(): void {
    if (this.activeAudio !== this.record.fileName) {
      this.$store.commit('SET_ACTIVE_AUDIO', this.fileName)
    }
    this.isPlaying = true
    this.$emit('recordIsPlaying')

    const stateMutationPayload: AudioDataStateMutation = {
      fileName: this.record.fileName,
      value: PlayerState.Play,
    }
    this.$store.commit('UPDATE_AUDIO_DATA_STATE', stateMutationPayload)
    this.isPlayed = false
  }

  pause(): void {
    if (this.playerState === PlayerState.Play) {
      const stateMutationPayload: AudioDataStateMutation = {
        fileName: this.record.fileName,
        value: PlayerState.Pause,
      }

      this.$store.commit('UPDATE_AUDIO_DATA_STATE', stateMutationPayload)
    }
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

  @Watch('playerState')
  onPlayerStateChange(): void {
    switch (this.playerState) {
      case PlayerState.Play:
        this.audio.play()
        break
      case PlayerState.Pause:
        this.audio.pause()
        break
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  @apply rounded-md bg-backgroundBlock-light dark:bg-backgroundBlock-dark my-2 p-4 transition duration-500;
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
