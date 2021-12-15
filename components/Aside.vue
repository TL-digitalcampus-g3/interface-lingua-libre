<template>
    <div>
        <div class="aside__block">

        </div>

    </div>
</template>

<script lang='ts'>
    import { Vue, Component } from 'nuxt-property-decorator'
    import CheckBox from '~/components/ui/CheckBox.vue'

    @Component
    export default class Aside extends Vue {}
</script>

<style scoped lang="scss">
    .aside__block{
        @apply dark:bg-backgroundBlock-dark bg-backgroundBlock-light rounded-lg p-5
    }

</style>