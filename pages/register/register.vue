<template>
    <view class="register-container">
        <view class="register-card">
            <!-- 顶部Logo区域 -->
            <view class="header">
                <view class="logo">
                    <text class="logo-text">TODO+</text>
                </view>
                <text class="subtitle">创建您的账户</text>
            </view>

            <!-- 表单区域 -->
            <view class="form-container">
                <!-- 昵称输入 -->
                <view class="input-group">
                    <view class="input-label">
                        <text class="label-text">昵称</text>
                    </view>
                    <view class="input-wrapper">
                        <input 
                            class="input-field"
                            type="text"
                            v-model="nickname"
                            placeholder="请输入您的昵称"
                            placeholder-class="placeholder-style"
                            @input="validateNickname"
                            @blur="validateNicknameBlur"
                        />
                    </view>
                    <!-- 昵称错误提示 -->
                    <view class="error-tip" :class="{ 'show': nicknameError }">
                        <text class="error-text">{{ nicknameError }}</text>
                    </view>
                </view>

                <!-- 手机号输入 -->
                <view class="input-group">
                    <view class="input-label">
                        <text class="label-text">手机号</text>
                    </view>
                    <view class="input-wrapper">
                        <input 
                            class="input-field"
                            type="number"
                            v-model="mobile"
                            placeholder="请输入手机号"
                            placeholder-class="placeholder-style"
                            maxlength="11"
                            @input="validateMobile"
                            @blur="validateMobileBlur"
                        />
                    </view>
                    <!-- 手机号错误提示 -->
                    <view class="error-tip" :class="{ 'show': mobileError }">
                        <text class="error-text">{{ mobileError }}</text>
                    </view>
                </view>

                <!-- 密码输入 -->
                <view class="input-group">
                    <view class="input-label">
                        <text class="label-text">密码</text>
                    </view>
                    <view class="input-wrapper">
                        <input 
                            class="input-field"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            placeholder="请输入密码"
                            placeholder-class="placeholder-style"
                            @input="validatePassword"
                            @blur="validatePasswordBlur"
                        />
                        <view class="eye-icon" @tap="togglePassword">
                            <uni-icons :type="showPassword ? 'eye' : 'eye-slash'" size="20" color="#999"></uni-icons>
                        </view>
                    </view>
                    <!-- 密码错误提示 -->
                    <view class="error-tip" :class="{ 'show': passwordError }">
                        <text class="error-text">{{ passwordError }}</text>
                    </view>
                    <!-- 密码强度提示 -->
                    <view class="password-strength" :class="{ 'show': password }">
                        <text class="strength-text" :class="getPasswordStrengthClass()">
                            {{ getPasswordStrengthText() }}
                        </text>
                    </view>
                </view>

                <!-- 确认密码输入 -->
                <view class="input-group">
                    <view class="input-label">
                        <text class="label-text">确认密码</text>
                    </view>
                    <view class="input-wrapper">
                        <input 
                            class="input-field"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            v-model="confirmPassword"
                            placeholder="请再次输入密码"
                            placeholder-class="placeholder-style"
                            @input="validateConfirmPasswordInput"
                            @blur="validateConfirmPasswordBlur"
                        />
                        <view class="eye-icon" @tap="toggleConfirmPassword">
                            <uni-icons :type="showConfirmPassword ? 'eye' : 'eye-slash'" size="20" color="#999"></uni-icons>
                        </view>
                    </view>
                    <!-- 确认密码错误提示 -->
                    <view class="error-tip" :class="{ 'show': confirmPasswordError }">
                        <text class="error-text">{{ confirmPasswordError }}</text>
                    </view>
                </view>

                <!-- 注册按钮 -->
                <view class="button-group">
                    <button 
                        class="register-btn"
                        :class="{ 'btn-disabled': !canSubmit }"
                        :disabled="!canSubmit"
                        @tap="handleRegister"
                    >
                        注册
                    </button>
                </view>

                <!-- 底部链接 -->
                <view class="footer-links">
                    <text class="link-text">已有账户？</text>
                    <text class="link-btn" @tap="goToLogin">立即登录</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { userApi } from '@/api/userApi'
// 响应式数据
const mobile = ref('')
const password = ref('')
const nickname = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 错误提示状态
const mobileError = ref('')
const passwordError = ref('')
const nicknameError = ref('')
const confirmPasswordError = ref('')

// 切换密码显示状态
const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

// 昵称验证
const validateNickname = (e) => {
    nickname.value = e.detail.value
    // 输入时清除错误提示
    if (nicknameError.value) {
        nicknameError.value = ''
    }
}

// 手机号验证 - 只允许数字
const validateMobile = (e) => {
    let value = e.detail.value
    // 只保留数字
    value = value.replace(/\D/g, '')
    // 限制长度为11位
    if (value.length > 11) {
        value = value.slice(0, 11)
    }
    mobile.value = value
    // 输入时清除错误提示
    if (mobileError.value) {
        mobileError.value = ''
    }
}

// 密码验证 - 只允许字母数字和下划线
const validatePassword = (e) => {
    let value = e.detail.value
    // 只保留字母、数字和下划线
    value = value.replace(/[^a-zA-Z0-9_]/g, '')
    password.value = value
    // 输入时清除错误提示
    if (passwordError.value) {
        passwordError.value = ''
    }
    // 密码变化时重新验证确认密码
    if (confirmPassword.value && confirmPasswordError.value) {
        validateConfirmPasswordBlur()
    }
}

// 确认密码输入验证
const validateConfirmPasswordInput = (e) => {
    let value = e.detail.value
    // 只保留字母、数字和下划线
    value = value.replace(/[^a-zA-Z0-9_]/g, '')
    confirmPassword.value = value
    // 输入时清除错误提示
    if (confirmPasswordError.value) {
        confirmPasswordError.value = ''
    }
}

// 失焦验证函数
const validateNicknameBlur = () => {
    if (!nickname.value) {
        nicknameError.value = ''
        return
    }
    if (nickname.value.trim().length < 2) {
        nicknameError.value = '昵称格式为至少2个字符'
    } else {
        nicknameError.value = ''
    }
}

const validateMobileBlur = () => {
    if (!mobile.value) {
        mobileError.value = ''
        return
    }
    if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
        mobileError.value = '手机号格式为1开头的11位数字'
    } else {
        mobileError.value = ''
    }
}

const validatePasswordBlur = () => {
    if (!password.value) {
        passwordError.value = ''
        return
    }
    if (password.value.length < 8) {
        passwordError.value = '密码格式为至少8位字符'
    } else if (!/^[a-zA-Z0-9_]+$/.test(password.value)) {
        passwordError.value = '密码格式只能包含字母数字和下划线'
    } else {
        passwordError.value = ''
    }
}

const validateConfirmPasswordBlur = () => {
    if (!confirmPassword.value) {
        confirmPasswordError.value = ''
        return
    }
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = '确认密码格式需与密码一致'
    } else {
        confirmPasswordError.value = ''
    }
}

// 检查表单是否可以提交
const canSubmit = computed(() => {
    return /^1[3-9]\d{9}$/.test(mobile.value) && 
           password.value.length >= 8 && 
           /^[a-zA-Z0-9_]+$/.test(password.value) &&
           nickname.value.trim().length >= 2 &&
           confirmPassword.value === password.value
})

// 密码强度检测
const getPasswordStrength = () => {
    const pwd = password.value
    // 密码只能包含字母数字下划线
    if (!/^[a-zA-Z0-9_]*$/.test(pwd)) return 0
    // 长度至少8位
    if (pwd.length < 8) return 0
    // 8-10位，仅数字或仅字母为弱密码
    if (pwd.length <= 10 && (/^[a-zA-Z]+$/.test(pwd) || /^\d+$/.test(pwd))) return 1
    // 包含字母、数字和下划线为强密码
    if (/[a-zA-Z]/.test(pwd) && /\d/.test(pwd) && /_/.test(pwd)) return 3
    // 包含字母和数字为中等密码
    if (/[a-zA-Z]/.test(pwd) && /\d/.test(pwd)) return 2
    return 1
}

const getPasswordStrengthText = () => {
    const strength = getPasswordStrength()
    const pwd = password.value
    if (!/^[a-zA-Z0-9_]*$/.test(pwd)) {
        return '密码只能包含字母数字和下划线'
    }
    if (pwd.length < 8) {
        return '密码至少8位'
    }
    const texts = ['密码格式错误', '密码强度：弱', '密码强度：中', '密码强度：强']
    return texts[strength]
}

const getPasswordStrengthClass = () => {
    const strength = getPasswordStrength()
    const classes = ['strength-weak', 'strength-weak', 'strength-medium', 'strength-strong']
    return classes[strength]
}

// 注册处理
const handleRegister = async () => {
    if (!canSubmit.value) return
    
    // 验证昵称
    if (nickname.value.trim().length < 2) {
        uni.showToast({
            title: '昵称至少需要2个字符',
            icon: 'none'
        })
        return
    }
    
    // 验证手机号格式 - 严格的11位数字，1开头
    if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
        uni.showToast({
            title: '请输入正确的手机号格式',
            icon: 'none'
        })
        return
    }
    
    // 验证密码格式
    if (password.value.length < 8) {
        uni.showToast({
            title: '密码至少需要8位',
            icon: 'none'
        })
        return
    }
    
    // 验证密码只能包含字母数字下划线
    if (!/^[a-zA-Z0-9_]+$/.test(password.value)) {
        uni.showToast({
            title: '密码只能包含字母数字和下划线',
            icon: 'none'
        })
        return
    }
    
    // 验证密码确认
    if (password.value !== confirmPassword.value) {
        uni.showToast({
            title: '两次密码输入不一致',
            icon: 'none'
        })
        return
    }
    
    // TODO: 这里添加注册逻辑
    const res = await userApi.register({
        phone: mobile.value,
        password: password.value,
        nickname: nickname.value
    })
    console.log('注册结果:', res)
    if (res.code === 200 || res.code === '200') {
        uni.showToast({
            title: '注册成功',
            icon: 'success'
        })
        uni.navigateTo({
            url: '/pages/index/index'
        })
    } else {
        uni.showToast({
            title: res.msg,
            icon: 'none'
        })
    }
}

// 跳转到登录页
const goToLogin = () => {
    uni.navigateTo({
        url: '/pages/index/index'
    })
}
</script>

<style lang="scss" scoped>
.register-container {
    height: 1334rpx;
    width: 750rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
}

.register-card {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 0;
    padding: 80rpx 60rpx;
    box-shadow: none;
    backdrop-filter: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.header {
    text-align: center;
    margin-bottom: 60rpx;
    width: 100%;
    
    .logo {
        margin-bottom: 20rpx;
        
        .logo-text {
            font-size: 48rpx;
            font-weight: bold;
            color: #667eea;
        }
    }
    
    .subtitle {
        color: #666;
        font-size: 28rpx;
    }
}

.form-container {
    width: 100%;
    max-width: 600rpx;
    
    .input-group {
        margin-bottom: 80rpx;
        position: relative;
        
        .input-label {
            margin-bottom: 16rpx;
            
            .label-text {
                color: #333;
                font-size: 28rpx;
                font-weight: 500;
            }
        }
        
        .input-wrapper {
            position: relative;
            
            .input-field {
                width: 100%;
                height: 88rpx;
                padding: 0 40rpx;
                border: 2rpx solid #e1e1e1;
                border-radius: 16rpx;
                font-size: 28rpx;
                color: #333;
                background: #fff;
                transition: all 0.3s ease;
                box-sizing: border-box;
                
                &:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
                }
            }
            
            .eye-icon {
                position: absolute;
                right: 24rpx;
                top: 50%;
                transform: translateY(-50%);
                padding: 8rpx;
                font-size: 32rpx;
                color: #999;
                cursor: pointer;
                
                &:hover {
                    color: #667eea;
                }
            }
        }
        
        .placeholder-style {
            color: #bbb;
            font-size: 26rpx;
        }
    }
    
    .error-tip {
        position: absolute;
        top: calc(100% + 8rpx);
        left: 0;
        right: 0;
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        transform: translateY(-10rpx);
        
        &.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error-text {
            color: #ff4757;
            font-size: 24rpx;
            line-height: 1.4;
        }
    }
    
    .password-strength {
        position: absolute;
        top: calc(100% + 40rpx);
        left: 0;
        right: 0;
        z-index: 998;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        transform: translateY(-10rpx);
        
        &.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .strength-text {
            font-size: 24rpx;
            
            &.strength-weak {
                color: #ff4757;
            }
            
            &.strength-medium {
                color: #ffa502;
            }
            
            &.strength-strong {
                color: #2ed573;
            }
        }
    }
    
    .button-group {
        margin: 60rpx 0 40rpx;
        
        .register-btn {
            width: 100%;
            height: 96rpx;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 16rpx;
            color: #fff;
            font-size: 32rpx;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            
            &:not(.btn-disabled):active {
                transform: translateY(2rpx);
                box-shadow: 0 8rpx 20rpx rgba(102, 126, 234, 0.3);
            }
            
            &.btn-disabled {
                background: #ccc;
                color: #999;
            }
        }
    }
    
    .footer-links {
        text-align: center;
        
        .link-text {
            color: #999;
            font-size: 26rpx;
        }
        
        .link-btn {
            color: #667eea;
            font-size: 26rpx;
            font-weight: 500;
            margin-left: 8rpx;
            
            &:active {
                opacity: 0.7;
            }
        }
    }
}

/* 适配小屏设备 */
@media screen and (max-width: 750rpx) {
    .register-card {
        margin: 20rpx;
        padding: 40rpx 30rpx;
    }
    
    .header .logo .logo-text {
        font-size: 40rpx;
    }
}
</style>
