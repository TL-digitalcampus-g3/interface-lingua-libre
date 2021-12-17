<template>
  <div id="dropdown-menu">
    <div class="dropdownMenu__light" v-if="options==='isLight'">
      <button class="btn btn-blue" @click="handleDarkMode('dark')">{{ $t('GLOBAL.DARK') }}</button>
      <button class="btn btn-blue" @click="handleDarkMode('light')">{{ $t('GLOBAL.LIGHT') }}</button>
      <button class="btn btn-blue" @click="handleDarkMode('auto')">{{ $t('GLOBAL.AUTO') }}</button>
    </div>
    <div class="dropdownMenu__information" v-if="options==='isInformation'">
      <p>{{ $t('GLOBAL.PRESENTATION') }}</p>
    </div>
    <div class="dropdownMenu__language" v-if="options==='isLanguage'">
      <NuxtLink :to="switchLocalePath('en')">
        <button class="btn btn-blue">
          <country-flag country="gb" size="small"/>
          {{ $t('LANGS.EN') }}
        </button>
      </NuxtLink>
      <NuxtLink :to="switchLocalePath('fr')">
        <button class="btn btn-blue">
          <country-flag country="fr" size="small"/>
          {{ $t('LANGS.FR') }}
        </button>
      </NuxtLink>
    </div>
    <div class="dropdownMenu__user" v-if="options==='isUser'">
      <p class="font-bold">WorkshopM2TLGPE3 (Q710559)</p>
      <div class="m-2">
        <p class="contents">{{ $t('GENDER.MASCULINE') }} - </p>
        <country-flag country="fr" size="small"/>
        <p class="contents">{{ $t('LANGS.FR') }}</p>
      </div>
      <p>{{ $t('LOCUTOR.NATIVE') }}</p>
      <p class="underline" @click="clearPersistantDatas">{{ $t('GLOBAL.LOGGOUT') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'nuxt-property-decorator'
import CountryFlag from 'vue-country-flag'

@Component({
  components: {
    CountryFlag
  },
})
export default class DropDownMenu extends Vue {
  @Prop({required: true}) readonly options!: string

  handleDarkMode(mode: string): void {
    if (mode === 'dark') {
      this.$store.commit('UPDATE_DARK_MODE', true)
    } else if (mode === 'light') {
      this.$store.commit('UPDATE_DARK_MODE', false)
    } else {
      this.$store.commit('UPDATE_DARK_MODE', window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
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

#dropdown-menu {
  @apply z-100;
}

[class*="dropdownMenu__"] {
  @apply bg-backgroundBlock-light dark:bg-backgroundBlock-dark p-4 shadow rounded-lg max-w-xs w-max
}

.btn {
  @apply font-bold py-2 px-4 rounded-md mb-2;
}

.btn-blue {
  @apply bg-backgroundApp-light dark:bg-backgroundApp-dark;
}

.btn-blue:hover {
  @apply bg-gray-200 dark:bg-gray-darkest dark:text-white;
}

.dropdownMenu__user p {
  @apply m-2
}

</style>

