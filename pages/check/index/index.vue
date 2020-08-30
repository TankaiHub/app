<template>
	<view class="container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="首页"></uni-nav-bar>

		<view class="index_com top_select">
			<view class=" border_1px_all_ccc padding_5px border_radius_5 clearfix"> 
				<input type="text" placeholder="请选择地址" placeholder-style="color:#ccc" v-model="addressInfo.str" class="w_90_per  float_left"
				 disabled @click="onAddrInput" />
				<text class="w_10_per float_left text_align_center" @click="onInputArrressClear">X</text>
				<app-picker-address ref="addr" @onAddressBtn="onAddressBtn"></app-picker-address>
			</view>
 

			<!-- <app-picker-address class="i_c_sel" @onAddressBtn="onAddressBtn" @onClose="onAddressClose" :isClearAdrress="isClearAdrress"
			 :isShowPickerAddress="isShowPickerAddress"></app-picker-address> -->
			<app-picker-select class="i_c_sel" placeholder="请选择企业规模" :isShowPickerSelect="isShowPickerSelect" :isClearSelect="isClearSelect"
			 :selectData="selectData" @onSlectClose="onSlectClose" @onSelectBtn="onSelectBtn"></app-picker-select>

		</view>
		<!-- 表 -->
		<view class="index_com center_table">
			<!-- 企业总数 -->
			<view class="c_t c_total_wrap">
				<view class="c_t_title i_title">企业总数</view>
				<view class="c_t_content_wrap cm_wrap clearfix">
					<view class="c_t_left_num" @click="onComTotal">{{formatNum(totalAndChartData.zs) || 0}}</view>
					<view class="c_t_right_list_wrap">
						<view class="c_t_list_item c_item" @click="onManage(1, '')">
							<text>已录入</text>
							<text>{{formatNum(totalAndChartData.ytg) || 0}}家</text>
						</view>
						<view class="c_t_list_item c_item" @click="onManage(2, '')">
							<text>审核中</text>
							<text>{{formatNum(totalAndChartData.dsh) || 0}}家</text>
						</view>
						<view class="c_t_list_item c_item" @click="onManage(3, '')">
							<text>未录入</text>
							<text>{{formatNum(totalAndChartData.wtg) || 0}}家</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 标准化情况 -->
			<view class="c_t b_table_wrap">
				<view class="i_title">标准化情况</view>
				<view class="b_t_content_wrap cm_wrap">
					<view class="b_t_list_wrap">
						<view class="b_t_list_wrap c_item" @click="onManage('', 1)">
							<text>一级达标</text>
							<text>{{formatNum(standardization.bzh1) || 0}}家</text>
						</view>
						<view class="b_t_list_wrap c_item" @click="onManage('', 2)">
							<text>二级达标</text>
							<text>{{formatNum(standardization.bzh2) || 0}}家</text>
						</view>
						<view class="b_t_list_wrap c_item" @click="onManage('', 3)">
							<text>三级达标</text>
							<text>{{formatNum(standardization.bzh3) || 0}}家</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 执法统计 -->
			<view class="c_t l_table_wrap">
				<view class="i_title_year">
					<text class="font16">执法统计</text>
					<text class="font16">{{new Date().getFullYear()}}年</text>
				</view>
				<view class="l_t_content_wrap cm_wrap">
					<view class="l_t_list_wrap" @click="onGoLaw">
						<view class="l_t_list_wrap c_item">
							<text>计划检查</text>
							<text>{{formatNum(lawCount.jhjc)||0}}家/次</text>
						</view>
						<view class="l_t_list_wrap c_item">
							<text>实际检查</text>
							<text>{{formatNum(lawCount.sjjc)||0}}家/次</text>
						</view>
						<view class="l_t_list_wrap c_item">
							<text>责令整改</text>
							<text>{{formatNum(lawCount.zlljzg)||0}}家/次</text>
						</view>
						<view class="l_t_list_wrap c_item">
							<text>行政处罚</text>
							<text>{{formatNum(lawCount.xzcf)||0}}家/次</text>
						</view>
						<view class="l_t_list_wrap c_item">
							<text>罚款</text>
							<text>{{formatNum(lawCount.cf)||0}}家/次</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 隐患查改 -->
			<view class="c_t f_table_wrap">
				<view class="i_title_year">
					<text class="font16">隐患查改</text>
					<text class="font16">{{new Date().getFullYear()}}年</text>
				</view>
				<view class="f_t_content_wrap cm_wrap" @click="onGoLaw">
					<view class="f_t_list_wrap">
						<view class="f_t_list_wrap c_item">
							<text>一般隐患</text>
							<text>{{lawCount.czyh - lawCount.zdyh}}条</text>
						</view>
						<view class="f_t_list_wrap c_item">
							<text>一般隐患已整改</text>
							<text>{{(lawCount.yzg) - (lawCount.zdyhyzg)}}条</text>
						</view>
						<view class="f_t_list_wrap c_item">
							<text>一般隐患整改率</text>
							<text v-if="lawCount.yzg == 0 && lawCount.dqyzg == 0">100%</text>
							<text v-else>{{ (( (lawCount.yzg / lawCount.dqyzg )||0)*100 ).toFixed(2) }}%</text>
						</view>
						<view class="f_t_list_wrap c_item">
							<text>重大隐患</text>
							<text>{{lawCount.zdyh||0}}条</text>
						</view>
						<view class="f_t_list_wrap c_item">
							<text>重大隐患按期整改率</text>
							<text v-if="lawCount.zdyh == 0 && lawCount.zdyhyzg == 0">100%</text>
							<text v-else>{{ (((lawCount.zdyhyzg/lawCount.zdyh)||0)*100).toFixed(2)  }}%</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 图 -->
		<view class="index_com bottom_chart">
			<!-- 八大行业占比 -->
			<view class="industry_wrap commit_chart c_t_title mar_top_10px padding_5px">
				<view class="i_title ">标准化情况</view>
				<view class="indu_ech_text_wrap clearfix">
					<view class="float_left" :style="{ width: pieWidth + 'px'}">
						<app-echarts v-if="isShowChart1" :option="c1_option" style="height: 300px;" @click="echartsClick"></app-echarts>
					</view>
					<view class="a_t_risk_item_bt_right float_right">
						<view class="a_t_risk_item_bt_right_wrap">
							<view class="a_t_risk_item_bt_right_item padding_bt_5px clearfix" v-for="(item, index) in c1_charData" :key='index' @click="onCount(item, '')">
								<view class="a_t_risk_item_bt_right_item_color float_left dis_inline_block mar_top_15px" :style="{backgroundColor:colors[index]}"></view>
								<view class="float_right dis_inline_block text_align_left mar_left_10px line_height_20px">
									<view class="a_t_risk_item_bt_right_item_text  color_fff">{{item.name}}行业</view>
									<view class="a_t_risk_item_bt_right_item_number  color_fff">{{item.count}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> 
			<!-- 工贸企业规模 -->
			<view class="commit_chart c_t_title padding_5px mar_top_10px">
				<view class="i_title ">工贸企业规模</view>
				<view class="indu_ech_text_wrap clearfix">
					<view class="float_left" :style="{ width: pieWidth + 'px'}">
						<app-echarts v-if="isShowChart2" :option="c2_option" style="height: 300px;" @click="echartsClick"></app-echarts>
					</view>
					<view class="a_t_risk_item_bt_right float_right">
						<view class="a_t_risk_item_bt_right_wrap ">
							<view class="a_t_risk_item_bt_right_item padding_bt_5px clearfix" v-for="(item, index) in selectFinalArray" :key='index'  @click="onCount('', index+1)">
								<view class="a_t_risk_item_bt_right_item_color float_left dis_inline_block mar_top_15px" :style="{backgroundColor:colors[index]}"></view>
								<view class="float_right dis_inline_block text_align_left mar_left_10px line_height_20px gm_mode_info_wrap">
									<view class="a_t_risk_item_bt_right_item_text  color_fff">{{item.name}}行业</view>
									<view class="a_t_risk_item_bt_right_item_number  color_fff">{{item.value}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
 
			<!-- 风险统计 -->
			<view class="count_wrap border_radius_5 padding_10px mar_top_10px">
				<view class="c_unit">
					单位：家
				</view>
				<app-echarts v-if="isShowRect" :option="rect_option" style="height: 300px;" @click="echartsClick"></app-echarts>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appPickerTime from '@/components/app-picker/app-picker-time'
	import appPickerAddress from '@/components/app-picker/app-picker-address'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	// import { getAddress } from '@/common/js/base.js'

	import appEcharts from '@/components/app-echart/echarts'

	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			var d = new Date(),
				year = d.getFullYear(),
				month = d.getMonth() + 1,
				day = d.getDate();
			return {
				isShowPickerTime: false, //显示时间插件
				dateObject: { //时间
					year,
					month,
					day
				},
				colors: ['#E6AF08', '#0E6DE9', '#AC4ED3', '#00AF6D', '#FF4545', '#F72880', '#01AFE1', '#FA5F1A'],
				scaleTextData: ['规上企业', "规下企业", "个体工商户"],
				selectFinalArray: [],
				/////////////////////
				addressInfoText: '请选择',
				isShowPickerAddress: false, //显示地址插件
				addressInfo: {
					str: "重庆市"
				},
				isClearAdrress: false,
				/////////////////////
				isShowColumn: false,

				////////////////---------///////////
				currentSelectText: "请选择",
				isClearSelect: false,
				isShowPickerSelect: false, //选择
				selectData: [{
						label: "所有",
						value: "1,2,3",
						show: true,
					},
					{
						label: "企业",
						value: "1,2",
						show: true,
					},
					{
						label: "规上企业",
						value: "1",
						show: true,
					},
					{
						label: "规下企业",
						value: "2",
						show: true,
					},
					{
						label: "个体工商户",
						value: "3",
						show: true,
					}
				],
				currentSelect: {},
				////////////////---------///////////
				drawerVisible: false, //导航显示
				// drawerMode: "left", //导航位置
				cityNumber: '', //城镇编号
				cityType: '', //城镇类型
				scaleValue: '', //企业规模
				standardization: {}, //标准化
				totalAndChartData: {}, // 企业总数  and 部分图
				lawCount: {}, //执法统计

				//八大行业  - - 图表
				c1_charData: [],
				isShowChart1: false,
				c1_option: {},
				//企业规模 - - 图表
				isShowChart2: false,
				c2_option: {},
				//柱状图
				isShowRect: false, //柱状图 --- 图表
				rect_option: {},
				standardizationAndRisk: {}, //柱状图 

			}
		},
		computed: {
			...mapState(['admin_index_addrInfo']),
			pieWidth() { //图表宽度 
				return uni.getSystemInfoSync().screenWidth - 30 - 130;
			},
		},
		components: {
			appNav,
			appPickerTime,
			appPickerAddress,
			appPickerSelect,
			appEcharts
		},
		onShow() {
			this._initData();
		},

		methods: {
			...mapMutations(['set_admin_index_addrInfo']),
			onNavBarLeft() {
				this.log("??")
				this.drawerVisible = true;
			},
			_initData() {
				this._getIndex();
				this._getStandardization();
				this._getStatisticsZF();
			},



			//表 图
			_getIndex() {
				var opts = {
					type: this.cityType,
					number: this.cityNumber,
					scale: this.scaleValue
				};
				this.isShowChart1 = false;//控制图表
				this.isShowChart2 = false;//控制图表
				var val = []; //八大行业占比
				var scaleVal = []; ///工贸企业规模
				this.$http.post("index", opts).then(res => {
					this.log(res)
					var data = res.data;
					var scale = data.scale;
					this.isShowChart1 = true;
					this.isShowChart2 = true;
					this.standardization = data.bzh;
					this.totalAndChartData = data;
					this.c1_charData = data.proportion;

					for (var i = 0; i < this.c1_charData.length; i++) {
						var temp = this.c1_charData[i];
						val.push({
							value: temp.count,
							name: temp.name
						});
					};
					for (var j = 0; j < this.scaleTextData.length; j++) {
						var temp = this.scaleTextData[j];
						scaleVal.push({
							value: scale['scale' + (j + 1)],
							name: temp
						});
					}
					this.selectFinalArray = scaleVal;
					this.c1_option = this._renderOption(val);
					this.c2_option = this._renderOption(scaleVal);
				});
			},
			_renderOption(data) {
				return {
					color: this.colors,
					tooltip: {
						// trigger: 'item',
						position: ['50%', '50%']
					},
					//功能模块
					toolbox: {
						show: true,
						feature: {
							magicType: {
								show: true,
								type: ['pie']
							},
						}
					},
					calculable: true,
					series: [{
						name: '行业占比',
						type: 'pie',
						radius: [40, 90],
						center: ['50%', '45%'],
						data: data,
						label: {
							show: false,
							color: 'white',
							formatter: "{d}%"
						},
						labelLine: {
							lineStyle: {
								color: 'white'
							},
						},
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(57,129,206, 0.5)'
							}
						}
					}]
				};
			},
			//index2  柱状图
			_getStandardization() {
				var opts = {
					type: this.type,
					number: this.number,
					scale: this.scaleValue
				};
				this.isShowRect = false;
				this.$http.post("standardization", opts).then(res => {
					var data = res.data;
					this.isShowRect = true;


					this.rect_option = {
						title: {
							text: '风险统计',
							textStyle: {
								color: "#fff",
								fontSize: 16
							}
						},
						color: ['rgb(49, 191, 248)'],
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							},

						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: ['冶金煤气', '粉尘涉爆', '高温熔融', '有限空间', '危险化学品', '特殊作业'],
							axisLine: {
								lineStyle: {
									type: 'solid',
									color: '#fff',
								}
							},
							axisLabel: {
								interval: 0, //横轴信息全部显示   
								rotate: 20,
								textStyle: {
									color: '#fff',
									fontSize: 12,
								}
							}
						}],
						yAxis: [{
							type: 'value',
							splitLine: {
								show: false
							}, //去除网格线
							splitArea: {
								show: false
							}, //保留网格区域
							axisLine: {
								lineStyle: {
									type: 'solid',
									color: '#fff',
									width: '2'
								}
							},
							axisLabel: {

								textStyle: {
									color: '#fff'
								}
							}
						}],
						series: [{
							name: '风险统计',
							type: 'bar',
							barWidth: '60%',
							barWidth: 20,
							data: [data.risk_7.total, data.risk_3.total, data.risk_5.total, data.risk_1.total, data.risk_4.total, data.risk_2
								.total
							],
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										textStyle: { //数值样式
											color: '#fff',
											fontSize: 16
										}
									}
								}
							}

						}]
					};
				});
			},
			//执法
			_getStatisticsZF() {
				var opts = {
					firstday: this.chageDateTime(false),
					lastday: this.chageDateTime(true),
					fxlb: '',
					admin_level: this.cityType,
					admin_number: this.cityNumber
				};
				this.$http.post("statisticsZF", opts).then(res => {
					var data = res.data;
					this.lawCount = data;
				});
			},
			//导航
			navClose(bool) {
				this.drawerVisible = bool;
			},
			//数字加逗号
			formatNum(str) {
				if (!str) {
					str = '';
				}
				str = '' + str;
				var newStr = "";
				var count = 0;
				for (var i = str.length - 1; i >= 0; i--) {
					if (count % 3 == 0 && count != 0) {
						newStr = str.charAt(i) + "," + newStr;
					} else {
						newStr = str.charAt(i) + newStr;
					}
					count++;
				}
				return newStr;
			},
			//获取时间
			chageDateTime(bool) {
				var time;
				var date = new Date();
				var year = date.getFullYear();
				var mon = date.getMonth();
				if (bool) { //true
					time = Math.floor((+new Date(`${year}/0${mon + 1}/01`)) / 1000);
				} else { //false 
					time = Math.floor((+new Date(`${year}/01/01`)) / 1000);
				}
				return time;
			},
			onPickerTimeTitle() {
				this.isShowPickerTime = true;
			},
			onClose() {
				this.isShowPickerTime = false;
			},
			onBtn(e) {
				this.isShowPickerTime = false;
				if (e.flag) {
					this.dateObject = e.obj;

				}
			},
			onPickerAddressTitle() {
				this.isShowPickerAddress = true;
			},
			onAddressClose() {
				this.isShowPickerAddress = false;
			},
			onAddressBtn(e) {
				this.isShowPickerAddress = false;
				this.isClearAdrress = false;
				if (e.flag) {
					this.addressInfo = e;
					this.addressInfoText = e.str;
					this.cityType = this.addressInfo.finalLevel;
					this.cityNumber = this.addressInfo.finalNumber;
					this._initData();
					this.log(e)
				}
			},
			onAddrClear() {
				this.addressInfoText = "请选择";
				this.isClearAdrress = true;
				this.addressInfo = {};
				if (this.breakClick(this.addressInfoText, "请选择")) {
					return;
				}
				this._initData();
			},
			onAddrInput() {
				this.$refs.addr.show();
			},
			onInputArrressClear() {
				this.addressInfo = {};
				this.cityNumber = "";
				this.cityType = "";
				this._initData();
			},
			////////////////////////////////////
			onPickerSelectTitle() {
				this.isShowPickerSelect = true;
				this.log("????????????/")
			},
			onSelectBtn(e) {
				this.isShowPickerSelect = false;
				if (e.flag) {
					this.currentSelect = e;
					this.currentSelectText = e.label;
					this.scaleValue = this.currentSelect.value;
					this._initData();
				}
			},
			onSlectClose() {
				this.isShowPickerSelect = false;
			},
			onSelectClear() {
				this.currentSelectText = "请选择";
				this.currentSelect = {};
				if (this.breakClick(this.currentSelect, "请选择")) {
					return;
				}
				this._initData();
			},
			/////////////////////企业总数======================
			onComTotal() {
				// cityNumber: '', //城镇编号
				// cityType: '', //城镇类型
				// scaleValue
				uni.navigateTo({
					url: `./indexPage/comTotal?total=${this.totalAndChartData.zs}&cityNumber=${this.cityNumber}&cityType=${this.cityType}&scaleValue=${this.scaleValue}`
				})
			},
			//
			onCount(item='', scale="") {
				// industry_category 
				var cat;
				if (item == '') {
					cat = '';
				}else {
					cat = item.name;
				}
				this.$store.commit("set_admin_index_addrInfo", this.addressInfo);
				var str = `industry_cat=${cat}&scale=${scale}`;
				uni.navigateTo({
					url: '../businessManagement/businessManagement?' + str
				})
			},
			/////////跳转企业管理/////////
			onManage(approval_status, bzh) {
				// var str = `city=${this.addressInfo.finalAddress || this.addressInfo.str}&cityNumber=${this.cityNumber}&cityType=${this.cityType}&status=${approval_status}&bzh=${bzh}`;
				// this.log(str, this.addressInfo) 
				this.$store.commit("set_admin_index_addrInfo", this.addressInfo);
				uni.navigateTo({
					url: '../businessManagement/businessManagement?status=' + approval_status + "&bzh=" + bzh,
					success() {
						this.log('scu')
					},
					fail(res) {
						this.log(res)
					}
				})
			},
			///////跳转执法统计
			onGoLaw() {
				this.$store.commit("set_admin_index_addrInfo", this.addressInfo);
				uni.navigateTo({
					url: '../law/lawCount',
					success() {
						this.log('scu')
					},
					fail(res) {
						this.log(res)
					}
				})
			},
			//////////////////////////////////////////////////////////
			breakClick(variable, str) {
				if (variable == str) {
					return false;
				}
				return true;
			},
			//图表
			echartsClick() {

			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.container {
		line-height: 24px;

		.index_com {
			padding: 0 10px;

			.commit_chart {
				background-image: url(../../../static/lanse.png);
				background-repeat: no-repeat;
				background-size: cover;
			}

			.a_t_risk_item_bt_right {
				// float: right;

				.a_t_risk_item_bt_right_wrap {
					margin:20upx 0;
					.a_t_risk_item_bt_right_item {
						// display: flex;
						// justify-content: space-between;
						// align-items: center;

						.a_t_risk_item_bt_right_item_color {
							width: 15px;
							height: 10px;
						}
						.gm_mode_info_wrap{
							width:184upx;
						}
						.a_t_risk_item_bt_right_item_text,
						.a_t_risk_item_bt_right_item_number {
							font-size: 13px;
						}
					}

				}
			}


		}

		.top_select {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;

			.i_c_sel {
				width: 40%;
			}

		}

		.center_table {

			.c_t {
				margin: 10px 0;
				background-size: cover;
				background-repeat: no-repeat;
				color: #fff;
				border-radius: 5px;
				overflow: hidden;

				&.c_total_wrap {
					background-image: url("../../../static/blue.png");
				}

				&.b_table_wrap {
					background-image: url("../../../static/orange.png");
				}

				&.l_table_wrap {
					background-image: url("../../../static/purple.png");
				}

				&.f_table_wrap {
					background-image: url("../../../static/green.png");
				}



				.i_title_year {
					display: flex;
					justify-content: space-between;
				}



				.cm_wrap {
					padding: 10px;

					.c_item {
						padding: 0 10px;
						display: flex;
						justify-content: space-between;
						line-height: 40px;
					}

					&.c_t_content_wrap {
						.c_t_left_num {
							float: left;
							width: 40%;
							height: 120px;
							line-height: 120px;
							text-align: center;
							font-size: 20px;
						}

						.c_t_right_list_wrap {
							float: right;
							width: 58%;
						}
					}

					.c_t_list_item:nth-child(even) {
						background-color: rgba(108, 158, 246, .7);
					}

					.b_t_list_wrap:nth-child(even) {
						background-color: rgba(250, 178, 149, .7);
					}

					.l_t_list_wrap:nth-child(odd) {
						background-color: rgba(178, 144, 245, .7);
					}

					.f_t_list_wrap:nth-child(even) {
						background-color: rgba(106, 246, 160, .7);
					}

					.f_t_list_wrap:nth-child(odd) {
						background-color: rgba(90, 196, 146, .7);
					}


				}
			}
		}

		.i_title,
		.i_title_year {
			position: relative;
			padding: 10px 20px;
			font-size: 16px;
			font-weight: bold;
			color: #fff;

			&::after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background: #fff;
				transform-origin: 0 0;
				transform: scaleY(0.5);
			}
		}

		.bottom_chart {
			.count_wrap {
				position: relative;
				background-image: url(../../../static/lineBlock.png);
				background-repeat: no-repeat;
				background-size: cover;

				.c_unit {
					position: absolute;
					top: 5px;
					right: 10px;
					color: #fff;
					font-size: 12px;
				}

				.ec-canvas {
					width: 700upx;
					height: 500upx;
				}
			}
		}
	}
</style>
