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
  border-radius: 5px;
  display: inline-block;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
}
</style>