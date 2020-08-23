<template>
	<view class="page_com_total_container">
		<app-nav :drawerVisible="drawerVisible" @close="navClose"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="企业总数"></uni-nav-bar>

		<view class="p_c_t_wrap">
			<view class="p_c_t_top_total" @click="onTotal">企业总数:{{total}}</view>
			<app-picker-select class="half" placeholder="请选择排序方式" :selectData="sortArray" @onSelectBtn="onSelectBtn"></app-picker-select>
			<view class="p_c_t_table_wrap">
				<!-- table -->
				<view class="p_c_t_table_bd">
					<!-- header -->
					<view class="p_c_t_table_head_wrap">
						<view class="p_c_t_table_head_bd">
							<view class="p_c_t_table_td">序号</view>
							<view class="p_c_t_table_td">
								<text class="p_c_t_table_td_bd clearfix">
									区域
								</text>

							</view>
							<view class="p_c_t_table_td">
								<text class="p_c_t_table_td_bd clearfix">
									企业总数
								</text>
							</view>
							<view class="p_c_t_table_td">
								<text class="p_c_t_table_td_bd clearfix">
									未提交
								</text>
							</view>
							<view class="p_c_t_table_td">
								<text class="p_c_t_table_td_bd clearfix">
									待审核
								</text>

							</view>
							<view class="p_c_t_table_td">
								<text class="p_c_t_table_td_bd clearfix">
									已通过
								</text>
							</view>
						</view>
					</view>
					<view class="p_c_t_table_body_wrap">
						<view class="p_c_t_table_tr" v-for="(item, index) in tableData" :key="index" :class="{ even:index%2!=0 }">
							<view class="p_c_t_table_td td_index">
								{{index + 1}}
							</view>
							<!-- 区域 -->
							<view class="p_c_t_table_td td_area" @click="onTableTd(item, '')">
								{{item.address}}
							</view>
							<!-- 企业总数 -->
							<view class="p_c_t_table_td td_total" @click="onTableTd(item, '')">
								{{item.count}}家
							</view>
							<!-- 未提交 -->
							<view class="p_c_t_table_td td_not_submit" @click="onTableTd(item, '3')">
								{{item.wtg}}家
							</view>
							<!-- 待审核 -->
							<view class="p_c_t_table_td td_wait_law" @click="onTableTd(item, '2')">
								{{item.dsh}}家
							</view>
							<!-- 已通过 -->
							<view class="p_c_t_table_td td_wait_pass" @click="onTableTd(item, '1')">
								{{item.ytg}}家
							</view>
						</view>
					</view>
				</view>
				<view class="p_c_t_table_tr_no_data" v-if="tableData.length == 0">
					<view class=" td_on_data">暂无数据</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appTableSortHeader from "@/components/app-table/app-table-sort-header"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import { getAddress } from '@/common/js/base.js'
	import { mapState, mapMutations } from "vuex"
	export default {
		data() {
			return {
				drawerVisible: false, //导航显示
				cityNumber: '', //城镇编号
				cityType: '', //城镇类型
				scaleValue: '',
				tableData: [],
				total: 0,
				sort: '',
				sortArray: [{
					label: '区域',
					value: 'count',
					show: true,
				}, {
					label: '企业总数',
					value: 'count',
					show: true,
				}, {
					label: '未提交',
					value: 'wtg',
					show: true,
				}, {
					label: '待审核',
					value: 'dsh',
					show: true,
				}, {
					label: '已通过',
					value: 'ytg',
					show: true,
				}],
				isUp: false
			}
		},
		components: {
			appNav,
			appTableSortHeader,
			appPickerSelect,
		},
		computed:{
			...mapState(['admin_index_addrInfo']),
		},
		onLoad(opts) {
			var opts = opts;
			this.cityNumber = opts.cityNumber;
			this.cityType = opts.cityType;
			this.scaleValue = opts.scaleValue;
			this.total = opts.total;
			this._initData();
		},
		methods: {
			...mapMutations(['set_admin_index_addrInfo']),
			onNavBarLeft() {
				uni.navigateBack()
			},
			_initData() {
				var opts = {
					number: this.cityNumber,
					scale: this.scaleValue,
					type: this.cityType,
				};
				this.getTotalData(opts);
			},
			getTotalData(opts) {
				this.$http.post("companyCount", opts).then(res => {
					if (res.code == 200) {
						var data = res.data.region;
						this.tableData = data;
					}
				});
			},
			_slotData(str, isUp) {
				//降序排列，return a-b; —>升序排列

				var arr = this.tableData.sort(function(a, b) {
					if (isUp) {
						return b[str] - a[str]
					} else {
						return a[str] - b[str]
					}

				})
				// this.tableData = arr;
				console.log(arr[0])
			},
			/////////////////////select////////////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					if (e.value == this[key]) {
						this.isUp = false;
					} else {
						this.isUp = true;
					}
					this[key] = e.value;
					this._slotData(this[key], this.isUp);
				}
			},
			onSelectClear(str) {
				console.log(str, "??????????????????????????????/");
				this[str] = "";
				this.isUp = false;
				this._slotData();
			},
			/////////////////////////////////////
			onTotal() {
				var str = "";
				uni.navigateTo({
					url: `../../businessManagement/businessManagement`
				});
			},
			onTableTd(item, approval_status) { 
				var cur = getAddress(item.number),
					finalAddress = cur.address,
					finalLevel = cur.level,
					finalNumber = cur.number,
				    str = "",
					parentArr = cur.parentArr,
					valueArr = [],
					addressInfo = {};
				
				if (parentArr.length > 0) {
					for (var i = 0; i < parentArr.length; i ++) {
						if (i == 0) {
							str = parentArr[i].address;
						}else {
							str += '-' + parentArr[i].address;
						}
						valueArr.push(parentArr[i].number);
					}
					valueArr.push(finalNumber);
					str += '-' + finalAddress;
				}else {
					str = finalAddress;
					valueArr.push(finalNumber);
				} 
				addressInfo = { 
					valueArr,
					str,
					finalLevel,
					finalNumber,
					finalAddress
				};
				this.$store.commit("set_admin_index_addrInfo", addressInfo);
				uni.navigateTo({
					url: `../../businessManagement/businessManagement?status=${approval_status}`
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.page_com_total_container {
		height: 100%;

		.p_c_t_wrap * {
			font-size: 14px;
		}

		.p_c_t_wrap {
			padding: 10px;
			// height:100%;
			background-color: #8c98e8;
			color: #fff;

			.p_c_t_top_total {
				padding: 10px 5px;
				font-size: 18px;
			}

			.p_c_t_table_wrap {
				.p_c_t_table_bd {
					display: table;
					width: 100%;

					.p_c_t_table_head_wrap {
						display: table-header-group;

						.p_c_t_table_head_bd {
							display: table-row;

						}
					}

					.p_c_t_table_body_wrap {
						display: table-row-group;

						.p_c_t_table_tr {
							display: table-row;

							color: #fff;

							&.even {
								background-color: rgb(114, 123, 200);
								font-weight: 500;
							}
						}
					}

					.p_c_t_table_td {
						padding: 10px 0;
						display: table-cell;
						border-bottom: 1px solid #ccc;

						&.td_index {
							text-align: center;
						}

						.p_c_t_table_td_bd {
							position: relative;

							.s_icon {
								position: absolute;
								right: -10px;
								width: 0;
								height: 0;
								border-width: 5px;
								border-style: solid;

								&.s_up_icon {
									bottom: -2px;
									border-color: red transparent transparent transparent;
								}

								&.s_down_icon {
									top: -2px;
									border-color: transparent transparent red transparent;

								}
							}
						}


					}
				}

				.p_c_t_table_tr_no_data {
					width: 100%;

					.td_on_data {
						line-height: 60px;
						text-align: center;
					}
				}
			}
		}
	}
</style>
