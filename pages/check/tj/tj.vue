<template>
	<view class="app_tj_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="风险分析"></uni-nav-bar>
		<view class="app_tj_wrap mar_top_10px">
			<view class="border_1px_all_ccc padding_5px border_radius_5 clearfix">
				<input type="text" placeholder="请选择地址" placeholder-style="color:#ccc" v-model="addressInfo.str" class="w_90_per  float_left"
				 disabled @click="onAddrInput" />
				<text class="w_10_per float_left text_align_center" @click="onInputArrressClear">X</text>
				<app-picker-address ref="addr" @onAddressBtn="onAddressBtn"></app-picker-address>
			</view> 
			<!-- 可燃性粉尘 -->
			<view class="a_t_risk_wrap">
				<view class="a_t_risk_item">
					<view class="a_t_risk_item_top clearfix">
						<view class="a_t_risk_item_left">可燃性粉尘（共：341家）</view>
						<view class="a_t_risk_item_right ">
							<app-picker-select class="a_t_risk_item_select" :selectData="industryCategory1Data" placeholder="请选择行业"
							 @onSelectClear="onSelectClear('industry_category1')" @onSelectBtn="onSelectBtn($event, 'industry_category1')"></app-picker-select>
							<app-picker-select-dust-type class="mar_top_5px" :initVal="fclb" :industry_category="industry_category1"
							 @onSelectBtn="onSelectDustTypeBtn($event, 'industry_category1', 'fclb')" @onSelectClose="onSelectDustTypeClose('industry_category1', 'fclb')"></app-picker-select-dust-type>
						</view>
					</view>
					<view class="a_t_risk_item_bt clearfix">
						<view class="a_t_risk_item_bt_left" :style="{ width: pieWidth + 'px'}">
							<app-echarts v-if="isShowChart1" :option="dust_option" style="height: 300px;" @click="echartsClick"></app-echarts>
						</view>
						<view class="a_t_risk_item_bt_right">
							<view class="a_t_risk_item_bt_right_wrap">
								<view class="a_t_risk_item_bt_right_item padding_bt_10px" v-for="(item, index) in combustibleDust" :key='index'
								 @click="onCount(industry_category1, 'krxfc', item, fclb, '', '')">
									<view class="a_t_risk_item_bt_right_item_color dis_inline_block" :style="{backgroundColor:colors[index]}"></view>
									<view class="a_t_risk_item_bt_right_item_text  dis_inline_block mar_left_right_5px">{{item.name}}</view>
									<view class="a_t_risk_item_bt_right_item_number  dis_inline_block">{{item.count}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 有限空间 -->
			<view class="a_t_risk_wrap">
				<view class="a_t_risk_item">
					<view class="a_t_risk_item_top clearfix">
						<view class="a_t_risk_item_left">有限空间（共：341家）</view>
						<view class="a_t_risk_item_right ">
							<app-picker-select class="a_t_risk_item_select" :selectData="industryCategory1Data" placeholder="请选择行业"
							 @onSelectClear="onSelectClear('industry_category2')" @onSelectBtn="onSelectBtn($event, 'industry_category2')"></app-picker-select>
							<app-picker-select class="a_t_risk_item_select mar_top_5px" :selectData="kjlbData" placeholder="选择空间类别"
							 @onSelectClear="onSelectClear('kjlb')" @onSelectBtn="onSelectBtn($event, 'kjlb')"></app-picker-select>

							<!-- <app-picker-select-dust-type class="mar_top_5px" :industry_category="industry_category1" @onSelectBtn="onSelectDustTypeBtn($event, 'industry_category2', 'kjlb')" @onSelectClose="onSelectDustTypeClose('industry_category2', 'kjlb')"></app-picker-select-dust-type> -->
						</view>
					</view>
					<view class="a_t_risk_item_bt clearfix">
						<view class="a_t_risk_item_bt_left" :style="{ width: pieWidth + 'px'}">
							<app-echarts v-if="isShowChart2" :option="space_option" style="height: 300px;" @click="echartsClick"></app-echarts>
						</view>
						<view class="a_t_risk_item_bt_right">
							<view class="a_t_risk_item_bt_right_wrap">
								<view class="a_t_risk_item_bt_right_item padding_bt_10px" v-for="(item, index) in limitedSpace" :key='index'
								 @click="onCount(industry_category2, 'yxkj', item, '', kjlb, '')">
									<view class="a_t_risk_item_bt_right_item_color dis_inline_block" :style="{backgroundColor:colors[index]}"></view>
									<view class="a_t_risk_item_bt_right_item_text  dis_inline_block mar_left_right_5px">{{item.name}}</view>
									<view class="a_t_risk_item_bt_right_item_number  dis_inline_block">{{item.count}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 高温熔融 -->
			<view class="a_t_risk_wrap">
				<view class="a_t_risk_item">
					<view class="a_t_risk_item_top clearfix">
						<view class="a_t_risk_item_left">高温熔融（共：341家）</view>
						<view class="a_t_risk_item_right ">
							<app-picker-select class="a_t_risk_item_select" :selectData="industryCategory1Data" placeholder="请选择行业"
							 @onSelectClear="onSelectClear('industry_category3')" @onSelectBtn="onSelectBtn($event, 'industry_category3')"></app-picker-select>
							<app-picker-select class="a_t_risk_item_select mar_top_5px" :selectData="jslbData" placeholder="选择金属类别"
							 @onSelectClear="onSelectClear('jslb')" @onSelectBtn="onSelectBtn($event, 'jslb')"></app-picker-select>
						</view>
					</view>
					<view class="a_t_risk_item_bt clearfix">
						<view class="a_t_risk_item_bt_left" :style="{ width: pieWidth + 'px'}">
							<app-echarts v-if="isShowChart3" :option="hight_option" style="height: 300px;" @click="echartsClick"></app-echarts>
						</view>
						<view class="a_t_risk_item_bt_right">
							<view class="a_t_risk_item_bt_right_wrap">
								<view class="a_t_risk_item_bt_right_item padding_bt_10px" v-for="(item, index) in highTemperature" :key='index'
								 @click="onCount(industry_category3, 'gwrr', item, '', '', jslb)">
									<view class="a_t_risk_item_bt_right_item_color dis_inline_block" :style="{backgroundColor:colors[index]}"></view>
									<view class="a_t_risk_item_bt_right_item_text  dis_inline_block mar_left_right_5px">{{item.name}}</view>
									<view class="a_t_risk_item_bt_right_item_number  dis_inline_block">{{item.count}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 冶金煤气 -->
			<view class="a_t_risk_wrap">
				<view class="a_t_risk_item">
					<view class="a_t_risk_item_top clearfix">
						<view class="a_t_risk_item_left">冶金煤气（共：341家）</view>
						<view class="a_t_risk_item_right ">
							<app-picker-select class="a_t_risk_item_select" :selectData="industryCategory1Data" placeholder="请选择行业"
							 @onSelectClear="onSelectClear('industry_category4')" @onSelectBtn="onSelectBtn($event, 'industry_category4')"></app-picker-select>
						</view>
					</view>
					<view class="a_t_risk_item_bt clearfix">
						<view class="a_t_risk_item_bt_left" :style="{ width: pieWidth + 'px'}">
							<app-echarts v-if="isShowChart4" :option="other1_option" style="height: 300px;" @click="echartsClick"></app-echarts>
						</view>
						<view class="a_t_risk_item_bt_right">
							<view class="a_t_risk_item_bt_right_wrap">
								<view class="a_t_risk_item_bt_right_item padding_bt_10px" v-for="(item, index) in other1" :key='index' @click="onCount(industry_category4, 'orther', item, '', '', '', 1)">
									<view class="a_t_risk_item_bt_right_item_color dis_inline_block" :style="{backgroundColor:colors[index]}"></view>
									<view class="a_t_risk_item_bt_right_item_text  dis_inline_block mar_left_right_5px">{{item.name}}</view>
									<view class="a_t_risk_item_bt_right_item_number  dis_inline_block">{{item.count}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 涉氨制冷 -->
			<view class="a_t_risk_wrap">
				<view class="a_t_risk_item">
					<view class="a_t_risk_item_top clearfix">
						<view class="a_t_risk_item_left">涉氨制冷（共：341家）</view>
						<view class="a_t_risk_item_right ">
							<app-picker-select class="a_t_risk_item_select" :selectData="industryCategory1Data" placeholder="请选择行业"
							 @onSelectClear="onSelectClear('industry_category5')" @onSelectBtn="onSelectBtn($event, 'industry_category5')"></app-picker-select>
						</view>
					</view>
					<view class="a_t_risk_item_bt clearfix">
						<view class="a_t_risk_item_bt_left" :style="{ width: pieWidth + 'px'}">
							<app-echarts v-if="isShowChart5" :option="other2_option" style="height: 300px;" @click="echartsClick"></app-echarts>
						</view>
						<view class="a_t_risk_item_bt_right">
							<view class="a_t_risk_item_bt_right_wrap">
								<view class="a_t_risk_item_bt_right_item padding_bt_10px" v-for="(item, index) in other2" :key='index' @click="onCount(industry_category5, 'orther', item, '', '', '', 2)">
									<view class="a_t_risk_item_bt_right_item_color dis_inline_block" :style="{backgroundColor:colors[index]}"></view>
									<view class="a_t_risk_item_bt_right_item_text  dis_inline_block mar_left_right_5px">{{item.name}}</view>
									<view class="a_t_risk_item_bt_right_item_number  dis_inline_block">{{item.count}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 危险化学品 -->
			<view class="a_t_risk_wrap">
				<view class="a_t_risk_item">
					<view class="a_t_risk_item_top clearfix">
						<view class="a_t_risk_item_left">危险化学品（共：341家）</view>
						<view class="a_t_risk_item_right ">
							<app-picker-select class="a_t_risk_item_select" :selectData="industryCategory1Data" placeholder="请选择行业"
							 @onSelectClear="onSelectClear('industry_category6')" @onSelectBtn="onSelectBtn($event, 'industry_category6')"></app-picker-select>
						</view>
					</view>
					<view class="a_t_risk_item_bt clearfix">
						<view class="a_t_risk_item_bt_left" :style="{ width: pieWidth + 'px'}">
							<app-echarts v-if="isShowChart5" :option="other3_option" style="height: 300px;" @click="echartsClick"></app-echarts>
						</view>
						<view class="a_t_risk_item_bt_right">
							<view class="a_t_risk_item_bt_right_wrap">
								<view class="a_t_risk_item_bt_right_item padding_bt_10px" v-for="(item, index) in other3" :key='index' @click="onCount(industry_category6, 'orther', item, '', '', '', 3)">
									<view class="a_t_risk_item_bt_right_item_color dis_inline_block" :style="{backgroundColor:colors[index]}"></view>
									<view class="a_t_risk_item_bt_right_item_text  dis_inline_block mar_left_right_5px">{{item.name}}</view>
									<view class="a_t_risk_item_bt_right_item_number  dis_inline_block">{{item.count}}家</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 企业其他信息（共：2571家） -->
		<view class="a_t_risk_img_wrap">
			<view class="a_t_risk_title">企业其他信息（共：2571家）</view>
			<view class="a_t_risk_img">
				<app-echarts v-if="isShowRect" :option="rect_option" style="height: 300px;" @click="echartsClick"></app-echarts>
			</view>
		</view>
		<view class="a_t_r_bt_wrap">
			<image src="../../../static/tj.png" mode=""></image>
		</view>

	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appPickerAddress from '@/components/app-picker/app-picker-address'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appPickerSelectDustType from "@/components/app-picker/app-picker-select-dust-type"

	import appEcharts from '@/components/app-echart/echarts'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				colors: ['#0E6DE9', '#AC4ED3', '#E6AF08', '#00AF6D', '#FF4545', '#F72880', '#01AFE1', '#FA5F1A'],
				drawerVisible: false, //导航显示
				addressInfo: {}, //城市信息
				cityType: '', //城市类型
				cityNumber: '', ///城市num
				industry_category1: '0',
				fclb: '',
				industry_category2: '0',
				kjlb: '',
				industry_category3: '0',
				jslb: '',
				industry_category4: '0',
				industry_category5: '0',
				industry_category6: '0',
				industryCategory1Data: [{
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
				combustibleDust: [], //可燃粉尘
				limitedSpace: [], //有限空间
				highTemperature: [], //高温熔融
				other1: [], //其他
				other2: [], //其他
				other3: [], //其他
				//空间类别
				kjlb: '',
				kjlbData: [{
					label: "化粪池",
					value: "化粪池",
					show: true,
				}, {
					label: "其他",
					value: "其他",
					show: true,
				}],
				// 金属类别 
				jslb: '',
				jslbData: [{
						label: "钢",
						value: "钢",
						show: true,
					}, {
						label: "铁",
						value: "铁",
						show: true,
					},
					{
						label: "铝",
						value: "铝",
						show: true,
					}, {
						label: "铜",
						value: "铜",
						show: true,
					},
					{
						label: "其他",
						value: "其他",
						show: true,
					}
				],
				rectData: [], //柱状图数据
				rect_noData: [], //柱状图数据
				///////////////////////////////////////////
				dust_option: {}, //可燃粉尘
				isShowChart1: false, //可燃粉尘 --- 图表

				space_option: {}, // 有限空间
				isShowChart2: false, //有限空间 --- 图表

				hight_option: {}, // 高温熔融
				isShowChart3: false, // 高温熔融 --- 图表

				//其他
				isShowChart4: false, //其他 --- 图表
				other1_option: {},
				isShowChart5: false,
				other2_option: {},
				isShowChart6: false,
				other3_option: {},
				
				
				/////柱状图
				rect_msum: ['标准化', '安责险', '安全三同时', '现状评价'],
				rect_option:[],
				isShowRect:false,
				/////////////////////////////////////////////
			}
		},
		components: {
			appNav,
			appPickerAddress,
			appPickerSelect,
			appPickerSelectDustType,
			appEcharts
		},
		computed: {
			...mapState(['admin_index_addrInfo']),
			pieWidth() {
				return uni.getSystemInfoSync().screenWidth - 20 - 130;
			},

		},
		onLoad() {
			this._initData();
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
				this._getInfo();
				this._getCombustibleDust();
				this._getLimitedSpace();
				this._getHighTemperature();
				this._getOther(1);
				this._getOther(2);
				this._getOther(3);
			},
			//企业其他信息
			_getInfo() {
				var opts = {
					number: this.cityNumber,
					type: this.cityType
				};
				this.rectData = [];
				this.rect_noData = [];
				this.isShowRect = false;
				this.$http.post('tinfo', opts).then(res => {
					if (res.code == 200) {
						var data = res.data.orther;
						this.isShowRect = true;
						if (data) {
							this.isShowRect = true;
							this.rectData.push(data.fire_inspection); //标准化 
							this.rectData.push(data.safety_inspection); //安全三同时
							this.rectData.push(data.safety_inspection_pj); //现状评价
							this.rectData.push(data.standardization); //安责险
							/////////////////////////////////////////////////////////// 
							this.rect_noData.push(data.fire_inspection_no);
							this.rect_noData.push(data.safety_inspection_no);
							this.rect_noData.push(data.safety_inspection_pj_no);
							this.rect_noData.push(data.standardization_no);

							this.rect_option = {
								color: ['#418EF2', '#FE8E4B'],
								tooltip: {
									trigger: 'axis',
									axisPointer: { // 坐标轴指示器，坐标轴触发有效
										type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
									}
								},
								legend: {
									data: ['有', '无'],
								},
								grid: {
									y2: 90 //增加柱形图纵向的高度
								}, 
								xAxis: [{
									type: 'category',
									data: this.rect_msum,
									axisLabel: {
										interval: 0, //横轴信息全部显示  
										rotate: -60, //-15度角倾斜显示  
									},
								}],
								yAxis: [{
									type: 'value',
								}, ],

								series: [{
										name: '有',
										type: 'bar',
										data: this.rect_noData,
										itemStyle: { 
											normal: {
												label: {
													formatter: "{a}",
													show: true,
													position: "top",
													textStyle: {
														fontWeight: "bolder",
														fontSize: "12",
														color: "#fff"
													}
												},
												opacity: 1
											}
										}

									},
									{
										name: '无',
										type: 'bar',
										data: this.rectData,
										itemStyle: {
											normal: {
												label: {
													formatter: "{a}",
													show: true,
													position: "top",
													textStyle: {
														fontWeight: "bolder",
														fontSize: "12",
														color: "#fff"
													}
												},
												opacity: 1
											}
										}
									},
								]
							};
							//////////////////////////////




						}
					}

				});
			},
			//可燃粉尘
			_getCombustibleDust() {
				var opts = {
					fclb: this.fclb,
					industry_category: this.industry_category1,
					number: this.cityNumber,
					type: this.cityType
				};
				var key = [];
				var val = [];
				this.isShowChart1 = false;
				this.$http.post('krxfc', opts).then(res => {
					if (res.code == 200) {
						this.combustibleDust = res.data.proportion;
						for (var i = 0; i < this.combustibleDust.length; i++) {
							var temp = this.combustibleDust[i];
							val.push({
								value: temp.count,
								name: temp.name
							});
						}
						this.isShowChart1 = true;
						this.dust_option = {
							color: this.colors,
							tooltip: {
								trigger: 'item',
								formatter: "{a} \n {b} : {c} ({d}%)",
								position: ["50%", "50%"]
							},
							calculable: true,
							series: [{
								name: '可燃性粉尘',
								type: 'pie',
								radius: [20, 60],
								center: ['50%', '50%'],
								roseType: 'radius',
								data: val,
								label: {
									normal: {
										position: "inner",
										show: false
										// show: true,
										// formatter: "{d}%",
									}
								}
							}]
						};
						//////////////////////
					}
				})
			},
			//有限空间
			_getLimitedSpace() {
				var opts = {
					kjlb: this.kjlb,
					industry_category: this.industry_category2,
					number: this.cityNumber,
					type: this.cityType
				};
				var val = [];
				this.isShowChart2 = false;
				this.$http.post('yxkj', opts).then(res => {
					if (res.code == 200) {
						this.limitedSpace = res.data.proportion;
						this.isShowChart2 = true;
						for (var i = 0; i < this.limitedSpace.length; i++) {
							var temp = this.limitedSpace[i];
							val.push({
								value: temp.count,
								name: temp.name
							});
						}
						this.space_option = {
							color: this.colors,
							tooltip: {
								trigger: 'item',
								formatter: "{a} \n{b} : {c} ({d}%)",
								position: ["50%", "50%"]
							},
							calculable: true,
							series: [{
								name: '有限空间风险',
								type: 'pie',
								radius: ['40%', '60%'],
								avoidLabelOverlap: false,
								label: {

									normal: {
										position: "inner",
										show: false

									},
								},
								data: val,
								itemStyle: {
									borderWidth: 5,
									borderColor: '#fff'
								}
							}],
						};
						////////////////////////////////////
					}
				});
			},
			//高温熔融
			_getHighTemperature() {
				var opts = {
					jslb: this.jslb,
					industry_category: this.industry_category3,
					number: this.cityNumber,
					type: this.cityType
				};
				var val = [];
				this.isShowChart3 = false;
				this.$http.post('gwrr', opts).then(res => {
					if (res.code == 200) {
						this.isShowChart3 = true;
						this.highTemperature = res.data.proportion;
						for (var i = 0; i < this.highTemperature.length; i++) {
							var temp = this.highTemperature[i];
							val.push({
								value: temp.count,
								name: temp.name
							});
						} 
						
						this.hight_option = {
							color: this.colors,
							tooltip: {
								trigger: 'item',
								formatter: "{a} \n{b} : {c} ({d}%)",
								position: ["50%", "50%"]
							},
							calculable: true,
							series: [{
								itemStyle: {
									borderWidth: 5,
									borderColor: '#fff'
								},
								name: '高温熔融风险',
								type: 'pie',
								radius: ['40%', '60%'],
								center: ['50%', '50%'],
								avoidLabelOverlap: false,
								label: {
									normal: {
										position: "inner",
										show: false
									},
									emphasis: {
										show: true,
										formatter: "{d}%"
									}
								},
								labelLine: {
									normal: {
										show: false
									}
								},
								data: val
							}]
						};
					}
				});
			},
			//其他
			_getOther(num) {
				var cat;
				if (num == '1') {
					cat = this.industry_category4;
					this.isShowChart4 = false;
				} else if (num == '2') {
					cat = this.industry_category5;
					this.isShowChart5 = false;
				} else if (num == '3') {
					cat = this.industry_category6;
					this.isShowChart6 = false;
				}
				var opts = {
					number: this.cityNumber,
					type: this.cityType,
					industry_category: cat,
					lb: num,
				};
				var val = [];

				this.$http.post('orther', opts).then(res => {
					if (res.code == 200) { 
						this._changeOther(num, res.data.proportion);
					}
				});
			},
			_changeOther(num, data) { 
				var col = this.colors;
				switch (num) {
					case 1:
						this.other1 = data;
						this.isShowChart4 = true; 
						this.other1_option = this._changeOtherChart(data, col, '冶金煤气'); 
						break;
					case 2:
						this.other2 = data;
						this.isShowChart5 = true; 
						this.other2_option = this._changeOtherChart(data, col, '涉氨制冷'); 
						break;
					case 3:
						this.other3 = data;
						this.isShowChart6 = true; 
						this.other3_option = this._changeOtherChart(data, col, '危险化学品'); 
						break;
				}
				
			},
			_changeOtherChart(data, color, name) {
				var val = [];
				var option = {}; 
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						val.push({
							value: data[i].count,
							name: data[i].name
						});
					}
			 
					option = {
						color,
						tooltip: {
							trigger: "item",
							formatter: "{a} \n{b} : {c} ({d}%)",
							position: ["30%", "50%"]
						},
						series: [{
							name,
							type: 'pie',
							radius: [20, 90],
							center: ['50%', '50%'],
							roseType: 'area',
							data: val,
							label: {
								normal: {
									position: "inner",
									show: false
								},
							},
						}]
					}
				} 
				return option;
			},
			/////////////////////address////////////////////
			onAddressBtn(e) {
				if (e.flag) {
					this.addressInfo = e;
					this.cityType = this.addressInfo.finalLevel;
					this.cityNumber = this.addressInfo.finalNumber;
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
			},
			onAddrInput() {
				this.$refs.addr.show();
			},
			/////////////////////select////////////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this[key] = e.value;
					this._changeSelect(key);
				}
			},
			_changeSelect(key) {
				switch (key) {
					case "industry_category1":
						this._getCombustibleDust();
						break;
					case "industry_category2":
						this._getLimitedSpace();
						break;
					case "industry_category3":
						this._getHighTemperature();
						break;
					case "industry_category4":
						this._getOther(1);
						break;
					case "industry_category5":
						this._getOther(2);
						break;
					case "industry_category6":
						this._getOther(3);
						break;
					case "kjlb":
						this._getLimitedSpace();
						break;
					case "jslb":
						this._getHighTemperature();
						break;
				}
			},
			onSelectClear(key) {
				this[key] = "";
				this._changeSelect(key);
			},
			onSelectDustTypeBtn(val, key, type) {
				this[type] = val;
				this._changeSelect(key);
			},
			onSelectDustTypeClose(key, type) {
				this[type] = "";
				this._changeSelect(key);
			},

			echartsClick() {

			},
			////////////////////点击条目/////////////////////////
			onCount(industry_cat, type, item, lb = "", kjlb = "", jslb = "", fxlb = "") {
				this.$store.commit("set_admin_index_addrInfo", this.addressInfo);
				var str = `industry_cat=${item.name}&risk_type=${type}&lb=${lb}&kjlb=${kjlb}&jslb=${jslb}&fxlb=${fxlb}`;
				uni.navigateTo({
					url: '../businessManagement/businessManagement?' + str
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_tj_container {
		.app_tj_wrap {
			padding: 0 10px 10px;

			.a_t_top_wrap {
				margin-top: 10px;
			}

			.a_t_risk_wrap {
				margin-top: 20upx;
				padding: 10upx;
				box-shadow: 0 0 3px #ccc;
				border-radius: 5px;

				.a_t_risk_item {
					.a_t_risk_item_top {
						.a_t_risk_item_left {
							float: left;
							font-size: 14px;
							font-weight: bold;
						}

						.a_t_risk_item_right {
							float: right;
							width: 105px;

							.a_t_r_i_s_bt {
								margin-top: 10px;
							}
						}
					}

					.a_t_risk_item_bt {
						margin-top: 10px;

						.a_t_risk_item_bt_left {
							float: left;
							height: 300px;
							border: 1px solid #ccc;
						}

						.a_t_risk_item_bt_right {
							float: right;

							.a_t_risk_item_bt_right_wrap {
								.a_t_risk_item_bt_right_item {
									// display: flex;
									// justify-content: space-between;
									// align-items: center;

									.a_t_risk_item_bt_right_item_color {
										width: 15px;
										height: 10px;
									}

									.a_t_risk_item_bt_right_item_text,
									.a_t_risk_item_bt_right_item_number {
										font-size: 13px;
									}
								}

							}
						}
					}
				}

			}
		}

		.a_t_risk_img_wrap {
			margin: 10px 0;

			.a_t_risk_title {
				text-align: center;
				font-size: 14px;
				font-weight: bold;
			}

			.a_t_risk_img {
				margin: 10px;
				// height: 100px;
				border: 1px solid #ccc;
			}
		}

		.a_t_r_bt_wrap {
			margin: 10px;

			image {
				width: 100%;
			}
		}
	}
</style>
