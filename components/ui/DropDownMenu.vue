<template>
    <div>
        <!-- <div class="dropdownMenu__collection" v-if="options==='isCollection'"></div>
        <div class="dropdownMenu__light" v-if="options==='isLight'"></div> -->
        <div class="dropdownMenu__information" v-if="options==='isInformation'">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores vero veritatis ipsam quidem, ad adipisci cupiditate praesentium eum corporis commodi minima unde quasi officiis sunt placeat in labore soluta officia!</p>
        </div>
        <div class="dropdownMenu__language" v-if="options==='isLanguage'">
            <NuxtLink :to="switchLocalePath('en')">
                <button class="btn btn-blue">{{ $t('LANGS.EN') }}</button>
            </NuxtLink>
            <NuxtLink :to="switchLocalePath('fr')">
                <button class="btn btn-blue">{{ $t('LANGS.FR') }}</button>
            </NuxtLink>
        </div>
    </div>
  
</template>

<script lang="ts">
import {Vue, Component,Prop} from 'nuxt-property-decorator'

@Component
export default class DropDownMenu extends Vue {
      @Prop({ required: true }) readonly options!: string
    

}
</script>

<style lang="scss">

    [class*="dropdownMenu__"]{
        @apply bg-backgroundBlock-light dark:bg-backgroundBlock-dark p-4 shadow rounded-lg max-w-xs w-max
    }
    
    .btn {
    @apply font-bold py-2 px-4 rounded-md mb-2;
  }

  .btn-blue {
    @apply bg-backgroundApp-light dark:bg-backgroundApp-dark;
  }

  .btn-blue:hover {
    @apply bg-gray-200;
  }

</style>

