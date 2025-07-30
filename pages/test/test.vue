<template>
	<img src="http://110.42.210.113:9000/todoplus/assets_task_01k1avb3ymfm6vnyhf00xg729b_1753784690_img_0.png" alt="" />
    <view class="test-container">
        <button @click="send()">发送</button>
        
        <view class="date-picker-container">
            <picker mode="date" :value="selectedDate" @change="onDateChange">
                <button class="date-picker-btn">
                    选择日期: {{ selectedDate || '请选择日期' }}
                </button>
            </picker>
        </view>
        
        <view class="selected-info" v-if="selectedDate">
            <text>选中的日期: {{ selectedDate }}</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { userApi } from '@/api/userApi'
import { request } from '@/utils/request'

const selectedDate = ref('')

const send = async () => {
    const res = await request.get('/user/updatePasswordCode/13800138000')
    console.log(res)
}

const onDateChange = (e) => {
    selectedDate.value = e.detail.value
    console.log('选择的日期:', e.detail.value)
}
</script>

<style lang="scss" scoped>
.test-container {
    padding: 40rpx;
    
    button {
        width: 100%;
        margin-bottom: 40rpx;
        padding: 20rpx;
        background: #007aff;
        color: white;
        border: none;
        border-radius: 10rpx;
        font-size: 32rpx;
    }
}

.date-picker-container {
    margin-bottom: 40rpx;
    
    .date-picker-btn {
        width: 100%;
        padding: 20rpx;
        background: #f8f8f8;
        color: #333;
        border: 2rpx solid #e0e0e0;
        border-radius: 10rpx;
        font-size: 32rpx;
        text-align: left;
    }
}

.selected-info {
    padding: 20rpx;
    background: #f0f8ff;
    border-radius: 10rpx;
    border-left: 6rpx solid #007aff;
    
    text {
        color: #333;
        font-size: 28rpx;
    }
}
</style>
