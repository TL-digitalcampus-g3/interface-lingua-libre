<template>
    <div>
        <header>
            <nav class="nav">
                <a href="#" class="nav__item"><img src="~/assets/logos/lingualibreLogo.svg" alt=""></a>
                <a href="#" class="nav__item"><CustomIcon name="collection" size="1.75"/><span class="nav__item__text">Importer les sons à révisier</span></a>
                <a href="#" class="nav__item"><CustomIcon name="light" size="1.75"/><span class="nav__item__text">Activer/Désactiver le dark mode</span></a>
                <a href="#" class="nav__item"><CustomIcon name="information" size="1.75"/><span class="nav__item__text">Afficher les informations</span></a>
            </nav>
        </header>
    </div>
</template>

<style scoped lang="scss">
    header{
        @apply h-full shadow-lg bg-backgroundBlock-light dark:bg-backgroundBlock-dark;
    }

    .nav{
        @apply grid;
    }

    .nav__item{
        @apply grid place-content-center hover:scale-110;
        height: 80px;
    }

    .nav__item__text{
        @apply hidden;
    }

    .nav__item svg{
        @apply h-7 w-7;
    }

</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CustomIcon from '~/components/Icon/index.vue'


@Component({
  components: {CustomIcon},
})

export default class Header extends Vue {}
</script>