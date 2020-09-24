<template>
	<view class="page_final_table_contiainer">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="final_table_wrap padding_10px">
			<view class="top_btn_wrap dis_flex_center mar_bottom_20px">
				<button class="f_t_btn" @click="onChangeModlue(0)" :type="currentIndex == 0 ? 'primary' : 'default'">基本信息表</button>
				<button class="f_t_btn" @click="onChangeModlue(1)" :type="currentIndex == 1 ? 'primary' : 'default'">安全技术要求</button>
			</view>
			<common-table v-if="currentIndex == 0"></common-table>
			<view class="" v-if="currentIndex == 1">
				<view class="mar_bottom_10px mar_top_10px clearfix">
					<app-title class="float_left" text="安全技术要求"></app-title>
					<button type="primary" class="width100px float_right print_btn">打印</button>
				</view>
				<company-rules></company-rules>
			</view>
			<view class="mar_top_20px mar_bottom_20px dis_flex_center">
				<button type="primary" @click="onSubmit(false)">上一步</button>
				<button type="primary" @click="onSubmit(true)">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import commonTable from "../../../common-table/common-table.vue"
	import CompanyRules from '../../claim/CompanyRules'
	import appTitle from '@/components/app-title/app-title'

	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				currentIndex: 0,
				ftUserInfo: {},
				f_page: ''
			}
		},
		computed: {
			...mapState(['userInfo', 'userHomeInfoData']),
		},
		components: {
			commonTable,
			CompanyRules,
			appTitle
		},
		onLoad(opts) {
			this.f_page = opts.p;
			this._getInfo();
		},
		methods: {
			onNavBarLeft() {
				var name = this.ftUserInfo.industry_category_zfl;
				var c_u = this._changeUrl(name);
				console.log(c_u)
				uni.reLaunch({
					url: c_u + '?p=max',
					fail(err) {
						console.log(err)
					}
				});
			},
			_getInfo() {
				var opts = {
					company_id: this.userInfo.company_id || 2437
				};
				this.$http.post('info', opts).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this.ftUserInfo = data;
					}
				});
			},
			onChangeModlue(num) {
				this.currentIndex = num;
			},
			onSubmit(bool) {
				// <button type="primary" @click="onSubmit(false)">上一步</button>
				// <button type="primary" @click="onSubmit(true)">提交</button> 
				if (bool) {
					if (this.userInfo && this.userInfo.id && this.userInfo.id != (null || undefined)) {
						this.$http.post('submitA', {
							company_id: this.userInfo.company_id,
							admin_id: this.userInfo.id
						}).then(res => {
							if (res.code == 200) {
								uni.navigateTo({
									url:'../../companyTable/companyTable',
									fail(err) {
										console.log(err)
									}
								})
							}
						})
					} else {
						this.$http.post('submitA', {
							company_id: this.userInfo.company_id
						}).then(res => {
							if (res.code == 200) {
								uni.navigateTo({
									url:'../../companyTable/companyTable',
									fail(err) {
										console.log(err)
									}
								})
							}
						})
					}
				} else {
					this.onNavBarLeft();
				}
			},
			_changeUrl(name) {
				var name = this.ftUserInfo.industry_category_zfl;
				if (this.ftUserInfo && this.ftUserInfo.scale && this.ftUserInfo.scale == 3) {
					name = '个体';
				}
				switch (name) {
					case '塑料':
						return './plastic';
					case '纺织':
						return './textile';
					case '食品':
						return './food';
					case '建材':
						return './buildingMaterials';
					case '纸制品':
						return './paperProducts';
					case '商贸':
						return './business';
					case '轻工':
						return './industryFurniture'; //comm
					case '家具':
						return './industryFurniture'; //comm
					case '机械':
						return './machineryTobaccoMetallurgyAndColored'; //comm1
					case '烟草':
						return './machineryTobaccoMetallurgyAndColored'; //comm1
					case '冶金':
						return './machineryTobaccoMetallurgyAndColored'; //comm1
					case '有色':
						return './machineryTobaccoMetallurgyAndColored'; //comm1
					case '个体':
						return './individual';
					default:
						return '';
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.page_final_table_contiainer {
		.final_table_wrap {

			.f_t_btn,
			.print_btn {
				line-height: 70upx;
			}
		}
	}
</style>
