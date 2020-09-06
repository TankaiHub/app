<template>
	<view class="app_law_task_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="详情"></uni-nav-bar>
		<view class="l_task_wrap">
			<view class="l_task_top_title clearfix">
				<app-title class="l_task_t_t_title" text="详情"></app-title>
				<button class="l_task_t_t_btn" @click="onAddCom" type="primary">添加企业</button>
			</view>
			<view class="l_task_inp_wrap">
				<view class="l_task_inp_search">
					<app-search @onSearch="onSearch"></app-search>
				</view> 
				<view class="l_task_inp_select">
					<app-picker-select class="half" placeholder="请选择检查状态" :selectData="lawStateData" :selectValue="stateValue"
					 @onSelectClear="onSelectClear('stateValue')" @onSelectBtn="onSelectBtn($event, 'stateValue')"></app-picker-select>
					<app-picker-select class="half" placeholder="请选择整改状态" :selectData="lawZStateData" :selectValue="zState"
					 @onSelectClear="onSelectClear('zState')" @onSelectBtn="onSelectBtn($event, 'zState')"></app-picker-select>
				</view>
			</view>
			<view class="l_task_t_text_wrap"> 
				<text class="l_task_t_time_bd">检查时间：{{changeTime(admin_law_plan_info.task_time, "yy-mm-dd")}}</text>
				<text>检查类型：{{admin_law_plan_info.type}}</text>
			</view>
			<!-- ///////////////table////////////////// -->
			<view class="l_task_table_wrap app_table_wrap">
				<app-table-new :tableData="tableData" :headerArray="headerArray" :showContent="showContent"  :isShowExpand="isShowExpand" :isClickBar="isClickBar">
					<block slot="content" slot-scope="props" v-if="props.data">
						<view class="table_hide_total_container">
							<view class="a_t_ul table_hide_info_wrap">
						
								<view class="a_t_li reg_addr clearfix">
									<label>检查状态</label>
									<view class="info_bd">{{stateTo[props.data.state]}}</view>
								</view>
								<view class="a_t_li">
									<label>整改状态</label>
									<view class="info_bd">
										{{zStateTo[props.data.z_state]}}
									</view>
								</view>
								<view class="a_t_li">
									<label>限期整改时间</label>
									<view class="info_bd">
										{{changeTime(props.data.deadline, "yy-mm-dd")}}
									</view>
								</view>
								<view class="a_t_li">
									<label>从业人数</label>
									<view class="info_bd">{{props.data.number_of_employees || 0}}人</view>
								</view>
								<view class="a_t_li">
									<label>上年产值</label>
									<view class="info_bd">{{props.data.lastyear_value}}万元</view>
								</view>
							</view>
							<view class="tb_hide_btn_wrap">
								<button type="warn" @click="changeMessage(props.data.task_id)" class="btn_tb">删除</button>
								<button @click="onLookDetail(props.data)" size="small" type="primary" class="btn_tb">查看详情</button>
							</view>
						</view>
						
					</block>
				</app-table-new>
				<!-- <app-table :tableData="tableData" :pageSize="pageSize" :page="page" :isShowExpand="isShowExpand" :isClickBar="isClickBar" v-model="changeState">
					<app-table-column type="expand"></app-table-column>
					<app-table-column label="任务时间" prop="task_time" type="time-yy-mm" width="100">
					</app-table-column>
					<app-table-column label="企业名称" prop="name" width="180">
					</app-table-column>
					<template slot="myslot" slot-scope="props">
						<view class="table_hide_total_container">
							<view class="a_t_ul table_hide_info_wrap">

								<view class="a_t_li reg_addr clearfix">
									<label>检查状态</label>
									<view class="info_bd">{{stateTo[props.data.state]}}</view>
								</view>
								<view class="a_t_li">
									<label>整改状态</label>
									<view class="info_bd">
										{{zStateTo[props.data.z_state]}}
									</view>
								</view>
								<view class="a_t_li">
									<label>限期整改时间</label>
									<view class="info_bd">
										{{changeTime(props.data.deadline, "yy-mm-dd")}}
									</view>
								</view>
								<view class="a_t_li">
									<label>从业人数</label>
									<view class="info_bd">{{props.data.number_of_employees || 0}}人</view>
								</view>
								<view class="a_t_li">
									<label>上年产值</label>
									<view class="info_bd">{{props.data.lastyear_value}}万元</view>
								</view>
							</view>
							<view class="tb_hide_btn_wrap">
								<button type="warn" @click="changeMessage(props.data.task_id)" class="btn_tb">删除</button>
								<button @click="onLookDetail(props.data)" size="small" type="primary" class="btn_tb">查看详情</button>
							</view>
						</view>

					</template>
				</app-table> -->
				
				
				<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
				 @onNext="onNext"></app-pagination>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appTitle from "@/components/app-title/app-title"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appSearch from '@/components/app-input/app-input-search'
	import appTable from '@/components/app-table/app-table'
	import appPagination from '@/components/app-table/app-pagination'
	import appTableColumn from "@/components/app-table/app-table-column"
	
	import appTableNew from "@/components/app-table/app-table-new"
	
	
	import {
		mapState, mapMutations
	} from "vuex"
	import {
		changeTime
	} from "@/common/js/base.js"
	export default {
		data() {
			return {
				changeTime,
				drawerVisible: false,
				headerArray: [
				{
					key:'任务时间', 
					width:100,	 
				},
				{
					key:'企业名称', 
					isInWidth:true,
				}
				],
				showContent:[{
					key:'task_time',
					isInWidth:false,
					width:100,  
				},{
					key:'name',
					isInWidth:true,
				}],
				searchVal: '',
				stateValue: '',
				lawStateData: [{
					label: "未检查",
					value: "1",
						show:true,
				}, {
					label: "检查中",
					value: "2",
						show:true,
				}, {
					label: "已检查",
					value: "3",
						show:true,
				}],
				zState: '',
				lawZStateData: [{
					label: "不需要整改",
					value: "1",
						show:true,
				}, {
					label: "整改中",
					value: "2",
						show:true,
				}, {
					label: "整改完成",
					value: "3",
						show:true,
				}],
				stateTo: {
					1: '未检查',
					2: '检查中',
					3: '已检查'
				},
				zStateTo: {
					1: '不需要整改',
					2: '整改中',
					3: '整改完成'
				},
				typeTo: {
					1: '计划检查',
					2: '随机抽查'
				},
				total:0,
				tableData: [],
				pageSize: 10,
				page: 1,
				isClickBar:true,//点击展开
				changeState: false, //表格状态
				isShowExpand: true, //表格是否展开
				typeSerch:'',
			}
		},
		computed: {
			...mapState(['admin_law_plan_info', 'admin_law_detail_info']),
		},
		components: {
			appTitle,
			appNav,
			appPickerSelect,
			appSearch,
			appTable,
			appTableColumn,
			appPagination,
			appTableNew
		},

		onLoad() {
			this._initData();
		},
		methods: {
			...mapMutations(['set_admin_law_detail_info']),
			onNavBarLeft() {
				// uni.navigateBack();
				uni.navigateTo({
					url:'../lawPlan'
				})
			},
			_initData() {
				var opts = {
					page: this.page,
					page_size: this.pageSize,
					type: this.typeSerch,
					deadline: '',
					key: this.searchVal,
					c_id: this.admin_law_plan_info.c_id,
					state: this.stateValue,
					z_state: this.zState,
				};
				this.$http.post('taskList', opts).then((res)=> {
					if (res.code == 200) {
						this.total = res.Total;
						var data = res.data;
						for (var i = 0; i < data.length; i ++) {
							// task_time
							data[i]['task_time'] = this.changeTime(data[i]['task_time'], 'yy-mm');
						}
						this.tableData = res.data;
					}
				})

			},
			//////search/////////////////
			onSearch(val) {
				this.searchVal = val;
				this.page = 1;
				this._initData();
			},
			//////select/////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this[key] = e.value;
					this.page = 1;
					this._initData();
				}
			},
			onSelectClear(str) {
				this[str] = "";
				this.page = 1;
				this._initData();
			},
			///////////////////table///////////////
			//状态改变提示
			changeMessage(id) {
				var _self = this;
				uni.showModal({
					title: '提示',
					content: `此操作将删除该信息, 是否继续?`,
					success: function(res) {
						if (res.confirm) {
							_self._deleteList(id);
						} else if (res.cancel) {
							this.log('用户点击取消');
						}
					}
				});
			},
			//删除主页数据
			_deleteList(deleteid) {
				var _self = this;
				this.$http.post('editStateLaw', {
					task_id: deleteid,
					state: 0
				}).then(res => {
					if (res.code == 200) {
						_self._initData();
					}
				})
			},
			
			/////////////////分页///////////////////
			onSelectItem(num) {
				this.pageSize = num;
				this.page = 1;
				this.changeState = false;
				this._initData();
			},
			onPrev(page) {
				this.page = page - 1;
				this.changeState = false;
				this._initData();
				this.log(this.page, "----------------");
			},
			onNext(page) {
				this.page = page + 1;
				this.changeState = false;
				this._initData();
				this.log(this.page, "+++++++++++++");
			},
			
			///////添加企业
			onAddCom() {
				
				uni.navigateTo({
					url:"./addCompany"
				})
			},
			onLookDetail(data) {
				this.$store.commit("set_admin_law_detail_info", data);
				uni.navigateTo({
					url:'./seeDetails'
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_law_task_container {
		.l_task_wrap {
			padding: 20upx;

			.l_task_top_title {
				border:1px solid #ccc;
				.l_task_t_t_title {
					float: left;
				}

				.l_task_t_t_btn {
					height:70upx;
					line-height: 70upx;
					float: right;
				}
			}

			.l_task_inp_wrap {
				.l_task_inp_search {
					margin-top: 20upx;
					width: 100%;

				}

				.l_task_inp_select {
					display: flex;
					justify-content: space-between;
					margin: 20upx 0;
				}

			}

			.l_task_t_text_wrap {
				.l_task_t_time_bd {
					margin-right: 40upx;

				}
			}
		}
	}
</style>
