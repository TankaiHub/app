<template>
	<view class="page_emailDetail_container">
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="收件箱-详情"></uni-nav-bar>
		<view class="emailDetail_wrap padding_10px">
			<view class="cmd_top_title clearfix">
				<view class="cmd_t_title float_left font18 font_weight_bold">
					{{detail.title}}
				</view>
			</view>
			<view class="cmd_content_wrap mar_top_10px mar_bottom_10px">

			</view>
			<view class="cmd_fj">
				<view class="font18 font_weight_bold">
					发送人：<text class="">{{detail.s_name}}</text>
				</view>
				<view class="font18 font_weight_bold">
					时间：<text class="color_ccc">{{changeTime(detail.addtime)}}</text>
				</view>
				<view class="font18 font_weight_bold" v-if="!detail.annex_url">
					附件：<text class="color_ccc">无附件</text>
				</view>
				<view class="font18 font_weight_bold" v-if="detail.annex_url">
					附件：<text class="color_blue_btb">下载附件</text>
				</view>
			</view>
			<view class="editer">

			</view>
			<view class="a_r_p_w_btn_wrap">
				<button type="primary" class="width100px height30px line_height_30px" @click="onSend">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		changeTime
	} from '@/common/js/base.js'
	export default {
		data() {
			return {
				changeTime,
				email_id: '',
				detail: {},
				record: [],
				content: ''
			}
		},

		onLoad(opts) {
			this.email_id = opts.email_id;
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack()
			},
			_initData() {
				var opts = {
					email_id: this.email_id
				};
				this.$http.post('emailInfo', opts).then(res => {
					if (res.code == 200) {
						this.detail = res.data.info;
						this.record = res.data.record;
					}

				})
			},
			onSend() {
				if (this.content == '') {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
					return;
				}
				var opts = {
					email_id: this.email_id,
					content: this.content
				}
				this.$http.post('replyEmail', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '反馈成功',
							icon: 'success',
							success() {
								setTimeout(() => {
									_self.onNavBarLeft();
								}, 1500);
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
