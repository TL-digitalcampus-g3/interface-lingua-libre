<template>
  <div class="actionBar">
    <div class="actionBar__control">
      <button class="btn"
              @click="handleClickPlayAuto(($store.state.lastRecordIndexPlayed !== null) ? ($store.state.lastRecordIndexPlayed + 1) : 0)">
        <CustomIcon v-if="$store.state.isAutoplayMode" name="pause"/>
        <CustomIcon v-else name="play"/>
      </button>
    </div>
    <div class="actionBar__tagSelector">
      <TagSelector/>
    </div>
    <div class="actionBar__toggleAutoPlay">
      <CheckBox label="Lecture automatique"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'nuxt-property-decorator'
import CustomIcon from '@/components/Icon/index.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import TagSelector from '~/components/TagSelector.vue'

@Component({
  components: {CheckBox, TagSelector, CustomIcon},
})
export default class ActionBar extends Vue {
  handleClickPlayAuto(startIndex: number = 0): void {
    this.$store.commit('UPDATE_AUTOPLAY_MODE', !this.$store.state.isAutoplayMode)
    if (!this.$store.state.isPlayingRecord) {
      // this.playRecord(startIndex)
      this.$store.commit('NEED_TO_PLAY_RECORD', startIndex)
      this.$store.commit('UPDATE_AUTOPLAY_STARDED', !this.$store.state.isAutoplayStarted)
    }
  }
}
</script>

<style scoped lang="scss">
.actionBar {
  @apply bg-primary grid px-9 shadow-lg items-center;
  grid-template-columns: auto auto auto;
}

[class*='actionBar__'] {
  background-color: crimson;
}

.actionBar__toggleAutoPlay {
  @apply justify-self-end;
}
</style>
