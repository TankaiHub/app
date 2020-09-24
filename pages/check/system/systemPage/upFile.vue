<template>
	<view class="app_up_file_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="上传文件"></uni-nav-bar>
		<view class="a_u_f_wrap padding_10px font14">
			<uni-list>
				<uni-list-item :showArrow="false" title="文件上传" class="list_border_1px" >
					<view class="text_align_right clearfix" slot="right">
						<view class="" >{{image}}</view>
						<button type="primary" class="float_right width100px line_height_30px height30px font14" @click="upFile">上传</button>
					</view>
				</uni-list-item> 
				<uni-list-item :showArrow="false" title="文件标题" class="list_border_1px">
					<view class="" slot="right">
						<input type="text" class="text_align_right" v-model="fileTitle" placeholder="请输入文件标题"/>
					</view>
				</uni-list-item> 
			</uni-list>
			<view class="dis_flex_center up_file_btn_wrap"> 
				<button type="default" class="width100px font14 line_height_30px height30px" @click="onCancel">取消</button>
				<button type="primary" class="width100px font14 line_height_30px height30px" @click="onSubmit">确定</button>
			</view>
			<l-file ref="lFile" @up-success="upSuccess"></l-file>
			
		</view>
	</view>
</template>

<script>
	import tkiFileManager from "@/components/tki-file-manager/tki-file-manager.vue"
	import lFile from '@/components/l-file/l-file.vue'
	import gUpload from "@/components/g-upload/g-upload.vue"
	import {baseUrl} from "@/utils/config.js"
	export default {
		data() {
			return {
				drawerVisible: false,
				isShowArrow: false,
				fileTitle:'',
				image:'', 
				file_url:''
			}
		},
		components: {
			tkiFileManager,
			gUpload,
			lFile
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			upFile() {
				console.log(11)
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: baseUrl + 'index/Tool/uploadFile', 
					name: 'file',
				});
			}, 
			upSuccess(obj) {
				// console.log(obj, "??????????????????????================")
				this.image = obj.fileName;
				var data = obj.data;
				if (data.statusCode == 200) {
					var ele = data.id;
					try{
						var ele_data = JSON.parse(ele);
						this.file_url = ele_data.data.url;
						console.log(this.file_url, "================")
					}catch(e){
						console.log(e, 'err')
						//TODO handle the exception
					} 
				}
			}, 
			toast(title) {
				uni.showToast({
					title,
					icon:'none'
				})
			},
			onSubmit() {
				if (this.image == '') {
					this.toast("请上传文件");
					return;
				}
				if (this.fileTitle == '') {
					this.toast("请输入文件标题");
					return;
				}
				var opts = {
					name:this.fileTitle,
					url:this.file_url,
					type:2,
					pid:1,
					size:1
				};
				var _self = this;
				this.$http.post("upload", opts).then(res=> {
					if (res.code == 200) {
						uni.showToast({
							title:"新增成功",
							icon:'none',
							success() {
								setTimeout(()=> {
									_self.onCancel();
								}, 1500);
							}
						})
					}
				});
			},
			onCancel() {
				this.onNavBarLeft()
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
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
			.up_file_btn_wrap{
				margin-top:200upx;
			}
		}
	}
</style>
