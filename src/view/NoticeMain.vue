<template>
    <div>
        <h1>게시판</h1>
        <span>제목</span><input type="text">
    </div>
</template>

<script>
import { onMounted, getCurrentInstance} from "vue";

export default {
    name : 'noticeMain',
    components:{},
    setup(){

        const instance = getCurrentInstance();

        onMounted(() => {
            console.log('main');
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