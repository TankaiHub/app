<template>
	<!-- 详情 -->
	<view class="app_see_detail_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="详情"></uni-nav-bar>
		<view class="s_det_wrap">
			<view class="s_det_top_title clearfix">
				<app-title class="s_det_t_t_title" text="详情"></app-title>
				<view class="s_det_t_t_btn" v-if="!isAddLawPlan" @click="onEditComInfo">编辑</view>
			</view>

			<view class="s_det_bd_wrap" :style="{ marginBottom:marginBtHeight + 'px' }">

				<!-- /// 检查方案-->
				<view class="s_det_not_add_plan_wrap s_det_common_wrap" v-if="isAddLawPlan">
					<view class="s_det_n_a_p_title s_det_common_title">
						检查方案
					</view>
					<view class="s_det_n_a_p_conten s_det_common_content">
						<text>现在还没有检查方案，请先添加！</text>
						<button class="s_det_n_a_p_button" @click="onAddPlan" type="primary">添加方案</button>
					</view>
				</view>

				<view class="s_det_temp_wrap" v-else>
					<!-- 企业信息 -->
					<view class="s_det_com_info_wrap s_det_common_wrap">
						<uni-list>
							<uni-list-item title="检查时间：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.inspection_time}}
								</view>
							</uni-list-item>
							<uni-list-item title="单位地址：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.reg_address}}
								</view>
							</uni-list-item>
							<uni-list-item title="检查场所：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.inspection_site}}
								</view>
							</uni-list-item>
							<uni-list-item title="联系电话：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.phone}}
								</view>
							</uni-list-item>
							<uni-list-item title="被检查单位：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.company_name }}
								</view>
							</uni-list-item>
							<uni-list-item title="邮政编码：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.postal_code}}
								</view>
							</uni-list-item>
							<uni-list-item title="法定代表人：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.cegal_person}}
								</view>
							</uni-list-item>
							<uni-list-item title="联系人：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.c_name}}
								</view>
							</uni-list-item>
							<uni-list-item title="所属行业：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.industry}}
								</view>
							</uni-list-item>
							<uni-list-item title="职务：" :showArrow="false">
								<view class="s_det_right" slot="right" :style="{ width:rightWidth }">
									{{comInfo.position}}
								</view>
							</uni-list-item>

						</uni-list>
					</view>

					<!--  检查方案  -->
					<view class="s_det_law_plan_wrap s_det_common_wrap" v-if="comInfo.task_state!=3">
						<view class="s_det_l_r_title s_det_common_title">
							检查方案：
						</view>
						<view class="mar_left_30px">
							<button @click="onStartCheck" class="btn_width_150px s_det_btn" type="primary">开始检查</button>
						</view>
					</view>

					<!--  检查记录  -->
					<view class="s_det_law_recording_wrap s_det_common_wrap" v-if="lawContentList.length > 0">
						<view class="s_det_l_r_title s_det_common_title">
							检查记录：
							<view class="mar_left_30px s_det_btn_wrap">
								<button  v-if="comInfo.z_state == 2" class="btn_width_150px s_det_btn" @click="onGoToRview" type="primary">开始复查</button>
								<button  v-if="comInfo.z_state == 3" class="btn_width_150px s_det_btn" type="primary" @click="onGoToReviewAnnal">复查记录</button>
								<button  class="btn_width_150px s_det_btn" type="primary" @click="onAddLawContent">添加</button>
							</view>
						</view>
						<app-table :headerData="headerData" :bodyData="lawContentList" :tablePorps="tableProps" :isShowOper="isShowOper">
							<template slot="handle" slot-scope="props">
								<text v-if="props.data.conform ==1">/</text>
								<text v-else-if="props.data.conform ==2">{{ typeTo[props.data.type]}}</text>
							</template>
						</app-table>
					</view>

				</view>

				<!-- 执法文书 -->
				<view class="s_det_law_book_wrap s_det_common_wrap">
					<view class="s_det_l_b_title s_det_common_title">
						执法文书：<text v-if="lawBookList && lawBookList.length == 0" class="color_blue_btb">无</text>
					</view>
					<view class="s_det_l_b_content s_det_common_content">
						<view class="s_det_l_b_item border_1px" v-for="(item, index) in lawBookList" :key="index">
							<view class="s_det_l_b_info clearfix">
								<view class="s_det_l_b_i_text float_left">{{bookTypeTo[item.type]}}({{item.number}})号</view>
								<view class="s_det_l_b_i_oper float_right">
									<text class="color_blue_btb" @click="onEditLawBook(item, index)">编辑</text>
									<text class="color_blue_btb mar_left_10px">打印</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appTitle from "@/components/app-title/app-title"
	import appTable from "@/components/app-table/app-table-not-expand"

	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {

				drawerVisible: false,
				isAddLawPlan: true, //是否添加执法计划
				comInfo: {}, //企业信息
				lawBookList: [], //执法文书
				lawContentList: [], //检查记录
				bookTypeTo: {
					1: '现场检查方案',
					2: '现场检查记录',
					3: '责令限期整改指令书',
					4: '违法线索移送书',
					5: '行政（当场）处罚决定书（单位）',
					6: '行政（当场）处罚决定书（个人）',
					7: '整改复查意见书'
				},
				rightWidth: '0px',
				headerData: [{
					text: "检查内容",
					width: 100,
					center: false,
				}, {
					text: "处理方式",
					width: 100,
					center: true
				}],
				tableProps:[{
					isContent:true,
					style:{},
					props:"content"
				}],
				isShowOper: false,
				typeTo: {
					1: '立即整改',
					2: '责令限期整改',
					3: '移送',
					4: '当场处罚'
				},
				marginBtHeight: 0,
				curentBookNumber:'',//当前修改的文书编号
				currentBookId:'',//当前要修改的文书id
				
			}
		},
		computed: {
			...mapState(['admin_law_detail_info', 'admin_law_company_detail_info']),
		},
		components: {
			appTitle,
			appNav,
			appTable
		},
		onShow() {
			console.log(111)

			var _self = this;
			uni.getSystemInfo({
				success(res) {
					_self.rightWidth = (res.windowWidth - 105 - 15 - 20) + 'px';

				},
				fail() {
					_self.rightWidth = "190px";
				},
				complete() {
					_self._initData();
				}
			});

		},
		onLoad() {

		},
		methods: {
			...mapMutations(['set_admin_law_detail_info', 'set_admin_law_company_detail_info']),
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				var opts = {
					task_id: this.admin_law_detail_info.task_id
				};
				this.$http.post('taskInfo', opts).then(res => {
					if (res.code == 200) {
						var msg = res.msg;
						var data = res.data;
						if (msg == "未添加") {
							this.isAddLawPlan = true;
						} else {
							this.isAddLawPlan = false;
						}

						this.comInfo = data.info;
						this.$store.commit("set_admin_law_company_detail_info", this.comInfo);
						this.lawBookList = data.ws_list || [];
						this.lawContentList = data.content_list || [];
					}
				})
			},
			onEditLawBook(item, index) {
				this.currentBookId = item.ws_id;
				var _self = this;
				plus.nativeUI.prompt("编辑", (e)=> {
					if (e.index == 0) {
						//确定
						var val = e.value;
						if (val == '') {
							uni.showToast({
								title:"请输入文书编号",
								icon:"none"
							})
							return;
						}
						var num = (+val).toString();
						if (num == "NaN") {
							uni.showToast({
								title:"请输入数字",
								icon:"none"
							})
							return;
						} 
						_self.curentBookNumber = val;
						_self.onSubmitBookNumber();
					} else if (e.index == 1) {
						//取消
					}
				}, "", "请输入文书编号", ["确定", "取消"]);
			},
			onSubmitBookNumber() {
				var opts = {
					ws_id: this.currentBookId,
					number: this.curentBookNumber
				}; 
				this.$http.post('wsNumEdit', opts).then(res => {

					if (res.code == 200) { 
						this.currentBookId = '';
						this.bookNumber = '';
						this._initData();
					} 
				})
			},
			///////////////开始检查
			onStartCheck() {
				uni.navigateTo({
					url:"./lawScheme?info_id=" + this.comInfo.info_id + "&task_id="+ this.admin_law_detail_info.task_id
				})
			},
			//////////编辑企业info
			onEditComInfo() { 
				uni.navigateTo({
					url:"./editComInof"
				})
			},
			////////////添加方案
			onAddPlan() { 
				uni.navigateTo({
					url:"./addLawPlan?s=1&num=1"
				})
			},
			
			///////////////添加
			onAddLawContent() {
				uni.navigateTo({
					url:"./addLawContent?task_id=" + this.admin_law_detail_info.task_id
				})
			},
			/////////////复查
			onGoToRview() {
				uni.navigateTo({
					url:'./review?task_id=' + + this.admin_law_detail_info.task_id
				})
			},
			//复查记录
			onGoToReviewAnnal() {
				uni.navigateTo({
					url:'./reviewRecord?task_id=' + + this.admin_law_detail_info.task_id
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_see_detail_container {
		.s_det_wrap {
			padding: 20upx;

			.s_det_top_title {
				.s_det_t_t_title {
					float: left;
				}

				.s_det_t_t_btn {
					float: right;
					line-height: 35px;
					color: #409EFF;
				}
			}

			.s_det_bd_wrap {
				.s_det_common_wrap {
					margin-bottom: 30upx;
					.s_det_btn{
						margin:20upx 0;
					}
				}

				// 检查方案
				.s_det_not_add_plan_wrap {
					.s_det_n_a_p_conten {
						.s_det_n_a_p_button {
							margin: 20upx 0;
							width: 300upx;
							height: 70upx;
							line-height: 70upx;
						}
					}
				}

				// 企业信息
				.s_det_com_info_wrap {
					.s_det_right {
						text-align: right;
					}
				}

				// 检查记录
				.s_det_law_recording_wrap {
					
					.s_det_l_r_title {
						margin-bottom: 20upx;
						.s_det_btn_wrap{
							display: flex;
							justify-content: space-between; 
							button{
								margin-right: 10upx;
							}
						}
					}
					
				}

				// 执法文书
				.s_det_law_book_wrap {
					.s_det_l_b_content {
						.s_det_l_b_item {
							padding-bottom: 10upx;
							line-height: 70upx;
						}
					}
				}

				.s_det_common_title {
					font-size: 32upx;
					font-weight: bold;
				}

				.s_det_n_a_p_conten.s_det_common_content {
					margin: 20upx 0 20upx 60upx;
				}

				.s_det_common_content {
					margin: 20upx 0;
				}
			} 
		}
	}
</style>
