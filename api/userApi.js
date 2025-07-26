import { request } from '@/utils/request'
const login = (data) => {
	return request.post('/user/login', data)
}
const register = (data) => {
	return request.post('/user/register', data)
}
const logout = () => {
	return request.get('/user/logout')
}
const updatePassword = (data) => {
	return request.post('/user/updPassword', data)
}
const updPasswordCode = (phone) => {
	return request.get('/user/updPasswordCode/' + phone)
}
const upd = (nickname, backImg) => {
	return new Promise((resolve, reject) => {
		// 获取认证token
		const getAuthToken = () => {
			const userInfo = uni.getStorageSync('userInfo')
			return userInfo ? (typeof userInfo === 'string' ? JSON.parse(userInfo).authorization : userInfo.authorization) : ''
		}
		
		if (backImg && backImg.path) {
			// 有文件时，使用uni.uploadFile上传文件和表单数据
			uni.uploadFile({
				url: request.baseURL + '/user/upd',
				filePath: backImg.path,
				name: 'backImg',
				formData: {
					nickname: nickname
				},
				header: {
					'Authorization': getAuthToken()
				},
				success: (uploadRes) => {
					try {
						const result = JSON.parse(uploadRes.data)
						resolve(result)
					} catch (e) {
						reject(e)
					}
				},
				fail: (error) => {
					reject(error)
				}
			})
		} else {
			// 没有文件时，使用FormData格式发送请求
			uni.request({
				url: request.baseURL + '/user/upd',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Authorization': getAuthToken()
				},
				data: {
					nickname: nickname
				},
				success: (res) => {
					resolve(res.data)
				},
				fail: (error) => {
					reject(error)
				}
			})
		}
	})
}
const getUserInfo = () => {
	return request.get('/user/info')
}
const getMoney = () => {
	return request.get('/user/money')
}
const cost = (dif) => {
	return request.get('/user/cost/' + dif)
}
export const userApi = { cost, login, register, logout, updatePassword, updPasswordCode, upd, getUserInfo, getMoney }