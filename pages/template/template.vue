<template>
	<view class="template-container">
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
				<text class="nav-title">任务模板</text>
			</view>
			<view class="nav-right">
				<uni-icons type="more-filled" size="24" color="#fff" @click="openMore"></uni-icons>
			</view>
		</view>

		<!-- 模板任务列表 -->
		<scroll-view class="task-list" scroll-y="true" @scroll="handleScroll">
			<uni-card v-for="(template, index) in templateList" :key="template.id" 
				:is-shadow="false" 
				:border="false"
				margin="8rpx 20rpx"
				class="task-card task-swipe-container">
				<view class="task-swipe-wrapper">
					<view class="task-item" 
						:style="{ transform: `translateX(${swipeStates[template.id]?.translateX || 0}rpx)` }"
						@touchstart="handleTouchStart($event, template.id)"
						@touchmove="handleTouchMove($event, template.id)"
						@touchend="handleTouchEnd($event, template.id)">
						<view class="template-icon">
							<uni-icons type="list" size="24" color="#667eea"></uni-icons>
						</view>
						<view class="task-content" @click="editTemplateItem(template, $event)">
							<text class="task-description">{{ template.taskDescription }}</text>
							<view class="task-value" v-if="template.value && template.value >= 1">
								<uni-icons type="wallet" size="14" color="#666"></uni-icons>
								<text class="value-text">{{ template.value }}</text>
							</view>
						</view>
						<view class="task-actions">
							<uni-icons type="star" size="24" color="#C7C7CC"></uni-icons>
						</view>
					</view>
					<view class="delete-action" 
						v-if="swipeStates[template.id]?.showDelete"
						@click="confirmDelete(template.id)">
						<uni-icons type="trash" size="24" color="#fff"></uni-icons>
					</view>
				</view>
			</uni-card>
		</scroll-view>

		<!-- 添加模板按钮 -->
		<view class="add-task-btn" @click="showAddTemplateModal">
			<uni-icons type="plus" size="20" color="#fff"></uni-icons>
			<text class="add-btn-text">添加模板</text>
		</view>

		<!-- 添加模板弹窗 -->
		<view class="modal-overlay" v-if="showModal" @click="closeAddTemplateModal">
			<view class="modal-content" :class="{ 'closing': modalClosing }" @click.stop>
				<view class="popup-header">
					<text class="popup-title">新建模板</text>
					<view class="popup-close" @click="closeAddTemplateModal">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				
				<view class="input-group">
					<view class="input-label">任务描述</view>
					<input class="task-input" 
						v-model="newTemplate.description" 
						placeholder="请输入任务描述..."
						maxlength="100"
						:focus="focusDescription"
						@blur="focusDescription = false" />
				</view>
				
				<view class="input-group">
					<view class="input-label">任务价值</view>
					<view class="number-input-container">
						<input class="task-input number-input" 
							v-model="newTemplate.value" 
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
					<button class="cancel-btn" @click="closeAddTemplateModal">取消</button>
					<button class="confirm-btn" @click="addTemplate" :disabled="!newTemplate.description.trim()">确认添加</button>
				</view>
			</view>
		</view>

		<!-- 修改模板弹窗 -->
		<view class="modal-overlay" v-if="showEditModal" @click="closeEditTemplateModal">
			<view class="modal-content" :class="{ 'closing': editModalClosing }" @click.stop>
				<view class="popup-header">
					<text class="popup-title">修改模板</text>
					<view class="popup-close" @click="closeEditTemplateModal">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				
				<view class="input-group">
					<view class="input-label">任务描述</view>
					<input class="task-input" 
						v-model="editTemplate.description" 
						placeholder="请输入任务描述..."
						maxlength="100"
						:focus="focusEditDescription"
						@blur="focusEditDescription = false" />
				</view>
				
				<view class="input-group">
					<view class="input-label">任务价值</view>
					<view class="number-input-container">
						<input class="task-input number-input" 
							v-model="editTemplate.value" 
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
					<button class="cancel-btn" @click="closeEditTemplateModal">取消</button>
					<button class="confirm-btn" @click="updateTemplate" :disabled="!editTemplate.description.trim()">确认修改</button>
				</view>
			</view>
		</view>

		<!-- 删除确认弹窗 -->
		<view class="modal-overlay delete-overlay" v-if="showDeleteConfirm" @click="cancelDelete">
			<view class="modal-content delete-modal" @click.stop>
				<view class="popup-header">
					<text class="popup-title">删除模板</text>
				</view>
				
				<view class="delete-message">
					<text>将永久删除"{{ getTemplateById(deleteTemplateId)?.taskDescription }}"。</text>
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
					<text class="menu-title">模板选项</text>
					<text class="menu-done" @click="closeMoreMenu">完成</text>
				</view>
				
				<view class="menu-items">
					<view class="menu-item" @click="sortTemplates">
						<uni-icons type="reload" size="20" color="#333"></uni-icons>
						<text class="menu-text">排序</text>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { templateTaskApi } from '@/api/templateTaskApi'
import { useUserStore } from '@/stores/user'

// 响应式数据
const userStore = useUserStore()
const templateList = ref([])
const imageLoadError = ref(false) // 图片加载失败状态

const newTemplate = ref({
	description: '',
	value: '1'
})

const editTemplate = ref({
	id: null,
	description: '',
	value: '1'
})

const showModal = ref(false)
const modalClosing = ref(false) // 控制弹窗关闭动画
const focusDescription = ref(false) // 控制任务描述输入框聚焦

// 修改模板弹框相关
const showEditModal = ref(false)
const editModalClosing = ref(false) // 控制修改弹窗关闭动画
const focusEditDescription = ref(false) // 控制修改任务描述输入框聚焦

// 滑动删除相关状态
const swipeStates = ref({}) // 记录每个模板的滑动状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const currentSwipeTemplateId = ref(null)
const showDeleteConfirm = ref(false)
const deleteTemplateId = ref(null)

// 更多菜单相关状态
const showMoreMenu = ref(false)
const moreMenuClosing = ref(false) // 控制更多菜单弹窗关闭动画

// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
	return userStore.userInfo.backgroudImg || ''
})

// 计算属性 - 是否显示背景图片
const showBackgroundImage = computed(() => {
	return currentBackgroundImage.value && !imageLoadError.value
})

// 方法
const goBack = () => {
	uni.navigateTo({
		url: '/pages/home/home'
	})
}

const openMore = () => {
	showMoreMenu.value = true
}

// 滑动删除相关方法
const handleTouchStart = (e, templateId) => {
	touchStartX.value = e.touches[0].clientX
	touchStartY.value = e.touches[0].clientY
	currentSwipeTemplateId.value = templateId
}

const handleTouchMove = (e, templateId) => {
	if (currentSwipeTemplateId.value !== templateId) return
	
	const touchX = e.touches[0].clientX
	const touchY = e.touches[0].clientY
	const deltaX = touchX - touchStartX.value
	const deltaY = touchY - touchStartY.value
	
	// 判断是否为水平滑动（防止与垂直滚动冲突）
	if (Math.abs(deltaY) > Math.abs(deltaX)) return
	
	// 只允许向左滑动
	if (deltaX < 0) {
		const translateX = Math.max(deltaX * 0.5, -120) // 最大滑动120rpx
		
		if (!swipeStates.value[templateId]) {
			swipeStates.value[templateId] = {}
		}
		
		swipeStates.value[templateId].translateX = translateX
		swipeStates.value[templateId].showDelete = translateX < -30
	}
}

const handleTouchEnd = (e, templateId) => {
	if (currentSwipeTemplateId.value !== templateId) return
	
	const state = swipeStates.value[templateId]
	if (!state) return
	
	// 如果滑动超过一半宽度，直接确认删除
	if (state.translateX < -60) {
		confirmDelete(templateId)
	} else if (state.translateX < -30) {
		// 显示删除按钮
		state.translateX = -120
		state.showDelete = true
	} else {
		// 回弹到原位
		resetSwipeState(templateId)
	}
	
	currentSwipeTemplateId.value = null
}

const resetSwipeState = (templateId) => {
	if (swipeStates.value[templateId]) {
		swipeStates.value[templateId].translateX = 0
		swipeStates.value[templateId].showDelete = false
	}
}

const resetAllSwipeStates = () => {
	Object.keys(swipeStates.value).forEach(templateId => {
		resetSwipeState(templateId)
	})
}

const handleScroll = () => {
	resetAllSwipeStates()
}

const confirmDelete = (templateId) => {
	resetAllSwipeStates()
	deleteTemplateId.value = templateId
	showDeleteConfirm.value = true
}

const cancelDelete = () => {
	showDeleteConfirm.value = false
	deleteTemplateId.value = null
}

const executeDelete = async () => {
	if (!deleteTemplateId.value) return
	
	uni.showLoading({
		title: '删除中...'
	})
	
	try {
		const res = await templateTaskApi.deleteTemplateTask(deleteTemplateId.value)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			uni.showToast({
				title: '模板已删除',
				icon: 'success'
			})
			// 重新获取模板列表
			await fetchTemplateList()
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
		console.error('删除模板失败:', error)
	} finally {
		cancelDelete()
	}
}

const getTemplateById = (templateId) => {
	return templateList.value.find(template => template.id === templateId)
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

const sortTemplates = () => {
	closeMoreMenu()
	// 延迟显示toast，等待弹窗关闭动画完成
	setTimeout(() => {
		uni.showToast({
			title: '排序功能待实现',
			icon: 'none'
		})
	}, 300)
}

const showAddTemplateModal = () => {
	showModal.value = true
	// 延迟聚焦，等待弹窗动画完成
	setTimeout(() => {
		focusDescription.value = true
	}, 300)
}

const closeAddTemplateModal = () => {
	modalClosing.value = true // 开始关闭动画
	focusDescription.value = false // 重置聚焦状态
	
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showModal.value = false
		modalClosing.value = false
		// 清空输入框
		newTemplate.value = {
			description: '',
			value: '1'
		}
	}, 300) // 动画持续300ms
}

const addTemplate = async () => {
	if (!newTemplate.value.description.trim()) {
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
			desc: newTemplate.value.description.trim(),
			value: parseInt(newTemplate.value.value) || 1
		}
		
		const res = await templateTaskApi.addTemplateTask(reqData)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			closeAddTemplateModal()
			uni.showToast({
				title: '模板添加成功',
				icon: 'success'
			})
			// 重新获取模板列表
			fetchTemplateList()
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
		console.error('添加模板失败:', error)
	}
}

// 修改模板相关方法
const editTemplateItem = (template, event) => {
	// 阻止事件冒泡，避免触发滑动等其他事件
	if (event) {
		event.stopPropagation()
	}
	
	// 填充编辑表单数据
	editTemplate.value = {
		id: template.id,
		description: template.taskDescription,
		value: template.value ? template.value.toString() : '1'
	}
	showEditModal.value = true
	// 延迟聚焦，等待弹窗动画完成
	setTimeout(() => {
		focusEditDescription.value = true
	}, 300)
}

const closeEditTemplateModal = () => {
	editModalClosing.value = true // 开始关闭动画
	focusEditDescription.value = false // 重置聚焦状态
	
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showEditModal.value = false
		editModalClosing.value = false
		// 清空编辑表单
		editTemplate.value = {
			id: null,
			description: '',
			value: '1'
		}
	}, 300) // 动画持续300ms
}

const updateTemplate = async () => {
	if (!editTemplate.value.description.trim()) {
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
			id: editTemplate.value.id,
			desc: editTemplate.value.description.trim(),
			value: parseInt(editTemplate.value.value) || 1
		}
		
		const res = await templateTaskApi.updateTemplateTask(reqData)
		uni.hideLoading()
		
		if (res.code === 200 || res.code === '200') {
			closeEditTemplateModal()
			uni.showToast({
				title: '模板修改成功',
				icon: 'success'
			})
			// 重新获取模板列表
			fetchTemplateList()
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
		console.error('修改模板失败:', error)
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
	newTemplate.value.value = value
}

const increaseValue = () => {
	const currentValue = parseInt(newTemplate.value.value) || 1
	newTemplate.value.value = (currentValue + 1).toString()
}

const decreaseValue = () => {
	const currentValue = parseInt(newTemplate.value.value) || 1
	if (currentValue > 1) {
		newTemplate.value.value = (currentValue - 1).toString()
	}
}

// 修改模板数字输入验证和控制
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
	editTemplate.value.value = value
}

const increaseEditValue = () => {
	const currentValue = parseInt(editTemplate.value.value) || 1
	editTemplate.value.value = (currentValue + 1).toString()
}

const decreaseEditValue = () => {
	const currentValue = parseInt(editTemplate.value.value) || 1
	if (currentValue > 1) {
		editTemplate.value.value = (currentValue - 1).toString()
	}
}

// 获取模板列表
const fetchTemplateList = async () => {
	try {
		const res = await templateTaskApi.queryList()
		if (res && res.code === '200' && res.data) {
			templateList.value = res.data
		}
	} catch (error) {
		console.error('获取模板列表失败:', error)
		uni.showToast({
			title: '获取模板列表失败',
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

onMounted(() => {
	// 确保用户数据已初始化
	userStore.initUserInfo()
	// 获取模板列表
	fetchTemplateList()
})
</script>

<style lang="scss" scoped>
.template-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
}

.template-container::before {
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
	}
	
	.nav-center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		
		.nav-title {
			color: #fff;
			font-size: 32rpx;
			font-weight: 600;
			text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
	bottom: 130rpx;
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
	
	.template-icon {
		flex-shrink: 0;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.task-content {
		flex: 1;
		cursor: pointer;
		
		.task-description {
			display: block;
			font-size: 32rpx;
			color: #333;
			margin-bottom: 4rpx;
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

.add-task-btn {
	position: fixed;
	bottom: 40rpx;
	left: 30rpx;
	right: 30rpx;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50rpx;
	padding: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15rpx;
	backdrop-filter: blur(10rpx);
	border: 1px solid rgba(255, 255, 255, 0.3);
	z-index: 95;
	
	.add-btn-text {
		color: #fff;
		font-size: 32rpx;
		font-weight: 500;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
</style>
