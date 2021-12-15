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
        <CustomIcon v-if="isAutoplayMode" name="pause" />
        <CustomIcon v-else name="play" @click="pauseOtherPlayers" />
      </button>
      <div>
        <input id="autoplay" type="checkbox" :checked="$store.state.isAutoplayMode"/>
        {{ $t('PLAYBACK_OPTION.PLAYER_AUTO') }}

        <CheckBox
          :label="$t('PLAYBACK_OPTION.PLAYER_AUTO')"
          :isChecked="$store.state.isAutoplayMode"
        />
      </div>
      <div class="collection_sounds">
        <div v-for="(record, index) in records" :key="record.fileName">
          {{ record }}
          <AudioPlayer
            ref="players"
            :file-name="record.fileName"
            @recordIsPlaying="handleRecordIsPlaying(record.fileName)"
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
              $store.state.lastRecordIndexPlayed !== null ? $store.state.lastRecordIndexPlayed : 'none'
          }}</strong>
        </p>
        <div v-if="isPlayingRecord">
          Current audio player :
          <strong>{{ activeAudio }} / {{ recordsCount }}</strong>
        </div>
        Audio(s) verified : <strong>{{ checkedRecords }} / {{ recordsCount }}</strong>
        <hr/>
        {{ recordsPlayed }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
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
  isAutoplayMode: boolean = false
  lastRecordIndexPlayed: number | null = null
  isAutoplayStarted: boolean = false
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

  get checkedRecordsCount(): number {
    return this.taggedRecords.length
  }

  get hasResultsToShare(): boolean {
    return this.checkedRecordsCount > 0
  }

  get activeAudio(): RecordT['fileName'] | null {
    return this.$store.state.activeAudio
  }

  set activeAudio(fileName: RecordT['fileName'] | null) {
    this.$store.commit('SET_ACTIVE_AUDIO', fileName)
  }

  get isPlayingRecord(): boolean {
    return Boolean(this.activeAudio)
  }

  async mounted() {
    try {
      const res = await this.$axios.$get(`datas/millars.json`)
      this.records = res.records
    } finally {
      this.isLoading = false
    }
  }

  handleClickPlayAuto(startIndex: number = 0): void {
    this.isAutoplayMode = !this.isAutoplayMode
    if (!this.isPlayingRecord) {
      this.playRecord(startIndex)
      this.isAutoplayStarted = !this.isAutoplayStarted
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

  handleRecordIsPlaying(fileName: RecordT['fileName']): void {
    this.pauseOtherPlayers()
    this.activeAudio = fileName
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
        this.isAutoplayStarted ? this.delayBetweenAutoplay : 0
      )
    }
  }

  pauseOtherPlayers(): void {
    for (const player of this.players) {
      if (player.fileName !== this.activeAudio) {
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
  @apply overflow-scroll;
  height: 400px;
}
</style>
