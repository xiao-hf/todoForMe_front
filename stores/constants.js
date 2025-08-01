import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConstantsStore = defineStore('constants', () => {

  const needRefreshGoods = ref(0.1)
  return {
    needRefreshGoods
  }
})