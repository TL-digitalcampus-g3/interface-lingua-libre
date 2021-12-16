<template>
  <div class="actionBar">
    <div class="actionBar__control">
      <MinimalPlayer
        title="stub"
        state="pause"
        color="white"
        @state-button-clicked="
          handleClickPlayAuto(
            $store.state.lastRecordIndexPlayed !== null
              ? $store.state.lastRecordIndexPlayed + 1
              : 0
          )
        "
      />
    </div>
    <div class="actionBar__tagSelector">
      <TagSelector />
    </div>
    <div class="actionBar__toggleAutoPlay">
      <CheckBox
        :label="$t('PLAYBACK_OPTION.PLAYER_AUTO')"
        :isChecked="$store.state.isAutoplayMode"
        @click="handleClickCheckboxAutoplay"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CheckBox from '~/components/ui/CheckBox.vue'
import TagSelector from '~/components/TagSelector/index.vue'
import MinimalPlayer from '~/components/Audio/Player/MinimalPlayer.vue'

@Component({
  components: { CheckBox, TagSelector, MinimalPlayer },
})
export default class ActionBar extends Vue {
  handleClickPlayAuto(): void {
    console.log('handleClickPlayAuto')
    this.$store.commit('HANDLE_PLAY_RECORDS', { autoplay: true, startIndex: 0 })
  }

  handleClickCheckboxAutoplay(): void {
    this.$store.commit(
      'UPDATE_AUTOPLAY_MODE',
      !this.$store.state.isAutoplayMode
    )
  }
}
</script>

<style scoped lang="scss">
.actionBar {
  @apply bg-primary grid px-9 shadow-lg items-center;
  grid-template-columns: auto auto auto;
}

.actionBar__toggleAutoPlay {
  @apply justify-self-end;
}
</style>
