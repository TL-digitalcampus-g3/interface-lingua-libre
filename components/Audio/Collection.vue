<template>
  <div id="collection">
    <Loader v-if="isLoading"/>
    <div v-else class="collection_structure">
      <div ref="collectionWrapper" class="collection_sounds">
        <AudioPlayer
          v-for="(record, index) in records"
          :key="record.fileName"
          ref="players"
          :record="record"
          @scrollTo="handleScrollTo"
          @recordPlayed="handleRecordPlayed(index)"
        />
      </div>
      <div class="collection_btn">
        <button
          class="btn-share"
          :class="[{ 'btn--disabled': !hasResultsToShare }]"
          @click="handleClickTransfertResults"
          :disabled="!hasResultsToShare"
        >
          {{ $t('GLOBAL.SEND_TAGGED_RECORDS') }} <span v-if="taggedRecordsCount">({{ taggedRecordsCount }})</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Ref, Watch} from 'nuxt-property-decorator'
import Loader from '~/components/Loader.vue'
import CustomIcon from '@/components/Icon/index.vue'
import AudioPlayer from '~/components/Audio/Player/index.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import {RecordT, Tag, TagMap} from '~/models/Record'
import {TagMutationPayload} from '~/store'
import {AudioData, PlayerState} from '~/models/Audio'

enum KeycodeList {
  SPACE = 32,
  ESCAPE = 27,
  ARROW_LEFT = 37,
  ARROW_UP = 38,
  ARROW_RIGHT = 39,
  ARROW_DOWN = 40,
}

@Component({
  components: {Loader, AudioPlayer, CustomIcon, CheckBox},
})
export default class Collection extends Vue {
  @Ref() readonly players!: AudioPlayer[]

  records: RecordT[] = []
  isLoading: boolean = true
  lastRecordIndexPlayed: number | null = null
  delayBetweenAutoplay: number = 3000 // in ms

  get recordsCount(): number {
    return this.$store.state.recordsCount
  }

  get tagMap(): TagMap {
    return this.$store.state.tagMap
  }

  get recordsMapIndex(): Record<RecordT['fileName'], number> {
    const recordsMap: Record<RecordT['fileName'], number> = {}

    this.records.forEach((record, index) => {
      recordsMap[record.fileName] = index
    })

    return recordsMap
  }

  get taggedRecords(): RecordT['fileName'][] {
    return this.$store.getters.taggedRecords
  }

  get taggedRecordsCount(): number {
    return this.$store.getters.taggedRecordsCount
  }

  get isAutoPlayMode(): boolean {
    return this.$store.state.isAutoplayMode
  }

  get hasResultsToShare(): boolean {
    return this.taggedRecordsCount > 0
  }

  get activeAudio(): RecordT['fileName'] | null {
    return this.$store.state.activeAudio ?? null
  }

  get isPlayingRecord(): boolean {
    return Boolean(this.activeAudio)
  }

  mounted(): void {
    this.fetchContent()
    document.onkeydown = function (event) {
      if (window.event) {
        // @ts-ignore
        const key = window.event.keyCode
        if (key === 65 && event.ctrlKey) {
          console.log('crtl + a')
          window.event.preventDefault()
        } else if (key === KeycodeList.ESCAPE) {
          console.log('escape key pressed')
          window.event.preventDefault()
        } else if (key === KeycodeList.SPACE) {
          console.log('space key pressed')
          window.event.preventDefault()
        } else if (key === KeycodeList.ARROW_LEFT) {
          console.log('arrow left key pressed')
          window.event.preventDefault()
        } else if (key === KeycodeList.ARROW_RIGHT) {
          console.log('arrow right key pressed')
          window.event.preventDefault()
        }
      }
    }
  }

  async fetchContent() {
    try {
      const res = await this.$axios.get<{ records: RecordT[] }>(
        `datas/millars.json`
      )
      const records: RecordT[] = res.data.records
      const audioDatas: AudioData[] = records.map(
        (record): AudioData => ({
          fileName: record.fileName,
          word: record.word,
          playerState: PlayerState.Pause,
        })
      )

      this.records = records
      this.$store.commit('SET_AUDIO_MAP', audioDatas)
      this.$store.commit('SET_ACTIVE_AUDIO', records[0].fileName)
    } finally {
      this.isLoading = false
    }
  }

  @Watch('isAutoPlayMode')
  changeAutoPlayMode() {
    console.log('autoplay mode changed', this.isAutoPlayMode)
  }

  @Watch('records')
  updateRecords() {
    this.$store.commit('UPDATE_RECORDS_COUNT', this.records.length)
  }

  handleScrollTo(pxValue: number): void {
    if (this.$refs.collectionWrapper) {
      // @ts-ignore
      this.$refs.collectionWrapper.scrollTop = pxValue
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
        tag: Tag.Valid,
      }

      this.$store.dispatch('setTag', setTagPayload)
    }

    this.$store.state.isAutoplayMode && this.playRecord(currentPlayerIndex + 1)
    this.$store.commit('SET_LATEST_AUDIO_INDEX_PLAYED', currentPlayerIndex)
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
    const blob = new Blob([outputSerialized], {type: 'application/xml'})
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
}
</script>

<style lang="scss" scoped>
.btn-share {
  @apply bg-primary text-white p-3 rounded mt-5 mb-2 px-5 uppercase text-sm;
}

.btn--disabled {
  @apply bg-gray-lightest shadow-none hover:bg-gray-light text-gray;
}

.collection_structure {
  @apply grid;

  @screen lg{
    height: calc(100vh - 128px);
  } 

}

.collection_sounds {
  @apply lg:overflow-y-scroll px-5 flex flex-col justify-start relative pb-9;

  scroll-behavior: smooth;
  // padding-top: 30%;
}

.collection_btn {
  @apply text-center relative;

  &::before {
    @apply bg-gradient-to-t from-backgroundApp-light dark:from-backgroundApp-dark block absolute w-full top-0 left-0;
    content: '';

    $shadowHeight: 5rem;
    height: $shadowHeight;
    transform: translateY(-$shadowHeight);
  }
}

</style>
