<template>
  <div id="collection">
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <button class="btn" @click="handleClickPlayAuto">
        <PauseIcon v-if="isAutoplayMode" />
        <PlayIcon v-else @click="pauseOtherPlayers" />
      </button>
      <div>
        <input id="autoplay" type="checkbox" :checked="isAutoplayMode" />
        {{ $t('GLOBAL.PLAYER_AUTO') }}
      </div>
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
        <hr />
        {{ recordsPlayed }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'nuxt-property-decorator'
import Loader from '~/components/Loader.vue'
import AudioPlayer from '~/components/Audio/Player/index.vue'
import PlayIcon from '~/components/Icon/Play.vue'
import PauseIcon from '~/components/Icon/Pause.vue'

interface Record {
  fileName: string
}

@Component({
  components: { Loader, AudioPlayer, PlayIcon, PauseIcon },
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
  $refs!: {
    players: any
  }

  @Ref() readonly players!: AudioPlayer[]

  records: Record[] = []
  isLoading: boolean = true
  isAutoplayMode: boolean = false
  currentRecordPlaying: number | null = null
  recordsPlayed: Record[] = []
  countRecords: number = 0
  checkedRecords: number = 0

  @Watch('records', { immediate: true })
  onRecordsChanged(): void {
    this.countRecords = this.records.length
  }

  @Watch('recordsPlayed')
  onRecordsPlayed(): void {
    this.checkedRecords = this.recordsPlayed.length
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
    this.playRecord(0)
  }

  handleRecordPlayed(currentPlayerIndex: number): void {
    this.currentRecordPlaying = null
    this.pauseOtherPlayers(currentPlayerIndex)
    let recordFound: boolean = false
    this.recordsPlayed.forEach((record) => {
      if (record.fileName === this.records[currentPlayerIndex].fileName) {
        recordFound = true
      }
    })
    if (!recordFound) {
      this.recordsPlayed.push(this.records[currentPlayerIndex])
    }
    this.isAutoplayMode && this.playRecord(currentPlayerIndex + 1)
  }

  handleRecordIsPlaying(currentPlayerIndex: number): void {
    this.currentRecordPlaying = currentPlayerIndex
  }

  playRecord(playerIndex: number): void {
    if (this.$refs.players.length > 0 && this.$refs.players[playerIndex]) {
      this.$refs.players[playerIndex].play()
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

<style lang="scss" scoped>
.btn {
  @apply bg-blue-500 text-white p-3 rounded;
}
</style>
