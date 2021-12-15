<template>
  <div>
    <div class="basePage">
      <Header class="pageHeader"></Header>
      <!-- <h1>{{ test }}</h1> -->
      <div class="pageMain">
        <Collection />
        <LangSwitcher />
      </div>

      <div class="pageBottomBar">
        <!-- <BottomBar/> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Collection from '~/components/Audio/Collection.vue'
import LangSwitcher from '~/components/LangSwitcher.vue'
import Header from '~/components/Header.vue'

@Component({
  components: { LangSwitcher, Collection, Header },
})
export default class Demo extends Vue {}
</script>

<style scoped lang="scss">
.basePage {
  @apply grid h-screen;
  grid-template-columns: 5rem auto;
  grid-template-rows: auto 5rem;
  column-gap: 20px;
}

.pageHeader {
  @apply shadow-lg bg-backgroundBlock-light;
}

// .pageCollection{

// }

.pageBottomBar {
  @apply bg-primary shadow-lg;
  height: 80px;
  grid-column: 1 / 3;
}
</style>
