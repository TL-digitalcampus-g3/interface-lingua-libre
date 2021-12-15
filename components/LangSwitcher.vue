<template>
  <div id="lang-switcher">
    <NuxtLink :to="switchLocalePath('en')">
      <button class="btn btn-blue">{{ $t('LANGS.EN') }}</button>
    </NuxtLink>
    <NuxtLink :to="switchLocalePath('fr')">
      <button class="btn btn-blue">{{ $t('LANGS.FR') }}</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'nuxt-property-decorator'

@Component
export default class LangSwitcher extends Vue {
}
</script>

<style lang="scss" scoped>

#lang-switcher {
  @apply bg-gray-100 p-4;

  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-blue {
    @apply bg-blue-500 text-white;
  }

  .btn-blue:hover {
    @apply bg-blue-700;
  }
}
</style>
