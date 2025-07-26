<template>
	<view class="home-container">
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
				<uni-icons type="gear" size="24" color="#fff" @click="openSettings"></uni-icons>
			</view>
			<view class="nav-center">
				<text class="money-text">¥{{ formattedMoney }}</text>
			</view>
			<view class="nav-right">
				<uni-icons type="more-filled" size="24" color="#fff" @click="openMore"></uni-icons>
				<uni-icons type="undo" size="24" color="#fff" @click="handleLogout"></uni-icons>
			</view>
		</view>

		<!-- 日期 -->
		<view class="date-header">
			<text class="date-info">{{ currentDate }}</text>
		</view>

		<!-- 任务列表 -->
		<scroll-view class="task-list" scroll-y="true" @scroll="handleScroll">
			<!-- 未完成的任务 -->
			<uni-card v-for="(task, index) in uncompletedTasks" :key="task.id" 
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
						<view class="task-checkbox" @click="toggleTask(task.id)">
							<uni-icons type="checkbox" 
								:size="24" 
								color="#C7C7CC">
							</uni-icons>
						</view>
						<view class="task-content" @click="editTaskItem(task, $event)">
							<text class="task-description">{{ task.taskDescription }}</text>
							<view class="task-value" v-if="task.value && task.value >= 1">
								<uni-icons type="wallet" size="14" color="#666"></uni-icons>
								<text class="value-text">{{ task.value }}</text>
							</view>
						</view>
						<view class="task-actions">
							<uni-icons :type="task.like ? 'star-filled' : 'star'" 
								:size="24" 
								:color="task.like ? '#FFD700' : '#C7C7CC'"
								@click="toggleStar(task.id)">
							</uni-icons>
						</view>
					</view>
					<view class="delete-action" 
						v-if="swipeStates[task.id]?.showDelete"
						@click="confirmDelete(task.id)">
						<uni-icons type="trash" size="24" color="#fff"></uni-icons>
					</view>
				</view>
			</uni-card>
			
			<!-- 已完成分组标题 -->
			<view v-if="completedTasks.length > 0" class="section-title" @click="toggleCompletedTasks">
				<uni-icons :type="showCompletedTasks ? 'down' : 'right'" size="16" color="rgba(255, 255, 255, 0.7)"></uni-icons>
				<text class="section-text">已完成</text>
			</view>
			
			<!-- 已完成的任务 -->
			<view class="completed-tasks-container" :class="{ 'collapsed': !showCompletedTasks }">
				<uni-card v-for="(task, index) in completedTasks" :key="task.id" 
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
							<view class="task-checkbox" @click="toggleTask(task.id)">
								<uni-icons type="checkboxfilled" 
									:size="24" 
									color="#4CD964">
								</uni-icons>
							</view>
							<view class="task-content completed-task" @click="editTaskItem(task, $event)">
								<text class="task-description completed">{{ task.taskDescription }}</text>
								<view class="task-value" v-if="task.value && task.value >= 1">
									<uni-icons type="wallet" size="14" color="#666"></uni-icons>
									<text class="value-text">{{ task.value }}</text>
								</view>
							</view>
							<view class="task-actions">
								<uni-icons :type="task.like ? 'star-filled' : 'star'" 
									:size="24" 
									:color="task.like ? '#FFD700' : '#C7C7CC'"
									@click="toggleStar(task.id)">
								</uni-icons>
							</view>
						</view>
						<view class="delete-action" 
							v-if="swipeStates[task.id]?.showDelete"
							@click="confirmDelete(task.id)">
							<uni-icons type="trash" size="24" color="#fff"></uni-icons>
						</view>
					</view>
				</uni-card>
			</view>
		</scroll-view>

		<!-- 添加任务按钮 -->
		<view class="add-task-container">
			<view class="add-task-swipe-wrapper">
				<view class="add-task-btn" 
					:style="{ transform: `translateX(${addBtnSwipeState.translateX}rpx)` }"
					@click="showAddTaskModal"
					@touchstart="handleAddBtnTouchStart"
					@touchmove="handleAddBtnTouchMove"
					@touchend="handleAddBtnTouchEnd">
					<uni-icons type="plus" size="20" color="#fff"></uni-icons>
					<text class="add-btn-text">添加任务</text>
				</view>
				<view class="cost-action" 
					v-if="addBtnSwipeState.showCost"
					@click="openCostModal">
					<uni-icons type="wallet" size="24" color="#fff"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 添加任务弹窗 -->
		<view class="modal-overlay" v-if="showModal" @click="closeAddTaskModal">
			<view class="modal-content" :class="{ 'closing': modalClosing }" @click.stop>
				<view class="popup-header">
					<text class="popup-title">新建任务</text>
					<view class="popup-close" @click="closeAddTaskModal">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				
				<view class="input-group">
					<view class="input-label">任务描述</view>
					<input class="task-input" 
						v-model="newTask.description" 
						placeholder="请输入任务描述..."
						maxlength="100"
						:focus="focusDescription"
						@blur="focusDescription = false" />
				</view>
				
				<view class="input-group">
					<view class="input-label">任务价值</view>
					<view class="number-input-container">
						<input class="task-input number-input" 
							v-model="newTask.value" 
							type="number"
							placeholder="最小值为1"
							@input="validateNumber" />
						<view class="number-controls">
							<view class="control-btn increase-btn" @click="increaseValue">
								<uni-icons type="plus" size="20" color="#fff"></uni-icons>
							</view>
							<view class="control-btn decrease-btn" @click="decreaseValue">
								<uni-icons type="minus" size="20" color="#fff"></uni-icons>
							</view>
						</view>
					</view>
				</view>
				
				<view class="popup-actions">
					<button class="cancel-btn" @click="closeAddTaskModal">取消</button>
					<button class="confirm-btn" @click="addTask" :disabled="!newTask.description.trim()">确认添加</button>
				</view>
			</view>
		</view>

		<!-- 修改任务弹窗 -->
		<view class="modal-overlay" v-if="showEditModal" @click="closeEditTaskModal">
			<view class="modal-content" :class="{ 'closing': editModalClosing }" @click.stop>
				<view class="popup-header">
					<text class="popup-title">修改任务</text>
					<view class="popup-close" @click="closeEditTaskModal">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				
				<view class="input-group">
					<view class="input-label">任务描述</view>
					<input class="task-input" 
						v-model="editTask.description" 
						placeholder="请输入任务描述..."
						maxlength="100"
						:focus="focusEditDescription"
						@blur="focusEditDescription = false" />
				</view>
				
				<view class="input-group">
					<view class="input-label">任务价值</view>
					<view class="number-input-container">
						<input class="task-input number-input" 
							v-model="editTask.value" 
							type="number"
							placeholder="最小值为1"
							@input="validateEditNumber" />
						<view class="number-controls">
							<view class="control-btn increase-btn" @click="increaseEditValue">
								<uni-icons type="plus" size="20" color="#fff"></uni-icons>
							</view>
							<view class="control-btn decrease-btn" @click="decreaseEditValue">
								<uni-icons type="minus" size="20" color="#fff"></uni-icons>
							</view>
						</view>
					</view>
				</view>
				
				<view class="popup-actions">
					<button class="cancel-btn" @click="closeEditTaskModal">取消</button>
					<button class="confirm-btn" @click="updateTask" :disabled="!editTask.description.trim()">确认修改</button>
				</view>
			</view>
		</view>

		<!-- 用户信息修改弹窗 -->
		<view class="modal-overlay" v-if="showUserInfoModal" @click="closeUserInfoModal">
			<view class="modal-content" :class="{ 'closing': userInfoModalClosing }" @click.stop>
				<view class="popup-header">
					<text class="popup-title">修改用户信息</text>
					<view class="popup-close" @click="closeUserInfoModal">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				
				<view class="input-group">
					<view class="input-label">昵称</view>
					<input class="task-input" 
						v-model="userForm.nickname" 
						placeholder="请输入昵称..."
						maxlength="20" />
				</view>
				
				<view class="input-group">
					<view class="input-label">背景图片</view>
					<view class="background-preview" v-if="tempBackgroundUrl">
						<image :src="tempBackgroundUrl" class="preview-image" mode="aspectFill"></image>
						<view class="remove-btn" @click="removeBackgroundImage">
							<uni-icons type="close" size="16" color="#fff"></uni-icons>
						</view>
					</view>
					<view class="choose-image-btn" @click="chooseBackgroundImage">
						<uni-icons type="image" size="24" color="#667eea"></uni-icons>
						<text class="choose-text">{{ tempBackgroundUrl ? '重新选择' : '选择背景图片' }}</text>
					</view>
				</view>
				
				<view class="popup-actions">
					<button class="cancel-btn" @click="closeUserInfoModal">取消</button>
					<button class="confirm-btn" @click="updateUserInfo" :disabled="!userForm.nickname.trim()">确认修改</button>
				</view>
			</view>
		</view>

		<!-- 删除确认弹窗 -->
		<view class="modal-overlay delete-overlay" v-if="showDeleteConfirm" @click="cancelDelete">
			<view class="modal-content delete-modal" @click.stop>
				<view class="popup-header">
					<text class="popup-title">删除任务</text>
				</view>
				
				<view class="delete-message">
					<text>将永久删除"{{ getTaskById(deleteTaskId)?.taskDescription }}"。</text>
				</view>
				
				<view class="popup-actions">
					<button class="cancel-btn" @click="cancelDelete">取消</button>
					<button class="delete-btn" @click="executeDelete">删除</button>
				</view>
			</view>
		</view>

		<!-- 更多菜单弹窗 -->
		<view class="modal-overlay" v-if="showMoreMenu" @click="closeMoreMenu">
			<view class="modal-content more-menu" :class="{ 'closing': moreMenuClosing }" @click.stop>
				<view class="menu-header">
					<view class="menu-handle"></view>
					<text class="menu-title">列表选项</text>
					<text class="menu-done" @click="closeMoreMenu">完成</text>
				</view>
				
				<view class="menu-items">
					<view class="menu-item" @click="goToFavorites">
						<uni-icons type="star" size="20" color="#333"></uni-icons>
						<text class="menu-text">收藏</text>
					</view>
					
					<view class="menu-item" @click="goToStatistics">
						<uni-icons type="bars" size="20" color="#333"></uni-icons>
						<text class="menu-text">统计</text>
					</view>
					
					<view class="menu-item" @click="goToCharts">
						<uni-icons type="chart" size="20" color="#333"></uni-icons>
						<text class="menu-text">图表</text>
					</view>
					
					<view class="menu-item" @click="goToTemplate">
						<uni-icons type="list" size="20" color="#333"></uni-icons>
						<text class="menu-text">模板</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 消费弹窗 -->
		<view class="modal-overlay" v-if="showCostModal" @click="closeCostModal">
			<view class="modal-content" :class="{ 'closing': costModalClosing }" @click.stop>
				<view class="popup-header">
					<text class="popup-title">消费</text>
					<view class="popup-close" @click="closeCostModal">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				
				<view class="input-group">
					<view class="input-label">消费金额</view>
					<input class="task-input" 
						v-model="costAmount" 
						type="number"
						placeholder="请输入消费金额..."
						:focus="focusCostAmount"
						@blur="focusCostAmount = false"
						@input="validateCostAmount" />
				</view>
				
				<view class="popup-actions">
					<button class="cancel-btn" @click="closeCostModal">取消</button>
					<button class="confirm-btn" @click="executeCost" :disabled="!costAmount || parseInt(costAmount) < 1">消费</button>
				</view>
			</view>
		</view>
    </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { utilApi } from '@/api/utilApi'
import { userApi } from '@/api/userApi'
import { taskApi } from '@/api/taskApi'
import { useUserStore } from '@/stores/user'

// 响应式数据
const userStore = useUserStore()

const taskList = ref([])

const newTask = ref({
	description: '',
	value: '1'
})

const showModal = ref(false)
const modalClosing = ref(false) // 控制弹窗关闭动画
const focusDescription = ref(false) // 控制任务描述输入框聚焦

// 修改任务弹框相关
const showEditModal = ref(false)
const editModalClosing = ref(false) // 控制修改弹窗关闭动画
const focusEditDescription = ref(false) // 控制修改任务描述输入框聚焦
const editTask = ref({
	id: null,
	description: '',
	value: '1'
})
const showCompletedTasks = ref(true) // 控制已完成任务的显示/隐藏
const currentTimestamp = ref(Date.now()) // 默认值为当前时间戳
let nextDayTimer = null // 每日更新定时器

// 滑动删除相关状态
const swipeStates = ref({}) // 记录每个任务的滑动状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const currentSwipeTaskId = ref(null)
const showDeleteConfirm = ref(false)
const deleteTaskId = ref(null)

// 更多菜单相关状态
const showMoreMenu = ref(false)
const moreMenuClosing = ref(false) // 控制更多菜单弹窗关闭动画

// 用户信息修改相关
const showUserInfoModal = ref(false) // 显示用户信息修改弹框
const userInfoModalClosing = ref(false) // 控制用户信息弹窗关闭动画

// 消费弹框相关
const showCostModal = ref(false) // 显示消费弹框
const costModalClosing = ref(false) // 控制消费弹窗关闭动画
const costAmount = ref('1') // 消费金额
const focusCostAmount = ref(false) // 控制消费金额输入框聚焦

// 添加任务按钮滑动相关
const addBtnTouchStartX = ref(0)
const addBtnTouchStartY = ref(0)
const addBtnSwipeState = ref({
	translateX: 0,
	showCost: false
})
const userForm = ref({
	nickname: '',
	backImg: null
})
const tempBackgroundUrl = ref('') // 临时背景图片URL
const imageLoadError = ref(false) // 图片加载失败状态
async function refreshMoney() {
    const res = await userApi.getMoney()
    userStore.userInfo.money = res.data
    userStore.setUserInfo(userStore.userInfo)
}
async function refreshUserInfo() {
    const res = await userApi.getUserInfo()
    userStore.userInfo = res.data
    userStore.setUserInfo(userStore.userInfo)
}
// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
	return userStore.userInfo.backgroudImg || ''
})

// 计算属性 - 当前日期，从API获取的时间戳转换
const currentDate = computed(() => {
	const now = new Date(currentTimestamp.value)
	const month = now.getMonth() + 1
	const date = now.getDate()
	const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	const weekday = weekdays[now.getDay()]
	return `${month}月${date}日 ${weekday}`
})

// 计算属性 - 是否显示背景图片
const showBackgroundImage = computed(() => {
	return currentBackgroundImage.value && !imageLoadError.value
})

// 计算属性 - 格式化金钱显示
const formattedMoney = computed(() => {
	const money = userStore.userInfo.money || 0
	return money.toLocaleString()
})

// 计算属性 - 未完成的任务（按sort排序）
const uncompletedTasks = computed(() => {
	return taskList.value
		.filter(task => !task.isCompleted)
		.sort((a, b) => (a.sort || 0) - (b.sort || 0))
})

// 计算属性 - 已完成的任务（按sort排序）
const completedTasks = computed(() => {
	return taskList.value
		.filter(task => task.isCompleted)
		.sort((a, b) => (a.sort || 0) - (b.sort || 0))
})

// 方法
const openSettings = () => {
	// 初始化表单数据
	userForm.value.nickname = userStore.userInfo.nickname || ''
	userForm.value.backImg = null
	tempBackgroundUrl.value = userStore.userInfo.backgroudImg || ''
	showUserInfoModal.value = true
}

const openMore = () => {
	showMoreMenu.value = true
}

const toggleTask = async (taskId) => {
	try {
		const res = await taskApi.complete(taskId)
		if (res.code === 200 || res.code === '200') {
			// 刷新任务列表
			await fetchTaskList()
            refreshMoney()
		} else {
			uni.showToast({
				title: res.message || '操作失败',
				icon: 'none'
			})
		}
	} catch (error) {
		console.error('切换任务状态失败:', error)
		uni.showToast({
			title: '操作失败',
			icon: 'none'
		})
	}
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

const toggleCompletedTasks = () => {
	showCompletedTasks.value = !showCompletedTasks.value
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
	
	// 如果滑动超过一半宽度，直接确认删除
	if (state.translateX < -60) {
		confirmDelete(taskId)
	} else if (state.translateX < -30) {
		// 显示删除按钮
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
	resetAddBtnSwipeState()
}

const confirmDelete = (taskId) => {
	resetAllSwipeStates()
	deleteTaskId.value = taskId
	showDeleteConfirm.value = true
}

const cancelDelete = () => {
	showDeleteConfirm.value = false
	deleteTaskId.value = null
}

const executeDelete = async () => {
	if (!deleteTaskId.value) return
	
	uni.showLoading({
		title: '删除中...'
	})
	
	try {
		const res = await taskApi.deleteTask(deleteTaskId.value)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			uni.showToast({
				title: '任务已删除',
				icon: 'success'
			})
			// 重新获取任务列表
			await fetchTaskList()
		} else {
			uni.showToast({
				title: res.message || '删除失败',
				icon: 'none'
			})
		}
	} catch (error) {
		uni.hideLoading()
		uni.showToast({
			title: '删除失败',
			icon: 'none'
		})
		console.error('删除任务失败:', error)
	} finally {
		cancelDelete()
	}
}

const getTaskById = (taskId) => {
	return taskList.value.find(task => task.id === taskId)
}

// 更多菜单相关方法
const closeMoreMenu = () => {
	moreMenuClosing.value = true // 开始关闭动画
	
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showMoreMenu.value = false
		moreMenuClosing.value = false
	}, 300) // 动画持续300ms
}

const goToFavorites = () => {
	closeMoreMenu()
	// 延迟显示toast，等待弹窗关闭动画完成
	setTimeout(() => {
		uni.showToast({
			title: '跳转到收藏页面',
			icon: 'none'
		})
		// TODO: 实现跳转到收藏页面的逻辑
	}, 300)
}

const goToStatistics = () => {
	// closeMoreMenu()
	// 延迟跳转，等待弹窗关闭动画完成
	// setTimeout(() => {
	// 	uni.navigateTo({
	// 		url: '/pages/statistics/statistics'
	// 	})
	// }, 300)
}

const goToCharts = () => {
	closeMoreMenu()
	// 延迟显示toast，等待弹窗关闭动画完成
	setTimeout(() => {
		uni.showToast({
			title: '跳转到图表页面',
			icon: 'none'
		})
		// TODO: 实现跳转到图表页面的逻辑
	}, 300)
}

const goToTemplate = () => {
	closeMoreMenu()
	// 延迟显示toast，等待弹窗关闭动画完成
	setTimeout(() => {
		// TODO: 实现跳转到模板页面的逻辑
        uni.navigateTo({
            url: '/pages/template/template'
        })
	}, 300)
}

const showAddTaskModal = () => {
	showModal.value = true
	// 延迟聚焦，等待弹窗动画完成
	setTimeout(() => {
		focusDescription.value = true
	}, 300)
}

// 修改任务相关方法
const editTaskItem = (task, event) => {
	// 阻止事件冒泡，避免触发滑动等其他事件
	if (event) {
		event.stopPropagation()
	}
	
	// 已完成的任务不支持修改
	if (task.isCompleted) {
		return
	}
	
	// 填充编辑表单数据
	editTask.value = {
		id: task.id,
		description: task.taskDescription,
		value: task.value ? task.value.toString() : '1'
	}
	showEditModal.value = true
	// 延迟聚焦，等待弹窗动画完成
	setTimeout(() => {
		focusEditDescription.value = true
	}, 300)
}

const closeEditTaskModal = () => {
	editModalClosing.value = true // 开始关闭动画
	focusEditDescription.value = false // 重置聚焦状态
	
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showEditModal.value = false
		editModalClosing.value = false
		// 清空编辑表单
		editTask.value = {
			id: null,
			description: '',
			value: '1'
		}
	}, 300) // 动画持续300ms
}

// 添加任务按钮滑动事件处理
const handleAddBtnTouchStart = (e) => {
	addBtnTouchStartX.value = e.touches[0].clientX
	addBtnTouchStartY.value = e.touches[0].clientY
}

const handleAddBtnTouchMove = (e) => {
	const touchX = e.touches[0].clientX
	const touchY = e.touches[0].clientY
	const deltaX = touchX - addBtnTouchStartX.value
	const deltaY = touchY - addBtnTouchStartY.value
	
	// 判断是否为水平滑动（防止与垂直滚动冲突）
	if (Math.abs(deltaY) > Math.abs(deltaX)) return
	
	// 只允许向左滑动
	if (deltaX < 0) {
		const translateX = Math.max(deltaX * 0.5, -120) // 最大滑动120rpx
		addBtnSwipeState.value.translateX = translateX
		addBtnSwipeState.value.showCost = translateX < -30
	}
}

const handleAddBtnTouchEnd = (e) => {
	const touchEndX = e.changedTouches[0].clientX
	const deltaX = touchEndX - addBtnTouchStartX.value
	
	// 如果滑动超过30rpx，触发消费功能
	if (addBtnSwipeState.value.translateX < -30) {
		// 显示消费弹框
		showCostModal.value = true
		
		// 延迟聚焦，等待弹窗动画完成
		setTimeout(() => {
			focusCostAmount.value = true
		}, 300)
		
		// 立即回弹按钮
		setTimeout(() => {
			resetAddBtnSwipeState()
		}, 100) // 短暂延迟后回弹
		
		// 阻止点击事件
		e.preventDefault()
		e.stopPropagation()
	} else {
		// 回弹到原位
		resetAddBtnSwipeState()
	}
}

const resetAddBtnSwipeState = () => {
	addBtnSwipeState.value.translateX = 0
	addBtnSwipeState.value.showCost = false
}

const closeAddTaskModal = () => {
	modalClosing.value = true // 开始关闭动画
	focusDescription.value = false // 重置聚焦状态
	
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showModal.value = false
		modalClosing.value = false
		// 清空输入框
		newTask.value = {
			description: '',
			value: '1'
		}
	}, 300) // 动画持续300ms
}

const addTask = async () => {
	if (!newTask.value.description.trim()) {
		uni.showToast({
			title: '请输入任务描述',
			icon: 'none'
		})
		return
	}
	
	uni.showLoading({
		title: '添加中...'
	})
	
	try {
		const reqData = {
			desc: newTask.value.description.trim(),
			value: parseInt(newTask.value.value) || 1
		}
		
		const res = await taskApi.addTask(reqData)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			closeAddTaskModal()
			uni.showToast({
				title: '任务添加成功',
				icon: 'success'
			})
			// 重新获取任务列表
			fetchTaskList()
		} else {
			uni.showToast({
				title: res.message || '添加失败',
				icon: 'none'
			})
		}
	} catch (error) {
		uni.hideLoading()
		uni.showToast({
			title: '添加失败',
			icon: 'none'
		})
		console.error('添加任务失败:', error)
	}
}

const updateTask = async () => {
	if (!editTask.value.description.trim()) {
		uni.showToast({
			title: '请输入任务描述',
			icon: 'none'
		})
		return
	}
	
	uni.showLoading({
		title: '修改中...'
	})
	
	try {
		const reqData = {
			id: editTask.value.id,
			desc: editTask.value.description.trim(),
			value: parseInt(editTask.value.value) || 1
		}
		
		const res = await taskApi.updateTask(reqData)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			closeEditTaskModal()
			uni.showToast({
				title: '任务修改成功',
				icon: 'success'
			})
			// 重新获取任务列表
			fetchTaskList()
		} else {
			uni.showToast({
				title: res.message || '修改失败',
				icon: 'none'
			})
		}
	} catch (error) {
		uni.hideLoading()
		uni.showToast({
			title: '修改失败',
			icon: 'none'
		})
		console.error('修改任务失败:', error)
	}
}

// 数字输入验证和控制
const validateNumber = (e) => {
	let value = e.detail.value || e.target.value
	// 只允许正整数
	value = value.replace(/[^\d]/g, '')
	if (value && parseInt(value) < 1) {
		value = '1'
	}
	if (!value) {
		value = '1'
	}
	newTask.value.value = value
}

const increaseValue = () => {
	const currentValue = parseInt(newTask.value.value) || 1
	newTask.value.value = (currentValue + 1).toString()
}

const decreaseValue = () => {
	const currentValue = parseInt(newTask.value.value) || 1
	if (currentValue > 1) {
		newTask.value.value = (currentValue - 1).toString()
	}
}

// 修改任务数字输入验证和控制
const validateEditNumber = (e) => {
	let value = e.detail.value || e.target.value
	// 只允许正整数
	value = value.replace(/[^\d]/g, '')
	if (value && parseInt(value) < 1) {
		value = '1'
	}
	if (!value) {
		value = '1'
	}
	editTask.value.value = value
}

const increaseEditValue = () => {
	const currentValue = parseInt(editTask.value.value) || 1
	editTask.value.value = (currentValue + 1).toString()
}

const decreaseEditValue = () => {
	const currentValue = parseInt(editTask.value.value) || 1
	if (currentValue > 1) {
		editTask.value.value = (currentValue - 1).toString()
	}
}

// 获取服务器时间戳
const fetchCurrentTime = async () => {
	try {
		const res = await utilApi.now()
		if (res && res.data) {
			currentTimestamp.value = res.data
		}
	} catch (error) {
		console.error('获取服务器时间失败:', error)
		// 如果API调用失败，使用本地时间
		currentTimestamp.value = Date.now()
	}
}

// 设置下一天自动更新定时器
const setupNextDayTimer = () => {
	// 清除之前的定时器
	if (nextDayTimer) {
		clearTimeout(nextDayTimer)
	}
	
	// 计算到下一天0点的毫秒数
	const now = new Date(currentTimestamp.value)
	const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0)
	const msUntilTomorrow = tomorrow.getTime() - now.getTime()
	
	// 设置定时器在下一天0点触发
	nextDayTimer = setTimeout(async () => {
		// 获取新的服务器时间戳
		await fetchCurrentTime()
		console.log('自动更新时间:', new Date(currentTimestamp.value))
		
		// 设置下一次定时器
		setupNextDayTimer()
	}, msUntilTomorrow)
	
	console.log(`设置每日更新定时器，${Math.round(msUntilTomorrow / 1000 / 60)} 分钟后触发`)
}

// 获取任务列表
const fetchTaskList = async () => {
	try {
		const res = await taskApi.queryList({ isToday: true, pageNo: 1, pageSize: 10000 })
		if (res && res.code === '200' && res.data && res.data.list) {
			taskList.value = res.data.list
		}
	} catch (error) {
		console.error('获取任务列表失败:', error)
		uni.showToast({
			title: '获取任务列表失败',
			icon: 'none'
		})
	}
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

// 用户信息修改相关方法
const chooseBackgroundImage = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			const tempFilePath = res.tempFilePaths[0]
			// 将选择的文件转换为File对象
			uni.getFileInfo({
				filePath: tempFilePath,
				success: (fileInfo) => {
					// 创建File对象用于上传
					userForm.value.backImg = {
						path: tempFilePath,
						size: fileInfo.size
					}
					tempBackgroundUrl.value = tempFilePath
				}
			})
		},
		fail: () => {
			uni.showToast({
				title: '选择图片失败',
				icon: 'none'
			})
		}
	})
}

const removeBackgroundImage = () => {
	userForm.value.backImg = null
	tempBackgroundUrl.value = ''
}

const closeUserInfoModal = () => {
	userInfoModalClosing.value = true // 开始关闭动画
	
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showUserInfoModal.value = false
		userInfoModalClosing.value = false
		userForm.value = {
			nickname: '',
			backImg: null
		}
		tempBackgroundUrl.value = ''
	}, 300) // 动画持续300ms
}

const updateUserInfo = async () => {
	if (!userForm.value.nickname.trim()) {
		uni.showToast({
			title: '请输入昵称',
			icon: 'none'
		})
		return
	}
	
	uni.showLoading({
		title: '更新中...'
	})
	
	try {
		const res = await userApi.upd(userForm.value.nickname.trim(), userForm.value.backImg)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			// 更新userStore中的用户信息
			const updatedUserInfo = {
				...userStore.userInfo,
				nickname: userForm.value.nickname.trim()
			}
			// 如果服务器返回了新的背景图片URL，使用服务器返回的
			if (res.data && res.data.backImg) {
				updatedUserInfo.backgroudImg = res.data.backImg
			} else if (tempBackgroundUrl.value && userForm.value.backImg) {
				// 否则使用临时URL（对于本地图片）
				updatedUserInfo.backgroudImg = tempBackgroundUrl.value
			}
			userStore.setUserInfo(updatedUserInfo)
			
			uni.showToast({
				title: '修改成功',
				icon: 'success'
			})
			closeUserInfoModal()
            refreshUserInfo()
		} else {
			uni.showToast({
				title: res.message || '修改失败',
				icon: 'none'
			})
		}
	} catch (error) {
		uni.hideLoading()
		uni.showToast({
			title: '修改失败',
			icon: 'none'
		})
		console.error('修改用户信息失败:', error)
	}
}

// 消费弹框相关方法
const openCostModal = () => {
	showCostModal.value = true
	// 延迟聚焦，等待弹窗动画完成
	setTimeout(() => {
		focusCostAmount.value = true
	}, 300)
}

const closeCostModal = () => {
	costModalClosing.value = true // 开始关闭动画
	focusCostAmount.value = false // 重置聚焦状态
	
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showCostModal.value = false
		costModalClosing.value = false
		costAmount.value = '1' // 重置消费金额
		resetAddBtnSwipeState() // 确保按钮状态重置
	}, 300) // 动画持续300ms
}

const validateCostAmount = (e) => {
	let value = e.detail.value || e.target.value
	// 只允许正整数
	value = value.replace(/[^\d]/g, '')
	if (value && parseInt(value) < 1) {
		value = '1'
	}
	if (!value) {
		value = '1'
	}
	costAmount.value = value
}

const executeCost = async () => {
	const amount = parseInt(costAmount.value)
	if (!amount || amount < 1) {
		uni.showToast({
			title: '请输入有效金额',
			icon: 'none'
		})
		return
	}
	
	uni.showLoading({
		title: '消费中...'
	})
	
	try {
		const res = await userApi.cost(amount)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			uni.showToast({
				title: '消费成功',
				icon: 'success'
			})
			closeCostModal()
			// 刷新金钱显示
			await refreshMoney()
		} else {
			console.log("xxx", res)
			uni.showToast({
				title: res.data.message || '消费失败',
				icon: 'none'
			})
		}
	} catch (error) {
		uni.hideLoading()
		uni.showToast({
			title: res.data.message || '消费失败',
			icon: 'none'
		})
		console.error('消费失败:', error)
	}
}

// 退出登录
const handleLogout = async () => {
	uni.showModal({
		title: '确认退出',
		content: '确定要退出登录吗？',
		success: async (res) => {
			if (res.confirm) {
				uni.showLoading({
					title: '退出中...'
				})
				
				try {
					// 调用后端退出登录接口
					await userApi.logout()
				} catch (error) {
					console.error('调用退出登录接口失败:', error)
				} finally {
					// 无论接口是否成功，都清除本地数据
					userStore.logout()
					uni.hideLoading()
					
					uni.showToast({
						title: '已退出登录',
						icon: 'success'
					})
					
					// 跳转到登录页面
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1000)
				}
			}
		}
	})
}

onMounted(async () => {
	// 获取服务器时间
	await fetchCurrentTime()
	// 设置每日自动更新定时器
	setupNextDayTimer()
	// 确保用户数据已初始化
	userStore.initUserInfo()
	// 获取任务列表
	fetchTaskList()
})

onUnmounted(() => {
	// 清理定时器
	if (nextDayTimer) {
		clearTimeout(nextDayTimer)
		nextDayTimer = null
	}
})
</script>

<style lang="scss" scoped>
.home-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
}

.home-container::before {
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
	padding-top: 60rpx;
	position: fixed;
	top: -50rpx;
	left: 0;
	right: 0;
	z-index: 100;
	
	.nav-left {
		display: flex;
		align-items: center;
		gap: 20rpx;
		flex: 1;
		
		.nav-title {
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
		}
	}
	
	.nav-center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		
		.money-text {
			color: #fff;
			font-size: 32rpx;
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
.uni-scroll-view-content {
	
}
.date-header {
	padding: 20rpx 30rpx;
	position: fixed;
	display: flex;
	top: -50rpx;
	left: 0;
	right: 0;
	z-index: 90;
	display: flex;
	justify-content: center;
	align-items: center;
	
	.date-info {
		color: rgba(255, 255, 255, 0.9);
		font-size: 32rpx;
		font-weight: 500;
		text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
	}
}

.task-list {
	position: fixed;
	top: 150rpx;
	left: 0;
	right: 0;
	bottom: 180rpx;
	z-index: 10;
	padding: 0 0 40rpx 0;
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

.section-title {
	display: flex;
	align-items: center;
	gap: 10rpx;
	padding: 20rpx 30rpx 10rpx;
	cursor: pointer;
	user-select: none;
	transition: all 0.3s ease;
	
	&:active {
		opacity: 0.7;
	}
	
	.section-text {
		color: rgba(255, 255, 255, 0.7);
		font-size: 26rpx;
		font-weight: 500;
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
		cursor: pointer;
		
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
		
		// 已完成任务不可编辑样式
		&.completed-task {
			cursor: not-allowed;
			opacity: 0.7;
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
	background: #ff4757;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0 20rpx 20rpx 0;
	z-index: 1;
	
	&:active {
		background: #e84057;
	}
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
			background: #ff4757;
			color: #fff;
			
			&:active {
				background: #e84057;
			}
		}
	}
}

.more-menu {
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	animation: slideUp 0.3s ease-out;
	padding: 0;
	
	.menu-header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
		
		.menu-handle {
			position: absolute;
			top: 10rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 60rpx;
			height: 6rpx;
			background: #d0d0d0;
			border-radius: 3rpx;
		}
		
		.menu-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
			flex: 1;
			text-align: center;
			margin-top: 20rpx;
		}
		
		.menu-done {
			font-size: 28rpx;
			color: #007AFF;
			font-weight: 500;
			margin-top: 20rpx;
		}
	}
	
	.menu-items {
		padding: 20rpx 0;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		
		.menu-item {
			display: flex;
			align-items: center;
			padding: 20rpx 30rpx;
			gap: 20rpx;
			transition: background-color 0.2s ease;
			
			&:active {
				background: #f8f8f8;
			}
			
			.menu-text {
				font-size: 30rpx;
				color: #333;
				font-weight: 400;
			}
		}
	}
}

.add-task-container {
	position: fixed;
	bottom: 40rpx;
	left: 30rpx;
	right: 30rpx;
	z-index: 95;
}

.add-task-swipe-wrapper {
	position: relative;
	overflow: hidden;
	border-radius: 50rpx;
}

.add-task-btn {
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50rpx;
	padding: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255, 255, 255, 0.3);
	transition: transform 0.3s ease;
	position: relative;
	z-index: 2;
	
	.add-btn-text {
		color: #fff;
		font-size: 32rpx;
		font-weight: 500;
		text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
	}
}

.cost-action {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 120rpx;
	background: #4cd964;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0 50rpx 50rpx 0;
	z-index: 1;
	
	&:active {
		background: #3cb552;
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
	align-items: flex-end;
	z-index: 1000;
}

.modal-content {
	width: 100%;
	background: #fff;
	border-radius: 30rpx 30rpx 0 0;
	padding: 40rpx 30rpx;
	padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
	animation: slideUp 0.3s ease-out;
	
	&.closing {
		animation: slideDown 0.3s ease-in;
	}
}

@keyframes slideUp {
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0);
	}
}

@keyframes slideDown {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(100%);
	}
}

.popup-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40rpx;
	
	.popup-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}
	
	.popup-close {
		padding: 10rpx;
	}
}

.input-group {
	margin-bottom: 40rpx;
	
	.input-label {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
	}
	
	.task-input {
		width: 100%;
		padding: 25rpx 30rpx;
		border: 2rpx solid #e5e5e5;
		border-radius: 15rpx;
		font-size: 30rpx;
		background: #fafafa;
		
		&:focus {
			border-color: #667eea;
			background: #fff;
		}
	}
}

.popup-actions {
	display: flex;
	gap: 20rpx;
	margin-top: 60rpx;
	
	.cancel-btn, .confirm-btn {
		flex: 1;
		padding: 25rpx;
		border-radius: 15rpx;
		font-size: 30rpx;
		border: none;
		
		&.cancel-btn {
			background: #f5f5f5;
			color: #666;
		}
		
		&.confirm-btn {
			background: #667eea;
			color: #fff;
			
			&:disabled {
				background: #ccc;
				color: #999;
			}
		}
	}
}

.background-preview {
	position: relative;
	width: 100%;
	height: 200rpx;
	border-radius: 15rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	
	.preview-image {
		width: 100%;
		height: 100%;
	}
	
	.remove-btn {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		width: 40rpx;
		height: 40rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.choose-image-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15rpx;
	padding: 30rpx;
	border: 2rpx dashed #d0d0d0;
	border-radius: 15rpx;
	background: #fafafa;
	transition: all 0.3s ease;
	
	&:active {
		background: #f0f0f0;
		transform: scale(0.98);
	}
	
	.choose-text {
		font-size: 28rpx;
		color: #667eea;
		font-weight: 500;
	}
}
.task-input {
    position: inherit;
    max-width: 630rpx;
}

.number-input-container {
	position: relative;
	display: flex;
	align-items: center;
	
	.number-input {
		padding-right: 140rpx !important;
	}
	
	.number-controls {
		position: absolute;
		right: 2rpx;
		top: 2rpx;
		bottom: 2rpx;
		display: flex;
		flex-direction: row;
		gap: 2rpx;
		height: calc(100% - 4rpx);
		
		.control-btn {
			width: 68rpx;
			height: 100%;
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.2s ease;
			color: #fff;
			
			&.increase-btn {
				background: #4cd964;
				border-radius: 0 0 13rpx 0;
				
				&:active {
					background: #3cb552;
					transform: scale(0.95);
				}
			}
			
			&.decrease-btn {
				background: #ff4757;
				border-radius: 0 13rpx 13rpx 0;
				
				&:active {
					background: #e84057;
					transform: scale(0.95);
				}
			}
		}
	}
}

.completed-tasks-container {
	overflow: hidden;
	transition: all 0.4s ease;
	max-height: 2000rpx;
	opacity: 1;
	
	&.collapsed {
		max-height: 0;
		opacity: 0;
		margin: 0;
		padding: 0;
	}
}
</style>
