<template>
    <div>
        <label for="username">id: </label>
        <input id="username" type="text">
    </div>
    <div>
        <label for="password">pw: </label>
        <input id="password" type="password">
    </div>
    <div>
        <label for="password">email: </label>
        <input id="email" type="text">
    </div>
    <button @click="signUp">signUp</button>
</template>

<script>
    import { onMounted, getCurrentInstance} from "vue";
    
    export default {
        name : 'NoticeSignUp',
        components:{},
        setup(){
    
            const instance = getCurrentInstance();
            const http = instance.appContext.config.globalProperties.$http;
    
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
                if (!confirm("회원가입 하시겠습니까?")) return
                
                const param = {
                    userId : document.getElementById("username").value,
                    password : document.getElementById("password").value,
                    email : document.getElementById("email").value
                }

                http
                    .post('/user', param)
                    .then(({ data }) => {
                        console.log('login', login)
                        if (data.resultCode == "200") {
                            alert("회원가입이 완료되었습니다.")
                            mvPage("noticeLogin")
                        } else {
                            alert("회원가입에 실패하였습니다. 관리자에게 문의해주세요.")
                        }
                    })
            }
            // 밸리데이션 todo 형식에 맞는 정규식 적용
            const isValid = () => {
                if (!document.getElementById("username").value) {
                    alert("아이디를 입력해 주세요.")
                    return false
                }
                if (!document.getElementById("password").value) {
                    alert("비밀번호를 입력해 주세요.")
                    return false
                }
                if (!document.getElementById("email").value) {
                    alert("이메일을 입력해 주세요.")
                    return false
                }
                return true
            }
    
            return {
                mvPage : mvPage,
                signUp : signUp,
            }
        }
    }
    </script>