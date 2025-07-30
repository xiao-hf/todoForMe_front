// 基础配置
// const baseURL = 'http://192.168.199.113:9999'
const baseURL = 'http://110.42.210.113:9999'
const timeout = 30000
const baseURL_ = baseURL

class Request {
    constructor() {
        this.baseURL = baseURL
        this.timeout = timeout
    }

    // 封装uni.request
    request(options) {
        return new Promise((resolve, reject) => {
            // 获取token从userStore.userInfo.authorization
            let token = ''
            try {
                const userInfo = uni.getStorageSync('userInfo')
                if (userInfo) {
                    const userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
                    token = userData.authorization || ''
                }
            } catch (error) {
                console.error('获取token失败:', error)
                token = ''
            }
            
            uni.request({
                url: this.baseURL + options.url,
                method: options.method || 'GET',
                data: options.data || {},
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                    ...options.header
                },
                timeout: this.timeout,
                success: (res) => {
                    console.log('API请求成功:', res)
                    
                    if (res.statusCode === 200) {
                        // 根据你的后端响应格式调整
                        if (res.data.code === '200' || res.data.code === 200) {
                            resolve(res.data)
                        } else {
                            uni.showToast({
                                title: res.data.message || '请求失败',
                                icon: 'none'
                            })
                            reject(res.data)
                        }
                    } else {
                        uni.showToast({
                            title: `请求失败 ${res.statusCode}`,
                            icon: 'none'
                        })
                        reject(res)
                    }
                },
                fail: (err) => {
                    console.error('API请求失败:', err)
                    uni.showToast({
                        title: '网络请求失败',
                        icon: 'none'
                    })
                    reject(err)
                }
            })
        })
    }

    get(url, data, options = {}) {
        return this.request({
            url,
            method: 'GET',
            data,
            ...options
        })
    }

    post(url, data, options = {}) {
        return this.request({
            url,
            method: 'POST',
            data,
            ...options
        })
    }

    put(url, data, options = {}) {
        return this.request({
            url,
            method: 'PUT',
            data,
            ...options
        })
    }

    delete(url, data, options = {}) {
        return this.request({
            url,
            method: 'DELETE',
            data,
            ...options
        })
    }
}

const request = new Request()

export { request, baseURL, baseURL_ }
