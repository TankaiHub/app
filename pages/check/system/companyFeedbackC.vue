<template>
	<view class="app_companyFeedbackC_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="企业反馈"></uni-nav-bar>
		<view class="a_c_f_wrap">
			<view class="a_c_f_top_wrap">
				<view class="top_total_wrap dis_flex_center clearfix">
					<view class="t_i_wrap dis_flex_center">
						<text>总数：{{infoTotal || 0}}</text>
						<text @click="onTabTopCount('wcl')">未处理：{{infoData.wcl || 0}}</text>
						<text @click="onTabTopCount('ycl')">已处理：{{infoData.ycl || 0}}</text>
						<text @click="onTabTopCount('ysb')" v-if="infoData.ysb!='区县账号不显示已上报'">已上报：{{infoData.ysb || 0}}</text>
					</view>
					<view class="t_i_detail text_align_right mar_left_20px" @click="onCompanyDetail">详情</view>
				</view>
				<view class="a_c_f_search">
					<app-search class="a_c_f_search_cmp" @onSearch="onSearch"></app-search>
					<button class="a_c_f_btn" type="primary" @click="onBin">回收站</button>
					<button class="a_c_f_btn" type="warn" @click="onDels">删除</button>
				</view>
				<view class="a_c_f_select_wrap">


					<view class="half border_1px_all_ccc padding_5px border_radius_5 clearfix">
						<input type="text" placeholder="请选择地址" placeholder-style="color:#ccc" v-model="addressInfo.str" class="w_90_per float_left"
						 disabled @click="onAddrInput" />
						<text class="w_10_per float_left text_align_center" @click="onInputArrressClear">X</text>
						<app-picker-address ref="addr" v-model="currentAddr" @onAddressBtn="onAddressBtn"></app-picker-address>
					</view>


					<app-picker-select class="half" placeholder="处理状态" :selectValue="admin_state" :selectData="adminStateData" @onSelectClear="onSelectClear('admin_state')"
					 @onSelectBtn="onSelectBtn($event, 'admin_state')"></app-picker-select>
				</view>
			</view>
			<view class="app_table_wrap">
				<app-table-new ref="table" :tableData="tableData" :isShowExpand="isShowExpand" :isShowCheckbox="isShowCheck" @onContent="onContent" :headerArray='headerArray'
				 :showContent="showContent" :isShowIndex="true">
					<block class="" slot="content" slot-scope="props">
						<view class="table_hide_total_container" v-if="props.data">
							<view class="a_t_ul table_hide_info_wrap">
								<view class="a_t_li clearfix">
									<label>时间</label>
									<view class="info_bd">{{changeTime(props.data.addtime, 'yy-mm-dd hh-mm-ss')}}</view>
								</view>
								<view class="a_t_li clearfix">
									<label>状态</label>
									<view class="info_bd">{{stateTo[props.data.state]}}</view>
								</view>
								<view class="a_t_li clearfix">
									<label>处理状态</label>
									<view class="info_bd">{{adminStateTo[props.data.admin_state]}}</view>
								</view>
							</view>
							<view class="tb_hide_btn_wrap">
								<button type="warn" @click="onDel(props.data.id)" class="btn_tb">删除</button>
							</view>
						</view>
					</block> 
				</app-table-new>
			</view>
			<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
			 @onNext="onNext"></app-pagination>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appSearch from '@/components/app-input/app-input-search'
	import appPickerAddress from '@/components/app-picker/app-picker-address'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	// import appTable from '@/components/app-table/app-table'
	// import appTableColumn from "@/components/app-table/app-table-column"
	import appPagination from '@/components/app-table/app-pagination'
	import appTableNew from "@/components/app-table/app-table-new"
	import {
		changeTime
	} from '@/common/js/base.js'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				changeTime,
				tableData: [],
				isShowExpand: true, //表格是否展开
				headerArray: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '标题',
						isInWidth: true,
						width: 0
					}
				],
				showContent: [{
					key: 'title',
					isInWidth: true,
					width: 0,
					isClickContent:true
				}],
				

				isShowCheck: true,
				drawerVisible: false, //导航显示
				infoData: {},
				infoTotal: 0,
				searchVal: '', //搜索
				admin_state: '', //处理状态
				addressInfo: {}, //城市信息
				cityType: '', //城市类型
				cityNumber: '', ///城市num
				adminStateData: [{
					label: '已处理',
					value: '1',
					show: true,
				}, {
					label: '未处理',
					value: '2',
					show: true,
				}, {
					label: '已上报',
					value: '3',
					show: true,
				}],
				page: 1,
				pageSize: 10,
				total: 0,


				infoData: [],
				tjData: [],
				stateTo: {
					1: '未读',
					2: '已读,未回复',
					3: '已读,已回复',
					4: '已读,已回复'
				},
				adminStateTo: {
					1: '已处理',
					2: '未处理',
					3: '上报镇街',
					4: '上报区县'
				},
				showTopTable: false,
				infoTotal: 0,
				sonCurrentPage: 1,
				sonPageSize: 10,
				sonDataTotal: 0,
				deleteMoreData: [],
				areaValue: '',
				//地址选择 默认值
				currentAddr: [],
			}
		},
		components: {
			appNav,
			appSearch,
			appPickerAddress,
			appPickerSelect,
			// appTable,
			// appTableColumn,
			appTableNew,
			appPagination
		},
		computed: {
			...mapState(['admin_feedbackDetail']),
		},
		onShow() {
			console.log(this.admin_feedbackDetail)
			if (this.admin_feedbackDetail.in) {
				this.currentAddr = this.admin_feedbackDetail.arr.addrNum;
				this.cityType = this.admin_feedbackDetail.arr.curLevel;
				this.cityNumber = this.admin_feedbackDetail.curNum;
				this.admin_state = this.admin_feedbackDetail.state;
				this.addressInfo.str = this.admin_feedbackDetail.arr.str;
				this.$store.commit('set_admin_feedbackDetail', {});
				
			}
			this._initData();
		},
		methods: {
			...mapMutations(['set_admin_feedbackDetail']),
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			//导航
			navClose(bool) {
				this.drawerVisible = bool;
			},
			_initData() {
				var opts = {
					page: this.page,
					pageSize: this.pageSize,
					type: this.cityType || 1,
					admin_state: this.admin_state,
					key: this.searchVal,
					number: this.cityNumber || '',
				};
				this.tableData = [];
				this.getFeedbackList(opts);
			},
			getFeedbackList(opts) {
				this.$http.post('feedbackList', opts).then(res => { 
					this.infoTotal = res.Total;
					this.infoData = res.data;
					this.tableData = this.infoData.list;

				})
			},
			onTabTopCount(str) {
				switch(str) {
					case 'all':break;
					case 'wcl':
						this.admin_state = 2;
					break;
					case 'ycl':
						this.admin_state = 1;
					break;
					case 'ysb':
						this.admin_state = 3;
					break;
				}
				this._initData();
			},
			//搜索
			onSearch(val) {
				this.page = 1;
				this.searchVal = val;
				this._initData();
			},
			/////////////////////address////////////////////
			onAddressBtn(e) {
				if (e.flag) {
					this.page = 1;
					this.addressInfo = e;
					this.cityType = this.addressInfo.finalLevel;
					this.cityNumber = this.addressInfo.finalNumber;
					this._initData();
				}
			},
			onInputArrressClear() {
				this.addressInfo.str = "";
				this.cityNumber = "";
				this.cityType = "";
				this.page = 1;
				this._initData();
			},
			onAddrInput() {
				this.$refs.addr.show();
			},
			/////////////////////select////////////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this[key] = e.value;
					this.page = 1;
					this._initData();
				}
			},
			onSelectClear(str) {
				this.page = 1;
				this[str] = "";
				this._initData();
			},

			///////////////分页/////////////////
			//主页选择展示数量
			handleSizeChange(val) {
				this.pageSize = val
				this._initData()
			},
			//主页跳转页面
			handleCurrentChange(val) {
				this.currentPage = val
				this._initData()
			},
			///////////////详情//////////////
			onCompanyDetail() {
				uni.navigateTo({
					url:'./systemPage/feedbackDetail'
				})
			},
			onDels() {
				var tableData = this.$refs.table.getCheckItem();
				if (tableData.length == 0) {
					uni.showToast({
						title:'请选择要删除的分类!',
						icon:'none'
					})
					return
				}
				var str = '';
				for (var i = 0; i < tableData.length; i ++) {
					var temp = tableData[i];
					if (i == 0) {
						str = temp.id;
					}else {
						str += ','+temp.id;
					}
				}
				this.onDel(str, true);
				
			},
			//回收站
			onBin() {
				uni.navigateTo({
					url:'./systemPage/companyFeedbackRecovery'
				})
			},
			//删除
			onDel(id, bool=false) { 
				var heeh = '该'
				if (bool) {
					heeh = '这些'
				}
				let _self = this;
				uni.showModal({
					title: '提示',
					content: '此操作将删除' + heeh + '信息, 是否继续?',
					success: function(res) {
						if (res.confirm) {
							_self.$http.post('editStateFeedback', {
								id,
								state: 0
							}).then(res => {
								if (res.code == 200) {
									uni.showToast({
										title: '删除成功',
										icon: 'none',
										success() {
											setTimeout(()=> {
												_self._initData();
											}, 1500);
										}
									});
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				}) 
			},
			onContent(opts) {
				console.log(opts);
				uni.navigateTo({
					url:'./companyFeedbackDetailC?id=' + opts.id
				})
			},
			/////////////////分页///////////////////
			onSelectItem(num) {
				this.pageSize = num;
				this.page = 1; 
				this._initData();
			},
			onPrev(page) {
				this.page = page - 1; 
				this._initData();
				this.log(this.page, "----------------");
			},
			onNext(page) {
				this.page = page + 1; 
				this._initData();
				this.log(this.page, "+++++++++++++");
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_companyFeedbackC_container * {
		font-size: 14px;
	}

	.app_companyFeedbackC_container {
		.a_c_f_wrap {
			padding: 10px;

			.a_c_f_top_wrap {
				.top_total_wrap {
					.t_i_wrap { 
						flex: 2;
					}
					.t_i_detail{ 
					}
				}
			}

			.a_c_f_search {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10px;

				.a_c_f_search_cmp {
					width: 60%;
				}

				.a_c_f_btn {
					margin: 0;
					padding: 0 10px;
					height: 35px;
					line-height: 35px;
				}
			}

			.a_c_f_select_wrap {
				display: flex;
				justify-content: space-between;
				margin-top: 10px;
			}
		}

		.app_table_wrap {
			.table_hide_total_container {

				// border-bottom: 1px solid #ccc; 
				.table_hide_info_wrap {
					padding: 0 10px;
				}

				.table_hide_info_wrap .a_t_li {
					height: 32px;
					line-height: 32px;
					font-size: 14px;
				}

				.table_hide_info_wrap .a_t_li.reg_addr {
					height: 100%;
				}

				.table_hide_info_wrap .a_t_li.reg_addr .info_bd,
				.table_hide_info_wrap .a_t_li.reg_addr label {
					float: left;
				}

				.table_hide_info_wrap .a_t_li.reg_addr label {
					height: 100%;
				}

				.table_hide_info_wrap .a_t_li.reg_addr .info_bd {
					width: 60%;
				}

				.table_hide_info_wrap .a_t_li label {
					display: inline-block;
					margin-right: 10px;
					width: 90px;
					text-align: right;
					color: #999;

				}

				.table_hide_info_wrap .a_t_li .info_bd {
					display: inline-block;
				}

				.tb_hide_btn_wrap {
					padding: 10px 0;
					display: flex;
					justify-content: space-between;
				}

				.tb_hide_btn_wrap .btn_tb {
					width: 94px;
					height: 32px;
				}
			}
		}

	}
</style>
