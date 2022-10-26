<template>
	<div>
		<h1>게시판 {{modifyKey == -1 ? "등록" : "수정"}}</h1>

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
			<a href="javascript:;" @click="setData()" class="btnAdd btn">{{modifyKey == -1 ? "등록" : "수정"}}</a>
		</div>	
	</div>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from "vue";
import { useStore } from 'vuex';

export default {
    name : 'noticeRegister',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const common = instance.appContext.config.globalProperties.$common;
        const store = useStore()
        const modifyKey = ref(-1)

        onMounted(() => {
            modifyKey.value = store.getters["TestData/modifyKey"] > -1 ? store.getters["TestData/modifyKey"] : -1
            console.log('modifyKey.value', modifyKey.value);

            if (modifyKey.value > -1) {
                document.getElementById("subject").value = store.getters["TestData/testData"][modifyKey.value].subject
                document.getElementById("content").value = store.getters["TestData/testData"][modifyKey.value].content
            }
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
        // 리스트 등록, 수정
        const setData = () => {
            if (!isValid()) return

            const data = {
                    subject : document.getElementById("subject").value,
                    content : document.getElementById("content").value,
                }

            if (modifyKey.value == -1) {
                data.no = store.getters["TestData/testData"].length + 1
                data.id = "seongjin"
                data.regDt = common.getToday()
            }

            store.commit("TestData/setData", data)
            store.commit("TestData/setModifyKey", -1)
            const msg = (modifyKey.value == -1 ? "등록" : "수정") + " 되었습니다."
            alert(msg)
            mvPage("noticeMain")
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
            modifyKey : modifyKey,
            mvPage : mvPage,
            setData : setData,
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