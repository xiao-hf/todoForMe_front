<template>
    <view class="chat-container" 
        @touchstart="handleTouchStart" 
        @touchmove="handleTouchMove" 
        @touchend="handleTouchEnd">
        <!-- 移除背景图片，改用纯白色背景 -->
        
        <!-- 顶部导航栏 -->
        <view class="nav-header">
            <view class="nav-left" @click="goBack">
                <view class="icon-wrapper">
                <uni-icons type="back" size="24" color="#333"></uni-icons>
            </view>
            </view>
            <!-- 修改为显示当前角色信息 -->
            <view class="nav-center">
                <view class="role-info">
                    <view class="role-avatar">
                        <image v-if="currentRoleAvatar" :src="currentRoleAvatar" mode="aspectFill" class="avatar-image" @error="handleRoleAvatarError"></image>
                        <text v-else class="avatar-text">{{ currentRoleName ? currentRoleName.substring(0, 1) : 'A' }}</text>
                    </view>
                    <text class="nav-title">{{ currentRoleName }}</text>
                </view>
            </view>
            <view class="nav-right">
                <!-- 修改这两个按钮，增加事件阻止冒泡，图标改为黑色 -->
                <view class="icon-wrapper compose-btn" @click.stop="showNewChatDialog">
                    <uni-icons type="compose" size="22" color="#333"></uni-icons>
                </view>
                <view class="icon-wrapper history-btn" @click.stop="toggleSidebar">
                    <uni-icons :type="isSidebarOpen ? 'right' : 'list'" size="22" color="#333"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 侧边栏-聊天历史 -->
        <view class="sidebar-overlay" v-if="sidebarVisible" :class="{ 'active': isSidebarOpen }" @click="closeSidebar">
            <view class="sidebar" 
                :class="{ active: isSidebarOpen, closing: sidebarClosing }" 
                :style="{ transform: isDraggingSidebar ? `translateX(${(sidebarDragPosition - 100)}%)` : '' }"
                @click.stop>
                <view class="sidebar-header">
                    <text class="sidebar-title">会话历史</text>
                    <view class="sidebar-actions">
                        <!-- 添加新建会话按钮，使用加号图标 -->
                        <view class="icon-wrapper new-chat-btn" @click.stop="showNewChatDialogFromSidebar">
                            <uni-icons type="plus" size="24" color="#007AFF"></uni-icons>
                        </view>
                    </view>
                </view>
                <scroll-view class="history-list" scroll-y>
                    <view 
                        v-for="(chat, index) in chatStore.chatHistory" 
                        :key="chat.id"
                        class="history-item"
                        :class="{ active: chatStore.chatIndex === index }"
                        @click="switchChat(chat.id)"
                    >
                        <text class="history-title">{{ chat.chatName || 'undefined' }}</text>
                        <view class="history-meta">
                            <text class="history-time">{{ formatDate(chat.createdAt) }}</text>
                            <text class="history-count" v-if="chat.messageCount">{{ chat.messageCount }}条消息</text>
                        </view>
                        
                        <!-- 会话操作按钮 -->
                        <view class="history-actions" @click.stop>
                            <view class="icon-wrapper action-btn edit-btn" @click="editChat(chat)">
                                <uni-icons type="compose" size="20" color="#999"></uni-icons>
                            </view>
                            <view class="icon-wrapper action-btn delete-btn" @click="confirmDeleteChat(chat)">
                                <uni-icons type="trash-filled" size="22" color="#ff5a5f"></uni-icons>
                            </view>
                        </view>
                    </view>
                    <view class="empty-history" v-if="chatStore.chatHistory.length === 0">
                        <text>暂无会话历史</text>
                    </view>
                </scroll-view>
            </view>
        </view>

        <!-- 聊天消息列表区域 -->
        <scroll-view 
            class="message-list" 
            scroll-y 
            :scroll-into-view="scrollIntoView"
            scroll-with-animation="false"
            :scroll-top="manualScrollTop"
            :enhanced="true"
            :bounces="true"
            :show-scrollbar="true"
            :fast-deceleration="true"
            :style="messageListStyle"
            @scroll="handleScroll"
            @touchstart="handleListTouchStart"
            @touchmove="handleListTouchMove"
            @touchend="handleListTouchEnd"
        >
            <view 
                v-for="(message, index) in chatStore.currentMessages" 
                :key="index" 
                :id="`msg-${index}`"
                class="message-item"
                :class="message.isUser ? 'user-message' : 'ai-message'"
            >
                <!-- 用户消息显示气泡 -->
                <view v-if="message.isUser" class="message-bubble">
                    <view class="message-content-wrapper">
                        <view class="message-content">{{ message.content }}</view>
                    </view>
                </view>
                
                <!-- AI消息不显示气泡，全宽显示 -->
                <view v-else class="ai-message-container">
                    <view class="ai-message-content">
                        <view class="markdown-content" v-html="renderMarkdown(message.content)"></view>
                    </view>
                </view>
            </view>
            
            <!-- 消息列表为空时显示的提示 -->
            <view class="empty-hint" v-if="chatStore.currentMessages.length === 0">
                <view class="hint-text" v-if="chatStore.chatHistory.length === 0">暂无会话先创建会话把</view>
                <view class="hint-text" v-else>发送消息开始聊天</view>
            </view>
            
            <!-- 等待AI回复的呼吸小黑球，当最后一条消息是AI消息且状态为loading时显示 -->
            <view class="waiting-indicator" v-if="chatStore.currentMessages.length > 0 && 
                 !chatStore.currentMessages[chatStore.currentMessages.length-1].isUser && 
                 chatStore.currentMessages[chatStore.currentMessages.length-1].status === 'loading' && 
                 chatStore.currentMessages[chatStore.currentMessages.length-1].content === ''">
                <view class="breathing-dot"></view>
            </view>
        </scroll-view>
        
        <!-- 底部输入区域 -->
        <view class="input-container" :style="inputContainerStyle" @tap="handleContainerTap">
            <view class="input-wrapper">
                <input 
                    class="message-input" 
                    type="text" 
                    v-model="inputMessage" 
                    placeholder="询问任何问题"
                    confirm-type="send"
                    @confirm="handleConfirmSend"
                    ref="messageInput"
                    :disabled="chatStore.chatHistory.length === 0 || isWaitingResponse"
                    :focus="false"
                    :auto-focus="false"
                    :adjust-position="true"
                    :fixed="true"
                    :hold-keyboard="true"
                    cursor-spacing="30"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                    @tap="handleInputTap"
                    @click="handleInputTap"
                />
                <view class="right-icons">
                    <view 
                        class="send-btn" 
                        :class="{'active': inputMessage.trim().length > 0 && chatStore.chatHistory.length > 0 && !isWaitingResponse}"
                        @click="handleSendClick"
                    >
                        <uni-icons 
                            type="paperplane" 
                            size="20" 
                            :color="inputMessage.trim().length > 0 && chatStore.chatHistory.length > 0 && !isWaitingResponse ? '#007AFF' : '#CCCCCC'"
                        ></uni-icons>
                    </view>
                </view>
            </view>
        </view>

        <!-- 新建会话弹窗 -->
        <view class="modal-overlay" v-if="showNewChatModal" :class="{ 'active': modalActive }" @click="closeNewChatDialog">
            <view class="modal-content" :class="{ 'active': modalActive, 'closing': modalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">{{ isEditMode ? '编辑会话' : '新建会话' }}</text>
                    <view class="popup-close" @click="closeNewChatDialog">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">会话名称 <text class="char-counter">{{ newChat.chatName.length }}/10</text></view>
                    <input 
                        class="task-input chat-name-input"
                        v-model="newChat.chatName"
                        placeholder="不填则AI自动生成"
                        maxlength="10"
                    />
                </view>
                
                <view class="input-group">
                    <view class="input-label">TopK</view>
                    <view class="slider-container">
                        <slider 
                            :value="newChat.topK" 
                            :min="1" 
                            :max="20" 
                            :step="1" 
                            :show-value="true"
                            @change="handleTopKChange"
                            activeColor="#007AFF"
                            backgroundColor="#e0e0e0"
                            block-color="#007AFF"
                            block-size="24"
                        />
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">相似度</view>
                    <view class="slider-container">
                        <slider 
                            :value="newChat.similarity * 100" 
                            :min="0" 
                            :max="100" 
                            :step="1" 
                            :show-value="true"
                            @change="handleSimilarityChange"
                            activeColor="#007AFF"
                            backgroundColor="#e0e0e0"
                            block-color="#007AFF"
                            block-size="24"
                        />
                    </view>
                </view>
                
                <view class="input-group">
                    <view class="input-label">人设</view>
                    <view class="task-input picker-input" @click="showRolePicker">
                        <view class="picker-content">
                            <!-- 添加选中角色的头像显示 -->
                            <view class="selected-role-avatar" v-if="selectedRoleId">
                                <image v-if="selectedRoleAvatar" :src="selectedRoleAvatar" class="avatar-image" mode="aspectFill" @error="handleSelectedAvatarError"></image>
                                <text v-else class="avatar-text">{{ selectedRoleName ? selectedRoleName.substring(0, 1) : 'A' }}</text>
                            </view>
                            <view class="picker-text" :class="{'has-avatar': selectedRoleId}">
                            {{ selectedRoleName }}
                            </view>
                        </view>
                    </view>
                </view>
                
                <!-- 人设选择弹窗 -->
                <view v-if="showRolePickerModal" class="role-picker-modal" :class="{ 'closing': rolePickerClosing }" @click.stop="hideRolePicker">
                    <view class="role-list" :class="{ 'closing': rolePickerClosing }" @click.stop>
                        <view 
                            v-for="(role, index) in rolesList" 
                            :key="role.id"
                            class="role-item"
                            @click="selectRole(role, index)"
                        >
                            <!-- 添加人设头像 -->
                            <view class="role-avatar">
                                <image v-if="role.avatar" :src="role.avatar" class="avatar-image" mode="aspectFill" @error="handleRoleItemAvatarError(index)"></image>
                                <text v-else class="avatar-text">{{ role.name ? role.name.substring(0, 1) : 'A' }}</text>
                            </view>
                            <text class="role-name">{{ role.name }}</text>
                        </view>
                    </view>
                </view>
                
                <view class="popup-actions">
                    <button class="cancel-btn" @click="closeNewChatDialog">取消</button>
                    <button class="confirm-btn" @click="createNewChat">{{ isEditMode ? '保存' : '完成' }}</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, getCurrentInstance, onErrorCaptured, onUnmounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '../../stores/chat';
import { chatApi } from '@/api/chatApi';
import { marked } from 'marked';
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

// 用户信息
const userStore = useUserStore();
const userAvatar = ref(userStore.userInfo.avatar || '/static/logo.png');
const aiAvatar = ref('/static/logo.png');
const chatStore = useChatStore();

// 全局错误处理
onErrorCaptured((err, instance, info) => {
    console.error('捕获到组件错误:', err, info);
    // 防止错误继续传播
    return true;
});

// 当前角色信息
const currentRoleName = ref('加载中...');
const currentRoleAvatar = ref('');
const currentRoleId = ref(null);

// 侧边栏状态
const isSidebarOpen = ref(false);
const sidebarClosing = ref(false);
const sidebarVisible = ref(false);

// 弹窗状态
const showNewChatModal = ref(false);
const modalClosing = ref(false);
const modalActive = ref(false);
const showRolePickerModal = ref(false);
const rolePickerClosing = ref(false);
const isEditMode = ref(false); // 添加编辑模式标志

// 角色列表
const rolesList = ref([]);

// 新建会话表单
const newChat = ref({
    name: '',
    chatName: '',
    topK: 5,
    similarity: 0.5,
    roleId: null
});

// 选中的人设名称
const selectedRoleName = ref('请选择人设');
const selectedRoleId = ref(null); // 新增：记录选中的人设ID
const selectedRoleAvatar = ref(''); // 新增：记录选中的人设头像

// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
    return userStore.userInfo.backgroudImg || '';
});

// 图片加载状态
const imageLoadError = ref(false);

// 处理图片加载错误
const handleImageError = () => {
    imageLoadError.value = true;
    console.error('背景图片加载失败');
};

// 处理图片加载成功
const handleImageLoad = () => {
    imageLoadError.value = false;
};

// 处理角色头像加载错误
const handleRoleAvatarError = () => {
    console.error('角色头像加载失败');
    currentRoleAvatar.value = '';
};

// 处理人设项头像加载错误
const handleRoleItemAvatarError = (index) => {
    console.error(`人设项头像加载失败，索引: ${index}`);
    // 可以在这里设置一个默认头像或空字符串
    // rolesList.value[index].avatar = ''; // 示例：设置为空字符串
};

// 处理选中人设头像加载错误
const handleSelectedAvatarError = () => {
    console.error('选中人设头像加载失败');
    selectedRoleAvatar.value = '';
};

// 获取当前聊天对应的角色信息
const getCurrentRoleInfo = () => {
    try {
        if (chatStore.chatHistory.length === 0) {
            currentRoleName.value = '';
            currentRoleAvatar.value = '';
            return;
        }
        
        if (chatStore.chatIndex < 0 || chatStore.chatIndex >= chatStore.chatHistory.length) {
            console.error('无效的聊天索引:', chatStore.chatIndex);
            currentRoleName.value = '';
            currentRoleAvatar.value = '';
            return;
        }
        
        const currentChat = chatStore.chatHistory[chatStore.chatIndex];
        if (!currentChat) {
            currentRoleName.value = '';
            currentRoleAvatar.value = '';
            return;
        }
                
        const roleId = currentChat.roleId;
        currentRoleId.value = roleId;
        
        // 查找角色信息
        if (!rolesList.value || !rolesList.value.length) {
            console.log('角色列表为空，使用聊天名称');
            currentRoleName.value = currentChat.chatName || '未命名对话';
            currentRoleAvatar.value = '';
            return;
        }
        
        const role = rolesList.value.find(r => r.id === roleId);
        if (role) {
            currentRoleName.value = role.name || '未命名角色';
            currentRoleAvatar.value = role.avatar || '';
            console.log('当前角色信息:', role.name, role.avatar);
        } else {
            // 如果找不到角色信息，使用聊天名称
            currentRoleName.value = currentChat.chatName || '未命名对话';
            currentRoleAvatar.value = '';
            console.log('未找到角色信息,使用聊天名称:', currentRoleName.value);
        }
    } catch (error) {
        console.error('获取角色信息失败:', error);
        currentRoleName.value = '助手';
        currentRoleAvatar.value = '';
    }
};

// 消息列表
const messages = ref([]);
const inputMessage = ref('');
const scrollIntoView = ref('');

// 添加一个变量控制发送按钮状态
const isWaitingResponse = ref(false);

// 加载聊天消息并缓存
const loadChatMessages = async (chatId) => {
    try {
        if (!chatId) {
            console.error('无效的聊天ID');
            return [];
        }
        
        const res = await chatApi.chatMessages(chatId);
        if (res) {
            // 将消息转换为应用格式
            console.log('收到的消息:', res)
            let formattedMessages = res.map(item => ({
                content: item.text,
                isUser: item.messageType === 'USER',
                time: formatTime(new Date(item.createTime)),
                status: 'complete',
                // 添加一个唯一标识，用于去重
                _id: item.id || `${item.createTime}-${item.messageType}`
            }));
            
            // 进行消息去重 - 解决iOS上同一消息多次渲染的问题
            const uniqueMessages = [];
            const seenContents = new Set();
            
            // 首先处理用户消息，确保它们按顺序保留
            formattedMessages.forEach(msg => {
                if (msg.isUser) {
                    // 用户消息直接添加
                    uniqueMessages.push(msg);
                    seenContents.add(msg.content);
                } else {
                    // AI消息需要去重
                    // 如果内容重复或几乎相同，则跳过
                    const similarExists = Array.from(seenContents).some(existingContent => {
                        // 检查是否是完全相同的消息
                        if (existingContent === msg.content) return true;
                        
                        // 检查是否是几乎相同的消息(前90%内容相同)
                        const minLength = Math.min(existingContent.length, msg.content.length);
                        const matchLength = minLength * 0.9;
                        return existingContent.substring(0, matchLength) === 
                               msg.content.substring(0, matchLength);
                    });
                    
                    if (!similarExists) {
                        uniqueMessages.push(msg);
                        seenContents.add(msg.content);
                    } else {
                        console.log('跳过重复或类似消息:', msg.content.substring(0, 50) + '...');
                    }
                }
            });
            
            console.log('去重后的消息:', uniqueMessages.length, '(原始:', formattedMessages.length, ')');
            
            // 创建一个新数组，确保每个会话有独立的消息数组引用
            const messagesCopy = [...uniqueMessages];
            
            // 使用chatStore的方法同时更新chatMap和currentMessages
            chatStore.setChatMessages(chatId, messagesCopy);
            
            // 更新本地显示用的消息数组，也使用新的数组引用
            messages.value = [...messagesCopy];
                    
            // 滚动到最新消息
            scrollToBottom();
                
            return messagesCopy;
        }
        return [];
    } catch (error) {
        console.error('获取聊天消息失败:', error);
        uni.showToast({
            title: '获取聊天记录失败',
            icon: 'none'
        });
        return [];
    }
};

// 发送消息
const sendMessage = async () => {
    // 确保消息不为空且不在等待响应
    if (!inputMessage.value.trim() || isWaitingResponse.value) {
        console.log('消息为空或正在等待响应，不发送');
        return;
    }
    console.log('准备发送消息:', inputMessage.value);
    console.log('聊天历史:', chatStore.chatHistory)
    
    // 确保有选中的会话
    if (!chatStore.chatHistory.length || chatStore.chatIndex < 0 || chatStore.chatIndex >= chatStore.chatHistory.length) {
        uni.showToast({
            title: '请先创建会话',
            icon: 'none'
        });
        return;
    }
    
    const chatId = chatStore.chatHistory[chatStore.chatIndex].id;

    // 设置等待状态为true
    isWaitingResponse.value = true;
    
    // 添加用户消息到列表
    const userMsg = {
        content: inputMessage.value,
        isUser: true,
        time: formatTime(new Date()),
        status: 'complete'
    };
    
    // 创建当前消息的副本，然后添加新消息
    const updatedMessages = [...chatStore.currentMessages, userMsg];
    
    // 更新chatStore中的消息
    chatStore.setChatMessages(chatId, updatedMessages);
    
    // 更新本地消息数组
    chatStore.currentMessages = updatedMessages;

    // 清空输入框
    const userInput = inputMessage.value;
    inputMessage.value = '';

    // 仅在用户消息添加后滚动一次
    scrollToBottom();
    
    // 添加延迟滚动确保视图更新后滚动生效
    setTimeout(() => {
        scrollToBottom();
    }, 100);

    // 创建AI占位消息
    const aiMsg = {
        content: '',
        isUser: false,
        time: formatTime(new Date()),
        status: 'loading'
    };
    
    // 再次创建消息副本，添加AI消息
    const messagesWithAiResponse = [...updatedMessages, aiMsg];
    
    // 更新chatStore和本地消息数组
    chatStore.setChatMessages(chatId, messagesWithAiResponse);
    chatStore.currentMessages = messagesWithAiResponse;

    // 记录AI消息的索引（最后一个）
    const aiMsgIndex = chatStore.currentMessages.length - 1;
    
    // 在AI消息添加后也滚动一次
    scrollToBottom();
    
    // 再次延迟滚动确保AI占位消息可见
    setTimeout(() => {
        scrollToBottom();
    }, 150);
    
    try {
        // 准备流式请求数据
        const promptData = {
            prompt: userInput,
            chatId: chatId
        };
        
        const needData = {
            currentChatId: chatId,
            messageIndex: aiMsgIndex
        };
        
        // 发起流式请求
        chatApi.askStream(
            promptData,
            needData,
            () => {
                // 完成回调
                console.log('聊天完成');
                try {
                    if (chatStore.currentMessages[aiMsgIndex]) {
                        // 创建消息副本，更新状态
                        const currentMsgs = [...chatStore.currentMessages];
                        currentMsgs[aiMsgIndex].status = 'complete';
                        
                        // 更新chatStore和本地消息数组
                        chatStore.setChatMessages(chatId, currentMsgs);
                        chatStore.currentMessages = currentMsgs;
                        
                        // 在消息状态更新后，确保滚动到底部 - 添加延迟滚动保障
                        nextTick(() => {
                            scrollToBottom();
                            
                            // 额外延迟滚动作为保障
                            setTimeout(() => {
                                scrollToBottom();
                            }, 200);
                            setTimeout(() => {
                                scrollToBottom();
                            }, 500);
                        });
                    }
                    
                    // 检查当前会话名称是否为空，如果为空则刷新聊天历史
                    const currentChat = chatStore.chatHistory[chatStore.chatIndex];
                    if (currentChat && (!currentChat.chatName || currentChat.chatName.trim() === '')) {
                        console.log('当前会话名称为空，刷新聊天历史');
                        refreshHistoryChat().then(() => {
                            console.log('聊天历史已刷新');
                        }).catch(err => {
                            console.error('刷新聊天历史失败:', err);
                        });
                    }
                } catch (completionError) {
                    console.error('完成回调处理失败:', completionError);
                } finally {
                    // 无论如何都要设置等待状态为false
                    isWaitingResponse.value = false;
                }
            },
            (error) => {
                // 错误回调
                console.error('聊天请求失败:', error);
                try {
                    if (chatStore.currentMessages && chatStore.currentMessages[aiMsgIndex]) {
                        // 创建消息副本，更新错误状态
                        const currentMsgs = [...chatStore.currentMessages];
                        currentMsgs[aiMsgIndex].content = '抱歉，请求失败';
                        currentMsgs[aiMsgIndex].status = 'error';
                        
                        // 更新chatStore和本地消息数组
                        chatStore.setChatMessages(chatId, currentMsgs);
                        chatStore.currentMessages = currentMsgs;
                    }
                } catch (errorHandlingError) {
                    console.error('错误处理失败:', errorHandlingError);
                } finally {
                    // 无论如何都要设置等待状态为false
                    isWaitingResponse.value = false;
                }
            }
        );
    } catch (error) {
        console.error('发送消息失败:', error);
        uni.showToast({
            title: '发送失败',
            icon: 'none'
        });
        
        try {
            // 更新AI消息为错误状态
            if (chatStore.currentMessages && chatStore.currentMessages[aiMsgIndex]) {
                const currentMsgs = [...chatStore.currentMessages];
                currentMsgs[aiMsgIndex].content = '发送失败，请重试';
                currentMsgs[aiMsgIndex].status = 'error';
                
                chatStore.setChatMessages(chatId, currentMsgs);
                chatStore.currentMessages = currentMsgs;
            }
        } catch (e) {
            console.error('更新错误消息失败:', e);
        }
        
        // 设置等待状态为false
        isWaitingResponse.value = false;
    }
};

// 切换到其他会话
const switchChat = async (chatId) => {
    try {
        // 查找并切换会话索引
        const chatIndex = chatStore.chatHistory.findIndex(chat => chat.id === chatId);
        if (chatIndex !== -1) {
            // 设置当前会话索引
            chatStore.chatIndex = chatIndex;
            
            // 关闭侧边栏
            closeSidebar();
            
            // 更新当前角色信息
            getCurrentRoleInfo();
            
            // 重置等待状态，确保切换角色后可以发送消息
            isWaitingResponse.value = false;
            
            // 检查chatMap中是否已有该会话的消息
            let cachedMessages = chatStore.getChatMessages(chatId);
            
            if (cachedMessages && cachedMessages.length > 0) {
                // 创建一个新的数组引用，避免共享引用导致的混淆
                cachedMessages = [...cachedMessages];
                
                // 使用chatStore提供的方法更新currentMessages，传入新的数组引用
                chatStore.setChatMessages(chatId, cachedMessages);
                
                // 同步更新本地的messages数组，使用新的数组引用
                messages.value = [...cachedMessages];
                chatStore.currentMessages = cachedMessages;
                
                console.log('使用缓存的消息:', cachedMessages);
                
                // 滚动到最新消息
                scrollToBottom();
            } else {
                // 如果没有缓存，获取并显示消息
                await loadChatMessages(chatId);
            }
            
            // 更新URL参数，不刷新页面 - 添加兼容性处理
            try {
                const url = `/pages/chat/chat?chatId=${chatId}`;
                // 检查history对象是否存在且有replaceState方法
                if (typeof history !== 'undefined' && history && typeof history.replaceState === 'function') {
                    history.replaceState(null, '', url);
                } else {
                    // 对于不支持history API的平台（如iOS小程序），可以忽略或使用其他方式
                    console.log('当前环境不支持history.replaceState，跳过URL更新');
                }
            } catch (urlError) {
                console.error('URL更新失败，但不影响功能:', urlError);
            }
        }
    } catch (error) {
        console.error('切换会话失败:', error);
        uni.showToast({
            title: '切换会话失败',
            icon: 'none'
        });
        // 出错时也要重置等待状态
        isWaitingResponse.value = false;
    }
};

// 滚动到底部
const scrollToBottom = () => {
    try {
        // 如果用户正在手动滚动或已禁用自动滚动，则不执行自动滚动
        if (!autoScrollEnabled.value && isUserScrolling.value) {
            console.log('用户正在滚动，暂停自动滚动');
            return;
        }

        // 使用 nextTick 确保 DOM 已更新
        nextTick(() => {
            if (chatStore.currentMessages.length > 0) {
                // 只有当允许自动滚动时，才设置scrollIntoView
                if (autoScrollEnabled.value) {
                const lastIndex = chatStore.currentMessages.length - 1;
                scrollIntoView.value = `msg-${lastIndex}`;
                
                    // 短暂延时确保DOM已更新
                setTimeout(() => {
                        // 使用节点查询方式滚动
                        const query = uni.createSelectorQuery().in(getCurrentInstance());
                        query.select('.message-list').boundingClientRect(res => {
                            if (res) {
                                const lastMsgQuery = uni.createSelectorQuery().in(getCurrentInstance());
                                lastMsgQuery.select(`#msg-${lastIndex}`).boundingClientRect(lastMsgRes => {
                                    if (lastMsgRes) {
                                        // 计算需要滚动的位置，确保最后一条消息完全可见
                                        const scrollPosition = lastMsgRes.top - res.top + lastMsgRes.height + 100;
                                        
                                        // 获取scroll-view节点
                                        const scrollViewQuery = uni.createSelectorQuery().in(getCurrentInstance());
                                        scrollViewQuery.select('.message-list').node(scrollNode => {
                                            if (scrollNode && scrollNode.node) {
                                                // 直接设置scrollTop到最大值
                                                scrollNode.node.scrollTop = 999999;
                                            }
                                        }).exec();
                                        
                                        // 使用pageScrollTo作为备份方案
                                        uni.pageScrollTo({
                                            scrollTop: scrollPosition,
                                            duration: 100
                                        });
                                    }
                                }).exec();
                            }
                        }).exec();
                        
                        // 重置scrollIntoView值再设置，强制触发滚动
                        scrollIntoView.value = '';
                        nextTick(() => {
                            scrollIntoView.value = `msg-${lastIndex}`;
                        });
                    }, 50);
                }
            }
        });
    } catch (error) {
        console.error('滚动到底部函数执行失败:', error);
    }
};

// 格式化时间
const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

// 返回上一页
const goBack = () => {
    uni.navigateBack();
};

// 复制消息到剪贴板
const copyMessage = (content) => {
    uni.setClipboardData({
        data: content,
        success: () => {
            uni.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 1500
            });
        }
    });
};

// 显示新建会话弹窗
const showNewChatDialog = async () => {
    showNewChatModal.value = true;
    isEditMode.value = false; // 确保新建模式
    // 获取人设列表
    await getRoles();
    
    // 添加延迟以确保DOM更新后再添加动画类
    setTimeout(() => {
        modalActive.value = true;
    }, 50);
};

// 关闭新建会话弹窗
const closeNewChatDialog = () => {
    modalClosing.value = true;
    modalActive.value = false;
    
    // 如果人设选择器是打开的，先关闭它
    if (showRolePickerModal.value) {
        rolePickerClosing.value = true;
        setTimeout(() => {
            showRolePickerModal.value = false;
            rolePickerClosing.value = false;
        }, 300);
    }
    
    setTimeout(() => {
        showNewChatModal.value = false;
        modalClosing.value = false;
        isEditMode.value = false; // 重置编辑模式标志
        
        // 重置人设选择
        selectedRoleName.value = '请选择人设';
        selectedRoleId.value = null;
        selectedRoleAvatar.value = '';
    }, 300);
};

// 获取人设列表
const getRoles = async () => {
    try {
        console.log('开始获取人设列表');
        const res = await chatApi.getRoles();
        console.log('人设API返回结果:', res);
        
        if (res) {
            // 打印出返回数据的详细信息
            console.log('API返回的人设数据详情:');
            res.forEach((role, index) => {
                console.log(`人设${index + 1}:`, JSON.stringify(role));
            });
            
            // 手动添加测试数据，确保至少有一个可见的人设选项       
            const testData = [...res];
            if (testData.length === 0) {
                testData.push({
                    id: 1,
                    name: "自律管家",
                    isSystem: true
                });
            }
            
            // 将响应赋值给rolesList
            rolesList.value = testData;
            console.log('处理后的人设列表:', rolesList.value);
        } else {
            console.error('人设数据格式异常:', res);
            // 添加测试数据以便调试
            rolesList.value = [{
                id: 1,
                name: "自律管家",
                isSystem: true
            }];
        }
    } catch (error) {
        console.error('获取人设列表失败:', error);
        // 添加测试数据以便调试
        rolesList.value = [{
            id: 1,
            name: "自律管家", 
            isSystem: true
        }];
        uni.showToast({
            title: '获取人设列表失败',
            icon: 'none'
        });
    }
};

// 根据ID获取人设名称并更新selectedRoleName
const getRoleNameById = (roleId) => {
    console.log('查找roleId:', roleId, '当前角色列表:', rolesList.value);
    const role = rolesList.value.find(role => role.id === roleId);
    if (role) {
        selectedRoleName.value = role.name;
        selectedRoleId.value = role.id; // 更新选中ID
        selectedRoleAvatar.value = role.avatar || ''; // 更新选中头像
        return role.name;
    }
    return '请选择人设';
};

// 显示人设选择器
const showRolePicker = () => {
    showRolePickerModal.value = true;
};

// 隐藏人设选择器
const hideRolePicker = () => {
    rolePickerClosing.value = true;
    setTimeout(() => {
        showRolePickerModal.value = false;
        rolePickerClosing.value = false;
    }, 300);
};

// 选择人设
const selectRole = (role, index) => {
    console.log('选择人设:', role);
    if (role) {
        newChat.value.roleId = role.id;
        selectedRoleName.value = role.name;
        selectedRoleId.value = role.id; // 更新选中ID
        selectedRoleAvatar.value = role.avatar || ''; // 更新选中头像
        console.log('已选择人设:', role.name, '(ID:', role.id, ')');
        hideRolePicker();
    }
};

// 处理TopK滑块变化
const handleTopKChange = (e) => {
    newChat.value.topK = e.detail.value;
};

// 处理相似度滑块变化
const handleSimilarityChange = (e) => {
    // 将0-100的值转换为0-1的小数，并保留1位小数
    newChat.value.similarity = Math.round(e.detail.value) / 100;
};

// 编辑会话
const editChat = (chat) => {
    showNewChatModal.value = true;
    isEditMode.value = true; // 设置为编辑模式
    // 设置新建会话表单为当前选中会话的信息
    newChat.value = {
        id: chat.id,
        chatName: chat.chatName || '',
        topK: chat.topK || 5,
        similarity: chat.similarity || 0.5,
        roleId: chat.roleId || null
    };
    
    // 如果有roleId，获取对应的角色名称和头像
    if (chat.roleId) {
        const role = rolesList.value.find(role => role.id === chat.roleId);
        if (role) {
            selectedRoleName.value = role.name || '请选择人设';
            selectedRoleId.value = role.id;
            selectedRoleAvatar.value = role.avatar || '';
    } else {
        selectedRoleName.value = '请选择人设';
            selectedRoleId.value = null;
            selectedRoleAvatar.value = '';
        }
    } else {
        selectedRoleName.value = '请选择人设';
        selectedRoleId.value = null;
        selectedRoleAvatar.value = '';
    }
    
    // 添加延迟以确保DOM更新后再添加动画类
    setTimeout(() => {
        modalActive.value = true;
    }, 50);
};

// 确认删除会话
const confirmDeleteChat = (chat) => {
    uni.showModal({
        title: '删除会话',
        content: '确定要删除此会话吗？此操作不可恢复。',
        confirmColor: '#FF3B30',
        success: (res) => {
            if (res.confirm) {
                deleteChat(chat.id);
            }
        }
    });
};

// 删除会话
const deleteChat = async (chatId) => {
    try {
        const res = await chatApi.deleteChat(chatId);
        console.log(res)
        if (res) {
            uni.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
            });
            
            // 检查是否删除的是当前会话
            const isCurrentChat = chatStore.chatHistory.length > 0 && 
                chatStore.chatIndex >= 0 && 
                chatStore.chatHistory[chatStore.chatIndex].id === chatId;
            
            // 从chatStore.chatMap中删除该会话的缓存
            if (chatStore.chatMap && chatStore.chatMap.has(chatId)) {
                console.log(`从chatMap中删除会话缓存: ${chatId}`);
                chatStore.chatMap.delete(chatId);
            }
            
            // 从chatStore.chatHistory中删除该会话
            // 注意：这里直接操作是为了确保立即更新，refreshHistoryChat会从服务器重新获取
            const chatIndex = chatStore.chatHistory.findIndex(chat => chat.id === chatId);
            if (chatIndex !== -1) {
                console.log(`从chatHistory中删除会话: ${chatId}, 索引: ${chatIndex}`);
                chatStore.chatHistory.splice(chatIndex, 1);
            }
            
            // 刷新会话列表
            await refreshHistoryChat();
            
            // 处理删除当前会话的情况
            if (isCurrentChat) {
                console.log('删除的是当前会话');
                
                // 如果刷新后仍有会话
            if (chatStore.chatHistory.length > 0) {
                    // 设置索引为0，但不切换会话
                    chatStore.chatIndex = 0;
                    
                    // 获取第一个会话的ID
                    const firstChatId = chatStore.chatHistory[0].id;
                    
                    // 调用接口获取消息
                    const messages = await loadChatMessages(firstChatId);
                    console.log('加载第一个会话的消息:', messages);
                    
                    // 更新当前角色信息
                    getCurrentRoleInfo();
                } else {
                    // 如果没有会话了，清空当前消息列表
                    chatStore.currentMessages = [];
                    // 更新当前角色信息（清空）
                    currentRoleName.value = '';
                    currentRoleAvatar.value = '';
                }
            } else {
                // 如果删除的不是当前会话但已经没有会话了
                if (chatStore.chatHistory.length === 0) {
                    // 清空当前消息列表
                    chatStore.currentMessages = [];
                    // 更新当前角色信息（清空）
                    currentRoleName.value = '';
                    currentRoleAvatar.value = '';
                }
            }
        } else {
            uni.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
            });
        }
    } catch (error) {
        console.error('删除会话失败:', error);
        uni.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000
        });
    }
};

// 修改创建新会话函数，支持编辑功能
const createNewChat = async () => {
    try {
        // 验证表单
        if (newChat.value.topK && (isNaN(newChat.value.topK) || newChat.value.topK <= 0)) {
            uni.showToast({
                title: 'TopK必须为正整数',
                icon: 'none'
            });
            return;
        }
        
        if (newChat.value.similarity && (isNaN(newChat.value.similarity) || newChat.value.similarity < 0 || newChat.value.similarity > 1)) {
            uni.showToast({
                title: '相似度必须在0-1之间',
                icon: 'none'
            });
            return;
        }
        
        // 验证会话名称长度
        if (newChat.value.chatName && newChat.value.chatName.length > 10) {
            uni.showToast({
                title: '会话名称最多10个字符',
                icon: 'none'
            });
            return;
        }
        
        // 验证必须选择人设
        if (!newChat.value.roleId) {
            uni.showToast({
                title: '请选择人设',
                icon: 'none'
            });
            return;
        }
        
        // 准备提交数据
        const chatData = {
            chatName: newChat.value.chatName || '',
            topK: newChat.value.topK || 5,
            similarity: newChat.value.similarity || 0.5,
            roleId: newChat.value.roleId  // 移除默认值null
        };
        
        let res;
        
        // 判断是新建还是编辑
        if (newChat.value.id) {
            // 编辑现有会话
            chatData.id = newChat.value.id;
            console.log('更新会话数据:', chatData);
            res = await chatApi.editChat(chatData);  // 修改这里，使用正确的API方法名称
            console.log('更新会话响应:', res);
        } else {
            // 新建会话
            console.log('创建会话数据:', chatData);
            res = await chatApi.createChat(chatData);
            console.log('创建会话响应:', res);
        }
        
        if (res) {
            // 关闭弹窗
            closeNewChatDialog();
            
            // 保存新创建/编辑的会话ID
            const chatId = newChat.value.id || res;
            
            // 重置表单
            newChat.value = {
                chatName: '',
                topK: 5,
                similarity: 0.5,
                roleId: null
            };
            selectedRoleName.value = '请选择人设';
            selectedRoleId.value = null;
            selectedRoleAvatar.value = '';
            isEditMode.value = false; // 重置编辑模式
            
            // 刷新聊天历史
            await refreshHistoryChat();
            
            // 如果是新建会话，自动切换到该会话
            if (!newChat.value.id) {
                // 查找新创建的会话在列表中的位置
                const newChatIndex = chatStore.chatHistory.findIndex(chat => chat.id === chatId);
                if (newChatIndex !== -1) {
                    // 切换到新创建的会话
                    await switchChat(chatId);
                    console.log('已切换到新创建的会话:', chatId);
                } else {
                    console.error('未找到新创建的会话:', chatId);
                    // 如果找不到，切换到第一个会话
                    if (chatStore.chatHistory.length > 0) {
                        const firstChatId = chatStore.chatHistory[0].id;
                        await switchChat(firstChatId);
                        console.log('切换到第一个会话:', firstChatId);
                    }
                }
            } else {
                // 如果是编辑会话，切换到编辑后的会话
                await switchChat(chatId);
                console.log('已切换到编辑后的会话:', chatId);
            }
        } else {
            uni.showToast({
                title: res.message || (newChat.value.id ? '更新会话失败' : '创建会话失败'),
                icon: 'none'
            });
        }
    } catch (error) {
        console.error(newChat.value.id ? '更新会话失败:' : '创建会话失败:', error);
        uni.showToast({
            title: newChat.value.id ? '更新会话失败' : '创建会话失败',
            icon: 'none'
        });
    }
};

// 渲染Markdown函数
const renderMarkdown = (content) => {
    if (!content) return '';
    try {
        // 使用marked将Markdown转换为HTML
        const html = marked(content);
        // 安全地使用DOMPurify清理HTML以防止XSS攻击
        try {
            if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
        return DOMPurify.sanitize(html);
            } else {
                // 如果DOMPurify不可用，使用简单的清理
                return html
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
                    .replace(/javascript:/gi, '')
                    .replace(/on\w+\s*=/gi, '')
                    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
                    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
            }
        } catch (purifyError) {
            console.warn('DOMPurify清理失败，使用原始HTML:', purifyError);
            return html;
        }
    } catch (error) {
        console.error('Markdown渲染失败:', error);
        return content;
    }
};

// 打开/关闭侧边栏
const toggleSidebar = () => {
    if (isSidebarOpen.value) {
        closeSidebar();
    } else {
        openSidebar();
    }
};

// 打开侧边栏
const openSidebar = () => {
    // 如果已经打开，不需要重复操作
    if (isSidebarOpen.value) return;
    
    // 先显示侧边栏
    sidebarVisible.value = true;
    
    // 在下一帧添加激活类，触发动画
    setTimeout(() => {
        isSidebarOpen.value = true;
        sidebarDragPosition.value = 0; // 重置拖动位置
    }, 10);
};

// 关闭侧边栏
const closeSidebar = () => {
    // 如果已经关闭，不需要重复操作
    if (!isSidebarOpen.value && !sidebarVisible.value) return;
    
    sidebarClosing.value = true;
    isSidebarOpen.value = false;
    sidebarDragPosition.value = 0; // 重置拖动位置
    
    // 等待动画完成后隐藏侧边栏
    setTimeout(() => {
        sidebarVisible.value = false;
        sidebarClosing.value = false;
    }, 600); // 动画持续时间与CSS中的transition时间一致
};

// 格式化日期显示 (年-月-日)
const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};

// 手势相关变量
const touchStartX = ref(0);
const touchStartY = ref(0); // 添加触摸开始Y坐标
const touchEndX = ref(0);
const touchCurrentX = ref(0); // 当前触摸位置
const sidebarWidth = 500; // 侧边栏宽度 (rpx)
const sidebarDragPosition = ref(0); // 侧边栏当前拖动位置 (0-100%)
const isDraggingSidebar = ref(false); // 是否正在拖动侧边栏
const minSwipeDistance = 150; // 增大滑动触发距离，让用户必须用力滑动
const minSwipeSpeed = 2.0; // 提高速度阈值，要求更快速的滑动
const touchStartTime = ref(0); // 记录触摸开始时间，用于计算滑动速度

// 处理触摸开始
const handleTouchStart = (event) => {
    // 记录初始触摸位置
    touchStartX.value = event.touches[0].clientX;
    touchStartY.value = event.touches[0].clientY; // 记录垂直位置
    touchCurrentX.value = event.touches[0].clientX;
    touchStartTime.value = Date.now();
    
    // 如果触摸开始于屏幕左侧边缘区域，标记为可能的侧边栏拖动
    if (touchStartX.value < 50) {
        console.log('左侧边缘触摸开始');
    }
};

// 处理触摸移动
const handleTouchMove = (event) => {
    // 只有当有有效的开始触摸点时才处理
    if (touchStartX.value <= 0) return;
    
    touchCurrentX.value = event.touches[0].clientX;
    touchEndX.value = event.touches[0].clientX;
    
    // 计算水平和垂直滑动距离
    const deltaX = touchCurrentX.value - touchStartX.value;
    const deltaY = event.touches[0].clientY - touchStartY.value; // 垂直距离
    
    // 如果主要是垂直滑动，不处理手势以允许消息列表滚动
    const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);
    if (isVerticalSwipe) return;
    
    // 只处理向右滑动(正值)，且只在屏幕左侧开始的滑动
    if (deltaX > 0 && touchStartX.value < 50) {
        isDraggingSidebar.value = true;
        
        // 如果侧边栏尚未显示，先显示它
        if (!sidebarVisible.value) {
            sidebarVisible.value = true;
        }
        
        // 计算拖动位置百分比 (0-100%)
        // 限制在500rpx宽度内，转换为像素
        // 假设1rpx约等于0.5px (这个比例可能需要调整)
        const pixelsPerRpx = 0.5;
        const maxDragPixels = sidebarWidth * pixelsPerRpx;
        
        // 限制拖动不超过侧边栏宽度
        const dragPercent = Math.min(100, (deltaX / maxDragPixels) * 100);
        sidebarDragPosition.value = dragPercent;
        
        // 阻止默认行为以防止页面滚动，但只在明确是水平滑动时
        event.preventDefault();
    }
};

// 处理触摸结束
const handleTouchEnd = () => {
    // 如果没有有效的开始触摸点，直接返回
    if (touchStartX.value <= 0) return;
    
    // 如果是侧边栏拖动
    if (isDraggingSidebar.value) {
        // 如果拖动超过侧边栏宽度的50%，则完全打开
        if (sidebarDragPosition.value > 50) {
            console.log('拖动超过50%，完全打开侧边栏');
            openSidebar();
        } else {
            // 否则关闭
            console.log('拖动未超过50%，关闭侧边栏');
            closeSidebar();
        }
        
        // 重置拖动状态
        isDraggingSidebar.value = false;
        sidebarDragPosition.value = 0;
    } 
    // 处理快速滑动手势（非拖动）
    else {
        // 计算滑动距离和时间
    const swipeDistance = touchEndX.value - touchStartX.value;
        const swipeTime = Date.now() - touchStartTime.value;
        const swipeSpeed = Math.abs(swipeDistance) / swipeTime;
    
        // 快速右滑
        if (swipeDistance > minSwipeDistance && swipeSpeed > minSwipeSpeed) {
        openSidebar();
    } 
        // 快速左滑
        else if (swipeDistance < -minSwipeDistance * 1.5) {
        goBackToHome();
        }
    }
    
    // 重置触摸值
    touchStartX.value = 0;
    touchStartY.value = 0;
    touchEndX.value = 0;
    touchCurrentX.value = 0;
    touchStartTime.value = 0;
};

// 返回Home页面
const goBackToHome = () => {
    uni.switchTab({
        url: '/pages/home/home'
    });
};

// 显示新建会话弹窗 (从侧边栏调用)
const showNewChatDialogFromSidebar = (event) => {
    // 阻止事件冒泡，防止触发关闭侧边栏
    if (event) {
        event.stopPropagation();
    }
    
    // 关闭侧边栏
    closeSidebar();
    
    // 延迟一下再显示新建会话弹窗，让侧边栏先关闭
    setTimeout(() => {
        showNewChatDialog();
    }, 300);
};

// 添加一个专门用于聚焦输入框的函数
const focusMessageInput = () => {
    console.log('尝试聚焦输入框...');
    
    // 使用多次尝试的方式，增加成功率
        setTimeout(() => {
        try {
            // 方法1: 使用DOM直接聚焦
            const inputElement = document.querySelector('.message-input');
            if (inputElement) {
                inputElement.focus();
                console.log('DOM直接聚焦尝试完成');
            }
        } catch (e) {
            console.error('DOM聚焦失败:', e);
        }
        
        // 方法2: 使用ref聚焦
        try {
            if (messageInput.value) {
                messageInput.value.focus && messageInput.value.focus();
                console.log('Ref聚焦尝试完成');
            }
        } catch (e) {
            console.error('Ref聚焦失败:', e);
        }
        
        // 方法3: 使用uni-app API
        try {
            uni.createSelectorQuery()
                .select('.message-input')
                .node(res => {
                    if (res && res.node) {
                        res.node.focus();
                        console.log('Node API聚焦尝试完成');
                    }
                }).exec();
        } catch (e) {
            console.error('Node API聚焦失败:', e);
        }
        
        // 方法4: 使用uni原生方法
        setTimeout(() => {
            try {
                        uni.hideKeyboard();
                        setTimeout(() => {
                            uni.showKeyboard();
                    console.log('原生键盘方法尝试完成');
                        }, 300);
            } catch (e) {
                console.error('原生键盘方法失败:', e);
                    }
        }, 500);
    }, 800);
    
    // 再次尝试聚焦（延迟更长时间）
    setTimeout(() => {
        console.log('再次尝试聚焦...');
        try {
            const query = uni.createSelectorQuery().in(getCurrentInstance());
            query.select('.message-input').boundingClientRect(res => {
                if (res) {
                    // 找到输入框后聚焦
                    setTimeout(() => {
                        try {
                            if (messageInput.value) {
                                messageInput.value.focus && messageInput.value.focus();
                            }
                            uni.showKeyboard();
                            console.log('延迟聚焦尝试完成');
                        } catch (e) {
                            console.error('延迟聚焦失败:', e);
                        }
                    }, 300);
                }
            }).exec();
        } catch (e) {
            console.error('查询输入框失败:', e);
        }
    }, 1500);
};

// 获取历史消息
const getChatMessages = async () => {
    try {
        // 获取URL参数中的chatId
        let targetChatId;
        
        // 安全地获取URL参数
        try {
            const query = uni.getQueryString ? uni.getQueryString() : {};
            if (query && query.chatId) {
                targetChatId = query.chatId;
            }
        } catch (queryError) {
            console.error('获取URL参数失败:', queryError);
            // 继续执行，使用默认会话
        }
        
        if (targetChatId) {
            // 设置当前会话索引
            const chatIndex = chatStore.chatHistory.findIndex(chat => chat.id === targetChatId);
            if (chatIndex !== -1) {
                console.log('根据URL参数设置聊天索引:', chatIndex);
                chatStore.chatIndex = chatIndex;
                
                // 检查是否有缓存的消息
                const cachedMessages = chatStore.getChatMessages(targetChatId);
                if (cachedMessages && cachedMessages.length > 0) {
                    // 使用缓存中的消息，创建新的数组引用避免共享
                    const messagesCopy = [...cachedMessages];
                    
                    // 使用chatStore提供的方法更新currentMessages
                    chatStore.setCurrentMessages(targetChatId);
                    
                    // 更新本地消息数组，使用新的数组引用
                    messages.value = messagesCopy;
                    chatStore.currentMessages = messagesCopy;
                    
                    // 滚动到最新消息
                    setTimeout(() => {
                        autoScrollEnabled.value = true; // 确保允许自动滚动
                    scrollToBottom();
                    }, 300);
                    return;
                }
                
                // 如果没有缓存，加载消息
                await loadChatMessages(targetChatId);
            } else {
                console.error('在聊天历史中找不到指定的chatId:', targetChatId);
            }
        } else {
            // 如果没有chatId，使用当前选中的会话
            if (chatStore.chatHistory.length > 0) {
                console.log('使用当前选中的聊天索引:', chatStore.chatIndex);
                if (chatStore.chatIndex < 0 || chatStore.chatIndex >= chatStore.chatHistory.length) {
                    chatStore.chatIndex = 0; // 重置为有效索引
                }
                const currentChat = chatStore.chatHistory[chatStore.chatIndex];
                if (currentChat) {
                    targetChatId = currentChat.id;
                    
                    // 检查是否有缓存的消息
                    const cachedMessages = chatStore.getChatMessages(targetChatId);
                    if (cachedMessages && cachedMessages.length > 0) {
                        // 使用缓存中的消息，创建新的数组引用避免共享
                        const messagesCopy = [...cachedMessages];
                        
                        // 使用chatStore提供的方法更新currentMessages
                        chatStore.setCurrentMessages(targetChatId);
                        
                        // 更新本地消息数组，使用新的数组引用
                        messages.value = messagesCopy;
                        chatStore.currentMessages = messagesCopy;
                        
                        // 滚动到最新消息
                        setTimeout(() => {
                            autoScrollEnabled.value = true; // 确保允许自动滚动
                        scrollToBottom();
                        }, 300);
                        return;
                    }
                    
                    // 如果没有缓存，加载消息
                    await loadChatMessages(targetChatId);
                } else {
                    console.error('当前聊天索引无效或聊天数据异常');
                }
            } else {
                console.log('没有可用的聊天会话');
            }
        }
        
        // 确保无论如何都滚动到底部
        setTimeout(() => {
            autoScrollEnabled.value = true;
            scrollToBottom();
        }, 500);
    } catch (error) {
        console.error('获取聊天消息失败:', error);
        uni.showToast({
            title: '获取聊天记录失败',
            icon: 'none'
        });
    }
};

// 刷新聊天历史
const refreshHistoryChat = async () => {
    try {
        console.log('刷新聊天历史')
        // 保存当前选中的聊天ID（如果有的话）
        const currentChatId = chatStore.chatHistory.length > 0 && chatStore.chatIndex >= 0 
            ? chatStore.chatHistory[chatStore.chatIndex].id 
            : null;
        console.log('当前选中的聊天ID:', currentChatId);
            
        const res = await chatApi.chatHistory();
        console.log('获取聊天历史:', res);
        
        if (res && Array.isArray(res)) {
            console.log('设置chatStore',res)
            chatStore.chatHistory = res
            
            if (res.length > 0) {
                if (currentChatId) {
                    // 尝试在新列表中找到之前选中的聊天
                    const newIndex = res.findIndex(chat => chat.id === currentChatId);
                    if (newIndex !== -1) {
                        // 如果找到，使用该索引
                        console.log('保持之前选择的聊天索引:', newIndex);
                        chatStore.chatIndex = newIndex;
                    } else {
                        // 如果找不到，使用默认索引0
                        console.log('未找到之前的聊天，使用索引0');
                        chatStore.chatIndex = 0;
                    }
                } else {
                    // 如果之前没有选择聊天，使用默认索引0
                    console.log('没有之前选择的聊天，使用索引0');
                    chatStore.chatIndex = 0;
                }
            }
        } else {
            console.error('获取聊天历史数据格式异常:', res);
            // 确保chatHistory至少是一个空数组
            chatStore.chatHistory = [];
        }
    } catch (error) {
        console.error('刷新聊天历史失败:', error);
        // 确保chatHistory至少是一个空数组
        chatStore.chatHistory = [];
    }
}

// 页面加载时获取消息，不自动聚焦输入框
onMounted(async () => {
    console.log('页面加载，开始初始化...');
    
    // 设置首次访问标记
    isFirstVisit.value = true;
    isUserTap.value = false;
    
    try {
        // 先获取人设列表，以便在需要时可以立即使用
        await getRoles();
        console.log('人设列表已加载');
        
        // 刷新聊天历史并更新到store
        await refreshHistoryChat();
        console.log('聊天历史已刷新');
        
        // 根据URL参数或当前选择获取聊天消息
        await getChatMessages();
        console.log('聊天消息已加载');
        
        // 获取当前角色信息
        getCurrentRoleInfo();
        console.log('当前角色信息已更新');

        // 监听新消息内容事件，实现流式响应的实时滚动
        uni.$on('chat:newContent', (data) => {
            // 确保是当前聊天的内容更新才触发滚动
            const currentChatId = chatStore.chatHistory[chatStore.chatIndex]?.id;
            if (data && data.currentChatId === currentChatId) {
                // 直接滚动到底部
                scrollToBottom();
                
                // 为了确保在所有设备上的兼容性，添加一个短延时滚动
                setTimeout(() => {
                    scrollToBottom();
                }, 50);
            }
        });
        
        // 在chatStore的currentMessages变化时也触发滚动
        watch(() => chatStore.currentMessages.length, (newLen, oldLen) => {
            if (newLen > oldLen) {
    nextTick(() => {
                    scrollToBottom();
                });
            }
        });
        
        // 首次进入页面，确保滚动到底部 - 使用多次尝试确保成功
        nextTick(() => {
            scrollToBottom();
            
            // 延迟再次尝试，以确保在所有情况下都能滚到底部
            setTimeout(() => {
                autoScrollEnabled.value = true; // 强制启用自动滚动
                scrollToBottom();
            }, 500);
            
            setTimeout(() => {
                autoScrollEnabled.value = true; // 强制启用自动滚动
                scrollToBottom();
            }, 1000);
        });
        
        // 专门为iOS设备添加处理，防止输入框自动聚焦
        if (isIOS()) {
            console.log('检测到iOS设备，应用特殊处理');
            
            // 预先隐藏键盘
            uni.hideKeyboard();
            
            // 设置iOS专用的键盘处理
            setupIOSKeyboardHandling();
        }
    } catch (error) {
        console.error('初始化过程中出错:', error);
        uni.showToast({
            title: '加载失败，请重试',
            icon: 'none'
        });
    }

    // 2秒后允许用户正常点击输入框，无需额外逻辑
    setTimeout(() => {
        console.log('页面初始化完成，重置首次访问标记');
        isFirstVisit.value = false;
    }, 2000);
});

// 添加输入框的ref引用
const messageInput = ref(null);

// 添加平台检测函数
const isIOS = () => {
    // #ifdef APP-PLUS
    const platform = uni.getSystemInfoSync().platform;
    return platform.toLowerCase() === 'ios';
    // #endif
    
    // #ifdef H5
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // #endif
    
    // 其他平台默认返回false
    return false;
};

// 添加页面卸载处理
onUnmounted(() => {
    console.log('聊天页面卸载');
    // 清理事件监听器
    uni.$off('chat:newContent');
});

// 处理输入法中的确认发送事件
const handleConfirmSend = () => {
    console.log('确认发送消息');
    if (chatStore.chatHistory.length > 0 && !isWaitingResponse.value && inputMessage.value.trim().length > 0) {
        // 关闭键盘
        uni.hideKeyboard();
        // 延迟执行发送操作，确保键盘先收起
        setTimeout(() => {
            sendMessage();
        }, 50);
    }
};

// 处理点击发送按钮事件
const handleSendClick = () => {
    console.log('点击发送按钮');
    if (inputMessage.value.trim().length > 0 && chatStore.chatHistory.length > 0 && !isWaitingResponse.value) {
        // 关闭键盘
        uni.hideKeyboard();
        // 延迟执行发送操作，确保键盘先收起
        setTimeout(() => {
            sendMessage();
        }, 50);
    }
};

// 添加监听chatStore.currentMessages内容变化的观察者
watch(() => {
    // 创建一个依赖于currentMessages内容的计算属性
    if (chatStore.currentMessages.length > 0) {
        const lastMsg = chatStore.currentMessages[chatStore.currentMessages.length - 1];
        return lastMsg?.content?.length || 0;
    }
    return 0;
}, (newVal, oldVal) => {
    // 当最后一条消息的内容长度变化时，滚动到底部
    if (newVal > oldVal) {
        nextTick(() => {
            scrollToBottom();
        });
    }
});

// 添加滚动控制变量
const manualScrollTop = ref(null);
const isUserScrolling = ref(false);
const lastScrollTop = ref(0);
const autoScrollEnabled = ref(true);
const touchStartYPos = ref(0);

// 处理消息列表的触摸开始事件
const handleListTouchStart = (e) => {
    touchStartYPos.value = e.touches[0].clientY;
    // 允许事件冒泡，不阻止默认行为
};

// 处理消息列表的触摸移动事件
const handleListTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartYPos.value;
    
    // 向上滑动(deltaY < 0)意味着用户想查看更多历史消息
    if (deltaY < -10) {
        isUserScrolling.value = true;
        autoScrollEnabled.value = false;
        console.log('用户正在向上滑动查看历史消息');
    }
    // 不阻止默认滚动行为
};

// 处理消息列表的触摸结束事件
const handleListTouchEnd = () => {
    // 记录用户是否主动滚动的状态，但不立即重置
            setTimeout(() => {
        isUserScrolling.value = false;
    }, 300);
};

// 监听滚动事件
const handleScroll = (e) => {
    const scrollTop = e.detail.scrollTop;
    
    // 判断滚动方向
    const isScrollingDown = scrollTop > lastScrollTop.value;
    lastScrollTop.value = scrollTop;
    
    // 当用户向下滚动到接近底部时，重新启用自动滚动
    if (isScrollingDown) {
        const scrollHeight = e.detail.scrollHeight;
        const clientHeight = e.detail.scrollHeight - e.detail.scrollTop;
        
        // 如果滚动到接近底部，重新启用自动滚动
        if (scrollHeight - scrollTop - clientHeight < 200) {
            autoScrollEnabled.value = true;
        }
    } else {
        // 用户向上滚动时，禁用自动滚动
        if (scrollTop < lastScrollTop.value) {
            autoScrollEnabled.value = false;
        }
    }
};

// 添加必要的键盘高度调整相关函数和样式对象
// 处理键盘弹出的函数
const adjustInputForKeyboard = (height) => {
    try {
        // 获取系统信息
        const sysInfo = uni.getSystemInfoSync();
        const windowHeight = sysInfo.windowHeight;
        
        // 保存键盘高度
        keyboardHeight.value = height;
        
        // 安全距离，确保输入框与键盘之间有足够空间
        const safeDistance = 10;
        
        // 设置输入容器的位置，确保其位于键盘上方
        inputContainerStyle.value.bottom = `${height + safeDistance}px`;
        
        // 设置消息列表的底部边距，为输入框留出空间
        const keyboardHeightRpx = height * 750 / sysInfo.windowWidth;
        messageListStyle.value.bottom = `${keyboardHeightRpx + 120}rpx`;
        
        // 滚动页面确保输入框可见
        setTimeout(() => {
            uni.pageScrollTo({
                scrollTop: 99999, // 滚动到页面底部
                duration: 100
            });
            
            // 滚动消息列表到底部
                scrollToBottom();
        }, 150);
        
        console.log('已调整输入框位置到键盘上方，键盘高度:', height);
    } catch (e) {
        console.error('调整输入框位置失败:', e);
    }
};

// 重置键盘调整
const resetKeyboardAdjustment = () => {
    // 重置样式
    messageListStyle.value.bottom = '60rpx';
    inputContainerStyle.value.bottom = '0';
    
    // 标记键盘已收起
    keyboardHeight.value = 0;
    
    console.log('键盘收起，重置输入框位置');
    
    // 防止在某些情况下页面滚动位置不正确
    setTimeout(() => {
        scrollToBottom();
    }, 300);
};

// 创建响应式的样式对象
const messageListStyle = ref({
    bottom: '60rpx' // 修改为减半后的值
});

const inputContainerStyle = ref({
    bottom: '0'
});

// 处理输入框获得焦点事件
const handleInputFocus = (e) => {
    // 如果是用户主动点击，直接允许聚焦
    if (isUserTap.value) {
        console.log('用户主动点击后的聚焦，允许');
        return; // 直接返回，允许聚焦
    }
    
    // 在iOS设备上，首次访问时阻止自动聚焦
    if (isIOS() && isFirstVisit.value) {
        console.log('iOS设备首次自动聚焦，阻止');
        // 阻止事件默认行为
        e && e.preventDefault && e.preventDefault();
        // 立即隐藏键盘
        uni.hideKeyboard();
        // 延时再次隐藏键盘，确保成功
        window.hideKeyboardTimer = setTimeout(() => {
            uni.hideKeyboard();
            console.log('再次隐藏键盘');
        }, 100);
    } else if (isIOS()) {
        // iOS设备上，一般焦点处理
        console.log('iOS设备允许聚焦');
        isFirstVisit.value = false;
    }
};

// 添加一个标记，表示是否是首次访问页面
const isFirstVisit = ref(true);
// 添加标记，跟踪用户是否主动点击了输入框
const isUserTap = ref(false);

// 键盘弹出时调整输入框位置

// 添加键盘相关变量
const keyboardHeight = ref(0);
const isKeyboardVisible = ref(false);

// iOS专用键盘处理设置
const setupIOSKeyboardHandling = () => {
    // #ifdef APP-PLUS
    try {
        // 使用plus.key API (如果可用)
        if (plus && plus.key) {
            // 设置键盘显示事件
            plus.key.addEventListener('showSoftKeybord', function(e) {
                console.log('iOS键盘显示事件，高度:', e.height);
                const height = e.height || 0;
                
                // 保存键盘高度
                keyboardHeight.value = height;
                isKeyboardVisible.value = true;
                
                // 设置输入框位置
                setInputPosition(height);
                
                // 滚动到底部
                setTimeout(() => {
                    scrollToBottom();
                }, 300);
            });
            
            // 设置键盘隐藏事件
            plus.key.addEventListener('hideSoftKeybord', function() {
                console.log('iOS键盘隐藏事件');
                
                // 重置输入框位置
                keyboardHeight.value = 0;
                isKeyboardVisible.value = false;
                inputContainerStyle.value.bottom = '0px';
                messageListStyle.value.bottom = '60rpx';
                
                // 重新滚动到底部
                setTimeout(() => {
                    scrollToBottom();
                }, 300);
            });
        } else {
            console.log('plus.key API不可用，使用uni.onKeyboardHeightChange');
            useUniKeyboardAPI();
        }
    } catch (error) {
        console.error('设置iOS键盘处理失败:', error);
        // 回退到通用方法
        useUniKeyboardAPI();
    }
    // #endif
    
    // #ifndef APP-PLUS
    // 非APP环境，使用uni API
    useUniKeyboardAPI();
    // #endif
}

// 设置输入框位置
const setInputPosition = (keyboardHeight) => {
    // 安全边距
    const safeMargin = 10;
    
    // 设置输入框样式
    inputContainerStyle.value.bottom = `${keyboardHeight + safeMargin}px`;
    
    // 计算rpx值
    const systemInfo = uni.getSystemInfoSync();
    const screenWidth = systemInfo.windowWidth;
    const keyboardHeightRpx = keyboardHeight * 750 / screenWidth;
    
    // 设置消息列表底部距离
    messageListStyle.value.bottom = `${keyboardHeightRpx + 120}rpx`;
    
    console.log('iOS设置输入框位置完成');
}

// 使用uni API处理键盘
const useUniKeyboardAPI = () => {
    uni.onKeyboardHeightChange(res => {
        console.log('键盘高度变化(uni API):', res.height);
        const height = res.height;
        
        if (height > 0) {
            // 键盘显示
            keyboardHeight.value = height;
            isKeyboardVisible.value = true;
            
            // 设置输入框位置
            setInputPosition(height);
            
            // 滚动到底部
            setTimeout(() => {
                scrollToBottom();
            }, 300);
        } else {
            // 键盘隐藏
            keyboardHeight.value = 0;
            isKeyboardVisible.value = false;
            inputContainerStyle.value.bottom = '0px';
            messageListStyle.value.bottom = '60rpx';
            
            // 重新滚动到底部
            setTimeout(() => {
                scrollToBottom();
            }, 300);
        }
    });
}

// 处理输入框失焦事件
const handleInputBlur = () => {
    console.log('输入框失焦');
    // 如果是iOS设备，处理失焦事件
    if (isIOS()) {
        setTimeout(() => {
            // 重置输入框位置
            inputContainerStyle.value.bottom = `env(safe-area-inset-bottom)`;
            messageListStyle.value.bottom = '60rpx';
        }, 100);
    }
};

// 处理输入框点击事件
const handleInputTap = () => {
    console.log('用户主动点击输入框');
    // 立即标记为用户主动点击
    isUserTap.value = true;
    
    // 立即重置首次访问标记，确保聚焦不会被阻止
    isFirstVisit.value = false;
    
    // 短暂延时后聚焦输入框，确保键盘弹出
    setTimeout(() => {
        try {
            // 尝试聚焦
            const query = uni.createSelectorQuery().in(getCurrentInstance());
            query.select('.message-input').node(res => {
                if (res && res.node && res.node.focus) {
                    console.log('强制聚焦输入框');
                    res.node.focus();
                }
            }).exec();
        } catch(e) {
            console.error('聚焦输入框失败:', e);
        }
        }, 50);
    
    // 清除可能的自动隐藏键盘计时器
    if (window.hideKeyboardTimer) {
        clearTimeout(window.hideKeyboardTimer);
        window.hideKeyboardTimer = null;
    }
};

// 处理输入框点击事件
const handleContainerTap = () => {
    console.log('用户点击输入框容器');
    // 立即标记为用户主动点击
    isUserTap.value = true;
    
    // 立即重置首次访问标记，确保聚焦不会被阻止
    isFirstVisit.value = false;
    
    // 短暂延时后聚焦输入框，确保键盘弹出
    setTimeout(() => {
        try {
            // 尝试聚焦
            const query = uni.createSelectorQuery().in(getCurrentInstance());
            query.select('.message-input').node(res => {
                if (res && res.node && res.node.focus) {
                    console.log('强制聚焦输入框');
                    res.node.focus();
                }
            }).exec();
        } catch(e) {
            console.error('聚焦输入框失败:', e);
        }
    }, 50);
    
    // 清除可能的自动隐藏键盘计时器
    if (window.hideKeyboardTimer) {
        clearTimeout(window.hideKeyboardTimer);
        window.hideKeyboardTimer = null;
    }
};
</script>

<style lang="scss" scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: rgb(255, 255, 255); /* 纯白色背景 */
    position: relative;
}

.chat-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255); /* 纯白色背景 */
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
    background-color: rgb(255, 255, 255); /* 与页面背景相同的白色 */
    height: 180rpx; /* 固定高度，与message-list的top值相匹配 */
    box-sizing: border-box; /* 确保padding包含在高度内 */
}

.nav-left {
    width: auto;
    height: auto;
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

.nav-right {
    display: flex;
    align-items: center;
    gap: 30rpx;
    flex: 1;
    justify-content: flex-end;
}

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

.history-btn, .compose-btn {
    margin-left: 20rpx; /* 按钮之间的间距 */
}

.nav-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333; /* 改为黑色 */
}

.nav-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    .role-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rpx;
        
        .role-avatar {
            width: 60rpx;
            height: 60rpx;
            border-radius: 30rpx;
            background: #f5f5f5; /* 浅灰色背景 */
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            
            .avatar-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .avatar-text {
                color: #333; /* 改为黑色 */
                font-size: 30rpx;
                font-weight: 600;
            }
        }
    }
    
    .nav-title {
        color: #333; /* 改为黑色 */
        font-size: 32rpx;
        font-weight: 600;
    }
}

// 修改消息列表区域底部边距
.message-list {
    flex: 1;
    padding: 0;
    padding-bottom: 150rpx; /* 进一步增加底部内边距，确保最后一条消息完全可见 */
    padding-top: 20rpx; /* 顶部增加内边距，改善视觉效果 */
    margin: 0;
    position: absolute;
    top: 180rpx; /* 导航栏高度 */
    bottom: 60rpx; /* 输入框高度 */
    left: 0;
    right: 0;
    z-index: 5;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* 增强iOS滑动体验 */
    touch-action: pan-y; /* 允许垂直平移 */
    background-color: transparent; /* 透明背景 */
    will-change: transform; /* 提高滚动性能 */
    overscroll-behavior: contain; /* 防止过度滚动引起页面回弹 */
    scroll-behavior: smooth; /* 平滑滚动 */
    
    /* 解决iOS上键盘弹出时的问题 */
    transform: translateZ(0);
}

// 添加滚动条样式
.message-list::-webkit-scrollbar {
    width: 4rpx;
}
.message-list::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2rpx;
}

// 调整消息项的边距
.message-item {
    display: flex;
    margin-bottom: 20rpx;
    align-items: flex-start;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
}

.user-message {
    flex-direction: row-reverse;
    justify-content: flex-start;
    width: 100%;
}

.ai-message {
    justify-content: flex-start;
    width: 100%;
}

/* AI消息容器样式 - 全宽显示，无气泡 */
.ai-message-container {
    width: 100%;
    padding: 20rpx 30rpx;
    background-color: transparent;
    position: relative;
    box-sizing: border-box;
}

.ai-message-content {
    width: 100%;
    background-color: transparent;
    position: relative;
}

.ai-message-container .markdown-content {
    width: 100%;
    background-color: transparent;
    color: #333;
    line-height: 1.6;
    font-size: 30rpx;
    word-break: break-word;
    overflow-wrap: break-word;
}

.message-bubble {
    max-width: 70%;
    padding: 20rpx;
    border-radius: 30rpx;
    box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
    position: relative;
    word-wrap: break-word;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.user-message .message-bubble {
    background-color: rgb(242, 242, 242);
    color: #333;
    margin-right: 30rpx;
    position: relative;
    align-items: center;
}

.ai-message .message-bubble {
    background-color: rgb(255, 255, 255);
    color: #333;
    margin-left: 30rpx;
    position: relative;
    align-items: flex-start;
}

// 修改 ai 消息中的 df 部分样式
.ai-message .message-bubble :deep(p) {
    max-width: 100%;
    margin: 0;
    padding: 5rpx 0;
}

// 调整横向溢出的处理
.ai-message .message-bubble :deep(div) {
    max-width: 100%;
    overflow-x: auto;
}

.message-content-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: column;
}

.message-content {
    word-break: break-word;
    line-height: 1.5;
    font-size: 30rpx;
    width: 100%;
    overflow-wrap: break-word;
}

.copy-icon {
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
    width: 30rpx;
    height: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    z-index: 2;
}

// 调整输入容器的样式
.input-container {
    padding: 15rpx 20rpx;
    background-color: rgb(255, 255, 255);
    position: fixed;
    bottom: env(safe-area-inset-bottom); /* 使用iOS安全区域 */
    left: 0;
    right: 0;
    z-index: 999; /* 极高层级确保在最上层 */
    min-height: 80rpx;
    display: flex;
    align-items: center;
    padding-bottom: calc(env(safe-area-inset-bottom) + 15rpx);
    transition: bottom 0.2s ease-out;
    box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
    will-change: bottom;
}

// 调整输入框包装容器样式
.input-wrapper {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 40rpx;
    padding: 10rpx 20rpx;
    position: relative;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10rpx);
    width: 100%; /* 使用全宽 */
    max-width: 710rpx; /* 最大宽度 */
    margin: 0 auto; /* 居中显示 */
}

// 调整输入框样式
.message-input {
    flex: 1;
    height: 70rpx;
    border: none;
    background: transparent;
    font-size: 28rpx;
    padding: 0 10rpx;
    color: #333;
    width: 100%; /* 使用全宽 */
}

.right-icons {
    display: flex;
    align-items: center;
}

.send-btn {
    padding: 10rpx;
    margin-left: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.send-btn.active {
    color: #007AFF;
}

.empty-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
}

.hint-text {
    color: #999999;
    font-size: 30rpx;
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    transition: background-color 0.3s ease;
}

.modal-overlay.active {
    background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
    background-color: #fff;
    border-radius: 20rpx;
    width: 650rpx;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s ease;
    box-sizing: border-box; /* 确保padding计入宽度 */
    padding-bottom: 30rpx; /* 确保底部有足够的空间 */
}

.modal-content.active {
    opacity: 1;
    transform: scale(1);
}

.closing {
    opacity: 0;
    transform: scale(0.9);
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 30rpx 20rpx;
    border-bottom: 1px solid #eee;
}

.popup-title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
}

.popup-close {
    padding: 10rpx;
}

.input-group {
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #f5f5f5;
    position: relative; /* 使其成为相对定位容器 */
    overflow: hidden; /* 确保内容不会溢出 */
}

.input-label {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.char-counter {
    font-size: 24rpx;
    color: #999;
    padding-right: 6rpx;
}

.task-input {
    width: 100%;
    height: 80rpx;
    border: 1px solid #e0e0e0;
    border-radius: 8rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    background-color: #f9f9f9;
}

.chat-name-input {
    padding-right: 40rpx; /* 增加右侧内边距 */
    box-sizing: border-box; /* 确保内边距计入总宽度 */
    margin-right: 10rpx; /* 添加右侧外边距 */
    width: calc(100% - 10rpx); /* 考虑外边距调整宽度 */
}

.slider-container {
    padding: 10rpx 0;
}

.picker-input {
    padding: 0;
    display: flex;
    align-items: center;
}

.picker-content {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
}

.selected-role-avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 25rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
    
    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .avatar-text {
        color: #fff;
        font-size: 24rpx;
        font-weight: 600;
    }
}

.picker-text {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.picker-text.has-avatar {
    padding-left: 10rpx; /* 为头像留出空间 */
}

// 修改人设弹框样式
.role-picker-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.2s ease;
    transition: opacity 0.3s ease;
}

.role-list {
    width: 600rpx;
    max-height: 600rpx;
    background-color: #fff;
    border-radius: 16rpx;
    overflow-y: auto;
    padding: 10rpx 0;
    transform: translateY(0);
    animation: slideUp 0.3s ease;
    transition: transform 0.3s ease, opacity 0.3s ease;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.role-list.closing {
    transform: translateY(50rpx);
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(50rpx);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.role-item {
    padding: 20rpx 30rpx;
    font-size: 30rpx;
    color: #333;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
}

.role-avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-right: 20rpx;
    flex-shrink: 0;
    
    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .avatar-text {
        color: #fff;
        font-size: 30rpx;
        font-weight: 600;
    }
}

.role-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.role-item:last-child {
    border-bottom: none;
}

.role-item:active {
    background-color: #f5f5f5;
}



.popup-actions {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
}

.cancel-btn, .confirm-btn {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 40rpx;
    font-size: 30rpx;
}

.cancel-btn {
    background-color: #f5f5f5;
    color: #666;
    margin-right: 20rpx;
}

.confirm-btn {
    background-color: #007AFF;
    color: #fff;
}

/* Markdown样式 */
.markdown-content {
    text-align: left;
    word-break: break-word;
    width: 100%;
    overflow-wrap: break-word;
    
    /* AI消息容器中的Markdown样式 */
    &.ai-message-container .markdown-content {
        background-color: transparent;
        padding: 0;
        margin: 0;
    }
    
    /* 使用:deep选择器修改Markdown渲染后的元素样式 */
    :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
        margin-top: 16rpx;
        margin-bottom: 16rpx;
        font-weight: bold;
        line-height: 1.4;
        width: 100%;
        overflow-wrap: break-word;
    }
    
    :deep(h1) { font-size: 36rpx; }
    :deep(h2) { font-size: 32rpx; }
    :deep(h3) { font-size: 30rpx; }
    
    :deep(p) {
        margin-bottom: 16rpx;
        line-height: 1.6;
    }
    
    :deep(ul), :deep(ol) {
        padding-left: 40rpx;
        margin-bottom: 16rpx;
    }
    
    :deep(li) {
        margin-bottom: 8rpx;
    }
    
    :deep(code) {
        font-family: monospace;
        background-color: #f3f3f3;
        padding: 4rpx 8rpx;
        border-radius: 4rpx;
        font-size: 28rpx;
        word-break: break-all;
        white-space: pre-wrap;
    }
    
    :deep(pre) {
        background-color: #f3f3f3;
        padding: 16rpx;
        border-radius: 8rpx;
        overflow-x: auto;
        margin-bottom: 16rpx;
        max-width: 100%;
        white-space: pre-wrap;
    }
    
    :deep(pre code) {
        background-color: transparent;
        padding: 0;
        white-space: pre-wrap;
    }
    
    :deep(blockquote) {
        border-left: 8rpx solid #e0e0e0;
        padding-left: 16rpx;
        color: #777;
        margin-left: 0;
        margin-right: 0;
        max-width: 100%;
        box-sizing: border-box;
        overflow-wrap: break-word;
    }
    
    :deep(a) {
        color: #007AFF;
        text-decoration: underline;
    }
    
    :deep(table) {
        border-collapse: collapse;
        margin-bottom: 16rpx;
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        display: block;
    }
    
    :deep(th), :deep(td) {
        border: 1px solid #e0e0e0;
        padding: 8rpx 16rpx;
        text-align: left;
        word-break: break-word;
    }
    
    :deep(th) {
        background-color: #f3f3f3;
    }

    :deep(img) {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
    }

    :deep(ul), :deep(ol) {
        padding-left: 40rpx;
        margin-bottom: 16rpx;
        width: calc(100% - 40rpx);
        overflow-wrap: break-word;
    }
    
    :deep(li) {
        margin-bottom: 8rpx;
        word-break: break-word;
    }
}

// 调整消息内容样式
.message-content {
    word-break: break-word;
    line-height: 1.5;
    font-size: 30rpx;
}

// 用户消息保持居中
.user-message .message-content {
    text-align: center;
}

// AI消息左对齐
.ai-message .message-content {
    text-align: left;
}

// 侧边栏样式
.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 999;
    transition: background-color 0.5s ease;
}

.sidebar-overlay.active {
    background-color: rgba(0, 0, 0, 0.6);
}

.sidebar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 500rpx;
    background-color: #fff;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: translateX(100%);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    will-change: transform;
}

.sidebar.active {
    transform: translateX(0);
    opacity: 1;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.sidebar.closing {
    transform: translateX(100%) !important;
    opacity: 0;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
}

.sidebar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx 30rpx;
    padding-top: calc(var(--status-bar-height) + 20rpx);
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    position: relative;
}

.sidebar-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    text-align: center;
}

.sidebar-actions {
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
}

.new-chat-btn {
    color: #007AFF;
}

.action-btn {
    opacity: 0.8;
    
    &:active {
        opacity: 1;
    }
}

.sidebar-refresh {
    margin-left: 20rpx;
    color: #666;
}

.sidebar-close {
    padding: 10rpx;
}

.history-list {
    flex: 1;
    overflow-y: auto;
}

.history-item {
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    background-color: #fff;
}

.history-item.active {
    background-color: #f0f7ff;
    border-right: 6rpx solid #007AFF;
}

.history-title {
    font-size: 28rpx;
    color: #333;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
}

.history-meta {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    color: #999;
}

.history-actions {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16rpx;
    display: flex;
    gap: 16rpx;
}

.action-btn {
    width: 44rpx;
    height: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
}

.action-btn:active {
    opacity: 1;
}

.empty-history {
    padding: 60rpx 0;
    text-align: center;
    color: #999;
    font-size: 28rpx;
}

.role-picker-modal.closing {
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
}

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
</style>
