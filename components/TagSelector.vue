<template>
  <div>
    <div v-for="tag in tags" :key="tag">
      {{ tag }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Tag } from '~/models/Record'

@Component
export default class className extends Vue {
  readonly tags: Tag[] = Object.values(Tag)
}
</script>