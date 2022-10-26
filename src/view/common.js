import store from "../../src/store/index";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const common = {
  testData : [
    {key : 1, subject : "게시판데이터1", id : "seongjin1", regDt : dayjs().format("YYYY-MM-DD")},
    {key : 2, subject : "게시판데이터2", id : "seongjin2", regDt : dayjs().format("YYYY-MM-DD")},
    {key : 3, subject : "게시판데이터3", id : "seongjin3", regDt : dayjs().format("YYYY-MM-DD")},
    {key : 4, subject : "게시판데이터4", id : "seongjin4", regDt : dayjs().format("YYYY-MM-DD")},
    {key : 5, subject : "게시판데이터5", id : "seongjin5", regDt : dayjs().format("YYYY-MM-DD")},
  ],
  // 싱글모달
  fn_showSingleModal(msg, method = function () {}) {
    store.commit("Common/OPEN_MODAL", {
      positiveFn: () => {
        store.commit("Common/CLOSE_MODAL");
        method();
      },
      psvBtnNm: "확인",
      type: 0,
      msg: msg,
    });
  },
  // 더블모달
  fn_showDoubleModal(msg, method = function () {}) {
    store.commit("Common/OPEN_MODAL", {
        positiveFn : () => {
          store.commit("Common/CLOSE_MODAL");
          method();
        },
        negativeFn : () => { store.commit("Common/CLOSE_MODAL") },
        type : 1,
        msg : msg
    })
  },
};
