<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	/* 隐藏滚动条但保持滚动功能 */
	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
	
	/* 兼容Firefox */
	html {
		scrollbar-width: none;
	}
	
	/* 隐藏uni-app页面滚动条 */
	page {
		overflow-x: hidden;
	}
	
	/* 确保scroll-view组件也隐藏滚动条 */
	scroll-view::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
</style>
