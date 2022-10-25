<template>
    <header>
		<h1><a href="#" class="logo"><img alt="Vue logo" src="../../assets/logo.png" width="80"></a></h1>
		<div class="menuWrap">
			<ul class="menu">
				<li><a @click="mvPage('noticeMain')">게시판</a></li>
                <li><a @click="mvPage('noticeRegister')">게시판 등록</a></li>
				<li><a @click="mvPage('noticeModify')">회원정보수정</a></li>
			</ul>
		</div>
	</header>    
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
    name : 'HeaderLayout',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        
        const mvPage = (page) => {
            instance.proxy.$router.push({
                name: page,
            })
        }

        return {
            mvPage
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