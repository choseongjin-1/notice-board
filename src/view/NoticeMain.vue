<template>
	<div>
		<h2>List</h2>
		<div v-if="list.length === 0">
			No items found.
		</div>
		<ul class="card-list" v-else>
			<li v-for="(item, idx) in list" :key="idx" class="card" @click="mvPage('noticeDetail', item)">
			<div class="card-content">
				<h3>{{ item.listSubject }}</h3>
				<p>ID: {{ item.regId }}</p>
				<p>Date: {{ item.regDt }}</p>
			</div>
			</li>
		</ul>
		<button class="btn-add" @click="mvPage('noticeRegister', -1)">Add Item</button>
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
		const http = instance.appContext.config.globalProperties.$http;
        const store = useStore();
        const list = ref([])
		//const userSrno = ref(store.getters["Login/getUserSrno"])

        onMounted(() => {
			selectList("init")
        });

		// 목록 조회 api 호출
		const selectList = () => {
			const keyword = ""

			http
                .get(`/selectList/${ keyword || "isEmptyKeyword!!" }`)
                .then(({ data }) => {
                    if (data.length > 0) {
						list.value = data
                    } else {
						list.value = []
                    }
                })

		}

        const mvPage = (page, item) => {

            if (page == "back") {
                instance.proxy.$router.go(-1)
                return
            }

            instance.proxy.$router.push({
				state : item,
                name: page,
            })

        }

        return {
            list : list,
            mvPage : mvPage,
			selectList : selectList,
        }
    }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}

.card-list {
  list-style: none;
  padding: 0;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  padding: 16px;
}

.card-content {
  flex-grow: 1;
}

.card-content h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.card-content p {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}
.btn-add {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 16px auto;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.btn-edit {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 600px) {
  .card {
    display: flex;
    flex-direction: column;
    padding: 12px;
  }

  .card-content h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .card-content p {
    font-size: 16px;
  }
}
</style>