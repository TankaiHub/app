<template>
	<view class="app_companyMsgSend_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="发送邮件-编辑"></uni-nav-bar>
		<view class="companyMsgSend_wrap padding_10px">
			<app-item-input title="标题：">
				<view class="" slot="item">
					<input type="text" v-model="title" placeholder="请输入标题" class="border_1px_all_409eff padding_8px mar_left_45px border_radius_5" />
				</view>
			</app-item-input>
			<app-item-input title="附件：" class="mar_top_10px mar_bottom_10px">
				<view class="text_align_left" slot="item">
					<button @click="openFile" type="primary" class="width150px height30px line_height_30px mar_left_45px">文件上传</button>


				</view>
			</app-item-input>
			<app-item-input title="内容：">
				<view class="" slot="item">

				</view>
			</app-item-input>

			<view class="a_r_p_w_btn_wrap">
				<button type="default" @click="onCancel">取消</button>
				<button type="primary" @click="onSubmit">确定</button>
			</view>
			<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
		</view>
	</view>
</template>

<script>
	import tkiFileManager from "@/components/tki-file-manager/tki-file-manager.vue"
	import appItemInput from "@/components/app-item-input/app-item-input"

	import {
		baseUrl
	} from '@/utils/config.js'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				title: '',
				content:''
			}
		},
		components: {
			appItemInput,
			tkiFileManager,
		},
		computed: {
			...mapState(['admin_email_send']),
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			onCancel() {
				uni.navigateBack({
					delta:2
				})
			},
			onSubmit() {
				if (this.title == '') {
					uni.showToast({
						title:"请输入标题",
						icon:'none'
					})
					return
				}
				if (this.content == '') {
					uni.showToast({
						title:"请输入内容",
						icon:'none'
					})
					return
				}
				var opts = {
					title: this.title,
					company_chose_type: this.admin_email_send.company_chose_type,
					company_id: this.admin_email_send.company_id.join(',') || '',
					industry_category: this.admin_email_send.industry_category,
					produce_state: this.admin_email_send.produce_state,
					r_admin_number: this.admin_email_send.r_admin_number.join(',') || '',
					content: this.content 
				}
				this.$http.post('send', opts).then(res=>{
					if (res.code == 200) {
						this.log(res)
					}
				})
			},
			openFile() {
				this.$refs.filemanager._openFile()
			},
			resultPath(e) {
				var _self = this;
				this.path = e;
				this.log(e)
				const uploadTask = uni.uploadFile({
					url: baseUrl + 'index/Tool/uploadFile',
					method: "POST",
					filePath: e,
					header: {
						"Content-Type": "multipart/form-data"
					},
					success: (uploadFileRes) => {
						this.log(uploadFileRes.data);
					}
				});

				uploadTask.onProgressUpdate((res) => {
					this.log('上传进度' + res.progress);
					this.log('已经上传的数据长度' + res.totalBytesSent);
					this.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					if (res.progress == 100) {
						this.log("上传完成")
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.a_r_p_w_btn_wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
	}
</style>
