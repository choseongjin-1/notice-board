import { createStore } from "vuex";
import { Loading } from "@/store/modules/Loading";
import { TestData } from "@/store/modules/TestData";

export default createStore({
  modules: { 
    Loading,
    TestData,
  }
});