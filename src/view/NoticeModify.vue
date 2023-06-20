<template>
    <div class="profile-edit-container">
      <h2>회원 정보 수정</h2>
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="userNm" >
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email">
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password">
      </div>
      <button @click="updateUserInfo">저장하기</button>
    </div>
  </template>
  
<script>
import { onMounted, getCurrentInstance} from "vue";
import { useStore } from 'vuex';
  
  export default {
      name : '',
      components:{},
      setup(){

            const instance = getCurrentInstance();
            const http = instance.appContext.config.globalProperties.$http;
            const store = useStore()
    
            onMounted(() => {
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
            // 회원정보 수정
            const updateUserInfo = () => {
                const param = {
                    userSrno : store.getters["Login/getUserSrno"],
                    userNm : document.getElementById("userNm").value,
                    password : document.getElementById("password").value,
                    email : document.getElementById("email").value,
                }

                http
                    .post("/updateUser", param)
                    .then(({ data }) => {
                        if (data.code == "0000") {
                            alert("회원정보 수정이 완료되었습니다.")
                            mv_page("noticeMain")
                            return
                        }
                        alert("회원정보 수정에 실패하였습니다. 관리자에게 문의하여주세요.")
                    })
            }
    
            return {
                mv_page : mv_page,
                updateUserInfo : updateUserInfo,
            }
        }
  }
  </script>
  
  <style scoped>
  .profile-edit-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  </style>
  