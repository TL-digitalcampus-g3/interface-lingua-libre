<template>
  <MinimalPlayer
    v-if="activeAudioData"
    :title="activeAudioData.word"
    :state="activeAudioData.playerState"
    :duration="activeAudioData.duration"
    :current-time-in-seconds="activeAudioData.currentTimeInSeconds"
    color="white"
    @state-button-clicked="updatePlayerState"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MinimalPlayer from '~/components/Audio/Player/MinimalPlayer.vue'
import { AudioData, PlayerState } from '~/models/Audio'
import { RecordT } from '~/models/Record'
import { AudioDataStateMutation } from '~/store'

@Component({
  components: { MinimalPlayer },
})
export default class GlobalPlayer extends Vue {
  get activeAudioData(): AudioData | null {
    const activeAudio: RecordT['fileName'] | null =
      this.$store.state.activeAudio

    if (activeAudio) {
      return this.$store.state.audioDataMap[activeAudio]
    } else {
      return null
    }
  }

  get playerState(): PlayerState | null {
    return this.activeAudioData?.playerState ?? null
  }

  updatePlayerState(): void {
    if (!this.activeAudioData) return

    const payload: Partial<AudioDataStateMutation> = {
      fileName: this.activeAudioData.fileName,
    }

    switch (this.playerState) {
      case PlayerState.Play:
        payload.value = PlayerState.Pause
        break
      case PlayerState.Pause:
      case PlayerState.Ended:
        payload.value = PlayerState.Play
        break
    }

    this.$store.commit('UPDATE_AUDIO_DATA_STATE', payload)
  }
}
</script>