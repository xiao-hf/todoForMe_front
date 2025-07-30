<template>
    <view class="milestore-container">
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
                <view class="back-button" @click="goBack">
                    <uni-icons type="back" size="24" color="#fff"></uni-icons>
                </view>
            </view>
            <view class="nav-center">
                <text class="nav-title">里程碑</text>
            </view>
            <view class="nav-right">
            </view>
        </view>



        <!-- 里程碑列表 -->
        <scroll-view class="milestone-list" 
            scroll-y="true" 
            @scroll="handleScroll"
            refresher-enabled="true"
            refresher-background="transparent"
            :refresher-triggered="refresherTriggered"
            @refresherpulling="handleRefresherPulling"
            @refresherrefresh="handleRefresherRefresh"
            @refresherrestore="handleRefresherRestore"
            style="top: 160rpx;">
            
            <!-- 未完成的里程碑 -->
            <uni-card v-for="(milestone, index) in uncompletedMilestones" :key="milestone.id" 
                :is-shadow="false" 
                :border="false"
                margin="8rpx 20rpx"
                class="milestone-card milestone-swipe-container">
                <view class="milestone-swipe-wrapper">
                    <view class="milestone-item" 
                        :style="{ transform: `translateX(${swipeStates[milestone.id]?.translateX || 0}rpx)` }"
                        @touchstart="handleTouchStart($event, milestone.id)"
                        @touchmove="handleTouchMove($event, milestone.id)"
                        @touchend="handleTouchEnd($event, milestone.id)">
                        <view class="milestone-checkbox" @click="toggleMilestone(milestone.id)">
                            <uni-icons type="checkbox" 
                                :size="24" 
                                color="#C7C7CC">
                            </uni-icons>
                        </view>
                        <view class="milestone-content" @click="toggleExpand(milestone.id, $event)">
                            <view class="milestone-header">
                                <text class="milestone-title">{{ milestone.title }}</text>
                                </view>
                            <view class="milestone-info">
                            <view class="milestone-value" v-if="milestone.value && milestone.value >= 1">
                                <uni-icons type="wallet" size="14" color="#666"></uni-icons>
                                <text class="value-text">{{ milestone.value }}</text>
                                </view>
                                <view class="milestone-deadline" v-if="milestone.deadline">
                                    <uni-icons type="calendar" size="14" color="#666"></uni-icons>
                                    <text class="deadline-text">{{ formatDate(milestone.deadline) }}</text>
                                    <text v-if="milestone.isComplete && milestone.completeTime" class="complete-time-text">
                                        <text class="icon-space">
                                            <uni-icons type="checkmarkempty" size="14" color="#4CD964"></uni-icons>
                                        </text>
                                        {{ formatDate(milestone.completeTime) }}
                                    </text>
                                    <text v-if="!milestone.isComplete" class="remaining-days" :class="getRemainingDaysClass(milestone.deadline)">
                                        ({{ getRemainingDays(milestone.deadline) }})
                                    </text>
                                </view>
                            </view>
                            <!-- 展开的详细描述 -->
                            <view class="milestone-description" 
                                v-if="expandedItems[milestone.id]" 
                                :class="{ 'expanded': expandedItems[milestone.id] }">
                                <text class="description-text">{{ milestone.desc }}</text>
                            </view>
                        </view>
                        <view class="milestone-actions">
                            <uni-icons type="compose" 
                                :size="24" 
                                color="#667eea"
                                @click="editMilestoneItem(milestone, $event)">
                            </uni-icons>
                        </view>
                    </view>
                    <view class="delete-action" 
                        v-if="swipeStates[milestone.id]?.showDelete"
                        @click="confirmDelete(milestone.id)">
                        <uni-icons type="trash" size="24" color="#fff"></uni-icons>
                    </view>
                </view>
            </uni-card>
            
            <!-- 已完成分组标题 -->
            <view v-if="completedMilestones.length > 0" class="section-title" @click="toggleCompletedMilestones">
                <uni-icons :type="showCompletedMilestones ? 'down' : 'right'" size="16" color="rgba(255, 255, 255, 0.7)"></uni-icons>
                <text class="section-text">已完成</text>
            </view>
            
            <!-- 已完成的里程碑 -->
            <view class="completed-milestones-container" :class="{ 'collapsed': !showCompletedMilestones }">
                <uni-card v-for="(milestone, index) in completedMilestones" :key="milestone.id" 
                    :is-shadow="false" 
                    :border="false"
                    margin="8rpx 20rpx"
                    class="milestone-card milestone-swipe-container">
                    <view class="milestone-swipe-wrapper">
                        <view class="milestone-item" 
                            :style="{ transform: `translateX(${swipeStates[milestone.id]?.translateX || 0}rpx)` }"
                            @touchstart="handleTouchStart($event, milestone.id)"
                            @touchmove="handleTouchMove($event, milestone.id)"
                            @touchend="handleTouchEnd($event, milestone.id)">
                            <view class="milestone-checkbox" @click="toggleMilestone(milestone.id)">
                                <uni-icons type="checkbox" 
                                    :size="24" 
                                    color="#4CD964">
                                </uni-icons>
                            </view>
                            <view class="milestone-content completed-milestone" @click="toggleExpand(milestone.id, $event)">
                                <view class="milestone-header">
                                    <text class="milestone-title completed">{{ milestone.title }}</text>
                                    </view>
                                <view class="milestone-info">
                                    <view class="milestone-value" v-if="milestone.value && milestone.value >= 1">
                                        <uni-icons type="wallet" size="14" color="#666"></uni-icons>
                                        <text class="value-text">{{ milestone.value }}</text>
                                </view>
                                    <view class="milestone-deadline" v-if="milestone.deadline">
                                        <uni-icons type="calendar" size="14" color="#666"></uni-icons>
                                        <text class="deadline-text">{{ formatDate(milestone.deadline) }}</text>
                                        <text v-if="milestone.completeTime" class="complete-time-text">
                                            <text class="icon-space">
                                                <uni-icons type="checkmarkempty" size="14" color="#4CD964"></uni-icons>
                                            </text>
                                            {{ formatDate(milestone.completeTime) }}
                                        </text>
                                    </view>
                                </view>
                                <!-- 展开的详细描述 -->
                                <view class="milestone-description" 
                                    v-if="expandedItems[milestone.id]" 
                                    :class="{ 'expanded': expandedItems[milestone.id] }">
                                    <text class="description-text">{{ milestone.desc }}</text>
                                </view>
                            </view>
                            <view class="milestone-actions">
                                <uni-icons type="compose" 
                                    :size="24" 
                                    color="#667eea"
                                    @click="editMilestoneItem(milestone, $event)">
                                </uni-icons>
                            </view>
                        </view>
                        <view class="delete-action" 
                            v-if="swipeStates[milestone.id]?.showDelete"
                            @click="confirmDelete(milestone.id)">
                            <uni-icons type="trash" size="24" color="#fff"></uni-icons>
                        </view>
                    </view>
                </uni-card>
            </view>
            
            <!-- 已逾期分组标题 -->
            <view v-if="overdueMilestones.length > 0" class="section-title" @click="toggleOverdueMilestones">
                <uni-icons :type="showOverdueMilestones ? 'down' : 'right'" size="16" color="rgba(255, 255, 255, 0.7)"></uni-icons>
                <text class="section-text">已逾期</text>
            </view>
            
            <!-- 已逾期的里程碑 -->
            <view class="overdue-milestones-container" :class="{ 'collapsed': !showOverdueMilestones }">
                <uni-card v-for="(milestone, index) in overdueMilestones" :key="milestone.id" 
                    :is-shadow="false" 
                    :border="false"
                    margin="8rpx 20rpx"
                    class="milestone-card milestone-swipe-container">
                    <view class="milestone-swipe-wrapper">
                        <view class="milestone-item overdue-item" 
                            :style="{ transform: `translateX(${swipeStates[milestone.id]?.translateX || 0}rpx)` }"
                            @touchstart="handleTouchStart($event, milestone.id)"
                            @touchmove="handleTouchMove($event, milestone.id)"
                            @touchend="handleTouchEnd($event, milestone.id)">
                            <view class="milestone-checkbox disabled">
                                <uni-icons type="circle" 
                                    :size="24" 
                                    color="#FF3B30">
                                </uni-icons>
                            </view>
                            <view class="milestone-content overdue-milestone" @click="toggleExpand(milestone.id, $event)">
                                <view class="milestone-header">
                                    <text class="milestone-title overdue">{{ milestone.title }}</text>
                                </view>
                                <view class="milestone-info">
                                <view class="milestone-value" v-if="milestone.value && milestone.value >= 1">
                                    <uni-icons type="wallet" size="14" color="#666"></uni-icons>
                                    <text class="value-text">{{ milestone.value }}</text>
                                    </view>
                                    <view class="milestone-deadline" v-if="milestone.deadline">
                                        <uni-icons type="calendar" size="14" color="#666"></uni-icons>
                                        <text class="deadline-text">{{ formatDate(milestone.deadline) }}</text>
                                        <text class="overdue-text">
                                            <text class="icon-space">
                                                <uni-icons type="closeempty" size="14" color="#FF3B30"></uni-icons>
                                            </text>
                                        </text>
                                    </view>
                                </view>
                                <!-- 展开的详细描述 -->
                                <view class="milestone-description" 
                                    v-if="expandedItems[milestone.id]" 
                                    :class="{ 'expanded': expandedItems[milestone.id] }">
                                    <text class="description-text">{{ milestone.desc }}</text>
                                </view>
                            </view>
                            <view class="milestone-actions">
                                <uni-icons type="compose" 
                                    :size="24" 
                                    color="#667eea"
                                    @click="editMilestoneItem(milestone, $event)">
                                </uni-icons>
                            </view>
                        </view>
                        <view class="delete-action" 
                            v-if="swipeStates[milestone.id]?.showDelete"
                            @click="confirmDelete(milestone.id)">
                            <uni-icons type="trash" size="24" color="#fff"></uni-icons>
                        </view>
                    </view>
                </uni-card>
            </view>
        </scroll-view>

        <!-- 添加里程碑按钮 -->
        <view class="add-milestone-container">
            <view class="add-milestone-btn" @click="showAddMilestoneModal">
                <uni-icons type="plus" size="20" color="#fff"></uni-icons>
                <text class="add-btn-text">新建里程碑</text>
            </view>
        </view>

        <!-- 添加里程碑弹窗 -->
        <view class="modal-overlay" v-if="showModal" @click="closeAddMilestoneModal">
            <view class="modal-content" :class="{ 'closing': modalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">新建里程碑</text>
                    <view class="popup-close" @click="closeAddMilestoneModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">标题</view>
                    <input class="milestone-input" 
                        v-model="newMilestone.title" 
                        placeholder="请输入里程碑标题..."
                        maxlength="50"
                        :focus="focusTitle"
                        @blur="focusTitle = false" />
                </view>
                

                
                <view class="input-group">
                    <view class="input-label">价值</view>
                    <view class="number-input-container">
                        <input class="milestone-input number-input" 
                            v-model="newMilestone.value" 
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
                
                <view class="input-group">
                    <view class="input-label">截止日期</view>
                    <view class="date-picker-container" @click="showDatePicker">
                        <view class="date-picker-display">
                            <text class="date-text">{{ newMilestone.deadline ? formatDate(newMilestone.deadline) : '请选择截止日期' }}</text>
                            <uni-icons type="calendar" size="20" color="#999"></uni-icons>
                        </view>
                    </view>
                    <!-- 截止日期错误提示 -->
                    <view class="error-tip" :class="{ 'show': deadlineError }" v-if="deadlineError">
                        <text class="error-text">{{ deadlineError }}</text>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">详细描述</view>
                    <textarea class="milestone-textarea" 
                        v-model="newMilestone.desc" 
                        placeholder="请输入详细描述..."
                        maxlength="500"
                        :auto-height="true" />
                </view>
                
                <view class="popup-actions">
                    <button class="cancel-btn" @click="closeAddMilestoneModal">取消</button>
                    <button class="confirm-btn" @click="addMilestone" :disabled="!canSubmit">确认添加</button>
                </view>
            </view>
        </view>

        <!-- 修改里程碑弹窗 -->
        <view class="modal-overlay" v-if="showEditModal" @click="closeEditMilestoneModal">
            <view class="modal-content" :class="{ 'closing': editModalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">修改里程碑</text>
                    <view class="popup-close" @click="closeEditMilestoneModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">标题</view>
                    <input class="milestone-input" 
                        v-model="editMilestone.title" 
                        placeholder="请输入里程碑标题..."
                        maxlength="50"
                        :focus="focusEditTitle"
                        @blur="focusEditTitle = false" />
                </view>
                

                
                <view class="input-group">
                    <view class="input-label">价值</view>
                    <view class="number-input-container">
                        <input class="milestone-input number-input" 
                            v-model="editMilestone.value" 
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
                
                <view class="input-group">
                    <view class="input-label">截止日期</view>
                    <view class="date-picker-container" @click="showEditDatePicker">
                        <view class="date-picker-display">
                            <text class="date-text">{{ editMilestone.deadline ? formatDate(editMilestone.deadline) : '请选择截止日期' }}</text>
                            <uni-icons type="calendar" size="20" color="#999"></uni-icons>
                        </view>
                    </view>
                    <!-- 截止日期错误提示 -->
                    <view class="error-tip" :class="{ 'show': editDeadlineError }" v-if="editDeadlineError">
                        <text class="error-text">{{ editDeadlineError }}</text>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">详细描述</view>
                    <textarea class="milestone-textarea" 
                        v-model="editMilestone.desc" 
                        placeholder="请输入详细描述..."
                        maxlength="500"
                        :auto-height="true" />
                </view>
                
                <view class="popup-actions">
                    <button class="cancel-btn" @click="closeEditMilestoneModal">取消</button>
                    <button class="confirm-btn" @click="updateMilestone" :disabled="!canEditSubmit">确认修改</button>
                </view>
            </view>
        </view>

        <!-- 日期选择器弹窗 -->
        <view class="date-modal-overlay" v-if="showDateModal" @click="closeDateModal">
            <view class="date-modal-content" @click.stop>
                <view class="date-header">
                    <text class="date-title">选择截止日期</text>
                    <view class="date-close" @click="closeDateModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <view class="date-picker-wheel">
                    <picker-view 
                        :value="pickerValue" 
                        @change="onPickerChange" 
                        class="picker-view"
                        :indicator-style="indicatorStyle"
                        :mask-style="maskStyle">
                        <picker-view-column>
                            <view v-for="(year, index) in years" :key="index" class="picker-item">
                                <text class="picker-text">{{year}}年</text>
                            </view>
                        </picker-view-column>
                        <picker-view-column>
                            <view v-for="(month, index) in months" :key="index" class="picker-item">
                                <text class="picker-text">{{month}}月</text>
                            </view>
                        </picker-view-column>
                        <picker-view-column>
                            <view v-for="(day, index) in days" :key="index" class="picker-item">
                                <text class="picker-text">{{day}}日</text>
                            </view>
                        </picker-view-column>
                    </picker-view>
                </view>
                
                <view class="selected-info" v-if="selectedDate">
                    <text>选中的日期: {{ formatDate(selectedDate) }}</text>
                </view>
                
                <view class="date-actions">
                    <button class="date-cancel-btn" @click="closeDateModal">取消</button>
                    <button class="date-confirm-btn" @click="confirmDate" :disabled="!selectedDate">确认</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { milestoneApi } from '@/api/milestoneApi'
import { useUserStore } from '@/stores/user'
import { utilApi } from '@/api/utilApi'

// 响应式数据
const userStore = useUserStore()
const milestoneList = ref([])

const newMilestone = ref({
    title: '',
    type: 1, // 默认为短期
    value: '1',
    desc: '',
    deadline: ''
})

const showModal = ref(false)
const modalClosing = ref(false)
const focusTitle = ref(false)

// 修改里程碑弹框相关
const showEditModal = ref(false)
const editModalClosing = ref(false)
const focusEditTitle = ref(false)
const editMilestone = ref({
    id: null,
    title: '',
    type: 1,
    value: '1',
    desc: '',
    deadline: ''
})

// 日期选择器相关
const showDateModal = ref(false)
const selectedDate = ref('')
const currentDateTarget = ref('') // 'new' 或 'edit'
const deadlineError = ref('')
const editDeadlineError = ref('')

// 今天的日期（用于限制选择）
const currentDate = ref({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
})

// 格式化的今天日期
const todayDate = computed(() => {
    const year = currentDate.value.year
    const month = String(currentDate.value.month).padStart(2, '0')
    const day = String(currentDate.value.day).padStart(2, '0')
    return `${year}-${month}-${day}`
})

// picker-view相关数据
const pickerValue = ref([0, 0, 0]) // [年索引, 月索引, 日索引]

// picker-view指示器样式 
const indicatorStyle = 'height: 68rpx; border-top: 1rpx solid #e0e0e0; border-bottom: 1rpx solid #e0e0e0;'
// 添加遮罩样式
const maskStyle = 'background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));'

// 生成年份数组（从当前年份开始的10年）
const years = computed(() => {
    const yearArray = []
    for (let i = 0; i < 10; i++) {
        yearArray.push(currentDate.value.year + i)
    }
    return yearArray
})

// 生成月份数组
const months = computed(() => {
    const monthArray = []
    const selectedYear = years.value[pickerValue.value[0]]
    
    // 如果是当前年份，则月份从当前月开始
    const startMonth = selectedYear === currentDate.value.year ? currentDate.value.month : 1
    
    for (let i = startMonth; i <= 12; i++) {
        monthArray.push(i)
    }
    return monthArray
})

// 生成日期数组（根据选中的年月动态计算）
const days = computed(() => {
    const selectedYear = years.value[pickerValue.value[0]]
    const selectedMonth = months.value[pickerValue.value[1]]
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
    const dayArray = []
    
    // 如果是当前年月，则日期从当前日开始
    const startDay = (selectedYear === currentDate.value.year && 
                     selectedMonth === currentDate.value.month) ? 
                     currentDate.value.day : 1
    
    for (let i = startDay; i <= daysInMonth; i++) {
        dayArray.push(i)
    }
    return dayArray
})

const showCompletedMilestones = ref(true) // 控制已完成里程碑的显示/隐藏
const showOverdueMilestones = ref(true) // 控制已逾期里程碑的显示/隐藏
const expandedItems = ref({}) // 控制里程碑卡片的展开状态

// 滑动删除相关状态
const swipeStates = ref({})
const touchStartX = ref(0)
const touchStartY = ref(0)
const currentSwipeMilestoneId = ref(null)

// 下拉刷新相关
const isRefreshing = ref(false)
const refresherTriggered = ref(false)
const imageLoadError = ref(false)

// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
    return userStore.userInfo.backgroudImg || ''
})

// 计算属性 - 未完成的里程碑
const uncompletedMilestones = computed(() => {
    // 获取当前日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
        return milestoneList.value
        .filter(milestone => {
            // 排除已完成的
            if (milestone.isComplete) return false;
            
            // 检查是否有截止日期
            if (!milestone.deadline) return true; // 没有截止日期的算作未逾期
            
            // 检查截止日期是否已过
            let deadlineDate;
            if (typeof milestone.deadline === 'number' || !isNaN(Number(milestone.deadline))) {
                deadlineDate = new Date(Number(milestone.deadline));
            } else {
                deadlineDate = new Date(milestone.deadline);
            }
            
            // 将时间设置为当天结束
            deadlineDate.setHours(23, 59, 59, 999);
            
            // 如果截止日期在今天之后或等于今天，则未逾期
            return deadlineDate >= today;
        })
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
})

// 计算属性 - 已完成的里程碑
const completedMilestones = computed(() => {
    return milestoneList.value
        .filter(milestone => milestone.isComplete)
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
})

// 计算属性 - 已逾期的里程碑
const overdueMilestones = computed(() => {
    // 获取当前日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return milestoneList.value
        .filter(milestone => {
            // 排除已完成的
            if (milestone.isComplete) return false;
            
            // 检查是否有截止日期
            if (!milestone.deadline) return false;
            
            // 检查截止日期是否已过
            let deadlineDate;
            if (typeof milestone.deadline === 'number' || !isNaN(Number(milestone.deadline))) {
                deadlineDate = new Date(Number(milestone.deadline));
            } else {
                deadlineDate = new Date(milestone.deadline);
            }
            
            // 将时间设置为当天结束
            deadlineDate.setHours(23, 59, 59, 999);
            
            // 如果截止日期在今天之前，则已逾期
            return deadlineDate < today;
        })
        .sort((a, b) => (a.sort || 0) - (b.sort || 0));
})

// 计算属性 - 检查表单是否可以提交
const canSubmit = computed(() => {
    return newMilestone.value.title.trim() && 
           newMilestone.value.desc.trim() &&
           newMilestone.value.deadline &&
           parseInt(newMilestone.value.value) >= 1 &&
           !deadlineError.value
})

// 计算属性 - 检查编辑表单是否可以提交
const canEditSubmit = computed(() => {
    return editMilestone.value.title.trim() && 
           editMilestone.value.desc.trim() &&
           editMilestone.value.deadline &&
           parseInt(editMilestone.value.value) >= 1 &&
           !editDeadlineError.value
})

// 方法
const goBack = () => {
    uni.navigateBack()
}

const handleImageError = () => {
    imageLoadError.value = true
}

const handleImageLoad = () => {
    imageLoadError.value = false
}



// 格式化日期
const formatDate = (dateStr) => {
    if (!dateStr) return '';
    
    let date;
    // 检查是否为时间戳数字
    if (typeof dateStr === 'number' || !isNaN(Number(dateStr))) {
        date = new Date(Number(dateStr));
    } else {
        date = new Date(dateStr);
    }
    
    // 检查是否为有效日期
    if (isNaN(date.getTime())) {
        return dateStr; // 如果无法解析，返回原始字符串
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// 计算剩余天数
const getRemainingDays = (dateStr) => {
    if (!dateStr) return '';
    
    let deadline;
    // 检查是否为时间戳数字
    if (typeof dateStr === 'number' || !isNaN(Number(dateStr))) {
        deadline = new Date(Number(dateStr));
    } else {
        deadline = new Date(dateStr);
}

    // 检查是否为有效日期
    if (isNaN(deadline.getTime())) {
        return ''; 
    }
    
    // 设置截止日期为当天结束时间 (23:59:59)
    deadline.setHours(23, 59, 59, 999);
    
    // 计算当前日期（不包含时间）
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // 计算天数差
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return '已逾期' + Math.abs(diffDays) + '天';
    } else if (diffDays === 0) {
        return '今天截止';
    } else {
        return '剩余' + diffDays + '天';
    }
}

// 计算逾期天数
const getDaysOverdue = (dateStr) => {
    if (!dateStr) return 0;
    
    let deadline;
    // 检查是否为时间戳数字
    if (typeof dateStr === 'number' || !isNaN(Number(dateStr))) {
        deadline = new Date(Number(dateStr));
    } else {
        deadline = new Date(dateStr);
    }
    
    // 检查是否为有效日期
    if (isNaN(deadline.getTime())) {
        return 0; 
    }
    
    // 设置截止日期为当天结束时间 (23:59:59)
    deadline.setHours(23, 59, 59, 999);
    
    // 计算当前日期（不包含时间）
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // 计算天数差
    const diffTime = now.getTime() - deadline.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
}

// 根据剩余天数获取对应的样式类
const getRemainingDaysClass = (dateStr) => {
    if (!dateStr) return '';
    
    let deadline;
    if (typeof dateStr === 'number' || !isNaN(Number(dateStr))) {
        deadline = new Date(Number(dateStr));
    } else {
        deadline = new Date(dateStr);
    }
    
    if (isNaN(deadline.getTime())) {
        return ''; 
    }
    
    deadline.setHours(23, 59, 59, 999);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return 'overdue'; // 已逾期
    } else if (diffDays <= 7) {
        return 'urgent'; // 7天内，紧急
    } else if (diffDays <= 30) {
        return 'warning'; // 30天内，警告
    } else {
        return 'safe'; // 30天以上，安全
    }
}

// 展开/收起里程碑详情
const toggleExpand = (milestoneId, event) => {
    if (event) {
        event.stopPropagation()
    }
    expandedItems.value[milestoneId] = !expandedItems.value[milestoneId]
}

// 切换里程碑完成状态
const toggleMilestone = async (milestoneId) => {
    try {
        const res = await milestoneApi.completeMilestone(milestoneId)
        if (res.code === 200 || res.code === '200') {
            // 刷新里程碑列表
            await fetchMilestoneList()
        } else {
            uni.showToast({
                title: res.message || '操作失败',
                icon: 'none'
            })
        }
    } catch (error) {
        console.error('切换里程碑状态失败:', error)
        uni.showToast({
            title: '操作失败',
            icon: 'none'
        })
    }
}

// 切换已完成里程碑显示
const toggleCompletedMilestones = () => {
    showCompletedMilestones.value = !showCompletedMilestones.value
}

// 切换已逾期里程碑显示
const toggleOverdueMilestones = () => {
    showOverdueMilestones.value = !showOverdueMilestones.value
}

// 滑动删除相关方法
const handleTouchStart = (e, milestoneId) => {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    currentSwipeMilestoneId.value = milestoneId
}

const handleTouchMove = (e, milestoneId) => {
    if (currentSwipeMilestoneId.value !== milestoneId) return
    
    const touchX = e.touches[0].clientX
    const touchY = e.touches[0].clientY
    const deltaX = touchX - touchStartX.value
    const deltaY = touchY - touchStartY.value
    
    // 判断是否为水平滑动
    if (Math.abs(deltaY) > Math.abs(deltaX)) return
    
    // 只允许向左滑动
    if (deltaX < 0) {
        const translateX = Math.max(deltaX * 0.5, -120)
        
        if (!swipeStates.value[milestoneId]) {
            swipeStates.value[milestoneId] = {}
        }
        
        swipeStates.value[milestoneId].translateX = translateX
        swipeStates.value[milestoneId].showDelete = translateX < -30
    }
}

const handleTouchEnd = (e, milestoneId) => {
    if (currentSwipeMilestoneId.value !== milestoneId) return
    
    const state = swipeStates.value[milestoneId]
    if (!state) return
    
    if (state.translateX < -60) {
        confirmDelete(milestoneId)
    } else if (state.translateX < -30) {
        state.translateX = -120
        state.showDelete = true
    } else {
        resetSwipeState(milestoneId)
    }
    
    currentSwipeMilestoneId.value = null
}

const resetSwipeState = (milestoneId) => {
    if (swipeStates.value[milestoneId]) {
        swipeStates.value[milestoneId].translateX = 0
        swipeStates.value[milestoneId].showDelete = false
    }
}

const resetAllSwipeStates = () => {
    Object.keys(swipeStates.value).forEach(milestoneId => {
        resetSwipeState(milestoneId)
    })
}

const handleScroll = () => {
    resetAllSwipeStates()
}

// 删除相关方法
const confirmDelete = (milestoneId) => {
    resetAllSwipeStates()
    
    // 找到对应的里程碑
    const milestone = getMilestoneById(milestoneId)
    if (!milestone) {
        console.error('未找到要删除的里程碑:', milestoneId)
        return
    }
    
    // 使用uni-app自带的showModal样式，与home.vue一致
    uni.showModal({
        title: '删除确认',
        content: `确定要删除"${milestone.title}"里程碑吗？`,
        confirmColor: '#f56c6c',
        success: async (res) => {
            if (res.confirm) {
                await executeDelete(milestoneId)
            }
        }
    })
}

const executeDelete = async (milestoneId) => {
    if (!milestoneId) return
    
    uni.showLoading({
        title: '删除中...'
    })
    
    try {
        const res = await milestoneApi.deleteMilestone(milestoneId)
        uni.hideLoading()
        
        if (res.code === 200 || res.code === '200') {
            uni.showToast({
                title: '里程碑已删除',
                icon: 'success'
            })
            await fetchMilestoneList()
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
        console.error('删除里程碑失败:', error)
    }
}

const getMilestoneById = (milestoneId) => {
    return milestoneList.value.find(milestone => milestone.id === milestoneId)
}

// picker-view相关方法
// 获取当前服务器时间
const getCurrentServerTime = async () => {
    try {
        const res = await utilApi.now()
        if (res && res.code === 200 && res.data) {
            const serverDate = new Date(res.data)
            currentDate.value = {
                year: serverDate.getFullYear(),
                month: serverDate.getMonth() + 1,
                day: serverDate.getDate()
            }
        }
    } catch (error) {
        console.error('获取服务器时间失败:', error)
        // 获取失败时使用本地时间
        const localDate = new Date()
        currentDate.value = {
            year: localDate.getFullYear(),
            month: localDate.getMonth() + 1,
            day: localDate.getDate()
        }
    }
}

const initPickerValue = async (dateStr) => {
    // 先获取当前服务器时间
    await getCurrentServerTime()
    
    if (!dateStr) {
        // 默认选择当前日期
        // 找出当前年份在数组中的索引（通常是0）
        const yearIndex = 0
        
        // 当前月在可选月份中的索引
        const monthIndex = 0 // 因为months是从当前月开始的，所以是0
        
        // 当前日在可选日期中的索引
        const dayIndex = 0 // 因为days是从当前日开始的，所以是0
        
        pickerValue.value = [yearIndex, monthIndex, dayIndex]
        updateSelectedDate()
    } else {
        // 解析已有日期
        const date = new Date(dateStr)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        
        // 检查日期是否合法（不早于今天）
        const dateTime = new Date(year, month - 1, day).getTime()
        const todayTime = new Date(currentDate.value.year, currentDate.value.month - 1, currentDate.value.day).getTime()
        
        if (dateTime < todayTime) {
            // 如果日期早于今天，使用今天的日期
            const yearIndex = 0
            const monthIndex = 0
            const dayIndex = 0
            
            pickerValue.value = [yearIndex, monthIndex, dayIndex]
        } else {
            // 计算年份索引
        const yearIndex = years.value.indexOf(year)
            if (yearIndex < 0) {
                // 如果年份不在范围内，使用当前年
                pickerValue.value = [0, 0, 0]
            } else {
                // 计算月份索引
                const availableMonths = months.value
                const monthIndex = availableMonths.indexOf(month)
                
                if (monthIndex < 0) {
                    // 如果月份不可选，选择可用的第一个月
                    pickerValue.value = [yearIndex, 0, 0]
                } else {
                    // 计算日期索引
                    const availableDays = new Array(31).fill(0).map((_, i) => i + 1).filter(d => {
                        if (year === currentDate.value.year && month === currentDate.value.month) {
                            return d >= currentDate.value.day
                        }
                        return true
                    })
                    
                    const dayIndex = availableDays.indexOf(day)
                    if (dayIndex < 0) {
                        // 如果日期不可选，选择可用的第一个日
                        pickerValue.value = [yearIndex, monthIndex, 0]
                    } else {
                        pickerValue.value = [yearIndex, monthIndex, dayIndex]
                    }
                }
            }
        }
        
        updateSelectedDate()
    }
}

const onPickerChange = (e) => {
    let [yearIndex, monthIndex, dayIndex] = e.detail.value
    
    // 获取选择的年月
    const selectedYear = years.value[yearIndex]
    const selectedMonth = months.value[monthIndex]
    
    // 检查是否需要调整月份
    if (selectedYear === currentDate.value.year && monthIndex >= months.value.length) {
        // 当选择当前年，但月份超出范围时，调整为可用月份的第一个
        monthIndex = 0
    }
    
    // 检查日期是否有效
    const maxDay = new Date(selectedYear, selectedMonth, 0).getDate()
    
    // 检查是否在当前年月下选择了无效的日期
    const isCurrentYearMonth = selectedYear === currentDate.value.year && 
                              selectedMonth === currentDate.value.month
    
    // 如果是当前年月，确保日期不早于今天
    if (isCurrentYearMonth && dayIndex >= days.value.length) {
        dayIndex = 0 // 设置为可用日期的第一个
    }
    
    // 检查日期上限
    if (dayIndex >= days.value.length) {
        dayIndex = days.value.length - 1
    }
    
    pickerValue.value = [yearIndex, monthIndex, dayIndex]
    updateSelectedDate()
}

const updateSelectedDate = () => {
    const selectedYear = years.value[pickerValue.value[0]]
    const selectedMonth = months.value[pickerValue.value[1]]
    const selectedDay = days.value[pickerValue.value[2]]
    
    if (selectedYear && selectedMonth && selectedDay) {
        const monthStr = String(selectedMonth).padStart(2, '0')
        const dayStr = String(selectedDay).padStart(2, '0')
        selectedDate.value = `${selectedYear}-${monthStr}-${dayStr}`
    }
}

// 日期选择器相关方法
const showDatePicker = async () => {
    // 先设置新建弹框开始关闭动画
    modalClosing.value = true
    
    // 延迟隐藏新建弹框并显示日期选择器
    setTimeout(async () => {
    showModal.value = false
    modalClosing.value = false
    
        // 再延迟显示日期选择器，确保新建弹框完全隐藏
        setTimeout(async () => {
        currentDateTarget.value = 'new'
            // 确保截止日期是日期对象而非时间戳字符串
            const deadlineDate = newMilestone.value.deadline ? new Date(Number(newMilestone.value.deadline)) : null;
            await initPickerValue(deadlineDate)
        showDateModal.value = true
        }, 100)
    }, 300)
}

const showEditDatePicker = async () => {
    // 先设置编辑弹框开始关闭动画
    editModalClosing.value = true
    
    // 延迟隐藏编辑弹框并显示日期选择器
    setTimeout(async () => {
    showEditModal.value = false
    editModalClosing.value = false
    
        // 再延迟显示日期选择器，确保编辑弹框完全隐藏
        setTimeout(async () => {
        currentDateTarget.value = 'edit'
            // 确保截止日期是日期对象而非时间戳字符串
            const deadlineDate = editMilestone.value.deadline ? new Date(Number(editMilestone.value.deadline)) : null;
            await initPickerValue(deadlineDate)
        showDateModal.value = true
        }, 100)
    }, 300)
}

const closeDateModal = () => {
    showDateModal.value = false
    selectedDate.value = ''
    
    // 延迟重新显示对应的弹框
    setTimeout(() => {
        if (currentDateTarget.value === 'new') {
            showModal.value = true
            setTimeout(() => {
                focusTitle.value = true
            }, 300)
        } else if (currentDateTarget.value === 'edit') {
            showEditModal.value = true
            setTimeout(() => {
                focusEditTitle.value = true
            }, 300)
        }
        currentDateTarget.value = ''
    }, 300)
}



const validateDate = (dateValue, isEdit = false) => {
    if (!dateValue) {
        return '请选择截止日期'
    }
    
    const selectedDateTime = new Date(dateValue)
    
    // 使用当前服务器时间来判断
    const today = new Date(currentDate.value.year, currentDate.value.month - 1, currentDate.value.day)
    today.setHours(0, 0, 0, 0) // 设置为当天开始时间
    
    if (selectedDateTime < today) {
        return '截止日期不能小于当前时间'
    }
    
    return ''
}

const confirmDate = () => {
    if (!selectedDate.value) {
        uni.showToast({
            title: '请选择日期',
            icon: 'none'
        })
        return
    }
    
    // 验证日期
    const error = validateDate(selectedDate.value, currentDateTarget.value === 'edit')
    
    if (error) {
        uni.showToast({
            title: error,
            icon: 'none'
        })
        return
    }
    
    // 设置日期并关闭日期选择器
    if (currentDateTarget.value === 'new') {
        newMilestone.value.deadline = selectedDate.value
        deadlineError.value = ''
    } else if (currentDateTarget.value === 'edit') {
        editMilestone.value.deadline = selectedDate.value
        editDeadlineError.value = ''
    }
    
    closeDateModal()
    
    // 延迟重新显示对应的弹框
    setTimeout(() => {
        if (currentDateTarget.value === 'new') {
            showModal.value = true
            setTimeout(() => {
                focusTitle.value = true
            }, 300)
        } else if (currentDateTarget.value === 'edit') {
            showEditModal.value = true
            setTimeout(() => {
                focusEditTitle.value = true
            }, 300)
        }
    }, 300)
}

// 新建里程碑相关方法
const showAddMilestoneModal = () => {
    showModal.value = true
    setTimeout(() => {
        focusTitle.value = true
    }, 300)
}

const closeAddMilestoneModal = () => {
    modalClosing.value = true
    focusTitle.value = false
    
    setTimeout(() => {
        showModal.value = false
        modalClosing.value = false
        newMilestone.value = {
            title: '',
            type: 1, // 默认为短期
            value: '1',
            desc: '',
            deadline: ''
        }
        deadlineError.value = ''
    }, 300)
}



const validateNumber = (e) => {
    let value = e.detail.value || e.target.value
    value = value.replace(/[^\d]/g, '')
    if (value && parseInt(value) < 1) {
        value = '1'
    }
    if (!value) {
        value = '1'
    }
    newMilestone.value.value = value
}

const increaseValue = () => {
    const currentValue = parseInt(newMilestone.value.value) || 1
    newMilestone.value.value = (currentValue + 1).toString()
}

const decreaseValue = () => {
    const currentValue = parseInt(newMilestone.value.value) || 1
    if (currentValue > 1) {
        newMilestone.value.value = (currentValue - 1).toString()
    }
}

const addMilestone = async () => {
    if (!canSubmit.value) return
    
    // 验证截止日期
    const dateError = validateDate(newMilestone.value.deadline)
    if (dateError) {
        deadlineError.value = dateError
        uni.showToast({
            title: dateError,
            icon: 'none'
        })
        return
    }
    
    uni.showLoading({
        title: '添加中...'
    })
    
    try {
        const reqData = {
            title: newMilestone.value.title.trim(),
            type: newMilestone.value.type,
            value: parseInt(newMilestone.value.value) || 1,
            desc: newMilestone.value.desc.trim(),
            deadline: newMilestone.value.deadline
        }
        
        const res = await milestoneApi.addMilestone(reqData)
        uni.hideLoading()
        
        if (res.code === 200 || res.code === '200') {
            closeAddMilestoneModal()
            uni.showToast({
                title: '里程碑添加成功',
                icon: 'success'
            })
            fetchMilestoneList()
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
        console.error('添加里程碑失败:', error)
    }
}

// 修改里程碑相关方法
const editMilestoneItem = (milestone, event) => {
    if (event) {
        event.stopPropagation()
    }
    
    // 已完成的里程碑不支持修改
    if (milestone.isComplete) {
        return
    }
    
    editMilestone.value = {
        id: milestone.id,
        title: milestone.title,
        type: milestone.type,
        value: milestone.value ? milestone.value.toString() : '1',
        desc: milestone.desc,
        deadline: milestone.deadline || ''
    }
    // 控制台输出一下日期格式，方便调试
    console.log('编辑里程碑日期:', milestone.deadline, formatDate(milestone.deadline))
    editDeadlineError.value = ''
    showEditModal.value = true
    setTimeout(() => {
        focusEditTitle.value = true
    }, 300)
}

const closeEditMilestoneModal = () => {
    editModalClosing.value = true
    focusEditTitle.value = false
    
    setTimeout(() => {
        showEditModal.value = false
        editModalClosing.value = false
        editMilestone.value = {
            id: null,
            title: '',
            type: 1,
            value: '1',
            desc: '',
            deadline: ''
        }
        editDeadlineError.value = ''
    }, 300)
}



const validateEditNumber = (e) => {
    let value = e.detail.value || e.target.value
    value = value.replace(/[^\d]/g, '')
    if (value && parseInt(value) < 1) {
        value = '1'
    }
    if (!value) {
        value = '1'
    }
    editMilestone.value.value = value
}

const increaseEditValue = () => {
    const currentValue = parseInt(editMilestone.value.value) || 1
    editMilestone.value.value = (currentValue + 1).toString()
}

const decreaseEditValue = () => {
    const currentValue = parseInt(editMilestone.value.value) || 1
    if (currentValue > 1) {
        editMilestone.value.value = (currentValue - 1).toString()
    }
}

const updateMilestone = async () => {
    if (!canEditSubmit.value) return
    
    // 验证截止日期
    const dateError = validateDate(editMilestone.value.deadline, true)
    if (dateError) {
        editDeadlineError.value = dateError
        uni.showToast({
            title: dateError,
            icon: 'none'
        })
        return
    }
    
    uni.showLoading({
        title: '修改中...'
    })
    
    try {
        const reqData = {
            id: editMilestone.value.id,
            title: editMilestone.value.title.trim(),
            type: editMilestone.value.type,
            value: parseInt(editMilestone.value.value) || 1,
            desc: editMilestone.value.desc.trim(),
            deadline: editMilestone.value.deadline
        }
        
        const res = await milestoneApi.updateMilestone(reqData)
        uni.hideLoading()
        
        if (res.code === 200 || res.code === '200') {
            closeEditMilestoneModal()
            uni.showToast({
                title: '里程碑修改成功',
                icon: 'success'
            })
            fetchMilestoneList()
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
        console.error('修改里程碑失败:', error)
    }
}

// 下拉刷新相关方法
const handleRefresherPulling = (e) => {
    // 下拉过程中的处理
}

const handleRefresherRefresh = async () => {
    refresherTriggered.value = true
    isRefreshing.value = true
    
    try {
        await fetchMilestoneList()
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
            isRefreshing.value = false
        }, 800)
    }
}

const handleRefresherRestore = () => {
    refresherTriggered.value = false
    isRefreshing.value = false
}

// 获取里程碑列表
const fetchMilestoneList = async () => {
    try {
        // 不传分页参数，直接查询所有
        const res = await milestoneApi.queryList()
        if (res && res.code === '200' && res.data) {
            milestoneList.value = res.data
        }
    } catch (error) {
        console.error('获取里程碑列表失败:', error)
        uni.showToast({
            title: '获取里程碑列表失败',
            icon: 'none'
        })
    }
}

onMounted(() => {
    fetchMilestoneList()
})

onShow(() => {
    fetchMilestoneList()
})
</script>

<style lang="scss" scoped>
.milestore-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
}

.milestore-container::before {
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
        
        .back-button {
            width: 60rpx;
            height: 60rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s;
            
            &:active {
                transform: scale(0.85);
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
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

.type-filter {
    display: flex;
    padding: 20rpx 30rpx;
    position: fixed;
    top: 120rpx;
    left: 0;
    right: 0;
    z-index: 90;
    gap: 20rpx;
    
    .filter-item {
        flex: 1;
        padding: 16rpx 20rpx;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 25rpx;
        text-align: center;
        backdrop-filter: blur(10rpx);
        border: 1rpx solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
        
        &.active {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        .filter-text {
            color: #fff;
            font-size: 26rpx;
            font-weight: 500;
            text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
        }
    }
}

.milestone-list {
    position: fixed;
    top: 220rpx;
    left: 0;
    right: 0;
    bottom: 180rpx;
    z-index: 10;
    padding: 0 0 40rpx 0;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
    }
    
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

.milestone-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20rpx;
    backdrop-filter: blur(10rpx);
}

.milestone-swipe-container {
    position: relative;
    overflow: hidden;
}

.milestone-swipe-wrapper {
    position: relative;
    width: 100%;
}

.uni-card__content {
    background-color: #f7f6f8;
}

.milestone-item {
    display: flex;
    align-items: flex-start;
    padding: 15rpx;
    gap: 12rpx;
    background: #f7f6f8;
    border-radius: 20rpx;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
    
    .milestone-checkbox {
        flex-shrink: 0;
        width: 44rpx;
        height: 44rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 5rpx;
    }
    
    .milestone-content {
        flex: 1;
        cursor: pointer;
        
        .milestone-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8rpx;
            
            .milestone-title {
                font-size: 32rpx;
                color: #333;
                font-weight: 500;
                flex: 1;
                
                &.completed {
                    text-decoration: line-through;
                    color: #999;
                }
                
                &.overdue {
                    color: #FF3B30;
                    font-weight: 500;
                }
            }
        }
        
        .milestone-info {
            display: flex;
            align-items: center;
            gap: 20rpx;
            margin-bottom: 8rpx;
            flex-wrap: wrap;
            
            .milestone-value, .milestone-deadline, .milestone-complete-time {
                display: flex;
                align-items: center;
                gap: 6rpx;
            }
            
            .value-text, .deadline-text, .complete-time-text {
                font-size: 24rpx;
                color: #666;
            }
            
            .complete-time-text {
                color: #4CD964;
                font-weight: 600;
                display: flex;
                align-items: center;
                margin-left: 6rpx;
                
                .icon-space {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 4rpx;
                }
            }
            
            .remaining-days {
                font-size: 22rpx;
                margin-left: 6rpx;
                
                &.urgent {
                    color: #FF3B30;
                    font-weight: 600;
                }
                
                &.warning {
                    color: #FFCC00;
                    font-weight: 500;
                }
                
                &.safe {
                    color: #4CD964;
                }
                
                &.overdue {
                    color: #FF3B30;
                    font-weight: 700;
                }
            }
            
            .overdue-text {
                font-size: 22rpx;
                color: #FF3B30;
                font-weight: 600;
                display: flex;
                align-items: center;
                margin-left: 6rpx;
                
                .icon-space {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 4rpx;
                }
            }
        }
        
        .milestone-description {
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
            opacity: 0;
            
            &.expanded {
                max-height: 500rpx;
                opacity: 1;
                margin-top: 15rpx;
                padding-top: 15rpx;
                border-top: 1rpx solid #e0e0e0;
            }
            
            .description-text {
                font-size: 28rpx;
                color: #666;
                line-height: 1.5;
            }
        }
        
        &.completed-milestone {
            cursor: not-allowed;
            opacity: 0.7;
        }
    }
    
    .milestone-actions {
        flex-shrink: 0;
        width: 44rpx;
        height: 44rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5rpx;
        
        /* 添加悬停效果 */
        &:active {
            transform: scale(0.95);
            opacity: 0.8;
        }
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

.completed-milestones-container {
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

.overdue-milestones-container {
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

.add-milestone-container {
    position: fixed;
    bottom: 40rpx;
    left: 30rpx;
    right: 30rpx;
    z-index: 95;
}

.add-milestone-btn {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15rpx;
    backdrop-filter: blur(10rpx);
    border: 1rpx solid rgba(255, 255, 255, 0.3);
    
    .add-btn-text {
        color: #fff;
        font-size: 32rpx;
        font-weight: 500;
        text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
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
    
    &.delete-overlay {
        align-items: center !important;
        justify-content: center !important;
    }
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
    
    .milestone-input {
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
    
    .milestone-textarea {
        width: 100%;
        min-height: 120rpx;
        padding: 25rpx 30rpx;
        border: 2rpx solid #e5e5e5;
        border-radius: 15rpx;
        font-size: 30rpx;
        background: #fafafa;
        resize: none;
        
        &:focus {
            border-color: #667eea;
            background: #fff;
        }
    }
    
    .picker-value {
        padding: 25rpx 30rpx;
        border: 2rpx solid #e5e5e5;
        border-radius: 15rpx;
        font-size: 30rpx;
        background: #fafafa;
        color: #333;
    }
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

.date-picker-container {
    cursor: pointer;
    
    .date-picker-display {
        padding: 25rpx 30rpx;
        border: 2rpx solid #e5e5e5;
        border-radius: 15rpx;
        font-size: 30rpx;
        background: #fafafa;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        
        &:active {
            background: #f0f0f0;
            transform: scale(0.98);
        }
        
        .date-text {
            flex: 1;
            color: #333;
            
            &:empty::before {
                content: attr(placeholder);
                color: #bbb;
            }
        }
    }
}

.error-tip {
    position: absolute;
    top: calc(100% + 8rpx);
    left: 0;
    right: 0;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    transform: translateY(-10rpx);
    
    &.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .error-text {
        color: #ff4757;
        font-size: 24rpx;
        line-height: 1.4;
    }
}

// 日期选择器弹框样式
.date-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100; // 高于新建/编辑弹框的z-index: 1000
    
    /* 适应不同设备高度 */
    @media (min-height: 800px) {
        padding: 0 20rpx;
    }
}

.date-modal-content {
    width: 90%;
    max-width: 650rpx; /* 增加最大宽度 */
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 30rpx;
    animation: scaleIn 0.3s ease-out;
    transform-origin: center center;
    /* 添加最大高度限制，防止在大屏幕上过高 */
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    /* 适应不同设备高度 */
    @media (min-height: 800px) {
        max-height: 70vh;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.date-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    
    .date-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
    }
    
    .date-close {
        padding: 10rpx;
    }
}

.date-picker-wheel {
    margin-bottom: 40rpx;
    border-radius: 15rpx;
    overflow: hidden;
    /* 确保在大屏幕上有合适的高度 */
    flex: 0 0 auto;
    
    .picker-view {
        height: 340rpx;
        width: 100%;
        background: #fff;
        
        /* 修复iOS大屏幕上的显示问题 */
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 68rpx;
            z-index: 1;
            pointer-events: none;
            background-image: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
        }
        
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 68rpx;
            z-index: 1;
            pointer-events: none;
            background-image: linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
        }
        
        .picker-item {
            height: 68rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
            
        .picker-text, .day-text {
            font-size: 32rpx;
            color: #333;
            font-weight: 500;
            text-align: center;
            width: 100%;
            line-height: 68rpx; /* 与picker-item的高度一致，确保垂直居中 */
            height: 68rpx;
            display: block;
            /* 添加文本溢出处理 */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 10rpx;
        }
    }
}

.selected-info {
    padding: 20rpx;
    background: #f0f8ff;
    border-radius: 10rpx;
    border-left: 6rpx solid #007aff;
    margin-bottom: 40rpx;
    /* 确保文本不会溢出 */
    overflow: hidden;
    
    text {
        color: #333;
        font-size: 28rpx;
        /* 添加文本溢出处理 */
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.date-actions {
    display: flex;
    gap: 20rpx;
    /* 确保按钮区域不会被挤压 */
    flex: 0 0 auto;
    margin-top: auto;
    padding-top: 20rpx;
    
    .date-cancel-btn, .date-confirm-btn {
        flex: 1;
        padding: 25rpx;
        border-radius: 15rpx;
        font-size: 30rpx;
        border: none;
        
        &.date-cancel-btn {
            background: #f5f5f5;
            color: #666;
        }
        
        &.date-confirm-btn {
            background: #667eea;
            color: #fff;
            
            &:disabled {
                background: #ccc;
                color: #999;
            }
        }
    }
}
</style>
