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
  @apply grid p-6 overflow-y-scroll;
  grid-template-columns: auto 280px;
  grid-template-rows: auto 5rem;
  gap: 20px;
  height: calc(100vh - 80px);
}

.pageMain__collection{
  grid-column: 1 / 2;
  @apply col-span-full lg:col-span-1 order-1 lg:order-none
}

.pageMain__aside{
  grid-column: 2 / 3;
  @apply col-span-full lg:col-span-1 
}
.pageMain__langSwitcher{
  @apply col-span-full
}
.pageBottomBar{
  @apply col-span-full
}


body{
  @apply text-text-light dark:text-text-dark
}

h3{
  @apply text-sm font-bold uppercase mb-3
}

p::first-letter{
  text-transform: uppercase;
}

ul{
  @apply mb-5
}




//Scroll Bar

/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-secondary);
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: var(--color-secondary);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);
  border-radius: 20px;
  border: 3px solid var(--color-secondary);
}
</style>
