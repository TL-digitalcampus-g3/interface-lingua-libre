<template>
  <div class="minimal-player">
    <button class="state-button" @click="$emit('state-button-clicked')">
      <CustomIcon
        v-show="state === 'pause'"
        name="play"
        :color="color"
        size="2.7"
      />
      <CustomIcon
        v-show="state === 'play'"
        name="pause"
        :color="color"
        size="2.7"
      />
      <CustomIcon
        v-show="state === 'ended'"
        name="refresh"
        :color="color"
        size="2.7"
      />
    </button>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'nuxt-property-decorator'
import {PlayerState} from '~/models/Audio'
import CustomIcon from '~/components/Icon/index.vue'

@Component({components: {CustomIcon}})
export default class MinimalPlayer extends Vue {
  @Prop({required: true}) readonly title!: string
  @Prop({required: true}) readonly state!: PlayerState
  @Prop({default: 'var(--color-primary)'}) readonly color!: string
}
</script>

<style lang="scss" scoped>
.minimal-player {
  display: flex;
  align-items: center;

  .title {
    @apply ml-4 transition duration-300 ease-linear;

    font-weight: bold;
    font-size: 1.3rem;
  }

  &.is--active {
    .title {
      @apply text-primary;
      font-size: 2rem;
    }
  }
}
</style>
