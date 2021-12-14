<template>
  <div id="collection">
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <button class="btn" @click="handleClickPlayAuto">
        <input id="autoplay" type="checkbox" :checked="isAutoplayMode" />
        {{ $t('GLOBAL.PLAYER_AUTO') }}
      </button>
      <div v-for="(record, index) in records" :key="record.fileName">
        {{ record }}
        <AudioPlayer
          ref="players"
          :file-name="record.fileName"
          @recordIsPlaying="handleRecordIsPlaying(index)"
          @recordPlayed="handleRecordPlayed(index)"
        />
      </div>
      <div class="bg-blue-800 bg-opacity-20 p-10 m-10">
        <div v-if="currentRecordPlaying !== null">
          Current audio player : {{ currentRecordPlaying + 1 }} /
          {{ countRecords }}
        </div>
        Audio(s) verified : {{ checkedRecords }} / {{ countRecords }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'nuxt-property-decorator'
import Loader from '~/components/Loader.vue'
import AudioPlayer from './Player/index.vue'

@Component({
  components: { Loader, AudioPlayer },
  async asyncData({ $axios }): Promise<any> {
    const records = await $axios
      .$get(`datas/millars.json`)
      .then((res) => res.records)
      .catch((error) => {
        if (this.$axios.isCancel(error)) {
          console.log('Request canceled', error)
        } else {
          console.log(error)
        }
      })

    return {
      records,
    }
  },
})
export default class Collection extends Vue {
  @Ref() readonly players!: AudioPlayer[]

  records: [] = []
  isLoading: boolean = true
  isAutoplayMode: boolean = false
  currentRecordPlaying: number | null = null
  countRecords: number = 0
  checkedRecords: number = 0

  @Watch('records', { immediate: true })
  onRecordsChanged() {
    this.countRecords = this.records.length
  }

  async mounted() {
    try {
      const res = await this.$axios.$get(`datas/millars.json`)
      this.records = res.records
    } finally {
      this.isLoading = false
    }
  }

  handleClickPlayAuto(): void {
    this.isAutoplayMode = !this.isAutoplayMode
  }

  handleRecordPlayed(currentPlayerIndex: number): void {
    this.pauseOtherPlayers(currentPlayerIndex)
  }

  handleRecordIsPlaying(currentPlayerIndex: number): void {
    this.currentRecordPlaying = currentPlayerIndex
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

<style lang="scss" scoped>
.btn {
  @apply bg-blue-500 text-white p-3 rounded;
}
</style>
