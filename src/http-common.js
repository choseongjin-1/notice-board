import axios from "axios"
import {common} from './view/common';
//import router from '../../front/src/router'
import store from './store/index'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8090",
    header:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset = utf-8'
            }
})

axiosInstance.interceptors.request.use(
    config => {
        store.commit('Loading/startSpinner');
        return config;
    },
    error => {
        store.commit('Loading/endSpinner');
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        console.log('response',response)
        store.commit('Loading/endSpinner');
        return response;
    },
    error => {
        console.log('error',error)
        store.commit('Loading/endSpinner');
        let errorMsg = error.message

        if (error.response) {
            // error 401
            if (error.response.status == 401) {
                errorMsg = '로그인정보가 만료되었습니다. 다시로그인 해주세요.'; // 에러메세지 변경
            }
            // error 500
            if (error.response.status == 500) {
                errorMsg = '해당 작업에 실패하였습니다. 관리자에게 문의해 주세요.';
            }
        }
        
        alert(errorMsg); // 싱글 모달 show
        return Promise.reject(error);
    }
)

export default axiosInstance