<template>
    <view class="setting-container">
        <!-- 背景图片 -->
        <image v-if="currentBackgroundImage" 
            :src="currentBackgroundImage" 
            class="background-image"
            mode="aspectFill"
            @error="handleImageError"
            @load="handleImageLoad">
        </image>
        
        <!-- 顶部导航栏 -->
        <view class="nav-header">
            <view class="nav-left">
                <view class="icon-wrapper">
                    <uni-icons type="back" size="24" color="#fff" @click="goBack"></uni-icons>
                </view>
            </view>
            <view class="nav-center">
                <text class="nav-title">AI设置</text>
            </view>
            <view class="nav-right">
                <!-- 空出位置保持对称 -->
            </view>
        </view>
        
        <!-- 设置内容区域 -->
        <scroll-view class="settings-content" scroll-y>
            <!-- 开发中提示 -->
            <view class="development-notice">
                <view class="notice-content">
                    <uni-icons type="info" size="24" color="#667eea"></uni-icons>
                    <text class="notice-text">该功能开发中，暂时只是演示</text>
                </view>
            </view>
            
            <!-- AI 参数设置区域 -->
            <view class="settings-section">
                <view class="section-title">基础设置</view>
                
                <!-- 温度设置 -->
                <view class="setting-item">
                    <view class="setting-label">
                        <text class="label-text">温度</text>
                        <text class="setting-value">{{ temperature }}</text>
                    </view>
                    <view class="slider-container">
                        <slider 
                            :value="temperature * 100" 
                            :min="0" 
                            :max="100" 
                            :step="1"
                            @change="handleTemperatureChange" 
                            activeColor="#667eea"
                            backgroundColor="#e0e0e0"
                            block-color="#667eea"
                        />
                    </view>
                    <view class="setting-description">
                        <text>控制输出的随机性，较高的值会使输出更加随机和创造性</text>
                    </view>
                </view>
                
                <!-- Top P设置 -->
                <view class="setting-item">
                    <view class="setting-label">
                        <text class="label-text">Top P</text>
                        <text class="setting-value">{{ topP }}</text>
                    </view>
                    <view class="slider-container">
                        <slider 
                            :value="topP * 100" 
                            :min="0" 
                            :max="100" 
                            :step="1"
                            @change="handleTopPChange" 
                            activeColor="#667eea"
                            backgroundColor="#e0e0e0"
                            block-color="#667eea"
                        />
                    </view>
                    <view class="setting-description">
                        <text>控制词汇多样性，较低的值使输出更加聚焦和确定</text>
                    </view>
                </view>
                
                <!-- Max Tokens设置 -->
                <view class="setting-item">
                    <view class="setting-label">
                        <text class="label-text">最大Tokens</text>
                        <text class="setting-value">{{ maxTokens }}</text>
                    </view>
                    <view class="slider-container">
                        <slider 
                            :value="maxTokens" 
                            :min="100" 
                            :max="4000" 
                            :step="100"
                            @change="handleMaxTokensChange" 
                            activeColor="#667eea"
                            backgroundColor="#e0e0e0"
                            block-color="#667eea"
                        />
                    </view>
                    <view class="setting-description">
                        <text>控制单次响应的最大长度</text>
                    </view>
                </view>
            </view>
            
            <!-- 模型选择区域 -->
            <view class="settings-section">
                <view class="section-title">模型选择</view>
                
                <radio-group @change="handleModelChange">
                    <view class="model-item" v-for="(model, index) in modelOptions" :key="index">
                        <view class="model-content">
                            <view class="model-info">
                                <text class="model-name">{{ model.name }}</text>
                                <text class="model-description">{{ model.description }}</text>
                            </view>
                            <radio :value="model.value" :checked="model.value === selectedModel" color="#667eea" />
                        </view>
                    </view>
                </radio-group>
            </view>
            
            <!-- 记忆设置区域 -->
            <view class="settings-section">
                <view class="section-title">记忆设置</view>
                
                <!-- 历史消息数量设置 -->
                <view class="setting-item">
                    <view class="setting-label">
                        <text class="label-text">记忆消息数</text>
                        <text class="setting-value">{{ historyLength }}</text>
                    </view>
                    <view class="slider-container">
                        <slider 
                            :value="historyLength" 
                            :min="1" 
                            :max="20" 
                            :step="1"
                            @change="handleHistoryLengthChange" 
                            activeColor="#667eea"
                            backgroundColor="#e0e0e0"
                            block-color="#667eea"
                        />
                    </view>
                    <view class="setting-description">
                        <text>AI能够记住的最近对话消息数量</text>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';

// 用户store
const userStore = useUserStore();

// 参数设置
const temperature = ref(0.7);
const topP = ref(0.9);
const maxTokens = ref(2000);
const historyLength = ref(10);
const selectedModel = ref('gpt-3.5-turbo');

// 模型选项
const modelOptions = [
    {
        name: 'GPT-3.5-Turbo',
        description: '平衡效率与性能的通用模型',
        value: 'gpt-3.5-turbo'
    },
    {
        name: 'GPT-4',
        description: '更强大的理解与推理能力，适合复杂任务',
        value: 'gpt-4'
    },
    {
        name: 'Claude-2',
        description: '更长的上下文记忆，适合长对话',
        value: 'claude-2'
    },
    {
        name: '自定义本地模型',
        description: '使用自部署的开源大语言模型',
        value: 'local-model'
    }
];

// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
    return userStore.userInfo.backgroudImg || '';
});

// 处理温度变化
const handleTemperatureChange = (e) => {
    temperature.value = (e.detail.value / 100).toFixed(2);
};

// 处理Top P变化
const handleTopPChange = (e) => {
    topP.value = (e.detail.value / 100).toFixed(2);
};

// 处理最大Tokens变化
const handleMaxTokensChange = (e) => {
    maxTokens.value = e.detail.value;
};

// 处理历史长度变化
const handleHistoryLengthChange = (e) => {
    historyLength.value = e.detail.value;
};

// 处理模型选择变化
const handleModelChange = (e) => {
    selectedModel.value = e.detail.value;
};

// 处理图片加载错误
const handleImageError = () => {
    console.log('背景图片加载失败');
};

// 处理图片加载成功
const handleImageLoad = () => {
    console.log('背景图片加载成功');
};

// 返回上一页
const goBack = () => {
    uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.setting-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
}

.setting-container::before {
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

.settings-content {
    position: fixed;
    top: 140rpx;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx 0;
    z-index: 10;
}

.development-notice {
    margin: 20rpx 30rpx 40rpx;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10rpx);
    border-radius: 16rpx;
    padding: 20rpx;
}

.notice-content {
    display: flex;
    align-items: center;
    gap: 10rpx;
    
    .notice-text {
        color: #fff;
        font-size: 28rpx;
        font-weight: 500;
    }
}

.settings-section {
    margin: 30rpx 30rpx 50rpx;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    padding: 10rpx 10rpx 30rpx;
    border-bottom: 1px solid #eee;
    margin-bottom: 20rpx;
}

.setting-item {
    margin-bottom: 40rpx;
    
    &:last-child {
        margin-bottom: 20rpx;
    }
}

.setting-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15rpx;
    
    .label-text {
        font-size: 28rpx;
        font-weight: 500;
        color: #333;
    }
    
    .setting-value {
        font-size: 28rpx;
        color: #667eea;
        font-weight: 600;
    }
}

.slider-container {
    margin: 10rpx 0;
}

.setting-description {
    font-size: 24rpx;
    color: #666;
    margin-top: 10rpx;
    line-height: 1.4;
}

.model-item {
    margin-bottom: 30rpx;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20rpx;
    
    &:last-child {
        border-bottom: none;
    }
}

.model-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.model-info {
    flex: 1;
}

.model-name {
    display: block;
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 5rpx;
}

.model-description {
    font-size: 24rpx;
    color: #666;
}
</style>
