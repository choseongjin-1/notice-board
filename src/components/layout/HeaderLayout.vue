<template>
    <header>
		<h1><a href="#" class="logo"><img alt="Vue logo" src="../../assets/logo.png" width="80"></a></h1>
		<div class="menuWrap">
			<ul class="menu" v-if="showMenu()">
				<li><a @click="mvPage('noticeMain')">게시판</a></li>
                <li><a @click="mvPage('noticeRegister')" v-show="store.getters['TestData/modifyKey'] == -1">게시판 등록</a></li>
				<!-- <li><a @click="mvPage('noticeModify')">회원정보수정</a></li> -->
			</ul>
		</div>
	</header>    
</template>

<script>
import { getCurrentInstance } from "vue";
import { useStore } from 'vuex';

export default {
    name : 'HeaderLayout',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const store = useStore()
        
        const mvPage = (page) => {
            if (page == "noticeRegister") {
                store.commit("TestData/setModifyKey", -1)
            }

            instance.proxy.$router.push({
                name: page,
            })
        }
        // 메뉴 가리기
        const showMenu = () => {
            const path = instance.proxy.$route.path

            if (path == "/notice/noticeLogin"
            || path == "/notice/noticeSignUp") {
                return false
            }
            return true
        }

        return {
            store : store,
            mvPage : mvPage,
            showMenu : showMenu,
        }
    }
}
</script>

<style scoped>
header{width:100%; text-align:center; position:relative; height:120px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none;}

a{text-decoration:none; color:#333;}
</style>