<template>
    <div>
        <label for="username">id: </label>
        <input id="username" type="text" value="sjcho">
    </div>
    <div>
        <label for="password">pw: </label>
        <input id="password" type="password" value="1234">
    </div>
    <button @click="login">login</button>
    <button @click="mvPage('noticeSignUp')">signUp</button>
</template>

<script>
import { onMounted, getCurrentInstance} from "vue";
import { useStore } from "vuex";

export default {
    name : 'NoticeLogin',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const http = instance.appContext.config.globalProperties.$http;
        const store = useStore();

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

            const param = {
                username : username,
                password : password
            }
            console.log("test");
            http
                .post(`/signin`, param)
                .then(({ data }) => {
                    console.log('login', data)
                    if (data.code == "0000") {
                        http.defaults.headers.common['Authorization'] = 'Bearer '+data.rdata.webToken

                        store.commit("Login/setUserSrno", data.rdata.userSrno)
                        store.commit("Login/setUserId", data.rdata.userId)

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
