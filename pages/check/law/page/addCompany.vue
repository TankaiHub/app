<template>
	<view class="app_add_company_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="添加企业"></uni-nav-bar>
		<view class="a_com_wrap">
			<uni-list> 
				<uni-list-item title="检查类型：" :showArrow="false">
					<view class="" slot="right">
						<app-picker-select class="a_com_select" placeholder="请选择检查类型" :selectValue="typeValue" :selectData="typeData"
						 @onSelectClear="onSelectClear('typeValue')" @onSelectBtn="onSelectBtn($event, 'typeValue')"></app-picker-select>
					</view>
				</uni-list-item>
				<uni-list-item title="检查时间：" :showArrow="false">
					<view class="" slot="right">
						<input type="text" class="text_align_right" v-model="timeStr" disabled @click="onclcik" placeholder="请选择检查时间" />
						<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange'></date-time-picker>
					</view>
				</uni-list-item>
				<uni-list-item title="选择企业：" :showArrow="false">
					<button slot="right" :disabled="isDisabled" class="a_com_btn" type="primary" @click="onAdd">立即添加</button>
				</uni-list-item>
			</uni-list>
			<view class="a_com_table_wrap" v-if="isShowTable">
				<app-table-new  :tableData="tableData":headerArray="headerArray" :showContent="showContent" :isShowIndex="true" :isShowExpand="isShowExpand" :isClickBar="isClickBar">
					<block slot="content" slot-scope="props" v-if="props.data">
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
								<view class="tb_hide_btn_wrap">
									<button type="warn" @click="onDelete(props.data)" class="btn_tb">删除</button>
								</view>
							</view>
						</view> 
					</block>
				</app-table-new>
				<!-- <app-table :tableData="tableData" :isShowExpand="isShowExpand" v-model="changeState" :isClickBar="isClickBar">
					<app-table-column type="expand"></app-table-column>
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
								<view class="tb_hide_btn_wrap">
									<button type="warn" @click="onDelete(props.data)" class="btn_tb">删除</button>
								</view>
							</view>
						</view>

					</template>
				</app-table> -->
				<view class="cancel_determine_btn_wrap">
					<button class="cancel_btn half can_det_btn" @click="onCancel" type="default">取消</button>
					<button class="determine_btn half can_det_btn" @click="onDetermine" type="primary">确认</button>
				</view>


			</view>

		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker'

	import appPagination from '@/components/app-table/app-pagination'
	import appTable from '@/components/app-table/app-table'
	import appTableBody from "@/components/app-table/app-table-body"
	import appTableColumn from "@/components/app-table/app-table-column"
	
	import appTableNew from "@/components/app-table/app-table-new"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		DivideAthousandTime,
		changeTime
	} from "@/common/js/base.js"
	export default {
		data() {
			return {
				isClickBar: true,
				isShowTable: false,
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
				typeValue: '',
				typeData: [{
					label: "计划检查",
					value: "1",
					show: true,
				}, {
					label: "随机抽查",
					value: "2",
					show: true,
				}],
				dateString: '',
				type: 'year-month',
				timeStr: '',
				produce_stateTo: {
					1: '正常经营',
					2: '关闭(注销/搬迁)',
					3: '停产停业-正常放假',
					4: '停产停业-应急部门责令停产',
					5: '停产停业-其他部门责令停产',
					6: '停产停业-拟停产搬迁'
				},
				tableData: [],
				changeState: false,
				isShowExpand: true, //表格是否展开
				isShowCheck: true,
				source: '', //url携带的字段
				isDisabled: false, //立即添加禁止
			}
		},
		components: {
			appNav,
			appPickerSelect,
			DateTimePicker,
			// appPagination,
			appTable,
			// appTableBody,
			appTableColumn,
			appTableNew
		},
		computed: {
			...mapState(['admin_law_add_company', 'admin_law_plan_info', "admin_law_add_company_select_info"]),
			indicatorStyle() {
				return {
					background: 'rgba(204, 204, 204, .5)',
					height: '40px',
				};
			},

		},
		watch: {
			tableData(nv) {
				this.tableData = nv;
			}
		},
		onLoad(opts) {
			this.source = opts.s;
			var code = opts.code;
			if (code && code != undefined) {
				this.isDisabled = true;
				this._getCodeCompany(code);
			}
		},
		onShow() {
			this.tableData = this.admin_law_add_company;
			if (this.admin_law_add_company_select_info.type == '计划检查') {
				this.typeValue = 1;
			} else if (this.admin_law_add_company_select_info.type == '随机抽查') {
				this.typeValue = 2;
			}

			this.timeStr = changeTime(this.admin_law_add_company_select_info.task_time, "yy/mm");
			if (this.tableData.length > 0) {
				this.isShowTable = true;
			} else {
				this.isShowTable = false;
			}
		},

		methods: {
			...mapMutations(['set_admin_law_add_company', 'set_admin_law_plan_info', "set_admin_law_add_company_select_info"]),
			onNavBarLeft() {
				// uni.navigateBack();
				this.onCancel();
			},
			////////////////////////////select///////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this[key] = e.value;
					this.$store.commit({
						type: 'set_admin_law_add_company_select_info',
						val: this[key] == 1 ? "计划检查" : "随机检查",
						key: 'type',
						state: "set" //
					});
				}
			},
			onSelectClear(str) {
				this[str] = "";
				// this._initData();
			},
			onclcik() {
				this.$refs['date-time'].show();
			},
			dateTimeChange(e) {
				var reg = /\-/g;
				this.timeStr = e.replace(reg, "/");

				var time = DivideAthousandTime(new Date(this.timeStr + '/01').getTime());
				this.log(this.timeStr, time, new Date(this.timeStr + '/01'))
				this.$store.commit({
					type: 'set_admin_law_add_company_select_info',
					val: time,
					key: 'task_time',
					state: "set" //
				});
			},
			onCancel() {
				this.log(this.source)
				this.$store.commit("set_admin_law_add_company", []);
				this.$store.commit("set_admin_law_add_company_select_info", {});
				this.typeValue = "";
				this.timeStr = "";
				if (this.source == 'm') {
					uni.navigateTo({
						url: '../lawPlan'
					})
				} else {
					uni.navigateTo({
						url: './lawTask'
					})
				}

			},
			onDetermine() {
				this.log(this.timeStr)
				if (this.typeValue == '') {
					uni.showToast({
						title: '请选择检查类型',
						icon: "none"
					})
					return;
				}
				if (this.timeStr == '无' || this.timeStr == "") {
					uni.showToast({
						title: '请选择检查时间',
						icon: "none"
					})
					return;
				}
				if (this.tableData.length == 0) {
					uni.showToast({
						title: '请选择企业',
						icon: "none"
					})
					return;
				} 
				var time;
				try {
					time = new Date(this.timeStr + '/01').getTime();
				} catch (e) {
					time: 0
				}
				this.log(new Date(this.timeStr + '/01'), this.timeStr, this.admin_law_add_company_select_info)
				var opts = {
					type: this.typeValue,
					task_time: DivideAthousandTime(time),
					company_ids: this.getComId(),
				};
				var _self = this;
				this.$http.post('makePlan', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "添加成功",
							icon: "success",
							success() {
								setTimeout(() => {
									_self.$store.commit("set_admin_law_add_company", []);
									_self.$store.commit("set_admin_law_add_company_select_info", {});
									_self.typeValue = "";
									_self.timeStr = "";

									_self.onCancel();
								}, 1000);
							}
						})
					}
				})
			},
			getComId() {
				var str = '';
				var arr = this.tableData;
				for (var i = 0; i < arr.length; i++) {
					if (i == 0) {
						str = arr[i].id;
					} else {
						str += ',' + arr[i].id;
					}
				}
				return str;
			},
			onAdd() {
				var url;
				if (this.source == 'm') {
					url = './selectIndustry?s=m'
				} else {
					url = './selectIndustry'
				}
				uni.reLaunch({
					url
				})
			},
			onDelete(data) {
				var arr = this.tableData;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id == data.id) {
						arr.splice(i, 1);
					}
				}
				this.$store.commit("set_admin_law_add_company", arr);
			},
			//根据code获取企业列表
			_getCodeCompany(code) {
				var opts = {
					page: 1,
					page_size: 100,
					key: code,
					industry_category: "",
					produce_state: "",
					risk_type: "",
					fclb: "",
					kjlb: "",
					jslb: "",
					fxlb: "",
				}
				this.$http.post('qcompanyList', opts).then(res =>{
					if (res.code == 200) {
						this.tableData = res.data.lst;
						this.isShowTable = true;
					}
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_add_company_container {
		.a_com_wrap {
			padding: 20rpx 0;

			.a_com_select {
				width: 260rpx;
			}
		}

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
</style>
