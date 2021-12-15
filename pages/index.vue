<template>
  <div >
    <div class="basePage">
      <Header class="pageHeader"></Header>
      <!-- <h1>{{ test }}</h1> -->
      <Collection class="pageCollection" />
      <div class="pageBottomBar">
        <!-- <BottomBar/> -->
      </div>
    </div>
      
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Test from '~/components/Test.vue'
import Collection from '~/components/Audio/Collection.vue'
import Header from '~/components/Header.vue'

@Component({
  components: { Test, Collection,Header },
  async asyncData({ $axios }): Promise<any> {
    const records = await $axios
      .$get(`datas/millars.json`)
      .then((res) => res.records)
      .catch((error) => {
        if (this.$axios.isCancel(error)) {
          console.log('Request canceled', error)
        } else {
          console.log(error)
        }
      })

    return {
      records,
    }
  },
})
export default class Demo extends Vue {
  test: string = 'hello world'
  records: any = {}
}
</script>

<style scoped lang="scss">

.basePage{
  @apply grid h-screen;
  grid-template-columns: 5rem auto;
  grid-template-rows: auto 5rem;
  column-gap: 20px;
}

.pageHeader{
  @apply shadow-lg bg-backgroundBlock-light;
}

// .pageCollection{

// }

.pageBottomBar{
  @apply bg-primary shadow-lg ;
  height: 80px;
  grid-column: 1 / 3;

  
}

</style>
