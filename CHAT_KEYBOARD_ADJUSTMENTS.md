# 聊天界面输入法弹出调整

## 功能需求

在iOS设备上，当键盘弹出时，实现以下效果：
1. 顶部导航栏保持固定位置不动
2. 消息列表区域上移，避开键盘
3. 输入框上移到键盘上方
4. 保持整体布局流畅自然

## 实现方案

### 1. 启用位置自动调整

在输入框上启用自动位置调整功能：

```vue
<input 
    class="message-input" 
    :adjust-position="true"
    cursor-spacing="20"
/>
```

### 2. 创建响应式样式变量

```javascript
// 创建响应式的样式对象
const messageListStyle = ref({
    bottom: '120rpx'
});

const inputContainerStyle = ref({
    bottom: '0'
});
```

### 3. 监听键盘高度变化

```javascript
// 添加键盘高度变化监听
const keyboardHeight = ref(0);

uni.onKeyboardHeightChange((res) => {
    console.log('键盘高度变化:', res.height);
    keyboardHeight.value = res.height;
    
    if (res.height > 0) {
        // 键盘弹出
        adjustForKeyboard();
        // 滚动到底部
        setTimeout(() => {
            scrollToBottom();
        }, 300);
    } else {
        // 键盘收起
        resetKeyboardAdjustment();
    }
});
```

### 4. 键盘高度处理函数

```javascript
// 处理键盘弹出的函数
const adjustForKeyboard = () => {
    if (keyboardHeight.value <= 0) return;
    
    // 设置底部距离
    uni.getSystemInfo({
        success: (sysInfo) => {
            // 设置样式变量，页面会响应式更新
            messageListStyle.value.bottom = `${keyboardHeight.value + uni.upx2px(120)}px`;
            inputContainerStyle.value.bottom = `${keyboardHeight.value}px`;
        }
    });
};

// 重置键盘调整
const resetKeyboardAdjustment = () => {
    messageListStyle.value.bottom = '120rpx';
    inputContainerStyle.value.bottom = '0';
};
```

### 5. 在模板中应用样式

```vue
<scroll-view 
    class="message-list" 
    :style="messageListStyle"
    ...其他属性
>
</scroll-view>

<view class="input-container" :style="inputContainerStyle">
    <!-- 输入框内容 -->
</view>
```

### 6. CSS布局优化

#### 导航栏固定定位

```css
.nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgb(255, 255, 255);
    height: 180rpx;
    box-sizing: border-box;
}
```

#### 消息列表使用绝对定位

```css
.message-list {
    position: absolute;
    top: 180rpx;
    bottom: 120rpx;
    left: 0;
    right: 0;
    z-index: 5;
    background-color: transparent;
}
```

#### 输入框添加过渡动画

```css
.input-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    transition: transform 0.3s;
    background-color: rgb(255, 255, 255);
}
```

## 实现效果

1. 键盘弹出时：
   - 导航栏保持在顶部不动
   - 消息列表上移到键盘上方的适当位置
   - 输入框上移到键盘正上方
   - 焦点自动滚动到最新消息

2. 键盘收起时：
   - 消息列表恢复原位
   - 输入框恢复到底部
   - 布局回到初始状态

## 兼容性注意事项

- 此方案主要针对iOS设备调整
- Android设备通常会自动处理键盘弹出的布局调整
- 低版本iOS可能需要额外适配
- 特殊机型(如iPhone X系列及以上)会自动处理底部安全区域
- 在小程序环境中可能需要使用不同的API进行适配 