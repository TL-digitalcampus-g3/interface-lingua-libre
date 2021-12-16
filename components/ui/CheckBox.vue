<template>
    <div>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input @click="$emit('click')" type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" :checked="isChecked"/>
            <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        <label for="toggle" class="">{{ label }}</label>
    </div>

</template>


<style scoped>

    .toggle-checkbox:checked {
      @apply: right-0 border-green-400;
      right: 0;
      border-color: #68D391;
    }
    .toggle-checkbox:checked + .toggle-label {
      @apply: bg-green-400;
      background-color: #68D391;
    }
</style>

<script lang="ts">
    import { Vue, Component, Prop } from 'nuxt-property-decorator'

    @Component
    export default class CheckBox extends Vue {
        @Prop({ required: true }) readonly label!: string
        @Prop({ required: false }) readonly isChecked!: boolean
    }
</script>
               