<template>
	<view class="app_company_feedback_detail_c_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="企业反馈-详情"></uni-nav-bar>
		<view class="company_feedback_detail_c_wrap padding_10px" v-if="companyInfoData">
			<!-- <app-editor></app-editor> -->
			<view class="company_title font16 font_weight_bold">{{companyInfoData.info.title  || '无'}}</view>
			<view class="company_editor_wrap mar_top_10px mar_bottom_10px mar_left_10px padding_10px border_1px_all_ccc border_radius_5">{{companyInfoData.info.content}}</view>
			<view class="company_feedback_info mar_left_10px">
				<view class="c_f_io_item mar_bottom_5px clearfix">
					<label :style="{ width:labelW*2+'upx' }" class="font_weight_bold float_left dis_flex_center">发送人<text>：</text></label>
					<view :style="{ width:inW * 2 +'upx' }" class="float_left">{{companyInfoData.company_info.name  || '无'}}</view>
				</view>
				<view class="c_f_io_item mar_bottom_5px clearfix">
					<label :style="{ width:labelW*2+'upx' }" class="font_weight_bold float_left dis_flex_center">时间<text>：</text></label>
					<view :style="{ width:inW * 2 +'upx' }" class="float_left">{{changeTime(companyInfoData.info.addtime, "yy-mm-dd hh-mm-ss")  || '无'}}</view>
				</view>
				<view class="c_f_io_item mar_bottom_5px clearfix">
					<label :style="{ width:labelW*2+'upx' }" class="font_weight_bold float_left dis_flex_center">联系方式 <text>：</text> </label>
					<view :style="{ width:inW * 2 +'upx' }" class="float_left">{{companyInfoData.company_info.phone || '无'}}</view>
				</view>
				<view class="c_f_io_item mar_bottom_5px clearfix">
					<label :style="{ width:labelW*2+'upx' }" class="font_weight_bold float_left dis_flex_center">经营地址<text>：</text></label>
					<view :style="{ width:inW * 2 +'upx' }" class="float_left">{{companyInfoData.company_info.produce_address  || '无'}}</view>
				</view>
				<view class="c_f_io_item mar_bottom_5px clearfix">
					<label :style="{ width:labelW*2+'upx' }" class="font_weight_bold float_left dis_flex_center">附件<text>：</text></label>
					<view :style="{ width:inW * 2 +'upx' }" class="float_left color_blue_btb" v-if="companyInfoData.info.annex_url" @click="onDownload(companyInfoData.info.annex_url)">下载</view>
					<view :style="{ width:inW * 2 +'upx' }" class="float_left color_ccc" v-else>无附件</view>
				</view>
			</view>
			
			
			<view class="a_r_p_w_btn_wrap"> 
				<button type="primary" class="width100px" @click="onFeedback">反馈企业</button>
				<button type="primary"  class="width100px" @click="onSubmit">上报处理</button>
			</view>
		
		</view>
		<app-alert v-if="isShowReason" title="上报原因" placeholder="请输入上报原因" @cancel="cancel" @confirm="confirm"></app-alert>
	</view>
</template>

<script>
	import appEditor from '@/components/app-input/app-editor'
	import appAlert from '@/components/h-form-alert/h-form-alert'
	import { changeTime } from '@/common/js/base.js'
	export default {
		data() {
			return {
				changeTime,
				d_id: '',
				labelW:75,
				companyInfoData:null,
				isShowReason:false,
				reasonContent:'',
				editorContent:'',
			}
		},
		components: {
			appEditor,
			appAlert
		},
		computed:{
			inW() {
				var w = uni.getSystemInfoSync().screenWidth - 20 - 10 - this.labelW;
				return w;
			}
		},
		onLoad(opts) {
			this.d_id = opts.id;
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				this.onCancel();
			},
			_initData() {
				var opts = {
					id: this.d_id
				};
				this.$http.post('feedbackInfoC', opts).then(res => {
					if (res.code == 200) {
						this.companyInfoData = res.data;
					}
				})
			},
			//附件下载
			onDownload(url) {
				uni.downloadFile({
					url,
					success(res){
						console.log(res, '下载成功')
						uni.saveFile({
							tempFilePath:res.tempFilePath,
							success(res) {
								console.log(res, '保存成功')
							}
						})
					}
				})
			},
			onCancel() {
				uni.navigateBack();
			},
			onFeedback() {
				if(this.editorContent == '') {
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
					return;
				}
				var opts = {
					feedback_id:this.d_id,
					content:this.editorContent
				};
				this.$http.post('replyC', opts).then(res=> {
					if (res.code == 200) {
						uni.showToast({
							title:'反馈成功',
							icon:'success',
							success() {
								setTimeout(()=> {
									_self.onCancel();
								}, 1500);
							}
						})
					}
				});
			},
			onSubmit() {
				this.isShowReason = true;
			},
			//
			cancel() {
				this.isShowReason = false;
			},
			confirm(e) {
				this.reasonContent = e;
				var opts = {
					reson:this.reasonContent,
					id:this.d_id
				};
				var _self = this;
				this.$http.post('report', opts).then(res=> {
					if (res.code == 200) {
						uni.showToast({
							title:'上报成功',
							icon:'success',
							success() {
								setTimeout(()=> {
									_self.isShowReason = false; 
								}, 1500);
							}
						})
					}
				});
			},
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
