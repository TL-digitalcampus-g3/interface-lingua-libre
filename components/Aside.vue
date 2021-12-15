<template>
    <div>
        <div class="aside__block__information">
            <vc-donut :sections="sections">Basic donut</vc-donut>

        </div>
        <div class="aside__block__option">
            <h3>{{ $t('SHORTCUT.KEYBOARD_SHORTCUT') }}</h3>
            <ul>
                <li><p>{{ $t('SHORTCUT.PLAY_PAUSE') }}</p><kbd class="keyword_shortcut">Espace</kbd></li>
                <li><p>{{ $t('SHORTCUT.REPEAT') }}</p><kbd class="keyword_shortcut">←</kbd></li>
            </ul>
        

        </div>

    </div>
</template>

<script lang='ts'>
    import { Vue, Component } from 'nuxt-property-decorator'
    import Donut from 'vue-css-donut-chart';
    import 'vue-css-donut-chart/dist/vcdonut.css';


    @Component({
        components: {Donut}
    })
    export default class Aside extends Vue {}
</script>

<style scoped lang="scss">
    [class*="aside__block__"]{
        @apply dark:bg-backgroundBlock-dark bg-backgroundBlock-light rounded-lg p-5 mb-6
    }

    .aside__block__option{
        li{
            @apply flex justify-between items-center mb-1

        }

        p{
            @apply capitalize
        }
    }

    .keyword_shortcut{
        @apply inline-block text-xs border-4 px-2 py-1 m-1 rounded bg-backgroundApp-light dark:bg-backgroundApp-dark shadow-sm;
 
        border: 1px solid rgb(204, 204, 204);



    }

</style>