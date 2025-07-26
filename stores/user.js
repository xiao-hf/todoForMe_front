import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户基本信息
    const userInfo = ref({
       authorization: '',
       money: 12580, // 示例金额
       backgroudImg: '' // 背景图片
    })
    const parseAudioList = ref([])
    
    // 初始化时从存储中恢复数据
    const initUserInfo = () => {
      try {
        const savedUserInfo = uni.getStorageSync('userInfo')
        if (savedUserInfo) {
          const userData = typeof savedUserInfo === 'string' ? JSON.parse(savedUserInfo) : savedUserInfo
          userInfo.value = { ...userInfo.value, ...userData }
        }
      } catch (error) {
        console.error('恢复用户信息失败:', error)
      }
    }
    
    // 立即执行初始化
    initUserInfo()
    // 设置用户信息（登录成功后调用）
    const setUserInfo = (userData) => {
      userInfo.value = userData
      uni.setStorageSync('userInfo', JSON.stringify(userInfo.value))
    }

    // 清除用户信息（退出登录）
    const clearUserInfo = () => {
      userInfo.value = {
        id: '',
        username: '',
        email: '',
        nickname: '',
        avatar: '',
        phone: '',
        gender: 0,
        birthday: '',
        bio: '',
        status: 0,
        isVerified: 0,
        lastLoginTime: '',
        lastLoginIp: '',
        loginCount: 0,
        aiQuota: 0,
        aiUsed: 0,
        apiKey: '',
        settings: '',
        createdAt: '',
        role: {
          id: null,
          roleName: '',
          roleCode: '',
          roleDesc: '',
          status: 0,
          createdAt: '',
          updatedAt: ''
        },
        authorization: '',
        money: 0,
        backgroudImg: ''
      }
    }

    // 退出登录
    const logout = () => {
      clearUserInfo()
      uni.removeStorageSync('userInfo')
    }

    return {
      // 状态
      userInfo,
      // 方法
      setUserInfo,
      clearUserInfo,
      logout,
      initUserInfo,

      // 向后兼容的属性
      username: computed(() => userInfo.value.username),
      avatar: computed(() => userInfo.value.avatar),
      parseAudioList
    }
  }
)
