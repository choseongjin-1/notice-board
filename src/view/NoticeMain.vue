<template>
	<div>
		<h2>게시판 리스트</h2>

		<div class="searchWrap">
			<input type="text" v-model="keyword"/><a @click="searchList()" class="btnSearch btn">검색</a>
		</div>

		<div class="listWrap">
			<table class="tbList">
				<colgroup>
					<col width="6%" />
					<col width="*" />
					<col width="10%" />
					<col width="15%" />
				</colgroup>
				<tr>
					<th>no</th>
					<th>제목</th>
					<th>아이디</th>
					<th>날짜</th>
				</tr>
				<tr v-for="(item, idx) in list" :key="idx">
					<td>{{idx + 1}}</td>
					<td class="txt_left" @click="mvPage('noticeDetail', idx)"><a>{{item.subject}}</a></td>
					<td>{{item.id}}</td>
					<td>{{item.regDt}}</td>
				</tr>
				<tr v-if="list.length == 0">
					<td colspan="4">데이터가 없습니다.</td>
				</tr>
			</table>
		</div>

		<!-- <div class="pagination" v-if="paging.totalCount > 0">
			<a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
			<a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev">&lt;</a>
			<template v-for=" (n,index) in paginavigation()">
				<template v-if="paging.page==n">
					<strong :key="index">{{n}}</strong>
				</template>
				<template v-else>
					<a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
				</template>
			</template>
			<a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next">&gt;</a>
			<a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
		</div> -->

		<div class="btnRightWrap">
			<a @click="mvPage('noticeRegister', -1)" class="btn">등록</a>
		</div>
	</div>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from "vue";
import { useStore } from "vuex";

export default {
    name : 'noticeMain',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const store = useStore();
        const list = ref([])
		const keyword = ref("")

        onMounted(() => {
            list.value = store.getters["TestData/testData"]
        });

        const mvPage = (page, idx) => {
            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }
            
            // 수정할 테스트데이터 key 저장
            store.commit("TestData/setModifyKey", idx)

            instance.proxy.$router.push({
                name: page,
            })
        }
		// 키워드 검색
		const searchList = () => {
			// 검색단어 없을때 전체리스트
			if (!keyword.value) {
				list.value = store.getters["TestData/testData"]
				return
			}

			let searchList = []
			const allList = store.getters["TestData/testData"]
			
			for (let i = 0; i < allList.length; i++) {
				if (allList[i].subject.indexOf(keyword.value) > -1) {
					searchList.push(allList[i])
				}
			}

			list.value = searchList
		}

        return {
            list : list,
			keyword : keyword,
            mvPage : mvPage,
			searchList : searchList,
        }
    }
}
</script>

<style scoped>
	.searchWrap{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
	.searchWrap input{width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
	.tbList th{border-top:1px solid #888;}
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
	.btnRightWrap{text-align:right; margin:10px 0 0 0;}

	.pagination{margin:20px 0 0 0; text-align:center;}
	.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
	.pagination span{display:inline-block; padding:0 5px; color:#333;}
	.pagination a{text-decoration:none; display:inline-blcok; padding:0 5px; color:#666;}
</style>