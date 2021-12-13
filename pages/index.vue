<template>
  <div>
    <h1>{{ test }}</h1>
    <Test/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Test from "~/components/Test.vue";

@Component({
  components: {Test}
})
export default class Demo extends Vue {
  test: string = 'hello world'
}
</script>
