<template>
  <div>
    <div class="basePage">
      <Header class="pageHeader"></Header>
      <!-- <h1>{{ test }}</h1> -->
      <div class="pageMain">
        <Collection class="pageMain__collection"></Collection>
        <Aside class="pageMain__aside"></Aside>
        <LangSwitcher class="pageMain__langSwitcher"/>
      </div>

      <ActionBar class="pageBottomBar"></ActionBar>
     
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Collection from '~/components/Audio/Collection.vue'
import LangSwitcher from '~/components/LangSwitcher.vue'
import Header from '~/components/Header.vue'
import ActionBar from '~/components/ActionBar.vue'
import Aside from '~/components/Aside.vue'

@Component({
  components: {LangSwitcher, Collection,Header,ActionBar,Aside},
})
export default class Demo extends Vue {}
</script>

<style lang="scss">
.basePage {
  @apply grid h-screen bg-backgroundApp-light dark:bg-backgroundApp-dark;
  grid-template-columns: 5rem auto;
  grid-template-rows: auto 5rem;
}

// .pageHeader {
//   @apply ;
// }

.pageMain{
  @apply grid px-6;
  grid-template-columns: auto 280px;
  grid-template-rows: auto 5rem;
  gap: 20px;
}

.pageMain__collection{
  grid-column: 1 / 2
}

.pageMain__aside{
  grid-column: 2 / 3
}
.pageMain__langSwitcher{
  grid-column: 1 / 3
}
.pageBottomBar{
  grid-column: 1 / 3;
}


body{
  @apply text-text-light dark:text-text-light
}
</style>
