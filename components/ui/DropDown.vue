<template>
  <div class="dropdown">
    <div class="title">{{ selectedValueText }}</div>
    <div class="body">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        @click="selectedValue = option.value"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'

export interface DropdownOption {
  text: string
  value: string | number
}

@Component
export default class DropDown extends Vue {
  @VModel({ required: true }) readonly selectedValue!: string | number
  @Prop({ required: true }) readonly options!: DropdownOption[]

  get selectedValueText(): string {
    const option = this.options.find((o) => o.value === this.selectedValue)

    if (!option) {
      throw new Error('SelectedValue does not match any given option')
    }

    return option.text
  }
}
</script>

<style lang="scss">
.dropdown {
  display: inline-block;

  .body {
    display: none;
    position: absolute;
    background: white;

    .option {
      cursor: pointer;

      padding: 0.5rem 1rem;

      &:hover {
        background: var(--color-secondary);
      }
    }
  }
  &:hover {
    .body {
      display: block;
    }
  }
}
</style>
