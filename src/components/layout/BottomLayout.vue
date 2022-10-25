<template>
    <footer>
		<p>copyRight fyzh99.tistory.com</p>
	</footer>  
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
    setup() {
        const instance = getCurrentInstance()
        const common = instance.appContext.config.globalProperties.$common;

        // 페이지이동
        const mv_page = (page) => {
            if (page == instance.proxy.$route.name.toString()) {
                return
            }

            instance.proxy.$router.push({
                name: page,
            })
        }

        return {
            common : common,
            mv_page : mv_page,
        }
    },
}
</script>

<style scoped>
footer{border-top:1px solid #35495e; text-align:center; font-size:16px; color:#41b883; margin:100px 0 0 0;}
</style>