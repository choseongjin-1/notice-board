import { common } from "@/view/common";

export const TestData = {
    namespaced: true,
    state: () => ({ 
        testData : [
            {no : 1, subject : "게시판데이터1", content: "게시판데이터1본문", id : "seongjin", regDt : common.getToday()},
            {no : 2, subject : "게시판데이터2", content: "게시판데이터2본문", id : "seongjin", regDt : common.getToday()},
            {no : 3, subject : "게시판데이터3", content: "게시판데이터3본문", id : "seongjin", regDt : common.getToday()},
            {no : 4, subject : "게시판데이터4", content: "게시판데이터4본문", id : "seongjin", regDt : common.getToday()},
            {no : 5, subject : "게시판데이터5", content: "게시판데이터5본문", id : "seongjin", regDt : common.getToday()},
        ],
        modifyKey : -1,
    }),
    mutations: {
        setModifyKey(state, key) {
            state.modifyKey = key
        },
        deleteData(state) {
            state.testData.splice(state.modifyKey, 1)
        },
        setData(state, item) {
            console.log('item => ', item);
            console.log('modifyKey => ', state.modifyKey);
            // 등록
            if (state.modifyKey == -1) {
                state.testData.push(item)
                console.log("등록", state.testData);
                return
            }
            state.testData[state.modifyKey].subject = item.subject
            state.testData[state.modifyKey].content = item.content
            console.log("수정", state.testData);
        }
    },
    getters: {
        testData : (state) =>{
            return state.testData
        },
        modifyKey : (state) => {
            return state.modifyKey
        }
    }
};