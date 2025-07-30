<template>
    <view class="change-password-container">
        <view class="change-password-card">
            <!-- 顶部Logo区域 -->
            <view class="header">
                <view class="logo">
                    <text class="logo-text">TODO+</text>
                </view>
                <text class="subtitle">重置您的密码</text>
            </view>

            <!-- 表单区域 -->
            <view class="form-container">
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

                <!-- 验证码输入 -->
                <view class="input-group">
                    <view class="input-label">
                        <text class="label-text">验证码</text>
                    </view>
                    <view class="input-wrapper verification-wrapper">
                        <input 
                            class="input-field verification-input"
                            type="number"
                            v-model="verificationCode"
                            placeholder="请输入验证码"
                            placeholder-class="placeholder-style"
                            maxlength="6"
                            @input="validateVerificationCode"
                            @blur="validateVerificationCodeBlur"
                        />
                        <button
                            class="send-code-btn"
                            :class="{ 'btn-disabled': !canSendCode }"
                            :disabled="!canSendCode"
                            @tap="sendVerificationCode"
                        >
                            {{ sendCodeText }}
                        </button>
                    </view>
                    <!-- 验证码错误提示 -->
                    <view class="error-tip" :class="{ 'show': verificationCodeError }">
                        <text class="error-text">{{ verificationCodeError }}</text>
                    </view>
                </view>

                <!-- 新密码输入 -->
                <view class="input-group">
                    <view class="input-label">
                        <text class="label-text">新密码</text>
                    </view>
                    <view class="input-wrapper">
                        <input 
                            class="input-field"
                            :type="showNewPassword ? 'text' : 'password'"
                            v-model="newPassword"
                            placeholder="请输入新密码"
                            placeholder-class="placeholder-style"
                            @input="validateNewPassword"
                            @blur="validateNewPasswordBlur"
                        />
                        <view class="eye-icon" @tap="toggleNewPassword">
                            <uni-icons :type="showNewPassword ? 'eye' : 'eye-slash'" size="20" color="#999"></uni-icons>
                        </view>
                    </view>
                    <!-- 新密码错误提示 -->
                    <view class="error-tip" :class="{ 'show': newPasswordError }">
                        <text class="error-text">{{ newPasswordError }}</text>
                    </view>
                    <!-- 密码强度提示 -->
                    <view class="password-strength" :class="{ 'show': newPassword }">
                        <text class="strength-text" :class="getPasswordStrengthClass()">
                            {{ getPasswordStrengthText() }}
                        </text>
                    </view>
                </view>

                <!-- 确认新密码输入 -->
                <view class="input-group">
                    <view class="input-label">
                        <text class="label-text">确认新密码</text>
                    </view>
                    <view class="input-wrapper">
                        <input 
                            class="input-field"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            v-model="confirmPassword"
                            placeholder="请再次输入新密码"
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

                <!-- 确认修改按钮 -->
                <view class="button-group">
                    <button 
                        class="change-password-btn"
                        :class="{ 'btn-disabled': !canSubmit }"
                        :disabled="!canSubmit"
                        @tap="handleChangePassword"
                    >
                        确认修改
                    </button>
                </view>

                <!-- 底部链接 -->
                <view class="footer-links">
                    <text class="link-text">记起密码了？</text>
                    <text class="link-btn" @tap="goToLogin">立即登录</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { userApi } from '@/api/userApi'
// 响应式数据
const mobile = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const countdown = ref(0)
const timer = ref(null)

// 错误提示状态
const mobileError = ref('')
const verificationCodeError = ref('')
const newPasswordError = ref('')
const confirmPasswordError = ref('')

// 切换密码显示状态
const toggleNewPassword = () => {
    showNewPassword.value = !showNewPassword.value
}

const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

// 手机号验证 - 只允许数字，且符合手机号格式
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

// 验证码验证 - 只允许6位数字
const validateVerificationCode = (e) => {
    let value = e.detail.value
    // 只保留数字
    value = value.replace(/\D/g, '')
    // 限制长度为6位
    if (value.length > 6) {
        value = value.slice(0, 6)
    }
    verificationCode.value = value
    // 输入时清除错误提示
    if (verificationCodeError.value) {
        verificationCodeError.value = ''
    }
}

// 新密码验证 - 只允许字母数字和下划线
const validateNewPassword = (e) => {
    let value = e.detail.value
    // 只保留字母、数字和下划线
    value = value.replace(/[^a-zA-Z0-9_]/g, '')
    newPassword.value = value
    // 输入时清除错误提示
    if (newPasswordError.value) {
        newPasswordError.value = ''
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

const validateVerificationCodeBlur = () => {
    if (!verificationCode.value) {
        verificationCodeError.value = ''
        return
    }
    if (!/^\d{6}$/.test(verificationCode.value)) {
        verificationCodeError.value = '验证码格式为6位数字'
    } else {
        verificationCodeError.value = ''
    }
}

const validateNewPasswordBlur = () => {
    if (!newPassword.value) {
        newPasswordError.value = ''
        return
    }
    if (newPassword.value.length < 8) {
        newPasswordError.value = '密码格式为至少8位字符'
    } else if (!/^[a-zA-Z0-9_]+$/.test(newPassword.value)) {
        newPasswordError.value = '密码格式只能包含字母数字和下划线'
    } else {
        newPasswordError.value = ''
    }
}

const validateConfirmPasswordBlur = () => {
    if (!confirmPassword.value) {
        confirmPasswordError.value = ''
        return
    }
    if (confirmPassword.value !== newPassword.value) {
        confirmPasswordError.value = '确认密码格式需与新密码一致'
    } else {
        confirmPasswordError.value = ''
    }
}

// 是否可以发送验证码
const canSendCode = computed(() => {
    return /^1[3-9]\d{9}$/.test(mobile.value) && countdown.value === 0
})

// 发送验证码按钮文字
const sendCodeText = computed(() => {
    return countdown.value > 0 ? `${countdown.value}秒` : '发送验证码'
})

// 检查表单是否可以提交
const canSubmit = computed(() => {
    return /^1[3-9]\d{9}$/.test(mobile.value) && 
           /^\d{6}$/.test(verificationCode.value) &&
           newPassword.value.length >= 8 && 
           /^[a-zA-Z0-9_]+$/.test(newPassword.value) &&
           confirmPassword.value === newPassword.value
})

// 密码强度检测
const getPasswordStrength = () => {
    const pwd = newPassword.value
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
    const pwd = newPassword.value
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

// 发送验证码
const sendVerificationCode = async () => {
    if (!canSendCode.value) return
    
    // 验证手机号格式 - 严格的11位数字，1开头
    if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
        uni.showToast({
            title: '请输入正确的手机号格式',
            icon: 'none'
        })
        return
    }
    
    // TODO: 这里添加发送验证码的API调用
    console.log('发送验证码到：', mobile.value)
    const res = await userApi.updPasswordCode(mobile.value)
    uni.showToast({
        title: '验证码已发送',
        icon: 'success'
    })
    
    // 开始倒计时
    countdown.value = 60
    timer.value = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer.value)
            timer.value = null
        }
    }, 1000)
}

// 修改密码处理
const handleChangePassword = async () => {
    if (!canSubmit.value) return
    
    // 验证手机号格式 - 严格的11位数字，1开头
    if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
        uni.showToast({
            title: '请输入正确的手机号格式',
            icon: 'none'
        })
        return
    }
    
    // 验证验证码 - 必须是6位数字
    if (!/^\d{6}$/.test(verificationCode.value)) {
        uni.showToast({
            title: '验证码必须是6位数字',
            icon: 'none'
        })
        return
    }
    
    // 验证新密码格式
    if (newPassword.value.length < 8) {
        uni.showToast({
            title: '密码至少需要8位',
            icon: 'none'
        })
        return
    }
    
    // 验证密码只能包含字母数字下划线
    if (!/^[a-zA-Z0-9_]+$/.test(newPassword.value)) {
        uni.showToast({
            title: '密码只能包含字母数字和下划线',
            icon: 'none'
        })
        return
    }
    
    // 验证密码确认
    if (newPassword.value !== confirmPassword.value) {
        uni.showToast({
            title: '两次密码输入不一致',
            icon: 'none'
        })
        return
    }
    
    // TODO: 这里添加修改密码逻辑
    const res = await userApi.updatePassword({
        phone: mobile.value,
        password: newPassword.value,
        code: verificationCode.value
    })
    console.log('修改密码结果:', res)
    if (res.code === 200 || res.code === '200') {
        uni.showToast({
            title: '密码修改成功',
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
    // 延迟跳转到登录页
    setTimeout(() => {
        goToLogin()
    }, 1500)
}

// 跳转到登录页
const goToLogin = () => {
    uni.navigateTo({
        url: '/pages/index/index'
    })
}

// 页面销毁时清除定时器
onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value)
    }
})
</script>

<style lang="scss" scoped>
.change-password-container {
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

.change-password-card {
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
            
            &.verification-wrapper {
                display: flex;
                align-items: center;
                gap: 20rpx;
                
                .verification-input {
                    flex: 1;
                }
                
                .send-code-btn {
                    width: 200rpx;
                    height: 88rpx;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border: none;
                    border-radius: 16rpx;
                    color: #fff;
                    font-size: 26rpx;
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
        
        .change-password-btn {
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
    .change-password-card {
        margin: 20rpx;
        padding: 40rpx 30rpx;
    }
    
    .header .logo .logo-text {
        font-size: 40rpx;
    }
}
</style>
