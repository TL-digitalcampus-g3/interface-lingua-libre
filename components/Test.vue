<template>
  <div id="test">
    <h1 class="test__title">{{ demo }}</h1>
    {{ $t('GLOBAL.HOME') }}
    <hr/>
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
export default class Test extends Vue {
  demo: string = 'hello demo'
}
</script>

<style lang="scss">

#test {
  @apply bg-blue-800 bg-opacity-20;

  $testPadding: 4.125rem;

  padding: $testPadding;

  .test-title {
    @apply bg-red-900;
  }
}

.btn {
  @apply font-bold py-2 px-4 rounded;
}

.btn-blue {
  @apply bg-blue-500 text-white;
}

.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
