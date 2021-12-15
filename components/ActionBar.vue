<template>
  <div class="actionBar">
      <div class="actionBar__control"></div>
      <div class="actionBar__tagSelector"></div>
      <div class="actionBar__toggleAutoPlay"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
    .actionBar{
        @apply bg-primary grid px-9 shadow-lg items-center;
        grid-template-columns: auto auto auto;
    }

    
    [class$=".actionBar__"]{
        background-color: crimson;
    }

</style>