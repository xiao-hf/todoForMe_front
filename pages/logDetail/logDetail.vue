<template>
    <view class="log-detail-container">
        <!-- 背景图片 -->
        <image v-if="currentBackgroundImage" 
            :src="currentBackgroundImage" 
            class="background-image"
            mode="aspectFill">
        </image>

        <!-- 导航栏 -->
        <view class="nav-header">
            <view class="nav-left">
                <view class="icon-wrapper" @click="goBack">
                    <uni-icons type="back" size="24" color="#fff"></uni-icons>
                </view>
            </view>
            <view class="nav-center">
                <text class="profit-text">
                    {{ goodsInfo.code }} 盈亏: 
                    <text class="profit-number" :class="{ 'profit-positive': totalProfit > 0, 'profit-negative': totalProfit < 0 }">
                        {{ formattedProfit }}
                    </text>
                </text>
            </view>
            <view class="nav-right">
                <!-- 去掉右上角的添加图标 -->
            </view>
        </view>

        <!-- 主要内容 -->
        <view class="log-content">
            <!-- 日志列表 -->
            <scroll-view class="logs-list" 
                scroll-y="true" 
                refresher-enabled="true"
                refresher-background="transparent"
                :refresher-triggered="refresherTriggered"
                @refresherrefresh="handleRefresh">
                
                <view v-if="logsList.length > 0" class="logs-container">
                    <!-- 日志项 -->
                    <view class="log-swipe-container" 
                        v-for="(log, index) in logsList" 
                        :key="log.id">
                        <view class="log-swipe-wrapper">
                            <view class="log-item"
                                :style="{ transform: `translateX(${swipeStates[log.id]?.translateX || 0}rpx)` }"
                                @touchstart="handleTouchStart($event, log.id)"
                                @touchmove="handleTouchMove($event, log.id)"
                                @touchend="handleTouchEnd($event, log.id)"
                                @click="viewLogDetail(log)">
                                <view class="log-row">
                                    <view class="log-date-col">
                                        <text class="log-date">{{ formatDate(log.createTime) }}</text>
                                    </view>
                                    <view class="log-info-col">
                                        <view class="log-summary" v-if="logSummaries.get(log.id)">
                                            <view class="summary-row">
                                                <text class="summary-item">开仓: ${{ logSummaries.get(log.id).entryPrice }}</text>
                                                <text class="summary-item">手数: {{ logSummaries.get(log.id).totalCount }}</text>
                                                <text class="direction-tag" :class="log.isRise ? 'direction-long' : 'direction-short'">
                                                    {{ log.isRise ? '多' : '空' }}
                                                </text>
                                            </view>
                                            <view class="summary-row">
                                                <text class="summary-item" 
                                                    :class="{ 'unclosed-text': logSummaries.get(log.id).isOpen }">
                                                    未平: {{ logSummaries.get(log.id).unClosedCount }}手
                                                </text>
                                                <text class="summary-item" 
                                                    :class="{ 'holding-open': logSummaries.get(log.id).isOpen }">
                                                    持仓: {{ logSummaries.get(log.id).holdingTime }}
                                                </text>
                                            </view>
                                        </view>
                                        <view class="log-summary loading" v-else>
                                            <text class="loading-text">加载中...</text>
                                        </view>
                                    </view>
                                    <view class="log-profit-col">
                                        <text class="log-profit" :class="getProfitClass(log.profit)">
                                            {{ formatProfit(log.profit) }}
                                        </text>
                                    </view>
                                    <view class="edit-icon" @click.stop="editLog(log)">
                                        <uni-icons type="compose" size="22" color="#667eea"></uni-icons>
                                    </view>
                                </view>
                            </view>
                            <view class="delete-action" 
                                v-if="swipeStates[log.id]?.showDelete"
                                @click="confirmDeleteLog(log)">
                                <uni-icons type="trash" size="24" color="#fff"></uni-icons>
                            </view>
                        </view>
                    </view>
                </view>
                
                <!-- 空状态 -->
                <view v-else class="empty-state">
                    <text class="empty-text">暂无交易记录</text>
                    <text class="empty-tips">点击下方按钮"+"添加交易记录</text>
                </view>
            </scroll-view>
        </view>
        
        <!-- 添加交易日志按钮 -->
        <view class="add-log-container">
            <view class="add-log-btn" @click="showAddLogModal">
                <uni-icons type="plus" size="20" color="#fff"></uni-icons>
                <text class="add-btn-text">添加交易记录</text>
            </view>
        </view>
        
        <!-- 添加交易日志弹窗 -->
        <view class="modal-overlay" v-if="showLogModal" @click="closeLogModal">
            <view class="modal-content log-modal" :class="{ 'closing': logModalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">{{ isEditMode ? '编辑交易日志' : '添加交易日志' }}</text>
                    <view class="popup-close" @click="closeLogModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <scroll-view class="form-content" scroll-y="true">
                    <!-- 入场描述 -->
                    <view class="input-group">
                        <view class="input-label">
                            <text class="required">*</text>入场描述
                        </view>
                        <textarea class="log-textarea" 
                            v-model="logForm.inDesc" 
                            placeholder="请输入入场描述"
                            maxlength="500"
                            auto-height />
                    </view>
                    
                    <!-- 入场价格 -->
                    <view class="input-group">
                        <view class="input-label">
                            <text class="required">*</text>入场价格
                        </view>
                        <input class="log-input" 
                            type="digit"
                            v-model="logForm.inPrice" 
                            placeholder="请输入入场价格" />
                    </view>
                    
                    <!-- 交易方向 -->
                    <view class="input-group">
                        <view class="input-label">
                            <text class="required">*</text>交易方向
                        </view>
                        <view class="radio-group">
                            <view class="radio-item" @click="logForm.isRise = true">
                                <view class="radio" :class="{ 'checked': logForm.isRise === true }">
                                    <view class="radio-inner" v-if="logForm.isRise === true"></view>
                                </view>
                                <text class="radio-text">做多(看涨)</text>
                            </view>
                            <view class="radio-item" @click="logForm.isRise = false">
                                <view class="radio" :class="{ 'checked': logForm.isRise === false }">
                                    <view class="radio-inner" v-if="logForm.isRise === false"></view>
                                </view>
                                <text class="radio-text">做空(看跌)</text>
                            </view>
                        </view>
                    </view>
                    
                    <!-- 手数 -->
                    <view class="input-group">
                        <view class="input-label">
                            <text class="required">*</text>手数
                        </view>
                        <input class="log-input" 
                            type="digit"
                            v-model="logForm.count" 
                            placeholder="请输入手数" />
                    </view>
                    
                    <!-- 入场图片 -->
                    <view class="input-group">
                        <view class="input-label">入场依据</view>
                        <view class="image-upload">
                            <!-- 统一显示所有图片和上传按钮 -->
                            <view class="image-grid">
                                <!-- 上传按钮 -->
                                <view class="upload-btn" @click="chooseInImages">
                                    <uni-icons type="plus" size="30" color="#667eea"></uni-icons>
                                </view>
                                
                                <!-- 已有图片 -->
                                <view class="image-item" v-for="(img, index) in logForm.existingImgs" :key="'existing-' + index">
                                    <image :src="img.url" 
                                        class="preview-image" 
                                        mode="aspectFill" 
                                        @click="previewImage(img.url, getAllImageUrls())"
                                        @error="handleImageError(img.url, index)"
                                        @load="handleImageLoad(img.url, index)" />
                                    <view class="delete-image" @click.stop="removeExistingImage(index)">
                                        <uni-icons type="close" size="16" color="#fff"></uni-icons>
                                    </view>
                                </view>
                                
                                <!-- 新增图片 -->
                                <view class="image-item" v-for="(img, index) in logForm.addInImgs" :key="'new-' + index">
                                    <image :src="img.url" 
                                        class="preview-image" 
                                        mode="aspectFill" 
                                        @click="previewImage(img.url, getAllImageUrls())" />
                                    <view class="delete-image" @click.stop="removeNewImage(index)">
                                        <uni-icons type="close" size="16" color="#fff"></uni-icons>
                                    </view>
                                </view>
                            </view>
                            

                        </view>
                    </view>
                    
                    <!-- 出场记录列表 -->
                    <view class="out-logs-section" v-if="isEditMode && outLogsList.length > 0">
                        <view class="section-title">平仓记录</view>
                        <view class="out-logs-list">
                            <view class="out-log-item" v-for="(outLog, index) in outLogsList" :key="outLog.id">
                                <view class="out-log-header">
                                    <text class="out-log-date">{{ formatDate(outLog.createTime) }}</text>
                                    <view class="out-log-right">
                                        <text class="out-log-profit" :class="getProfitClass(outLog.profit)">
                                            {{ formatProfit(outLog.profit) }}
                                        </text>
                                        <view class="out-edit-icon" @click.stop="editOutLog(outLog)">
                                            <uni-icons type="compose" size="20" color="#667eea"></uni-icons>
                                        </view>
                                        <view class="out-delete-icon" @click.stop="confirmDeleteOutLog(outLog)">
                                            <uni-icons type="trash" size="20" color="#f56c6c"></uni-icons>
                                        </view>
                                    </view>
                                </view>
                                <view class="out-log-content">
                                    <view class="out-log-info">
                                        <text class="out-count">手数: {{ outLog.count }}</text>
                                    </view>
                                    <view class="out-log-desc" v-if="outLog.outDesc">
                                        <text class="desc-text">{{ outLog.outDesc }}</text>
                                    </view>
                                    <!-- 出场图片 -->
                                    <view class="out-log-images" v-if="outLog.outImgs">
                                        <view class="out-images-grid">
                                            <view class="out-image-item" v-for="(imgUrl, imgIndex) in parseOutImages(outLog.outImgs)" :key="imgIndex">
                                                <image :src="imgUrl" 
                                                    class="out-preview-image" 
                                                    mode="aspectFill" 
                                                    @click="previewOutImage(imgUrl, parseOutImages(outLog.outImgs))" />
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    
                    <!-- 新增平仓记录按钮区域 - 独立显示 -->
                    <view class="add-out-log-section" v-if="canAddOutLog">
                        <view class="add-out-log-item">
                            <view class="add-out-content">
                                <view class="remaining-info">
                                    <text class="remaining-label">剩余未平仓:</text>
                                    <text class="remaining-count">{{ parseInt(logForm.count) - totalOutCount }} 手</text>
                                </view>
                                <button class="inline-add-btn" @click="showAddOutLogModal">
                                    <text class="btn-text">新增平仓</text>
                                </button>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                
                <view class="popup-actions">
                    <button class="cancel-btn" @click="closeLogModal">取消</button>
                    <button class="confirm-btn" @click="saveLog" :disabled="!canSaveLog">
                        {{ isEditMode ? '更新' : '保存' }}
                    </button>
                </view>
            </view>
        </view>
        
        <!-- 新增平仓记录弹窗 -->
        <view class="modal-overlay" v-if="showOutLogModal" @click="closeOutLogModal">
            <view class="modal-content out-log-modal" :class="{ 'closing': outLogModalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">{{ isEditOutLogMode ? '编辑平仓记录' : '新增平仓记录' }}</text>
                    <view class="popup-close" @click="closeOutLogModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <scroll-view class="form-content" scroll-y="true">
                    <!-- 平仓手数 -->
                    <view class="input-group">
                        <view class="input-label">
                            <text class="required">*</text>平仓手数
                        </view>
                        <input class="log-input" 
                            type="digit"
                            v-model="outLogForm.count"
                            @blur="handleOutCountBlur"
                            :placeholder="`最多可平仓 ${parseInt(logForm.count) - totalOutCount} 手`" />
                        <view class="input-hint">
                            <text class="hint-text">剩余未平仓: {{ parseInt(logForm.count) - totalOutCount }} 手</text>
                        </view>
                    </view>
                    
                    <!-- 出场价格 -->
                    <view class="input-group">
                        <view class="input-label">
                            <text class="required">*</text>出场价格
                        </view>
                        <input class="log-input" 
                            type="digit"
                            v-model="outLogForm.outPrice" 
                            placeholder="请输入出场价格" />
                    </view>
                    
                    <!-- 出场描述 -->
                    <view class="input-group">
                        <view class="input-label">出场描述</view>
                        <textarea class="log-textarea" 
                            v-model="outLogForm.outDesc" 
                            placeholder="请输入出场描述（可选）"
                            maxlength="500"
                            auto-height />
                    </view>
                    
                    <!-- 出场图片 -->
                    <view class="input-group">
                        <view class="input-label">出场图片</view>
                        <view class="image-upload">
                            <!-- 统一显示所有图片和上传按钮 -->
                            <view class="image-grid">
                                <!-- 上传按钮 -->
                                <view class="upload-btn" @click="chooseOutImages">
                                    <uni-icons type="plus" size="30" color="#667eea"></uni-icons>
                                </view>
                                
                                <!-- 已有图片 -->
                                <view class="image-item" v-for="(img, index) in outLogForm.existingImgs" :key="'existing-' + index">
                                    <image :src="img.url" 
                                        class="preview-image" 
                                        mode="aspectFill" 
                                        @click="previewImage(img.url, getAllOutImageUrls())" />
                                    <view class="delete-image" @click.stop="removeExistingOutImage(index)">
                                        <uni-icons type="close" size="16" color="#fff"></uni-icons>
                                    </view>
                                </view>
                                
                                <!-- 新增图片 -->
                                <view class="image-item" v-for="(img, index) in outLogForm.addOutImgs" :key="'new-' + index">
                                    <image :src="img.url" 
                                        class="preview-image" 
                                        mode="aspectFill" 
                                        @click="previewImage(img.url, getAllOutImageUrls())" />
                                    <view class="delete-image" @click.stop="removeNewOutImage(index)">
                                        <uni-icons type="close" size="16" color="#fff"></uni-icons>
                                    </view>
                                </view>
                            </view>
                            

                        </view>
                    </view>
                </scroll-view>
                
                <view class="popup-actions">
                    <button class="cancel-btn" @click="closeOutLogModal">取消</button>
                    <button class="confirm-btn" @click="saveOutLog" :disabled="!canSaveOutLog">
                        {{ isEditOutLogMode ? '更新' : '保存' }}
                    </button>
                </view>
            </view>
        </view>
        
        <!-- 日志详情查看弹窗 -->
        <view class="modal-overlay" v-if="showLogDetailModal" @click="closeLogDetailModal">
            <view class="modal-content log-detail-view-modal" :class="{ 'closing': logDetailModalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">交易日志详情</text>
                    <view class="popup-close" @click="closeLogDetailModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <scroll-view class="form-content" scroll-y="true" v-if="viewingLog">
                    <!-- 入场描述 -->
                    <view class="input-group readonly">
                        <view class="input-label">入场描述</view>
                        <view class="readonly-content">{{ viewingLog.inDesc || '无' }}</view>
                    </view>
                    
                    <!-- 入场价格 -->
                    <view class="input-group readonly">
                        <view class="input-label">入场价格</view>
                        <view class="readonly-content">¥{{ viewingLog.inPrice }}</view>
                    </view>
                    
                    <!-- 交易方向 -->
                    <view class="input-group readonly">
                        <view class="input-label">交易方向</view>
                        <view class="readonly-content">
                            <view class="direction-tag" :class="viewingLog.isRise ? 'rise' : 'fall'">
                                {{ viewingLog.isRise ? '做多(看涨)' : '做空(看跌)' }}
                            </view>
                        </view>
                    </view>
                    
                    <!-- 手数 -->
                    <view class="input-group readonly">
                        <view class="input-label">手数</view>
                        <view class="readonly-content">{{ viewingLog.count }}手</view>
                    </view>
                    
                    <!-- 创建时间 -->
                    <view class="input-group readonly">
                        <view class="input-label">创建时间</view>
                        <view class="readonly-content">{{ formatDate(viewingLog.createTime) }}</view>
                    </view>
                    
                    <!-- 总盈亏 -->
                    <view class="input-group readonly">
                        <view class="input-label">总盈亏</view>
                        <view class="readonly-content" :class="getProfitClass(viewingLog.profit)">
                            {{ formatProfit(viewingLog.profit) }}
                        </view>
                    </view>
                    
                    <!-- 入场图片 -->
                    <view class="input-group readonly" v-if="viewingLog.inImgs">
                        <view class="input-label">入场图片</view>
                        <view class="readonly-images">
                            <view class="image-grid">
                                <view class="image-item" v-for="(imgUrl, imgIndex) in parseInImages(viewingLog.inImgs)" :key="imgIndex">
                                    <image :src="imgUrl" 
                                        class="preview-image" 
                                        mode="aspectFill" 
                                        @click="previewImage(imgUrl, parseInImages(viewingLog.inImgs))" />
                                </view>
                            </view>
                            <view v-if="parseInImages(viewingLog.inImgs).length === 0" class="no-images-text">
                                无入场图片
                            </view>
                        </view>
                    </view>
                    
                    <!-- 出场记录列表 -->
                    <view class="out-logs-section readonly" v-if="outLogsList.length > 0">
                        <view class="section-title">出场记录</view>
                        <view class="out-logs-list">
                            <view class="out-log-item readonly" v-for="(outLog, index) in outLogsList" :key="outLog.id">
                                <view class="out-log-header">
                                    <text class="out-log-date">{{ formatDate(outLog.createTime) }}</text>
                                    <text class="out-log-profit" :class="getProfitClass(outLog.profit)">
                                        {{ formatProfit(outLog.profit) }}
                                    </text>
                                </view>
                                <view class="out-log-content">
                                    <view class="out-log-info">
                                        <text class="out-count">手数: {{ outLog.count }}</text>
                                    </view>
                                    <view class="out-log-desc" v-if="outLog.outDesc">
                                        <text class="desc-text">{{ outLog.outDesc }}</text>
                                    </view>
                                    <!-- 出场图片 -->
                                    <view class="out-log-images" v-if="outLog.outImgs">
                                        <view class="out-images-grid">
                                            <view class="out-image-item" v-for="(imgUrl, imgIndex) in parseOutImages(outLog.outImgs)" :key="imgIndex">
                                                <image :src="imgUrl" 
                                                    class="out-preview-image" 
                                                    mode="aspectFill" 
                                                    @click="previewOutImage(imgUrl, parseOutImages(outLog.outImgs))" />
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    
                    <!-- 加载中状态 -->
                    <view class="loading-section" v-if="isLoadingOutLogs">
                        <text class="loading-text">正在加载出场记录...</text>
                    </view>
                    
                    <!-- 无出场记录提示 -->
                    <view class="no-out-logs" v-if="!isLoadingOutLogs && outLogsList.length === 0">
                        <text class="no-out-logs-text">暂无出场记录</text>
                    </view>
                </scroll-view>
                
                <view class="popup-actions">
                    <button class="cancel-btn full-width" @click="closeLogDetailModal">关闭</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { tradeApi } from '@/api/tradeApi'
import { useUserStore } from '@/stores/user'
import { useConstantsStore } from '@/stores/constants'
import { baseURL_ } from '@/utils/request'

// 用户store
const userStore = useUserStore()
// 常量store
const constantsStore = useConstantsStore()

// 页面参数
const goodsInfo = reactive({
    id: '',
    name: '',
    code: ''
})

// 状态
const logsList = ref([])
const refresherTriggered = ref(false)
const totalProfit = ref(0) // 商品总盈亏

// 弹窗状态
const showLogModal = ref(false)
const logModalClosing = ref(false)
const isEditMode = ref(false) // 是否为编辑模式

// 新增平仓记录弹窗状态
const showOutLogModal = ref(false)
const outLogModalClosing = ref(false)

// 表单数据
const logForm = reactive({
    id: null, // 编辑时的日志ID
    inDesc: '',
    inPrice: '',
    isRise: true, // true: 看涨, false: 看跌
    count: '', // 手数
    existingImgs: [], // 已有图片数组（用于编辑时显示和删除）
    addInImgs: [], // 新增入场图片数组
})

// 平仓记录表单数据
const outLogForm = reactive({
    id: null, // 编辑时的出场记录ID
    tradeLogId: null, // 入场日志ID
    count: '', // 平仓手数
    outPrice: '', // 出场价格
    outDesc: '', // 出场描述
    existingImgs: [], // 已有出场图片数组
    addOutImgs: [], // 新增出场图片数组
})

// 编辑出场记录状态
const isEditOutLogMode = ref(false) // 是否为编辑出场记录模式

// 日志详情查看状态
const showLogDetailModal = ref(false) // 是否显示日志详情弹窗
const logDetailModalClosing = ref(false) // 日志详情弹窗关闭动画
const viewingLog = ref(null) // 当前查看的日志数据

// 出场记录列表
const outLogsList = ref([])
const isLoadingOutLogs = ref(false)

// 计算已平仓手数总和
const totalOutCount = computed(() => {
    return outLogsList.value.reduce((sum, outLog) => sum + (outLog.count || 0), 0)
})

// 判断是否可以新增平仓记录
const canAddOutLog = computed(() => {
    const editMode = isEditMode.value
    const count = logForm.count
    const inCount = parseInt(logForm.count) || 0
    const totalOut = totalOutCount.value
    const result = editMode && count && totalOut < inCount
    
    console.log('canAddOutLog 检查:', {
        isEditMode: editMode,
        logFormCount: count,
        inCount: inCount,
        totalOutCount: totalOut,
        result: result
    })
    
    return result
})

// 左滑删除状态
const swipeStates = ref({}) // 记录每个日志的滑动状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const currentSwipeLogId = ref(null)

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

// 返回上一页
const goBack = () => {
    uni.navigateBack()
}

// 添加日志
const addLog = () => {
    uni.navigateTo({
        url: `/pages/addLog/addLog?goodsId=${goodsInfo.id}&goodsName=${encodeURIComponent(goodsInfo.name)}`
    })
}

// 显示添加交易日志弹窗
const showAddLogModal = () => {
    logForm.id = null // 清空ID，表示新增
    logForm.inDesc = ''
    logForm.inPrice = ''
    logForm.isRise = true
    logForm.count = '' // 初始化为空
    logForm.existingImgs = [] // 初始化为空数组
    logForm.addInImgs = [] // 初始化为空数组
    outLogsList.value = [] // 清空出场记录
    isEditMode.value = false // 切换为新增模式
    showLogModal.value = true
}

// 关闭添加交易日志弹窗
const closeLogModal = () => {
    logModalClosing.value = true
    setTimeout(() => {
        showLogModal.value = false
        logModalClosing.value = false
        outLogsList.value = [] // 清空出场记录
    }, 300) // 动画时长
}

// 选择入场图片
const chooseInImages = () => {
    uni.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            console.log('选择入场图片成功:', res.tempFilePaths)
            // 将选中的图片添加到新增图片数组中
            const newImages = res.tempFilePaths.map((path, index) => ({
                url: path, // 用于预览显示
                path: path, // 实际文件路径
                name: `inImg_${Date.now()}_${index}.jpg`,
                isExisting: false // 明确标记为新上传的图片
            }))
            logForm.addInImgs = [...logForm.addInImgs, ...newImages]
            console.log('当前新增图片数组:', logForm.addInImgs)
        },
        fail: (error) => {
            console.error('选择入场图片失败:', error)
        }
    })
}

// 移除入场图片
const removeInImage = (index) => {
    logForm.addInImgs.splice(index, 1)
}

// 移除已有图片
const removeExistingImage = (index) => {
    logForm.existingImgs.splice(index, 1)
}

// 移除新增图片
const removeNewImage = (index) => {
    logForm.addInImgs.splice(index, 1)
}

// 判断是否可以保存
const canSaveLog = computed(() => {
    return logForm.inDesc.trim() && logForm.inPrice && (logForm.isRise === true || logForm.isRise === false) && logForm.count
})

// 将图片路径转换为文件对象
const createFileFromPath = async (path, fileName, isExisting = false) => {
    try {
        // 如果是已存在的图片URL，直接返回URL字符串，不需要转换为File对象
        if (isExisting) {
            return path // 直接返回URL
        }
        
        // 在H5环境中，使用fetch获取blob
        // #ifdef H5
        const response = await fetch(path)
        const blob = await response.blob()
        return new File([blob], fileName, { type: blob.type || 'image/jpeg' })
        // #endif
        
        // 在App环境中，需要读取本地文件
        // #ifdef APP-PLUS
        return new Promise((resolve, reject) => {
            plus.io.resolveLocalFileSystemURL(path, (entry) => {
                entry.file((file) => {
                    const reader = new plus.io.FileReader()
                    reader.onloadend = (e) => {
                        const arrayBuffer = e.target.result
                        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' })
                        const fileObj = new File([blob], fileName, { type: 'image/jpeg' })
                        resolve(fileObj)
                    }
                    reader.readAsArrayBuffer(file)
                }, reject)
            }, reject)
        })
        // #endif
        
        // 其他环境暂时返回null
        return null
    } catch (error) {
        console.error('创建文件对象失败:', error)
        return null
    }
}

// 保存交易日志
const saveLog = async () => {
    if (!canSaveLog.value) {
        uni.showToast({
            title: '请填写必填项',
            icon: 'none'
        })
        return
    }

    // 验证手数是否为有效数字
    const countValue = parseFloat(logForm.count)
    if (isNaN(countValue) || countValue <= 0) {
        uni.showToast({
            title: '请输入有效的手数',
            icon: 'none'
        })
        return
    }

    uni.showLoading({
        title: isEditMode.value ? '更新中...' : '保存中...'
    })

    try {
        console.log('开始保存交易日志')
        console.log('表单数据:', logForm)
        console.log('编辑模式:', isEditMode.value)
        console.log('goodsInfo.id:', goodsInfo.id)
        
        // 验证必要参数
        if (!isEditMode.value) {
            // 新增模式需要商品ID
            if (!goodsInfo.id || goodsInfo.id === '') {
                uni.hideLoading()
                uni.showToast({
                    title: '商品ID不能为空，请重新进入页面',
                    icon: 'error',
                    duration: 3000
                })
                return
            }
        } else {
            // 编辑模式需要日志ID
            if (!logForm.id) {
                uni.hideLoading()
                uni.showToast({
                    title: '日志ID不能为空',
                    icon: 'error'
                })
                return
            }
        }
        
        // 根据后端接口构建请求参数
        const data = {
            id: isEditMode.value ? logForm.id : goodsInfo.id, // 编辑模式传日志ID，新增模式传商品ID
            inDesc: logForm.inDesc.trim(),
            inPrice: parseFloat(logForm.inPrice),
            isRise: logForm.isRise,
            count: parseInt(logForm.count)
        }
        
        // 可选参数：只有当有值时才添加到请求中
        if (logForm.outDesc && logForm.outDesc.trim()) {
            data.outDesc = logForm.outDesc.trim()
        }
        
        if (logForm.outPrice && logForm.outPrice !== '') {
            data.outPrice = parseFloat(logForm.outPrice)
        }
        
        // outImgs 参数处理（平仓图片）
        data.outImgs = '' // 新增模式下默认为空字符串
        
        // 处理已有入场图片 - 对应后端的 inImgs 参数
        if (isEditMode.value && logForm.existingImgs && logForm.existingImgs.length > 0) {
            const existingImgUrls = logForm.existingImgs.map(img => img.url)
            data.inImgs = JSON.stringify(existingImgUrls)
            console.log('已有入场图片JSON字符串:', data.inImgs)
        } else {
            data.inImgs = '' // 没有已有图片时传空字符串
        }
        
        // 文件上传处理将在下面根据是否有文件来决定使用 uploadFile 还是 request
        
        console.log('最终发送的数据:', data)

        // 完全参考人设接口的处理方式：检查是否有文件需要上传
        const hasFiles = logForm.addInImgs && logForm.addInImgs.length > 0
        console.log('是否有文件需要上传:', hasFiles)
        
        // 确定请求URL
        const url = isEditMode.value 
            ? `${baseURL_}/trade/updLog`
            : `${baseURL_}/trade/addLog`
        
        let res
        
        if (hasFiles) {
            // 有文件，支持多文件上传
            console.log('有文件，准备上传多个文件:', logForm.addInImgs.length, '张')
            
            // 使用条件编译处理不同环境
            // #ifdef H5
            // H5环境使用fetch，完全支持FormData的多文件
            console.log('H5环境，使用fetch上传多文件');
            
            // 创建FormData以支持多个同名文件参数
            const formData = new FormData();
            
            // 添加基本参数
            formData.append('id', data.id.toString());
            formData.append('inDesc', data.inDesc);
            formData.append('inPrice', data.inPrice.toString());
            formData.append('isRise', data.isRise.toString());
            formData.append('count', data.count.toString());
            formData.append('inImgs', data.inImgs || '');
            formData.append('outDesc', data.outDesc || '');
            formData.append('outImgs', data.outImgs || '');
            if (data.outPrice !== undefined) {
                formData.append('outPrice', data.outPrice.toString());
            }
            
            // 添加多个同名文件参数 - 这样后端就能接收到MultipartFile[]数组
            for (let i = 0; i < logForm.addInImgs.length; i++) {
                const img = logForm.addInImgs[i];
                const fileObj = await createFileFromPath(img.path || img.url, img.name || `inImg_${Date.now()}_${i}.jpg`, false);
                if (fileObj) {
                    formData.append('addInImgs', fileObj, fileObj.name);
                    console.log('添加文件到FormData (同名参数):', fileObj.name, fileObj.size, 'bytes');
                }
            }
            
            // 检查FormData内容
            console.log('FormData包含的字段:');
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1] instanceof File ? `文件: ${pair[1].name}` : pair[1]);
            }
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: userStore.userInfo.authorization
                        ? `Bearer ${userStore.userInfo.authorization}`
                        : ''
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            res = await response.json();
            console.log('H5上传结果:', res);
            // #endif
            
            // #ifdef MP || APP-PLUS
            // 小程序/APP环境，处理多文件上传逻辑
            console.log('小程序/APP环境，准备上传', logForm.addInImgs.length, '张图片');
            
            // Step 1: 先用第一张图片调用addLog或updLog接口
            const firstFile = logForm.addInImgs[0];
            const firstFilePath = firstFile.path || firstFile.url;
            
            const firstRequestData = {
                id: data.id.toString(),
                inDesc: data.inDesc,
                inPrice: data.inPrice.toString(),
                isRise: data.isRise.toString(),
                count: data.count.toString(),
                inImgs: data.inImgs || '',
                outDesc: data.outDesc || '',
                outImgs: data.outImgs || ''
            };
            
            if (data.outPrice !== undefined) {
                firstRequestData.outPrice = data.outPrice.toString();
            }
            
            console.log('Step 1: 上传第一张图片，调用', isEditMode.value ? 'updLog' : 'addLog');
            console.log('第一张图片路径:', firstFilePath);
            console.log('第一张图片请求参数:', firstRequestData);
            
            res = await new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: url, // addLog 或 updLog
                    filePath: firstFilePath,
                    name: 'addInImgs',
                    formData: firstRequestData,
                    header: {
                        Authorization: userStore.userInfo.authorization
                            ? `Bearer ${userStore.userInfo.authorization}`
                            : ''
                    },
                    success: (uploadRes) => {
                        console.log('第一张图片上传结果:', uploadRes);
                        try {
                            const responseData = typeof uploadRes.data === 'string' 
                                ? JSON.parse(uploadRes.data) 
                                : uploadRes.data;
                                
                            console.log('解析后的第一张图片上传结果:', responseData);
                            
                            if (responseData && (responseData.code == 200 || responseData.code == '200')) {
                                resolve(responseData);
                } else {
                                reject(new Error(responseData?.msg || responseData?.message || '第一张图片上传失败'));
                            }
                        } catch (e) {
                            reject(new Error('解析第一张图片响应失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('第一张图片上传失败:', err);
                        reject(err);
                    }
                });
            });
            
            // Step 2: 如果有多张图片且第一张上传成功，依次追加剩余图片
            if (logForm.addInImgs.length > 1 && res && (res.code == 200 || res.code == '200')) {
                console.log('Step 2: 继续上传剩余', logForm.addInImgs.length - 1, '张图片');
                
                // 获取交易记录ID
                let tradeLogId;
                if (isEditMode.value) {
                    // 编辑模式：直接使用传入的记录ID
                    tradeLogId = data.id;
                } else {
                    // 新增模式：从返回结果中获取新创建的交易记录ID
                    tradeLogId = res.data || res.message;
                }
                console.log('获取到的交易记录ID:', tradeLogId);
                
                if (!tradeLogId) {
                    console.warn('无法获取交易记录ID，跳过剩余图片上传');
                } else {
                    // 确定后续请求使用的接口URL
                    const additionalUrl = isEditMode.value 
                        ? `${baseURL_}/trade/updLog`  // 编辑模式使用updLog
                        : `${baseURL_}/trade/addLog`; // 新增模式使用addLog
                    
                    // 依次上传剩余图片，设置isUpload=true
                    for (let i = 1; i < logForm.addInImgs.length; i++) {
                        const additionalFile = logForm.addInImgs[i];
                        const additionalFilePath = additionalFile.path || additionalFile.url;
                        
                        console.log(`Step 2.${i}: 上传第${i + 1}张图片，调用${isEditMode.value ? 'updLog' : 'addLog'}接口，isUpload=true`);
                        console.log('图片路径:', additionalFilePath);
                        
                        const additionalRequestData = {
                            id: tradeLogId.toString(), // 使用交易记录ID
                            inDesc: data.inDesc,
                            inPrice: data.inPrice.toString(),
                            isRise: data.isRise.toString(),
                            count: data.count.toString(),
                            inImgs: data.inImgs || '',
                            outDesc: data.outDesc || '',
                            outImgs: data.outImgs || '',
                            isUpload: 'true' // 关键参数：标识这是追加图片
                        };
                        
                        if (data.outPrice !== undefined) {
                            additionalRequestData.outPrice = data.outPrice.toString();
                        }
                        
                        try {
                            const additionalRes = await new Promise((resolve, reject) => {
                                uni.uploadFile({
                                    url: additionalUrl, // 根据模式选择接口
                                    filePath: additionalFilePath,
                                    name: 'addInImgs',
                                    formData: additionalRequestData,
                                    header: {
                                        Authorization: userStore.userInfo.authorization
                                            ? `Bearer ${userStore.userInfo.authorization}`
                                            : ''
                                    },
                                    success: (uploadRes) => {
                                        console.log(`第${i + 1}张图片上传结果:`, uploadRes);
                                        try {
                                            const responseData = typeof uploadRes.data === 'string' 
                                                ? JSON.parse(uploadRes.data) 
                                                : uploadRes.data;
                                                
                                            if (responseData && (responseData.code == 200 || responseData.code == '200')) {
                                                resolve(responseData);
                                            } else {
                                                reject(new Error(responseData?.msg || responseData?.message || `第${i + 1}张图片上传失败`));
                                            }
                                        } catch (e) {
                                            reject(new Error(`解析第${i + 1}张图片响应失败`));
                                        }
                                    },
                                    fail: (err) => {
                                        console.error(`第${i + 1}张图片上传失败:`, err);
                                        reject(err);
                                    }
                                });
                            });
                            
                            console.log(`第${i + 1}张图片上传成功`);
                        } catch (error) {
                            console.error(`第${i + 1}张图片上传失败:`, error);
                            // 不中断流程，继续上传下一张
                        }
                    }
                    
                    console.log('所有图片上传完成');
                }
            }
            // #endif
        } else {
            // 无文件，使用普通请求，完全参考人设接口
            console.log('无文件，使用普通请求')
            
            res = await new Promise((resolve, reject) => {
                uni.request({
                    url: url,
                    method: 'POST',
                    data: data,
                    header: {
                        // 使用表单格式，完全参考人设接口
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': userStore.userInfo.authorization
                            ? `Bearer ${userStore.userInfo.authorization}`
                            : ''
                    },
                    success: (res) => {
                        console.log('请求结果:', res);
                        // 兼容字符串和数字格式的code
                        if (res.statusCode === 200 && (res.data.code === 200 || res.data.code === '200')) {
                            resolve(res.data);
                        } else {
                            console.error('请求失败:', res.data);
                            reject(new Error(res.data?.msg || res.data?.message || '请求失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('请求失败:', err);
                        reject(err);
                    }
                });
            });
        }
        
        uni.hideLoading()
        
        console.log('保存交易日志响应:', res)
        
        if (res.code === 200 || res.code === '200') {
            uni.showToast({
                title: isEditMode.value ? '更新成功' : '添加成功',
                icon: 'success'
            })
            closeLogModal()
            // 设置需要刷新商品数据标志
            constantsStore.needRefreshGoods = Math.random()
            // 清空相关缓存
            if (logForm.id) {
                logOutRecordsCache.value.delete(logForm.id)
                logSummaries.value.delete(logForm.id)
            }
            // 刷新数据
            await Promise.all([fetchLogs(), fetchProfitData()])
        } else {
            uni.showToast({
                title: res.message || (isEditMode.value ? '更新失败' : '添加失败'),
                icon: 'none'
            })
        }
    } catch (error) {
        uni.hideLoading()
        console.error('保存交易日志异常:', error)
        uni.showToast({
            title: isEditMode.value ? '更新失败' : '添加失败',
            icon: 'none'
        })
    }
}

// 获取商品盈亏数据
const fetchProfitData = async () => {
    if (!goodsInfo.id) return
    
    try {
        const res = await tradeApi.queryProfit({
            goodsId: goodsInfo.id
        })
        if (res.code === 200 || res.code === '200') {
            totalProfit.value = Number(res.data || 0)
        } else {
            console.error('获取商品盈亏数据失败:', res.message)
        }
    } catch (error) {
        console.error('获取商品盈亏数据异常:', error)
        totalProfit.value = 0
    }
}

// 获取交易日志
const fetchLogs = async () => {
    if (!goodsInfo.id) return
    
    try {
        const res = await tradeApi.queryLog({
            goodsId: goodsInfo.id,
            pageSize: 50,
            pageNo: 1
        })
        
        if (res.code === 200 || res.code === '200') {
            logsList.value = res.data?.list || []
            // 异步加载所有日志的摘要信息
            loadAllLogSummaries()
        } else {
            console.error('获取交易日志失败:', res.message)
        }
    } catch (error) {
        console.error('获取交易日志异常:', error)
    }
}

// 加载所有日志的摘要信息
const loadAllLogSummaries = async () => {
    for (const log of logsList.value) {
        if (!logSummaries.value.has(log.id)) {
            const summary = await getLogSummary(log)
            logSummaries.value.set(log.id, summary)
        }
    }
}

// 获取出场记录
const fetchOutLogs = async (logId) => {
    if (!logId) return
    
    isLoadingOutLogs.value = true
    try {
        const res = await tradeApi.queryOutLog(logId)
        
        if (res.code === 200 || res.code === '200') {
            outLogsList.value = res.data || []
            console.log('获取出场记录成功:', outLogsList.value)
        } else {
            console.error('获取出场记录失败:', res.message)
            outLogsList.value = []
        }
    } catch (error) {
        console.error('获取出场记录异常:', error)
        outLogsList.value = []
    } finally {
        isLoadingOutLogs.value = false
    }
}

// 下拉刷新
const handleRefresh = async () => {
    refresherTriggered.value = true
    // 重置所有滑动状态
    resetAllSwipeStates()
    // 清空缓存
    logOutRecordsCache.value.clear()
    logSummaries.value.clear()
    
    try {
        await Promise.all([fetchProfitData(), fetchLogs()])
    } catch (error) {
        console.error('刷新失败:', error)
    } finally {
        setTimeout(() => {
            refresherTriggered.value = false
        }, 1000)
    }
}

// 格式化日期
const formatDate = (timestamp) => {
    if (!timestamp) return ''
    
    const date = new Date(timestamp)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    
    return `${month}-${day} ${hour}:${minute}`
}

// 格式化盈亏
const formatProfit = (profit) => {
    if (!profit) return '0.00'
    return profit > 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2)
}

// 获取盈亏样式类
const getProfitClass = (profit) => {
    if (!profit) return ''
    return profit > 0 ? 'profit-positive' : 'profit-negative'
}

// 格式化总盈亏
const formatBalance = () => {
    // 这里需要计算所有日志的盈亏总和
    const total = logsList.value.reduce((sum, log) => sum + (log.profit || 0), 0)
    return total > 0 ? `+${total.toFixed(2)}` : total.toFixed(2)
}

// 获取总盈亏样式类
const getBalanceClass = () => {
    const total = logsList.value.reduce((sum, log) => sum + (log.profit || 0), 0)
    return total > 0 ? 'profit-positive' : (total < 0 ? 'profit-negative' : '')
}

// 格式化胜率
const formatWinRate = () => {
    if (logsList.value.length === 0) return '0.00%'
    
    const winCount = logsList.value.filter(log => (log.profit || 0) > 0).length
    const winRate = (winCount / logsList.value.length) * 100
    return winRate.toFixed(2) + '%'
}

// 左滑删除相关方法
const handleTouchStart = (e, logId) => {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    currentSwipeLogId.value = logId
}

const handleTouchMove = (e, logId) => {
    if (currentSwipeLogId.value !== logId) return
    
    const touchX = e.touches[0].clientX
    const touchY = e.touches[0].clientY
    const deltaX = touchX - touchStartX.value
    const deltaY = touchY - touchStartY.value
    
    // 判断是否为水平滑动（防止与垂直滚动冲突）
    if (Math.abs(deltaY) > Math.abs(deltaX)) return
    
    // 只允许向左滑动
    if (deltaX < 0) {
        const translateX = Math.max(deltaX * 0.5, -120) // 最大滑动120rpx
        
        if (!swipeStates.value[logId]) {
            swipeStates.value[logId] = {}
        }
        
        swipeStates.value[logId].translateX = translateX
        swipeStates.value[logId].showDelete = translateX < -30
    }
}

const handleTouchEnd = (e, logId) => {
    if (currentSwipeLogId.value !== logId) return
    
    const state = swipeStates.value[logId]
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
        resetSwipeState(logId)
    }
    
    currentSwipeLogId.value = null
}

const resetSwipeState = (logId) => {
    if (swipeStates.value[logId]) {
        swipeStates.value[logId].translateX = 0
        swipeStates.value[logId].showDelete = false
    }
}

const resetAllSwipeStates = () => {
    Object.keys(swipeStates.value).forEach(logId => {
        resetSwipeState(logId)
    })
}

// 确认删除交易日志
const confirmDeleteLog = (log) => {
    // 重置所有滑动状态
    resetAllSwipeStates()
    
    uni.showModal({
        title: '删除确认',
        content: `确定要删除这条交易记录吗？`,
        confirmColor: '#f56c6c',
        success: async (res) => {
            if (res.confirm) {
                await deleteLog(log.id)
            }
        }
    })
}

// 确认删除平仓记录
const confirmDeleteOutLog = (outLog) => {
    uni.showModal({
        title: '删除确认',
        content: `确定要删除这条平仓记录吗？`,
        confirmColor: '#f56c6c',
        success: async (res) => {
            if (res.confirm) {
                await deleteOutLog(outLog.id)
            }
        }
    })
}

// 删除交易日志
const deleteLog = async (id) => {
    if (!id) return
    
    uni.showLoading({
        title: '删除中...'
    })
    
    try {
        const res = await tradeApi.delLog(id)
        uni.hideLoading()
        
        if (res.code === 200 || res.code === '200') {
            uni.showToast({
                title: '删除成功',
                icon: 'success'
            })
            // 设置需要刷新商品数据标志
            constantsStore.needRefreshGoods = Math.random()
            // 刷新数据
            await Promise.all([fetchLogs(), fetchProfitData()])
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
        console.error('删除交易日志失败:', error)
    }
}

// 删除平仓记录
const deleteOutLog = async (id) => {
    if (!id) return
    
    uni.showLoading({
        title: '删除中...'
    })
    
    try {
        const res = await tradeApi.delOutLog(id)
        uni.hideLoading()
        
        if (res.code === 200 || res.code === '200') {
            uni.showToast({
                title: '删除成功',
                icon: 'success'
            })
            // 设置需要刷新商品数据标志
            constantsStore.needRefreshGoods = Math.random()
            // 刷新出场记录和盈亏数据
            await Promise.all([fetchOutLogs(logForm.id), fetchLogs(), fetchProfitData()])
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
        console.error('删除平仓记录失败:', error)
    }
}

// 编辑交易日志
const editLog = (log) => {
    console.log('编辑交易日志，log.inImgs:', log.inImgs)
    
    logForm.id = log.id // 设置ID，表示编辑
    logForm.inDesc = log.inDesc || ''
    logForm.inPrice = log.inPrice || ''
    logForm.isRise = log.isRise
    logForm.count = log.count || '' // 编辑时也设置手数
    
    // 处理已有的入场图片
    if (log.inImgs && Array.isArray(log.inImgs) && log.inImgs.length > 0) {
        // 如果是数组格式
        logForm.existingImgs = log.inImgs.map((url, index) => ({
            url: url,
            path: url,
            name: `existingImg_${log.id}_${index}.jpg`,
            isExisting: true
        }))
    } else if (log.inImgs && typeof log.inImgs === 'string') {
        // 如果是字符串格式
        try {
            // 尝试JSON解析
            const parsedImgs = JSON.parse(log.inImgs)
            if (Array.isArray(parsedImgs)) {
                logForm.existingImgs = parsedImgs.map((url, index) => ({
                    url: url,
                    path: url,
                    name: `existingImg_${log.id}_${index}.jpg`,
                    isExisting: true
                }))
            } else {
                logForm.existingImgs = []
            }
        } catch (e) {
            // JSON解析失败，使用正则表达式提取URL
            const urlRegex = /https?:\/\/[^\s"',\]]+/g
            const urls = log.inImgs.match(urlRegex) || []
            
            logForm.existingImgs = urls.map((url, index) => {
                const cleanUrl = url.replace(/[,\]"']+$/, '')
                return {
                    url: cleanUrl,
                    path: cleanUrl,
                    name: `existingImg_${log.id}_${index}.jpg`,
                    isExisting: true
                }
            })
        }
    } else {
        logForm.existingImgs = []
    }
    
    // 编辑模式下新增图片数组初始化为空
    logForm.addInImgs = []
    
    console.log('处理后的已有图片数组:', logForm.existingImgs)
    
    // 获取出场记录
    fetchOutLogs(log.id)
    
    isEditMode.value = true // 切换为编辑模式
    showLogModal.value = true
}

// 图片加载成功回调
const handleImageLoad = (src, index) => {
    console.log(`图片加载成功: ${src}, 索引: ${index}`);
};

// 图片加载失败回调
const handleImageError = (src, index) => {
    console.error(`图片加载失败: ${src}, 索引: ${index}`);
};

// 预览图片
const previewImage = (current, urls) => {
    uni.previewImage({
        urls: urls, // 所有图片的URL数组
        current: current, // 当前显示的图片URL
        success: (res) => {
            console.log('图片预览成功')
        },
        fail: (err) => {
            console.error('图片预览失败:', err)
            uni.showToast({
                title: '图片预览失败',
                icon: 'none'
            })
        }
    });
};

// 获取所有图片URL，用于预览
const getAllImageUrls = () => {
    const urls = [];
    logForm.existingImgs.forEach(img => urls.push(img.url));
    logForm.addInImgs.forEach(img => urls.push(img.url));
    return urls;
};

// 解析出场图片URL数组
const parseOutImages = (imgUrls) => {
    if (!imgUrls || typeof imgUrls !== 'string') return [];
    try {
        const parsedImgs = JSON.parse(imgUrls);
        if (Array.isArray(parsedImgs)) {
            return parsedImgs;
        }
    } catch (e) {
        console.error('解析出场图片URL失败:', e);
    }
    return [];
};

// 预览出场图片
const previewOutImage = (current, urls) => {
    uni.previewImage({
        urls: urls, // 所有图片的URL数组
        current: current, // 当前显示的图片URL
        success: (res) => {
            console.log('出场图片预览成功')
        },
        fail: (err) => {
            console.error('出场图片预览失败:', err)
            uni.showToast({
                title: '出场图片预览失败',
                icon: 'none'
            })
        }
    });
};

// 显示新增平仓记录弹窗
const showAddOutLogModal = () => {
    const remainingCount = parseInt(logForm.count) - totalOutCount.value
    
    console.log('显示新增平仓记录弹窗')
    console.log('入场手数:', logForm.count)
    console.log('已平仓手数:', totalOutCount.value)
    console.log('剩余未平仓手数:', remainingCount)
    
    // 初始化平仓记录表单
    outLogForm.id = null // 清空ID，表示新增
    outLogForm.tradeLogId = logForm.id
    outLogForm.count = ''
    outLogForm.outPrice = ''
    outLogForm.outDesc = ''
    outLogForm.existingImgs = []
    outLogForm.addOutImgs = []
    
    // 设置为新增模式
    isEditOutLogMode.value = false
    
    showOutLogModal.value = true
};

// 关闭新增平仓记录弹窗
const closeOutLogModal = () => {
    outLogModalClosing.value = true
    setTimeout(() => {
        showOutLogModal.value = false
        outLogModalClosing.value = false
        // 重置编辑状态
        isEditOutLogMode.value = false
        outLogForm.id = null
    }, 300) // 动画时长
}

// 判断是否可以保存平仓记录
const canSaveOutLog = computed(() => {
    const count = parseInt(outLogForm.count) || 0
    const outPrice = parseFloat(outLogForm.outPrice) || 0
    
    // 基本验证：手数和价格必须大于0
    if (count <= 0 || outPrice <= 0) {
        return false
    }
    
    // 如果是编辑模式，手数验证更宽松
    if (isEditOutLogMode.value) {
        // 编辑模式下，只要手数大于0就可以
        return true
    } else {
        // 新增模式下，需要验证剩余手数
        const remainingCount = parseInt(logForm.count) - totalOutCount.value
        return count <= remainingCount
    }
})



// 选择出场图片
const chooseOutImages = () => {
    uni.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            console.log('选择出场图片成功:', res.tempFilePaths)
            // 将选中的图片添加到新增图片数组中
            const newImages = res.tempFilePaths.map((path, index) => ({
                url: path, // 用于预览显示
                path: path, // 实际文件路径
                name: `outImg_${Date.now()}_${index}.jpg`,
                isExisting: false // 明确标记为新上传的图片
            }))
            outLogForm.addOutImgs = [...outLogForm.addOutImgs, ...newImages]
            console.log('当前新增出场图片数组:', outLogForm.addOutImgs)
        },
        fail: (error) => {
            console.error('选择出场图片失败:', error)
        }
    })
}

// 移除已有出场图片
const removeExistingOutImage = (index) => {
    outLogForm.existingImgs.splice(index, 1)
}

// 移除新增出场图片
const removeNewOutImage = (index) => {
    outLogForm.addOutImgs.splice(index, 1)
}

// 获取所有出场图片URL，用于预览
const getAllOutImageUrls = () => {
    const urls = [];
    outLogForm.existingImgs.forEach(img => urls.push(img.url));
    outLogForm.addOutImgs.forEach(img => urls.push(img.url));
    return urls;
};

// 保存平仓记录
const saveOutLog = async () => {
    if (!canSaveOutLog.value) {
        uni.showToast({
            title: '请填写必填项',
            icon: 'none'
        })
        return
    }

    // 验证平仓手数
    const count = parseInt(outLogForm.count) || 0
    
    // 编辑模式下的验证逻辑
    if (isEditOutLogMode.value) {
        // 编辑模式下，只需要验证手数大于0
        if (count <= 0) {
            uni.showToast({
                title: '手数必须大于0',
                icon: 'none'
            })
            return
        }
    } else {
        // 新增模式下的验证逻辑
        const remainingCount = parseInt(logForm.count) - totalOutCount.value
        if (count <= 0 || count > remainingCount) {
            uni.showToast({
                title: `平仓手数必须在1-${remainingCount}之间`,
                icon: 'none'
            })
            return
        }
    }

    uni.showLoading({
        title: '保存中...'
    })

    try {
        console.log('开始保存平仓记录')
        console.log('表单数据:', outLogForm)
        
        // 构建表单数据
        const data = {
            count: count,
            outPrice: parseFloat(outLogForm.outPrice),
            outDesc: outLogForm.outDesc.trim() || '',
        }
        
        // 根据编辑模式设置不同的参数
        if (isEditOutLogMode.value) {
            // 编辑模式：传递出场记录ID
            data.tradeLogOutId = outLogForm.id
        } else {
            // 新增模式：传递入场记录ID
            data.tradeLogId = outLogForm.tradeLogId
        }
        
        // 处理出场图片 - 根据环境选择处理方式
        if (outLogForm.addOutImgs && outLogForm.addOutImgs.length > 0) {
            console.log('处理新增出场图片:', outLogForm.addOutImgs.length, '张')
            
            // #ifdef H5
            // H5环境需要转换为File对象
            const outImgFiles = []
            for (let i = 0; i < outLogForm.addOutImgs.length; i++) {
                const img = outLogForm.addOutImgs[i]
                const fileName = img.name || `outImg_${Date.now()}_${i}.jpg`
                
                const fileObj = await createFileFromPath(img.path || img.url, fileName, false)
                if (fileObj) {
                    outImgFiles.push(fileObj)
                    console.log('成功创建新增出场图片文件对象:', fileName, fileObj.size, 'bytes')
                } else {
                    console.warn('跳过无法转换的新增出场图片:', img.path || img.url)
                }
            }
            
            if (outImgFiles.length > 0) {
                data.addOutImgs = outImgFiles
                console.log('新上传的出场图片文件对象数组:', data.addOutImgs)
            }
            // #endif
            
            // #ifdef MP || APP-PLUS
            // iOS/小程序环境不需要转换，直接标记有文件
            data.hasOutImgs = true
            console.log('iOS/小程序环境，标记有出场图片文件')
            // #endif
        }
        
        // 处理已有出场图片 - 生成JSON格式字符串
        if (isEditOutLogMode.value && outLogForm.existingImgs && outLogForm.existingImgs.length > 0) {
            const existingImgUrls = outLogForm.existingImgs.map(img => img.url)
            data.outImgs = JSON.stringify(existingImgUrls)
            console.log('已有出场图片JSON字符串:', data.outImgs)
        } else if (isEditOutLogMode.value) {
            // 编辑模式下如果没有已有图片，传空数组的JSON字符串
            data.outImgs = JSON.stringify([])
            console.log('已有出场图片为空，传递空数组JSON字符串')
        }
        
        console.log('最终发送的平仓数据:', data)

        // 完全参考 saveLog 的处理方式：检查是否有文件需要上传
        const hasFiles = (outLogForm.addOutImgs && outLogForm.addOutImgs.length > 0) || data.hasOutImgs
        console.log('是否有文件需要上传:', hasFiles)
        
        // 确定请求URL
        const url = isEditOutLogMode.value 
            ? `${baseURL_}/trade/updOutLog`
            : `${baseURL_}/trade/addOutLog`
        
        let res
        
        if (hasFiles) {
            // 有文件，支持多文件上传
            console.log('有文件，准备上传多个出场图片:', outLogForm.addOutImgs.length, '张')
            
            // 使用条件编译处理不同环境
            // #ifdef H5
            // H5环境使用fetch，完全支持FormData的多文件
            console.log('H5环境，使用fetch上传多个出场图片');
            
            // 创建FormData以支持多个同名文件参数
            const formData = new FormData();
            
            // 添加基本参数
            if (data.tradeLogId) {
                formData.append('tradeLogId', data.tradeLogId.toString());
            }
            if (data.tradeLogOutId) {
                formData.append('tradeLogOutId', data.tradeLogOutId.toString());
            }
            formData.append('count', data.count.toString());
            formData.append('outPrice', data.outPrice.toString());
            formData.append('outDesc', data.outDesc || '');
            formData.append('outImgs', data.outImgs || '');
            
            // 添加多个同名文件参数 - 这样后端就能接收到MultipartFile[]数组
            for (let i = 0; i < data.addOutImgs.length; i++) {
                const fileObj = data.addOutImgs[i];
                formData.append('addOutImgs', fileObj, fileObj.name);
                console.log('添加出场图片到FormData (同名参数):', fileObj.name, fileObj.size, 'bytes');
            }
            
            // 检查FormData内容
            console.log('FormData包含的字段:');
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1] instanceof File ? `文件: ${pair[1].name}` : pair[1]);
            }
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: userStore.userInfo.authorization
                        ? `Bearer ${userStore.userInfo.authorization}`
                        : ''
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            res = await response.json();
            console.log('H5出场图片上传结果:', res);
            // #endif
            
            // #ifdef MP || APP-PLUS
            // 小程序/APP环境，处理多文件上传逻辑
            console.log('小程序/APP环境，准备上传', outLogForm.addOutImgs.length, '张出场图片');
            
            // Step 1: 先用第一张图片调用addOutLog或updOutLog接口
            const firstFile = outLogForm.addOutImgs[0];
            const firstFilePath = firstFile.path || firstFile.url;
            
            const firstRequestData = {
                count: data.count.toString(),
                outPrice: data.outPrice.toString(),
                outDesc: data.outDesc || '',
                outImgs: data.outImgs || ''
            };
            
            if (data.tradeLogId) {
                firstRequestData.tradeLogId = data.tradeLogId.toString();
            }
            if (data.tradeLogOutId) {
                firstRequestData.tradeLogOutId = data.tradeLogOutId.toString();
            }
            
            console.log('Step 1: 上传第一张出场图片，调用', isEditOutLogMode.value ? 'updOutLog' : 'addOutLog');
            console.log('第一张出场图片路径:', firstFilePath);
            console.log('第一张出场图片请求参数:', firstRequestData);
            
            res = await new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: url, // addOutLog 或 updOutLog
                    filePath: firstFilePath,
                    name: 'addOutImgs',
                    formData: firstRequestData,
                    header: {
                        Authorization: userStore.userInfo.authorization
                            ? `Bearer ${userStore.userInfo.authorization}`
                            : ''
                    },
                    success: (uploadRes) => {
                        console.log('第一张出场图片上传结果:', uploadRes);
                        try {
                            const responseData = typeof uploadRes.data === 'string' 
                                ? JSON.parse(uploadRes.data) 
                                : uploadRes.data;
                                
                            console.log('解析后的第一张出场图片上传结果:', responseData);
                            
                            if (responseData && (responseData.code == 200 || responseData.code == '200')) {
                                resolve(responseData);
                            } else {
                                reject(new Error(responseData?.msg || responseData?.message || '第一张出场图片上传失败'));
                            }
                        } catch (e) {
                            reject(new Error('解析第一张出场图片响应失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('第一张出场图片上传失败:', err);
                        reject(err);
                    }
                });
            });
            
            // Step 2: 如果有多张图片且第一张上传成功，依次追加剩余出场图片
            if (outLogForm.addOutImgs.length > 1 && res && (res.code == 200 || res.code == '200')) {
                console.log('Step 2: 继续上传剩余', outLogForm.addOutImgs.length - 1, '张出场图片');
                
                // 获取平仓记录ID
                let outRecordId;
                if (isEditOutLogMode.value) {
                    // 编辑模式：直接使用传入的平仓记录ID
                    outRecordId = data.tradeLogOutId;
                } else {
                    // 新增模式：从返回结果中获取新创建的平仓记录ID
                    outRecordId = res.data || res.message;
                }
                console.log('获取到的平仓记录ID:', outRecordId);
                
                if (!outRecordId) {
                    console.warn('无法获取平仓记录ID，跳过剩余图片上传');
                } else {
                    // 确定后续请求使用的接口URL
                    const additionalUrl = isEditOutLogMode.value 
                        ? `${baseURL_}/trade/updOutLog`   // 编辑模式使用updOutLog
                        : `${baseURL_}/trade/addOutLog`;  // 新增模式使用addOutLog
                    
                    // 依次上传剩余图片，设置isUpload=true
                    for (let i = 1; i < outLogForm.addOutImgs.length; i++) {
                        const additionalFile = outLogForm.addOutImgs[i];
                        const additionalFilePath = additionalFile.path || additionalFile.url;
                        
                        console.log(`Step 2.${i}: 上传第${i + 1}张出场图片，调用${isEditOutLogMode.value ? 'updOutLog' : 'addOutLog'}接口，isUpload=true`);
                        console.log('出场图片路径:', additionalFilePath);
                        
                        const additionalRequestData = {
                            count: data.count.toString(),
                            outPrice: data.outPrice.toString(),
                            outDesc: data.outDesc || '',
                            outImgs: data.outImgs || '',
                            isUpload: 'true' // 关键参数：标识这是追加图片
                        };
                        
                        // 根据模式设置不同的ID参数
                        if (isEditOutLogMode.value) {
                            // 编辑模式：使用tradeLogOutId参数
                            additionalRequestData.tradeLogOutId = outRecordId.toString();
                        } else {
                            // 新增模式：使用tradeLogId参数，但实际传的是平仓记录ID
                            additionalRequestData.tradeLogId = outRecordId.toString();
                        }
                        
                        try {
                            const additionalRes = await new Promise((resolve, reject) => {
                                uni.uploadFile({
                                    url: additionalUrl, // 根据模式选择接口
                                    filePath: additionalFilePath,
                                    name: 'addOutImgs',
                                    formData: additionalRequestData,
                                    header: {
                                        Authorization: userStore.userInfo.authorization
                                            ? `Bearer ${userStore.userInfo.authorization}`
                                            : ''
                                    },
                                    success: (uploadRes) => {
                                        console.log(`第${i + 1}张出场图片上传结果:`, uploadRes);
                                        try {
                                            const responseData = typeof uploadRes.data === 'string' 
                                                ? JSON.parse(uploadRes.data) 
                                                : uploadRes.data;
                                                
                                            if (responseData && (responseData.code == 200 || responseData.code == '200')) {
                                                resolve(responseData);
                                            } else {
                                                reject(new Error(responseData?.msg || responseData?.message || `第${i + 1}张出场图片上传失败`));
                                            }
                                        } catch (e) {
                                            reject(new Error(`解析第${i + 1}张出场图片响应失败`));
                                        }
                                    },
                                    fail: (err) => {
                                        console.error(`第${i + 1}张出场图片上传失败:`, err);
                                        reject(err);
                                    }
                                });
                            });
                            
                            console.log(`第${i + 1}张出场图片上传成功`);
                        } catch (error) {
                            console.error(`第${i + 1}张出场图片上传失败:`, error);
                            // 不中断流程，继续上传下一张
                        }
                    }
                    
                    console.log('所有出场图片上传完成');
                }
            }
            // #endif
        } else {
            // 无文件，使用普通请求，完全参考 saveLog 接口
            console.log('无文件，使用普通请求')
            
            res = await new Promise((resolve, reject) => {
                uni.request({
                    url: url,
                    method: 'POST',
                    data: data,
                    header: {
                        // 使用表单格式，完全参考 saveLog 接口
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': userStore.userInfo.authorization
                            ? `Bearer ${userStore.userInfo.authorization}`
                            : ''
                    },
                    success: (res) => {
                        console.log('请求结果:', res);
                        // 兼容字符串和数字格式的code
                        if (res.statusCode === 200 && (res.data.code === 200 || res.data.code === '200')) {
                            resolve(res.data);
                        } else {
                            console.error('请求失败:', res.data);
                            reject(new Error(res.data?.msg || res.data?.message || '请求失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('请求失败:', err);
                        reject(err);
                    }
                });
            });
        }
        
        uni.hideLoading()
        
        console.log('保存平仓记录响应:', res)
        
        if (res.code === 200 || res.code === '200') {
            uni.showToast({
                title: isEditOutLogMode.value ? '平仓记录更新成功' : '平仓记录添加成功',
                icon: 'success'
            })
            closeOutLogModal()
            // 设置需要刷新商品数据标志
            constantsStore.needRefreshGoods = Math.random()
            // 重新获取出场记录和盈亏数据
            await Promise.all([fetchOutLogs(logForm.id), fetchLogs(), fetchProfitData()])
        } else {
            uni.showToast({
                title: res.message || (isEditOutLogMode.value ? '平仓记录更新失败' : '平仓记录添加失败'),
                icon: 'none'
            })
        }
    } catch (error) {
        uni.hideLoading()
        console.error('保存平仓记录异常:', error)
        uni.showToast({
            title: '平仓记录添加失败',
            icon: 'none'
        })
    }
}

// 正确使用 onLoad 获取页面参数
onLoad((options) => {
    console.log('页面参数:', options)
    
    // 获取页面参数
    goodsInfo.id = options.goodsId || ''
    goodsInfo.name = decodeURIComponent(options.goodsName || '')
    goodsInfo.code = decodeURIComponent(options.goodsCode || '')
    
    console.log('解析后的商品信息:', goodsInfo)
    
    // 设置导航栏标题
    uni.setNavigationBarTitle({
        title: goodsInfo.name || '交易日志'
    })
    })

onMounted(() => {
    // 确保用户数据已初始化
    userStore.initUserInfo()
    
    // 加载数据
    Promise.all([fetchProfitData(), fetchLogs()])
})



// 处理平仓手数输入失焦
const handleOutCountBlur = (e) => {
    const inputValue = outLogForm.count // 直接使用绑定的值
    const maxCount = parseInt(logForm.count) - totalOutCount.value
    
    console.log('失焦检查 - 当前值:', inputValue, '最大值:', maxCount)
    
    // 如果输入值为空，直接返回
    if (!inputValue || inputValue === '') {
        return
    }
    
    // 转换为数字
    const countValue = parseInt(inputValue)
    
    // 如果不是有效数字，清空
    if (isNaN(countValue) || countValue <= 0) {
        outLogForm.count = ''
        return
    }
    
    // 如果超过最大值，自动设置为最大值
    if (countValue > maxCount && maxCount > 0) {
        console.log('失焦时超过最大值，强制设置为:', maxCount)
        outLogForm.count = maxCount.toString()
        
        // 使用nextTick确保DOM更新
        nextTick(() => {
            uni.showToast({
                title: `已自动调整为最大可平仓手数${maxCount}手`,
                icon: 'none',
                duration: 2000
            })
        })
    }
}

// 监听平仓手数变化，实时检测
watch(() => outLogForm.count, (newValue) => {
    if (!newValue || newValue === '') return
    
    const maxCount = parseInt(logForm.count) - totalOutCount.value
    const countValue = parseInt(newValue)
    
    console.log('实时监听 - 新值:', newValue, '最大值:', maxCount)
    
    // 如果超过最大值，延迟一点时间再调整（避免输入过程中频繁调整）
    if (countValue > maxCount && maxCount > 0) {
        setTimeout(() => {
            // 再次检查，确保用户还没有继续输入
            if (parseInt(outLogForm.count) > maxCount) {
                console.log('实时检测超过最大值，调整为:', maxCount)
                outLogForm.count = maxCount.toString()
                uni.showToast({
                    title: `最多只能平仓${maxCount}手`,
                    icon: 'none',
                    duration: 1500
                })
            }
        }, 500) // 延迟500ms
    }
}, { immediate: false })

// 编辑出场记录
const editOutLog = (outLog) => {
    console.log('编辑出场记录:', outLog)
    
    // 设置编辑模式
    isEditOutLogMode.value = true
    
    // 填充表单数据
    outLogForm.id = outLog.id
    outLogForm.tradeLogId = outLog.tradeLogId
    outLogForm.count = outLog.count.toString()
    outLogForm.outPrice = outLog.outPrice ? outLog.outPrice.toString() : ''
    outLogForm.outDesc = outLog.outDesc || ''
    
    // 处理已有的出场图片
    if (outLog.outImgs) {
        try {
            const parsedImgs = JSON.parse(outLog.outImgs)
            if (Array.isArray(parsedImgs)) {
                outLogForm.existingImgs = parsedImgs.map((url, index) => ({
                    url: url,
                    path: url,
                    name: `existingOutImg_${outLog.id}_${index}.jpg`,
                    isExisting: true
                }))
            } else {
                outLogForm.existingImgs = []
            }
        } catch (e) {
            console.error('解析出场图片失败:', e)
            outLogForm.existingImgs = []
        }
    } else {
        outLogForm.existingImgs = []
    }
    
    // 清空新增图片
    outLogForm.addOutImgs = []
    
    // 显示弹窗
    showOutLogModal.value = true
}

// 查看日志详情
const viewLogDetail = (log) => {
    console.log('查看日志详情:', log)
    
    // 设置当前查看的日志数据
    viewingLog.value = { ...log }
    
    // 获取该日志的出场记录
    fetchOutLogs(log.id)
    
    // 显示详情弹窗
    showLogDetailModal.value = true
}

// 关闭日志详情弹窗
const closeLogDetailModal = () => {
    logDetailModalClosing.value = true
    setTimeout(() => {
        showLogDetailModal.value = false
        logDetailModalClosing.value = false
        viewingLog.value = null
    }, 300) // 动画时长
}

// 解析入场图片URL数组
const parseInImages = (imgUrls) => {
    if (!imgUrls) return [];
    
    // 如果已经是数组，直接返回
    if (Array.isArray(imgUrls)) {
        return imgUrls;
    }
    
    // 如果是字符串，尝试解析
    if (typeof imgUrls === 'string') {
        try {
            const parsedImgs = JSON.parse(imgUrls);
            if (Array.isArray(parsedImgs)) {
                return parsedImgs;
            }
        } catch (e) {
            console.error('解析入场图片URL失败:', e);
            // 如果JSON解析失败，尝试用正则表达式提取URL
            const urlRegex = /https?:\/\/[^\s"',\]]+/g
            const urls = imgUrls.match(urlRegex) || []
            return urls.map(url => url.replace(/[,\]"']+$/, ''))
        }
    }
    
    return [];
};

// 获取某个交易日志的出场记录
const getLogOutRecords = async (logId) => {
    try {
        const res = await tradeApi.queryOutLog(logId)
        if (res.code === 200 || res.code === '200') {
            return res.data || []
        }
    } catch (error) {
        console.error('获取出场记录失败:', error)
    }
    return []
}

// 计算未平手数
const getUnClosedCount = (log, outRecords = []) => {
    const totalCount = log.count || 0
    const outCount = outRecords.reduce((sum, record) => sum + (record.count || 0), 0)
    return totalCount - outCount
}

// 计算持仓时间
const getHoldingTime = (log, outRecords = []) => {
    // 处理入场时间，确保正确解析
    let createTime
    if (typeof log.createTime === 'number') {
        createTime = new Date(log.createTime)
    } else if (typeof log.createTime === 'string') {
        createTime = new Date(log.createTime)
    } else {
        createTime = new Date(log.createTime)
    }
    
    const unClosedCount = getUnClosedCount(log, outRecords)
    
    console.log(`[持仓时间计算] 日志ID: ${log.id}, 入场时间: ${log.createTime} -> ${createTime}, 未平手数: ${unClosedCount}`)
    
    let endTime
    if (unClosedCount > 0 || outRecords.length === 0) {
        // 有未平仓或无出场记录，使用当前时间
        endTime = new Date()
        console.log(`[持仓时间计算] 使用当前时间: ${endTime}`)
    } else {
        // 已完全平仓，使用最晚的平仓时间
        const validOutTimes = []
        
        outRecords.forEach((record, index) => {
            let outTime
            if (typeof record.createTime === 'number') {
                outTime = new Date(record.createTime)
            } else if (typeof record.createTime === 'string') {
                outTime = new Date(record.createTime)
            } else {
                outTime = new Date(record.createTime)
            }
            
            console.log(`[持仓时间计算] 出场记录${index + 1}: ${record.createTime} -> ${outTime}`)
            
            if (!isNaN(outTime.getTime())) {
                validOutTimes.push(outTime.getTime())
            }
        })
        
        if (validOutTimes.length > 0) {
            const latestOutTime = Math.max(...validOutTimes)
            endTime = new Date(latestOutTime)
            console.log(`[持仓时间计算] 使用最晚平仓时间: ${endTime}`)
        } else {
            // 如果没有有效的出场时间，使用当前时间
            endTime = new Date()
            console.log(`[持仓时间计算] 无有效出场时间，使用当前时间: ${endTime}`)
        }
    }
    
    const diffMs = endTime.getTime() - createTime.getTime()
    
    // 确保时间差为正数
    if (diffMs < 0) {
        console.warn(`[持仓时间计算] 时间差为负数: ${diffMs}ms，使用绝对值`)
        // 使用绝对值计算
        const absDiffMs = Math.abs(diffMs)
        const diffHours = Math.floor(absDiffMs / (1000 * 60 * 60))
        const diffMinutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60))
        
        return {
            hours: diffHours,
            minutes: diffMinutes,
            isOpen: unClosedCount > 0
        }
    }
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    console.log(`[持仓时间计算] 时间差: ${diffMs}ms -> ${diffHours}h${diffMinutes}m`)
    
    return {
        hours: diffHours,
        minutes: diffMinutes,
        isOpen: unClosedCount > 0 // 是否还有未平仓
    }
}

// 格式化持仓时间
const formatHoldingTime = (timeInfo) => {
    return `${timeInfo.hours}h${timeInfo.minutes}m`
}

// 缓存各个日志的出场记录
const logOutRecordsCache = ref(new Map())

// 存储所有日志的摘要信息
const logSummaries = ref(new Map())

// 获取日志摘要信息
const getLogSummary = async (log) => {
    let outRecords = logOutRecordsCache.value.get(log.id)
    if (!outRecords) {
        outRecords = await getLogOutRecords(log.id)
        logOutRecordsCache.value.set(log.id, outRecords)
    }
    
    const unClosedCount = getUnClosedCount(log, outRecords)
    const holdingTime = getHoldingTime(log, outRecords)
    
    return {
        entryPrice: log.inPrice || 0,
        totalCount: log.count || 0,
        unClosedCount,
        holdingTime: formatHoldingTime(holdingTime),
        isOpen: holdingTime.isOpen
    }
}

</script>

<style lang="scss" scoped>
.log-detail-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
}

.log-detail-container::before {
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
    
    .nav-center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        margin-left: -60rpx; /* 往左偏移，与下方内容对齐 */
        
        .profit-text {
            color: #fff;
            font-size: 32rpx;
            font-weight: 600;
            text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
            white-space: nowrap; /* 防止换行 */
            text-align: center; /* 文本居中 */
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

.log-content {
    padding: 0; /* 去掉内边距，因为列表现在是固定定位 */
    margin-top: 0; /* 去掉上边距 */
    position: relative;
    z-index: 10;
}

.logs-list {
    position: fixed; /* 使用固定定位 */
    top: 160rpx; /* 设置顶部位置，避免覆盖导航栏 */
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

.list-header {
    display: flex;
    padding: 20rpx 30rpx; /* 增加左右内边距 */
    border-bottom: none; /* 去掉边框 */
    background: transparent; /* 去掉背景 */
    backdrop-filter: none; /* 去掉毛玻璃效果 */
    margin-bottom: 10rpx; /* 添加下边距 */
    border-radius: 0; /* 去掉圆角 */
    
    .header-item {
        font-size: 26rpx;
        color: rgba(255, 255, 255, 0.9); /* 改为白色文字 */
        font-weight: 500;
        
        &.date {
            width: 25%;
            text-align: left;
        }
        
        &.info {
            width: 60%;
            text-align: left;
            padding-left: 10rpx;
        }
        
        &.profit {
            width: 15%;
            text-align: center;
        }
    }
}

.logs-container {
    .log-swipe-container {
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
    
    .log-swipe-wrapper {
        display: flex;
        align-items: stretch;
        position: relative;
        width: 100%;
        min-height: 120rpx;
    }
    
    .log-item {
        display: flex;
        flex-direction: column;
        padding: 25rpx 30rpx; /* 增加左右内边距 */
        background-color: transparent; /* 去掉背景色 */
        transition: transform 0.3s ease;
        position: relative;
        z-index: 2;
        width: 100%;
        
        &:active {
            background-color: rgba(0, 0, 0, 0.03);
        }
    }
    
    .log-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 10rpx 0;
    }
    
    .log-date-col {
        flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        
        .log-date {
            font-size: 24rpx;
            color: #333;
            font-weight: 500;
        }
    }
    
    .log-info-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        padding: 0 20rpx;
        
        .log-summary {
            display: flex;
            flex-direction: column;
            gap: 6rpx;
            
            &.loading {
                justify-content: center;
                align-items: center;
                min-height: 60rpx;
                
                .loading-text {
                    font-size: 24rpx;
                    color: #999;
                }
            }
            
            .summary-row {
                display: flex;
                gap: 20rpx;
                align-items: center;
                flex-wrap: wrap;
                
                .summary-item {
                    font-size: 24rpx;
                    color: #333;
                    font-weight: 500;
                    
                    &.unclosed-text {
                        color: #4cd964; /* 未平手数显示绿色 */
                        font-weight: 600;
                    }
                    
                    &.holding-open {
                        color: #4cd964; /* 持仓中的时间显示绿色 */
                        font-weight: 600;
                    }
                }
            }
        }
    }
    
    .log-profit-col {
        flex: 0 0 12%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .log-profit {
            font-size: 24rpx;
            font-weight: 600;
            
            &.profit-positive {
                color: #ff4757; /* 盈利为红色 */
            }
            
            &.profit-negative {
                color: #4cd964; /* 亏损为绿色 */
            }
        }
    }

    .edit-icon {
        flex: 0 0 44rpx;
        height: 44rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10rpx;
        
        &:active {
            opacity: 0.7;
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
        border-radius: 0 15rpx 15rpx 0;
        z-index: 1;
        
        &:active {
            background: #e84057;
        }
    }
}

/* 添加交易日志按钮样式 */
.add-log-container {
    position: fixed;
    bottom: 40rpx;
    left: 30rpx;
    right: 30rpx;
    z-index: 95;
}

.add-log-btn {
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

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 500;
    backdrop-filter: blur(10px);
}

.log-modal {
    width: 90%;
    max-height: 90%;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: modalFadeIn 0.3s ease-out;
    position: relative;
    z-index: 500;

    &.closing {
        animation: modalFadeOut 0.3s ease-in forwards;
    }
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes modalFadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;
    background-color: #f8f8f8;
    position: relative;
    z-index: 1;

    .popup-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
    }

    .popup-close {
        padding: 10rpx;
        position: absolute;
        right: 30rpx;
        top: 50%;
        transform: translateY(-50%);
    }
}

.form-content {
    padding: 30rpx 40rpx 30rpx 30rpx; /* 增加右边距到40rpx */
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* 优化滚动 */
}

.input-group {
    margin-bottom: 25rpx;
    background: #f8f8f8;
    border-radius: 10rpx;
    padding: 20rpx 30rpx;
    border: 1rpx solid #eee;

    &.readonly {
        background: #f9f9f9;
        border: 1rpx solid #e0e0e0;
        
        .input-label {
            color: #666;
            margin-bottom: 15rpx;
            font-weight: 500;
        }
        
        .readonly-content {
            font-size: 32rpx;
            color: #333;
            padding: 15rpx 10rpx;
            border: 1rpx solid #e0e0e0;
            border-radius: 8rpx;
            background: #fff;
            min-height: 40rpx;
            line-height: 1.5;
            
            &.profit-positive {
                color: #ff4757; /* 盈利为红色 */
                font-weight: 600;
            }
            
            &.profit-negative {
                color: #4cd964; /* 亏损为绿色 */
                font-weight: 600;
            }
        }
    }

    .input-label {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 10rpx;
        display: flex;
        align-items: center;

        .required {
            color: #ff4757;
            margin-right: 5rpx;
        }
    }

    .log-input, .log-textarea {
        font-size: 32rpx;
        color: #333;
        padding: 0;
        border: none;
        background: none;
        width: 100%;
        box-sizing: border-box;
        line-height: 1.5;
        min-height: 40rpx; /* 确保最小高度 */
    }

    .log-textarea {
        min-height: 80rpx; /* 文本域最小高度 */
        padding-top: 5rpx;
        padding-bottom: 5rpx;
    }
    
    .radio-group {
        display: flex;
        gap: 30rpx;
        margin-top: 10rpx;
        
        .radio-item {
            display: flex;
            align-items: center;
            gap: 10rpx;
            cursor: pointer;
            
            .radio {
                width: 36rpx;
                height: 36rpx;
                border: 2rpx solid #ddd;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                
                &.checked {
                    border-color: #667eea;
                    background-color: #667eea;
                }
                
                .radio-inner {
                    width: 16rpx;
                    height: 16rpx;
                    border-radius: 50%;
                    background-color: #fff;
                }
            }
            
            .radio-text {
                font-size: 28rpx;
                color: #333;
            }
        }
    }

    .image-upload {
        display: flex;
        flex-direction: column;
        gap: 15rpx;
        margin-top: 10rpx;

        .image-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10rpx;
        }

        .upload-btn {
            width: 120rpx;
            height: 120rpx;
            background: #f8f8f8;
            border: 2rpx dashed #667eea;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;

            &:active {
                background: #f0f0f0;
                transform: scale(0.95);
            }
        }

        .image-item {
            position: relative;
            width: 120rpx;
            height: 120rpx;
            border-radius: 8rpx;
            overflow: hidden;
            border: 1rpx solid #eee;

            .preview-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                cursor: pointer;
                transition: transform 0.2s ease;
                
                &:active {
                    transform: scale(0.95);
                }
            }

            .delete-image {
                position: absolute;
                top: 5rpx;
                right: 5rpx;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                width: 40rpx;
                height: 40rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
            }
        }

        .no-images-tip {
            margin-top: 10rpx;
            padding: 20rpx;
            text-align: center;
            color: #999;
            font-size: 24rpx;
            background: #f9f9f9;
            border-radius: 8rpx;
        }
    }
}

.out-logs-section {
    margin-top: 20rpx;
    padding: 20rpx 30rpx;
    background: #f8f8f8;
    border-radius: 10rpx;
    border: 1rpx solid #eee;

    .section-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 15rpx;
        padding-bottom: 10rpx;
        border-bottom: 1rpx solid #eee;
    }

    .out-logs-list {
        display: flex;
        flex-direction: column;
        gap: 15rpx;
    }

    .out-log-item {
        background: #fff;
        border-radius: 10rpx;
        padding: 20rpx 30rpx;
        border: 1rpx solid #eee;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
        width: 100%; /* 确保宽度限制 */
        box-sizing: border-box; /* 包含padding和border */
        overflow: hidden; /* 隐藏溢出内容 */
    }
    
    .out-log-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10rpx;
        padding-bottom: 10rpx;
        border-bottom: 1rpx solid #eee;

        .out-log-date {
            font-size: 26rpx;
            color: #666;
        }

        .out-log-right {
            display: flex;
            align-items: center;
            gap: 10rpx;
            
            .out-log-profit {
                font-size: 28rpx;
                font-weight: bold;
                
                &.profit-positive {
                    color: #ff4757; /* 盈利为红色 */
                }
                
                &.profit-negative {
                    color: #4cd964; /* 亏损为绿色 */
                }
            }
            
            .out-edit-icon {
                width: 40rpx;
                height: 40rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10rpx;
                
                &:active {
                    opacity: 0.7;
                }
            }
            
            .out-delete-icon {
                width: 40rpx;
                height: 40rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10rpx;
                
                &:active {
                    opacity: 0.7;
                }
            }
        }
    }

    .out-log-content {
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        width: 100%; /* 确保宽度限制 */
        box-sizing: border-box; /* 包含padding和border */
        overflow: hidden; /* 隐藏溢出内容 */
    }

    .out-log-info {
        font-size: 24rpx;
        color: #333;
    }

    .out-log-desc {
        margin-top: 5rpx;
        
        .desc-text {
            font-size: 20rpx;
            color: #666;
            line-height: 1.4;
            word-wrap: break-word; /* 允许长单词换行 */
            word-break: break-all; /* 强制换行 */
            white-space: normal; /* 允许换行 */
            overflow-wrap: break-word; /* 现代浏览器的换行属性 */
            max-width: 100%; /* 确保不超出容器宽度 */
            display: block; /* 确保是块级元素 */
        }
    }

    .out-log-images {
        display: flex;
        flex-wrap: wrap;
        gap: 10rpx;
        margin-top: 10rpx;

        .out-images-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10rpx;
        }

        .out-image-item {
            position: relative;
            width: 120rpx;
            height: 120rpx;
            border-radius: 8rpx;
            overflow: hidden;
            border: 1rpx solid #eee;

            .out-preview-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                cursor: pointer;
                transition: transform 0.2s ease;
                
                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
    
    .add-out-log-item {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        border-radius: 10rpx;
        padding: 20rpx 30rpx;
        border: 1rpx dashed #667eea;
        
        .add-out-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            .remaining-info {
                display: flex;
                align-items: center;
                gap: 8rpx;
                
                .remaining-label {
                    font-size: 26rpx;
                    color: #666;
                }
                
                .remaining-count {
                    font-size: 28rpx;
                    font-weight: 600;
                    color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                    padding: 4rpx 12rpx;
                    border-radius: 12rpx;
                }
            }
            
            .inline-add-btn {
                display: flex;
                align-items: center;
                gap: 8rpx;
                padding: 12rpx 24rpx;
                background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); /* 改为绿色渐变 */
                border-radius: 20rpx;
                border: none;
                color: #fff;
                font-size: 26rpx;
                font-weight: 500;
                transition: all 0.2s ease;
                box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.4); /* 调整阴影为绿色 */
                
                &:active {
                    transform: scale(0.95);
                    box-shadow: 0 2rpx 6rpx rgba(76, 175, 80, 0.4);
                    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%); /* 按下时更深的绿色 */
                }
                
                .btn-text {
                    color: #fff;
                    font-size: 26rpx;
                }
            }
        }
    }
}

.loading-section {
    padding: 20rpx 0;
    text-align: center;
    color: #999;
    font-size: 28rpx;
}



.popup-actions {
    display: flex;
    justify-content: space-around;
    padding: 20rpx 30rpx;
    border-top: 1rpx solid #eee;
    background-color: #f8f8f8;

    .cancel-btn, .confirm-btn {
        flex: 1;
        padding: 20rpx 0;
        font-size: 32rpx;
        font-weight: 500;
        border-radius: 10rpx;
        border: none;
        transition: background 0.2s ease;
    }

    .cancel-btn {
        background: #eee;
        color: #333;
        margin-right: 20rpx;

        &:active {
            background: #ddd;
        }
    }

    .confirm-btn {
        background: #667eea;
        color: #fff;

        &:active {
            background: #5856d6;
        }
    }
}

.out-log-modal {
    width: 90%;
    max-height: 90%;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: modalFadeIn 0.3s ease-out;
    position: relative;
    z-index: 500;

    &.closing {
        animation: modalFadeOut 0.3s ease-in forwards;
    }
}

.input-hint {
    margin-top: 8rpx;
    
    .hint-text {
        font-size: 24rpx;
        color: #667eea;
        background: rgba(102, 126, 234, 0.1);
        padding: 6rpx 12rpx;
        border-radius: 12rpx;
        display: inline-block;
    }
}

.popup-actions {
    display: flex;
    justify-content: space-around;
    padding: 20rpx 30rpx;
    border-top: 1rpx solid #eee;
    background-color: #f8f8f8;

    .cancel-btn, .confirm-btn {
        flex: 1;
        padding: 20rpx 0;
        font-size: 32rpx;
        font-weight: 500;
        border-radius: 10rpx;
        border: none;
        transition: background 0.2s ease;
    }

    .cancel-btn {
        background: #eee;
        color: #333;
        margin-right: 20rpx;

        &:active {
            background: #ddd;
        }
    }

    .confirm-btn {
        background: #667eea;
        color: #fff;

        &:active {
            background: #5856d6;
        }
    }
}

.add-out-log-section {
    margin-top: 20rpx;
    padding: 20rpx 30rpx;
    background: #f8f8f8;
    border-radius: 10rpx;
    border: 1rpx solid #eee;
}
.input-group {
    margin-right: 55rpx;
}
.out-logs-section {
    margin-right: 55rpx;
}
.add-out-log-section {
    margin-right: 55rpx;
}



.readonly-images {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
    margin-top: 10rpx;

    .image-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10rpx;
    }

    .image-item {
        position: relative;
        width: 120rpx;
        height: 120rpx;
        border-radius: 8rpx;
        overflow: hidden;
        border: 1rpx solid #eee;

        .preview-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.2s ease;
            
            &:active {
                transform: scale(0.95);
            }
        }

        .delete-image {
            position: absolute;
            top: 5rpx;
            right: 5rpx;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            width: 40rpx;
            height: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
        }
    }

    .no-images-text {
        font-size: 24rpx;
        color: #999;
        padding: 10rpx;
        border: 1rpx dashed #eee;
        border-radius: 5rpx;
        background: #f9f9f9;
    }
}

.direction-tag {
    font-size: 24rpx;
    color: #fff;
    padding: 5rpx 10rpx;
    border-radius: 5rpx;

    &.rise {
        background: rgba(245, 63, 63, 0.9); /* 红色表示做多（红涨） */
    }

    &.fall {
        background: rgba(0, 180, 42, 0.9); /* 绿色表示做空（绿跌） */
    }
    
    // 新增的方向标签样式（用于卡片显示）
    &.direction-long {
        background: #f53f3f; /* 标准红色表示做多（红涨） */
        font-size: 20rpx;
        padding: 2rpx 6rpx;
        margin-left: 8rpx;
        border-radius: 3rpx;
        font-weight: 500;
    }
    
    &.direction-short {
        background: #00b42a; /* 标准绿色表示做空（绿跌） */
        font-size: 20rpx;
        padding: 2rpx 6rpx;
        margin-left: 8rpx;
        border-radius: 3rpx;
        font-weight: 500;
    }
}

.no-out-logs {
    padding: 100rpx 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent; /* 去掉半透明背景 */
    backdrop-filter: none; /* 去掉毛玻璃效果 */
    border-radius: 0; /* 去掉圆角 */
    margin: 0 20rpx; /* 调整左右边距，与卡片间距保持一致 */
    
    .no-out-logs-text {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.9); /* 改为白色文字 */
        margin-bottom: 10rpx;
    }
}

.loading-text {
    font-size: 28rpx;
    color: #fff;
}

.cancel-btn.full-width {
    width: 100%;
}

.out-log-modal {
    width: 90%;
    max-height: 90%;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: modalFadeIn 0.3s ease-out;
    position: relative;
    z-index: 500;

    &.closing {
        animation: modalFadeOut 0.3s ease-in forwards;
    }
}

.log-detail-view-modal {
    width: 95%;
    max-height: 95%;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: modalFadeIn 0.3s ease-out;
    position: relative;
    z-index: 500;

    &.closing {
        animation: modalFadeOut 0.3s ease-in forwards;
    }
}

.log-detail-view-modal .form-content {
    padding: 20rpx 25rpx; /* 详情查看弹窗使用更小的内边距 */
}

.log-detail-view-modal .input-group {
    margin-bottom: 15rpx; /* 减少间距 */
    padding: 15rpx 20rpx; /* 减少内边距 */
}

.log-detail-view-modal .input-group.readonly .input-label {
    margin-bottom: 10rpx; /* 减少标签下边距 */
    font-size: 26rpx; /* 稍微减小字体 */
}

.log-detail-view-modal .input-group.readonly .readonly-content {
    padding: 12rpx 8rpx; /* 减少内边距 */
    font-size: 30rpx; /* 稍微减小字体 */
}

.log-detail-view-modal .out-log-desc .desc-text {
    word-wrap: break-word; /* 允许长单词换行 */
    word-break: break-all; /* 强制换行 */
    white-space: normal; /* 允许换行 */
    overflow-wrap: break-word; /* 现代浏览器的换行属性 */
    max-width: 100%; /* 确保不超出容器宽度 */
}
</style>

