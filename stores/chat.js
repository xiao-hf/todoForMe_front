import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const chatHistory = ref([])
  const chatIndex = ref(0)
  const needFocusInput = ref(false)
  const currentMessages = ref([])
  // 使用Map缓存每个聊天的消息
  const chatMap = ref(new Map())

  // 缓存指定聊天ID的消息，确保创建新的数组副本
  const setChatMessages = (chatId, messages) => {
    // 创建深拷贝，避免引用共享
    const messagesCopy = JSON.parse(JSON.stringify(messages))
    
    // 将新的消息数组副本存入Map
    chatMap.value.set(chatId, messagesCopy)
    
    // 如果是当前选中的会话，也更新currentMessages
    if (chatId === getCurrentChatId()) {
      // 为currentMessages创建新的数组副本
      currentMessages.value = JSON.parse(JSON.stringify(messagesCopy))
    }
  }
  
  // 获取当前选中聊天的ID
  const getCurrentChatId = () => {
    if (chatHistory.value && chatHistory.value.length > 0 && 
        chatIndex.value >= 0 && chatIndex.value < chatHistory.value.length) {
      return chatHistory.value[chatIndex.value].id
    }
    return null
  }
  
  // 设置当前会话的消息
  const setCurrentMessages = (chatId) => {
    const messages = chatMap.value.get(chatId)
    if (messages) {
      // 创建新的数组副本
      currentMessages.value = JSON.parse(JSON.stringify(messages))
    } else {
      currentMessages.value = []
    }
  }
  
  // 获取指定会话的消息
  const getChatMessages = (chatId) => {
    const messages = chatMap.value.get(chatId)
    return messages ? JSON.parse(JSON.stringify(messages)) : []
  }

  // 添加消息到指定会话
  const addChatMessages = (chatId, messages) => {
    const haveMessages = chatMap.value.get(chatId) || []
    // 创建新数组并存储
    const newMessages = [...haveMessages, ...messages]
    chatMap.value.set(chatId, newMessages)
    console.log('添加消息后:', chatMap.value.get(chatId))
    
    // 如果是当前会话，同步更新currentMessages
    if (chatId === getCurrentChatId()) {
      currentMessages.value = [...newMessages]
    }
  }
  
  // 清除指定会话的消息缓存
  const clearChatMessages = (chatId) => {
    chatMap.value.delete(chatId)
  }
  
  // 清除所有会话的消息缓存
  const clearAllChatMessages = () => {
    chatMap.value.clear()
    currentMessages.value = []
  }

  return {
    chatHistory,
    needFocusInput,
    chatIndex,
    chatMap,
    setChatMessages,
    getChatMessages,
    addChatMessages,
    currentMessages,
    setCurrentMessages,
    getCurrentChatId,
    clearChatMessages,
    clearAllChatMessages
  }
})