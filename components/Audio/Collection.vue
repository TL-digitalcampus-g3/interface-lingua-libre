<template>
  <div id="collection">
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <button class="btn" @click="handleClickPlayAuto">
        <CustomIcon v-if="isAutoplayMode" name="pause" />
        <CustomIcon v-else name="play" @click="pauseOtherPlayers" />
      </button>
      <div>
        <input id="autoplay" type="checkbox" :checked="isAutoplayMode" />
        {{ $t('GLOBAL.PLAYER_AUTO') }}
        
        <CheckBox :label="$t('GLOBAL.PLAYER_AUTO')" :isChecked="isAutoplayMode"/>
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
      <button class="btn"
              :class="[{'btn--disabled': !hasResultsToShare}]"
              @click="handleClickTransfertResults"
              :disabled="!hasResultsToShare">
        Send validation
      </button>
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
import CustomIcon from '@/components/Icon/index.vue'
import AudioPlayer from '~/components/Audio/Player/index.vue'
import PlayIcon from '~/components/Icon/Play.vue'
import PauseIcon from '~/components/Icon/Pause.vue'
import CheckBox from '~/components/ui/CheckBox.vue'

interface Record {
  fileName: string
}

@Component({
  components: { Loader, AudioPlayer, PlayIcon, PauseIcon, CheckBox },
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

  records: Record[] = []
  isLoading: boolean = true
  isAutoplayMode: boolean = false
  currentRecordPlaying: number | null = null
  recordsPlayed: Record[] = []
  countRecords: number = 0
  checkedRecords: number = 0
  hasResultsToShare: boolean = false

  @Watch('records', { immediate: true })
  onRecordsChanged(): void {
    this.countRecords = this.records.length
  }

  @Watch('recordsPlayed', {immediate: true})
  onRecordsPlayed(): void {
    this.checkedRecords = this.recordsPlayed.length
    this.hasResultsToShare = this.recordsPlayed.length > 0
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
    // TODO Setup timeout (ms)
  }

  handleRecordPlayed(currentPlayerIndex: number): void {
    this.currentRecordPlaying = null
    this.pauseOtherPlayers(currentPlayerIndex)
    let recordFound: boolean = false
    this.recordsPlayed.forEach(record => {
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

  handleClickTransfertResults(): void {
    const hash = new Date().getTime();
    this.generateOutputResult(`records-${hash}.xml`)
  }

  generateOutputResult(filename: string): void {
    const docWrapper = document.implementation.createDocument("", "", null)
    const patrolElement = docWrapper.createElement("patrol")
    patrolElement.setAttribute("date", this.getCurrentDate())

    this.recordsPlayed.forEach((record) => {
      const file = docWrapper.createElement("file")
      file.setAttribute("name", `${record.fileName}`)

      const commonsURL = docWrapper.createElement("commonsURL")
      commonsURL.innerHTML = "https://"

      const locutor = docWrapper.createElement("locutor")
      locutor.innerHTML = "Guilhelma"

      const tag = docWrapper.createElement("tag")
      tag.innerHTML = "Valid"

      file.appendChild(commonsURL)
      file.appendChild(locutor)
      file.appendChild(tag)

      patrolElement.appendChild(file)
    })

    docWrapper.appendChild(patrolElement)
    this.downloadFile(filename, docWrapper)
  }

  getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  downloadFile(filename: string, content?: any) {
    // Serialize the XML file
    const outputSerialized = new XMLSerializer().serializeToString(content)
    // Create a blob element to wrap serialized xml file
    const blob = new Blob([outputSerialized], {type: 'application/xml'})
    const objectUrl = URL.createObjectURL(blob);
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
      this.players[playerIndex].play()
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

.btn--disabled {
  @apply bg-gray-lightest shadow-none hover:bg-gray-light text-gray;
}
</style>
