<template>
  <router-view/>
  <!-- <spinner :loading="this.$store.state.Loading.LoadingStatus" /> -->
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
        console.log("start vue!!");
        //store.commit('Loading/endSpinner');
      });

      return {
        store
      }
    }
}
</script>