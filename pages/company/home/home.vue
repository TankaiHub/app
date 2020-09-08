<template>
	<view class="app_home_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar :left-icon="navIcon" fixed="true" @clickLeft="onNavBarLeft" :title="title"></uni-nav-bar>
		<view class="home_wrapper padding_10px">
			<!-- 选择登录企业 -->
			<view class="h_login_first_mask_wrap border_1px_all_ccc border_radius_5" v-if="isShowCompanyMask">
				<view class="h_l_f_m_top_title text_align_center border_1px">选择登录企业</view>
				<view class="h_l_f_m_list_wrap">
					<view class="h_l_f_m_item text_align_center" :class="{'color_blue_btb':index == currentIndex}" @click="onListItem(item, index)"
					 v-for="(item, index) in childCompany" :key="index">{{item.name}}</view>
				</view>
				<view class="h_l_f_m_btn_wrap">
					<button @click="onSelectMask" type="primary">确定</button>
				</view>
			</view>
			<view class="" v-else>
				<!-- 企业基本信息 -->
				<view class="h_com_base_info_wrap">
					<app-title text='企业基本信息'></app-title>
					<view class="h_c_b_i_content_wrap border_1px_all_ccc">
						<view class="hcbi_item clearfix">
							<view class="hcbi_i_title text_align_right float_left">企业名称：</view>
							<view class="hcbi_i_text float_left" :style="{ width:textWidth + 'px' }">{{companyBaseInfo.name}}</view>
						</view>
						<view class="hcbi_item clearfix">
							<view class="hcbi_i_title text_align_right float_left">社信代码：</view>
							<view class="hcbi_i_text float_left" :style="{ width:textWidth + 'px' }">{{companyBaseInfo.credit_code}}</view>
						</view>
						<view class="hcbi_item clearfix">
							<view class="hcbi_i_title text_align_right float_left">生产经营状态：</view>
							<view class="hcbi_i_text float_left" :style="{ width:textWidth + 'px' }">{{produceTo(companyBaseInfo.produce_state,companyBaseInfo.produce_stop_reason)}}
								<text @click="onEditCompamyInfo" class="color_red_btb mar_left_5px">确认状态>></text>
								<!-- <image @click="onEditCompamyInfo" src="../../../static/edit.png" class="img_size_40px dis_inline_block mar_left_5px" mode="aspectFill"></image> -->
							</view>

						</view>
						<view class="hcbi_item clearfix">
							<view class="hcbi_i_title text_align_right float_left">注册地址：</view>
							<view class="hcbi_i_text float_left" :style="{ width:textWidth + 'px' }">{{companyBaseInfo.reg_address}}
								<text @click="onEditCompamyInfo" class="color_red_btb mar_left_5px">修改地址>></text>
								<!-- <image @click="onEditCompamyInfo"  src="../../../static/edit.png" class="img_size_40px dis_inline_block mar_left_5px" mode="aspectFill"></image> -->
							</view>

						</view>
						<view class="hcbi_item clearfix">
							<view class="hcbi_i_title text_align_right float_left">生产经营地址：</view>
							<view class="hcbi_i_text float_left" :style="{ width:textWidth + 'px' }">{{companyBaseInfo.produce_address}}
								<text @click="onEditCompamyInfo" class="color_red_btb mar_left_5px">修改地址>></text>
								<!-- <image @click="onEditCompamyInfo"  src="../../../static/edit.png" class="img_size_40px dis_inline_block mar_left_5px" mode="aspectFill"></image> -->
							</view>

						</view>
					</view>
				</view>

				<!-- 企业信息审核状态 -->
				<view class="h_com_info_law_state">
					<app-title text='企业信息审核状态'></app-title>
					<view class="h_c_i_l_s_pro_wrap ">
						<view class="hcils_p_text mar_top_10px mar_bottom_10px">
							<view class="hcils_p_text_bd">填写中</view>
							<view class="hcils_p_text_bd">审核中</view>
							<view class="hcils_p_text_bd">审核结果</view>
						</view>
						<progress :percent="proWidth" active stroke-width="3" />
					</view>
				</view>

				<!-- 信息填写 -->
				<view class="h_info_write">
					<app-title text='信息填写'></app-title>

					<view class="">

						<evan-steps :active="curretnStep" primaryColor="green">
							<evan-step v-for="(item, index) in stepArray" :key="index" :title="item.title" @onChange="onChange($event, item, index)"
							 :changeText="item.changeText" :description="item.description"></evan-step>
						</evan-steps>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appTitle from '@/components/app-title/app-title'
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'


	import {
		produceTo
	} from "@/common/js/change.js"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				produceTo,
				drawerVisible: false, //导航显示 
				childCompany: [], //选择登录企业
				title: '首页', //导航标题
				navIcon: 'list', //导航icon
				isShowCompanyMask: false, //是否显示选择登录企业
				currentIndex: -1, //当前选择登陆企业的index
				currentComId: '', //当前选择登陆企业的id
				companyBaseInfo: {}, //企业基本信息
				proWidth: 0, //进度条
				stepData: {},
			}
		},
		components: {
			appTitle,
			EvanSteps,
			EvanStep,
		},
		computed: {
			...mapState(["userInfo", 'home_login_lock', 'userHomeInfoData']),
			textWidth() {
				try {
					const res = uni.getSystemInfoSync();
					return res.screenWidth - 30 - 100;
				} catch (e) {
					return 200;
				}
			},
			stepArray() {
				var info_1_state = this.stepData.info_1_state,
					info_2_state = this.stepData.info_2_state,
					info_3_state = this.stepData.info_3_state;
				var arr = [{
					title: '基本信息',
					changeText: info_1_state == 1 ? '去修改>>' : '去填写>>',
					description: info_1_state == 1 ? '你已经填写基本信息，审核通过前可随时修改' : '你还未填写基本信息',
					state: info_1_state
				}, {
					title: '安全信息',
					changeText: info_2_state == 1 ? '去修改>>' : '去填写>>',
					description: info_2_state == 1 ? '你已经填写基本信息，审核通过前可随时修改' : '你还未填写基本信息',
					state: info_2_state
				}, {
					title: '风险信息',
					changeText: info_3_state == 1 ? '去修改>>' : '去填写>>',
					description: info_3_state == 1 ? '你已经填写基本信息，审核通过前可随时修改' : '你还未填写基本信息',
					state: info_3_state
				}];
				return arr;
			},
			curretnStep() {
				var info_1_state = this.stepData.info_1_state == 1 ? true : false,
					info_2_state = this.stepData.info_2_state == 1 ? true : false,
					info_3_state = this.stepData.info_3_state == 1 ? true : false;
				this.log(info_1_state, info_2_state, info_3_state, this.stepData)
				if (info_1_state) {
					if (info_2_state) {
						if (info_3_state) {
							return 3;
						} else {
							return 2;
						}
					} else {
						return 1;
					}
				} else {
					return -1;
				}
			}
		},
		onLoad() {
			this._initData();
		},
		onShow() {
			this._initData();
		},
		methods: {
			...mapMutations(['set_userInfo', 'set_home_login_lock', 'set_userHomeInfoData']),
			//导航
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			//初始化
			_initData() {
				if (this.home_login_lock) {
					this.$store.commit("set_home_login_lock", false);
					this.childCompany = this.userInfo.oplist || [];

					if (this.childCompany.length > 0) {
						this.title = '选择企业';
						this.navIcon = 'none';
						this.isShowCompanyMask = true;
					} else {
						this._getInfo();
						this._getApprovalStatus();
					}
				} else {
					this._getInfo();
					this._getApprovalStatus();
				}

			},

			_getApprovalStatus() {
				var opts = {
					company_id: this.userInfo.company_id
				};
				this.$http.post('approvalStatus', opts).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this.stepData = data;
						if (data.approval_status == 3) {
							this.proWidth = 0
						} else if (data.approval_status == 2) {
							this.proWidth = 50;
						} else if (data.approval_status == 1) {
							this.proWidth = 100;
						} else if (data.approval_status == 5) {
							this.proWidth = 100;
						}
					}
				})
			},
			//选择登录企业
			onListItem(item, index) {
				this.log(item, index);
				this.currentIndex = index;
				this.currentComId = item.company_id;

			},
			//选择登录企业确定
			onSelectMask() {
				if (this.currentComId == "") {
					uni.showToast({
						title: "请选择登录企业",
						icon: 'none'
					});
					return;
				}
				this.title = '首页';
				this.navIcon = 'list';
				this.isShowCompanyMask = false;
				this.$store.commit("set_userInfo", {
					company_id: this.currentComId,
					flag: true
				});
				this._getInfo();
				this._getApprovalStatus();
			},
			_getInfo() {
				var opts = {
					company_id: this.userInfo.company_id
				};
				this.$http.post('info', opts).then(res => {
					if (res.code == 200) {
						this.companyBaseInfo = res.data;
						this.$store.commit('set_userHomeInfoData', this.companyBaseInfo);
					}
				});
			},
			//企业基本信息修改
			onEditCompamyInfo() {
				uni.navigateTo({
					url: './page/edit'
				})
			},
			//步骤条事件
			onChange(e, item, index) {
				var data = this.stepData;
				switch (index) {
					case 0:
						this._changePage1();
						break;
					case 1:
						this._changePage2();
						break;
					case 2:
						this._changePage3();
						break;
				}
			},
			_changePage1() {
				uni.navigateTo({
					url: "../writeData/base"
				})
			},
			_changePage2() {
				this.log("???????????  _changePage2 ---- 281", this.companyBaseInfo.industry_category_zfl)
				if (this.companyBaseInfo.industry_category_zfl == '' || this.companyBaseInfo.industry_category_zfl == null) {
					uni.showModal({
						title: '提示',
						content: '基本信息未填写完整，请先完善基本信息',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../writeData/base'
								})
							} else if (res.cancel) {
								this.log('用户点击取消');
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '../writeData/safety'
					})

				}
			},
			_changePage3() {
				if (this.companyBaseInfo.industry_category_zfl) {
					if (this.companyBaseInfo.scale == 3) {
						//个体
						uni.navigateTo({
							url: '../writeData/riskMainPage/individual'
						})
					} else {
						//非个体
						var url = this._changeGoToPage(this.companyBaseInfo.industry_category_zfl);
						
						uni.navigateTo({
							url
						})
					}
				} else {
					uni.showModal({
						title: '提示',
						content: '基本信息未填写完整，请先完善基本信息',
						success(res) {
							if (res.confirm) {
								//
							} else if (res.cancel) {
								this.log('用户点击取消');
							}
						}
					});
				}
			},
			_changeGoToPage(name) {
				this.log(name, "??????????????????")
				switch (name) {  
					case '塑料':
						return '../writeData/riskMainPage/plastic';
					case '纺织':
						return '../writeData/riskMainPage/textile';
					case '食品':
						return '../writeData/riskMainPage/food';
					case '建材':
						return '../writeData/riskMainPage/buildingMaterials';
					case '纸制品':
						return '../writeData/riskMainPage/paperProducts';
					case '商贸':
						return '../writeData/riskMainPage/business';
					case '轻工':
						return '../writeData/riskMainPage/industryFurniture'; //comm
					case '家具':
						return '../writeData/riskMainPage/industryFurniture'; //comm
					case '机械':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					case '烟草':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					case '冶金':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					case '有色':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					default:
						return '';
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_home_container {
		.home_wrapper {

			.h_login_first_mask_wrap {
				.h_l_f_m_top_title {
					line-height: 70upx;
				}

				.h_l_f_m_list_wrap {
					.h_l_f_m_item {
						padding: 20upx 0;

					}
				}

				.h_l_f_m_btn_wrap {
					margin: 20upx auto;
					width: 50%;
				}
			}

			.h_com_base_info_wrap {
				.h_c_b_i_content_wrap {
					.hcbi_item {
						line-height: 64upx;

						.hcbi_i_title {
							width: 100px;
							font-weight: bold;
						}
					}
				}
			}

			.h_com_info_law_state {
				.h_c_i_l_s_pro_wrap {
					margin: 20upx auto;
					width: 90%;

					.hcils_p_text {
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}
	}
</style>
