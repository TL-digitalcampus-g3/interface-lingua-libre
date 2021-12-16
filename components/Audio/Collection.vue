<template>
  <div id="collection">
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <button
        class="btn"
        @click="
          handleClickPlayAuto(
            lastRecordIndexPlayed !== null ? lastRecordIndexPlayed + 1 : 0
          )
        "
      >
        <CustomIcon v-if="this.$store.state.isAutoplayMode" name="pause" />
        <CustomIcon v-else name="play" @click="pauseOtherPlayers" />
      </button>
      <div class="collection_sounds">
        <div v-for="(record, index) in records" :key="record.fileName">
          <AudioPlayer
            ref="players"
            :record="record"
            @recordIsPlaying="handleRecordIsPlaying"
            @recordPlayed="handleRecordPlayed(index)"
          />
        </div>
      </div>
      <button
        class="btn"
        :class="[{ 'btn--disabled': !hasResultsToShare }]"
        @click="handleClickTransfertResults"
        :disabled="!hasResultsToShare"
      >
        Send validation
      </button>
      <div class="bg-blue-800 bg-opacity-20 p-10 m-10">
        <p>
          Last record's index played :
          <strong>{{
            $store.state.lastRecordIndexPlayed !== null
              ? $store.state.lastRecordIndexPlayed
              : 'none'
          }}</strong>
        </p>
        <div v-if="isPlayingRecord">
          Current audio player :
          <strong>{{ activeAudioName }} / {{ recordsCount }}</strong>
        </div>
        Audio(s) verified :
        <strong>{{ checkedRecordsCount }} / {{ recordsCount }}</strong>
        <hr />
        {{ taggedRecords }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'nuxt-property-decorator'
import Loader from '~/components/Loader.vue'
import CustomIcon from '@/components/Icon/index.vue'
import AudioPlayer from '~/components/Audio/Player/index.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import { RecordT, Tag, TagMap } from '~/models/Record'
import { TagMutationPayload } from '~/store'

@Component({
  components: { Loader, AudioPlayer, CustomIcon, CheckBox },
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

  records: RecordT[] = []
  isLoading: boolean = true
  lastRecordIndexPlayed: number | null = null
  delayBetweenAutoplay: number = 3000 // in ms

  get recordsCount(): number {
    return this.records.length
  }

  get tagMap(): TagMap {
    return this.$store.state.tagMap
  }

  get taggedRecords(): RecordT['fileName'][] {
    return this.$store.getters.taggedRecords
  }

  get isAutoPlayMode(): boolean {
    return this.$store.state.isAutoplayMode
  }

  get checkedRecordsCount(): number {
    return this.taggedRecords.length
  }

  get hasResultsToShare(): boolean {
    return this.checkedRecordsCount > 0
  }

  get activeAudioName(): RecordT['fileName'] | null {
    return this.$store.state.activeAudioName ?? null
  }

  get isPlayingRecord(): boolean {
    return Boolean(this.activeAudioName)
  }

  async mounted() {
    try {
      const res = await this.$axios.$get(`datas/millars.json`)
      this.records = res.records
    } finally {
      this.isLoading = false
    }
  }

  @Watch('isAutoPlayMode')
  changeAutoPlayMode() {
    console.log('autoplay mode changed', this.isAutoPlayMode)
  }

  handleClickPlayAuto(startIndex: number = 0): void {
    if (!this.isPlayingRecord) {
      this.playRecord(startIndex)
      this.$store.commit(
        'UPDATE_AUTOPLAY_STARTED',
        !this.$store.state.isAutoplayStarted
      )
    }
  }

  handleRecordPlayed(currentPlayerIndex: number): void {
    const currentRecord: RecordT = this.records[currentPlayerIndex]
    const isCurrentRecordTagSettled: Boolean = this.taggedRecords.includes(
      currentRecord.fileName
    )

    this.lastRecordIndexPlayed = currentPlayerIndex

    if (!isCurrentRecordTagSettled) {
      const setTagPayload: TagMutationPayload = {
        fileName: currentRecord.fileName,
        tag: Tag.Patroled,
      }

      this.$store.dispatch('setTag', setTagPayload)
    }

    this.$store.state.isAutoplayMode && this.playRecord(currentPlayerIndex + 1)
  }

  handleRecordIsPlaying(): void {
    // this.pauseOtherPlayers()
  }

  handleClickTransfertResults(): void {
    const hash = new Date().getTime()
    this.generateOutputResult(`records-${hash}.xml`)
  }

  generateOutputResult(filename: string): void {
    const docWrapper = document.implementation.createDocument('', '', null)
    const patrolElement = docWrapper.createElement('patrol')
    patrolElement.setAttribute('date', this.getCurrentDate())
    const recordsPlayed: RecordT[] = this.records.filter((record) =>
      this.taggedRecords.includes(record.fileName)
    )

    recordsPlayed.forEach((record) => {
      const file = docWrapper.createElement('file')
      file.setAttribute('name', `${record.fileName}`)

      const commonsURL = docWrapper.createElement('commonsURL')
      commonsURL.innerHTML = 'https://'

      const locutor = docWrapper.createElement('locutor')
      locutor.innerHTML = 'Guilhelma'

      const tag = docWrapper.createElement('tag')
      tag.innerHTML = this.tagMap[record.fileName]

      file.appendChild(commonsURL)
      file.appendChild(locutor)
      file.appendChild(tag)

      patrolElement.appendChild(file)
    })

    docWrapper.appendChild(patrolElement)
    this.downloadFile(filename, docWrapper)
  }

  getCurrentDate(): string {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return dd + '/' + mm + '/' + yyyy
  }

  downloadFile(filename: string, content?: any) {
    // Serialize the XML file
    const outputSerialized = new XMLSerializer().serializeToString(content)
    // Create a blob element to wrap serialized xml file
    const blob = new Blob([outputSerialized], { type: 'application/xml' })
    const objectUrl = URL.createObjectURL(blob)
    const element = document.createElement('a')

    element.setAttribute('href', objectUrl)
    element.setAttribute('download', filename)
    // Force link element to be invisible
    element.style.display = 'none'
    document.body.appendChild(element)
    // Trigger click on invisible link
    element.click()
    // Then delete the element form DOM
    document.body.removeChild(element)
  }

  playRecord(playerIndex: number): void {
    if (this.players.length > 0 && this.players[playerIndex]) {
      setTimeout(
        () => {
          this.players[playerIndex].play()
        },
        this.$store.state.isAutoplayStarted ? this.delayBetweenAutoplay : 0
      )
    }
  }

  pauseOtherPlayers(): void {
    for (const player of this.players) {
      if (player.fileName !== this.activeAudioName) {
        player.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  @apply bg-blue-500 text-white p-3 rounded;
}

.btn--disabled {
  @apply bg-gray-lightest shadow-none hover:bg-gray-light text-gray;
}

.collection_sounds {
  @apply overflow-y-scroll;
  height: 400px;
}
</style>
