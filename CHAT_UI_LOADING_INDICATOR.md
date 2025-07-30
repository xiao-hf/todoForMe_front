# 聊天界面加载指示器实现

## 功能描述

在聊天界面中添加了一个会"呼吸"（大小变化）的小黑球，用于指示AI正在思考/生成回复中。该指示器具有以下特点：

1. 只在等待AI回复时显示（当最新一条消息是AI的空白消息且状态为loading）
2. 在AI开始返回内容后自动消失
3. 位于消息列表最下方，左侧对齐
4. 呈现黑色小圆点，有呼吸式的缩放动画效果

## 实现细节

### 1. 模板结构

在消息列表的scroll-view中添加了一个条件显示的指示器元素：

```vue
<!-- 等待AI回复的呼吸小黑球，当最后一条消息是AI消息且状态为loading时显示 -->
<view class="waiting-indicator" v-if="chatStore.currentMessages.length > 0 && 
     !chatStore.currentMessages[chatStore.currentMessages.length-1].isUser && 
     chatStore.currentMessages[chatStore.currentMessages.length-1].status === 'loading' && 
     chatStore.currentMessages[chatStore.currentMessages.length-1].content === ''">
    <view class="breathing-dot"></view>
</view>
```

### 2. 样式实现

使用CSS动画实现呼吸效果：

```scss
.waiting-indicator {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60rpx;
    padding-left: 30rpx;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
}

.breathing-dot {
    width: 16rpx;
    height: 16rpx;
    background-color: #000;
    border-radius: 50%;
    animation: breathe 1.5s infinite ease-in-out;
}

@keyframes breathe {
    0%, 100% {
        transform: scale(0.8);
        opacity: 0.6;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
}
```

### 3. 动画逻辑

- 小黑球通过CSS `@keyframes` 创建动画
- 动画持续1.5秒，无限循环
- 在动画的0%和100%位置，小球缩小到原始大小的80%，透明度为60%
- 在动画的50%位置，小球放大到原始大小的120%，透明度为100%
- 使用 `ease-in-out` 缓动函数使动画更加平滑

### 4. 显示/隐藏逻辑

小黑球只在以下所有条件都满足时显示：
1. 消息列表不为空
2. 最后一条消息是AI消息（非用户消息）
3. 最后一条消息状态为"loading"
4. 最后一条消息内容为空（还没有开始接收内容）

当AI开始返回内容时（即最后一条消息的content不再为空），小黑球会自动隐藏。

## 效果说明

用户发送消息后，系统会立即：
1. 添加一条用户消息
2. 添加一条空的AI消息（状态为loading）
3. 显示小黑球指示器
4. 开始请求AI响应

当AI开始返回内容时：
1. 消息内容开始填充
2. 小黑球自动消失

当响应完全结束时：
1. 消息状态从loading变为complete

## 测试要点

1. 发送消息后，确认小黑球正确显示
2. AI开始回复后，确认小黑球正确消失
3. 确认小黑球动画流畅，呼吸效果明显
4. 测试在不同设备上的表现 