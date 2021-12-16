<template>
  <div>
    <!-- <div class="dropdownMenu__collection" v-if="options==='isCollection'"></div>-->
    <div class="dropdownMenu__light" v-if="options==='isLight'">
      <button class="btn btn-blue" @click="handleDarkMode('dark')">Dark</button>
      <button class="btn btn-blue" @click="handleDarkMode('light')">Light</button>
      <button class="btn btn-blue" @click="handleDarkMode('auto')">System</button>
    </div>
    <div class="dropdownMenu__information" v-if="options==='isInformation'">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores vero veritatis ipsam quidem, ad adipisci
        cupiditate praesentium eum corporis commodi minima unde quasi officiis sunt placeat in labore soluta
        officia!</p>
    </div>
    <div class="dropdownMenu__language" v-if="options==='isLanguage'">
      <NuxtLink :to="switchLocalePath('en')">
        <button class="btn btn-blue">{{ $t('LANGS.EN') }}</button>
      </NuxtLink>
      <NuxtLink :to="switchLocalePath('fr')">
        <button class="btn btn-blue">{{ $t('LANGS.FR') }}</button>
      </NuxtLink>
    </div>
    <div class="dropdownMenu__user" v-if="options==='isUser'">
        <p class="font-bold">WorkshopM2TLGPE3 (Q710559)</p>
        <p>Masculin - Français - Locuteur natif</p>
        <p class="underline">Déconnexion</p>
        


    </div>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator'

@Component
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
}
</script>

<style lang="scss">

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
  @apply bg-gray-200;
}
.dropdownMenu__user p{
    @apply m-2
}

</style>

