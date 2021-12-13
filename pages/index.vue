<template>
  <div>
    <h1>{{ test }}</h1>
    {{ records }}
    <Test/>
    <Collection/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Test from "~/components/Test.vue";
import Collection from "~/components/Audio/Collection.vue";

@Component({
  components: {Test, Collection},
  async asyncData({$axios}): Promise<any> {
    const records = await $axios
      .$get(`datas/millars.json`)
      .then(res => res.records)
      .catch(error => {
        if (this.$axios.isCancel(error)) {
          console.log('Request canceled', error)
        } else {
          console.log(error)
        }
      });

    return {
      records
    }
  }
})
export default class Demo extends Vue {
  test: string = 'hello world';
  records: any = {};
}
</script>
