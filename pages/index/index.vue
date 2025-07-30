<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="/static/2.png"></image>
		<image class="img-b" src="/static/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">
			欢迎使用，todo+
			<text class="usage-link" @tap="showUsageModal">使用说明</text>
		</view>
		<form class="cl">
			<view class="t-a">
				<image src="/static/sj.png"></image>
				<view class="line"></view>
				<input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
			</view>
			<view class="t-a">
				<image src="/static/yz.png"></image>
				<view class="line"></view>
				<input :type="showPassword ? 'text' : 'password'" name="code" placeholder="请输入密码" v-model="password" />
				<view class="eye-icon" @tap="togglePassword">
					<uni-icons :type="showPassword ? 'eye' : 'eye-slash'" size="20" color="#999"></uni-icons>
				</view>
			</view>
			<button @tap="login()">登 录</button>
			<view class="button-group">
				<button type="primary" style="background-color: #f8f9fa; color: #6c757d; border-color: #dee2e6;" plain="true" class="t-forget" @tap="forgetPassword()">忘记密码</button>
				<button type="primary" style="background-color: transparent; color: #5677fc; border-color: #5677fc;" plain="true" class="t-register" @tap="register()">注册</button>
			</view>
		</form>

		<!-- 使用说明弹框 -->
		<view class="modal-overlay" v-if="showUsage" @tap="closeUsageModal">
			<view class="modal-content" :class="{ 'closing': usageModalClosing }" @tap.stop>
				<view class="modal-header">
					<text class="modal-title">使用说明</text>
					<view class="modal-close" @tap="closeUsageModal">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				
				<view class="modal-body">
					<text class="usage-title">todo+ 智能自律管理软件</text>
					<text class="usage-subtitle">让自律变得有趣，让坚持变得简单！</text>
					
					<view class="feature-list">
						<view class="feature-item">
							<text class="feature-icon">✓</text>
							<text class="feature-text">智能任务规划 - AI管家协助制定个性化计划</text>
						</view>
						<view class="feature-item">
							<text class="feature-icon">✓</text>
							<text class="feature-text">奖励机制 - 完成任务获得金币奖励</text>
						</view>
						<view class="feature-item">
							<text class="feature-icon">✓</text>
							<text class="feature-text">惩罚机制 - 未完成任务自动扣除余额</text>
						</view>
						<view class="feature-item">
							<text class="feature-icon">✓</text>
							<text class="feature-text">数据统计 - 直观查看完成率和收益情况</text>
						</view>
						<view class="feature-item">
							<text class="feature-icon">✓</text>
							<text class="feature-text">模板功能 - 快速创建常用任务</text>
						</view>
					</view>
				</view>
				
				<view class="modal-footer">
					<button class="confirm-btn" @tap="closeUsageModal">我知道了</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { userApi } from '@/api/userApi'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const title = ref('todo+')
const phone = ref('')
const password = ref('')
const showPassword = ref(false)
const showUsage = ref(false)
const usageModalClosing = ref(false)

function register() {
	uni.navigateTo({
		url: "/pages/register/register"
	})
}

function forgetPassword() {
	uni.navigateTo({
		url: "/pages/changePassword/changePassword"
	})
}

function togglePassword() {
	showPassword.value = !showPassword.value
}

function showUsageModal() {
	showUsage.value = true
}

function closeUsageModal() {
	usageModalClosing.value = true
	// 延迟隐藏弹窗，等待动画完成
	setTimeout(() => {
		showUsage.value = false
		usageModalClosing.value = false
	}, 300) // 动画持续300ms
}

//当前登录按钮操作
const login = async () => {
	if (!phone.value) {
		uni.showToast({ title: '请输入手机号', icon: 'none' });
		return;
	}
	if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone.value)) {
		uni.showToast({ title: '请输入正确手机号', icon: 'none' });
		return;
	}
	if (!password.value) {
		uni.showToast({ title: '请输入密码', icon: 'none' });
		return;
	}
	const res = await userApi.login({phone: phone.value, code: password.value, type: 1})
	if (res.code === 200 || res.code === '200') {
		userStore.setUserInfo(res.data)
		uni.showToast({ title: '登录成功', icon: 'success' });
		uni.navigateTo({
			url: '/pages/home/home'
		})
	} else {
		uni.showToast({ title: '登录失败', icon: 'none' });
	}
}

// 重置页面状态
const resetPageState = () => {
	// 只重置弹框相关状态，保留用户输入
	showUsage.value = false
	usageModalClosing.value = false
}

onMounted(() => {
	resetPageState()
})

onShow(() => {
	resetPageState()
})
</script>

<style>
.button-group {
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
}
.t-forget {
	width: 30%;
	margin-left: 10rpx;
	margin-top: 20rpx;
}
.t-register {
	width: 30%;
	margin-right: 10rpx;
	margin-top: 20rpx;
}
.img-a {
	position: absolute;
	width: 100%;
	top: -150rpx;
	right: 0;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	/* margin-bottom: -200rpx; */
}
.t-login {
	width: 650rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	/* border-right: 2rpx solid #dedede; */
	margin-right: 20rpx;
}
.t-login .t-a .line{
	width: 2rpx;
	height: 40rpx;
	background-color: #dedede;
	position: absolute;
	top: 28rpx;
	left: 98rpx;
}

.t-login .t-a .eye-icon {
	position: absolute;
	right: 30rpx;
	top: 50%;
	transform: translateY(-50%);
	padding: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 300rpx 0 30rpx 0;
	font-weight: bold;
}
.t-login .t-b2 {
	text-align: left;
	font-size: 32rpx;
	color: #aaaaaa;
	padding: 0rpx 0 120rpx 0;
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.usage-link {
	color: #5677fc;
	font-size: 28rpx;
	text-decoration: underline;
	cursor: pointer;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}

/* 使用说明弹框样式 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	width: 90%;
	max-width: 600rpx;
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	animation: modalShow 0.3s ease-out;
	
	&.closing {
		animation: modalHide 0.3s ease-in;
	}
}

@keyframes modalShow {
	from {
		opacity: 0;
		transform: scale(0.8);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes modalHide {
	from {
		opacity: 1;
		transform: scale(1);
	}
	to {
		opacity: 0;
		transform: scale(0.8);
	}
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.modal-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.modal-close {
	padding: 10rpx;
	cursor: pointer;
}

.modal-body {
	padding: 40rpx 30rpx;
}

.usage-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
}

.usage-subtitle {
	display: block;
	font-size: 28rpx;
	color: #5677fc;
	margin-bottom: 30rpx;
	font-weight: 500;
}

.feature-list {
	margin-top: 20rpx;
}

.feature-item {
	display: flex;
	align-items: flex-start;
	margin-bottom: 20rpx;
	gap: 15rpx;
}

.feature-icon {
	color: #4caf50;
	font-weight: bold;
	font-size: 28rpx;
	line-height: 1.2;
}

.feature-text {
	color: #666;
	font-size: 28rpx;
	line-height: 1.5;
	flex: 1;
}

.modal-footer {
	padding: 20rpx 30rpx 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.confirm-btn {
	background: #5677fc !important;
	color: #fff !important;
	border: none !important;
	border-radius: 30rpx !important;
	padding: 25rpx 80rpx !important;
	font-size: 30rpx !important;
	font-weight: 500 !important;
	box-shadow: 0 4rpx 12rpx rgba(86, 119, 252, 0.3) !important;
	transition: all 0.2s ease !important;
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	height: 80rpx !important;
	line-height: 1 !important;
	
	&:active {
		transform: scale(0.98) !important;
		box-shadow: 0 2rpx 8rpx rgba(86, 119, 252, 0.4) !important;
	}
}
</style>
