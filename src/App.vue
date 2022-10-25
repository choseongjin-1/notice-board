<template>
  <router-view/>
  <Spinner :loading="store.getters['Loading/loadingStatus']" />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

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