import { request, baseURL_ } from '@/utils/request'
import { useUserStore } from '@/stores/user'
import { useChatStore } from '@/stores/chat'

const chatHistory = async () => {
  const res = (await request.get(`/ai/chatHistory`)).data
  return res
}

const updRole = async (data) => {
  console.log('更新角色API被调用，参数:', data);
  
  // 安全地创建FormData对象处理文件上传
  let formData;
  let contentType = 'application/json';
  
  try {
    if (typeof FormData !== 'undefined') {
      formData = new FormData();
  formData.append('id', data.id); // 角色ID
  formData.append('name', data.name);
  formData.append('prompt', data.prompt);
  
  // 如果有头像文件，添加到formData
  if (data.avatar) {
    console.log('检测到头像文件:', data.avatar);
    
    // 验证是否为File或Blob对象
    if (data.avatar instanceof File || data.avatar instanceof Blob) {
      console.log('添加文件对象到FormData, 文件名:', data.avatar.name || '未命名文件', '大小:', data.avatar.size, 'bytes');
      formData.append('avatar', data.avatar, data.avatar.name || `avatar_${Date.now()}.jpg`);
    } else {
      console.error('头像不是文件对象:', typeof data.avatar);
      return Promise.reject(new Error('头像必须是文件对象'));
    }
      }
      contentType = 'multipart/form-data';
    } else {
      // FormData不可用，使用JSON格式
      console.warn('FormData不可用，使用JSON格式发送请求');
      formData = JSON.stringify({
        id: data.id,
        name: data.name,
        prompt: data.prompt
        // 注意：JSON格式无法处理文件上传
      });
    }
  } catch (formDataError) {
    console.warn('FormData创建失败，使用JSON格式:', formDataError);
    formData = JSON.stringify({
      id: data.id,
      name: data.name,
      prompt: data.prompt
    });
  }
  
  const userStore = useUserStore();
  console.log('准备发送请求, URL:', `${baseURL_}/ai/updRole`);
  
  try {
    const headers = {
      Authorization: userStore.userInfo.authorization
        ? `Bearer ${userStore.userInfo.authorization}`
        : ''
    };
    
    // 只有在使用JSON时才设置Content-Type
    if (contentType === 'application/json') {
      headers['Content-Type'] = contentType;
    }
    
    // 使用fetch API处理请求
    const response = await fetch(`${baseURL_}/ai/updRole`, {
      method: 'POST',
      headers,
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API请求失败:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('API请求成功，返回结果:', result);
    return result.data;
  } catch (error) {
    console.error('API请求异常:', error);
    throw error;
  }
}

const addRole = async (data) => {
  console.log('添加角色API被调用，参数:', data);
  console.log('传入的name:', data.name);
  console.log('传入的prompt:', data.prompt);
  console.log('传入的avatar:', data.avatar ? '有头像文件' : '无头像文件');
  
  // 安全地创建FormData对象处理文件上传
  let formData;
  let contentType = 'application/json';
  
  try {
    if (typeof FormData !== 'undefined') {
      formData = new FormData();
    formData.append('name', data.name);
    formData.append('prompt', data.prompt);
    
    // 如果有头像文件，添加到formData
    if (data.avatar) {
      console.log('检测到头像文件:', 
        data.avatar instanceof File ? '是File对象' : 
        data.avatar instanceof Blob ? '是Blob对象' : 
        typeof data.avatar);
      
      // 验证是否为File或Blob对象
      if (data.avatar instanceof File || data.avatar instanceof Blob) {
        console.log('添加文件对象到FormData, 文件名:', data.avatar.name || '未命名文件', '大小:', data.avatar.size, 'bytes');
        formData.append('avatar', data.avatar, data.avatar.name || `avatar_${Date.now()}.jpg`);
        
        // 检查FormData是否包含文件
        console.log('FormData包含的字段:');
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1] instanceof File ? '是File对象' : typeof pair[1]);
        }
      } else {
        console.error('头像不是文件对象:', typeof data.avatar);
        return Promise.reject(new Error('头像必须是文件对象'));
      }
    } else {
      console.log('没有头像文件，使用默认头像');
    }
      contentType = 'multipart/form-data';
    } else {
      // FormData不可用，使用JSON格式
      console.warn('FormData不可用，使用JSON格式发送请求');
      formData = JSON.stringify({
        name: data.name,
        prompt: data.prompt
        // 注意：JSON格式无法处理文件上传
      });
    }
  } catch (formDataError) {
    console.warn('FormData创建失败，使用JSON格式:', formDataError);
    formData = JSON.stringify({
      name: data.name,
      prompt: data.prompt
    });
  }
    
  try {
    const userStore = useUserStore();
    console.log('准备发送请求, URL:', `${baseURL_}/ai/addRole`);
    console.log('Authorization:', userStore.userInfo.authorization ? '已设置' : '未设置');
    
    const headers = {
      Authorization: userStore.userInfo.authorization
        ? `Bearer ${userStore.userInfo.authorization}`
        : ''
    };
    
    // 只有在使用JSON时才设置Content-Type
    if (contentType === 'application/json') {
      headers['Content-Type'] = contentType;
    }
    
    // 使用fetch API处理请求
    const response = await fetch(`${baseURL_}/ai/addRole`, {
      method: 'POST',
      headers,
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API请求失败:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('API请求成功，返回结果:', result);
    return result.data;
  } catch (error) {
    console.error('API请求异常:', error);
    throw error;
  }
}

const getRoles = async () => {
  const res = (await request.get(`/ai/roles`)).data
  return res
}

const chatMessages = async (chatId) => {
  const res = (await request.get(`/ai/chatMessages/${chatId}`)).data
  console.log(res)
  return res
}

const editChat = async (data) => {
  const res = (await request.post(`/ai/updChat`, data)).data
  return res
}

const onChunk = (chunk, currentChatId, messageIndex, chatStore) => {
  try {
    // 获取当前会话的缓存消息副本，不直接使用currentMessages
    const currentMessages = chatStore.getChatMessages(currentChatId)
    
    if (!currentMessages || !currentMessages[messageIndex]) {
      console.error('未找到消息索引:', messageIndex, '聊天ID:', currentChatId)
      return
    }

    // 创建一个新的数组副本，避免共享引用
    const updatedMessages = [...currentMessages]
    
    // 处理首次接收数据的状态转换
    if (updatedMessages[messageIndex].status === 'loading') {
      console.log('消息状态由loading变为incomplete，聊天ID:', currentChatId)
      updatedMessages[messageIndex].status = 'incomplete'
    }
    
    // 处理iOS设备流式传输的特殊情况
    // iOS设备下XHR可能会返回完整响应，需要确保不重复添加内容
    const isIOSDevice = (() => {
      try {
        // 安全地检测iOS设备
        // #ifdef APP-PLUS
        const systemInfo = uni.getSystemInfoSync();
        return systemInfo.platform && systemInfo.platform.toLowerCase() === 'ios';
      } catch (e) {
        console.warn('检测iOS设备失败:', e);
        return false;
      }
    })();
    
    // 判断是否真的有内容更新
    let contentUpdated = false;
    
    if (chunk && isIOSDevice) {
      // 修复iOS设备上Markdown显示的问题
      console.log('iOS设备处理响应块，聊天ID:', currentChatId);
      
      // 确保正确处理Markdown格式，特别是代码块
      if (chunk.includes('```') || updatedMessages[messageIndex].content.includes('```')) {
        console.log('检测到可能是Markdown代码块，特殊处理');
        
        // 处理未闭合的代码块情况
        const existingContent = updatedMessages[messageIndex].content;
        
        // 检查是否基本相同的内容(iOS可能会多次发送相同的完整响应)
        if (chunk === existingContent) {
          console.log('收到完全相同的内容，跳过更新');
          contentUpdated = false;
          return; // 直接返回，不做任何更新
        }
        
        // 如果当前内容已经包含了chunk的大部分(90%)，可能是重复内容，跳过
        if (existingContent.length > chunk.length * 0.9 && existingContent.includes(chunk.substring(0, Math.floor(chunk.length * 0.9)))) {
          console.log('已有内容包含新内容的大部分，可能是重复内容，跳过更新');
          contentUpdated = false;
          return;
        }
        
        // 如果chunk包含了当前内容的大部分，但是更长，则更新为新内容
        if (chunk.length > existingContent.length && chunk.includes(existingContent.substring(0, Math.floor(existingContent.length * 0.9)))) {
          console.log('新内容包含已有内容且更长，使用新内容替换');
          updatedMessages[messageIndex].content = chunk;
          contentUpdated = true;
        } else {
          // 否则追加内容
          const combinedContent = existingContent + chunk;
          updatedMessages[messageIndex].content = combinedContent;
          contentUpdated = true;
        }
      } else if (chunk.length > updatedMessages[messageIndex].content.length) {
        // 如果新内容比现有内容长，则替换现有内容
        updatedMessages[messageIndex].content = chunk;
        contentUpdated = true;
      } else if (updatedMessages[messageIndex].content.indexOf(chunk) === -1) {
        // 如果现有内容中不包含新内容，则追加
        updatedMessages[messageIndex].content += chunk;
        contentUpdated = true;
      }
    } else if (chunk) {
      // 正常追加内容
      updatedMessages[messageIndex].content += chunk;
      contentUpdated = true;
    }

    // 只有在确实有内容更新时才更新消息内容
    if (contentUpdated) {
      // 更新消息内容 - 使用聊天ID确保消息被正确存储
      console.log('更新聊天消息，聊天ID:', currentChatId);
      chatStore.setChatMessages(currentChatId, updatedMessages);
      
      try {
        // 使用自定义事件通知聊天界面滚动，并传递chatId确保正确处理
        uni.$emit('chat:newContent', {
          messageIndex,
          currentChatId
        });
      } catch (scrollError) {
        console.error('尝试触发滚动事件失败:', scrollError);
      }
    }
  } catch (error) {
    console.error('处理数据块错误:', error)
  }
}

// 修改后的流式传输方法 - 支持文件上传
const askStream = async (promptData, needData, onComplete, onError) => {
  const { currentChatId, messageIndex } = needData
  const chatStore = useChatStore()
  const userStore = useUserStore()
  let reader = null
  
  const isIOS = () => {
    try {
      let systemInfo;
      
      // APP环境
      // #ifdef APP-PLUS
      systemInfo = uni.getSystemInfoSync();
      return systemInfo.platform && systemInfo.platform.toLowerCase() === 'ios';
    } catch (e) {
      console.error('检测iOS设备失败:', e);
      return false;
    }
  }

  try {
    console.log('开始流式请求，设备类型:', isIOS() ? 'iOS' : '其他')
    console.log('请求数据:', promptData)

    // 检查是否为iOS设备
    if (isIOS()) {
      console.log('检测到iOS设备，使用uni.request处理请求')
      
      // iOS设备使用uni.request替代XMLHttpRequest
      return new Promise((resolve, reject) => {
        let isCompleted = false;
        
        // 使用uni.request发送请求
        uni.request({
          url: `${baseURL_}/ai/askStream`,
          method: 'POST',
          header: {
            'Accept': 'text/plain, text/html, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': userStore.userInfo.authorization
              ? `Bearer ${userStore.userInfo.authorization}`
              : ''
          },
          // 使用表单格式发送数据，与后端期望的格式一致
          data: {
            prompt: promptData.prompt || promptData,
            chatId: promptData.chatId || ''
          },
          success: (response) => {
            if (isCompleted) return;
            isCompleted = true;
            
            console.log('uni.request完成，状态码:', response.statusCode);
            
            if (response.statusCode >= 200 && response.statusCode < 300) {
              console.log('iOS请求成功完成');
              
              // 如果有响应数据，模拟流式效果
              if (response.data) {
                console.log('iOS响应数据长度:', typeof response.data === 'string' ? response.data.length : 'non-string');
                
                // 模拟流式效果：将完整响应按句子或段落发送，保持Markdown格式
                const fullResponse = response.data;
                
                // 优化分割方法，以保持Markdown格式的完整性，特别是代码块
                let sentences = [];
                
                // 检查是否包含Markdown代码块
                if (fullResponse.includes('```')) {
                  console.log('检测到Markdown代码块，特殊处理分割');
                  
                  // 检查文档是否是复杂Markdown（包含多个代码块或标题）
                  const isComplexMarkdown = (
                    (fullResponse.match(/```/g) || []).length > 2 || // 超过一个代码块
                    fullResponse.includes('##') || // 包含二级及以上标题
                    fullResponse.match(/\n\n/g)?.length > 3 // 包含多个段落
                  );
                  
                  if (isComplexMarkdown) {
                    // 对于复杂的Markdown文档，尽量减少分割
                    console.log('检测到复杂Markdown文档，减少分割');
                    // 对于复杂内容，直接作为一个整体发送
                    sentences.push(fullResponse);
                  } else {
                    // 简单文档仍然按段落处理
                    const parts = fullResponse.split(/(?<=\n\n)/).filter(part => part.trim());
                    
                    // 进一步处理每个段落
                    for (const part of parts) {
                      // 如果是代码块，则整块发送
                      if (part.includes('```')) {
                        sentences.push(part);
                      } else {
                        // 普通文本按句子分割，但确保不会分割得太细
                        const subSentences = part.split(/(?<=[。！？\n])/).filter(s => s.trim());
                        sentences.push(...subSentences);
                      }
                    }
                  }
                } else {
                  // 没有代码块的情况，按句子分割
                  sentences = fullResponse.split(/(?<=[。！？\n])/).filter(s => s.trim());
                }
                
                let currentIndex = 0;
                let accumulatedContent = ''; // 用于累积内容，确保Markdown格式正确
                let lastSentContent = ''; // 记录最后发送的内容，用于去重
                
                const simulateStreaming = () => {
                  if (currentIndex < sentences.length) {
                    // 获取当前句子或段落
                    const chunk = sentences[currentIndex];
                    
                    // 累积内容以保持正确的Markdown渲染
                    const newAccumulatedContent = accumulatedContent + chunk;
                    
                    // 避免发送重复内容
                    let shouldSend = true;
                    
                    // 检查是否是与之前发送的内容相同
                    if (lastSentContent === newAccumulatedContent) {
                      console.log('跳过完全重复的内容');
                      shouldSend = false;
                    }
                    
                    // 更新累积内容
                    accumulatedContent = newAccumulatedContent;
                    
                    if (chunk.trim() && shouldSend) {
                      // 发送累积的内容而不是单个块，确保Markdown结构完整
                      lastSentContent = accumulatedContent; // 记录最后发送的内容
                      onChunk(accumulatedContent, currentChatId, messageIndex, chatStore);
              }
                    
                    currentIndex++;
                    
                    // 控制发送速度，模拟真实的流式效果
                    setTimeout(simulateStreaming, 100);
                  } else {
                    // 所有内容发送完毕
                    onComplete?.();
                    resolve();
                  }
                };
                
                // 开始模拟流式传输
                simulateStreaming();
              } else {
              onComplete?.();
              resolve();
              }
            } else {
              console.error('请求失败，状态码:', response.statusCode, '响应:', response.data);
              const error = new Error(`HTTP错误: ${response.statusCode}`);
              onError?.(error);
              reject(error);
            }
          },
          fail: (error) => {
            if (isCompleted) return;
            isCompleted = true;
            
            console.error('uni.request请求错误:', error);
            onError?.(new Error('网络请求失败'));
            reject(new Error('网络请求失败'));
          },
          complete: () => {
            console.log('uni.request请求完成');
          }
        });
        
        // 返回取消函数
        return {
          cancel: () => {
            if (!isCompleted) {
              console.log('取消iOS请求');
              // uni.request没有直接的取消方法
              isCompleted = true;
            }
          }
        };
      });
    } else {
      console.log('非iOS设备，使用标准fetch流式处理')
      
      // 非iOS设备使用标准fetch API
      // 安全地创建FormData，如果不可用则使用JSON
      let requestBody;
      let contentType = 'application/json';
      
      try {
        if (typeof FormData !== 'undefined') {
          const formData = new FormData()
          formData.append('prompt', promptData.prompt || promptData)
          formData.append('chatId', promptData.chatId || '')

          // 添加文件（如果有的话）
          if (promptData.files && promptData.files.length > 0) {
            promptData.files.forEach((file) => {
              formData.append('files', file)
            })
          } else {
            // 如果没有文件，添加一个空的文件数组
            formData.append('files', [])
          }
          
          requestBody = formData;
          contentType = 'multipart/form-data';
        } else {
          // FormData不可用，使用JSON
          requestBody = JSON.stringify({
            prompt: promptData.prompt || promptData,
            chatId: promptData.chatId || ''
          });
        }
      } catch (formDataError) {
        console.warn('FormData创建失败，使用JSON格式:', formDataError);
        requestBody = JSON.stringify({
          prompt: promptData.prompt || promptData,
          chatId: promptData.chatId || ''
        });
      }
      
      const headers = {
        Accept: 'text/plain, text/html, */*',
        Authorization: userStore.userInfo.authorization
          ? `Bearer ${userStore.userInfo.authorization}`
          : ''
      };
      
      // 只有在使用JSON时才设置Content-Type
      if (contentType === 'application/json') {
        headers['Content-Type'] = contentType;
      }
      
      const response = await fetch(`${baseURL_}/ai/askStream`, {
        method: 'POST',
        headers,
        body: requestBody
      })

      console.log('fetch响应状态:', response.status, response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('fetch请求失败:', response.status, errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          console.log('fetch流式读取完成')
          onComplete?.()
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        console.log('fetch接收数据块:', chunk.length, '字符')
        onChunk(chunk, currentChatId, messageIndex, chatStore)
      }
      
      return {
        cancel: () => {
          if (reader) {
            console.log('取消fetch流式读取')
            reader.cancel()
            reader = null
          }
        }
      }
    }
  } catch (error) {
    console.error('流式请求错误:', error)
    if (error.name === 'AbortError') {
      onError?.(new Error('传输已停止'))
    } else {
      onError?.(error)
    }
    throw error
  } finally {
    reader = null
  }
}

const createChat = async (data) => {
  const res = (await request.post(`/ai/create`, data)).data
  return res
}

// 同样修改高级流式传输方法
const createStreamRequest = (promptData, callbacks = {}) => {
  const { onChunk, onComplete, onError, onStart } = callbacks
  const userStore = useUserStore()
  let reader = null
  let isActive = false
  let abortController = null
  let xhr = null

  // 改进iOS检测逻辑
  const isIOS = () => {
    try {
      let systemInfo;
      
      // APP环境
      // #ifdef APP-PLUS
      systemInfo = uni.getSystemInfoSync();
      return systemInfo.platform && systemInfo.platform.toLowerCase() === 'ios';
    } catch (e) {
      console.error('检测iOS设备失败:', e);
      return false;
    }
  }
  
  const start = async () => {
    if (isActive) {
      console.warn('流式请求已在进行中')
      return
    }

    isActive = true
    abortController = isIOS() ? null : new AbortController()
    onStart?.()

    try {
      console.log('开始高级流式请求，设备类型:', isIOS() ? 'iOS' : '其他')
      
      // 安全地构建 FormData
      let formData;
      let contentType = 'application/json';
      
      try {
        if (typeof FormData !== 'undefined') {
          formData = new FormData()
      formData.append('prompt', promptData.prompt || promptData)
      formData.append('chatId', promptData.chatId || '')

      // 添加文件
      if (promptData.files && promptData.files.length > 0) {
        promptData.files.forEach((file) => {
          formData.append('files', file)
        })
      } else {
        formData.append('files', '')
          }
          contentType = 'multipart/form-data';
        } else {
          // FormData不可用，使用JSON格式
          console.warn('FormData不可用，使用JSON格式发送请求');
          formData = JSON.stringify({
            prompt: promptData.prompt || promptData,
            chatId: promptData.chatId || ''
          });
        }
      } catch (formDataError) {
        console.warn('FormData创建失败，使用JSON格式:', formDataError);
        formData = JSON.stringify({
          prompt: promptData.prompt || promptData,
          chatId: promptData.chatId || ''
        });
      }

      // 根据设备环境选择不同的请求方式
      if (isIOS()) {
        console.log('检测到iOS设备，使用uni.request处理请求')
        
        // 使用uni.request代替XMLHttpRequest
        try {
          uni.request({
            url: `${baseURL_}/ai/askStream`,
            method: 'POST',
            header: {
              'Accept': 'text/plain, text/html, */*',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': userStore.userInfo.authorization
                ? `Bearer ${userStore.userInfo.authorization}`
                : ''
            },
            // 使用表单格式发送数据，与后端期望的格式一致
            data: {
              prompt: promptData.prompt || promptData,
              chatId: promptData.chatId || ''
            },
            success: (response) => {
              if (!isActive) return;
              
              console.log('uni.request完成，状态码:', response.statusCode);
              
              if (response.statusCode >= 200 && response.statusCode < 300) {
                console.log('iOS请求成功完成');
                
                // 如果有响应数据，模拟流式效果
                if (response.data) {
                  console.log('iOS响应数据长度:', typeof response.data === 'string' ? response.data.length : 'non-string');
                  
                  // 模拟流式效果：将完整响应按句子或段落发送，保持Markdown格式
                  const fullResponse = response.data;
                  
                  // 优化分割方法，以保持Markdown格式的完整性，特别是代码块
                  let sentences = [];
                  
                  // 检查是否包含Markdown代码块
                  if (fullResponse.includes('```')) {
                    console.log('检测到Markdown代码块，特殊处理分割');
                    
                    // 检查文档是否是复杂Markdown（包含多个代码块或标题）
                    const isComplexMarkdown = (
                      (fullResponse.match(/```/g) || []).length > 2 || // 超过一个代码块
                      fullResponse.includes('##') || // 包含二级及以上标题
                      fullResponse.match(/\n\n/g)?.length > 3 // 包含多个段落
                    );
                    
                    if (isComplexMarkdown) {
                      // 对于复杂的Markdown文档，尽量减少分割
                      console.log('检测到复杂Markdown文档，减少分割');
                      // 对于复杂内容，直接作为一个整体发送
                      sentences.push(fullResponse);
                    } else {
                      // 简单文档仍然按段落处理
                      const parts = fullResponse.split(/(?<=\n\n)/).filter(part => part.trim());
                      
                      // 进一步处理每个段落
                      for (const part of parts) {
                        // 如果是代码块，则整块发送
                        if (part.includes('```')) {
                          sentences.push(part);
                        } else {
                          // 普通文本按句子分割，但确保不会分割得太细
                          const subSentences = part.split(/(?<=[。！？\n])/).filter(s => s.trim());
                          sentences.push(...subSentences);
                        }
                      }
                    }
                  } else {
                    // 没有代码块的情况，按句子分割
                    sentences = fullResponse.split(/(?<=[。！？\n])/).filter(s => s.trim());
                  }
                  
                  let currentIndex = 0;
                  let accumulatedContent = ''; // 用于累积内容，确保Markdown格式正确
                  let lastSentContent = ''; // 记录最后发送的内容，用于去重
                  
                  const simulateStreaming = () => {
                    if (currentIndex < sentences.length) {
                      // 获取当前句子或段落
                      const chunk = sentences[currentIndex];
                      
                      // 累积内容以保持正确的Markdown渲染
                      const newAccumulatedContent = accumulatedContent + chunk;
                      
                      // 避免发送重复内容
                      let shouldSend = true;
                      
                      // 检查是否是与之前发送的内容相同
                      if (lastSentContent === newAccumulatedContent) {
                        console.log('跳过完全重复的内容');
                        shouldSend = false;
                      }
                      
                      // 更新累积内容
                      accumulatedContent = newAccumulatedContent;
                      
                      if (chunk.trim() && shouldSend) {
                        // 发送累积的内容而不是单个块，确保Markdown结构完整
                        lastSentContent = accumulatedContent; // 记录最后发送的内容
                        onChunk(accumulatedContent, currentChatId, messageIndex, chatStore);
                      }
                      
                      currentIndex++;
                      
                      // 控制发送速度，模拟真实的流式效果
                      setTimeout(simulateStreaming, 100);
                    } else {
                      // 所有内容发送完毕
                      onComplete?.();
                      resolve();
                    }
                  };
                  
                  // 开始模拟流式传输
                  simulateStreaming();
                } else {
                onComplete?.();
                }
              } else {
                console.error('请求失败，状态码:', response.statusCode, '响应:', response.data);
                onError?.(new Error(`HTTP错误: ${response.statusCode}`));
              }
            },
            fail: (error) => {
              if (!isActive) return;
              
              console.error('uni.request请求错误:', error);
              onError?.(new Error('网络请求失败'));
            },
            complete: () => {
              console.log('uni.request请求完成');
              isActive = false;
              xhr = null;
            }
          });
          
          console.log('iOS uni.request已发送');
        } catch (sendError) {
          console.error('发送uni.request请求失败:', sendError);
          onError?.(sendError);
          isActive = false;
          xhr = null;
        }
      } else {
        console.log('非iOS设备，使用标准fetch流式处理')
        // 非iOS设备标准处理方式
        const response = await fetch(`${baseURL_}/ai/askStream`, {
          method: 'POST',
          headers: {
            Accept: 'text/plain, text/html, */*',
            Authorization: userStore.userInfo.authorization
              ? `Bearer ${userStore.userInfo.authorization}`
              : ''
          },
          body: formData,
          signal: abortController.signal
        })

        console.log('fetch响应状态:', response.status, response.ok)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('fetch请求失败:', response.status, errorText)
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')

        while (isActive && !abortController.signal.aborted) {
          const { done, value } = await reader.read()

          if (done) {
            console.log('fetch高级流式读取完成')
            onComplete?.()
            break
          }

          const chunk = decoder.decode(value, { stream: true })
          console.log('fetch高级接收数据块:', chunk.length, '字符')
          onChunk?.(chunk)
        }
      }
    } catch (error) {
      console.error('流式传输错误:', error)
      
      if (error.name === 'AbortError') {
        console.log('传输已停止')
      } else {
        onError?.(error)
      }
    } finally {
      isActive = false
      reader = null
      abortController = null
    }
  }

  const cancel = () => {
    if (isIOS() && xhr) {
      console.log('取消iOS高级XHR请求')
      xhr.abort()
      xhr = null
    } else {
      if (abortController) {
        console.log('取消fetch高级流式读取')
        abortController.abort()
      }
      if (reader) {
        reader.cancel()
      }
    }
    isActive = false
    reader = null
    abortController = null
  }

  return {
    start,
    cancel,
    isActive: () => isActive
  }
}

// 便捷方法：直接传入问题文本和会话ID
const askStreamWithChat = async (
  prompt,
  chatId,
  onChunk,
  onComplete,
  onError
) => {
  // 创建必要的needData对象
  const chatStore = useChatStore()
  const needData = {
    currentChatId: chatId,
    messageIndex: chatStore.currentMessages ? chatStore.currentMessages.length - 1 : 0
  }
  
  return await askStream({ prompt, chatId }, needData, onComplete, onError)
}
const deleteChat = async (chatId) => {
  const res = (await request.delete(`/ai/delChat/${chatId}`)).data
  return res
}

const deleteRole = async (roleId) => {
  console.log('删除角色API被调用，角色ID:', roleId);
  const res = (await request.delete(`/ai/delRole/${roleId}`)).data
  return res
}

export const chatApi = {
  updRole,
  getRoles,
  createChat,
  askStream,
  deleteChat,
  chatHistory,
  chatMessages,
  createStreamRequest,
  askStreamWithChat,
  editChat,
  deleteRole
}
