<template>
    <view>
        <button @click="send()">发送</button>
    </view>
</template>

<script setup>
import { userApi } from '@/api/userApi'
import { request } from '@/utils/request'
const send = async () => {
    const res = await request.get('/user/updatePasswordCode/13800138000')
    console.log(res)
}
</script>

<style lang="scss" scoped>
</style>
