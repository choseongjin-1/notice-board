<template>
  <router-view/>
  <Spinner :loading="store.getters['Loading/loadingStatus']" />
  <noticeAlert/>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
// https://fyzh99.tistory.com/39?category=837734 html 출처

export default {
    name : 'App',
    components:{},
    setup(){
      const store = useStore();

      onMounted(() => {
      });

      return {
        store
      }
    }
}
</script>