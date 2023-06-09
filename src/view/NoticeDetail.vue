<template>
	<div>
		<h1>게시판 상세보기</h1>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td>{{subject}}</td>
					</tr>
					<tr>
						<th>내용</th>
						<td>{{content}}</td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="mvPage('noticeMain')" class="btn">목록</a>
            <a href="javascript:;" @click="mvPage('noticeRegister')" v-if="isSameUser" class="btn">수정</a>
            <a href="javascript:;" @click="deleteList()" v-if="isSameUser" class="btnDelete btn">삭제</a>
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

        onMounted(() => {
            const params = history.state
            subject.value = params.listSubject
            content.value = params.listContent
            listSrno.value = params.listSrno
            isSameUser.value = params.regId == store.getters["Login/getUserId"]
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

        return {
            subject : subject,
            content : content,
            isSameUser : isSameUser,
            mvPage : mvPage,
            deleteList : deleteList
        }
    }
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0; }
	.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left;}
	.tbAdd td.txt_cont{height:300px; vertical-align:top;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>