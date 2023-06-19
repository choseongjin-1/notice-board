<template>
    <div class="login-form">
      <h2>로그인</h2>
      <div class="form-group">
        <label for="username">아이디</label>
        <input type="text" id="username" value="sjcho" required>
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" value="1234"  required>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="autoLogin" checked>
            자동로그인
        </label>
      </div>
      <button class="btn-login" @click="login">로그인</button>
      <button class="btn-login" @click="mvPage('noticeSignUp')">회원가입</button>
    </div>
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
            autoLogin()
        });

        // 자동로그인
        const autoLogin = () => {
            const webToken = localStorage.getItem("webToken")
            if (webToken) {
                http.defaults.headers.common['Authorization'] = 'Bearer '+webToken

                http
                    .get("/selectUserByToken")
                    .then(({ data }) => {
                        store.commit("Login/setUserSrno", data.rdata.userSrno)
                        store.commit("Login/setUserId", data.rdata.userId)
                        mvPage("noticeMain")
                    })
            }
        }
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

                        const isAuatoLogin = document.getElementById("autoLogin").checked
                        if (isAuatoLogin) {
                            localStorage.setItem("webToken", data.rdata.webToken)
                        }

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

<style scoped>
/* CSS 스타일링 */
.login-form {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-group .checkbox-label {
  font-size: 14px;
}

.form-group .checkbox-label input {
  margin-right: 5px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #4caf50;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}
</style>
