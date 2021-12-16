<template>
  <div
    class="player"
    :class="[
      { 'player--played': isPlayed },
      { 'player--active': isActive && isPlaying },
    ]"
    @click="setActive"
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
      :state="playerState"
      @state-button-clicked="togglePlay"
    />
    <div class="player__duration">{{ currentTime }} / {{ audioDuration }}</div>
    <TagBadge v-if="tag" class="player__tag" :tag="tag"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'nuxt-property-decorator'
import MinimalPlayer from './MinimalPlayer.vue'
import { PlayerState, SpeedRate } from '~/models/Audio'
import TagBadge from '~/components/TagSelector/TagBadge.vue'
import { RecordT, Tag } from '~/models/Record'
import { AudioDataStateMutation } from '~/store'

function formatTimeToMMSS(timeInSeconds: number): string {
  const minutes = Math.round(timeInSeconds / 60)
  const seconds = Math.round(timeInSeconds - minutes * 60)
  const minuteValue = minutes < 10 ? `0${minutes}` : minutes
  const secondValue = seconds < 10 ? `0${seconds}` : seconds

  return `${minuteValue}:${secondValue}`
}

@Component({ components: { MinimalPlayer, TagBadge } })
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly record!: RecordT
  @Ref() readonly audio!: HTMLAudioElement

  currentSeconds: number = 0
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

  get currentTime(): string {
    return formatTimeToMMSS(this.currentSeconds)
  }

  get audioDuration(): string | null {
    return formatTimeToMMSS(this.duration)
  }

  get speedRate(): SpeedRate {
    return this.$store.state.audioSpeedRate
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

  setActive(): void {
    this.$store.commit('SET_ACTIVE_AUDIO', this.fileName)
  }

  play(): void {
    if (this.activeAudio !== this.record.fileName) {
      this.setActive()
    }
    this.isPlaying = true

    const stateMutationPayload: AudioDataStateMutation = {
      fileName: this.record.fileName,
      value: PlayerState.Play,
    }
    this.$store.dispatch('playAudio', stateMutationPayload)
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

  @Watch('speedRate')
  onSpeedRateChange(): void {
    if (this.audio) {
      this.audio.playbackRate = this.speedRate
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  @apply rounded-md bg-backgroundBlock-light dark:bg-backgroundBlock-dark my-2 p-4 transition duration-500;

  cursor: pointer;
  display: flex;
  align-items: center;

  &__duration {
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
.player__time {
  @apply text-text-light dark:text-text-dark;
}
</style>
