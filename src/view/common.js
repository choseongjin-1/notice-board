import store from "../../src/store/index";

export const common = {
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
