<template>
  <div class="dropdown">
    <div class="body-wrapper">
      <div class="body">
        <div
          v-for="option in options"
          :key="option.value"
          class="option"
          :style="[
            selectedValue === option.value
              ? { color: 'var(--color-primary)' }
              : {},
          ]"
          @click="selectedValue = option.value"
        >
          {{ option.text }}
        </div>
      </div>
    </div>
    <div class="title">
      {{ selectedValueText }}
      <CustomIcon class="ml-2" name="chevronDown" :size="1" color="inherit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from 'nuxt-property-decorator'
import CustomIcon from '~/components/Icon/index.vue'

export interface DropdownOption {
  text: string
  value: string | number
}

@Component({ components: { CustomIcon } })
export default class DropDown extends Vue {
  @VModel({ required: true }) selectedValue!: string | number
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

  &:hover {
    .title {
      background: var(--color-primary);
      border: 1px solid var(--color-primary);
      color: white;
    }

    .body {
      display: block;
    }
  }

  .title {
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
  }

  .body-wrapper {
    position: relative;
  }

  .body {
    display: none;
    position: absolute;
    background: white;
    color: black;
    text-align: center;
    border-radius: 5px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;

    .option {
      cursor: pointer;

      padding: 0.5rem 1rem;

      &:hover {
        background: var(--color-secondary);
      }
    }
  }
}
</style>
