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
            <a href="javascript:;" @click="mvPage('noticeRegister')" class="btn">수정</a>
            <a href="javascript:;" @click="deleteData()" class="btnDelete btn">삭제</a>
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
        const store = useStore()
        const subject = ref("")
        const content = ref("")

        onMounted(() => {
            const testData = store.getters["TestData/testData"]
            const modifyKey = store.getters["TestData/modifyKey"]
            subject.value = testData[modifyKey].subject
            content.value = testData[modifyKey].content
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
        const deleteData = () => {
            store.commit("TestData/deleteData")
            alert(subject.value + "이(가) 삭제되었습니다.")
            mvPage("back")
        }

        return {
            subject : subject,
            content : content,
            mvPage : mvPage,
            deleteData : deleteData
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