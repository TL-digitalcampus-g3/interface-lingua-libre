<template>
  <div class="actionBar">
    <div class="actionBar__control"></div>
    <div class="actionBar__tagSelector">
      <TagSelector />
    </div>
    <div class="actionBar__toggleAutoPlay">
      <CheckBox label="Lecture automatique" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CheckBox from '~/components/ui/CheckBox.vue'
import TagSelector from '~/components/TagSelector.vue'

@Component({
  components: { CheckBox, TagSelector },
})
export default class ActionBar extends Vue {}
</script>

<style scoped lang="scss">
.actionBar {
  @apply bg-primary grid px-9 shadow-lg items-center;
  grid-template-columns: auto auto auto;
}

[class*='actionBar__'] {
  background-color: crimson;
}

.actionBar__toggleAutoPlay {
  @apply justify-self-end;
}
</style>