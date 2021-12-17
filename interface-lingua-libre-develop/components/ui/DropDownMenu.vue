<template>
  <div id="dropdown-menu">
    

    <div class="dropdownMenu__light" v-if="options==='isLight'">
      <button class="btn btn-blue" @click="handleDarkMode('dark')">{{ $t('GLOBAL.DARK') }}</button>
      <button class="btn btn-blue" @click="handleDarkMode('light')">{{ $t('GLOBAL.LIGHT') }}</button>
      <button class="btn btn-blue" @click="handleDarkMode('auto')">{{ $t('GLOBAL.AUTO') }}</button>
    </div>
    <div class="dropdownMenu__information" v-if="options==='isInformation'">
      <p>{{ $t('GLOBAL.PRESENTATION') }}</p>
    </div>
    <div class="dropdownMenu__language" v-if="options==='isLanguage'">
      <NuxtLink :to="switchLocalePath('en')">
        <button class="btn btn-blue">
          <country-flag country="gb" size="small"/>
          {{ $t('LANGS.EN') }}
        </button>
      </NuxtLink>
      <NuxtLink :to="switchLocalePath('fr')">
        <button class="btn btn-blue">
          <country-flag country="fr" size="small"/>
          {{ $t('LANGS.FR') }}
        </button>
      </NuxtLink>
    </div>
    <div class="dropdownMenu__user" v-if="options==='isUser'">
      <p class="font-bold">WorkshopM2TLGPE3 (Q710559)</p>
      <div class="m-2">
        <p class="contents">{{ $t('GENDER.MASCULINE') }} - </p>
        <country-flag country="fr" size="small"/>
        <p class="contents">{{ $t('LANGS.FR') }}</p>
      </div>
      <p>{{ $t('LOCUTOR.NATIVE') }}</p>
      <p class="underline" @click="clearPersistantDatas">{{ $t('GLOBAL.LOGGOUT') }}</p>
    </div>

    

    <div class="dropdownMenu__search" v-if="options==='isSearch'">
     

     
                    <div class="max-w-md w-full mx-auto space-y-8">
                       <div align="center"> <b>NOTRE PATROUILLE</b> </div>
                       <div > <tt style="font-family:ttf">Vous pouvez filtrer la liste de son que vous souhaitez réviser </tt> </div>
                        <form class="mt-8 space-y-6" action="#" method="POST">
                        <div>
                          
                          <svg style="display:inline" width="10px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3D68C5" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                          
                          </svg>
                        
                        LOCUTEUR 
                         
                           <select class="w-full border bg-white rounded px-3 py-2 outline-none">
                             
                            <option class="py-1">Sélectionneur ou écrire </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>   
                                                                               
                             </select>
                        </div>
                           <div>
                             <svg style="display:inline" width="10px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3D68C5" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                             </svg>
                             GENRE 
                           <select class="w-full border bg-white rounded px-3 py-2 outline-none" >
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>                                                       
                             </select>
                             </div>
                            <div > 
                               <svg style="display:inline" width="10px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3D68C5" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                             </svg>
                              LANGUE
                          <select class="w-full border bg-white rounded px-3 py-2 outline-none" >
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>                                                       
                             </select></div>
                            <div > 
                               <svg style="display:inline" width="10px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3D68C5" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                             </svg>
                              NIVEAU DE COMPÉTENCE
                           <select class="w-full border bg-white rounded px-3 py-2 outline-none" >
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>
                             <option class="py-1">Sélectionneur ou écrire<input type="text"> </option>                                                       
                             </select></div>
                           
                          <div style="text-align:center "> <button class="transition duration-300 ease-in-out mr-1 mb-1 py-2 px-4 bg-purple-700 rounded text-white font-normal focus:outline-none focus:shadow-outline hover:bg-purple-900" name="réviser " type="submit" >réviser</button></div>
                        </form>
                    </div>
                </div>


    </div>

      


  </div>
  
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'nuxt-property-decorator'
import CountryFlag from 'vue-country-flag'

@Component({
  components: {
    CountryFlag
  },
})
export default class DropDownMenu extends Vue {
  @Prop({required: true}) readonly options!: string

  handleDarkMode(mode: string): void {
    if (mode === 'dark') {
      this.$store.commit('UPDATE_DARK_MODE', true)
    } else if (mode === 'light') {
      this.$store.commit('UPDATE_DARK_MODE', false)
    } else {
      this.$store.commit('UPDATE_DARK_MODE', window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }

  clearPersistantDatas() {
    // Clear localStorage
    localStorage.clear()

    // Clear cookies
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    // Refresh page
    location.reload()
  }
}
</script>

<style lang="scss">

#dropdown-menu {
  @apply z-100;
}

[class*="dropdownMenu__"] {
  @apply bg-backgroundBlock-light dark:bg-backgroundBlock-dark p-4 shadow rounded-lg max-w-xs w-max
}

.btn {
  @apply font-bold py-2 px-4 rounded-md mb-2;
}

.btn-blue {
  @apply bg-backgroundApp-light dark:bg-backgroundApp-dark;
}

.btn-blue:hover {
  @apply bg-gray-200 dark:bg-gray-darkest dark:text-white;
}

.dropdownMenu__user p {
  @apply m-2
}

</style>

