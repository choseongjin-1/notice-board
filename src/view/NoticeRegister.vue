<template>
    <div class="list-create-container">
        <h2>리스트 {{ isModify ? "수정" : "등록" }}</h2>
        <div class="form-group">
            <label for="subject">제목</label>
            <input type="text" id="subject"/>
        </div>
        <div class="form-group">
            <label for="itemDescription">내용</label>
            <textarea id="content"></textarea>
        </div>
        <button @click="mvPage('noticeMain')" class="btn">목록</button>
        <button @click="insertList()" v-if="!isModify" class="btnAdd btn">등록</button>
        <button @click="updateList()" v-if="isModify" class="btnAdd btn">수정</button>
    </div>
  </template>

<script>
import { getCurrentInstance, onMounted, ref } from "vue";
import { useStore } from 'vuex';

export default {
    name : 'noticeRegister',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const http = instance.appContext.config.globalProperties.$http;
        const store = useStore()
        const isModify = ref(false)

        onMounted(() => {
            console.log("state ==> ", history.state);
            const state = history.state
            const subject = document.getElementById("subject")
            const content = document.getElementById("content")
            isModify.value = state.listSrno
            
            subject.value = isModify.value ? state.listSubject : ""
            content.value = isModify.value ? state.listContent : ""

        })

        const mvPage = (page) => {
            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }

            instance.proxy.$router.push({
                name: page,
            })
        }
        // 리스트 등록
        const insertList = () => {
            if (!isValid()) return

            const param = {
                    userSrno : store.getters["Login/getUserSrno"],
                    listSubject : document.getElementById("subject").value,
                    listContent : document.getElementById("content").value,
                }

            http
                .post("/insertList", param)
                .then(({ data }) => {
                    console.log("code", data.code);
                    if (data.code == "0000") {
                        alert("게시물 등록이 완료되었습니다.")
                        mvPage("noticeMain")
                    } else {
                        alert("게시물 등록 실패 관리자에게 문의하여주세요.")
                    }
                })
        }
        // 리스트 수정
        const updateList = () => {
            if (!isValid()) return

            const param = {
                    userSrno : store.getters["Login/getUserSrno"],
                    listSrno : history.state.listSrno,
                    listSubject : document.getElementById("subject").value,
                    listContent : document.getElementById("content").value,
                }

            http
                .post("/updateList", param)
                .then(({ data }) => {
                    console.log("code", data.code);
                    if (data.code == "0000") {
                        alert("게시물 수정이 완료되었습니다.")
                        mvPage("noticeMain")
                    } else {
                        alert("게시물 수정 실패 관리자에게 문의하여주세요.")
                    }
                })
        }
        // 밸리데이션
        const isValid = () => {
            if (!document.getElementById("subject").value) {
                alert("제목을 입력해 주세요.")
                return false
            }

            if (!document.getElementById("content").value) {
                alert("내용을 입력해 주세요.")
                return false
            }
            return true
        }

        return {
            isModify : isModify,
            mvPage : mvPage,
            insertList : insertList,
            updateList : updateList,
        }
    }
}
</script>

<style scoped>
.list-create-container {
  margin: 0 auto;
  padding: 20px;
  max-width: 1000px;
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

input,
textarea {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

textarea {
  resize: vertical;
  min-height: 200px;
}

button {
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>