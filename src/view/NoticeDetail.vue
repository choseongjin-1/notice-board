<template>
    <div>
        <h2>Item Detail</h2>
        <div class="detail-content">
            <p><strong>Title:</strong> {{subject}}</p>
            <p><strong>Content:</strong> {{content}}</p>
        </div>
    
        <div class="button-container">
            <button class="btn-list" @click="mvPage('noticeMain')">List</button>
            <button class="btn-edit" @click="mvPage('noticeRegister')" v-if="isSameUser">Edit</button>
            <button class="btn-delete" @click="deleteList()" v-if="isSameUser">Delete</button>
        </div>
  
        <div class="comment-container">
            <h3>Comments</h3>
            <div v-if="comments.length === 0">
                No comment found.
            </div>
            <ul class="comment-list">
                <li v-for="comment in comments" :key="comment.id" class="comment-item">
                    <p class="comment-text">comment : {{ comment.comment }}</p>
                    <p class="comment-author">regId : {{ comment.regId }}</p>
                </li>
            </ul>
            <input class="comment-input" type="text" id="commentInput" placeholder="댓글을 입력해 주세요." required>
            <button class="btn-add-comment" @click="insertComment()">Add Comment</button>
        </div>
    </div>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from "vue";
import { useStore } from 'vuex';

export default {
    name : 'noticeDetail',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const http = instance.appContext.config.globalProperties.$http;
        const store = useStore()
        const subject = ref("")
        const content = ref("")
        const listSrno = ref("")
        const isSameUser = ref(true)
        const comments = ref([])

        onMounted(() => {
            const params = history.state
            subject.value = params.listSubject
            content.value = params.listContent
            listSrno.value = params.listSrno
            isSameUser.value = params.regId == store.getters["Login/getUserId"]

            selectComment()
        });

        const mvPage = (page) => {
            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }

            let state = {}
            if (page == "noticeRegister") {
                state = {
                    listSrno : listSrno.value,
                    listSubject : subject.value,
                    listContent : content.value
                }
            }

            instance.proxy.$router.push({
                name: page,
                state : state
            })
        }
        // 데이터삭제
        const deleteList = () => {

            const param = {
                userSrno : store.getters["Login/getUserSrno"],
                listSrno : listSrno.value
            }

            console.log("deleteParam");
            
            http
                .post("/deleteList", param)
                .then(({ data }) => {
                    if (data.code == "0000") {
                        alert("삭제가 완료되었습니다.")
                        mvPage("back")
                        return
                    }
                    alert("삭제에 실패하였습니다. 관리자에게 문의하여주세요.")        
                })
        }
        //댓글목록 조회
        const selectComment = () => {
            http
                .get(`/selectComment/${store.getters["Login/getUserSrno"]}/${listSrno.value}`)
                .then(({ data }) => {
                    if (data.code == "0000") {
                        comments.value = data.rdata
                    }
                })
        }
        // 댓글달기
        const insertComment = () => {
            const comment = document.getElementById("commentInput").value
            if (!comment) {
                alert("댓글을 입력해 주세요.")
                return
            }

            const param = {
                userSrno : store.getters["Login/getUserSrno"],
                listSrno : listSrno.value,
                comment : document.getElementById("commentInput").value
            }

            http
                .post("/insertComment", param)
                .then(({ data }) => {
                    if (data.code == "0000") {
                        alert("댓글이 등록되었습니다.")
                        selectComment()
                        return
                    }
                    alert("댓글등록에 실패하였습니다. 관리자에게 문의하여주세요.")
                })
        }

        return {
            subject : subject,
            content : content,
            isSameUser : isSameUser,
            comments : comments,
            mvPage : mvPage,
            deleteList : deleteList,
            insertComment : insertComment
        }
    }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}

.detail-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-container button {
  margin: 0 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-container .btn-list {
  background-color: #43b984;
  color: #fff;
}

.button-container .btn-edit {
  background-color: #ffc107;
  color: #212529;
}

.button-container .btn-delete {
  background-color: #dc3545;
  color: #fff;
}

.comment-container {
  margin-top: 30px;
}
.comment-container .btn-add-comment {
  background-color: #43b984;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.comment-container .comment-input {
  width: 70%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.comment-container h3 {
  margin-bottom: 10px;
}

.comment-list {
  list-style: none;
  padding: 0;
}

.comment-list .comment-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-list .comment-text {
  margin-bottom: 5px;
}

.comment-list .comment-author {
  font-style: italic;
  color: #888;
}
</style>