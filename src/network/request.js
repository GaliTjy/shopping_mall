import axios from 'axios'
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })
  // 2.axios的拦截器
  // （1）拦截请求
  instance.interceptors.request.use(config => {
    // 拦截处理完请求以后还要继续发送出去到服务器
    // 拦截器作用：1.config中有一些信息不符合服务器要求需要过滤；
    // 2.希望发送网络请求时，在界面上显示一个转圈的图标；
    // 3.某些网络请求（比如登录（需要携带token）），必须携带一些特殊的信息
    console.log(config)
    return config
  }, err => {

  })


  // （2）拦截响应
  instance.interceptors.response.use(res => {
    // 拦截处理完响应以后还要继续发送出去到客户端，并且只需要数据data就好了
    return res.data
  }, err => {

  })


    //3.发送真正的网络请求
  // instance就是返回一个promise
  return instance(config)
}


