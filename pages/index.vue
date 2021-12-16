<template>
  <div>
    <div class="basePage">
      <Header class="pageHeader"></Header>
      <!-- <h1>{{ test }}</h1> -->
      <div class="pageMain">
        <Collection class="pageMain__collection"></Collection>
        <Aside class="pageMain__aside"></Aside>
      </div>

      <ActionBar class="pageBottomBar"></ActionBar>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import Collection from '~/components/Audio/Collection.vue'
import Header from '~/components/Header.vue'
import ActionBar from '~/components/ActionBar.vue'
import Aside from '~/components/Aside.vue'

@Component({
  components: { Collection, Header, ActionBar, Aside },
})
export default class HomePage extends Vue {
  @Watch('isDarkMode', { immediate: true })
  changeDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  get isDarkMode(): boolean {
    return this.$store.getters.isDarkMode
  }
}
</script>

<style lang="scss">
.basePage {
  @apply grid h-screen bg-backgroundApp-light dark:bg-backgroundApp-dark;
  grid-template-columns: 5rem 1fr;
  grid-template-rows: auto 5rem;
}

.pageMain {
  @apply grid p-6 overflow-y-scroll lg:overflow-hidden max-w-7xl w-full justify-self-center;
  grid-template-columns: auto 280px;
  gap: 20px;
  height: calc(100vh - 80px);
}

.pageMain__collection {
  @apply col-span-full lg:col-span-1 lg:order-none justify-self-stretch;
}

.pageMain__aside {
  grid-template-columns: 1fr 1fr;
  @apply col-span-full lg:col-span-1 grid gap-4 auto-rows-max;
}

.pageBottomBar {
  @apply col-span-full;
}

body {
  @apply text-text-light dark:text-text-dark;
}

h3 {
  @apply text-sm font-bold uppercase mb-3;
}

p::first-letter {
  text-transform: uppercase;
}

ul {
  @apply mb-5;
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
