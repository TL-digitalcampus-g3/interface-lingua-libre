<template>
  <div>
    <div v-if="isLoading">
      <TheLoader/>
    </div>
    <div v-else>
      <h2>Boucle sur le fichier de configuration :</h2>
      <div v-for="record in records" :key="record.fileName">
        <av-waveform
          :audio-src="`/datas/${record.pathDirectory}/${record.fileName}`">
        </av-waveform>
      </div>
      <h2>Version statique :</h2>
      <div>
        <audio ref="te" src="/datas/Millars/te.ogg" controls></audio>
        <av-line ref-link="te"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Ref} from 'nuxt-property-decorator'
import TheLoader from "~/components/TheLoader.vue";

@Component({
  components: {TheLoader}
})
export default class Collection extends Vue {
  records: any = [];
  isLoading: boolean = true;

  @Ref() readonly foo: any[] = []

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
