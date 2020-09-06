<template>
	<view class="app_select_industry_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="添加企业"></uni-nav-bar>
		<view class="app_common_wrap">
			<view class="sel_ind_top_select">
				<view class="item_wrap clearfix">
					<app-picker-select class="w_max odd" placeholder="请选择行业" :selectValue="industry_category" :selectData="industryCategorySelectData"
					 @onSelectClear="onSelectClear('industry_category')" @onSelectBtn="onSelectBtn($event, 'industry_category')"></app-picker-select>
					<app-picker-select class="w_max even" placeholder="请选择经营状态" :selectValue="produce_state" :selectData="produceStateData"
					 @onSelectClear="onSelectClear('produce_state')" @onSelectBtn="onSelectBtn($event, 'produce_state')"></app-picker-select>
				</view> 
				<view class="item_wrap clearfix">
					<app-picker-select class="w_max odd" placeholder="请选择风险类别" :selectValue="risk_type" :selectData="riskTypeData"
					 @onSelectClear="onSelectClear('risk_type')" @onSelectBtn="onSelectBtn($event, 'risk_type')"></app-picker-select>
					<app-picker-select class="w_max even" placeholder="请选择风险类别" :selectValue="kjlb" v-if="risk_type.indexOf('yxkj')!==-1"
					 :selectData="kjlbData" @onSelectClear="onSelectClear('kjlb')" @onSelectBtn="onSelectBtn($event, 'kjlb')"></app-picker-select>
					<app-picker-select class="w_max even" placeholder="请选择风险类别" :selectValue="jslb" v-if="risk_type.indexOf('gwrr')!==-1"
					 :selectData="jslbData" @onSelectClear="onSelectClear('jslb')" @onSelectBtn="onSelectBtn($event, 'jslb')"></app-picker-select>
					<app-picker-select class="w_max even" placeholder="请选择风险类别" :selectValue="lb" v-if="risk_type.indexOf('orther')!==-1"
					 :selectData="lbData" @onSelectClear="onSelectClear('lb')" @onSelectBtn="onSelectBtn($event, 'lb')"></app-picker-select>
				</view>
				<view class="item_wrap mar_top_5px clearfix">
					<app-search @onSearch="onSearch"></app-search>
				</view>
			</view>
			<view class="sel_ind_table_wrap app_table_wrap">

				<app-table-new :tableData="tableData" :headerArray="headerArray" :showContent="showContent" ref="table" :isShowIndex="true" :isShowExpand="isShowExpand" :isShowCheckbox="isShowCheck">
					<block slot="content" slot-scope="props">
						<view class="table_hide_total_container" v-if="props.data">
							<view class="a_t_ul table_hide_info_wrap"> 
								<view class="a_t_li reg_addr clearfix">
									<label>社信代码</label>
									<view class="info_bd">{{props.data.credit_code}}</view>
								</view>
								<view class="a_t_li">
									<label>生产经营状态</label>
									<view class="info_bd">
										{{ (props.data.produce_state == "" || props.data.produce_state == null) ? "" : produce_stateTo[props.data.produce_state]}}
									</view>
								</view>
							</view>
						</view>
					
					</block>
				</app-table-new>
				<!-- <app-table :tableData="tableData" ref="table" :pageSize="pageSize" :page="page" :isShowExpand="isShowExpand" v-model="changeState"
				 :isShowCheck="isShowCheck">
					<app-table-column type="expand"></app-table-column>
					<app-table-column type="check"></app-table-column>
					<app-table-column type="index" label="序号" width="40">
					</app-table-column>
					<app-table-column label="企业名称" prop="name">
					</app-table-column>
					<template slot="myslot" slot-scope="props">
						<view class="table_hide_total_container">
							<view class="a_t_ul table_hide_info_wrap">

								<view class="a_t_li reg_addr clearfix">
									<label>社信代码</label>
									<view class="info_bd">{{props.data.credit_code}}</view>
								</view>
								<view class="a_t_li">
									<label>生产经营状态</label>
									<view class="info_bd">
										{{ (props.data.produce_state == "" || props.data.produce_state == null) ? "" : produce_stateTo[props.data.produce_state]}}
									</view>
								</view>
							</view>
						</view>

					</template>
				</app-table> -->
				<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
				 @onNext="onNext"></app-pagination>

			</view>
			<view class="cancel_determine_btn_wrap">
				<button class="cancel_btn half can_det_btn" @click="onCancel" type="default">取消</button>
				<button class="determine_btn half can_det_btn" @click="onDetermine" type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appSearch from '@/components/app-input/app-input-search'

	import appPagination from '@/components/app-table/app-pagination'
	import appTable from '@/components/app-table/app-table'
	import appTableBody from "@/components/app-table/app-table-body"
	import appTableColumn from "@/components/app-table/app-table-column"
	
	import appTableNew from "@/components/app-table/app-table-new"
	
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				drawerVisible: false,
				headerArray: [
					{
						key:'序号', 
						width:40,	
						isInWidth:false,
					},
					{
						key:'企业名称',
						isInWidth:true,
						width:0
					}
				],
				showContent:[{
					key:'name',
					isInWidth:true,
					width:0,
				}],
				searchVal: '',
				industry_category: '0',
				industryCategorySelectData: [{
						label: "全部行业",
						value: "0",
						show: true,
					},
					{
						label: "商贸行业",
						value: "商贸",
						show: true,
					},
					{
						label: "机械行业",
						value: "机械",
						show: true,
					},
					{
						label: "轻工行业",
						value: "轻工",
						show: true,
					},
					{
						label: "烟草行业",
						value: "烟草",
						show: true,
					},
					{
						label: "纺织行业",
						value: "纺织",
						show: true,
					},
					{
						label: "建材行业",
						value: "建材",
						show: true,
					},
					{
						label: "冶金行业",
						value: "冶金",
						show: true,
					},
					{
						label: "有色行业",
						value: "有色",
						show: true,
					}
				],
				////////////////////
				///////////////////////生产经营状态/////////////////////////
				produce_state: '',
				produceStateData: [{
					label: '全部',
					value: '0',
					show: true,
				}, {
					label: '正常经营',
					value: '1',
					show: true,
				}, {
					label: '关闭(注销/搬迁',
					value: '2',
					show: true,
				}, {
					label: '停产停业-正常放假',
					value: '3',
					show: true,
				}, {
					label: '停产停业-应急部门责令停产',
					value: '4',
					show: true,
				}, {
					label: '停产停业-其他部门责令停产',
					value: '5',
					show: true,
				}, {
					label: '停产停业-拟停产搬迁',
					value: '6',
					show: true,
				}],
				/////////////////风险类别/////////////////////////
				risk_type: '',
				riskTypeData: [{
						label: '可燃性粉尘',
						value: 'krxfc',
						show: true,
					},
					{
						label: '有限空间',
						value: 'yxkj',
						show: true,
					},
					{
						label: '高温熔融',
						value: 'gwrr',
						show: true,
					},
					{
						label: '特殊作业及特种设备',
						value: 'tszy',
						show: true,
					},
					{
						label: '其他',
						value: 'orther',
						show: true,
					}
				],
				fclb: '', //粉尘类别

				//////////////空间类别/////////////////////
				kjlb: '',
				kjlbData: [{
						label: '化粪池',
						value: '化粪池',
						show: true,
					},
					{
						label: '其他',
						value: '其他',
						show: true,
					}
				],
				////////////////金属类别////////////////// 
				jslb: '',
				jslbData: [{
						label: '钢',
						value: '钢',
						show: true,
					},
					{
						label: '铁',
						value: '铁',
						show: true,
					},
					{
						label: '铝',
						value: '铝',
						show: true,
					}, {
						label: '铜',
						value: '铜',
						show: true,
					}, {
						label: '其他',
						value: '其他',
						show: true,
					}
				],
				////////////风险类别////////////// 
				lb: '',
				lbData: [{
					label: '冶金煤气',
					value: '1',
					show: true,
				}, {
					label: '涉氨制冷',
					value: '2',
					show: true,
				}, {
					label: '危化品使用',
					value: '3',
					show: true,
				}],
				page: 1,
				pageSize: 10,
				total: 0,
				tableData: [],
				changeState: false,
				isShowExpand: true, //表格是否展开
				isShowCheck: true,
				produce_stateTo: {
					1: '正常经营',
					2: '关闭(注销/搬迁)',
					3: '停产停业-正常放假',
					4: '停产停业-应急部门责令停产',
					5: '停产停业-其他部门责令停产',
					6: '停产停业-拟停产搬迁'
				},
				source:''
			}
		},
		components: {
			appNav,
			appPickerSelect,
			appSearch,
			appPagination,
			appTable,
			appTableBody,
			appTableColumn,
			appTableNew
		},
		computed:{
			...mapState(['admin_law_add_company']),
		},
		onLoad(opts) {
			this.source = opts.s;
			this._initData();
		},
		onShow() {
			
		},
		methods: {
			...mapMutations(['set_admin_law_add_company']),
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				var opts = {
					page: this.page,
					page_size: this.pageSize,
					key: this.searchVal,
					industry_category: this.industry_category,
					produce_state: this.produce_state,
					risk_type: this.risk_type,
					fclb: this.fclb, //
					kjlb: this.kjlb,
					jslb: this.jslb,
					fxlb: this.lb,
				}
				this.$http.post('qcompanyList', opts).then(res => {
					var data = res.data.lst;
					for (var i = 0; i < data.length; i++) {
						data[i]['checked'] = false;
					}
					this.tableData = data;
					this.total = res.Total;
				})
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
				this[str] = "";
				this.page = 1;
				this._initData();
			},
			////////////////////search//////////
			onSearch(e) {
				this.searchVal = e;
				this.page = 1;
				this._initData();
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

			///////////////
			onCancel() {
				var url ;
				if (this.source == 'm') {
					url = './addCompany?s=m'
				}else {
					url = './addCompany'
				}
				uni.reLaunch({
					url
				})
			},
			onDetermine() {
				var tableData = this.$refs.table.getCheckItem();
				if (tableData.length == 0) {
					uni.showToast({
						title:"请选择企业",
						icon:"none",
					});
					return;
				}
				this.$store.commit("set_admin_law_add_company", tableData); 
				this.onCancel();
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_select_industry_container {
		.app_common_wrap {
			.sel_ind_top_select {
				.item_wrap {
					width: 100%;

					.w_max {
						display: inline-block;
						margin: 5px 0;

						&.odd {
							float: left;
							width: 50%;
						}

						&.even {
							float: right;
							width: 40%;
						}
					}


				}

			}
		}
	}
</style>
