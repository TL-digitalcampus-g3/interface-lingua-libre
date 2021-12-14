<template>
  <div>
    <LangSwitcher/>
    <Collection/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'nuxt-property-decorator'
import Collection from '~/components/Audio/Collection.vue'
import LangSwitcher from '~/components/LangSwitcher.vue'

@Component({
  components: {LangSwitcher, Collection},
})
export default class Demo extends Vue {
}
</script>
