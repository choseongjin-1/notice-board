import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import http from "./http-common";
import { common } from './view/common';

const app = createApp(App)

app.config.globalProperties.$http = http;
app.config.globalProperties.$common = common;

const requireComponent = require.context(
    // 컴포넌트들이 있는 폴더
    './components/common',
    // 하위 폴더까지 포함할 지 여부
    false,
    // 기본 컴포넌트를 찾는데 사용할 정규표현식
    /[A-Z]\w+\.(vue|js)$/
)

console.log('requireComponent',requireComponent.keys())
requireComponent.keys().forEach(fileName => {
  // 컴포넌트 설정 가져오기
  const componentConfig = requireComponent(fileName)
  // 컴포넌트의 파스칼표기법 이름 가져오기
  const componentName = fileName
                          .replace(/^\.\//, '')
                          .replace(/\.\w+$/, '')
                          .split('-')
                          .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
                          .join('')
  
  console.log('componentName',componentName)                        

  // 컴포넌트를 전역적으로 등록
  app.component(
    componentName,
    // `export default`를 이용한 컴포넌트는 `.default`로 컴포넌트
    // 옵션을 추출하고 그렇지 않은 컴포넌트는 모듈의 루트를 호출
    componentConfig.default || componentConfig
  )
})

app.use(router)
.use(store)
//.mount('#Container')
