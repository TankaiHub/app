<template>
	<view class="app_review_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="复查"></uni-nav-bar>
		<view class="rev_wrap">
			<view class="rev_list_wrap">
				<view class="rev_list_item" v-for="(item, index) in contentList" :key="index">
					<view class="rev_l_i_text_wrap clearfix">
						<view class="dis_inline_block vertical_align_top">{{index + 1}}、</view>
						<input @blur="inpBlur(item ,item['is_focus' + index] , index)" :focus="item['is_focus' + index]" type="text" v-if="item['show_edit'+index]"
						 class="dis_inline_block vertical_align_top border_1px_all_ccc padding_5px border_radius_5" v-model="item.content"
						 :style="{ width:(textWidth - 20)+'rpx' }" />
						<view v-else class="dis_inline_block vertical_align_top" :style="{ width:textWidth+'rpx' }">{{item.content}}</view>
 
						<image @click="onEditImg(item, index)" src="../../../../static/edit.png" class="img_size_40upx mar_left_5px vertical_align_bt"
						 mode="aspectFill"></image>
					</view>
					<radio-group @change="radioChange($event, item, index)" class="clearfix mar_top_10px">
						<label class="float_left dis_flex_center mar_right_30px">
							<view>
								<radio value="check" :checked="item['check' + index]" />
							</view>
							<view>未整改</view>
						</label>
						<label class="float_left dis_flex_center">
							<view>
								<radio value="check_n" :checked="item['check_n' + index]" />
							</view>
							<view>整改完成</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="cancel_determine_btn_wrap">
				<button class="cancel_btn half can_det_btn" @click="onCancel" type="default">取消</button>
				<button class="determine_btn half can_det_btn" @click="onDetermine" type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	export default {
		data() {
			return {
				drawerVisible: false,
				reviewInfo: {},
				contentList: [],
				current: -1,
				textWidth: 400,
				task_id: ''
			}
		},
		components: {
			appNav
		},
		onLoad(opts) {
			var _self = this;
			uni.getSystemInfo({
				success(res) {
					var w = (res.windowWidth - 20 - 20 - 35) * 2;
					_self.textWidth = w;
					var task_id = opts.task_id;
					_self.task_id = task_id;
					_self._initData(task_id);
				}
			})

		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData(task_id) {
				var opts = {
					task_id
				};
				this.$http.post('taskInfoZ', opts).then(res => {
					if (res.code == 200) {
						this.reviewInfo = res.data.info;
						var list = res.data.content_list
						for (var i = 0; i < list.length; i++) {
							list[i]['check' + i] = false;
							list[i]['check_n' + i] = false;
							list[i]['show_edit' + i] = false;
							list[i]['is_focus' + i] = false;

						}
						this.contentList = list;
					}
				})
			},
			radioChange(e, item, index) {
				var val = e.detail.value;
				console.log(val);
				if (val == 'check') {
					item['check'+index] = true;
					item['check_n' + index] = false;
				}
				if (val == 'check_n') {
					item['check'+index] = false;
					item['check_n' + index] = true;
				}
			},
			onEditImg(item, index) {
				item['show_edit' + index] = true;
			},
			inpBlur(item, bool, index) {
				item['show_edit' + index] = false;
				item['is_focus' + index] = false;
			},
			onCancel() {
				uni.navigateBack();
			},
			onDetermine() {
				var str = this.getReviewContent();
				var _self = this;
				if(str == "") {
					uni.showToast({
						title:"请选择",
						icon:'none'
					})
					return;
				}
				var opts = {
					task_id: this.task_id,
					data_json: str
				};
				this.$http.post('zgSubmit2', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title:res.msg,
							icon:"none",
							success() {
								setTimeout(() => {
									_self.onCancel();
								}, 2000);
							}
						})
					}
				})
			},
			getReviewContent() {
				if (this.contentList && this.contentList.length > 0) {
					var arr = [];
					for (var i = 0; i < this.contentList.length; i ++) {
						var state;
						if (this.contentList[i]['check'+i]) {
							state = this.contentList[i]['check'+i];
						}
						if (this.contentList[i]['check_n'+i]) {
							state = this.contentList[i]['check_n'+i];
						}
						arr.push({
							record_id:this.contentList[i].record_id,
							z_state:state,
							z_content:this.contentList[i].content
						});
					}
					return JSON.stringify(arr);
				}else {
					return '';
				} 
			},
		},
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_review_container {
		.rev_wrap {
			padding: 20rpx;
		}
	}
</style>
