import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户基本信息
    const userInfo = ref({
      id: '',
      username: '',
      email: '',
      nickname: '',
      avatar: '',
      phone: '',
      gender: 0, // 0-未知，1-男，2-女
      birthday: '',
      bio: '',
      status: 0, // 0-禁用，1-正常
      isVerified: 0, // 0-未验证，1-已验证
      lastLoginTime: '',
      lastLoginIp: '',
      loginCount: 0,
      aiQuota: 0, // AI使用配额
      aiUsed: 0, // AI已使用次数
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
      authorization: ''
    })
    const parseAudioList = ref([])
    // 设置用户信息（登录成功后调用）
    const setUserInfo = (userData) => {
      userInfo.value = {
        id: userData.id,
        username: userData.username || '',
        email: userData.email || '',
        nickname: userData.nickname || '',
        avatar: userData.avatar || '',
        phone: userData.phone || '',
        gender: userData.gender || 0,
        birthday: userData.birthday || '',
        bio: userData.bio || '',
        status: userData.status || 0,
        isVerified: userData.isVerified || 0,
        lastLoginTime: userData.lastLoginTime || '',
        lastLoginIp: userData.lastLoginIp || '',
        loginCount: userData.loginCount || 0,
        aiQuota: userData.aiQuota || 0,
        aiUsed: userData.aiUsed || 0,
        apiKey: userData.apiKey || '',
        settings: userData.settings || '',
        createdAt: userData.createdAt || '',
        role: {
          id: userData.role?.id || null,
          roleName: userData.role?.roleName || '',
          roleCode: userData.role?.roleCode || '',
          roleDesc: userData.role?.roleDesc || '',
          status: userData.role?.status || 0,
          createdAt: userData.role?.createdAt || '',
          updatedAt: userData.role?.updatedAt || ''
        },
        authorization: userData.authorization || ''
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
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
        authorization: ''
      }
    }

    // 退出登录
    const logout = () => {
      clearUserInfo()
      localStorage.removeItem('userInfo')
    }

    return {
      // 状态
      userInfo,
      // 方法
      setUserInfo,
      clearUserInfo,
      logout,

      // 向后兼容的属性
      username: computed(() => userInfo.value.username),
      avatar: computed(() => userInfo.value.avatar),
      parseAudioList
    }
  },
  {
    persist: true // 持久化存储
  }
)
