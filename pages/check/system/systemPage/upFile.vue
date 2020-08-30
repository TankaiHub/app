<template>
	<view class="app_up_file_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="上传文件"></uni-nav-bar>
		<view class="a_u_f_wrap">
			<button type="primary" @tap="openFile">打开文件选择器</button>
			<view>文件路径为:</view>
			<view class="path">{{path}}</view>
			<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
		</view>
	</view>
</template>

<script>
	import tkiFileManager from "@/components/tki-file-manager/tki-file-manager.vue"
	export default {
		data() {
			return { 
				drawerVisible: false,
				isShowArrow: false,
				title: '',
				path: '',
			}
		},
		components: {
			tkiFileManager
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			openFile() {
				this.$refs.filemanager._openFile()
			},
			resultPath(e) {
				this.path = e;
				uni.uploadFile({
					url:'http://spmsapi.cqxddwl.com/index/Tool/uploadFile',
					filePath:this.path, 
					success(res) {
						this.log(res)
					},
					fail(err) {
						this.log('err', err)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.app_up_file_container {
		.a_u_f_wrap {
			padding: 10px;

			.content {
				width: 100%;
				overflow: hidden;
			}

			.path {
				font-size: 14px;
				word-break: break-all;
			}
		}
	}
</style>
