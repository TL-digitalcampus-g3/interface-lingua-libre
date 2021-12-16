<template>
  <MinimalPlayer
    v-if="activeAudio"
    :title="activeAudio.word"
    :state="activeAudio.playerState"
    :duration="activeAudio.duration"
    :current-time-in-seconds="activeAudio.currentTimeInSeconds"
    color="white"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MinimalPlayer from '~/components/Audio/Player/MinimalPlayer.vue'
import { AudioData } from '~/models/Audio'

@Component({
  components: { MinimalPlayer },
})
export default class GlobalPlayer extends Vue {
  get activeAudio(): AudioData | null {
    return this.$store.state.activeAudio
  }
}
</script>