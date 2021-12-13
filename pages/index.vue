<template>
  <div>
    <h1>{{ test }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {
  test: string = 'hello world'
}
</script>
