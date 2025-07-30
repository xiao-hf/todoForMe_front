<template>
    <view class="role-container">
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
                <view class="back-button" @click="goBack">
                    <uni-icons type="back" size="24" color="#fff"></uni-icons>
            </view>
            </view>
            <view class="nav-center">
                <text class="nav-title">AI人设</text>
            </view>
            <view class="nav-right">
                <!-- 可以添加其他功能按钮，如新建人设 -->
            </view>
        </view>
        
        <!-- 角色列表区域 -->
        <scroll-view class="role-list" 
            scroll-y="true" 
            @scroll="handleScroll"
            refresher-enabled="true"
            refresher-background="transparent"
            :refresher-triggered="refresherTriggered"
            @refresherpulling="handleRefresherPulling"
            @refresherrefresh="handleRefresherRefresh"
            @refresherrestore="handleRefresherRestore"
            style="top: 160rpx;">
            
            <!-- 自定义角色直接显示 -->
            <view class="group-content">
                <uni-card v-for="(role, index) in customRoles" :key="role.id" 
                    :is-shadow="false" 
                    :border="false"
                    margin="8rpx 20rpx"
                    class="role-card role-swipe-container">
                    <view class="role-swipe-wrapper">
                        <view class="role-item" 
                            :style="{ transform: `translateX(${swipeStates[role.id]?.translateX || 0}rpx)` }"
                            @touchstart="handleTouchStart($event, role.id)"
                            @touchmove="handleTouchMove($event, role.id)"
                            @touchend="handleTouchEnd($event, role.id)">
                            <view class="role-icon" :class="{ 'has-avatar': hasAvatar(role) }">
                                <image v-if="hasAvatar(role)" 
                                    :src="getAvatarUrl(role)" 
                                    mode="aspectFill" 
                                    class="avatar-image"
                                    @error="handleAvatarError(role)"
                                    @load="handleAvatarLoad(role)">
                                </image>
                                <text v-else class="icon-text">{{ role.name ? role.name.substring(0, 1) : 'A' }}</text>
                            </view>
                            <view class="role-content" @click="showRoleDetail(role, $event)">
                                <view class="role-header">
                                    <text class="role-name">{{ role.name || '未命名角色' }}</text>
                </view>
                <view class="role-info">
                                    <text class="role-desc">{{ role.prompt ? (role.prompt.length > 50 ? role.prompt.substring(0, 50) + '...' : role.prompt) : '该角色暂无提示词' }}</text>
                                </view>
                            </view>
                            <view class="role-actions">
                                <uni-icons type="more-filled" 
                                    :size="24" 
                                    color="#C7C7CC"
                                    @click="editRoleItem(role, $event)">
                                </uni-icons>
                            </view>
                            
                            <!-- 添加编辑图标 -->
                            <view class="edit-button" @click="openEditModal(role)">
                                <uni-icons type="compose" size="20" color="#667eea"></uni-icons>
                            </view>
                        </view>
                        <view class="delete-action" 
                            v-if="swipeStates[role.id]?.showDelete"
                            @click="confirmDelete(role.id)">
                            <uni-icons type="trash" size="24" color="#fff"></uni-icons>
                        </view>
                    </view>
                </uni-card>
                
                <view class="empty-group-hint" v-if="customRoles.length === 0">
                    <text>暂无自定义人设，点击右下角按钮创建</text>
                </view>
            </view>
            
            <!-- 系统角色分组 -->
            <view class="role-group" v-if="systemRoles.length > 0">
                <view class="section-title" @click="toggleSystemRoles">
                    <uni-icons :type="showSystemRoles ? 'down' : 'right'" size="16" color="rgba(255, 255, 255, 0.7)"></uni-icons>
                    <text class="section-text">系统</text>
                </view>
                
                <view class="group-content" v-if="showSystemRoles">
                    <uni-card v-for="(role, index) in systemRoles" :key="role.id" 
                        :is-shadow="false" 
                        :border="false"
                        margin="8rpx 20rpx"
                        class="role-card role-swipe-container">
                        <view class="role-swipe-wrapper">
                            <view class="role-item" 
                                :style="{ transform: `translateX(${swipeStates[role.id]?.translateX || 0}rpx)` }"
                                :class="{ 'system-role': role.isSystem }">
                                <view class="role-icon" :class="{ 'has-avatar': hasAvatar(role), 'system-role-icon': role.isSystem }">
                                    <image v-if="hasAvatar(role)" 
                                        :src="getAvatarUrl(role)" 
                                        mode="aspectFill" 
                                        class="avatar-image"
                                        @error="handleAvatarError(role)"
                                        @load="handleAvatarLoad(role)">
                                    </image>
                                    <text v-else class="icon-text">{{ role.name ? role.name.substring(0, 1) : 'A' }}</text>
                                </view>
                                <view class="role-content" @click="showRoleDetail(role, $event)">
                                    <view class="role-header">
                    <text class="role-name">{{ role.name || '未命名角色' }}</text>
                    <!-- 删除系统标签 -->
                </view>
                                    <view class="role-info">
                                        <text class="role-desc">{{ role.prompt ? (role.prompt.length > 50 ? role.prompt.substring(0, 50) + '...' : role.prompt) : '该角色暂无提示词' }}</text>
                                    </view>
                                </view>
                                <!-- 移除了more图标 -->
                            </view>
                        </view>
                    </uni-card>
                    
                    <view class="empty-group-hint" v-if="systemRoles.length === 0">
                        <text>暂无系统人设</text>
                    </view>
                </view>
            </view>
            
            <!-- 无数据提示 -->
            <view class="empty-hint" v-if="rolesList.length === 0">
                <text>暂无人设数据</text>
            </view>
        </scroll-view>
        
        <!-- 新建人设按钮 -->
        <view class="add-button-wrapper">
            <view class="add-button" @click="openCreateModal">
                <uni-icons type="plusempty" size="24" color="#fff"></uni-icons>
            </view>
        </view>
        
        <!-- 角色详情弹窗 -->
        <view class="modal-overlay" v-if="showDetailModal" :class="{ 'active': modalActive }" @click="closeRoleDetail">
            <view class="modal-content role-detail-modal" :class="{ 'active': modalActive, 'closing': modalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">{{ currentRole.name }}</text>
                    <view class="popup-close" @click="closeRoleDetail">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                <scroll-view class="prompt-content" scroll-y>
                    <view class="prompt-text">{{ currentRole.prompt || '该角色暂无提示词' }}</view>
                </scroll-view>
            </view>
        </view>
        
        <!-- 新建人设弹窗 -->
        <view class="modal-overlay" v-if="showCreateModal" :class="{ 'active': createModalActive }" @click="closeCreateModal">
            <view class="modal-content create-modal" :class="{ 'active': createModalActive, 'closing': createModalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">新建人设</text>
                    <view class="popup-close" @click="closeCreateModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                <view class="create-form">
                    <view class="form-item">
                        <view class="form-label">
                            <text>名称</text>
                            <text class="char-count">{{newRole.name.length}}/10</text>
                        </view>
                        <input 
                            class="form-input" 
                            v-model="newRole.name" 
                            placeholder="请输入人设名称(10字以内)" 
                            maxlength="10" 
                            @input="validateRoleName"
                        />
                    </view>
                    
                    <view class="form-item">
                        <text class="form-label">头像</text>
                        <view class="avatar-picker">
                            <view class="selected-avatar" @click="chooseAvatar">
                                <image v-if="newRole.avatar" :src="newRole.avatar" mode="aspectFill" class="avatar-image"></image>
                                <view v-else class="avatar-placeholder">
                                    <uni-icons type="camera" size="24" color="#999"></uni-icons>
                                </view>
                            </view>
                        </view>
                    </view>
                    
                    <view class="form-item">
                        <text class="form-label">提示词</text>
                        <textarea 
                            class="form-textarea" 
                            v-model="newRole.prompt" 
                            placeholder="请输入人设提示词" 
                            maxlength="5000"
                        />
                    </view>
                    
                    <view class="form-actions">
                        <button class="cancel-button" @click="closeCreateModal">取消</button>
                        <button class="confirm-button" @click="createNewRole" :disabled="!isFormValid">确定</button>
                    </view>
                </view>
            </view>
        </view>

        <!-- 编辑人设弹窗 -->
        <view class="modal-overlay" v-if="showEditModal" :class="{ 'active': editModalActive }" @click="closeEditModal">
            <view class="modal-content create-modal" :class="{ 'active': editModalActive, 'closing': editModalClosing }" @click.stop>
                <view class="popup-header">
                    <text class="popup-title">编辑人设</text>
                    <view class="popup-close" @click="closeEditModal">
                        <uni-icons type="close" size="20" color="#666"></uni-icons>
                    </view>
                </view>
                <view class="create-form">
                    <view class="form-item">
                        <view class="form-label">
                            <text>名称</text>
                            <text class="char-count">{{editRole.name.length}}/10</text>
                        </view>
                        <input 
                            class="form-input" 
                            v-model="editRole.name" 
                            placeholder="请输入人设名称(10字以内)" 
                            maxlength="10" 
                            @input="validateEditRoleName"
                        />
                    </view>
                    
                    <view class="form-item">
                        <text class="form-label">头像</text>
                        <view class="avatar-picker">
                            <view class="selected-avatar" @click="chooseEditAvatar">
                                <image v-if="editRole.avatar" :src="editRole.avatar" mode="aspectFill" class="avatar-image"></image>
                                <view v-else class="avatar-placeholder">
                                    <uni-icons type="camera" size="24" color="#999"></uni-icons>
                                </view>
                            </view>
                        </view>
                    </view>
                    
                    <view class="form-item">
                        <text class="form-label">提示词</text>
                        <textarea 
                            class="form-textarea" 
                            v-model="editRole.prompt" 
                            placeholder="请输入人设提示词" 
                            maxlength="5000"
                        />
                    </view>
                    
                    <view class="form-actions">
                        <button class="cancel-button" @click="closeEditModal">取消</button>
                        <button class="confirm-button" @click="updateRole" :disabled="!isEditFormValid">确定</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { chatApi } from '@/api/chatApi';
import { useUserStore } from '@/stores/user';
import { baseURL_ } from '@/utils/request';

// 用户store
const userStore = useUserStore();

// 角色列表
const rolesList = ref([]);

// 详情弹窗状态
const showDetailModal = ref(false);
const modalActive = ref(false);
const modalClosing = ref(false);
const currentRole = ref({});

// 创建弹窗状态
const showCreateModal = ref(false);
const createModalActive = ref(false);
const createModalClosing = ref(false);
const newRole = ref({
    name: '',
    avatar: '',    // 头像路径，用于预览
    avatarFile: null, // 头像文件对象，用于上传 (H5/APP环境)
    tempFilePath: '', // 小程序环境下的临时文件路径
    prompt: ''
});

// 编辑弹窗状态
const showEditModal = ref(false);
const editModalActive = ref(false);
const editModalClosing = ref(false);
const editRole = ref({
    id: '',
    name: '',
    avatar: '',
    avatarFile: null,
    tempFilePath: '',
    prompt: ''
});

// 验证表单是否有效
const isFormValid = computed(() => {
    return newRole.value.name.trim().length > 0;
});

// 编辑表单验证
const isEditFormValid = computed(() => {
    return editRole.value.name.trim().length > 0;
});

// 滑动删除相关状态
const swipeStates = ref({});
const touchStartX = ref(0);
const touchStartY = ref(0);
const currentSwipeRoleId = ref(null);

// 下拉刷新相关
const refresherTriggered = ref(false);

// 计算属性 - 当前显示的背景图片
const currentBackgroundImage = computed(() => {
    return userStore.userInfo.backgroudImg || ''
});

// 获取角色列表
const getRolesList = async () => {
    try {
        const res = await chatApi.getRoles();
        console.log('人设API返回结果:', res);
        
        if (res) {
            rolesList.value = res;
            // 打印角色列表中的头像信息，用于调试
            rolesList.value.forEach((role, index) => {
                console.log(`角色[${index}] ${role.name} 头像信息:`, 
                    role.avatar || role.avatarUrl || role.avatarImage || '无头像',
                    '类型:', typeof (role.avatar || role.avatarUrl || role.avatarImage));
            });
        } else {
            rolesList.value = [];
        }
    } catch (error) {
        console.error('获取人设列表失败:', error);
        rolesList.value = [];
        uni.showToast({
            title: '获取人设列表失败',
            icon: 'none'
        });
    }
};

// 验证角色名称
const validateRoleName = (e) => {
    // 限制最大长度为10个字符
    if (newRole.value.name.length > 10) {
        newRole.value.name = newRole.value.name.substring(0, 10);
    }
}

// 验证编辑角色名称
const validateEditRoleName = (e) => {
    // 限制最大长度为10个字符
    if (editRole.value.name.length > 10) {
        editRole.value.name = editRole.value.name.substring(0, 10);
    }
}

// 选择头像
const chooseAvatar = () => {
    uni.chooseImage({
        count: 1, // 最多可以选择的图片张数
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 从相册选择或使用相机
        success: (res) => {
            console.log('选择头像成功, 完整结果:', res);
            
            if (res.tempFilePaths && res.tempFilePaths.length > 0) {
                const tempPath = res.tempFilePaths[0];
                console.log('设置头像路径:', tempPath);
                
                // 设置临时文件路径用于预览
                newRole.value.avatar = tempPath;
                // 统一使用tempFilePath属性存储上传用的路径
                newRole.value.tempFilePath = tempPath;
                
                // H5环境特殊处理
                // #ifdef H5
                console.log('H5环境，检查文件对象');
                if (res.tempFiles && res.tempFiles.length > 0) {
                    const tempFile = res.tempFiles[0];
                    console.log('H5文件信息:', tempFile);
                    
                    if (tempFile.file && (tempFile.file instanceof File || tempFile.file instanceof Blob)) {
                        console.log('获取到File对象，文件大小:', tempFile.size);
                        newRole.value.avatarFile = tempFile.file;
                    } else if (tempFile instanceof File || tempFile instanceof Blob) {
                        console.log('tempFile本身是File对象');
                        newRole.value.avatarFile = tempFile;
                    } else {
                        console.log('尝试从路径创建File对象');
                        // 可能需要使用fetch获取文件
                        createFileFromUrl(tempPath, false);
                    }
                } else {
                    console.log('没有tempFiles数据，尝试从路径创建File对象');
                    createFileFromUrl(tempPath, false);
                }
                // #endif
            }
        },
        fail: (err) => {
            console.error('选择头像失败:', err);
        }
    });
}

// 选择编辑头像
const chooseEditAvatar = () => {
    uni.chooseImage({
        count: 1, // 最多可以选择的图片张数
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 从相册选择或使用相机
        success: (res) => {
            console.log('选择头像成功, 完整结果:', res);
            
            if (res.tempFilePaths && res.tempFilePaths.length > 0) {
                const tempPath = res.tempFilePaths[0];
                console.log('设置头像路径:', tempPath);
                
                // 设置临时文件路径用于预览
                editRole.value.avatar = tempPath;
                // 统一使用tempFilePath属性存储上传用的路径
                editRole.value.tempFilePath = tempPath;
                
                // H5环境特殊处理
                // #ifdef H5
                console.log('H5环境，检查文件对象');
                if (res.tempFiles && res.tempFiles.length > 0) {
                    const tempFile = res.tempFiles[0];
                    console.log('H5文件信息:', tempFile);
                    
                    if (tempFile.file && (tempFile.file instanceof File || tempFile.file instanceof Blob)) {
                        console.log('获取到File对象，文件大小:', tempFile.size);
                        editRole.value.avatarFile = tempFile.file;
                    } else if (tempFile instanceof File || tempFile instanceof Blob) {
                        console.log('tempFile本身是File对象');
                        editRole.value.avatarFile = tempFile;
                    } else {
                        console.log('尝试从路径创建File对象');
                        // 可能需要使用fetch获取文件
                        createFileFromUrl(tempPath, true);
                    }
                } else {
                    console.log('没有tempFiles数据，尝试从路径创建File对象');
                    createFileFromUrl(tempPath, true);
                }
                // #endif
            }
        },
        fail: (err) => {
            console.error('选择头像失败:', err);
        }
    });
}

// H5环境 - 从URL创建File对象
// #ifdef H5
const createFileFromUrl = async (url, isForEdit = false) => {
    try {
        console.log('从URL创建File对象:', url, isForEdit ? '(用于编辑)' : '(用于新建)');
        
        // 使用fetch获取文件内容
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`获取文件失败: ${response.status}`);
        }
        
        // 获取blob
        const blob = await response.blob();
        console.log('获取到Blob:', blob);
        
        // 从blob创建File对象
        const fileName = `avatar_${Date.now()}.${getFileExtension(url)}`;
        const file = new File([blob], fileName, { type: blob.type });
        console.log('创建File对象成功:', file);
        
        // 保存File对象到对应的表单中
        if (isForEdit) {
            editRole.value.avatarFile = file;
        } else {
            newRole.value.avatarFile = file;
        }
    } catch (error) {
        console.error('从URL创建File对象失败:', error);
    }
}

// 获取文件扩展名
const getFileExtension = (url) => {
    const ext = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
        return ext;
    }
    return 'jpg'; // 默认扩展名
}
// #endif

// 创建新角色
const createNewRole = async () => {
    if (!isFormValid.value) {
        uni.showToast({
            title: '请填写人设名称',
            icon: 'none'
        });
        return;
    }
    
    try {
        uni.showLoading({
            title: '创建中...',
            mask: true
        });
        
        console.log('准备创建新人设，完整数据:', newRole.value);
        const hasAvatar = !!newRole.value.tempFilePath;
        console.log('是否有头像:', hasAvatar);
        
        // 获取通用参数
        const name = newRole.value.name;
        const prompt = newRole.value.prompt || '';
        const filePath = newRole.value.tempFilePath;
        
        // 检测平台类型并使用相应的上传方式
        // #ifdef H5
        console.log('H5环境，使用FormData上传');
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('prompt', prompt);
        
        // 添加文件
        if (hasAvatar) {
            if (newRole.value.avatarFile) {
                console.log('添加头像到FormData, 文件对象:', newRole.value.avatarFile);
                formData.append('avatar', newRole.value.avatarFile);
                
                // 打印FormData内容
                for (let pair of formData.entries()) {
                    console.log('FormData包含:', pair[0], 
                        pair[1] instanceof File ? `File(${pair[1].name}, ${pair[1].size}字节)` : 
                        pair[1] instanceof Blob ? `Blob(${pair[1].size}字节)` : 
                        typeof pair[1] === 'string' ? `字符串(${pair[1]})` : 
                        typeof pair[1]);
                }
            } else {
                console.warn('H5环境缺少File对象，尝试直接获取文件');
                try {
                    await createFileFromUrl(filePath, false);
                    if (newRole.value.avatarFile) {
                        console.log('成功创建File对象，添加到FormData');
                        formData.append('avatar', newRole.value.avatarFile);
                    } else {
                        throw new Error('无法创建File对象');
                    }
                } catch (fileError) {
                    console.error('处理头像失败:', fileError);
                    uni.showToast({
                        title: '头像处理失败，请重试',
                        icon: 'none',
                        duration: 2000
                    });
                    uni.hideLoading();
                    return;
                }
            }
        }
        
        const userStore = useUserStore();
        console.log('发送请求到:', `${baseURL_}/ai/addRole`);
        
        const response = await fetch(`${baseURL_}/ai/addRole`, {
            method: 'POST',
            headers: {
                Authorization: userStore.userInfo.authorization
                    ? `Bearer ${userStore.userInfo.authorization}`
                    : ''
            },
            body: formData
        });
        
        console.log('服务器响应状态:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('响应错误:', errorText);
            throw new Error(`请求失败: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API返回结果:', result);
        
        // 兼容字符串和数字格式的code
        if (result.code == 200 || result.code == '200') {
            handleCreateSuccess();
        } else {
            throw new Error(result.msg || result.message || '创建失败');
        }
        // #endif
        
        // #ifdef MP || APP-PLUS
        console.log('小程序/APP环境，使用uni.uploadFile');
        
        const userStore = useUserStore();
        
        if (hasAvatar) {
            // 有头像，使用uploadFile
            console.log('上传文件路径:', filePath);
            
            await new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: `${baseURL_}/ai/addRole`,
                    filePath: filePath,
                    name: 'avatar', // 服务器接收文件的字段名
                    formData: {
                        name: name,
                        prompt: prompt
                    },
                    header: {
                        Authorization: userStore.userInfo.authorization
                            ? `Bearer ${userStore.userInfo.authorization}`
                            : ''
                    },
                    success: (uploadRes) => {
                        console.log('上传结果:', uploadRes);
                        try {
                            const data = typeof uploadRes.data === 'string' 
                                ? JSON.parse(uploadRes.data) 
                                : uploadRes.data;
                                
                            console.log('解析后的上传结果:', data);
                            
                            // 检查返回的状态码，兼容字符串和数字格式
                            if (data && (data.code == 200 || data.code == '200')) {
                                resolve(data);
                            } else {
                                reject(new Error(data?.msg || data?.message || '上传失败'));
                            }
                        } catch (e) {
                            reject(new Error('解析响应失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('上传失败:', err);
                        reject(err);
                    }
                });
            });
            
            handleCreateSuccess();
        } else {
            // 无头像，使用普通请求
            console.log('无头像，使用普通请求');
            
            try {
                const result = await new Promise((resolve, reject) => {
                    // 使用表单格式发送请求，与有头像的情况保持一致
                    uni.request({
                url: `${baseURL_}/ai/addRole`,
                method: 'POST',
                        // 使用表单格式，不要使用JSON格式
                data: {
                    name: name,
                            prompt: prompt || ''
                },
                header: {
                            // 表单格式，不要设置为application/json
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
                
                handleCreateSuccess();
            } catch (requestError) {
                throw requestError;
            }
        }
        // #endif
        
    } catch (error) {
        uni.hideLoading();
        console.error('创建人设失败:', error);
        uni.showToast({
            title: '创建失败: ' + (error.message || '请重试'),
            icon: 'none',
            duration: 3000
        });
    }
}

// 处理创建成功
const handleCreateSuccess = () => {
    uni.hideLoading();
    uni.showToast({
        title: '创建成功',
        icon: 'success'
    });
    
    // 重置表单
    resetCreateForm();
    
    // 关闭弹窗
    closeCreateModal();
    
    // 重新获取列表
    getRolesList();
}

// 重置创建表单
const resetCreateForm = () => {
    newRole.value = {
        name: '',
        avatar: '',
        avatarFile: null,
        tempFilePath: '',
        prompt: ''
    };
    
    console.log('表单已重置', newRole.value);
}

// 显示创建弹窗
const openCreateModal = () => {
    resetCreateForm();
    showCreateModal.value = true;
    
    // 添加延迟以确保DOM更新后再添加动画类
    setTimeout(() => {
        createModalActive.value = true;
    }, 50);
};

// 关闭创建弹窗
const closeCreateModal = () => {
    createModalClosing.value = true;
    createModalActive.value = false;
    
    setTimeout(() => {
        showCreateModal.value = false;
        createModalClosing.value = false;
    }, 300);
};

// 显示编辑弹窗
const openEditModal = (role) => {
    editRole.value = { ...role }; // 复制角色数据到编辑表单
    showEditModal.value = true;
    
    // 添加延迟以确保DOM更新后再添加动画类
    setTimeout(() => {
        editModalActive.value = true;
    }, 50);
};

// 关闭编辑弹窗
const closeEditModal = () => {
    editModalClosing.value = true;
    editModalActive.value = false;
    
    setTimeout(() => {
        showEditModal.value = false;
        editModalClosing.value = false;
    }, 300);
};

// 更新角色
const updateRole = async () => {
    if (!isEditFormValid.value) {
        uni.showToast({
            title: '请填写人设名称',
            icon: 'none'
        });
        return;
    }

    try {
        uni.showLoading({
            title: '更新中...',
            mask: true
        });
        
        console.log('准备更新人设，完整数据:', editRole.value);
        
        // 检测平台类型并使用相应的更新方式
        // #ifdef H5
        // H5环境使用FormData
        try {
            // 准备数据
            const formData = new FormData();
            formData.append('id', editRole.value.id);
            formData.append('name', editRole.value.name);
            formData.append('prompt', editRole.value.prompt || '');
            
            // 优先使用avatarFile
            if (editRole.value.avatarFile) {
                console.log('使用avatarFile上传头像');
                formData.append('avatar', editRole.value.avatarFile);
            } 
            // 如果没有avatarFile但有tempFilePath
            else if (editRole.value.tempFilePath) {
                console.log('从tempFilePath创建文件对象:', editRole.value.tempFilePath);
                
                try {
                    await createFileFromUrl(editRole.value.tempFilePath, true);
                    if (editRole.value.avatarFile) {
                        console.log('成功创建File对象，添加到表单');
                        formData.append('avatar', editRole.value.avatarFile);
                    }
                } catch (fileError) {
                    console.error('处理头像失败:', fileError);
                    uni.showToast({
                        title: '头像处理失败，请重试',
                        icon: 'none',
                        duration: 2000
                    });
                    uni.hideLoading();
                    return;
                }
            }
            
            console.log('发送更新请求，数据:', formData);
            
            const userStore = useUserStore();
            
            // 使用fetch API直接处理FormData
            const response = await fetch(`${baseURL_}/ai/updRole`, {
                method: 'POST',
                headers: {
                    Authorization: userStore.userInfo.authorization
                        ? `Bearer ${userStore.userInfo.authorization}`
                        : ''
                },
                body: formData
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API请求失败:', response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('API请求成功，返回结果:', result);
            
            // 兼容字符串和数字格式的code
            if (result.code == 200 || result.code == '200') {
                handleEditSuccess();
            } else {
                throw new Error(result.msg || result.message || '更新失败');
            }
        } catch (error) {
            console.error('H5环境更新失败:', error);
            throw error;
        }
        // #endif
        
        // #ifdef APP-PLUS || MP
        // APP或小程序环境
        console.log('APP或小程序环境，使用uni.uploadFile');
        
        const hasAvatar = !!editRole.value.tempFilePath;
        const userStore = useUserStore();
        
        if (hasAvatar) {
            // 有头像，使用uploadFile
            console.log('上传文件路径:', editRole.value.tempFilePath);
            
            await new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: `${baseURL_}/ai/updRole`,
                    filePath: editRole.value.tempFilePath,
                    name: 'avatar',
                    formData: {
                        id: editRole.value.id,
                        name: editRole.value.name,
                        prompt: editRole.value.prompt || ''
                    },
                    header: {
                        Authorization: userStore.userInfo.authorization
                            ? `Bearer ${userStore.userInfo.authorization}`
                            : ''
                    },
                    success: (uploadRes) => {
                        console.log('上传结果:', uploadRes);
                        try {
                            const data = typeof uploadRes.data === 'string' 
                                ? JSON.parse(uploadRes.data) 
                                : uploadRes.data;
                                
                            console.log('解析后的上传结果:', data);
                            
                            // 检查返回的状态码，兼容字符串和数字格式
                            if (data && (data.code == 200 || data.code == '200')) {
                                resolve(data);
                            } else {
                                reject(new Error(data?.msg || data?.message || '上传失败'));
                            }
                        } catch (e) {
                            reject(new Error('解析响应失败'));
                        }
                    },
                    fail: (err) => {
                        console.error('上传失败:', err);
                        reject(err);
                    }
                });
            });
            
            // 请求成功，调用成功处理函数
            handleEditSuccess();
        } else {
            // 无头像，使用普通请求
            console.log('无头像，使用普通请求');
            
            try {
                const result = await new Promise((resolve, reject) => {
                    uni.request({
                url: `${baseURL_}/ai/updRole`,
                method: 'POST',
                data: {
                    id: editRole.value.id,
                    name: editRole.value.name,
                    prompt: editRole.value.prompt || ''
                },
                header: {
                            // 使用表单格式，不要使用JSON格式
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
                
                // 请求成功，调用成功处理函数
                handleEditSuccess();
            } catch (requestError) {
                throw requestError;
            } finally {
                // 确保无论成功或失败，loading都会被隐藏
                    uni.hideLoading();
                }
        }
        // #endif
        
    } catch (error) {
        uni.hideLoading();
        console.error('更新人设失败:', error);
        uni.showToast({
            title: '更新失败: ' + (error.message || '请重试'),
            icon: 'none',
            duration: 3000
        });
    }
}

// 处理编辑成功
const handleEditSuccess = () => {
    uni.hideLoading();
    uni.showToast({
        title: '更新成功',
        icon: 'success'
    });
    
    // 关闭弹窗
    closeEditModal();
    
    // 重新获取列表
    getRolesList();
}

// 滑动删除相关方法
const handleTouchStart = (e, roleId) => {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    currentSwipeRoleId.value = roleId
}

const handleTouchMove = (e, roleId) => {
    if (currentSwipeRoleId.value !== roleId) return
    
    const touchX = e.touches[0].clientX
    const touchY = e.touches[0].clientY
    const deltaX = touchX - touchStartX.value
    const deltaY = touchY - touchStartY.value
    
    // 判断是否为水平滑动
    if (Math.abs(deltaY) > Math.abs(deltaX)) return
    
    // 只允许向左滑动
    if (deltaX < 0) {
        const translateX = Math.max(deltaX * 0.5, -120)
        
        if (!swipeStates.value[roleId]) {
            swipeStates.value[roleId] = {}
        }
        
        swipeStates.value[roleId].translateX = translateX
        swipeStates.value[roleId].showDelete = translateX < -30
    }
}

const handleTouchEnd = (e, roleId) => {
    if (currentSwipeRoleId.value !== roleId) return
    
    const state = swipeStates.value[roleId]
    if (!state) return
    
    if (state.translateX < -60) {
        confirmDelete(roleId)
    } else if (state.translateX < -30) {
        state.translateX = -120
        state.showDelete = true
    } else {
        resetSwipeState(roleId)
    }
    
    currentSwipeRoleId.value = null
}

const resetSwipeState = (roleId) => {
    if (swipeStates.value[roleId]) {
        swipeStates.value[roleId].translateX = 0
        swipeStates.value[roleId].showDelete = false
    }
}

const resetAllSwipeStates = () => {
    Object.keys(swipeStates.value).forEach(roleId => {
        resetSwipeState(roleId)
    })
}

const handleScroll = () => {
    resetAllSwipeStates()
}

// 删除相关方法
const confirmDelete = (roleId) => {
    resetAllSwipeStates();
    
    // 找到对应的角色
    const role = rolesList.value.find(item => item.id === roleId);
    if (!role) {
        console.error('未找到要删除的角色:', roleId);
        return;
    }
    
    // 显示删除确认弹框
    uni.showModal({
        title: '删除确认',
        content: `确定要删除"${role.name}"角色吗？`,
        confirmColor: '#f56c6c',
        success: async (res) => {
            if (res.confirm) {
                await deleteRole(roleId);
            }
        }
    });
}

// 执行删除角色操作
const deleteRole = async (roleId) => {
    try {
        uni.showLoading({
            title: '删除中...',
            mask: true
        });
        
        // 调用API删除角色
        const res = await chatApi.deleteRole(roleId);
        
        uni.hideLoading();
        
        if (res) {
            uni.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
            });
            
            // 重新获取角色列表
            getRolesList();
        } else {
            throw new Error(res?.msg || '删除失败');
        }
    } catch (error) {
        uni.hideLoading();
        console.error('删除角色失败:', error);
        uni.showToast({
            title: '删除失败: ' + (error.message || '请重试'),
            icon: 'none',
            duration: 2000
        });
    }
}

// 编辑角色
const editRoleItem = (role, event) => {
    if (event) {
        event.stopPropagation()
    }
    // 这里可以添加编辑逻辑
    console.log('编辑角色:', role)
}

// 显示角色详情
const showRoleDetail = (role, event) => {
    if (event) {
        event.stopPropagation()
    }
    currentRole.value = role;
    showDetailModal.value = true;
    
    // 添加延迟以确保DOM更新后再添加动画类
    setTimeout(() => {
        modalActive.value = true;
    }, 50);
};

// 关闭角色详情弹窗
const closeRoleDetail = () => {
    modalClosing.value = true;
    modalActive.value = false;
    
    setTimeout(() => {
        showDetailModal.value = false;
        modalClosing.value = false;
    }, 300);
};

// 返回上一页
const goBack = () => {
    uni.navigateBack();
};

// 图片错误处理
const handleImageError = () => {
    console.log('背景图片加载失败')
}

const handleImageLoad = () => {
    console.log('背景图片加载成功')
}

// 头像错误处理
const handleAvatarError = (role) => {
    console.error(`头像加载失败，角色ID: ${role.id}，角色名称: ${role.name}`);
    console.error(`失败的头像URL: ${role.avatar}`);
    
    // 尝试测试URL是否可访问
    testImageUrl(role.avatar);
}

// 测试图片URL是否可访问
const testImageUrl = (url) => {
    if (!url) return;
    
    // 记录尝试访问的URL
    console.log('尝试测试URL可访问性:', url);
    
    // 创建一个新的图片对象
    const img = new Image();
    
    img.onload = () => {
        console.log('URL可以成功加载:', url);
    };
    
    img.onerror = () => {
        console.error('URL无法加载:', url);
        console.log('可能的原因: 1.跨域限制 2.URL不存在 3.服务器未响应 4.需要认证');
    };
    
    // 设置src触发加载
    img.src = url;
}

// 头像加载完成处理
const handleAvatarLoad = (role) => {
    console.log(`头像加载成功，角色ID: ${role.id}，头像URL: ${role.avatar}`);
}

// 检查是否有头像
const hasAvatar = (role) => {
    if (!role) return false;
    
    // 直接检查avatar属性
    if (role.avatar) {
        console.log(`角色[${role.id}] ${role.name} 有头像:`, role.avatar);
        return true;
    }
    
    console.log(`角色[${role.id}] ${role.name} 无头像`);
    return false;
}

// 获取头像URL
const getAvatarUrl = (role) => {
    if (!role || !role.avatar) return '';
    
    // 记录原始URL，便于调试
    const url = role.avatar;
    console.log(`获取头像URL:`, url);
    
    // 直接返回原始URL，不做任何处理
    return url;
}

// 下拉刷新相关方法
const handleRefresherPulling = (e) => {
    // 下拉过程中的处理
}

const handleRefresherRefresh = async () => {
    refresherTriggered.value = true
    
    try {
        await getRolesList()
        uni.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 1500
        })
    } catch (error) {
        console.error('刷新失败:', error)
        uni.showToast({
            title: '刷新失败，请重试',
            icon: 'none',
            duration: 2000
        })
    } finally {
        setTimeout(() => {
            refresherTriggered.value = false
        }, 800)
    }
}

const handleRefresherRestore = () => {
    refresherTriggered.value = false
}

// 角色分组展开/收起状态
const showSystemRoles = ref(true);

// 根据角色列表分组
const systemRoles = computed(() => {
    return rolesList.value.filter(role => role.isSystem);
});

const customRoles = computed(() => {
    return rolesList.value.filter(role => !role.isSystem);
});

// 切换系统角色分组展开/收起
const toggleSystemRoles = () => {
    showSystemRoles.value = !showSystemRoles.value;
};

// 页面加载时获取角色列表
onMounted(async () => {
    await getRolesList();
    
    // 根据角色列表状态，自动展开分组
    if (systemRoles.value.length > 0) {
        showSystemRoles.value = true;
    }
    
    if (customRoles.value.length > 0) {
        // showCustomRoles.value = true; // 移除自定义角色分组
    }
    
    // 如果列表为空，添加一些测试数据（仅用于开发调试）
    if (import.meta.env.DEV && rolesList.value.length === 0) {
        console.log('开发环境中添加测试数据');
        rolesList.value = [
            {
                id: 'test1',
                name: '测试角色1',
                prompt: '这是一个测试提示词，用于展示界面效果。',
                avatar: 'https://via.placeholder.com/200',
                isSystem: true
            },
            {
                id: 'test2',
                name: '无头像角色',
                prompt: '这个角色没有头像，将显示名称首字母。'
            },
            {
                id: 'test3',
                name: '自定义角色1',
                prompt: '这是一个自定义角色，有头像。',
                avatar: 'https://via.placeholder.com/200'
            },
            {
                id: 'test4',
                name: '自定义角色2',
                prompt: '这是一个自定义角色，没有头像。'
            }
        ];
        
        // 自动展开测试数据的分组
        showSystemRoles.value = true;
        // showCustomRoles.value = true; // 移除自定义角色分组
    }
});
</script>

<style lang="scss" scoped>
.role-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
}

.role-container::before {
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
        
        .back-button {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
            border-radius: 50%;
            transition: all 0.3s;
            
            &:active {
                transform: scale(0.85);
                background-color: rgba(255, 255, 255, 0.2);
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

.role-list {
    position: fixed;
    top: 160rpx;
    left: 0;
    right: 0;
    bottom: 40rpx;
    z-index: 10;
    padding: 0 0 40rpx 0;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
    }
    
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
}

.role-group {
    margin-bottom: 20rpx;
}

.group-content {
    background-color: transparent;
    margin: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    
    .role-card {
        margin-bottom: 16rpx;
        
        &:last-child {
            margin-bottom: 8rpx;
        }
    }
}

.empty-group-hint {
    padding: 20rpx 30rpx;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 26rpx;
    margin: 20rpx 0;
}

.role-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20rpx;
    backdrop-filter: blur(10rpx);
}

.role-swipe-container {
    position: relative;
    overflow: hidden;
}

.role-swipe-wrapper {
    position: relative;
    width: 100%;
}

.role-item {
    display: flex;
    align-items: flex-start;
    padding: 15rpx;
    gap: 12rpx;
    background: #f7f6f8;
    border-radius: 20rpx;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
    
    &.system-role {
        background: rgba(240, 247, 255, 0.8);
        border-left: 3px solid #007AFF;
}

.role-icon {
        flex-shrink: 0;
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
        overflow: hidden;
        position: relative;
        
        &.has-avatar {
            background: none; /* 移除默认背景 */
        }
        
        &.system-role-icon {
            box-shadow: 0 0 0 2rpx #007AFF;
}

.icon-text {
    color: #fff;
    font-size: 36rpx;
    font-weight: 600;
}

        .avatar-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
    
    .role-content {
    flex: 1;
        cursor: pointer;
        
        .role-header {
    display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8rpx;

.role-name {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
                flex: 1;
}

.role-tag {
    display: inline-block;
    background-color: #f0f7ff;
    color: #007AFF;
    font-size: 22rpx;
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    width: fit-content;
}
        }
        
        .role-info {
            margin-bottom: 8rpx;
            
            .role-desc {
                font-size: 26rpx;
                color: #666;
                line-height: 1.4;
            }
        }
    }
    
    .role-actions {
        flex-shrink: 0;
        width: 44rpx;
        height: 44rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5rpx;
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
    border-radius: 0 20rpx 20rpx 0;
    z-index: 1;
    
    &:active {
        background: #e84057;
    }
}

.empty-hint {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200rpx;
    color: rgba(255, 255, 255, 0.7);
    font-size: 28rpx;
}

/* 新建按钮样式 */
.add-button-wrapper {
    position: fixed;
    right: 40rpx;
    bottom: 100rpx;
    z-index: 99;
}

.add-button {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, #5469d4 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    
    &:active {
        transform: scale(0.9);
        box-shadow: 0 5rpx 10rpx rgba(0, 0, 0, 0.2);
    }
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
}

.modal-overlay.active {
    background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
    background-color: #fff;
    border-radius: 16rpx;
    width: 90%;
    max-width: 650rpx;
    max-height: 80vh;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.modal-content.active {
    opacity: 1;
    transform: scale(1);
}

.modal-content.closing {
    opacity: 0;
    transform: scale(0.9);
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1px solid #f0f0f0;
}

.popup-title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
}

.popup-close {
    padding: 10rpx;
}

.prompt-content {
    flex: 1;
    padding: 30rpx;
    max-height: 60vh;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
}

.prompt-text {
    font-size: 28rpx;
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
    width: 100%;
}

/* 创建表单样式 */
.create-modal {
    max-width: 90%;
    max-height: 85vh;
}

.create-form {
    padding: 30rpx;
    overflow-y: auto;
    flex: 1;
}

.form-item {
    margin-bottom: 30rpx;
}

.form-label {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .char-count {
        font-size: 24rpx;
        color: #999;
    }
}

.form-input {
    width: 100%;
    height: 80rpx;
    background-color: #f5f5f5;
    border-radius: 8rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    box-sizing: border-box;
    border: 2rpx solid #e0e0e0;
}

.form-textarea {
    width: 100%;
    height: 300rpx;
    background-color: #f5f5f5;
    border-radius: 8rpx;
    padding: 20rpx;
    font-size: 28rpx;
    box-sizing: border-box;
    border: 2rpx solid #e0e0e0;
}

.avatar-picker {
    display: flex;
    align-items: center;
    margin-top: 10rpx;
}

.selected-avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 2rpx dashed #ccc;
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 20rpx;
    margin-top: 40rpx;
}

.cancel-button, .confirm-button {
    padding: 20rpx 40rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
    line-height: 1;
    min-width: 160rpx;
    text-align: center;
}

.cancel-button {
    background-color: #f5f5f5;
    color: #666;
    border: 1rpx solid #ddd;
}

.confirm-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    
    &:disabled {
        background: #cccccc;
        opacity: 0.7;
    }
}

/* 新增样式 */
.section-title {
    display: flex;
    align-items: center;
    gap: 10rpx;
    padding: 20rpx 30rpx 10rpx;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
    
    &:active {
        opacity: 0.7;
    }
    
    .section-text {
        color: rgba(255, 255, 255, 0.7);
        font-size: 26rpx;
        font-weight: 500;
    }
}

.role-detail-modal {
    padding-bottom: 30rpx;
    
    .prompt-content {
        padding: 0 30rpx 20rpx;
        max-height: 60vh;
    }
    
    .prompt-text {
        font-size: 28rpx;
        color: #333;
        line-height: 1.8;
        white-space: pre-wrap;
        word-break: break-all;
        overflow-wrap: break-word;
        text-align: justify;
    }
}

.edit-button {
    position: absolute;
    top: 15rpx;
    right: 15rpx;
    width: 44rpx;
    height: 44rpx;
    border-radius: 22rpx;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
    z-index: 3;
    
    &:active {
        background-color: rgba(245, 245, 245, 0.9);
        transform: scale(0.95);
    }
}
</style>
