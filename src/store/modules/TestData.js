import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const TestData = {
    namespaced: true,
    state: () => ({ 
        testData : [
            {no : 1, subject : "게시판데이터1", content: "게시판데이터1본문", id : "seongjin1", regDt : dayjs().format("YYYY-MM-DD")},
            {no : 2, subject : "게시판데이터2", content: "게시판데이터2본문", id : "seongjin2", regDt : dayjs().format("YYYY-MM-DD")},
            {no : 3, subject : "게시판데이터3", content: "게시판데이터3본문", id : "seongjin3", regDt : dayjs().format("YYYY-MM-DD")},
            {no : 4, subject : "게시판데이터4", content: "게시판데이터4본문", id : "seongjin4", regDt : dayjs().format("YYYY-MM-DD")},
            {no : 5, subject : "게시판데이터5", content: "게시판데이터5본문", id : "seongjin5", regDt : dayjs().format("YYYY-MM-DD")},
        ],
        modifyKey : -1,
    }),
    mutations: {
        setModifyKey(state, key) {
            state.modifyKey = key
        },
        deleteData(state) {
            console.log(state.modifyKey);
            state.testData.splice(state.modifyKey, 1)
            console.log(state.testData);
        },
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