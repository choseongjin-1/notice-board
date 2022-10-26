import store from "../../src/store/index";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const common = {
  // 날짜가져오기
  getToday() {
    return dayjs().format("YYYY-MM-DD")
  },
};
