import { createStore } from "vuex";
import { Loading } from "@/store/modules/Loading";
import { TestData } from "@/store/modules/TestData";
import { Login } from "@/store/modules/Login";

export default createStore({
  modules: { 
    Loading,
    TestData,
    Login
  }
});