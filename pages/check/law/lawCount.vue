<template>
	<div class="main page_law_count">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="执法统计"></uni-nav-bar>
		<div class="app_law_count_container">
			<div class="a_l_c_top_select">
				<app-picker-time></app-picker-time>
				<view class="mar_top_10px clearfix">
					<view  class="half float_left border_1px_all_ccc padding_5px border_radius_5 clearfix" >
						<input type="text"  placeholder-style="color:#ccc" placeholder="请选择地址" v-model="addressInfo.str" class="w_90_per float_left"  disabled @click="onAddrInput" />
						<text class="w_10_per float_left text_align_center" @click="onInputArrressClear">X</text>
						<app-picker-address ref="addr" @onAddressBtn="onAddressBtn" @onClear="onAddressClear"></app-picker-address>
					</view>
					<app-picker-select class="half float_right" placeholder="请选择风险类别" :selectData="typeSerchData" @onSelectClear="onSelectClear('typeSerch')"
					 @onSelectBtn="onSelectBtn($event, 'typeSerch')"></app-picker-select>
				</view>
				<view class="a_l_c_top_s clearfix">
					<app-picker-select class="half float_left" placeholder="查询范围" :selectData="selRangeData" @onSelectClear="onSelectClear('sel_range')"
					 @onSelectBtn="onSelectBtn($event, 'sel_range')"></app-picker-select>
					<button type="primary" class="half float_right export_b">报告导出</button>
				</view>
			</div>
			
			
			<div class="check_statistics_wrap common_sta">
				<div class="title"><span>检查统计</span></div>

				<div class="info">
					<div class="clearfix info-item">
						<span class="info-item_name">计划检查：</span>
						<span class="info-item_vlaue" @click="getJcCompany('jhjc')">{{infoData.jhjc||0}}家/次</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">实际检查：</span><span class="info-item_vlaue" @click="getJcCompany('sjjc')">{{infoData.sjjc||0}}家/次</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">查找隐患：</span><span class="info-item_vlaue" @click="getYhCompany('czyh')">{{infoData.czyh||0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">责令立即整改：</span><span class="info-item_vlaue" @click="getYhCompany('zlljzg')">{{infoData.zlljzg||0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">责令限期整改：</span><span class="info-item_vlaue" @click="getYhCompany('zlxqzg')">{{infoData.zlxqzg||0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">下达责令限期整改指令书：</span><span class="info-item_vlaue">{{infoData.zlxqzgws||0}}份</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">一般隐患：</span><span class="info-item_vlaue" @click="getYhCompany('ybyh')">{{infoData.czyh-infoData.zdyh}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">重大隐患：</span><span class="info-item_vlaue" @click="getYhCompany('zdyh')">{{infoData.zdyh||0}}条</span>
					</div>

				</div>
			</div>


			<div class="rectification_statistics_wrap common_sta">
				<div class="title"><span>整改统计</span></div>
				<div class="info">
					<div class="clearfix info-item"><span class="info-item_name">到期应整改：</span><span class="info-item_vlaue" @click="getYhCompany('dqyzg')">{{infoData.dqyzg||0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">到期己整改：</span><span class="info-item_vlaue" @click="getYhCompany('dqyzg1')">{{infoData.yzg||0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">到期未整改：</span><span class="info-item_vlaue" @click="getYhCompany('dqwzg')">{{(infoData.dqyzg - infoData.yzg)||0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">整改率：</span>
						<span class="info-item_vlaue" v-if="infoData.yzg == 0 && infoData.dqyzg == 0">100%</span>
						<span class="info-item_vlaue" v-else>{{ (( (infoData.yzg / infoData.dqyzg )||0)*100 ).toFixed(2) }}%</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">重大隐患应整改：</span><span class="info-item_vlaue" @click="getYhCompany('zdyhyzg')">{{infoData.zdyhyzg || 0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">重大隐患已整改：</span><span class="info-item_vlaue" @click="getYhCompany('zdyhyzg1')">{{infoData.zdyhyzg1 || 0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">重大隐患未整改：</span><span class="info-item_vlaue" @click="getYhCompany('zdyhwzg')">{{(infoData.zdyhyzg - infoData.zdyhyzg1 ) || 0}}条</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">重大隐患按期整改率：</span>
						<span class="info-item_vlaue" v-if="infoData.zdyhyzg1==0 || infoData.zdyhyzg == 0">100%</span>
						<span v-else class="info-item_vlaue">{{( ((infoData.zdyhyzg1/infoData.zdyhyzg)||0)*100).toFixed(2)}}%</span>
					</div>

				</div>
			</div>

			<div class="penalty_statistics_wrap common_sta">
				<div class="title"><span>处罚统计</span></div>
				<div class="info">
					<div class="clearfix info-item"><span class="info-item_name">警告：</span><span class="info-item_vlaue">{{infoData.jg||0}}</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">行政处罚：</span><span class="info-item_vlaue">{{infoData.xzcf||0}}家/次</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">责令停产停业：</span> <span class="info-item_vlaue">{{infoData.zltcty||0}}家/次</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">罚款：</span><span class="info-item_vlaue">{{infoData.cf||0}}万元</span></div>
					<div class="clearfix info-item"><span class="info-item_name">移送：</span><span class="info-item_vlaue">{{infoData.ys||0}}</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">关闭：</span><span class="info-item_vlaue">{{infoData.gb||0}}家</span>
					</div>
					<div class="clearfix info-item"><span class="info-item_name">暂扣或者吊销许可证：</span><span class="info-item_vlaue">{{infoData.zkhzdxxkz||0}}个</span>
					</div>
				</div>
			</div>

			 

			<!-- <calendar :show.sync="show" :mode="mode" @change="onChange" /> -->
		</div>

	</div>

</template>

<script>
	
	import appNav from '@/components/app-nav/app-nav'
	import appPickerTime from '@/components/app-picker/app-picker-time'
	import appPickerAddress from '@/components/app-picker/app-picker-address'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		name: "LawCont",
		components: {
			appNav,
			appPickerTime,
			appPickerAddress,
			appPickerSelect,
		},
		data() {
			var date = new Date();
			var y = date.getFullYear();
			var m = date.getMonth();
			var d = date.getDate();
			var sT = new Date(y, 0);
			var eT = new Date(y, m + 1, 0);
			var sd1 = this.changeDate(sT);
			var sd2 = this.changeDate(eT);
			return {
				drawerVisible: false,
				show: false,
				mode: 'during',
				dateArray: [sd1, sd2],
				selectType: "1",
				infoData: {},
				
				cityNumber: '', //城镇编号
				cityType: '', //城镇类型 
				addressInfo: {},
				sel_range:'',
				selRangeData:[
					{
						label: "仅本单位",
						value: "1",
						show:true,
					},
					{
						label: "本单位管辖内所有",
						value: "2",
						show:true,
					},
				],
				typeSerch:'',
				typeSerchData:[
					{
						label: "可燃性粉尘",
						value: "krxfc",
						show:true,
					},
					{
						label: "高温熔融",
						value: "gwrr",
						show:true,
					},
					{
						label: "有限空间",
						value: "yxkj",
						show:true,
					},
					{
						label: "危险化学品",
						value: "wxhxp",
						show:true,
					},
					{
						label: "喷涂作业",
						value: "ptzy",
						show:true,
					}
				],
				firstDay:'0000000000000000',
				lastDay:'999999999999999', 
			}
		},
		computed:{
			...mapState(['admin_index_addrInfo']),
		},
		created() {
			if (this.admin_index_addrInfo && this.admin_index_addrInfo != null) {
				this.addressInfo = this.admin_index_addrInfo;
				this.cityType = this.addressInfo.finalLevel || "";
				this.cityNumber = this.addressInfo.finalNumber || "";
			}
			this._initData()
		},
		methods: {
			...mapMutations(['set_admin_index_addrInfo']),
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			//导航
			navClose(bool) {
				this.drawerVisible = bool;
			},
			_initData() {
				const opts = {
					firstday: this.firstDay,
					lastday: this.lastDay,
					fxlb: this.typeSerch,
					admin_level: this.cityType,
					admin_number: this.cityNumber,
					sel_range: this.sel_range
				};
				this.getInfo(opts);
			},
			changeDateTime(date) {
				var data = new Date(date * 1000);
				var y = data.getFullYear();
				var m = ('0' + (data.getMonth() + 1)).slice(-2);
				var d = ('0' + data.getDate()).slice(-2);
				return y + '-' + m + '-' + d;
			},
			//导出报告
			onExport() {
				var u = navigator.userAgent;
				if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机 
					window.location.href =
						"http://api.cqgmaq.com/%E5%B7%A5%E8%B4%B8%E8%A1%8C%E4%B8%9A%E6%89%A7%E6%B3%95%E6%A3%80%E6%9F%A5%E6%83%85%E5%86%B5.pdf";
					return false;

				} else if (u.indexOf('iPhone') > -1) { //苹果手机 
					window.location.href =
						"http://api.cqgmaq.com/%E5%B7%A5%E8%B4%B8%E8%A1%8C%E4%B8%9A%E6%89%A7%E6%B3%95%E6%A3%80%E6%9F%A5%E6%83%85%E5%86%B5.pdf";

				}

			},
			//预览
			onPreview() {
				var _this = this;
				var obj = {
					statrTime: _this.firstDay,
					endTime: _this.lastDay,
					planLaw: _this.infoData.jhjc,
					realLaw: _this.infoData.sjjc,
					findHiddenDanger: _this.infoData.czyh,
					majorHiddenDanger: _this.infoData.zdyh,
					administrativePenalties: _this.infoData.xzcf,
					warn: _this.infoData.jg,
					suspensionOfProduction: _this.infoData.zltcty,
					fineCount: _this.infoData.xzcf,
					fine: _this.infoData.cf,
					transfer: _this.infoData.ys,
					addr: _this.addr,
					type: _this.admin_level,
					number: _this.admin_number,
					sel_range: this.sel_range
				};
				// console.log(obj, "lawCountPreviewData")
				// this.$store.commit('lawCountPreviewData', obj);
				// this.$router.push({
				// 	name: 'LawPreview'
				// }); 
			},


			// //选择地址
			// selectAddress(data) {
			// 	console.log(data)
			// 	this.admin_level = data.type
			// 	this.admin_number = data.number
			// 	if (!data.number) {
			// 		this.admin_level = '';
			// 	}
			// 	this.getInfo()
			// }, 
			getInfo(opts) { 
				this.$http.post('statisticsZF', opts).then(res => {
					if (res.code == 200) {
						this.infoData = res.data
					}
				});
			},
			//获取检查类企业列表表格数据
			async getJcCompany(type) {
				if (type) {
					this.jcType = type
					this.sonCurrentPage = 1
				}
				let value = await this.jcCompany()
				this.sonData = value.data
				this.sonDataTotal = value.Total;
				this.sonVisible = true
				console.log(value)

			},
			//检查类企业列表
			jcCompany(page = '', pageSize = '') {
				const por = {
					page: page || this.sonCurrentPage,
					pageSize: pageSize || this.sonPageSize,
					firstday: this.firstDay,
					lastday: this.lastDay,
					type: this.jcType,
					admin_level: this.admin_level,
					admin_number: this.admin_number,
					sel_range: this.sel_range
				} 
				return this.$http.post("jcCompanyList", por);
			},

			// 检查类Excel导出
			async jcExportExcel() {
				let value = await this.jcCompany(1, 99999)
				this.excelName = '企业列表'
				this.excelData = value.data
				this.excelTitleData = {
					task_id: 'ID',
					company_name: '企业名称'
				}
				this.$refs.excel.sureExcel()
			},

			//隐患企业表格显示
			async getYhCompany(type) {
				if (type) {
					this.yhType = type
					this.twoCurrentPage = 1
				}
				let value = await this.yhCompany()
				this.twoData = value.data
				this.twoDataTotal = value.Total;
				this.twoVisible = true
			},
			//获取隐患企业列表
			yhCompany(page, pageSize) {
				const por = {
					firstday: this.firstDay,
					lastday: this.lastDay,
					type: this.yhType,
					fxlb: this.typeSerch,
					admin_level: this.admin_level,
					admin_number: this.admin_number,
					page: page || this.twoCurrentPage,
					pageSize: pageSize || this.twoPageSize,
					sel_range: this.sel_range

				}
				return this.$http.post('yhcCompanyList', por)
				
			}, 
			 
			onChange(date) {
				this.dateArray = date.map((item) => item.format('YYYY-MM-DD'));
				this.firstDay = this.c1000(+new Date(this.dateArray[0]))
				this.lastDay = this.c1000(+new Date(this.dateArray[1]))
				if (this.dateArray.length > 1) {
					this.getInfo();
					this.show = false;
				}

			},
			changeDate(date) {
				var y = date.getFullYear();
				var m = ("0" + (date.getMonth() + 1)).slice(-2);
				var d = ("0" + date.getDate()).slice(-2);
				return y + "-" + m + "-" + d;
			},
			/////////////////////address////////////////////
			onAddressBtn(e) {
				if (e.flag) {
					this.addressInfo = e;
					this.cityType = this.addressInfo.finalLevel;
					this.cityNumber = this.addressInfo.finalNumber;
					this._initData();
					this.$store.commit("set_admin_index_addrInfo", null);
				}
			},
			onAddressClear() {
				this.cityNumber = "";
				this.cityType = "";
				this._initData();
			},
			
			onAddrInput() {
				this.$refs.addr.show();
			},
			onInputArrressClear() {
				this.addressInfo =  {};
				this.cityNumber = "";
				this.cityType = "";
				this._initData();
				this.$store.commit("set_admin_index_addrInfo", null);
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
					this._initData();
				}
			},
			onSelectClear(str) {
				console.log(str, "??????????????????????????????/");
				this[str] = "";
				this._initData();
			},

		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.page_law_count {
		.app_law_count_container {
			padding: 10px;
			.a_l_c_top_select{
				.a_l_c_top_f,
				.a_l_c_top_s{ 
					margin:10px 0;
				}
				.a_l_c_top_s{
					.export_b{
						height:30px;
						line-height: 30px;
						font-size: 14px;
					}
				}
			}
		}

		.table {
			width: 100%;
			margin-bottom: 30px;
		}

		.info-item:first-child {
			border-top: 1px solid #f2f2f2;
		}

		.info-item {
			padding: 10px 0;
			border-bottom: 1px solid #f2f2f2;
		}

		.info-item_name {
			float: left;
			font-size: 14px;
		}

		.info-item_vlaue {
			float: right;
			color: #409eff;
			font-size: 14px;
			cursor: pointer;
		}

		.title {
			padding: 10px 0;
			width: 100%;
			color: #409eff;
			text-align: left;
			box-sizing: border-box;
			font-size: 15px;
			font-weight: bold;
		} 

 
	}
</style>
