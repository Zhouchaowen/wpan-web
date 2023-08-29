import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 样式重置
import 'normalize.css/normalize.css'

import './assets/css/element-variables.scss'
import '@/assets/css/iconfont/iconfont.css'

import '@/style/index.scss' // global css

// import dayjs from 'dayjs'

//
// const app = createApp(App);
// app.config.globalProperties.$echarts = echarts;
// VUE_APP_MOCK的值为true，并且在开发环境下
if (process.env.VUE_APP_MOCK && process.env.NODE_ENV === 'development') {
    require("./mock");
}

// createApp(App).config.globalProperties.$dayjs = dayjs;
createApp(App)
    .use(store)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
