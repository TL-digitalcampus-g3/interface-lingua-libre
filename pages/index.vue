<template>
  <div>
    <Collection/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Collection from '~/components/Audio/Collection.vue'

@Component({
  components: {Collection},
})
export default class Demo extends Vue {
}
</script>
