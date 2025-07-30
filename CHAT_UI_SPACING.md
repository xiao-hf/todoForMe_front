# 聊天界面消息列表与输入框间距优化

## 改进内容

按照设计要求，将聊天界面中消息列表与输入框之间的间距减半，使界面更加紧凑，视觉效果更佳。

## 具体修改

### 1. 消息列表底部间距

消息列表的底部边距从原来的120rpx减半为60rpx：

```css
.message-list {
    /* 其他样式保持不变 */
    bottom: 60rpx; /* 原来是120rpx，减半为60rpx */
}
```

### 2. 输入框容器高度和内边距

输入框容器的最小高度和内边距也进行了相应调整：

```css
.input-container {
    padding: 10rpx 20rpx; /* 原来是20rpx，上下内边距减半 */
    /* 其他样式保持不变 */
    min-height: 60rpx; /* 原来是120rpx，减半 */
}
```

### 3. 响应式样式变量调整

为了保持在键盘弹出时界面布局的一致性，同步调整了响应式样式变量：

```javascript
// 初始样式对象
const messageListStyle = ref({
    bottom: '60rpx' // 原来是120rpx
});

// 重置键盘调整函数
const resetKeyboardAdjustment = () => {
    messageListStyle.value.bottom = '60rpx'; // 原来是120rpx
    inputContainerStyle.value.bottom = '0';
};

// 键盘弹出调整函数
const adjustForKeyboard = () => {
    // ...其他代码保持不变
    messageListStyle.value.bottom = `${keyboardHeight.value + uni.upx2px(60)}px`; // 原来是120rpx
    // ...其他代码保持不变
};
```

## 效果对比

### 修改前：
- 消息列表与输入框间距：120rpx
- 输入框容器内边距：20rpx
- 输入框最小高度：120rpx
- 视觉上空间较松散

### 修改后：
- 消息列表与输入框间距：60rpx
- 输入框容器内边距：10rpx 20rpx
- 输入框最小高度：60rpx
- 视觉上更加紧凑，信息密度更高

## 兼容性

此调整纯粹是UI层面的变更，不影响功能逻辑，兼容所有平台：
- iOS
- Android
- 小程序
- H5

## 注意事项

1. 输入框高度减小不会影响用户输入体验，输入框内部组件的尺寸保持不变
2. 键盘弹出时的布局仍然正常，间距保持一致性
3. 如果在某些特定设备上发现布局问题，可能需要进一步微调 