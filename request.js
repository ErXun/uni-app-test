import {
  $http
} from '@escook/request-miniprogram'

export const request = () => {
  uni.$http = $http
  $http.baseUrl = "https://api-hmugo-web.itheima.net"
  
  // 请求拦截器
  $http.beforeRequest = () => {
    uni.showLoading({
      title: '数据加载中...'
    })
  }

  // 响应拦截器
  $http.afterRequest = () => {
    uni.hideLoading()
  }
}