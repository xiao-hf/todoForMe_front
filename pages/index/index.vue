<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="/static/2.png"></image>
		<image class="img-b" src="/static/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">欢迎使用，todo+</view>
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
					<text>{{ showPassword ? '👁️' : '👁️‍🗨️' }}</text>
				</view>
			</view>
			<button @tap="login()">登 录</button>
			<view class="button-group">
				<button type="primary" style="background-color: gray;" plain="true" class="t-forget" @tap="forgetPassword()">忘记密码</button>
				<button type="primary" style="background-color: rgb(109, 142, 160);" plain="true" class="t-register" @tap="register()">注册</button>
			</view>
		</form>
	</view>
</template>
<script setup>
import { ref } from 'vue'
import { userApi } from '@/api/userApi'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const phone = ref('')
const password = ref('')
const showPassword = ref(false)

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
	top: 25rpx;
	padding: 10rpx;
	font-size: 32rpx;
	color: #999;
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
</style>
