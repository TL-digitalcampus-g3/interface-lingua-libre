<template>
  <div>
    <div class="aside__block__information">
      <div class="flex items-end mb-5">
        <vc-donut
          :sections="[
            { value: taggedRecordsCount, color: 'var(--color-primary)' },
          ]"
          :size="70"
          :thickness="25"
          :total="$store.state.recordsCount"
          :start-angle="0"
          :background="donutBgColor"
          foreground="var(--color-secondary)"
          unit="px"
        />
        <p class="ml-4 text-sm">
          <span class="block font-bold text-lg"
          >{{ taggedRecordsCount }}/{{ $store.state.recordsCount }} </span
          >{{ $t('GLOBAL.SOUNDS_CHECKED') }}
        </p>
      </div>
      <div class="information__text">
        <CustomIcon name="collection" :size="1.5"/>
        <country-flag country='fr' size='small'/>
        <p>{{ $t('LANGS.FR') }} - {{ $t('GENDER.MASCULINE') }}</p>
      </div>
    </div>
    <div class="aside__block__option">
      <h3>{{ $t('SHORTCUT.KEYBOARD_SHORTCUT') }}</h3>
      <ul>
        <li>
          <p class="capitalize">
            {{ $t('SHORTCUT.PLAY') + ' / ' + $t('SHORTCUT.PAUSE') }}
          </p>
          <kbd class="keyword_shortcut">Espace</kbd>
        </li>
        <li>
          <p>{{ $t('SHORTCUT.REPEAT') }}</p>
          <kbd class="keyword_shortcut">←</kbd>
        </li>
      </ul>
      <h3>{{ $t('PLAYBACK_OPTION.PLAYBACK_OPTION') }}</h3>
      <ul>
        <li>
          <p>{{ $t('PLAYBACK_OPTION.JUMP_TIME') }}</p>
        </li>
        <li>
          <CheckBox
            id="toogle-secondary"
            :label="$t('PLAYBACK_OPTION.PLAYER_AUTO')"
            :isChecked="$store.state.isAutoplayMode"
            @click="handleClickCheckboxAutoplay"
          />
        </li>
      </ul>
      <hr/>
      <div class="debug">
        Last record index :
        {{
          $store.state.lastRecordIndexPlayed
            ? $store.state.lastRecordIndexPlayed
            : 'null'
        }}
        <button class="bg-red-900 p-3 text-white" @click="clearPersistantDatas">
          Clear persistant datas
        </button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {Vue, Component} from 'nuxt-property-decorator'
import CountryFlag from 'vue-country-flag'
import CustomIcon from '~/components/Icon/index.vue'
import CheckBox from '~/components/ui/CheckBox.vue'

@Component({
  components: {
    CustomIcon,
    CountryFlag,
    CheckBox
  },
})
export default class Aside extends Vue {
  get donutBgColor(): string {
    if (this.isDarkMode) {
      return 'var(--color-bg-backgroundBlock-dark)'
    } else {
      return 'var(--color-bg-backgroundBlock-light)'
    }
  }

  get isDarkMode(): boolean {
    return this.$store.getters.isDarkMode
  }

  get taggedRecordsCount(): any {
    return this.$store.getters.taggedRecordsCount
  }

  handleClickCheckboxAutoplay(): void {
    this.$store.commit(
      'UPDATE_AUTOPLAY_MODE',
      !this.$store.state.isAutoplayMode
    )
  }

  clearPersistantDatas() {
    // Clear localStorage
    localStorage.clear()

    // Clear cookies
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    // Refresh page
    location.reload()
  }
}
</script>

<style lang="scss">
[class*='aside__block__'] {
  @apply dark:bg-backgroundBlock-dark bg-backgroundBlock-light rounded-lg p-5;
}

.aside__block__information {
  @apply col-span-full md:col-span-1 lg:col-span-full;
}

.aside__block__option {
  @apply col-span-full md:col-span-1 lg:col-span-full;
  li {
    @apply flex justify-between items-center mb-1;
  }
}

.information__text {
  @apply flex items-center gap-2;


}

.cdc-container {
  @apply inline-block;
}

// .cdc-overlay {
//   @apply bg-backgroundBlock-light dark:bg-backgroundBlock-dark;
// }

.keyword_shortcut {
  @apply inline-block text-xs border-4 px-2 py-1 m-1 rounded bg-backgroundApp-light dark:bg-backgroundApp-dark shadow-sm;

  border: 1px solid rgb(204, 204, 204);
}

.cdc-filler {
  // @apply duration-150 ease-out
}

.debug {
  @apply bg-red-900 bg-opacity-30 p-5 mt-5;
  font-family: 'Courier New';
  font-size: 12px;
}
</style>
