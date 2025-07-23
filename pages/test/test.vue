<template>
    <view>
        
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { request } from '@/utils/request'

const test = ref('')
console.log('dsfsf')
request.get('/test').then(res => {
	test.value = res.data
})
</script>

<style lang="scss" scoped>
</style>
