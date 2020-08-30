<template>
	<view class="app_bm_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="企业管理"></uni-nav-bar>
		<view class="app_bm_wrap">
			<view class="app_bm_top_wrap clearfix">
				<view class="a_b_search_cmp">
					<app-search @onSearch="onSearch"></app-search>
				</view>
				<view class="a_b_total">
					企业总数:{{total}}家
				</view> 
			</view>
			<view class="app_bm_select_wrap">
				<view class="item_wrap clearfix">
					<view class="w_max odd border_1px_all_ccc padding_5px border_radius_5 clearfix">
						<input type="text" placeholder="请选择地址" placeholder-style="color:#ccc" v-model="addressInfo.str" class="w_90_per  float_left"
						 disabled @click="onAddrInput" />
						<text class="w_10_per float_left text_align_center" @click="onInputArrressClear">X</text>
						<app-picker-address ref="addr" v-model="currentAddr" @onAddressBtn="onAddressBtn"></app-picker-address>
					</view>
					<app-picker-select class="w_max even" placeholder="请选择行业" :selectValue="industry_category" :selectData="industryCategorySelectData"
					 @onSelectClear="onSelectClear('industry_category')" @onSelectBtn="onSelectBtn($event, 'industry_category')"></app-picker-select>
				</view>

				<view class="item_wrap clearfix">
					<app-picker-select class="w_max odd" placeholder="请选择经营状态" :selectValue="produce_state" :selectData="produceStateData"
					 @onSelectClear="onSelectClear('produce_state')" @onSelectBtn="onSelectBtn($event, 'produce_state')"></app-picker-select>
					<app-picker-select class="w_max even" placeholder="请选择审核状态" :selectValue="approval_status" :selectData="approvalStatusData"
					 @onSelectClear="onSelectClear('approval_status')" @onSelectBtn="onSelectBtn($event, 'approval_status')"></app-picker-select>
				</view>

				<view class="item_wrap clearfix">
					<app-picker-select class="w_max odd" placeholder="请选择企业规模" :selectValue="scale" :selectData="scaleData"
					 @onSelectClear="onSelectClear('scale')" @onSelectBtn="onSelectBtn($event, 'scale')"></app-picker-select>
					<app-picker-select class="w_max even" placeholder="请选择标准化" :selectValue="bzh" :selectData="bzhData" @onSelectClear="onSelectClear('bzh')"
					 @onSelectBtn="onSelectBtn($event, 'bzh')"></app-picker-select>
				</view>


				<view class="item_wrap clearfix">
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
			</view>
			<view class="app_bm_btn_wrap">
				<button class="app_bm_btn" @click="onNewEnterprise" type="primary">新增企业</button>
				<button class="app_bm_btn" @click="onExportExcel" type="primary">导出excel</button>
			</view>
			<view class="app_table_wrap">




				<app-table :tableData="tableData" :pageSize="pageSize" :page="page" :headerArray='headerArray' :isShowExpand="isShowExpand"
				 v-model="changeState">
					<app-table-column type="expand"></app-table-column>

					<app-table-column type="index" label="序号" width="40">
					</app-table-column>
					<app-table-column label="企业名称" prop="name">
					</app-table-column>
					<template slot="myslot" slot-scope="props">
						<view class="table_hide_total_container">
							<view class="a_t_ul table_hide_info_wrap">

								<view class="a_t_li reg_addr clearfix">
									<label>企业地址</label>
									<view class="info_bd">{{props.data.produce_address || props.data.reg_address || "无"}}</view>
								</view>
								<view class="a_t_li">
									<label>生产经营状态</label>
									<view class="info_bd">
										{{ (props.data.produce_state == "" || props.data.produce_state == null) ? "" : produce_stateTo[props.data.produce_state]}}
									</view>
								</view>
								<view class="a_t_li">
									<label>审核状态</label>
									<view class="info_bd">
										{{props.data.approval_status==''?'审核状态':approvalStatusTo[props.data.approval_status]}}</view>
								</view>
								<view class="a_t_li">
									<label>企业规模</label>
									<view class="info_bd">{{props.data.scale}}</view>
								</view>
								<view class="a_t_li">
									<label>从业人数</label>
									<view class="info_bd">{{props.data.number_of_employees || 0}}人</view>
								</view>
							</view>
							<view class="tb_hide_btn_wrap">
								<button type="warn" @click="changeMes(props.data.id,0)" class="btn_tb">删除</button>
								<button @click="editShow(props.data, 1, false)" size="small" type="primary" class="btn_tb" v-if="props.data.approval_status!=3">详情</button>
								<button size="small" type="info" v-if="props.data.approval_status==3" class="btn_tb" style="color: #C0C4CC">详情</button>
								<button @click="editShow(props.data,1, true)" size="small" type="primary" class="btn_tb">编辑</button>
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
	import appSearch from '@/components/app-input/app-input-search'
	import appPickerAddress from '@/components/app-picker/app-picker-address'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import ldSelect from "@/components/ld-select/ld-select"
	import appPickerSelectDustType from "@/components/app-picker/app-picker-select-dust-type"

	import appPagination from '@/components/app-table/app-pagination'
	import appTable from '@/components/app-table/app-table'
	import appTableBody from "@/components/app-table/app-table-body"
	import appTableColumn from "@/components/app-table/app-table-column"

	import {
		mapState,
		mapMutations
	} from "vuex"





	export default {
		data() {
			return {
				changeState: false,
				isShowExpand: true, //表格是否展开
				headerArray: ['序号', '企业名称'],
				page: 1,
				pageSize: 10,
				total: 0,
				searchVal: '', //搜索值
				tableData: [],
				drawerVisible: false, //导航显示 
				cityNumber: '', //城镇编号
				cityType: '', //城镇类型 
				addressInfo: {},
				industry_category: '0',



				//地址选择 默认值
				currentAddr: [],


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
				///////////////////////生产经营状态/////////////////////////
				////////////////////////审核状态/////////////////////////// 
				approval_status: '',
				approvalStatusData: [{
					label: '全部',
					value: '0',
					show: true,
				}, {
					label: '已审核',
					value: '1',
					show: true,
				}, {
					label: '审核中',
					value: '2',
					show: true,
				}, {
					label: '未提交',
					value: '3',
					show: true,
				}, {
					label: '修改审核中',
					value: '4',
					show: true,
				}, {
					label: '已驳回',
					value: '5',
					show: true,
				}],
				//////////////////////////企业规模////////////////////////////////// 
				scale: '',
				scaleData: [{
					label: '全部',
					value: '0',
					show: true,
				}, {
					label: '规（限）上企业',
					value: '1',
					show: true,
				}, {
					label: '规（限）下企业',
					value: '2',
					show: true,
				}, {
					label: '个体工商户',
					value: '3',
					show: true,
				}],
				///////////////////bzh///////////////////////////
				bzh: '',
				bzhData: [{
					label: '一级达标',
					value: '1',
					show: true,
				}, {
					label: '二级达标',
					value: '2',
					show: true,
				}, {
					label: '三级达标',
					value: '3',
					show: true,
				}, {
					label: '专业达标',
					value: '4',
					show: true,
				}, {
					label: '岗位达标',
					value: '5',
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
				/////////////////////
				produce_stateTo: {
					1: '正常经营',
					2: '关闭(注销/搬迁)',
					3: '停产停业-正常放假',
					4: '停产停业-应急部门责令停产',
					5: '停产停业-其他部门责令停产',
					6: '停产停业-拟停产搬迁'
				},
				approvalStatusTo: {
					1: '已审核',
					2: '审核中',
					3: '未提交',
					4: '修改审核中',
					5: '已驳回'
				},
				selectCommandTo: {
					1: '规（限）上企业',
					2: '规（限）下企业',
					3: '个体工商户'
				},
				number_of_employeesTo: {
					1: '10人以下',
					2: '10-100人',
					3: '100人以上'
				},
			}
		},
		computed: {
			...mapState(['admin_item_company_info', 'admin_index_addrInfo']),
		},
		components: {
			appNav,
			appSearch,
			appPickerAddress,
			appPickerSelect,
			ldSelect,
			appPickerSelectDustType,
			appPagination,
			appTable,
			appTableBody,
			appTableColumn,
		},
		onLoad(opts) {
			this._parsingData(opts);
		},
		onUnload() {
			this.changeState = false;
		},
		onShow() {
			this._initData();
			this.log(this.admin_index_addrInfo)
		},
		methods: {
			...mapMutations(['set_admin_item_company_info', 'set_admin_index_addrInfo']),
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			// 解析
			_parsingData(opts) {
				//审核状态
				var status = opts.status;
				//标准化
				var bzh = opts.bzh;
				//industry_cat=0&risk_type=krxfc&type=商贸
				//行业
				var in_cat = opts.industry_cat;
				//风险类别
				var r_type = opts.risk_type;
				//类别
				var lb = opts.lb;
				var kjlb = opts.kjlb;
				var jslb = opts.jslb;
				var fxlb = opts.fxlb;
				//企业规模
				var scale = opts.scale;
				this.log(opts)
				if (status != "") {
					this.approval_status = status;
				}
				if (bzh != '') {
					this.bzh = bzh;
				}
				if (in_cat != '') {
					this.industry_category = in_cat;
				}
				if (r_type != '') {
					this.risk_type = r_type;
				}
				if (lb != '') {
					this.fclb = lb;
				}
				if (kjlb != '') {
					this.kjlb = kjlb;
				}
				if (jslb != "") {
					this.jslb = jslb;
				}
				if (fxlb != "") {
					this.lb = fxlb;
				}
				if (scale != "") {
					this.scale = scale;
				}
				// this.log(status != "",bzh != '',in_cat != '',r_type != '',lb != '' )
				if (this.admin_index_addrInfo && this.admin_index_addrInfo != null) {
					this.addressInfo = this.admin_index_addrInfo;
					this.cityType = this.addressInfo.finalLevel || "";
					this.cityNumber = this.addressInfo.finalNumber || "";
					this.currentAddr = this.addressInfo.valueArr || [];
				}
			},


			_initData() {
				var opts = {
					page: this.page,
					page_size: this.pageSize,
					type: this.cityType,
					number: this.cityNumber,
					industry_category: this.industry_category,
					key: this.searchVal,
					produce_state: this.produce_state,
					number_of_employees: this.number_of_employees || "",
					scale: this.scale,
					risk_type: this.risk_type,
					fclb: this.fclb,
					kjlb: this.kjlb,
					jslb: this.jslb,
					fxlb: this.lb,
					bzh: this.bzh,
					approval_status: this.approval_status,
				};
				// this.log(opts)
				this.getCompanyList(opts);
			},
			getCompanyList(opts) {
				this.$http.post("qcompanyList", opts).then(res => {
					if (res.code == 200) {
						this.total = res.Total;
						this.tableData = res.data.lst;
					}
				});
			},
			/////////////////////address//////////////////// 
			onAddressBtn(e) {
				if (e.flag) {
					this.addressInfo = e;
					this.cityType = this.addressInfo.finalLevel;
					this.cityNumber = this.addressInfo.finalNumber;
					this.$store.commit("set_admin_index_addrInfo", null);
					this.page = 1;
					this._initData();
				}
			},

			onInputArrressClear() {
				this.addressInfo.str = "";
				this.cityNumber = "";
				this.cityType = "";
				this.page = 1;
				this._initData();
				this.$store.commit("set_admin_index_addrInfo", null);
			},
			onAddrInput() {
				this.$refs.addr.show();
			},
			breakClick(variable, str) {
				if (variable == str) {
					return false;
				}
				return true;
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
			onSelectDustTypeBtn(val, key) {
				this[key] = val;
				this.page = 1;
				this._initData();
			},
			onSelectDustTypeClose(key) {
				this[key] = "";
				this.page = 1;
				this._initData();
			},
			/////////////////////search////////////////////////////
			onSearch(val) {
				if (val == '') {
					uni.showToast({
						title: "请输入社信代码或者企业名称",
						icon: "none"
					})
					return;
				}
				this.page = 1;
				this.searchVal = val;
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
			//////////表格/////////////////
			//状态改变提示  删除
			changeMes(id, state) {
				var heeh = '该';
				var caozuo = '禁用';
				var _self = this;
				if (id.length > 1) {
					heeh = '这些';
				}
				if (state == 0) {
					caozuo = '删除';
				}
				uni.showModal({
					title: '提示',
					content: `此操作将${caozuo}${heeh}企业, 是否继续?`,
					success: function(res) {
						if (res.confirm) {
							_self.submitState(id, state);
						} else if (res.cancel) {
							this.log('用户点击取消');
						}
					}
				});
			},
			//状态改变
			submitState(id, state) {
				const por = {
					id: id,
					state: state,
				}
				this.log(por)
				this.$http.post('qeditState', por).then(res => {
					if (res.code == 200) {
						this.changeState = false;
						this._initData();
					}
				})
			},
			//x详情
			qyDetails(row) {
				this.log(row.company_id);
				uni.navigateTo({
					url: './page/detail'
				})
			},
			//显示编辑,showType:1编辑2经营点
			editShow(row, showType, bool) {
				var editdata = {
					showType,
					address_same: 1,
					...JSON.parse(JSON.stringify(row))
				}
				if (row.produce_address == row.reg_address) {
					editdata.address_same = 1
				} else {
					editdata.address_same = 2
				}
				if (showType == 2 && row.name.match('公司')) {
					editdata.name = row.name.match(/(\S*)公司/)[1] + '公司'
				}
				var opts = {
					credit_code: row.credit_code,
					id: row.id
				};

				//是经营点查询账号
				if (row.operating_point == 2 || showType == 2) {
					this.log("????????????")
					this.$http.post(showType == 1 ? 'jydaccountGet' : 'jydaccount', opts).then(res => {
						editdata.account = res.data.account || '未获取到账号'
						this._changeNav(bool, editdata);
						// this.$store.commit("set_admin_item_company_info", editdata);
						// if (bool) {
						// 	uni.navigateTo({
						// 		url: './page/newEnterprise?title=编辑企业&state=ed'
						// 	})
						// }else {
						// 	uni.navigateTo({
						// 		url:'./page/detail'
						// 	})
						// }
					})
				} else {
					this._changeNav(bool, editdata);
				}
			},
			_changeNav(bool, editdata) {
				this.$store.commit("set_admin_item_company_info", editdata);
				if (bool) {
					uni.navigateTo({
						url: './page/newEnterprise?title=编辑企业&state=ed'
					})
				} else {
					uni.navigateTo({
						url: './page/detail'
					})
				}
			},
			///////////////新增企业/////////////////////////
			onNewEnterprise() {
				uni.navigateTo({
					url: './page/newEnterprise?title=新增企业&state=nc'
				})
			},
			onExportExcel() {
				var opts = {

					page: this.page,
					page_size: this.pageSize,
					type: this.cityType,
					number: this.cityNumber,
					industry_category: this.industry_category,
					key: this.searchVal,
					produce_state: this.produce_state,
					number_of_employees: this.number_of_employees || "",
					scale: this.scale,
					risk_type: this.risk_type,
					fclb: this.fclb,
					kjlb: this.kjlb,
					jslb: this.jslb,
					fxlb: this.lb,
					bzh: this.bzh,
					approval_status: this.approval_status,
				};
				this.log('点击') 
				this.$http.post('companyListNExcel', opts).then(res => {
					if (res.code == 200) {
						var url = 'http://api.cqgmaq.com/excel/20200823/1598176627沙坪坝区企业名单.xlsx';
						var a;
						const downloadTask = uni.downloadFile({
							url, //仅为示例，并非真实的资源
							success: (res) => {
								if (res.statusCode === 200) {
									this.log('下载成功');
								}
								let that = this;
								uni.saveFile({
									tempFilePath: res.tempFilePath,
									success: function(red) {
										a = red.savedFilePath
										this.log(red, a)
										uni.showToast({
											title: "下载完成",
											icon: 'none'
										})
									}
								});
							}
						});

						downloadTask.onProgressUpdate((res) => {
							this.log('下载进度' + res.progress);
							this.log('已经下载的数据长度' + res.totalBytesWritten);
							this.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
						});
					}
				});
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_bm_container * {
		font-size: 14px;
	}

	.app_bm_container {
		.app_bm_wrap {
			padding: 10px;
		}

		.app_bm_top_wrap {
			width: 100%;

			.a_b_search_cmp {
				float: left;
				margin-bottom: 5px;
				width: 53%;
			}

			.a_b_total {
				float: right;
				width: 40%;
				height: 35px;
				line-height: 35px;
				text-align: right;
				font-size: 14px;
			}
		}

		.app_bm_select_wrap {
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

		.app_bm_btn_wrap {
			display: flex;
			justify-content: space-between;

			.app_bm_btn {
				margin: 5px 0;
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
