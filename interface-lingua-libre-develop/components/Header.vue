<template>
    <div>
        <header>
            <nav class="nav">
                <a href="#" class="nav__item p-2"><img src="~/assets/logos/lingualibreLogo.svg" alt="Logo Lingua Libre"></a>
                
                <a href="#" class="nav__item" @click.prevent.self @mouseover="isSearch = true"  @mouseleave="isSearch = false">
                    
                    <svg width="15px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#3D68C5"" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    <span class="nav__item__text">Afficher les informations</span>
                    <DropDownMenu class="dropDownMenu" options="isSearch" v-if="isSearch"></DropDownMenu>
                    
                    </a>
                <a href="#" class="nav__item" @click.prevent.self @mouseover="idCollection = true"  @mouseleave="idCollection = false">
                    <CustomIcon name="collection" size="1.75"/>
                    <span class="nav__item__text">Importer les sons à révisier</span>
                    <DropDownMenu class="dropDownMenu" options="idCollection" v-if="idCollection"></DropDownMenu></a>
                <a href="#" class="nav__item" @click.prevent.self @mouseover="isLight = true"  @mouseleave="isLight = false">
                    <CustomIcon name="light" size="1.75"/>
                    <span class="nav__item__text">Activer/Désactiver le dark mode</span>
                    <DropDownMenu class="dropDownMenu" options="isLight" v-if="isLight"></DropDownMenu></a>
                <a href="#" class="nav__item" @click.prevent.self @mouseover="isInformation = true"  @mouseleave="isInformation = false">
                    <CustomIcon name="information" size="1.75"/>
                    <span class="nav__item__text">Afficher les informations</span>
                    <DropDownMenu class="dropDownMenu" options="isInformation" v-if="isInformation"></DropDownMenu></a>
                <a href="#" class="nav__item" @click.prevent.self @mouseover="isLanguage = true"  @mouseleave="isLanguage = false">
                    <CustomIcon name="language" size="1.75"/>
                    <span class="nav__item__text">Langues</span>
                    <DropDownMenu class="dropDownMenu" options="isLanguage" v-if="isLanguage"></DropDownMenu>
                </a>
                <a href="#" class="nav__item" @click.prevent.self @mouseover="isUser = true"  @mouseleave="isUser = false">
                    <CustomIcon name="user" size="1.75"/>
                    <span class="nav__item__text">Utilisateur</span>
                    <DropDownMenu class="dropDownMenu" options="isUser" v-if="isUser"></DropDownMenu>
                </a>
               
               
                
            </nav>
        </header>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CustomIcon from '~/components/Icon/index.vue'
import DropDownMenu from '~/components/ui/DropDownMenu.vue'


@Component({
  components: {CustomIcon,DropDownMenu},

  
    data(){
        return {
            idCollection:   false,
            isLight:   false,
            isInformation: false,
            isLanguage:  false,
            isUser:  false,
            isSearch: false
        }
    }
    
  
})

export default class Header extends Vue {}
</script>

<style scoped lang="scss">
    header{
        @apply h-full shadow-lg bg-backgroundBlock-light dark:bg-backgroundBlock-dark;
    }

    .nav{
        @apply grid;
    }

    .nav__item{
        @apply grid place-content-center relative;
        height: 80px;

        svg{
            @apply duration-200
        }
    }

    .nav__item:hover{
        svg{transform: scale(0.9)}
    }
    .nav__item:first-child{
        &:hover{transform: none}
    }

    .dropDownMenu{
        @apply absolute top-0 left-20;
    }

    .nav__item__text{
        @apply hidden;
    }

    .nav__item svg{
        @apply h-7 w-7;
    }

</style>