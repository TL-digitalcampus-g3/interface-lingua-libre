<template>
  <div>
    <div v-if="isLoading">
      <TheLoader />
    </div>
    <div v-else>
      <div v-for="(record, index) in records" :key="record.fileName">
        {{ record }}
        <AudioPlayer
          ref="players"
          :file-name="record.fileName"
          @played="pauseOtherPlayers(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import TheLoader from '~/components/TheLoader.vue'
import AudioPlayer from '~/components/AudioPlayer.vue'

@Component({
  components: { TheLoader, AudioPlayer },
})
export default class Collection extends Vue {
  @Ref() readonly players!: AudioPlayer[]

  records: any = []
  isLoading: boolean = true

  async mounted() {
    try {
      const res = await this.$axios.$get(`datas/millars.json`)
      this.records = res.records
    } finally {
      this.isLoading = false
    }
  }

  pauseOtherPlayers(currentPlayerIndex: number): void {
    this.players.forEach((player, index): void => {
      if (currentPlayerIndex !== index) {
        player.pause()
      }
    })
  }
}
</script>

<style scoped>
</style>
