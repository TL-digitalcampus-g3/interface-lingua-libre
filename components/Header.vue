<template>
    <div>
        <header>
            <nav class="nav">
                <a href="#" class="nav__item"><img src="~/assets/logos/lingualibreLogo.svg" alt=""></a>
                <a href="#" class="nav__item"><span class="nav__item__text">Importer les sons à révisier</span></a>
                <a href="#" class="nav__item"><span class="nav__item__text">Activer/Désactiver le dark mode</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
</svg></a>
                <a href="#" class="nav__item"><span class="nav__item__text">Afficher les aides</span></a>
                <a href="#" class="nav__item"><span class="nav__item__text">Afficher les informations</span></a>
            </nav>
        </header>
    </div>
</template>

<style scoped lang="scss">
    header{
        @apply h-full;
    }

    .nav{
        @apply grid;
    }

    .nav__item{
        @apply grid place-content-center hover:scale-110;
        height: 80px;
    }

    .nav__item__text{
        @apply visible;
    }

    .nav__item svg{
        @apply h-7 w-7;
    }

</style>

<script>
export default {
    
}
</script>