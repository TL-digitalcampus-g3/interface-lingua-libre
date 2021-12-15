<template>
  <div>
    {{ $t('GLOBAL.LOADING') }}
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'nuxt-property-decorator'

@Component
export default class Loader extends Vue {
}
</script>

<style lang="scss">
</style>
