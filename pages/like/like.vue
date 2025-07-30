<template>
	<view class="like-container">
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
				<text class="nav-title">收藏</text>
			</view>
			<view class="nav-right">
			</view>
		</view>

		<!-- 任务列表 -->
		<scroll-view class="task-list" 
			scroll-y="true" 
			@scroll="handleScroll"
			@scrolltolower="handleScrollToLower"
			refresher-enabled="true"
			refresher-background="transparent"
			:refresher-triggered="refresherTriggered"
			@refresherpulling="handleRefresherPulling"
			@refresherrefresh="handleRefresherRefresh"
			@refresherrestore="handleRefresherRestore">
			
			<!-- 空状态 -->
			<view v-if="taskList.length === 0 && !isLoading" class="empty-state">
				<uni-icons type="star" size="80" color="rgba(255, 255, 255, 0.3)"></uni-icons>
				<text class="empty-text">暂无收藏任务</text>
			</view>
			
			<!-- 收藏任务列表 -->
			<uni-card v-for="(task, index) in taskList" :key="task.id" 
				:is-shadow="false" 
				:border="false"
				margin="8rpx 20rpx"
				class="task-card task-swipe-container">
				<view class="task-swipe-wrapper">
					<view class="task-item" 
						:style="{ transform: `translateX(${swipeStates[task.id]?.translateX || 0}rpx)` }"
						@touchstart="handleTouchStart($event, task.id)"
						@touchmove="handleTouchMove($event, task.id)"
						@touchend="handleTouchEnd($event, task.id)">
						<view class="task-checkbox">
							<uni-icons type="checkbox" 
								:size="24" 
								:color="task.isCompleted ? '#4CD964' : '#C7C7CC'">
							</uni-icons>
						</view>
						<view class="task-content">
							<text class="task-description" :class="{ completed: task.isCompleted }">{{ task.taskDescription }}</text>
							<view class="task-value" v-if="task.value && task.value >= 1">
								<uni-icons type="wallet" size="14" color="#666"></uni-icons>
								<text class="value-text">{{ task.value }}</text>
							</view>
						</view>
						<view class="task-actions">
							<uni-icons type="star-filled" 
								:size="24" 
								color="#FFD700"
								@click="toggleStar(task.id)">
							</uni-icons>
						</view>
					</view>
					<view class="delete-action" 
						v-if="swipeStates[task.id]?.showDelete"
						@click="confirmUnlike(task.id)">
						<uni-icons type="heart-filled" size="24" color="#fff"></uni-icons>
					</view>
				</view>
			</uni-card>
			
			<!-- 加载更多 -->
			<view v-if="taskList.length > 0" class="load-more">
				<view v-if="isLoadingMore" class="loading-text">
					<text>加载中...</text>
				</view>
				<view v-else-if="hasMore" class="load-more-btn" @click="loadMore">
					<text>点击加载更多</text>
				</view>
				<view v-else class="no-more-text">
					<text>已加载全部数据</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { taskApi } from '@/api/taskApi'
import { useUserStore } from '@/stores/user'

// 响应式数据
const userStore = useUserStore()
const taskList = ref([])
const isLoading = ref(false)
const imageLoadError = ref(false) // 图片加载失败状态

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)
const hasMore = ref(true)
const isLoadingMore = ref(false)
const total = ref(0)



// 滑动删除相关状态
const swipeStates = ref({}) // 记录每个任务的滑动状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const currentSwipeTaskId = ref(null)

// 下拉刷新相关
const isRefreshing = ref(false) // 是否正在刷新
const refresherTriggered = ref(false) // 刷新触发状态

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

const toggleStar = async (taskId) => {
	try {
		const res = await taskApi.like(taskId)
		if (res.code === 200 || res.code === '200') {
			// 刷新任务列表
			await fetchTaskList()
		} else {
			uni.showToast({
				title: res.message || '操作失败',
				icon: 'none'
			})
		}
	} catch (error) {
		console.error('切换收藏状态失败:', error)
		uni.showToast({
			title: '操作失败',
			icon: 'none'
		})
	}
}

// 滑动删除相关方法
const handleTouchStart = (e, taskId) => {
	touchStartX.value = e.touches[0].clientX
	touchStartY.value = e.touches[0].clientY
	currentSwipeTaskId.value = taskId
}

const handleTouchMove = (e, taskId) => {
	if (currentSwipeTaskId.value !== taskId) return
	
	const touchX = e.touches[0].clientX
	const touchY = e.touches[0].clientY
	const deltaX = touchX - touchStartX.value
	const deltaY = touchY - touchStartY.value
	
	// 判断是否为水平滑动（防止与垂直滚动冲突）
	if (Math.abs(deltaY) > Math.abs(deltaX)) return
	
	// 只允许向左滑动
	if (deltaX < 0) {
		const translateX = Math.max(deltaX * 0.5, -120) // 最大滑动120rpx
		
		if (!swipeStates.value[taskId]) {
			swipeStates.value[taskId] = {}
		}
		
		swipeStates.value[taskId].translateX = translateX
		swipeStates.value[taskId].showDelete = translateX < -30
	}
}

const handleTouchEnd = (e, taskId) => {
	if (currentSwipeTaskId.value !== taskId) return
	
	const state = swipeStates.value[taskId]
	if (!state) return
	
	// 如果滑动超过一半宽度，直接确认取消收藏
	if (state.translateX < -60) {
		confirmUnlike(taskId)
	} else if (state.translateX < -30) {
		// 显示取消收藏按钮
		state.translateX = -120
		state.showDelete = true
	} else {
		// 回弹到原位
		resetSwipeState(taskId)
	}
	
	currentSwipeTaskId.value = null
}

const resetSwipeState = (taskId) => {
	if (swipeStates.value[taskId]) {
		swipeStates.value[taskId].translateX = 0
		swipeStates.value[taskId].showDelete = false
	}
}

const resetAllSwipeStates = () => {
	Object.keys(swipeStates.value).forEach(taskId => {
		resetSwipeState(taskId)
	})
}

const handleScroll = () => {
	resetAllSwipeStates()
}

const confirmUnlike = (taskId) => {
	resetAllSwipeStates()
	
	// 找到对应的任务
	const task = getTaskById(taskId)
	if (!task) {
		console.error('未找到要取消收藏的任务:', taskId)
		return
	}
	
	// 使用uni-app自带的showModal样式，与home.vue一致
	uni.showModal({
		title: '取消收藏',
		content: `确定要取消收藏"${task.taskDescription}"吗？`,
		confirmColor: '#f56c6c',
		success: async (res) => {
			if (res.confirm) {
				await executeUnlike(taskId)
			}
		}
	})
}



const executeUnlike = async (taskId) => {
	if (!taskId) return
	
	uni.showLoading({
		title: '取消收藏中...'
	})
	
	try {
		const res = await taskApi.like(taskId)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			uni.showToast({
				title: '已取消收藏',
				icon: 'success'
			})
			// 重新获取任务列表
			await fetchTaskList()
		} else {
			uni.showToast({
				title: res.message || '取消收藏失败',
				icon: 'none'
			})
		}
	} catch (error) {
		uni.hideLoading()
		uni.showToast({
			title: '取消收藏失败',
			icon: 'none'
		})
		console.error('取消收藏失败:', error)
	}
}

const getTaskById = (taskId) => {
	return taskList.value.find(task => task.id === taskId)
}

// 背景图片相关方法
const handleImageError = () => {
	imageLoadError.value = true
	uni.showToast({
		title: '背景图片加载失败',
		icon: 'none'
	})
}

const handleImageLoad = () => {
	imageLoadError.value = false
}

// 获取收藏任务列表
const fetchTaskList = async (isRefresh = true) => {
	if (isRefresh) {
		isLoading.value = true
		currentPage.value = 1
		taskList.value = []
	} else {
		isLoadingMore.value = true
	}

	try {
		const res = await taskApi.queryLike({
			pageNo: currentPage.value,
			pageSize: pageSize.value
		})
		
		if (res && res.code === '200' && res.data) {
			const pageInfo = res.data
			const newTasks = pageInfo.list || []
			
			if (isRefresh) {
				taskList.value = newTasks
			} else {
				taskList.value = [...taskList.value, ...newTasks]
			}
			
			// 更新分页信息
			total.value = pageInfo.total || 0
			hasMore.value = currentPage.value < (pageInfo.pages || 1)
		}
	} catch (error) {
		console.error('获取收藏列表失败:', error)
		uni.showToast({
			title: '获取收藏列表失败',
			icon: 'none'
		})
	} finally {
		if (isRefresh) {
			isLoading.value = false
		} else {
			isLoadingMore.value = false
		}
	}
}

// 下拉刷新相关方法
const handleRefresherPulling = (e) => {
	// 下拉过程中，可以根据下拉距离来调整样式
	// e.detail.dy 为下拉距离
}

const handleRefresherRefresh = async () => {
	// 触发刷新
	refresherTriggered.value = true
	isRefreshing.value = true
	
	try {
		await fetchTaskList(true)
		
		uni.showToast({
			title: '刷新成功',
			icon: 'success',
			duration: 1500
		})
	} catch (error) {
		console.error('刷新失败:', error)
		uni.showToast({
			title: '刷新失败，请重试',
			icon: 'none',
			duration: 2000
		})
	} finally {
		// 延迟一点时间让用户看到刷新效果
		setTimeout(() => {
			refresherTriggered.value = false
			isRefreshing.value = false
		}, 800)
	}
}

const handleRefresherRestore = () => {
	// 刷新被终止
	refresherTriggered.value = false
	isRefreshing.value = false
}

// 分页相关方法
const loadMore = async () => {
	if (!hasMore.value || isLoadingMore.value) return
	
	currentPage.value++
	await fetchTaskList(false)
}

const handleScrollToLower = () => {
	// 触底自动加载更多
	if (hasMore.value && !isLoadingMore.value) {
		loadMore()
	}
}



onMounted(() => {
	// 确保用户数据已初始化
	userStore.initUserInfo()
	fetchTaskList(true)
})
</script>

<style lang="scss" scoped>
.like-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
}

.like-container::before {
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

.task-list {
	position: fixed;
	top: 140rpx;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	padding: 20rpx 0 40rpx 0;
	overflow-y: auto;
	
	/* 隐藏滚动条 */
	&::-webkit-scrollbar {
		display: none !important;
		width: 0 !important;
		height: 0 !important;
	}
	
	/* Firefox兼容 */
	scrollbar-width: none !important;
	-ms-overflow-style: none !important;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 120rpx 40rpx;
	text-align: center;
	
	.empty-text {
		color: rgba(255, 255, 255, 0.7);
		font-size: 28rpx;
		margin-top: 30rpx;
	}
}

.task-card {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20rpx;
	backdrop-filter: blur(10rpx);
}

.task-swipe-container {
	position: relative;
	overflow: hidden;
}

.task-swipe-wrapper {
	position: relative;
	width: 100%;
}

.uni-card__content {
    background-color: #f7f6f8;
}

.task-item {
	display: flex;
	align-items: center;
	padding: 10rpx 15rpx;
	gap: 12rpx;
	background: #f7f6f8;
	border-radius: 20rpx;
	transition: transform 0.3s ease;
	position: relative;
	z-index: 2;
	
	.task-checkbox {
		flex-shrink: 0;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	
	.task-content {
		flex: 1;
		
		.task-description {
			display: block;
			font-size: 32rpx;
			color: #333;
			margin-bottom: 4rpx;
			
			&.completed {
				text-decoration: line-through;
				color: #999;
			}
		}
		
		.task-value {
			display: flex;
			align-items: center;
			gap: 6rpx;
			margin-top: 4rpx;
			
			.value-text {
				font-size: 24rpx;
				color: #666;
			}
		}
	}
	
	.task-actions {
		flex-shrink: 0;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.delete-action {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 120rpx;
	background: #ff6b6b;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0 20rpx 20rpx 0;
	z-index: 1;
	
	&:active {
		background: #ff5252;
	}
}

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.delete-overlay {
	align-items: center !important;
	justify-content: center !important;
}

.delete-modal {
	background: #fff;
	border-radius: 20rpx;
	max-width: 600rpx;
	width: 90%;
	margin: 0 auto;
	animation: none;
	overflow: hidden;
	
	.popup-header {
		padding: 30rpx 40rpx 20rpx;
		
		.popup-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			text-align: center;
		}
	}
	
	.delete-message {
		padding: 0 40rpx 30rpx;
		text-align: center;
		
		text {
			font-size: 28rpx;
			color: #666;
			line-height: 1.5;
		}
	}
	
	.popup-actions {
		display: flex;
		margin-top: 0;
		
		.cancel-btn, .delete-btn {
			flex: 1;
			padding: 30rpx;
			font-size: 30rpx;
			border: none;
			margin: 0;
			border-radius: 0;
			
			&:first-child {
				border-bottom-left-radius: 20rpx;
			}
			
			&:last-child {
				border-bottom-right-radius: 20rpx;
			}
		}
		
		.cancel-btn {
			background: #f5f5f5;
			color: #666;
			border-right: 1rpx solid #e0e0e0;
			
			&:active {
				background: #ebebeb;
			}
		}
		
		.delete-btn {
			background: #ff6b6b;
			color: #fff;
			
			&:active {
				background: #ff5252;
			}
		}
	}
}

.load-more {
	padding: 30rpx;
	text-align: center;
	
	.loading-text, .no-more-text {
		color: rgba(255, 255, 255, 0.7);
		font-size: 26rpx;
	}
	
	.load-more-btn {
		background: rgba(255, 255, 255, 0.2);
		border: 1rpx solid rgba(255, 255, 255, 0.3);
		border-radius: 30rpx;
		padding: 20rpx 40rpx;
		backdrop-filter: blur(10rpx);
		
		text {
			color: #fff;
			font-size: 28rpx;
			font-weight: 500;
		}
		
		&:active {
			background: rgba(255, 255, 255, 0.3);
			transform: scale(0.98);
		}
	}
}
</style>
