<template>
	<view class="app_law_scheme_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="开始检查"></uni-nav-bar>
		<view class="l_sch_wrap">
			<view class="l_sch_top_btn_wrap clearfix">
				<view class="l_sch_t_b_bd_wrap clearfix">
					<view class="l_sch_com_tips_wrap" @click="onComTips">
						<text>?</text>
						企业已关闭/搬迁
					</view>
					<button class="l_sch_top_btn" type="primary" v-if="carryOutState" @click="onGoAddLawPlan">新增</button>
				</view>
			</view>

			<view class="l_sch_table_wrap">
				<app-table :headerData="headerData" :bodyData="checkList" :tablePorps="tableProps" :isShowOper="isShowOper">
					<template slot="other" slot-scope="props">
						<text :class="{ color_red_btb:props.data.state == 2, color_green_btb:props.data.state == 1 }">{{ changeState(props.data.state) }}</text>
					</template>
					<template slot="handle" slot-scope="props">
						<view class="">
							<text class="color_blue_btb" @click="onCheck(true, props.data)" v-if="props.data.state == 2">检查</text>
							<text class="color_blue_btb" @click="onCheck(false, props.data)" v-if="props.data.state != 2">编辑</text>
						</view>
					</template>
				</app-table>
			</view>

			<view class="l_sch_btb dis_flex_center mar_top_20rpx" v-if="carryOutState">
				<button type="primary" class="mar_top_20px" size="mini" @click="onCarryOut">检查完成</button>
				<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange'></date-time-picker>
			</view>

		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appTable from "@/components/app-table/app-table-not-expand"
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker'
	import {
		mapState,
		mapMutations
	} from "vuex"
	import {
		DivideAthousandTime
	} from '@/common/js/base.js'
	export default {
		data() {
			return {
				drawerVisible: false,
				infoId: '',
				taskId: '',
				page: 1,
				pageSize: '',
				selectkey: '',
				headerData: [{
					text: "方案内容",
					width: 100,
					center: false,
				}, {
					text: "状态",
					width: 100,
					center: true
				}, {
					text: "操作",
					width: 100,
					center: true
				}],
				tableProps: [{
					isContent: true,
					style: {},
					props: "content"
				}, {
					style: {},
					props: "state",
					isOther: true
				}],
				checkList: [],
				isShowOper: false,
				carryOutState: false,
				/////////time
				dateString: '',
				type: 'date',
				timeStr: ''
			}
		},
		components: {
			appNav,
			appTable,
			DateTimePicker
		},
		computed: {
			...mapState(['admin_law_item_plan_info', 'admin_law_detail_info']),
			indicatorStyle() {
				return {
					background: 'rgba(204, 204, 204, .5)',
					height: '40px',
				};
			}
		},
		onLoad(opts) {
			this.infoId = opts.info_id;
			this.taskId = opts.task_id;
			this._initData();
		},
		onShow() {
			this._initData();
		},
		methods: {
			...mapMutations(['set_admin_law_item_plan_info']),
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				var opts = {
					page: this.page,
					page_size: this.pageSize,
					key: this.selectkey,
					task_id: this.taskId
				};
				this.$http.post('planList', opts).then(res => {
					if (res.code == 200) {
						var data = res.data;
						// if (data.length > 0) {
						// 	for (var i = 0; i < data.length; i++) {
						// 		data[i].state = this.changeState(data[i].state);
						// 	}
						// }
						this.checkList = data;
						this.carryOutState = this.checkCarryOut();
					}
				})
			},
			changeState(state) {
				switch (state) {
					case 1:
						return "已检查";
					case 2:
						return "未检查";
					default:
						return "";
				}
			},
			/**
			 * @param {Boolean} bool  true-- 检查  false--编辑
			 */
			onCheck(bool, data) {
				this.$store.commit('set_admin_law_item_plan_info', data);
				if (bool) {

				} else {

				}
				uni.navigateTo({
					url: './lawEnforcement'
				})
			},

			//新增
			onGoAddLawPlan() {
				uni.navigateTo({
					url: './addLawPlan'
				})
			},
			//////////////////////time
			dateTimeChange(e) {
				var reg = /\-/g;
				this.timeStr = e.replace(reg, "/");
				this.onCarryOut(this.timeStr);
			},
			//判断是否检查完成
			checkCarryOut() {
				var state = true;
				for (var i = 0; i < this.checkList.length; i++) {
					if (this.checkList[i].state == 2) {
						state = false;
					}
				}
				return state;
			},
			//检查完成
			onCarryOut(time) {
				if (time != '') {
					time = new Date(time + '/01').getTime();
				} else {
					time = '';
				}
				var opts = {
					task_id: this.admin_law_detail_info.task_id,
					deadline: DivideAthousandTime(time),
				};
				this.$http.post('taskSubmit', opts, true, true).then(res => {
					this.log(res)
					if (res.msg == 'deadline') {
						this.$refs['date-time'].show();
					} else if (res.code == 200) {
						uni.showToast({
							title: '提交成功',
							icon: "none",
							success() {
								setTimeout(() => {
									uni.navigateBack()
								}, 1000);
							}
						})
						// uni.$message({
						// 	type: 'success',
						// 	message: '提交成功！'
						// }); 
					}
				})
			},
			onComTips() {
				var thi = this;
				uni.showModal({
					title: '提示',
					content: '企业已关闭/搬迁?',
					success: function(res) {
						if (res.confirm) {
							var opts = {
								task_id: this.admin_law_detail_info.task_id
							};
							this.$http.post("taskStop", opts).then(res => {
								if (res.code == 200) {
									uni.navigateBack()
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
		},
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_law_scheme_container {
		.l_sch_wrap {
			padding: 20upx;

			.l_sch_top_btn_wrap {
				.l_sch_t_b_bd_wrap {
					float: right;
					margin: 20upx 0;
					height: 60upx;
					line-height: 60upx;
					font-size: 28upx;

					.l_sch_com_tips_wrap {
						float: left;
						margin-right: 20upx;

					}

					.l_sch_top_btn {
						float: left;
						width: 200upx;
						height: 60upx;
						line-height: 60upx;
					}
				}

			}
		}
	}
</style>
