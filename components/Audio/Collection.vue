<template>
  <div>
    <div v-if="isLoading">
      <TheLoader/>
    </div>
    <div v-else>
      <div v-for="record in records" :key="record.fileName">
        {{ record }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'nuxt-property-decorator'
import TheLoader from "~/components/TheLoader.vue";

@Component({
  components: {TheLoader}
})
export default class Collection extends Vue {
  records: any = [];
  isLoading: boolean = true;

  mounted() {
    this.$axios
      .$get(`datas/millars.json`)
      .then(response => {
        this.isLoading = false;
        return this.records = response.records;
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>

</style>
