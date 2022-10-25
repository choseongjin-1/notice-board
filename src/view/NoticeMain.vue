<template>
    <div>main</div>
</template>

<script>
import { onMounted, getCurrentInstance} from "vue";

export default {
    name : 'WH_mypage_address_up',
    components:{},
    setup(){

        const instance = getCurrentInstance();

        onMounted(() => {
        });

        const mv_page = (page) => {
            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }

            instance.proxy.$router.push({
                name: page,
            })
        }

        return {
            mv_page : mv_page,
        }
    }
}
</script>