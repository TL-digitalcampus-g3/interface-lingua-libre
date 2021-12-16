<template>
  <div class="badge" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Badge extends Vue {
  @Prop({ default: 'white' }) readonly bgColor!: string

  get style(): Record<string, string> {
    return {
      backgroundColor: this.bgColor,
    }
  }
}
</script>

<style lang="scss" scoped>
.badge {
  color: black;
  border-radius: 7px;
  display: inline-block;
  padding: 0.1rem 0.4rem;
  font-size: 0.9rem;
}
</style>