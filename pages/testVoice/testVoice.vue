<template>
    <view class="voice-recognition">
        <uni-popup ref="popup" type="bottom" background-color="#fff" :mask-click="true" @change="onPopupChange">
            <view class="popup-content">
                <!-- 标题区域 -->
                <view class="header">
                    <text class="title">语音识别</text>
                    <text class="subtitle">按住说话，上滑取消</text>
                </view>

                <!-- 录音按钮区域 -->
                <view class="record-area">
                    <view class="record-btn" :class="{
              'recording': isRecording,
              'cancel': isCancel,
              'pulse': isRecording
            }" @touchstart="startRecord" @touchend="endRecord" @touchmove="moveRecord">
                        <view class="btn-inner">
                            <view class="mic-icon">
                                <image :src="isRecording ? '/static/icon_mic_fill.png' : '/static/icon_mic_no.png'"
                                    mode="aspectFit"></image>
                            </view>
                            <view class="ripple" v-if="isRecording"></view>
                        </view>
                    </view>
                </view>

                <!-- 提示文字区域 -->
                <view class="tip-area">
                    <text class="tip-text">{{ tipText }}</text>
                    <text class="cancel-tip" v-if="isCancel">松开手指，取消发送</text>
                </view>

                <!-- 结果展示区域 -->
                <view class="result-area" v-if="textTip">
                    <view class="result-title">识别结果</view>
                    <view class="result-content">{{ textTip }}</view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    const CANCEL_DISTANCE = 100;

    export default {
        name: 'voice-recognition',

        data() {
            return {
                isRecording: false,
                isCancel: false,
                startY: 0,
                tipText: '按住说话',
                recorderManager: null,
                textTip: ''
            };
        },

        created() {
            this.initRecorderManager();
        },

        onReady() {
            this.$nextTick(() => {
                this.open();
            });
        },

        methods: {
            initRecorderManager() {
                // 初始化录音管理器
                this.recorderManager = uni.getRecorderManager();

                // 监听录音开始事件
                this.recorderManager.onStart(() => {
                    console.log('recorder start');
                });

                // 监听录音错误事件
                this.recorderManager.onError((err) => {
                    console.error('录音错误：', err);
                    uni.showToast({
                        title: '录音出错',
                        icon: 'none'
                    });
                    this.resetRecordingState();
                });

                // 监听录音中断事件
                this.recorderManager.onInterruptionBegin(() => {
                    console.log('录音被中断');
                    this.recorderManager.stop();
                    this.resetRecordingState();
                });

                // 监听录音恢复事件
                this.recorderManager.onInterruptionEnd(() => {
                    console.log('录音中断结束');
                });

                // 监听录音结束事件
                this.recorderManager.onStop((res) => {
                    console.log("录音结束", res);

                    if (this.isCancel) {
                        this.resetRecordingState();
                        return;
                    }

                    this.handleRecordingFile(res.tempFilePath);
                });
            },

            handleRecordingFile(tempFilePath) {
                uni.getFileInfo({
                    filePath: tempFilePath,
                    success: (fileInfo) => {
                        // 检查文件大小是否正常（比如大于1KB且小于2MB）
                        if (fileInfo.size < 1024 || fileInfo.size > 2 * 1024 * 1024) {
                            uni.showToast({
                                title: '录音文件大小异常',
                                icon: 'none'
                            });
                            return;
                        }

                        this.uploadVoiceFile(tempFilePath);
                    },
                    fail: (err) => {
                        console.error('获取文件信息失败：', err);
                        uni.showToast({
                            title: '文件读取失败',
                            icon: 'none'
                        });
                    },
                    complete: () => {
                        this.resetRecordingState();
                    }
                });
            },

            uploadVoiceFile(tempFilePath) {
                uni.uploadFile({
                    url: "https://5555api.com/data/api/fetchTextByVoice",
                    filePath: tempFilePath,
                    name: 'audio',
                    formData: {},
                    header: {
                        // 这是个测试的key，正式环境请到https://5555api.com申请
                        apikey: 'test_app_key_5555api'
                    },
                    success: (suc) => {
                        try {
                            const result = JSON.parse(suc.data);
                            console.log("上传成功，解析结果：", result);
                            this.textTip = (result.data && result.data.partial) || '未识别到内容';
                        } catch (e) {
                            console.error("解析结果失败：", e);
                            this.textTip = "识别结果解析失败";
                        }
                    },
                    fail: (err) => {
                        console.error("上传失败：", err);
                        uni.showToast({
                            title: '上传失败',
                            icon: 'none'
                        });
                    }
                });
            },

            resetRecordingState() {
                this.isRecording = false;
                this.tipText = '按住说话';
            },

            open() {
                this.$refs.popup.open();
                this.textTip = '';
            },

            onPopupChange(e) {
                if (!e.show) {
                    this.isRecording = false;
                    this.isCancel = false;
                    this.tipText = '按住说话';
                }
            },

            startRecord(e) {
                console.error("按下了")
                this.startY = e.touches[0].clientY;
                this.isRecording = true;
                this.isCancel = false;
                this.tipText = '松开结束';

                // 开始录音
                this.recorderManager.start({
                    duration: 30000,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    encodeBitRate: 16000,
                    format: 'wav'
                });
            },

            moveRecord(e) {
                console.error("移动了")
                if (!this.isRecording) return;

                const moveY = this.startY - e.touches[0].clientY;
                if (moveY > CANCEL_DISTANCE) {
                    this.isCancel = true;
                    this.tipText = '松开取消';
                } else {
                    this.isCancel = false;
                    this.tipText = '松开结束';
                }
            },

            endRecord() {
                console.error("抬起了", this.isRecording)
                if (!this.isRecording) return;

                this.isRecording = false;
                this.recorderManager.stop();

                if (this.isCancel) {
                    this.tipText = '已取消';
                    setTimeout(() => {
                        this.$refs.popup.close();
                    }, 500);
                }
            }
        }
    };
</script>

<style scoped>
    .voice-recognition {
        width: 100%;
    }

    .popup-content {
        padding: 40rpx;
        min-height: 600rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* 标题区域样式 */
    .header {
        text-align: center;
        margin-bottom: 60rpx;
    }

    .title {
        font-size: 40rpx;
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 16rpx;
    }

    .subtitle {
        font-size: 28rpx;
        color: #999;
    }

    /* 录音按钮区域样式 */
    .record-area {
        position: relative;
        width: 100%;
        height: 300rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .record-btn {
        width: 200rpx;
        height: 200rpx;
        border-radius: 50%;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    }

    .btn-inner {
        width: 180rpx;
        height: 180rpx;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .mic-icon {
        width: 80rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mic-icon image {
        width: 60rpx;
        height: 60rpx;
        transition: all 0.3s ease;
    }

    /* 录音状态样式 */
    .record-btn.recording {
        background: #469CF8;
        transform: scale(1.05);
    }

    .record-btn.recording .btn-inner {
        background: #469CF8;
    }

    .record-btn.cancel {
        background: #ff4444;
        transform: scale(1.05);
    }

    .record-btn.cancel .btn-inner {
        background: #ff4444;
    }

    /* 波纹动画 */
    .ripple {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple 1.5s infinite;
    }

    @keyframes ripple {
        0% {
            transform: scale(0.8);
            opacity: 0.5;
        }

        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }

    /* 提示文字区域样式 */
    .tip-area {
        text-align: center;
        margin-top: 40rpx;
    }

    .tip-text {
        font-size: 32rpx;
        color: #666;
        display: block;
        margin-bottom: 16rpx;
    }

    .cancel-tip {
        font-size: 28rpx;
        color: #ff4444;
    }

    /* 结果展示区域样式 */
    .result-area {
        width: 100%;
        margin-top: 40rpx;
        padding: 30rpx;
        background: #f8f8f8;
        border-radius: 16rpx;
    }

    .result-title {
        font-size: 28rpx;
        color: #999;
        margin-bottom: 16rpx;
    }

    .result-content {
        font-size: 32rpx;
        color: #333;
        line-height: 1.6;
        word-break: break-all;
    }

    /* 脉冲动画 */
    .pulse {
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(70, 156, 248, 0.4);
        }

        70% {
            box-shadow: 0 0 0 20rpx rgba(70, 156, 248, 0);
        }

        100% {
            box-shadow: 0 0 0 0 rgba(70, 156, 248, 0);
        }
    }
</style>