<template>
    <view class="trade-container">
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
                <view class="icon-wrapper" @click="goBack">
                    <uni-icons type="back" size="24" color="#fff"></uni-icons>
                </view>
            </view>
            <view class="nav-center">
                <text class="profit-text">
                    总盈亏: 
                    <text class="profit-number" :class="{ 'profit-positive': totalProfit > 0, 'profit-negative': totalProfit < 0 }">
                        {{ formattedProfit }}
                    </text>
                </text>
            </view>
            <view class="nav-right">
                <!-- 去掉刷新图标 -->
            </view>
        </view>
        
        <!-- 搜索区域 -->
        <view class="search-area">
            <view class="search-box">
                <!-- 排序按钮 -->
                <view class="sort-btn-container">
                    <view class="sort-btn" @click="toggleSortMenu">
                        <uni-icons type="list" size="18" color="#667eea"></uni-icons>
                        <text class="sort-text">{{ currentSortText }}</text>
                        <uni-icons :type="showSortMenu ? 'up' : 'down'" size="14" color="#667eea"></uni-icons>
                    </view>
                    <!-- 下拉菜单 -->
                    <view class="sort-dropdown" v-if="showSortMenu">
                        <view class="sort-option" 
                            v-for="(option, index) in sortOptions" 
                            :key="index"
                            :class="{ 'active': currentSortType === option.value }"
                            @click="selectSortType(option)">
                            <text class="option-text">{{ option.label }}</text>
                            <view class="option-check" v-if="currentSortType === option.value">
                                <uni-icons type="checkmarkempty" size="16" color="#667eea"></uni-icons>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="search-input-wrapper">
                    <input class="search-input" 
                        type="text" 
                        v-model="searchParams.name" 
                        placeholder="品种名称" 
                        confirm-type="search"
                        @confirm="handleSearch"
                        @input="onSearchInput" />
                </view>
                <view class="search-input-wrapper">
                    <input class="search-input" 
                        type="text" 
                        v-model="searchParams.code" 
                        placeholder="品种代码" 
                        confirm-type="search"
                        @confirm="handleSearch"
                        @input="onSearchInput" />
                </view>
                <view class="search-btn" @click="handleSearch">
                    <uni-icons type="search" size="18" color="#667eea"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 主要内容 -->
        <view class="trade-content" @click="handleListClick">
            <!-- 商品列表 -->
            <scroll-view class="market-list" 
                scroll-y="true" 
                refresher-enabled="true"
                refresher-background="transparent"
                :refresher-triggered="refresherTriggered"
                @refresherrefresh="handleRefresherRefresh">
                
                <view v-if="goodsList.length > 0" class="goods-list">                    
                    <!-- 商品项 -->
                    <view class="goods-swipe-container" 
                        v-for="(goods, index) in goodsList" 
                        :key="goods.id">
                        <view class="goods-swipe-wrapper">
                            <view class="goods-item"
                                :style="{ transform: `translateX(${swipeStates[goods.id]?.translateX || 0}rpx)` }"
                                @touchstart="handleTouchStart($event, goods.id)"
                                @touchmove="handleTouchMove($event, goods.id)"
                                @touchend="handleTouchEnd($event, goods.id)"
                                @click="showGoodsDetail(goods)">
                                <view class="goods-row">
                                <view class="goods-name-col">
                                    <text class="goods-name">{{ goods.name || '未命名' }}</text>
                                    <text class="goods-code">{{ goods.code || '-' }}</text>
                                </view>
                                    <view class="goods-stats-col1">
                                    <view class="stats-item">
                                        <text class="stats-label">盈亏:</text>
                                        <text class="stats-value" :class="getBalanceClass(goods)">{{ getBalance(goods) }}</text>
                                    </view>
                                    <view class="stats-item">
                                        <text class="stats-label">胜率:</text>
                                        <text class="stats-value">{{ getWinRate(goods) }}</text>
                                    </view>
                                    </view>
                                    <view class="goods-stats-col2">
                                    <view class="stats-item">
                                        <text class="stats-label">盈亏比:</text>
                                        <text class="stats-value">{{ getProfitRatio(goods) }}</text>
                                    </view>
                                    <view class="stats-item">
                                        <text class="stats-label">利润:</text>
                                        <text class="stats-value">{{ formatSingleProfit(goods.singleProfit) }}/点/手</text>
                                    </view>
                                </view>
                                <view class="edit-icon" @click.stop="editGoods(goods)">
                                    <uni-icons type="compose" size="22" color="#667eea"></uni-icons>
                                    </view>
                                </view>
                            </view>
                            <view class="delete-action" 
                                v-if="swipeStates[goods.id]?.showDelete"
                                @click="confirmDeleteGoods(goods)">
                                <uni-icons type="trash" size="24" color="#fff"></uni-icons>
                            </view>
                        </view>
                    </view>
                </view>
                
                <!-- 空状态 -->
                <view v-else class="empty-state">
                    <text class="empty-text">暂无交易品种</text>
                    <text class="empty-tips">点击下方"+"添加交易品种</text>
                </view>
            </scroll-view>
        </view>
        
        <!-- 添加/编辑商品弹窗 -->
        <view class="modal-overlay" v-if="showModal" @click="closeModal">
            <view class="modal-content" :class="{ 'closing': modalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">{{ isEdit ? '编辑品种' : '添加品种' }}</text>
                    <view class="popup-close" @click="closeModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">
                        <text class="required">*</text>品种名称
                    </view>
                    <input class="goods-input" 
                        v-model="goodsForm.name" 
                        placeholder="请输入品种名称"
                        maxlength="50" />
                </view>
                
                <view class="input-group">
                    <view class="input-label">
                        <text class="required">*</text>品种代码
                    </view>
                    <input class="goods-input" 
                        v-model="goodsForm.code" 
                        placeholder="请输入品种代码"
                        maxlength="20" />
                </view>
                
                <view class="input-group">
                    <view class="input-label">
                        <text class="required">*</text>1手1点利润
                    </view>
                    <input class="goods-input" 
                        type="digit"
                        v-model="goodsForm.singleProfit" 
                        placeholder="请输入1手1点利润"
                        maxlength="20" />
                </view>
                
                <view class="popup-actions">
                    <button class="cancel-btn" @click="closeModal">取消</button>
                    <button class="confirm-btn" @click="saveGoods" :disabled="!goodsForm.name || !goodsForm.code || !goodsForm.singleProfit">{{ isEdit ? '保存' : '添加' }}</button>
                </view>
            </view>
        </view>
        
        <!-- 添加品种按钮 -->
        <view class="add-goods-container">
            <view class="add-goods-btn" @click="showAddModal">
                <uni-icons type="plus" size="20" color="#fff"></uni-icons>
                <text class="add-btn-text">添加品种</text>
            </view>
        </view>
        
        <!-- 品种详情弹窗 -->
        <view class="modal-overlay" v-if="showDetailModal" @click="closeDetailModal">
            <view class="modal-content detail-modal" :class="{ 'closing': detailModalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">品种详情</text>
                    <view class="popup-close" @click="closeDetailModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <view class="detail-content">
                    <view class="detail-item">
                        <text class="detail-label">品种名称</text>
                        <text class="detail-value">{{ currentGoods.name || '未命名' }}</text>
                    </view>
                    
                    <view class="detail-item">
                        <text class="detail-label">品种代码</text>
                        <text class="detail-value">{{ currentGoods.code || '-' }}</text>
                    </view>
                    
                    <view class="detail-item">
                        <text class="detail-label">当前价格</text>
                        <text class="detail-value">¥{{ formatPrice(currentGoods.price) }}</text>
                    </view>
                    
                    <view class="detail-item">
                        <text class="detail-label">涨跌幅</text>
                        <text class="detail-value" :class="getChangeClass(currentGoods.change)">
                            {{ formatChange(currentGoods.change) }}
                        </text>
                    </view>
                    
                    <view class="detail-item">
                        <text class="detail-label">库存</text>
                        <text class="detail-value">{{ currentGoods.stock || 0 }}</text>
                    </view>
                </view>
                
                <view class="popup-actions">
                    <button class="action-btn edit" @click="editGoods(currentGoods)">编辑</button>
                    <button class="action-btn delete" @click="confirmDeleteGoods(currentGoods)">删除</button>
                </view>
            </view>
        </view>

    </view>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { userApi } from '@/api/userApi'
import { tradeApi } from '@/api/tradeApi'
import { useUserStore } from '@/stores/user'
import { useConstantsStore } from '@/stores/constants'

// 状态
const userStore = useUserStore()
const constantsStore = useConstantsStore()
const imageLoadError = ref(false)
const refresherTriggered = ref(false)
const goodsList = ref([])
const totalProfit = ref(0) // 总盈亏

// 滑动删除相关状态
const swipeStates = ref({}) // 记录每个品种的滑动状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const currentSwipeGoodsId = ref(null)

// 搜索参数
const searchParams = reactive({
    name: '',
    code: ''
})

// 弹窗相关
const showModal = ref(false)
const modalClosing = ref(false)
const isEdit = ref(false)
const goodsForm = ref({
    id: null,
    name: '',
    code: '',
    singleProfit: '' // 新增单手单点利润
})

// 详情弹窗
const showDetailModal = ref(false)
const detailModalClosing = ref(false)
const currentGoods = ref({})

// 排序相关
const showSortMenu = ref(false)
const currentSortType = ref('default') // 默认使用后端返回顺序
const sortOptions = [
    { value: 'default', label: '默认' },
    { value: 'profit', label: '盈亏' },
    { value: 'winRate', label: '胜率' },
    { value: 'profitRatio', label: '盈亏比' }
]

// 保存原始数据顺序
const originalGoodsList = ref([])

// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
    return userStore.userInfo.backgroudImg || ''
})

// 计算属性 - 格式化盈亏显示
const formattedProfit = computed(() => {
    if (totalProfit.value > 0) {
        return '+' + totalProfit.value.toFixed(2)
    } else {
        return totalProfit.value.toFixed(2)
    }
})

// 计算属性 - 当前排序方式文本
const currentSortText = computed(() => {
    const option = sortOptions.find(opt => opt.value === currentSortType.value)
    return option ? option.label.replace('（从高到低）', '') : '盈亏'
})

// 返回上一页
const goBack = () => {
    uni.navigateBack()
}

// 处理搜索
const handleSearch = () => {
    console.log('开始搜索, 搜索参数:', searchParams)
    
    // 显示加载提示
    if (searchParams.name?.trim() || searchParams.code?.trim()) {
        uni.showToast({
            title: '搜索中...',
            icon: 'loading',
            duration: 1000
        })
    } else {
        uni.showToast({
            title: '加载全部数据...',
            icon: 'loading',
            duration: 1000
        })
    }
    
    fetchGoodsList()
}

// 搜索输入处理
const onSearchInput = () => {
    // 如果两个搜索框都为空，自动搜索显示所有数据
    if (!searchParams.name?.trim() && !searchParams.code?.trim()) {
        console.log('搜索框为空，显示所有数据')
        fetchGoodsList()
    }
}

// 滑动删除相关方法
const handleTouchStart = (e, goodsId) => {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    currentSwipeGoodsId.value = goodsId
}

const handleTouchMove = (e, goodsId) => {
    if (currentSwipeGoodsId.value !== goodsId) return
    
    const touchX = e.touches[0].clientX
    const touchY = e.touches[0].clientY
    const deltaX = touchX - touchStartX.value
    const deltaY = touchY - touchStartY.value
    
    // 判断是否为水平滑动（防止与垂直滚动冲突）
    if (Math.abs(deltaY) > Math.abs(deltaX)) return
    
    // 只允许向左滑动
    if (deltaX < 0) {
        const translateX = Math.max(deltaX * 0.5, -120) // 最大滑动120rpx
        
        if (!swipeStates.value[goodsId]) {
            swipeStates.value[goodsId] = {}
        }
        
        swipeStates.value[goodsId].translateX = translateX
        swipeStates.value[goodsId].showDelete = translateX < -30
    }
}

const handleTouchEnd = (e, goodsId) => {
    if (currentSwipeGoodsId.value !== goodsId) return
    
    const state = swipeStates.value[goodsId]
    if (!state) return
    
    // 如果滑动超过一半宽度，直接确认删除
    if (state.translateX < -60) {
        // 显示删除按钮
        state.translateX = -120
        state.showDelete = true
    } else if (state.translateX < -30) {
        // 显示删除按钮
        state.translateX = -120
        state.showDelete = true
    } else {
        // 回弹到原位
        resetSwipeState(goodsId)
    }
    
    currentSwipeGoodsId.value = null
}

const resetSwipeState = (goodsId) => {
    if (swipeStates.value[goodsId]) {
        swipeStates.value[goodsId].translateX = 0
        swipeStates.value[goodsId].showDelete = false
    }
}

const resetAllSwipeStates = () => {
    Object.keys(swipeStates.value).forEach(goodsId => {
        resetSwipeState(goodsId)
    })
}

// 计算品种总盈亏
const getBalance = (goods) => {
    const winMoney = Number(goods.winMoney || 0)
    const lostMoney = Number(goods.lostMoney || 0)
    const balance = winMoney - lostMoney
    
    return balance >= 0 ? '+' + balance.toFixed(2) : balance.toFixed(2)
}

// 获取总盈亏的样式类
const getBalanceClass = (goods) => {
    const winMoney = Number(goods.winMoney || 0)
    const lostMoney = Number(goods.lostMoney || 0)
    const balance = winMoney - lostMoney
    
    return balance > 0 ? 'positive' : (balance < 0 ? 'negative' : '')
}

// 计算胜率
const getWinRate = (goods) => {
    const winCount = Number(goods.winCount || 0)
    const lostCount = Number(goods.lostCount || 0)
    const totalCount = winCount + lostCount
    
    if (totalCount === 0) return '0.00%'
    
    const winRate = (winCount / totalCount) * 100
    return winRate.toFixed(2) + '%'
}

// 计算盈亏比
const getProfitRatio = (goods) => {
    const winMoney = Math.abs(Number(goods.winMoney || 0))
    const lostMoney = Math.abs(Number(goods.lostMoney || 0))
    
    if (lostMoney === 0) {
        if (winMoney === 0) return '0'
        return '∞' // 无限大，没有亏损但有盈利
    }
    
    const ratio = winMoney / lostMoney
    return ratio.toFixed(2)
}

// 格式化单手单点利润
const formatSingleProfit = (value) => {
    if (isNaN(value) || value === '') return '0.0'
    return value.toFixed(1)
}

// 显示品种详情
const showGoodsDetail = (goods) => {
    // 重置所有滑动状态，确保详情页打开时没有滑动状态
    resetAllSwipeStates()
    
    // 跳转到日志详情页面，传递商品信息
    uni.navigateTo({
        url: `/pages/logDetail/logDetail?goodsId=${goods.id}&goodsName=${encodeURIComponent(goods.name || '未命名')}&goodsCode=${encodeURIComponent(goods.code || '')}`
    })
}

// 关闭详情弹窗
const closeDetailModal = () => {
    detailModalClosing.value = true
    
    setTimeout(() => {
        showDetailModal.value = false
        detailModalClosing.value = false
        currentGoods.value = {}
    }, 300)
}

// 切换排序菜单显示
const toggleSortMenu = () => {
    showSortMenu.value = !showSortMenu.value
}

// 选择排序方式
const selectSortType = (option) => {
    currentSortType.value = option.value
    // 应用排序
    applySorting()
    // 关闭菜单
    showSortMenu.value = false
}

// 应用排序
const applySorting = () => {
    if (!goodsList.value || goodsList.value.length === 0) return
    
    // 如果选择默认排序，恢复原始顺序
    if (currentSortType.value === 'default') {
        if (originalGoodsList.value.length > 0) {
            goodsList.value = [...originalGoodsList.value]
            console.log('恢复默认排序（后端返回顺序）')
        }
        return
    }
    
    const sorted = [...goodsList.value].sort((a, b) => {
        switch (currentSortType.value) {
            case 'profit':
                // 按盈亏排序（从高到低）
                const profitA = (Number(a.winMoney || 0) - Number(a.lostMoney || 0))
                const profitB = (Number(b.winMoney || 0) - Number(b.lostMoney || 0))
                return profitB - profitA
                
            case 'winRate':
                // 按胜率排序（从高到低）
                const winRateA = getWinRateNumber(a)
                const winRateB = getWinRateNumber(b)
                return winRateB - winRateA
                
            case 'profitRatio':
                // 按盈亏比排序（从高到低）
                const ratioA = getProfitRatioNumber(a)
                const ratioB = getProfitRatioNumber(b)
                return ratioB - ratioA
                
            default:
                return 0
        }
    })
    
    goodsList.value = sorted
    console.log(`按${currentSortText.value}排序完成`)
}

// 获取胜率数值（用于排序）
const getWinRateNumber = (goods) => {
    const winCount = Number(goods.winCount || 0)
    const lostCount = Number(goods.lostCount || 0)
    const totalCount = winCount + lostCount
    
    if (totalCount === 0) return 0
    return (winCount / totalCount) * 100
}

// 获取盈亏比数值（用于排序）
const getProfitRatioNumber = (goods) => {
    const winMoney = Math.abs(Number(goods.winMoney || 0))
    const lostMoney = Math.abs(Number(goods.lostMoney || 0))
    
    if (lostMoney === 0) {
        return winMoney === 0 ? 0 : 999999 // 没有亏损但有盈利时给一个很大的值
    }
    
    return winMoney / lostMoney
}

// 刷新数据
const refreshData = async () => {
    try {
        await Promise.all([fetchProfitData(), fetchGoodsList()])
        uni.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 1500
        })
    } catch (error) {
        console.error('刷新数据失败:', error)
        uni.showToast({
            title: '刷新失败',
            icon: 'none',
            duration: 2000
        })
    }
}

// 获取总盈亏数据
async function fetchProfitData() {
    try {
        const res = await tradeApi.queryProfit({})
        if (res.code === 200 || res.code === '200') {
            totalProfit.value = Number(res.data || 0)
        } else {
            console.error('获取总盈亏数据失败:', res.message)
        }
    } catch (error) {
        console.error('获取总盈亏数据异常:', error)
        totalProfit.value = 0
    }
}

// 存储所有商品数据（用于前端过滤）
const allGoodsList = ref([])

// 获取商品列表
async function fetchGoodsList() {
    try {
        const queryParams = {
            name: searchParams.name?.trim() || '',
            code: searchParams.code?.trim() || ''
        }
        
        console.log('搜索参数:', queryParams)
        
        // 如果没有搜索条件，获取所有数据
        const isEmptySearch = !queryParams.name && !queryParams.code
        
        const res = await tradeApi.queryGoods(isEmptySearch ? {} : queryParams)
        console.log('API返回结果:', res)
        
        if (res.code === 200 || res.code === '200') {
            const data = res.data || []
            
            // 如果是空搜索，保存所有数据并直接显示
            if (isEmptySearch) {
                allGoodsList.value = data
                goodsList.value = data
                originalGoodsList.value = [...data] // 保存原始顺序
                console.log('加载全部商品列表:', data.length, '条记录')
        } else {
                // 如果后端搜索没有返回预期结果，尝试前端过滤
                if (data.length === 0 && allGoodsList.value.length > 0) {
                    console.log('后端搜索无结果，尝试前端过滤')
                    const filtered = allGoodsList.value.filter(item => {
                        const nameMatch = !queryParams.name || 
                            (item.name && item.name.toLowerCase().includes(queryParams.name.toLowerCase()))
                        const codeMatch = !queryParams.code || 
                            (item.code && item.code.toLowerCase().includes(queryParams.code.toLowerCase()))
                        return nameMatch && codeMatch
                    })
                    goodsList.value = filtered
                    originalGoodsList.value = [...filtered] // 保存过滤后的原始顺序
                    console.log('前端过滤结果:', filtered.length, '条记录')
                } else {
                    goodsList.value = data
                    originalGoodsList.value = [...data] // 保存原始顺序
                    console.log('后端搜索结果:', data.length, '条记录')
                }
            }
            
            // 获取数据后应用当前排序（只有非默认排序才需要应用）
            if (goodsList.value.length > 0 && currentSortType.value !== 'default') {
                applySorting()
            }
        } else {
            console.error('获取商品列表失败:', res.message)
        }
    } catch (error) {
        console.error('获取商品列表异常:', error)
    }
}

// 显示添加商品弹窗
const showAddModal = () => {
    isEdit.value = false
    goodsForm.value = {
        id: null,
        name: '',
        code: '',
        singleProfit: ''
    }
    showModal.value = true
}

// 编辑商品
const editGoods = (goods) => {
    isEdit.value = true
    goodsForm.value = {
        id: goods.id,
        name: goods.name || '',
        code: goods.code || '',
        singleProfit: goods.singleProfit || '' // 编辑时也包含单手单点利润
    }
    showModal.value = true
    
    // 如果是从详情页进入编辑，需要关闭详情弹窗
    if (showDetailModal.value) {
        closeDetailModal()
    }
}

// 关闭弹窗
const closeModal = () => {
    modalClosing.value = true // 开始关闭动画
    
    // 延迟隐藏弹窗，等待动画完成
    setTimeout(() => {
        showModal.value = false
        modalClosing.value = false
    }, 300)
}

// 保存商品
const saveGoods = async () => {
    if (!goodsForm.value.name.trim()) {
        uni.showToast({
            title: '品种名称必填',
            icon: 'none'
        })
        return
    }
    
    if (!goodsForm.value.code.trim()) {
        uni.showToast({
            title: '品种代码必填',
            icon: 'none'
        })
        return
    }

    if (!goodsForm.value.singleProfit.trim()) {
        uni.showToast({
            title: '1手1点利润必填',
            icon: 'none'
        })
        return
    }

    // 验证1手1点利润是否为有效数字
    const singleProfitValue = parseFloat(goodsForm.value.singleProfit)
    if (isNaN(singleProfitValue) || singleProfitValue <= 0) {
        uni.showToast({
            title: '请输入有效的1手1点利润',
            icon: 'none'
        })
        return
    }

    uni.showLoading({
        title: isEdit.value ? '保存中...' : '添加中...'
    })

    try {
        // 发送name, code, singleProfit字段，确保singleProfit为数字类型
        const data = {
            ...goodsForm.value,
            singleProfit: singleProfitValue // 转换为数字类型
        }
        
        const res = isEdit.value 
            ? await tradeApi.updGoods(data)
            : await tradeApi.addGoods(data)
        
        uni.hideLoading()
        
        if (res.code === 200 || res.code === '200') {
            uni.showToast({
                title: isEdit.value ? '保存成功' : '添加成功',
                icon: 'success'
            })
            closeModal()
            // 刷新列表
            fetchGoodsList()
        } else {
            uni.showToast({
                title: res.message || '操作失败',
                icon: 'none'
            })
        }
    } catch (error) {
        uni.hideLoading()
        uni.showToast({
            title: '操作失败',
            icon: 'none'
        })
        console.error('保存商品失败:', error)
    }
}

// 确认删除商品
const confirmDeleteGoods = (goods) => {
    // 重置所有滑动状态
    resetAllSwipeStates()
    
    uni.showModal({
        title: '删除确认',
        content: `确定要删除"${goods.name || '未命名品种'}"吗？`,
        confirmColor: '#f56c6c',
        success: async (res) => {
            if (res.confirm) {
                await deleteGoods(goods.id)
                // 如果在详情页删除，删除后关闭详情页
                if (showDetailModal.value) {
                    closeDetailModal()
                }
            }
        }
    })
}

// 删除商品
const deleteGoods = async (id) => {
    if (!id) return
    
    uni.showLoading({
        title: '删除中...'
    })
    
    try {
        const res = await tradeApi.delGoods(id)
        uni.hideLoading()
        
        if (res.code === 200 || res.code === '200') {
            uni.showToast({
                title: '删除成功',
                icon: 'success'
            })
            // 刷新商品列表
            fetchGoodsList()
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
        console.error('删除商品失败:', error)
    }
}

// 下拉刷新处理
const handleRefresherRefresh = async () => {
    refresherTriggered.value = true
    // 重置所有滑动状态
    resetAllSwipeStates()
    
    try {
        await refreshData()
    } catch (error) {
        console.error('下拉刷新失败:', error)
    } finally {
        // 延迟结束刷新状态，给用户一个视觉反馈
        setTimeout(() => {
            refresherTriggered.value = false
        }, 1000)
    }
}

// 格式化时间
const formatTime = (timestamp) => {
    if (!timestamp) return ''
    
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day} ${hour}:${minute}`
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

// 监听商品数据刷新标志
watch(() => constantsStore.needRefreshGoods, async (newValue) => {
    if (newValue) {
        console.log('检测到需要刷新商品数据，开始刷新...', newValue)
        try {
            // 刷新商品列表和总盈亏数据
            await Promise.all([
                fetchProfitData(),
                fetchGoodsList()
            ])
            console.log('商品数据刷新完成')
        } catch (error) {
            console.error('刷新商品数据失败:', error)
        }
    }
})

// 点击商品列表时关闭排序菜单
const handleListClick = () => {
    if (showSortMenu.value) {
        showSortMenu.value = false
    }
}

onMounted(async () => {
    // 确保用户数据已初始化
    userStore.initUserInfo()
    // 加载数据
    try {
        await Promise.all([
            fetchProfitData(),
            fetchGoodsList()
        ])
    } catch (error) {
        console.error('加载数据失败:', error)
    }
})
</script>

<style lang="scss" scoped>
.trade-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
}

.trade-container::before {
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
    padding: 30rpx 30rpx 20rpx; /* 调整内边距 */
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
        
        .icon-wrapper {
            width: 40rpx;
            height: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            
            &:active {
                transform: scale(0.9);
                opacity: 0.8;
            }
        }
        
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
        
        .profit-text {
            color: #fff;
            font-size: 32rpx;
            font-weight: 600;
            text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
            white-space: nowrap; /* 确保在一行显示 */
            display: inline; /* 确保内联显示 */
        }
            
        .profit-number {
            &.profit-positive {
                color: #ff4757; /* 盈利为红色 */
            }
            
            &.profit-negative {
                color: #4cd964; /* 亏损为绿色 */
            }
        }
    }
    
    .nav-right {
        display: flex;
        align-items: center;
        gap: 30rpx;
        flex: 1;
        justify-content: flex-end;
        
        .icon-wrapper {
            width: 40rpx;
            height: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            
            &:active {
                transform: scale(0.9);
                opacity: 0.8;
            }
        }
    }
}

/* 搜索区域 */
.search-area {
    position: fixed;
    top: 160rpx; /* 增加顶部距离 */
    left: 0;
    right: 0;
    padding: 20rpx 30rpx;
    z-index: 99;
    
    .search-box {
        display: flex;
        align-items: center;
        background-color: transparent;
        border-radius: 10rpx;
        padding: 10rpx;
        
        .sort-btn-container {
            position: relative;
            margin-right: 10rpx;
            
            .sort-btn {
                display: flex;
                align-items: center;
                gap: 6rpx;
                padding: 0 15rpx;
                height: 70rpx;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 8rpx;
                transition: all 0.2s ease;
                min-width: 100rpx;
                
                &:active {
                    transform: scale(0.95);
                    opacity: 0.9;
                }
                
                .sort-text {
                    font-size: 24rpx;
                    color: #667eea;
                    white-space: nowrap;
                }
            }
            
            .sort-dropdown {
                position: absolute;
                top: 75rpx;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                border-radius: 8rpx;
                backdrop-filter: blur(10rpx);
                box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
                z-index: 1000;
                overflow: hidden;
                animation: dropdownShow 0.2s ease-out;
                
                .sort-option {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20rpx 15rpx;
                    transition: background 0.2s ease;
                    border-bottom: 1rpx solid rgba(102, 126, 234, 0.1);
                    
                    &:last-child {
                        border-bottom: none;
                    }
                    
                    &:active {
                        background: rgba(102, 126, 234, 0.1);
                    }
                    
                    &.active {
                        background: rgba(102, 126, 234, 0.15);
                        
                        .option-text {
                            color: #667eea;
                            font-weight: 500;
                        }
                    }
                    
                    .option-text {
                        font-size: 26rpx;
                        color: #333;
                    }
                    
                    .option-check {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
        
        .search-input-wrapper {
            flex: 1;
            margin-right: 10rpx;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8rpx;
            
            .search-input {
                width: 100%;
                height: 70rpx;
                padding: 0 20rpx;
                font-size: 28rpx;
                color: #fff;
                background: transparent;
                
                &::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }
            }
        }
        
        .search-btn {
            width: 70rpx;
            height: 70rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8rpx;
            transition: all 0.2s ease;
            
            &:active {
                transform: scale(0.95);
                opacity: 0.9;
            }
        }
    }
}

.trade-content {
    padding: 0; /* 去掉内边距，因为列表现在是固定定位 */
    margin-top: 0; /* 去掉上边距 */
    position: relative;
    z-index: 10;
}

/* 行情列表样式 */
.market-list {
    position: fixed; /* 使用固定定位 */
    top: 280rpx; /* 设置顶部位置，避免覆盖导航栏和搜索框 */
    left: 0;
    right: 0;
    bottom: 180rpx; /* 设置底部位置，避免覆盖底部按钮 */
    background: transparent; /* 去掉白色背景 */
    border-radius: 0; /* 去掉圆角 */
    padding: 20rpx 0 40rpx; /* 调整内边距，去掉左右内边距 */
    backdrop-filter: none; /* 去掉毛玻璃效果 */
    margin-bottom: 0; /* 去掉下边距 */
    z-index: 10; /* 设置层级 */
    overflow-y: auto; /* 允许垂直滚动 */
    
    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
    }
}

.goods-list {
    .goods-swipe-container {
        position: relative;
        overflow: hidden;
        border-bottom: none; /* 去掉边框 */
        margin: 8rpx 20rpx; /* 与任务卡片间距保持一致 */
        border-radius: 15rpx; /* 添加圆角 */
        background: rgba(255, 255, 255, 0.95); /* 添加白色半透明背景 */
        backdrop-filter: blur(10rpx); /* 添加毛玻璃效果 */
        
        &:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
    }
    
    .goods-swipe-wrapper {
        position: relative;
        width: 100%;
    }
    
    .goods-item {
        display: flex;
        flex-direction: column;
        padding: 25rpx 30rpx; /* 增加左右内边距 */
        background-color: transparent; /* 去掉背景色 */
        transition: transform 0.3s ease;
        position: relative;
        z-index: 2;
        
        &:active {
            background-color: rgba(0, 0, 0, 0.03);
        }
        
        .goods-row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 10rpx 0;
        }
        
        .goods-name-col {
            flex: 0 0 20%;
            display: flex;
            flex-direction: column;
            
            .goods-name {
                font-size: 30rpx;
                color: #333;
                font-weight: 500;
                margin-bottom: 6rpx;
            }
            
            .goods-code {
                font-size: 22rpx;
                color: #999;
            }
        }
        
        .goods-stats-col1 {
            flex: 0 0 30%;
            display: flex;
            flex-direction: column;
            gap: 5rpx;
            padding-left: 10rpx;
        }
        
        .goods-stats-col2 {
            flex: 0 0 30%;
            display: flex;
            flex-direction: column;
            gap: 5rpx;
            padding-left: 10rpx;
        }
            
            .stats-item {
                display: flex;
                align-items: center;
            gap: 5rpx;
                
                .stats-label {
                    font-size: 22rpx;
                    color: #888;
                white-space: nowrap;
                }
                
                .stats-value {
                    font-size: 22rpx;
                    color: #333;
                    font-weight: 500;
                    
                    &.positive {
                        color: #ff4757; /* 盈利为红色 */
                    }
                    
                    &.negative {
                        color: #4cd964; /* 亏损为绿色 */
                }
            }
        }
        
        .edit-icon {
            flex: 0 0 40rpx;
            height: 44rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10rpx;
            
            &:active {
                opacity: 0.7;
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
    border-radius: 0 10rpx 10rpx 0;
    z-index: 1;
    
    &:active {
        background: #e84057;
        }
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

.modal-content {
    width: 75%; /* 减小弹窗的整体宽度 */
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 20rpx; /* 减小左右内边距 */
    animation: fadeIn 0.3s ease-out;
    
    &.closing {
        animation: fadeOut 0.3s ease-in;
    }
    
    &.detail-modal {
        padding-bottom: 30rpx;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30rpx);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(30rpx);
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
    margin-bottom: 30rpx;
    padding: 0 10rpx; /* 添加左右内边距 */
    
    .input-label {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 15rpx;
        display: flex;
        align-items: center;
        
        .required {
            color: #ff4757;
            margin-right: 5rpx;
            font-weight: bold;
        }
    }
    
    .goods-input {
        width: calc(100% - 60rpx); /* 减少宽度，留出边距 */
        padding: 20rpx 15rpx;      /* 减少内边距 */
        border: 2rpx solid #e5e5e5;
        border-radius: 15rpx;
        font-size: 28rpx;
        background: #fafafa;
        
        &:focus {
            border-color: #667eea;
            background: #fff;
        }
    }
}

.detail-content {
    margin-bottom: 30rpx;
    
    .detail-item {
        display: flex;
        padding: 15rpx 0;
        border-bottom: 1px solid #eee;
        
        &:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            width: 150rpx;
            font-size: 28rpx;
            color: #666;
        }
        
        .detail-value {
            flex: 1;
            font-size: 28rpx;
            color: #333;
            font-weight: 500;
            
            &.up {
                color: #f56c6c;
            }
            
            &.down {
                color: #4cd964;
            }
        }
    }
}

.popup-actions {
    display: flex;
    gap: 20rpx;
    margin-top: 40rpx;
    
    .cancel-btn, .confirm-btn, .action-btn {
        flex: 1;
        padding: 20rpx;
        border-radius: 15rpx;
        font-size: 28rpx;
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
        
        &.edit {
            background: #667eea;
            color: #fff;
        }
        
        &.delete {
            background: #f56c6c;
            color: #fff;
        }
    }
}

/* 添加品种按钮样式 */
.add-goods-container {
    position: fixed;
    bottom: 40rpx;
    left: 30rpx;
    right: 30rpx;
    z-index: 95;
}

.add-goods-btn {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15rpx;
    backdrop-filter: blur(10rpx);
    border: 1rpx solid rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
    position: relative;
    z-index: 2;
    
    &:active {
        transform: scale(0.98);
        background: rgba(255, 255, 255, 0.25);
    }
    
    .add-btn-text {
        color: #fff;
        font-size: 32rpx;
        font-weight: 500;
        text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
    }
}

.empty-state {
    padding: 100rpx 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent; /* 去掉半透明背景 */
    backdrop-filter: none; /* 去掉毛玻璃效果 */
    border-radius: 0; /* 去掉圆角 */
    margin: 0 20rpx; /* 调整左右边距，与卡片间距保持一致 */
    
    .empty-text {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.9); /* 改为白色文字 */
        margin-bottom: 10rpx;
    }
    
    .empty-tips {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.6); /* 改为半透明白色文字 */
    }
}

/* 排序弹窗样式 */
.sort-modal-content {
    width: 75%;
    background: #fff;
    border-radius: 20rpx;
    animation: fadeIn 0.3s ease-out;
    
    &.closing {
        animation: fadeOut 0.3s ease-in;
    }
}

.sort-options {
    padding: 20rpx 0;
    
    .sort-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25rpx 40rpx;
        transition: background 0.2s ease;
        
        &:active {
            background: #f5f5f5;
        }
        
        &.active {
            background: rgba(102, 126, 234, 0.1);
            
            .option-text {
                color: #667eea;
                font-weight: 500;
            }
        }
        
        .option-text {
            font-size: 30rpx;
            color: #333;
        }
        
        .option-check {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

/* 下拉菜单动画 */
@keyframes dropdownShow {
    from {
        opacity: 0;
        transform: translateY(-10rpx);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
