<template>
	<view class="statistics-container">
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
				<text class="nav-title">统计</text>
			</view>
			<view class="nav-right">
			</view>
		</view>

		<!-- 年份月份选择器 -->
		<view class="date-selector">
			<view class="selector-left">
				<view class="selector-item">
					<text class="selector-label">年份</text>
					<picker mode="selector" :value="yearIndex" :range="yearOptions" @change="onYearChange">
						<view class="picker-value">{{ selectedYear }}年</view>
					</picker>
				</view>
				<view class="selector-item">
					<text class="selector-label">月份</text>
					<picker mode="selector" :value="monthIndex" :range="monthOptions" @change="onMonthChange">
						<view class="picker-value">{{ selectedMonth }}月</view>
					</picker>
				</view>
			</view>
			<view class="selector-right">
				<view class="sort-btn" @click="toggleSort">
					<uni-icons :type="isDescending ? 'up' : 'down'" size="20" color="#fff"></uni-icons>
					<text class="sort-text">{{ isDescending ? '倒序' : '正序' }}</text>
				</view>
			</view>
		</view>

		<!-- 统计列表 -->
		<scroll-view class="statistics-list" 
			scroll-y="true" 
			refresher-enabled="true"
			refresher-background="transparent"
			:refresher-triggered="refresherTriggered"
			@refresherpulling="handleRefresherPulling"
			@refresherrefresh="handleRefresherRefresh"
			@refresherrestore="handleRefresherRestore">
			
			<!-- 空状态 -->
			<view v-if="statisticsList.length === 0 && !isLoading" class="empty-state">
				<uni-icons type="bars" size="80" color="rgba(255, 255, 255, 0.3)"></uni-icons>
				<text class="empty-text">暂无统计数据</text>
			</view>
			
			<!-- 统计项列表 -->
			<uni-card v-for="(item, index) in statisticsList" :key="`${item.year}-${item.month}-${item.day}`" 
				:is-shadow="false" 
				:border="false"
				margin="8rpx 20rpx"
				class="statistic-card"
				:class="{ 'disabled': !item.isPast }">
				<view class="statistic-item" 
					@click="toggleExpand(item)"
					:class="{ 'disabled': !item.isPast }">
					<!-- 统计头部 -->
					<view class="statistic-header">
						<view class="date-info">
							<text class="date-text">{{ item.month }}/{{ item.day }}</text>
							<text class="weekday-text">{{ getWeekday(item.year, item.month, item.day) }}</text>
						</view>
						<view class="stats-info">
							<view class="stat-item">
								<text class="stat-label">完成</text>
								<text class="stat-value finish">{{ item.finishCount || 0 }}</text>
							</view>
							<view class="stat-item">
								<text class="stat-label">未完成</text>
								<text class="stat-value left">{{ item.leftCount || 0 }}</text>
							</view>
							<view class="stat-item">
								<text class="stat-label">收入</text>
								<text class="stat-value income">+{{ item.addMoney || 0 }}</text>
							</view>
							<view class="stat-item" v-if="item.difMoney && item.difMoney > 0">
								<text class="stat-label">惩罚</text>
								<text class="stat-value expense">-{{ item.difMoney }}</text>
							</view>
						</view>
						<view class="expand-icon" v-if="item.isPast">
							<uni-icons :type="expandedItems[getItemKey(item)] ? 'down' : 'right'" 
								size="16" 
								color="rgba(255, 255, 255, 0.7)">
							</uni-icons>
						</view>
					</view>
					
					<!-- 任务详情 -->
					<view class="tasks-container" 
						v-if="expandedItems[getItemKey(item)] && item.tasks && item.tasks.length > 0"
						:class="{ 'expanded': expandedItems[getItemKey(item)] }">
						<view class="tasks-divider"></view>
						
						<!-- 未完成的任务 -->
						<view class="task-section">
							<view v-for="(task, taskIndex) in getUncompletedTasks(item.tasks)" :key="task.id" class="task-item">
								<view class="task-checkbox">
									<uni-icons type="checkbox" 
										:size="20" 
										color="#C7C7CC">
									</uni-icons>
								</view>
								<view class="task-content">
									<text class="task-description">{{ task.taskDescription }}</text>
									<view class="task-value" v-if="task.value && task.value >= 1">
										<uni-icons type="wallet" size="12" color="#666"></uni-icons>
										<text class="value-text">{{ task.value }}</text>
									</view>
								</view>
								<view class="task-actions">
									<uni-icons :type="task.like ? 'star-filled' : 'star'" 
										:size="20" 
										:color="task.like ? '#FFD700' : '#C7C7CC'">
									</uni-icons>
								</view>
							</view>
						</view>
						
						<!-- 已完成分组标题 -->
						<view v-if="getCompletedTasks(item.tasks).length > 0" class="section-title" @click="toggleCompletedSection(item)">
							<uni-icons :type="completedSections[getItemKey(item)] ? 'down' : 'right'" size="16" color="rgba(51, 51, 51, 0.7)"></uni-icons>
							<text class="section-text">已完成</text>
						</view>
						
						<!-- 已完成的任务 -->
						<view class="completed-tasks-container" :class="{ 'collapsed': !completedSections[getItemKey(item)] }">
							<view v-for="(task, taskIndex) in getCompletedTasks(item.tasks)" :key="task.id" class="task-item">
								<view class="task-checkbox">
									<uni-icons type="checkbox" 
										:size="20" 
										color="#4CD964">
									</uni-icons>
								</view>
								<view class="task-content">
									<text class="task-description completed">{{ task.taskDescription }}</text>
									<view class="task-value" v-if="task.value && task.value >= 1">
										<uni-icons type="wallet" size="12" color="#666"></uni-icons>
										<text class="value-text">{{ task.value }}</text>
									</view>
								</view>
								<view class="task-actions">
									<uni-icons :type="task.like ? 'star-filled' : 'star'" 
										:size="20" 
										:color="task.like ? '#FFD700' : '#C7C7CC'">
									</uni-icons>
								</view>
							</view>
						</view>
					</view>
				</view>
			</uni-card>
		</scroll-view>
    </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { taskApi } from '@/api/taskApi'
import { useUserStore } from '@/stores/user'

// 响应式数据
const userStore = useUserStore()
const statisticsList = ref([])
const isLoading = ref(false)
const imageLoadError = ref(false)

// 日期选择相关
const currentDate = new Date()
const selectedYear = ref(currentDate.getFullYear())
const selectedMonth = ref(currentDate.getMonth() + 1)

// 年份选择器数据
const yearOptions = ref([])
const yearIndex = ref(0)

// 月份选择器数据
const monthOptions = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
const monthIndex = ref(currentDate.getMonth())

// 展开状态
const expandedItems = ref({})

// 已完成任务展开状态
const completedSections = ref({})

// 排序状态
const isDescending = ref(false) // false为正序，true为倒序

// 下拉刷新相关
const refresherTriggered = ref(false)

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

// 初始化年份选择器
const initYearOptions = () => {
	const currentYear = new Date().getFullYear()
	const years = []
	// 提供前2年到后1年的选择
	for (let i = currentYear - 2; i <= currentYear + 1; i++) {
		years.push(i.toString())
	}
	yearOptions.value = years
	
	// 设置当前年份的索引
	const currentYearIndex = years.findIndex(year => parseInt(year) === selectedYear.value)
	yearIndex.value = currentYearIndex >= 0 ? currentYearIndex : years.length - 2
}

// 获取星期几
const getWeekday = (year, month, day) => {
	const date = new Date(year, month - 1, day)
	const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	return weekdays[date.getDay()]
}

// 获取项目唯一键
const getItemKey = (item) => {
	return `${item.year}-${item.month}-${item.day}`
}

// 年份选择改变
const onYearChange = async (e) => {
	const newIndex = e.detail.value
	yearIndex.value = newIndex
	selectedYear.value = parseInt(yearOptions.value[newIndex])
	await fetchStatistics()
}

// 月份选择改变
const onMonthChange = async (e) => {
	const newIndex = e.detail.value
	monthIndex.value = newIndex
	selectedMonth.value = parseInt(monthOptions.value[newIndex])
	await fetchStatistics()
}

// 切换展开状态
const toggleExpand = (item) => {
	if (!item.isPast) return // 未来日期不可点击
	
	const key = getItemKey(item)
	expandedItems.value[key] = !expandedItems.value[key]
	
	// 如果是展开状态，默认显示已完成任务
	if (expandedItems.value[key]) {
		completedSections.value[key] = true
	}
}

// 切换已完成任务展开状态
const toggleCompletedSection = (item) => {
	const key = getItemKey(item)
	completedSections.value[key] = !completedSections.value[key]
}

// 获取未完成的任务
const getUncompletedTasks = (tasks) => {
	return tasks ? tasks.filter(task => !task.isCompleted) : []
}

// 获取已完成的任务
const getCompletedTasks = (tasks) => {
	return tasks ? tasks.filter(task => task.isCompleted) : []
}

// 切换排序方式
const toggleSort = () => {
	isDescending.value = !isDescending.value
	// 重新排序统计列表
	statisticsList.value = sortStatisticsList(statisticsList.value)
}

// 排序统计列表
const sortStatisticsList = (list) => {
	return list.sort((a, b) => {
		return isDescending.value ? b.day - a.day : a.day - b.day
	})
}

// 获取统计数据
const fetchStatistics = async () => {
	isLoading.value = true
	try {
		const res = await taskApi.statistic({
			year: selectedYear.value,
			month: selectedMonth.value
		})
		
		if (res && res.code === '200' && res.data) {
			statisticsList.value = sortStatisticsList(res.data)
		}
	} catch (error) {
		console.error('获取统计数据失败:', error)
		uni.showToast({
			title: '获取统计数据失败',
			icon: 'none'
		})
	} finally {
		isLoading.value = false
	}
}

// 背景图片相关方法
const handleImageError = () => {
	imageLoadError.value = true
}

const handleImageLoad = () => {
	imageLoadError.value = false
}

// 下拉刷新相关方法
const handleRefresherPulling = (e) => {
	// 下拉过程中的处理
}

const handleRefresherRefresh = async () => {
	refresherTriggered.value = true
	
	try {
		await fetchStatistics()
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
		setTimeout(() => {
			refresherTriggered.value = false
		}, 800)
	}
}

const handleRefresherRestore = () => {
	refresherTriggered.value = false
}

onMounted(() => {
	userStore.initUserInfo()
	initYearOptions()
	fetchStatistics()
})
</script>

<style lang="scss" scoped>
.statistics-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
}

.statistics-container::before {
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

.date-selector {
	position: fixed;
	top: 140rpx;
	left: 0;
	right: 0;
	z-index: 90;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10rpx);
	padding: 15rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	.selector-left {
		display: flex;
		gap: 40rpx;
		
		.selector-item {
			display: flex;
			align-items: center;
			gap: 15rpx;
			
			.selector-label {
				color: rgba(255, 255, 255, 0.9);
				font-size: 28rpx;
				font-weight: 500;
			}
			
			.picker-value {
				color: #fff;
				font-size: 28rpx;
				padding: 10rpx 20rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 10rpx;
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				min-width: 100rpx;
				text-align: center;
			}
		}
	}
	
	.selector-right {
		.sort-btn {
			display: flex;
			align-items: center;
			gap: 8rpx;
			padding: 10rpx 16rpx;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 10rpx;
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			cursor: pointer;
			transition: all 0.3s ease;
			
			&:active {
				background: rgba(255, 255, 255, 0.3);
				transform: scale(0.98);
			}
			
			.sort-text {
				color: #fff;
				font-size: 24rpx;
				font-weight: 500;
			}
		}
	}
}

.statistics-list {
	position: fixed;
	top: 200rpx;
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

.statistic-card {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20rpx;
	backdrop-filter: blur(10rpx);
	
	&.disabled {
		background: rgba(255, 255, 255, 0.5);
		opacity: 0.6;
	}
}

.uni-card__content {
    background-color: #f7f6f8;
}
.statistic-item {
	background: #f7f6f8;
	border-radius: 20rpx;
	cursor: pointer;
	transition: all 0.3s ease;
	
	&.disabled {
		background: #e0e0e0;
		cursor: not-allowed;
		opacity: 0.7;
	}
	
	&:not(.disabled):active {
		transform: scale(0.98);
	}
}

.statistic-header {
	display: flex;
	align-items: center;
	padding: 20rpx;
	gap: 20rpx;
	
	.date-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 120rpx;
		
		.date-text {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
		}
		
		.weekday-text {
			font-size: 24rpx;
			color: #666;
			margin-top: 4rpx;
		}
	}
	
	.stats-info {
		flex: 1;
		display: flex;
		gap: 25rpx;
		flex-wrap: wrap;
		
		.stat-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.stat-label {
				font-size: 22rpx;
				color: #666;
				margin-bottom: 4rpx;
			}
			
			.stat-value {
				font-size: 28rpx;
				font-weight: 600;
				
				&.finish {
					color: #4CD964;
				}
				
				&.left {
					color: #ff6b6b;
				}
				
				&.income {
					color: #4CD964;
				}
				
				&.expense {
					color: #ff6b6b;
				}
			}
		}
	}
	
	.expand-icon {
		padding: 10rpx;
	}
}

.tasks-container {
	overflow: hidden;
	max-height: 0;
	transition: max-height 0.3s ease;
	
	&.expanded {
		max-height: 9999rpx;
	}
}

.tasks-divider {
	height: 1rpx;
	background: #e0e0e0;
	margin: 0 20rpx;
}

.task-section {
	padding: 20rpx;
	padding-top: 15rpx;
}

.section-title {
	display: flex;
	align-items: center;
	gap: 10rpx;
	padding: 15rpx 20rpx 10rpx;
	cursor: pointer;
	user-select: none;
	transition: all 0.3s ease;
	
	&:active {
		opacity: 0.7;
	}
	
	.section-text {
		color: rgba(51, 51, 51, 0.7);
		font-size: 26rpx;
		font-weight: 500;
	}
}

.completed-tasks-container {
	overflow: hidden;
	transition: all 0.4s ease;
	max-height: 9999rpx;
	opacity: 1;
	padding: 0 20rpx 20rpx;
	
	&.collapsed {
		max-height: 0;
		opacity: 0;
		margin: 0;
		padding: 0 20rpx;
	}
}

.task-item {
	display: flex;
	align-items: center;
	padding: 12rpx 0;
	gap: 15rpx;
	
	&:not(:last-child) {
		border-bottom: 1rpx solid #f0f0f0;
		padding-bottom: 12rpx;
		margin-bottom: 12rpx;
	}
	
	.task-checkbox {
		flex-shrink: 0;
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.task-content {
		flex: 1;
		
		.task-description {
			display: block;
			font-size: 28rpx;
			color: #333;
			line-height: 1.4;
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
			
			.value-text {
				font-size: 22rpx;
				color: #666;
			}
		}
	}
	
	.task-actions {
		flex-shrink: 0;
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
