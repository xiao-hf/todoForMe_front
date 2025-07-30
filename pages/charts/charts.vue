<template>
	<view class="charts-container">
		<!-- 背景图片 -->
		<image v-if="currentBackgroundImage" 
			:src="currentBackgroundImage" 
			class="background-image"
			mode="aspectFill"
			@error="handleImageError"
			@load="handleImageLoad">
		</image>
		
		<!-- 顶部导航 -->
		<view class="nav-header">
			<view class="nav-left">
				<uni-icons type="back" size="24" color="#fff" @click="goBack"></uni-icons>
			</view>
			<view class="nav-center">
				<text class="nav-title">图表</text>
			</view>
			<view class="nav-right">
			</view>
		</view>

		<!-- 内容区域 -->
		<view class="content-area">
			<view class="placeholder">
				<uni-icons type="chart" size="80" color="rgba(255, 255, 255, 0.3)"></uni-icons>
				<text class="placeholder-text">图表功能正在开发中...</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

// 响应式数据
const userStore = useUserStore()
const imageLoadError = ref(false)

// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
	return userStore.userInfo.backgroudImg || ''
})

// 方法
const goBack = () => {
	uni.navigateBack({
		delta: 1
	})
}

// 背景图片相关方法
const handleImageError = () => {
	imageLoadError.value = true
}

const handleImageLoad = () => {
	imageLoadError.value = false
}

onMounted(() => {
	userStore.initUserInfo()
})
</script>

<style lang="scss" scoped>
.charts-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
}

.charts-container::before {
	content: '';
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	z-index: -1;
}

.background-image {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.nav-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	padding-top: 80rpx;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	
	.nav-left {
		display: flex;
		align-items: center;
		gap: 20rpx;
		flex: 1;
	}
	
	.nav-center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		
		.nav-title {
			color: #fff;
			font-size: 36rpx;
			font-weight: 600;
			text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
		}
	}
	
	.nav-right {
		display: flex;
		align-items: center;
		gap: 30rpx;
		flex: 1;
		justify-content: flex-end;
	}
}

.content-area {
	position: fixed;
	top: 140rpx;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
}

.placeholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	
	.placeholder-text {
		color: rgba(255, 255, 255, 0.7);
		font-size: 28rpx;
		margin-top: 30rpx;
	}
}
</style>
