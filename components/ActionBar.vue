<template>
  <div class="actionBar">
    <div class="actionBar__control">
      <GlobalPlayer/>
      <CheckBox
        :label="$t('PLAYBACK_OPTION.PLAYER_AUTO')"
        :isChecked="$store.state.isAutoplayMode"
        @click="handleClickCheckboxAutoplay"
      />
    </div>
    <div class="actionBar__tagSelector">
      <TagSelector />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CheckBox from '~/components/ui/CheckBox.vue'
import TagSelector from '~/components/TagSelector/index.vue'
import GlobalPlayer from '~/components/Audio/Player/GlobalPlayer.vue'

@Component({
  components: { CheckBox, TagSelector, GlobalPlayer },
})
export default class ActionBar extends Vue {
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
  @apply bg-primary flex px-9 shadow-lg items-center justify-between text-text-dark;
  grid-template-columns: auto auto;
}

.actionBar__control{
  @apply flex flex-wrap items-center gap-3
}

.actionBar__tagSelector {
  @apply justify-self-end;
}
</style>
