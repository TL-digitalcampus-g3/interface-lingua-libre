<template>
    <div>
        <header>
            <nav class="nav">
                <a href="#" class="nav__item"><img src="~/assets/logos/lingualibreLogo.svg" alt=""></a>
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
            isUser:  false
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