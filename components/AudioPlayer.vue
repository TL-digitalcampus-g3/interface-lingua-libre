<template>
  <div>
    <audio ref="audio" :src="audioUrl" controls @ended="endendHandler"></audio>
    <button @click="togglePlay">
      <PlayIcon v-if="!isPlaying" />
      <PauseIcon v-else />
    </button>
    <button class="btn bg-green-300" @click="pause">pause</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import PlayIcon from '~/components/icons/Play.vue'
import PauseIcon from '~/components/icons/Pause.vue'

@Component({ components: { PlayIcon, PauseIcon } })
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly fileName!: string
  @Ref() readonly audio!: HTMLAudioElement

  isPlaying: boolean = false

  get audioUrl(): string {
    return `/datas/Millars/${this.fileName}`
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

  endendHandler(): void {
    this.isPlaying = false
  }
}
</script>
