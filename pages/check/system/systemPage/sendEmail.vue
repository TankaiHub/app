<template>
	<view class="app_sendEmail_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="发送邮件"></uni-nav-bar>
		<view class="sendEmail_wrap padding_10px">

			<view class="item_wrap clearfix">
				<view class="w_max n_odd l_min padding_5px border_radius_5 clearfix font_weight_bold">
					选择企业:
				</view>
				<app-picker-select class="w_max n_even" placeholder="选择企业" :selectValue="showValue" :selectData="showValueData"
				 @onSelectClear="onSelectClear('showValue')" @onSelectBtn="onSelectBtn($event, 'showValue')"></app-picker-select>
			</view>
			<view class="item_wrap clearfix" v-if="showValue==2||showValue==3">
				<app-picker-select class="w_max odd" placeholder="请选择行业" :selectValue="industry_category" :selectData="industryCategorySelectData"
				 @onSelectClear="onSelectClear('industry_category')" @onSelectBtn="onSelectBtn($event, 'industry_category')"></app-picker-select>
				<app-picker-select class="w_max even" placeholder="请选择经营状态" :selectValue="produce_state" :selectData="produceStateData"
				 @onSelectClear="onSelectClear('produce_state')" @onSelectBtn="onSelectBtn($event, 'produce_state')"></app-picker-select>
			</view>
			<view class="item_wrap clearfix" v-if="showValue==2||showValue==3">
				<app-picker-select class="w_max odd" placeholder="请选择风险类别" :selectValue="risk_type" :selectData="riskTypeData"
				 @onSelectClear="onSelectClear('risk_type')" @onSelectBtn="onSelectBtn($event, 'risk_type')"></app-picker-select>
				<app-picker-select-dust-type class="w_max even" :initVal="fclb" v-if="risk_type && risk_type.indexOf('krxfc')!==-1"
				 :industry_category="industry_category" @onSelectBtn="onSelectDustTypeBtn($event, 'fclb')" @onSelectClose="onSelectDustTypeClose( 'fclb')"></app-picker-select-dust-type>
				<app-picker-select class="w_max even" placeholder="请选择风险类别" :selectValue="kjlb" v-if="risk_type && risk_type.indexOf('yxkj')!==-1"
				 :selectData="kjlbData" @onSelectClear="onSelectClear('kjlb')" @onSelectBtn="onSelectBtn($event, 'kjlb')"></app-picker-select>
				<app-picker-select class="w_max even" placeholder="请选择风险类别" :selectValue="jslb" v-if="risk_type && risk_type.indexOf('gwrr')!==-1"
				 :selectData="jslbData" @onSelectClear="onSelectClear('jslb')" @onSelectBtn="onSelectBtn($event, 'jslb')"></app-picker-select>
				<app-picker-select class="w_max even" placeholder="请选择风险类别" :selectValue="lb" v-if="risk_type && risk_type.indexOf('orther')!==-1"
				 :selectData="lbData" @onSelectClear="onSelectClear('lb')" @onSelectBtn="onSelectBtn($event, 'lb')"></app-picker-select>
			</view>
			<view class="item_wrap clearfix" v-if="showValue == 3">
				<app-search class="w_max odd" @onSearch="onSearch" placeholder='编号或部门名称'></app-search>
			</view>



			<view class="a_c_m_top_wrap" v-if="showValue == 3">
				<view class="app_table_wrap">
					<app-table-new ref="table" :tableData="tableData" :isShowExpand="true" :isShowCheckbox="true" :headerArray='headerArray'
					 :showContent="showContent" :isShowIndex="true">
						<block class="" slot="content" slot-scope="props">
							<view class="table_hide_total_container" v-if="props.data">
								<view class="a_t_ul table_hide_info_wrap">
									<view class="a_t_li clearfix">
										<label>社信代码</label>
										<view class="info_bd">{{props.data.credit_code}}</view>
									</view>
									<view class="a_t_li clearfix">
										<label>生产经营状态</label>
										<view class="info_bd">
											{{ (props.data.produce_state == "" || props.data.produce_state == null) ? "" : produce_stateTo[props.data.produce_state]}}
										</view>
									</view>
								</view>
							</view>
						</block>
					</app-table-new>
				</view>
				<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
				 @onNext="onNext"></app-pagination>
			</view>

			<view class="item_wrap clearfix">
				<view class="w_max n_odd padding_5px border_radius_5 clearfix font_weight_bold">
					监管部门/单位：
				</view>
				<app-search class="w_max n_even" @onSearch="onSearchUnit" placeholder='编号或部门名称'></app-search>
			</view>

			<view class="acm_wrap">
				<view class="app_table_wrap">
					<app-table-new ref="table2" :tableData="sonTableData" :headerArray='headerArray2' :isShowCheckbox="true"
					 :showContent="showContent2">

					</app-table-new>
				</view>
				<app-pagination :total="total2" :page="page2" :pageSize="pageSize2" @onSelectItem="onSelectItem2" @onPrev="onPrev2"
				 @onNext="onNext2"></app-pagination>
			</view>
			<button type="primary" class="width150px" @click="onSure">确定</button>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appSearch from '@/components/app-input/app-input-search'
	import appTableNew from "@/components/app-table/app-table-new"
	import appPagination from '@/components/app-table/app-pagination'
	import appPickerSelectDustType from "@/components/app-picker/app-picker-select-dust-type"

	import {
		mapState,
		mapMutations
	} from "vuex"

	export default {
		data() {
			return {
				searchVal: '',
				searchUnitVal: '',
				showValue: '',
				total: 0,
				total2: 0,
				page: 1,
				page2: 1,
				pageSize: 10,
				pageSize2: 10,
				tableData: [],
				sonTableData: [],
				showContent: [{
					key: 'name',
					isInWidth: true,
					width: 0,
				}],
				showContent2: [{
					key: 'number',
					isInWidth: false,
					width: 100,
				}, {
					key: 'name',
					isInWidth: false,
					width: 100,
				}],
				headerArray: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '企业名称',
						isInWidth: true,
						width: 0
					}
				],
				headerArray2: [{
						key: '编号',
						width: 100,
						isInWidth: false,
					},
					{
						key: '部门名称',
						isInWidth: false,
						width: 100
					}
				],
				industry_category: '0',
				showValueData: [{
						label: "全部企业（管理范围内）",
						value: "1",
						show: true,
					}, {
						label: "按条件选择",
						value: "2",
						show: true,
					},
					{
						label: "手动选择",
						value: "3",
						show: true,
					},
				],
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
				////select////////
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
				////////////////////粉尘类别////////////////////////////
				fclb: '',
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
				produce_stateTo: {
					1: '正常经营',
					2: '关闭(注销/搬迁)',
					3: '停产停业-正常放假',
					4: '停产停业-应急部门责令停产',
					5: '停产停业-其他部门责令停产',
					6: '停产停业-拟停产搬迁'
				},
			}
		},
		components: {
			appPickerSelect,
			appSearch,
			appTableNew,
			appPagination,
			appPickerSelectDustType
		},
		computed: {
			...mapState(['admin_email_send']),
		},
		onLoad() {
			this._initData();
		},
		methods: {
			...mapMutations(['set_admin_email_send']),
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				this._getCompanyList();
				this._getReList();
			},
			_getCompanyList() {
				if (this.showValue != 3) {
					return
				}
				if (typeof this.risk_type == 'string') {
					this.risk_type = '';
				} else {
					this.risk_type = this.risk_type.join(',')
				}
				var opts = {
					page: this.page,
					page_size: this.pageSize,
					key: this.searchVal,
					industry_category: this.industry_category,
					produce_state: this.produce_state,
					risk_type: this.risk_type,
					fclb: this.fclb,
					kjlb: this.kjlb,
					jslb: this.jslb,
					fxlb: this.lb,
				}
				this.$http.post('qcompanyList', opts).then(res => {
					if (res.code == 200) {
						this.total = res.Total;
						this.tableData = res.data.lst;
					}
				})
			},
			_getReList() {
				var opts = {
					page: this.page2,
					pageSize: this.pageSize2,
					key: this.searchUnitVal,
				};
				this.$http.post('reList', opts).then(res => {
					if (res.code == 200) {
						this.total2 = res.Total;
						this.sonTableData = res.data;
					}
				});
			},
			onSearch(val) {
				this.searchVal = val;
				this._getCompanyList();
			},
			onSearchUnit(val) {
				this.searchUnitVal = val;
				this._getReList();
			},
			/////////////////////select////////////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this.page = 1;
					this[key] = e.value;
					this._getCompanyList();
					this.$forceUpdate()
				}
			},
			onSelectClear(str) {
				this[str] = "";
				this.page = 1;
				this._getCompanyList();
			},
			onSelectDustTypeBtn(val, key) {
				this[key] = val;
				this.page = 1;
				this._getCompanyList();
			},
			onSelectDustTypeClose(key) {
				this[key] = "";
				this.page = 1;
				this._getCompanyList();
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
			/////////////222222222222
			onSelectItem2(num) {
				this.pageSize2 = num;
				this.page2 = 1;
			},
			onPrev2(page) {
				this.page2 = page - 1;
			},
			onNext(page) {
				this.page2 = page + 1;
			},
			onSure() { 
				var company_ids = "";
				var company_name = [];
				var t2 = this.$refs.table2.getCheckItem(); //监管部门/单位  
				var numbers = this._getName(t2, 'number');
				var son_name = this._getName(t2, 'name');
				if (this.showValue == 3) {
					var t1 = this.$refs.table.getCheckItem(); //企业
					company_ids = this._getName(t1, 'company_id');
					company_name = this._getName(t1, 'name');
					if (t1.length == 0) {
						uni.showToast({
							title: "请选择",
							icon: 'none'
						})
					}
				} else {
					if (t2.length == 0) {
						uni.showToast({
							title: "请选择",
							icon: 'none'
						})
					}
				}
				
				var all = {
					company_chose_type: this.showValue || 0,
					industry_category: this.industry_category,
					produce_state: this.produce_state,
					company_id: company_ids,
					company_name,
					r_admin_number: numbers,
					son_name
				}
				this.$store.commit('set_admin_email_send', all);

				uni.navigateTo({
					url: './showSendCompany'
				})

			},
			_getVal(arr, str) {
				var val = '';
				for (var i = 0; i < arr.length; i++) {
					if (i == 0) {
						val = arr[i][str];
					} else {
						val += ',' + arr[i][str];
					}
				}
				return val;
			},
			_getName(arr, name) {
				console.log(arr, name)
				var narr = [];
				for (var i = 0; i < arr.length; i++) {
					narr.push(arr[i][name]);
				}
				return narr;
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.item_wrap {
		width: 100%;

		.w_max {
			display: inline-block;

			&.odd {
				margin-bottom: 20upx;
				float: left;
				width: 40%;
			}

			&.even {
				margin-bottom: 20upx;
				float: right;
				width: 50%;
			}

			&.n_odd {
				float: left;
				width: 30%;
				line-height: 70upx;

				&.l_min {
					line-height: 67upx;
				}
			}

			&.n_even {
				float: right;
				width: 60%;
			}
		}


	}
</style>
