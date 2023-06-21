import { createStore } from "vuex";
import { Loading } from "@/store/modules/Loading";
import { TestData } from "@/store/modules/TestData";
import { Login } from "@/store/modules/Login";
import { Common } from "./modules/Common";

export default createStore({
  modules: { 
    Loading,
    TestData,
    Login,
    Common
  }
});