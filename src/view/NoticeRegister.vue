<template>
	<div>
		<h1>게시판 등록</h1>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td><input type="text" id="subject"/></td>
					</tr>
					<tr>
						<th>내용</th>
						<td><textarea id="content"></textarea></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="mvPage('noticeMain')" class="btn">목록</a>
			<a href="javascript:;" @click="insertData()" class="btnAdd btn">등록</a>
		</div>	
	</div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { useStore } from 'vuex';

export default {
    name : 'noticeRegister',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const http = instance.appContext.config.globalProperties.$http;
        const store = useStore()

        const mvPage = (page) => {
            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }

            instance.proxy.$router.push({
                name: page,
            })
        }
        // 리스트 등록, 수정
        const insertData = () => {
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
            mvPage : mvPage,
            insertData : insertData,
        }
    }
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>