import store from "../../src/store/index";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const common = {
  fn_showSingleModal(msg, method = function () {}) {
    // 모달 START
    store.commit("Common/OPEN_MODAL", {
      positiveFn: () => {
        store.commit("Common/CLOSE_MODAL");
        method();
      },
      psvBtnNm: "확인",
      type: 0,
      msg: msg,
    });
    // 모달 END
  },
  fn_showDoubleModal(msg, method = function () {}) {
    // 모달 START
    store.commit("Common/OPEN_MODAL", {
      positiveFn : () => {
        store.commit("Common/CLOSE_MODAL");
        method();
      },
      negativeFn : () => { store.commit("Common/CLOSE_MODAL") },
      type : 1,
      msg : msg
  })
    // 모달 END
  },

};
