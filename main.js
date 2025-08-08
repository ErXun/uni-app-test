/**
 * uni-app为了让其在不同的平台上编译不同的代码
  所以使用了C语言中 #ifdef、#ifndef方式来去判断要加载那种vue的代码
 */

// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif


// 导入网路请求的包
import {
  request
} from './request'
request()


// 封装提示方法
uni.$showMsg = (title = "数据请求失败！", duration = 1500, icon = 'none') => {
  uni.showToast({
    title,
    duration,
    icon
  })
}