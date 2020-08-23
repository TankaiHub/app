<template>
	<view class="app_law_plan_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="执法计划"></uni-nav-bar>
		<view class="app_law_plan_wrap">
			<view class="a_l_p_top_sel_wrap">
				<view class="a_l_p_top_sel_tiem_wrap">
					<app-picker-time :isBorder="true" class="half" :isShowYear="isShowYear" @onSelect="onSelectYear"  @onSelectClear="onTimeSelectClear('year')"></app-picker-time>
					<app-picker-time :isBorder="true" class="half" :isShowMonth="isShowMonth" @onSelect="onSelectMonth" @onSelectClear="onTimeSelectClear('month')"></app-picker-time>
				</view>
				<view class="a_l_p_top_sel_tiem_wrap">
					<app-picker-select placeholder="请选择检查类型" class="half" @onSelectBtn="onSelectBtn" @onSelectClear="onSelectClear('lawType')"
					 :selectData="lawTypeArray"></app-picker-select>
					<view class="half a_l_p_btn_bz_del" @click="deleteMore" v-if="deleteMoreData.length">删除</view>
				</view>
				<view class="a_l_p_top_sel_tiem_wrap">
					<view class="half a_l_p_btn_bz_plan" hover-class="primary" @click="onPreparationPlan">编制计划</view>
				</view>

			</view>
			<view class="a_l_p_table_wrap">

				<app-table :tableData="listData" :isClickBar="isClickBar" :pageSize="pageSize" :page="page" v-model="changeState">
					<app-table-column type="expand" width="30"></app-table-column>
					<app-table-column label="检查时间" type="time-yy-mm" prop="task_time" width="100"></app-table-column>
					<app-table-column label="检查类型" prop="type" width="200" center></app-table-column>
					<template slot="myslot" scope="props">
						<view class="table_hide_total_container">
							<view class="table_hide_info_wrap">
								<view class="a_t_li clearfix" @click="onLaw('quantity', props.data)">
									<label>企业数量</label>
									<view class="clearfix info_bd">
										{{props.data.company_count}}
										<i class=" right_icon el-icon-arrow-right"></i>
									</view>
								</view>
								<view class="a_t_li clearfix" @click="onLaw('then', props.data)">
									<label>已检查</label>
									<view class="clearfix info_bd">
										{{props.data.complete_count}}
										<i class="right_icon el-icon-arrow-right"></i>
									</view>
								</view>
								<view class="a_t_li clearfix" @click="onLaw('not', props.data)">
									<label>未检查</label>
									<view class="clearfix info_bd">
										{{ props.data.company_count - props.data.complete_count >= 0 ? props.data.company_count - props.data.complete_count : 0}}
										<i class="right_icon el-icon-arrow-right"></i>
									</view>
								</view>
								<view class="a_t_li clearfix" @click="onLaw('complete', props.data)">
									<label>整改完成</label>
									<view class="clearfix info_bd">
										{{props.data.zgwc_count}}
										<i class="right_icon el-icon-arrow-right"></i>
									</view>
								</view>
								<view class="a_t_li clearfix" @click="onLaw('in', props.data)">
									<label>整改中</label>
									<view class="clearfix info_bd">
										{{props.data.zgz_count}}
										<i class="right_icon el-icon-arrow-right"></i>
									</view>
								</view>
							</view>
						</view>
					</template>
				</app-table>

				<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
				 @onNext="onNext"></app-pagination>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appPickerTime from '@/components/app-picker/app-picker-time'
	import appPagination from '@/components/app-table/app-pagination'
	import appTable from '@/components/app-table/app-table'
	import appTableColumn from "@/components/app-table/app-table-column"

	import {
		mapState,
		mapMutations
	} from "vuex"
	import {
		changeTime
	} from "@/utils/utils.js"
	export default {

		data() {
			var d = new Date(),
				y = d.getFullYear(),
				m = d.getMonth() + 1;
			return {
				changeState: false,
				isClickBar: true,
				tableData: [],
				changeTime,
				page: 1,
				pageSize: 10,
				total: 0,
				isShowMonth: true,
				isShowYear: true,
				year: y,
				month: "",
				drawerVisible: false, //导航显示
				lawType: '',
				lawTypeArray: [{
					label: '计划检查',
					value: '1',
					show: true,
				}, {
					label: '随机抽查',
					value: '2',
					show: true,
				}],
				listData: [],
				stateTo: {
					1: '未读',
					2: '已读'
				},
				typeTo: {
					1: '计划检查',
					2: '随机抽查'
				},
				deleteMoreData: [],
				pageSize: 10,
				currentPage: 1,
				isShowMonth: true,
				isShowYear: true
			}
		},
		computed: {
			...mapState(['admin_law_plan_info', 'admin_law_add_company_select_info']),
		},
		components: {
			appNav,
			appPickerSelect,
			appPickerTime,
			appPagination,
			appTable,
			appTableColumn
		},
		onShow() {
			this._initData();
		},
		methods: {
			...mapMutations(['set_admin_law_plan_info', 'set_admin_law_add_company_select_info']),
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			//导航
			navClose(bool) {
				this.drawerVisible = bool;
			},
			_initData() {
				console.log("?????????????????????????????????" , this.month , this.year )
				if (this.month && this.year == "") {
					uni.showToast({
						title:"请选择年",
						icon:"none"
					})
					return;
				}
				const opts = {
					page: this.page,
					page_size: this.pageSize,
					type: this.typeSerch,
					mouth: this.month || '',
					year: this.year || '',
				}
				this.getTaskList(opts);
			},
			getTaskList(opts) {
				this.$http.post('taskListC', opts).then(res => {
					var data = res.data;
					for (var i = 0; i < data.length; i ++) {
						if (data[i].type == 1) {
							data[i].type = '计划检查'
						}else {
							data[i].type = '随机抽查'
						}
					}
					this.listData = res.data;
					this.total = res.Total;
				})
			},
			//////////////////////select
			onSelectClear(str) {
				this[str] = "";
				this.page = 1;
				this._initData();
			},
			onSelectBtn(obj) {
				this.lawType = obj.value;
				this.page = 1;
				this._initData();
			},
			onSelectYear(obj) {
				this.year = obj.value;
				this.page = 1;
				console.log(obj)
				this._initData();
			},
			onSelectMonth(obj) {
				this.month = obj.value; 
				this.page = 1;
				this._initData();
			},
			onTimeSelectClear(str) {
				this.page = 1;
				this[str] = "";
				this._initData();
			},
			/////////////////表格///////////////////
			onRowClick(row, column, event) {
				this.$refs.mviewtipleTable.toggleRowExpansion(row);
			},
			onExpandChange(row, expandedRows) {
				var that = this
				if (expandedRows.length > 1) {
					that.expands = []
					this.$refs.mviewtipleTable.toggleRowExpansion(expandedRows[0]);
				}
			},
			onTableItem(obj) {
				console.log(obj)
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
				console.log(this.page, "-------------++++++++++++++++++")
			},
			onNext(page) {
				this.page = page + 1;
				this._initData();
				console.log(this.page, "++++++++++++++++++")
			},
			 
			/////////
			onLaw(state, data) {
				this.$store.commit("set_admin_law_plan_info", data);
				this.$store.commit("set_admin_law_add_company_select_info", data);

				uni.navigateTo({
					url: './page/lawTask?state=' + state,
					success() {
						console.log('success')
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			//编制计划
			onPreparationPlan(){ 
				this.$store.commit("set_admin_law_add_company_select_info", {});
				console.log(this.admin_law_add_company_select_info)
				uni.navigateTo({
					url:"./page/addCompany?s=m"
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_law_plan_container * {
		font-size: 14px;
	}

	.app_law_plan_container {
		.app_law_plan_wrap {
			padding: 0 10px 10px;

			.a_l_p_top_sel_wrap {

				.a_l_p_top_sel_tiem_wrap {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 10px;

					.a_l_p_btn_bz_del {

						padding: 5px 6px;
						text-align: center;
						font-size: 14px;
						border: 1px solid #ccc;
						border-radius: 5px;
						color: #fff;
						// background-color: #007AFF;
						background-color: #DD524D;

					}

					.a_l_p_btn_bz_plan {
						padding: 5px 6px;
						text-align: center;
						font-size: 14px;
						border: 1px solid #ccc;
						border-radius: 5px;
						color: #fff;
						background-color: #007AFF;

						&.primary {
							background-color: #66b1ff;
							border-color: #66b1ff;
						}
					}
				}
			}

			.table_hide_info_wrap {
				.a_t_li {
					.info_bd {
						.right_icon {
							float: right;
							line-height: 32px;
						}
					}
				}
			}

			.a_l_p_table_wrap {
				text-align: center;

				.table_hide_info_wrap {
					padding: 0 10px;
				}

				.table_hide_info_wrap .a_t_li {
					padding: 5px 0;
					// height: 32px;
					line-height: 32px;
					font-size: 14px;
					border-bottom: 1px solid #ccc;
				}

				.table_hide_info_wrap .a_t_li label {
					float: left;
					width: 20%;
					text-align: right;
					color: #999;

				}

				.table_hide_info_wrap .a_t_li .info_bd {
					float: right;
					width: 75%;
					text-align: left;
				}

				.right_icon {
					float: right;
					line-height: 32px;
				}
			}

		}
	}
</style>
