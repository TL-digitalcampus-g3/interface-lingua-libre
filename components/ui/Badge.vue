<template>
  <div class="badge">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Badge extends Vue {}
</script>

<style lang="scss" scoped>
.badge {
  background: white;
  color: black;
  border-radius: 7px;
  display: inline-block;
  padding: 0.1rem 0.4rem;
  font-size: 0.9rem;
}
</style>