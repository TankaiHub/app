<template>
	<view class="app_company_table_contaier">
		<!-- 企业 info -->
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar :left-icon="barIcon" fixed="true" @clickLeft="onNavBarLeft" title="企业信息"></uni-nav-bar>
		<view class="company_table_wrap padding_10px">
			<view class="common_table_top_info mar_bottom_10px mar_top_10px">
				<text class="font14 font_weight_bold">状态：{{state}}</text>
				<text class="mar_left_10px F56C6C" @click="onWrite" v-if="approvalStatus.approval_status==3">去填写>></text>
				<text class="mar_left_10px F56C6C" @click="onGoMsg" v-if="approvalStatus.approval_status==5">查看审核失败原因>></text>
			</view>
			<common-table :bar="barIcon">
				<view class="a_t_slot" @click="onEditInfo(1)" slot="base">修改</view>
				<view class="a_t_slot" @click="onEditInfo(2)" slot="safety">修改</view>
				<view class="a_t_slot" @click="onEditInfo(3)" slot="risk">修改</view>
			</common-table>
			<!-- <view class="mar_top_20px mar_bottom_20px dis_flex_center" v-if="barIcon == 'back'">
				<button type="primary" @click="onSubmit(false)">上一步</button>
				<button type="primary" @click="onSubmit(true)">提交</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import commonTable from "../../common-table/common-table.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				drawerVisible: false,
				barIcon: 'list',
				baseAndSafetyInfoData: {},
				approvalStatus: {},
			};
		},
		components: {
			commonTable
		},
		computed: {
			...mapState(['userInfo']),
			state() {
				switch (this.approvalStatus.approval_status) {
					case 1:
						return '审核通过(审核已通过，再次修改信息需要提交审核)';
					case 2:
						return '审核中(审核通过之前可以随时修改)';
					case 3:
						return '填写中';
					case 4:
						return '修改审核中';
					case 5:
						return '审核失败';
					default:
						return '未填写';
				}
			}
		},
		onLoad(opts) {
			this.log(opts)
			if (opts.icon == 'back') {
				this.barIcon = 'back';
			}
			this._initData();
		},
		onShow() {
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			_initData() {
				var opts = {
					company_id: this.userInfo.company_id || 2433,
					//2478,
					// 2433, 食品
					// 2282
				};
				this._getInfo(opts);
				this.getApprovalStatus(opts)
				// this._getRiskInfo(opts);
			},
			getApprovalStatus(opts) {
				this.$http.post('approvalStatus', opts).then(res => {
					if (res.code == 200) {
						this.approvalStatus = res.data;
					}
				})
			},
			_getInfo(opts) {
				this.$http.post('info', opts).then(res => {
					if (res.code == 200) {
						this.baseAndSafetyInfoData = res.data;
					}
				});
			},
			_getRiskInfo(opts) {
				this.$http.post('riskInfo', opts).then(res => {
					if (res.code == 200) {
						this.riskInfoData = res.data
					}
				});
			},
			/**
			 * @param {Object} bool false-上一步 true-提交
			 */
			onSubmit(bool) {

				if (bool) {
					if (this.userInfo && this.userInfo.id && this.userInfo.id != (null || undefined)) {
						this.$http.post('submitA', {
							company_id: this.userInfo.company_id,
							admin_id: this.userInfo.id
						}).then(res => {
							if (res.code == 200) {

							}
						})
					} else {
						this.$http.post('submitA', {
							company_id: this.userInfo.company_id
						}).then(res => {
							if (res.code == 200) {

							}
						})
					}

				} else {
					var url = this._changeGoToPage(this.baseAndSafetyInfoData.industry_category_zfl)
					uni.navigateTo({
						url: url + '?p=max',
						fail(err) {
							console.log(err)
						}
					})
				}
			},
			_changeGoToPage(name) {
				switch (name) {
					case '塑料':
						return '../writeData/riskMainPage/plastic?p=t';
					case '纺织':
						return '../writeData/riskMainPage/textile?p=t';
					case '食品':
						return '../writeData/riskMainPage/food?p=t';
					case '建材':
						return '../writeData/riskMainPage/buildingMaterials?p=t';
					case '纸制品':
						return '../writeData/riskMainPage/paperProducts?p=t';
					case '商贸':
						return '../writeData/riskMainPage/business?p=t';
					case '轻工':
						return '../writeData/riskMainPage/industryFurniture?p=t'; //comm
					case '家具':
						return '../writeData/riskMainPage/industryFurniture?p=t'; //comm
					case '机械':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored?p=t'; //comm1
					case '烟草':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored?p=t'; //comm1
					case '冶金':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored?p=t'; //comm1
					case '有色':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored?p=t'; //comm1
					default:
						return '';
				}
			},
			//修改
			onEditInfo(num) {
				if (num == 1) {
					uni.navigateTo({
						url: '../writeData/base',
						fail(err) {
							console.log(err)
						}
					})
				} else if (num == 2) {
					uni.navigateTo({
						url: '../writeData/safety'
					})
				} else if (num == 3) {
					var url = this._changeGoToPage(this.baseAndSafetyInfoData.industry_category_zfl || "");
					uni.navigateTo({
						url,
						fail(err) {
							console.log(err)
						}
					})
				}
			},
			onGoMsg() {

			},
			onWrite() {
				uni.navigateTo({
					url: "../writeData/base"
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.F56C6C {
		color: #F56C6C;
	}

	.a_t_slot {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 180upx;
		font-size: 30upx;
		color: #f56c6c;
		text-decoration: underline;
	}
</style>
