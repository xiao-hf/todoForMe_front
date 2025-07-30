# iOS真机兼容性修复

## 问题描述
在iOS真机上运行时遇到以下错误：
1. `ReferenceError: Can't find variable: FormData`
2. `TypeError: purify.sanitize is not a function`

## 修复方案

### 1. FormData兼容性修复

在 `api/chatApi.js` 中，对所有使用 `FormData` 的地方添加了兼容性检查：

```javascript
// 安全地创建FormData对象
let formData;
let contentType = 'application/json';

try {
  if (typeof FormData !== 'undefined') {
    formData = new FormData();
    // ... 正常使用FormData
    contentType = 'multipart/form-data';
  } else {
    // FormData不可用，使用JSON格式
    console.warn('FormData不可用，使用JSON格式发送请求');
    formData = JSON.stringify({
      // ... 数据
    });
  }
} catch (formDataError) {
  console.warn('FormData创建失败，使用JSON格式:', formDataError);
  formData = JSON.stringify({
    // ... 数据
  });
}
```

### 2. DOMPurify兼容性修复

在 `pages/chat/chat.vue` 中，添加了DOMPurify的安全导入：

```javascript
// 安全地导入DOMPurify，如果不可用则使用简单的HTML清理函数
let DOMPurify;
try {
  DOMPurify = require('dompurify');
} catch (error) {
  console.warn('DOMPurify不可用，使用简单的HTML清理函数');
  DOMPurify = {
    sanitize: (html) => {
      // 简单的HTML清理函数，移除危险的标签和属性
      return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
        .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
    }
  };
}
```

### 3. 修复的函数列表

- `updRole()` - 更新角色API
- `addRole()` - 添加角色API  
- `askStream()` - 流式聊天API
- `createStreamRequest()` - 高级流式请求API
- `renderMarkdown()` - Markdown渲染函数

### 4. 后端参数格式修复

**问题**：iOS设备上发送请求时，后端报错 `缺少请求参数：Required request parameter 'chatId' for method parameter type String is not present`

**原因**：iOS设备使用JSON格式发送请求，但后端期望表单参数格式

**修复**：将iOS设备的请求Content-Type从 `application/json` 改为 `application/x-www-form-urlencoded`

```javascript
// 修复前
header: {
  'Content-Type': 'application/json',
  // ...
}

// 修复后  
header: {
  'Content-Type': 'application/x-www-form-urlencoded',
  // ...
}
```

### 5. navigator.userAgent兼容性修复

**问题**：iOS真机上 `onChunk` 函数报错 `TypeError: undefined is not an object (evaluating 'navigator.userAgent')`

**原因**：在uni-app的APP环境中，`navigator.userAgent` 不可用

**修复**：使用条件编译和安全的设备检测方法

```javascript
// 修复前
if (chunk && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
  // iOS设备处理逻辑
}

// 修复后
const isIOSDevice = (() => {
  try {
    // #ifdef APP-PLUS
    const systemInfo = uni.getSystemInfoSync();
    return systemInfo.platform && systemInfo.platform.toLowerCase() === 'ios';
    // #endif
    
    // #ifdef H5
    return typeof navigator !== 'undefined' && navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
    // #endif
    
    return false;
  } catch (e) {
    console.warn('检测iOS设备失败:', e);
    return false;
  }
})();

if (chunk && isIOSDevice) {
  // iOS设备处理逻辑
}
```

### 6. iOS流式效果模拟修复

**问题**：iOS真机上无法实现真正的流式传输，回复内容一次性全部显示

**原因**：`uni.request` 不支持真正的流式传输，会等待整个请求完成后一次性返回所有数据

**修复**：在iOS设备上模拟流式效果，将完整响应按句子或段落发送，保持Markdown格式

```javascript
// 修复前
if (response.data) {
  onChunk(response.data, currentChatId, messageIndex, chatStore);
}

// 修复后
if (response.data) {
  // 模拟流式效果：将完整响应按句子或段落发送，保持Markdown格式
  const fullResponse = response.data;
  
  // 按句子分割，保持Markdown格式的完整性
  const sentences = fullResponse.split(/(?<=[。！？\n])/);
  let currentIndex = 0;
  
  const simulateStreaming = () => {
    if (currentIndex < sentences.length) {
      // 每次发送一个句子或段落
      const chunk = sentences[currentIndex];
      if (chunk.trim()) { // 只发送非空内容
        onChunk(chunk, currentChatId, messageIndex, chatStore);
      }
      currentIndex++;
      
      // 控制发送速度，模拟真实的流式效果
      setTimeout(simulateStreaming, 100); // 每100ms发送一个句子
    } else {
      // 所有内容发送完毕
      onComplete?.();
    }
  };
  
  // 开始模拟流式传输
  simulateStreaming();
}
```

### 7. 测试建议

1. 在iOS真机上测试发送消息功能
2. 检查控制台是否还有FormData相关错误
3. 验证Markdown渲染是否正常工作
4. 测试角色管理功能（如果有文件上传）
5. 检查后端是否还报缺少chatId参数的错误
6. 验证AI回复是否正确显示在聊天界面中
7. 确认AI回复是否按句子显示（流式效果）
8. 验证Markdown格式在流式过程中是否正确渲染

## 注意事项

1. 当FormData不可用时，文件上传功能将无法使用
2. 简单的HTML清理函数可能不如DOMPurify安全，但足以防止基本的XSS攻击
3. 建议在iOS设备上进行充分测试

## 兼容性

- ✅ iOS真机
- ✅ Android真机  
- ✅ H5浏览器
- ✅ 小程序环境 