<template>
  <DropDown :options="options" v-model="speedRate" />
</template>

<script lang="ts">
import { Vue, Component, VModel } from 'nuxt-property-decorator'
import DropDown, { DropdownOption } from '~/components/ui/DropDown.vue'
import { SpeedRate } from '~/models/Audio'

@Component({ components: { DropDown } })
export default class SpeedRateSelector extends Vue {
  @VModel({ required: true }) readonly speedRate!: string

  get options(): DropdownOption[] {
    return [
      {
        text: `x${SpeedRate.Normal}`,
        value: SpeedRate.Normal,
      },
      {
        text: `x${SpeedRate.Slow}`,
        value: SpeedRate.Slow,
      },
      {
        text: `x${SpeedRate.Fast}`,
        value: SpeedRate.Fast,
      },
    ]
  }
}
</script>
