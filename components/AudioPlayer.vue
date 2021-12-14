<template>
  <div>
    <audio ref="audio" :src="audioUrl" controls></audio>
    <button class="btn bg-green-300" @click="play">play</button>
    <button class="btn bg-green-300" @click="pause">pause</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

@Component
export default class AudioPlayer extends Vue {
  @Prop({ required: true }) readonly fileName!: string

  @Ref() readonly audio!: HTMLAudioElement

  get audioUrl(): string {
    return `/datas/Millars/${this.fileName}`
  }

  play(): void {
    this.$emit('played')
    this.audio.play()
  }

  pause(): void {
    this.audio.pause()
  }
}
</script>
