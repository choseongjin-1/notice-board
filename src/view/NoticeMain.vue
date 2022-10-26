<template>
	<div>
		<h2>게시판 리스트</h2>

		<div class="searchWrap">
			<input type="text" v-model="keyword" @keyup.enter="fnSearch" /><a href="javascript:;" @click="fnSearch" class="btnSearch btn">검색</a>
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
					<td>{{item.key}}</td>
					<td class="txt_left" @click="mvPage('noticeDetail', item)"><a>{{item.subject}}</a></td>
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
			<a @click="mvPage('noticeRegister')" class="btn">등록</a>
		</div>
	</div>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from "vue";

export default {
    name : 'noticeMain',
    components:{},
    setup(){

        const instance = getCurrentInstance();
        const common = instance.appContext.config.globalProperties.$common;
        const list = ref([])

        onMounted(() => {
            list.value = common.testData
        });

        const mvPage = (page, item) => {
            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }

            instance.proxy.$router.push({
                name: page,
                params : item,
            })
        }

        return {
            list : list,
            mvPage : mvPage,
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