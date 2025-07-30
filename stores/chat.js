import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const chatHistory = ref([])
  const chatIndex = ref(0)
  const needFocusInput = ref(false)
  const currentMessages = ref([])
  // 新增：使用Map缓存每个聊天的消息
  const chatMap = ref(new Map())

  // 缓存指定聊天ID的消息
  const setChatMessages = (chatId, messages) => {
    chatMap.value.set(chatId, messages)
    if (chatId === chatHistory.value[chatIndex.value].id) {
      currentMessages.value = messages
    }
  }
  const setCurrentMessages = (chatId) => {
    currentMessages.value = chatMap.value.get(chatId)
  }
  const getChatMessages = (chatId) => {
    return chatMap.value.get(chatId) || []
  }

  const addChatMessages = (chatId, messages) => {
    const haveMessages = chatMap.value.get(chatId)
    chatMap.value.set(chatId, [haveMessages, ...messages])
    console.log(chatMap.value.get(chatId))
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
    setCurrentMessages
  }
})