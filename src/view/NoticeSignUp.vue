<template>
    <div>
        <label for="username">id: </label>
        <input id="username" type="text" @blur="checkDuplicateId($event.target.value)">
    </div>
    <div>
        <label for="password">pw: </label>
        <input id="password" type="password">
    </div>
    <div>
        <label for="userNm">name: </label>
        <input id="userNm" type="text">
    </div>
    <div>
        <label for="email">email: </label>
        <input id="email" type="text">
        <button id="autificateBtn" @click="autificateEmail">이메일 인증</button>
    </div>
    <div>
        <label for="number">number: </label>
        <input id="confirmNum" type="text">
        <button id="confirmBtn" @click="confirmNumber">인증번호확인</button>
    </div>
    <button @click="signUp">signUp</button>
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
                //if (!isValid()) return
                if (!confirm("회원가입 하시겠습니까?")) return

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
                state.isConfirm = false
                const email = document.getElementById("email").value

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

                const password = document.getElementById("password").value
                if (!password) {
                    alert("비밀번호를 입력해 주세요.")
                    return false
                }

                const regPw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
                if (!regPw.test(password)) {
                    alert("비밀번호는 영문,숫자 조합하여 입력해 주세요. (8-20자)")
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

                if (!state.isConfirm) {
                    alert("먼저 이메일을 인증해 주세요.")
                    return false
                }
                return true
            }
    
            return {
                mvPage : mvPage,
                signUp : signUp,
                checkDuplicateId : checkDuplicateId,
                autificateEmail : autificateEmail,
                confirmNumber : confirmNumber
            }
        }
    }
    </script>