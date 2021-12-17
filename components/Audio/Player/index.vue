<template>
  <div
    ref="audio-player"
    class="player"
    :class="[
      { 'player--played': isTagged },
      { 'player--active': isActive },
    ]"
    @click="setActive"
    @dblclick="handleForcePlayAuto"
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
      :class="[
        { 'is--active': isActive },
      ]"
      @state-button-clicked="togglePlay"
    />
    <div class="player__language">
      <country-flag country="es-ca" size="normal"/>
    </div>
    <div class="player__gender">({{ $t(`GENDER.${record.gender}`) }})</div>
    <div class="player__duration">&nbsp;-&nbsp;{{ currentTime }} / {{ audioDuration }}</div>
    <PlayerTagSelector
      v-if="tag"
      :active-tag="tag"
      :file-name="fileName"
      class="player__tag"
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Ref, Watch} from 'nuxt-property-decorator'
import CountryFlag from 'vue-country-flag'
import MinimalPlayer from './MinimalPlayer.vue'
import PlayerTagSelector from '~/components/TagSelector/PlayerTagSelector.vue'
import {RecordT, Tag} from '~/models/Record'
import {PlayerState, SpeedRate} from '~/models/Audio'
import {AudioDataStateMutation} from '~/store'

function formatTimeToMMSS(timeInSeconds: number): string {
  const minutes = Math.round(timeInSeconds / 60)
  const seconds = Math.round(timeInSeconds - minutes * 60)
  const minuteValue = minutes < 10 ? `0${minutes}` : minutes
  const secondValue = seconds < 10 ? `0${seconds}` : seconds

  return `${minuteValue}:${secondValue}`
}

@Component({components: {MinimalPlayer, PlayerTagSelector, CountryFlag}})
export default class AudioPlayer extends Vue {
  @Prop({required: true}) readonly record!: RecordT
  @Ref() readonly audio!: HTMLAudioElement

  currentSeconds: number = 0
  isPlaying: boolean = false
  duration: number = 0

  get fileName(): RecordT['fileName'] {
    return this.record.fileName
  }

  get title(): RecordT['word'] {
    return this.record.word
  }

  get audioUrl(): string {
    return `datas/Millars/${this.fileName}`
  }

  get tag(): Tag | null {
    return this.$store.getters.taggedRecords.includes(this.fileName)
      ? this.$store.state.tagMap[this.fileName]
      : null
  }

  get isTagged(): boolean {
    return Boolean(this.tag)
  }

  get activeAudio(): RecordT['fileName'] {
    return this.$store.state.activeAudio
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

  setActive(): void {
    this.$store.commit('SET_ACTIVE_AUDIO', this.fileName)
    this.$emit('playerActive')
  }

  handleForcePlayAuto(): void {
    this.$store.commit('UPDATE_AUTOPLAY_MODE', true)
    this.play()
  }

  ended(): void {
    const stateMutationPayload: AudioDataStateMutation = {
      fileName: this.record.fileName,
      value: PlayerState.Ended,
    }
    this.$emit('recordPlayed')
    this.$store.commit('UPDATE_AUDIO_DATA_STATE', stateMutationPayload)
    this.isPlaying = false
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

  replay(): void {
    if (this.$refs.audio) {
      // @ts-ignore
      this.$refs.audio.currentTime = 0
      this.play()
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

  mounted() {
    this.$nuxt.$on('arrowLeftKeyPressed', () => {
      if (this.isActive) {
        this.replay()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.player {
  @apply flex flex-wrap items-center rounded-lg bg-backgroundBlock-light dark:bg-backgroundBlock-dark mb-5 p-8 transition-all duration-200 ease-linear;

  cursor: pointer;

  &:hover {
    @apply shadow-xl;
  }

  &__language {
    @apply mx-4
  }

  &__duration,
  &__language,
  &__gender {
    @apply text-xs;
  }

  &__tag {
    margin-left: auto;
  }
}

.player--active {
  @apply shadow-xl py-14;
}

.player--played {
  &:not(.player--active) {
    @apply bg-gray-300;
  }
}

.player__word,
.player__time {
  @apply text-text-light dark:text-text-dark;
}
</style>
