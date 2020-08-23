<template>
	<view class="app_companyFeedbackC_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="企业反馈"></uni-nav-bar>
		<view class="a_c_f_wrap">
			<view class="a_c_f_top_wrap">
				<view class="top_total_wrap clearfix">
					<view class="t_i_wrap ">
						<text>总数：{{infoTotal}}</text>
						<text>未处理：{{infoData.wcl || 0}}</text>
						<text>已处理：{{infoData.ycl || 0}}</text>
					</view>
					<text @click="onCompanyDetail">详情</text>
				</view>
				<view class="a_c_f_search">
					<app-search class="a_c_f_search_cmp" @onSearch="onSearch"></app-search>
					<button class="a_c_f_btn" type="primary">回收站</button>
					<button class="a_c_f_btn" type="warn">删除</button>
				</view>
				<view class="a_c_f_select_wrap"> 
					
					
					<view  class="half border_1px_all_ccc padding_5px border_radius_5 clearfix" >
						<input type="text" placeholder="请选择地址" placeholder-style="color:#ccc" v-model="addressInfo.str" class="w_90_per float_left"  disabled @click="onAddrInput" />
						<text class="w_10_per float_left text_align_center" @click="onInputArrressClear">X</text>
						<app-picker-address ref="addr"  @onAddressBtn="onAddressBtn"></app-picker-address>
					</view>
					
					
					<app-picker-select class="half" placeholder="处理状态" :selectData="adminStateData" @onSelectClear="onSelectClear('admin_state')"
					 @onSelectBtn="onSelectBtn($event, 'produce_state')"></app-picker-select>
				</view>
			</view>
			<view class="a_c_f_table_wrap">
				<app-table :tableData="tableData" :isShowCheck="isShowCheck"> 
					<!-- <app-table-column type="expand">
						<template slot-scope="props">
							<view class="">
								sknviodsbovindoivnoi
							</view>
						</template>
					</app-table-column> 
					 -->
					<app-table-column label="标题" prop="name"></app-table-column>
				</app-table>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appSearch from '@/components/app-input/app-input-search'
	import appPickerAddress from '@/components/app-picker/app-picker-address'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appTable from '@/components/app-table/app-table'
	import appTableColumn from "@/components/app-table/app-table-column"
	export default {
		data() {
			return {
				tableData:[],
				isShowCheck:true,
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
						show:true,
				}, {
					label: '未处理',
					value: '2',
						show:true,
				}, {
					label: '已上报',
					value: '3',
						show:true,
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
				areaValue: ''
			}
		},
		components: {
			appNav,
			appSearch,
			appPickerAddress,
			appPickerSelect,
			appTable,
			appTableColumn
		},
		onShow() {
			this._initData();
		},
		methods: {
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
				this.getFeedbackList(opts);
			},
			getFeedbackList(opts) {
				this.$http.post('feedbackList', opts).then(res => {
					
					this.infoTotal = res.Total;
					this.infoData = res.data;
					
				})
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
				uni.showActionSheet({
					itemList: [{
						a: 1,
						b: 2
					}, {
						c: 3,
						d: 4
					}],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						console.log(res)
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
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
						float: left;
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
	}
</style>
