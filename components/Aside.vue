<template>
  <div>
    <div class="aside__block__information">
      <div class="flex items-end mb-5">
        <vc-donut :sections="sections" background="white" foreground="var(--color-secondary)" :size="100" unit="px"
                  :thickness="20"
                  :total="100" :start-angle="0"/>
        <p class="ml-4 text-sm"><span class="block font-bold text-lg">{{ taggedRecordsCount }}/{{ $store.state.recordsCount }} </span>sons
          révisés</p>
      </div>
      <div class="information__text">
        <CustomIcon name="collection" :size="1.5"/>
        <p>Français - Masculin</p>
      </div>

    </div>
    <div class="aside__block__option">
      <h3>{{ $t('SHORTCUT.KEYBOARD_SHORTCUT') }}</h3>
      <ul>
        <li>
          <p class="capitalize">{{ $t('SHORTCUT.PLAY') + " / " + $t('SHORTCUT.PAUSE') }}</p><kbd
          class="keyword_shortcut">Espace</kbd>
        </li>
        <li>
          <p>{{ $t('SHORTCUT.REPEAT') }}</p><kbd class="keyword_shortcut">←</kbd>
        </li>
      </ul>
      <h3>{{ $t('PLAYBACK_OPTION.PLAYBACK_OPTION') }}</h3>
      <ul>
        <li>
          <p>{{ $t('PLAYBACK_OPTION.JUMP_TIME') }}</p>
        </li>
        <li>
          <p>{{ $t('PLAYBACK_OPTION.PLAYER_AUTO') }}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang='ts'>
import {
  Vue,
  Component
} from 'nuxt-property-decorator'
import CustomIcon from '~/components/Icon/index.vue'


@Component({
  components: {
    CustomIcon
  }
})
export default class Aside extends Vue {
  sections: any[] = [{value: 25, color: 'var(--color-primary)'}]

  get taggedRecordsCount(): number {
    return this.$store.getters.taggedRecordsCount
  }

  //     handleSectionClick(section, event) {
  //     console.log(`${section.label} clicked.`);
  //   }
}

</script>

<style scoped lang="scss">
[class*="aside__block__"] {
  @apply dark:bg-backgroundBlock-dark bg-backgroundBlock-light rounded-lg p-5 mb-6
}

.aside__block__option {
  li {
    @apply flex justify-between items-center mb-1
  }
}

.information__text {
  @apply flex items-center;

  p {
    @apply ml-2
  }


}

.cdc-container {
  @apply inline-block;
}

.cdc-overlay {
  @apply bg-backgroundBlock-light dark:bg-backgroundBlock-dark;
}


.keyword_shortcut {
  @apply inline-block text-xs border-4 px-2 py-1 m-1 rounded bg-backgroundApp-light dark:bg-backgroundApp-dark shadow-sm;

  border: 1px solid rgb(204, 204, 204);


}

</style>
