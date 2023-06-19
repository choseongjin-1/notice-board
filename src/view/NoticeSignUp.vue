<template>
    <div class="signup-container">
        <h2>회원가입</h2>
        <div class="form-group">
            <label for="username">사용자 아이디</label>
            <input type="text" id="username" @blur="checkDuplicateId($event.target.value)" required>
        </div>
        <div class="form-group">
            <label for="userNm">사용자 이름</label>
            <input  id="userNm" required>
        </div>
        <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" required>
            <button id="autificateBtn" @click="autificateEmail">이메일 인증</button>
        </div>
        <div class="form-group">
            <label for="confirmNum">인증번호</label>
            <input id="confirmNum" type="text">
            <button id="confirmBtn" @click="confirmNumber">인증번호확인</button>
        </div>
        <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" required>
        </div>
        <button @click="signUp">가입하기</button>
    </div>
  </template>

<script>
    import { onMounted, getCurrentInstance, reactive } from "vue";
    
    export default {
        name : 'NoticeSignUp',
        components:{},
        setup(){
    
            const instance = getCurrentInstance();
            const http = instance.appContext.config.globalProperties.$http;
            const state = reactive({
                number : "",
                isConfirm : "",
            })
    
            onMounted(() => {
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
            // 회원가입
            const signUp = () => {
                if (!isValid()) return

                const param = {
                    userId : document.getElementById("username").value,
                    password : document.getElementById("password").value,
                    userNm : document.getElementById("userNm").value,
                    email : document.getElementById("email").value
                }

                http
                    .post('/signup', param)
                    .then(({ data }) => {

                        if (data.code == "0000") {
                            alert("회원가입이 완료되었습니다.")
                            mvPage("noticeLogin")
                        } else {
                            alert("회원가입에 실패하였습니다. 관리자에게 문의해주세요.")
                        }
                    })
            }
            // 아이디 중복체크
            const checkDuplicateId = (userId) => {
                if (!userId) {
                    alert("아이디를 입력해 주세요.")
                    return
                }

                http
                    .get(`/checkDuplicateId/${userId}`)
                    .then(({ data }) => {

                        if (data.code == "0000") {
                            alert("사용가능한 아이디 입니다.")
                        } else {
                            alert("이미 사용중인 아이디 입니다.")
                        }
                    })
            }
            const autificateEmail = () => {
                const email = document.getElementById("email").value
                if (!email) {
                    alert("이메일을 입력해 주세요.")
                    return false
                }

                const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if (!regEmail.test(email)) {
                    alert("이메일 형식이 올바르지 않습니다.")
                    return false
                }

                state.isConfirm = false

                if (!email) {
                    alert("이메일을 입력해 주세요.")
                    return
                }

                http
                    .get(`/autificateEmail/${email}`)
                    .then(({ data }) => {

                        if (data.code == "0000") {
                            alert("인증번호 발송이 완료되었습니다.")
                            console.log(data.rdata);
                            state.number = data.rdata
                        } else {
                            alert("인증번호 발송에 실패하였습니다.")
                        }
                    })
            }
            // 이메일 인증확인
            const confirmNumber = () => {
                const confirmInput = document.getElementById("confirmNum").value
                state.isConfirm = false

                if (!state.number && !state.isConfirm) {
                    alert("먼저 이메일을 발송해 주세요.")
                    return
                }

                if (state.number != confirmInput) {
                    alert("인증번호가 일치하지 않습니다.")
                    return
                }

                if (state.number == confirmInput) {
                    alert("이메일 인증이 완료되었습니다.")
                    state.isConfirm = true
                }
            }
            // 밸리데이션 
            const isValid = () => {
                if (!document.getElementById("username").value) {
                    alert("아이디를 입력해 주세요.")
                    return false
                }

                const userNm = document.getElementById("userNm").value
                if (!userNm) {
                    alert("성명을 입력해 주세요.")
                    return false
                }

                const email = document.getElementById("email").value
                if (!email) {
                    alert("이메일을 입력해 주세요.")
                    return false
                }

                const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if (!regEmail.test(email)) {
                    alert("이메일 형식이 올바르지 않습니다.")
                    return false
                }

                const password = document.getElementById("password").value
                if (!password) {
                    alert("비밀번호를 입력해 주세요.")
                    return false
                }

                // const regPw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
                // if (!regPw.test(password)) {
                //     alert("비밀번호는 영문,숫자 조합하여 입력해 주세요. (8-20자)")
                //     return false
                // }

                if (!state.isConfirm) {
                    alert("먼저 이메일을 인증해 주세요.")
                    return false
                }

                if (!confirm("회원가입 하시겠습니까?")) {
                    return false
                }
                return true
            }
    
            return {
                state : state,
                mvPage : mvPage,
                signUp : signUp,
                checkDuplicateId : checkDuplicateId,
                autificateEmail : autificateEmail,
                confirmNumber : confirmNumber
            }
        }
    }
    </script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  border: none;
}
</style>