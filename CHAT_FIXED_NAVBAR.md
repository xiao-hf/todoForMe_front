# 聊天界面导航栏修复

## 问题描述

在iOS设备上，当点击输入框弹出输入法时，整个页面被推上去，导致顶部导航栏消失。需要修复此问题，确保导航栏保持固定位置，只有消息列表区域随键盘弹出而调整。

## 解决方案

### 1. 固定整个页面容器

```css
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: rgb(255, 255, 255);
    position: fixed; /* 固定整个容器 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden; /* 防止内容溢出 */
}
```

### 2. 增强导航栏固定定位

给导航栏添加背景色和固定高度，确保在输入法弹出时也能保持可见：

```css
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
    background-color: rgb(255, 255, 255); /* 与页面背景相同的白色 */
    height: 180rpx; /* 固定高度，与message-list的top值相匹配 */
    box-sizing: border-box; /* 确保padding包含在高度内 */
}
```

### 3. 增强底部输入区域固定定位

```css
.input-container {
    padding: 30rpx 20rpx;
    background-color: rgb(255, 255, 255); /* 与页面背景相同的白色 */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 150rpx;
    display: flex;
    align-items: center;
    /* iOS安全区域适配 */
    padding-bottom: constant(safe-area-inset-bottom); /* iOS 11.0 */
    padding-bottom: env(safe-area-inset-bottom); /* iOS 11.2+ */
}
```

### 4. 禁用自动调整位置

在模板和输入框中禁用自动位置调整：

```vue
<!-- 容器禁用自动调整位置 -->
<view class="chat-container" 
    @touchstart="handleTouchStart" 
    @touchmove="handleTouchMove" 
    @touchend="handleTouchEnd"
    :adjustPosition="false">
    
<!-- 输入框禁用自动调整位置 -->
<input 
    class="message-input"
    ...
    :adjust-position="false"
    cursor-spacing="20"
/>
```

## 实现原理

1. **固定布局**：通过 `position: fixed` 将整个聊天界面、导航栏和输入区域固定在视口中，使其不受输入法弹出的影响。

2. **禁用自动调整**：禁用 uni-app 的自动位置调整功能，防止页面被自动推上去。

3. **背景色一致性**：为导航栏和输入区域添加与页面背景相同的白色背景，确保它们在任何时候都清晰可见。

4. **iOS安全区域适配**：通过 `safe-area-inset-bottom` 适配各种机型（特别是带有底部白条的iPhone），确保内容不被遮挡。

## 效果

- 输入法弹出时，导航栏保持在顶部固定位置
- 消息列表区域自动调整，避免被键盘遮挡
- 输入区域始终保持在键盘上方
- 界面布局稳定，不会跳动或错位

## 兼容性说明

此修复主要针对iOS设备，同时也兼容Android设备。对于特殊机型可能需要进一步调整。

## 参考资料

- [uni-app 输入框 组件参考](https://uniapp.dcloud.io/component/input.html)
- [iOS Safe Area Guide](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/) 