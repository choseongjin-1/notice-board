<template>
    <div>
        <label for="username">id: </label>
        <input id="username" type="text" placeholder="csj">
    </div>
    <div>
        <label for="password">pw: </label>
        <input id="password" type="password" placeholder="1">
    </div>
    <button @click="login">login</button>
    <button @click="mvPage('noticeSignUp')">signUp</button>
</template>

<script>
import { onMounted, getCurrentInstance} from "vue";

export default {
    name : 'NoticeLogin',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const http = instance.appContext.config.globalProperties.$http;

        onMounted(() => {
            console.log(process.env.NODE_ENV == "development");
        });

        const mvPage = (page) => {
            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }

            instance.proxy.$router.push({
                name: page,
            })
        }
        // 로그인
        const login = () => {
            if (!isValid()) return

            const username = document.getElementById("username").value
            const password = document.getElementById("password").value

            http
                .get(`/users/${username}/${password}`)
                .then(({ data }) => {
                    console.log('login', login)
                    if (data.resultCode == "0000") {
                        alert("로그인이 완료되었습니다.")
                        mvPage("noticeMain")
                    } else {
                        alert("로그인에 실패하였습니다. 관리자에게 문의해주세요.")
                    }
                })
        }
        // 밸리데이션
        const isValid = () => {
            const username = document.getElementById("username").value
            if (!username) {
                alert("아이디를 입력해주세요.")
                return false
            }

            const password = document.getElementById("password").value
            if (!password) {
                alert("비밀번호를 입력해 주세요.")
                return false
            }
            return true
        }

        return {
            login : login,
            mvPage : mvPage,
        }
    }
}
</script>
