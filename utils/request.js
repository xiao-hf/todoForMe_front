import axios from 'axios'
import { useUserStore } from '@/stores/user'
// const baseURL_ = 'http://110.42.210.113:'
const baseURL_ = 'http://127.0.0.1:'

const authHeader = 'Authorization'

const request = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL_,
  timeout: 300000
})

request.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.userInfo.authorization) {
      config.headers.Authorization = `Bearer ${userStore.userInfo.authorization}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

request.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data.code === '1') {
      return res
    }
    return Promise.reject(res.data)
  },
  (err) => {
    return Promise.reject(err)
  }
)

export { request, baseURL_, authHeader }
