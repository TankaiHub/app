<template>
	<view class="app_common_table_container">
		<view class="common_table_wrap">
			<view class="base_info" v-if="baseData && baseData.length > 0">
				<scroll-view scroll-x="true">
					<app-title text="基本信息"> 
						<slot name="base"></slot>
					</app-title>
					<table cellspacing="0" class="border_1px_all_409eff width125">
						<tr v-for="(item, index) in baseData" :key='index'>
							<block v-for="(ele, indx) in item" :key='indx' v-if="ele.value != null && ele.show">
								<td class="border_1px_all_409eff font_weight_bold padding_5px border_right_none border_bottom_none" :style="{ width:ele.keyW+ 'px' }"
								 :class="{ border_left_none:indx == 0, border_top_none:index == 0 }">
									{{ele.key}}
								</td>
								<td :colspan="ele.col" class="border_1px_all_409eff padding_8px border_right_none border_bottom_none" :class="{ border_top_none:index == 0 }">
									{{ele.value}}
								</td>
							</block>

						</tr>
					</table>
				</scroll-view>
			</view>
			<view class="safety_info mar_bottom_10px mar_top_10px" v-if="safetyData && safetyData.length > 0">
				<scroll-view scroll-x="true">
					<app-title text="安全信息"> 
						<slot name="safety"></slot>
					</app-title>
					<table cellspacing="0" class="border_1px_all_409eff width125">
						<tr v-for="(item, index) in safetyData" :key='index'>
							<block v-for="(ele, indx) in item" :key='indx' v-if="ele.value != null && ele.show">
								<td class="border_1px_all_409eff font_weight_bold padding_5px border_right_none border_bottom_none" :style="{ width:ele.keyW + 'px' }"
								 :class="{ border_left_none:indx == 0, border_top_none:index == 0 }">
									{{ele.key}}
								</td>
								<td :colspan="ele.col" class="border_1px_all_409eff padding_8px border_right_none border_bottom_none" :class="{ border_top_none:index == 0 }">
									{{ele.value}}
								</td>
							</block>
						</tr>
					</table>
				</scroll-view>
			</view>
			<view class="risk_info  mar_bottom_10px mar_top_10px" v-if="riskData && riskData.length > 0">
				<scroll-view scroll-x="true">
					<app-title text="风险信息"> 
						<slot name="risk"></slot>
					</app-title>
					<show :bool="isShowTable" :baseAndSafetyInfoData="baseAndSafetyInfoData"></show>
				<!-- 	<table cellspacing="0" class="border_1px_all_409eff  width125">
						<tr v-for="(item, index) in riskData" :key='index'>
							<block v-for="(ele, indx) in item" :key='indx'>
							
								<td :rowspan="ele.row" v-if="ele.key != '' && ele.show" :style="{ width:ele.keyW + 'px' }" class="border_1px_all_409eff font_weight_bold padding_5px border_right_none border_bottom_none"
								 :class="{ border_left_none:indx == 0, border_top_none:index == 0 }">
									{{ele.key}}
								</td>
								<td :colspan="ele.col" v-if="ele.value != null && ele.show" class="border_1px_all_409eff padding_8px border_right_none border_bottom_none"
								 :class="{ border_top_none:index == 0 }">
									<text>{{ele.value}}</text>
								</td>
							</block>
						</tr>
					</table> -->
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import appTitle from "@/components/app-title/app-title"
	import cell from "./cell.js"
	import Show from "./show.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		produceTo
	} from "@/common/js/change.js"
	export default {
		props: {
			bar: {
				type: String,
				default: "",
			}
		},
		data() {
			return {
				isShowInfoEditBtn: true, //是否显示修改
				baseAndSafetyInfoData: {},
				isShowTable:false,
				riskInfoData: [],
				// riskData: [],
				commonCol: 3, //跨行
				isScale: false, // 个体
				//特殊作业
				hoistingData: [{
						checkName: '行车',
						checkValue: 'trainCheck',
						num: 'trainNum',
						numProp: 'trainNum',
						man: 'trainMan',
						manProp: 'trainMan'
					},
					{
						checkName: '叉车',
						checkValue: 'forkliftCheck',
						num: 'forkliftNum',
						numProp: 'forkliftNum',
						man: 'forkliftMan',
						manProp: 'forkliftMan'
					},
					{
						checkName: '其他',
						checkValue: 'otherCheck',
						num: 'otherNum',
						numProp: 'otherNum',
						man: 'otherMan',
						manProp: 'otherMan'
					},
				],
				dhData: [{
						checkName: '气焊(割)',
						checkValue: 'cutCheck',
						num: 'cutNum',
						out: 'cutOut',
						name: 'cutName',
						code: 'cutCode',
						type: 'cutType',
						contact: 'cutContact',
						phone: 'cutPhone'
					},
					{
						checkName: '电焊',
						checkValue: 'dcCheck',
						num: 'dcNum',
						out: 'dcOut',
						name: 'dcName',
						code: 'dcCode',
						type: 'dcType',
						contact: 'dcContact',
						phone: 'dcPhone'
					},
				],
				listData: [{
						title: '熔炉装置',
						data: [{
								checkName: '中频炉',
								checkValue: 'midCheck',
								num: 'midNum',
								maxNum: 'midMaxNum'
							},
							{
								checkName: '熔铝炉',
								checkValue: 'meltCheck',
								num: 'miltNum',
								maxNum: 'miltMaxNum'
							},
							{
								checkName: '冲天炉',
								checkValue: 'dayCheck',
								num: 'dayNum',
								maxNum: 'dayMaxNum'
							},
						]
					},
					{
						title: '炼钢炉',
						data: [{
								checkName: '平炉',
								checkValue: 'flatCheck',
								num: 'flatNum',
								maxNum: 'flatMaxNum'
							},
							{
								checkName: '转炉',
								checkValue: 'turnCheck',
								num: 'turnNum',
								maxNum: 'turnMaxNum'
							},
							{
								checkName: '电炉',
								checkValue: 'dcCheck',
								num: 'dcNum',
								maxNum: 'dcMaxNum'
							},
						]
					},
				],
				spaceFinalData: [],
				workFinalData: [],
				dustFinalData: [],
				dangerFinalData: [],
				highFinalData: [],
				clodFinalData: [],
				gasFinalData: []
			}
		},
		components: {
			appTitle,
			cell,
			Show
		},
		watch: {
			bar(nv) {
				if (nv == 'back') {
					this.isShowInfoEditBtn = false;
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			s_width() {
				return uni.getSystemInfoSync().windowWidth - 20 || 320;
			},
			industry() {
				var type = this.baseAndSafetyInfoData.industry_category_zfl || "";
				switch (type) {
					case '机械':
						return '可燃性粉尘,有限空间,高温熔融,煤气作业,特殊作业及特种设备,危险化学品';
					case '塑料':
						return '可燃性粉尘,有限空间,特殊作业及特种设备,危险化学品';
					case '纺织':
						return '可燃性粉尘,有限空间,特殊作业及特种设备,危险化学品';
					case '食品':
						return '有限空间,特殊作业及特种设备,可燃性粉尘,危险化学品,冷库';
					case '建材':
						return '可燃性粉尘,有限空间,特殊作业及特种设备,危险化学品';
					case '纸制品':
						return '可燃性粉尘,有限空间,高温熔融,特殊作业及特种设备,危险化学品';
					case '商贸':
						return '可燃性粉尘,有限空间,特殊作业及特种设备,危险化学品';
					case '轻工':
						return '可燃性粉尘,有限空间,高温熔融,特殊作业及特种设备,危险化学品';
					case '烟草':
						return '可燃性粉尘,有限空间,高温熔融,煤气作业,特殊作业及特种设备,危险化学品';
					case '冶金':
						return '可燃性粉尘,有限空间,高温熔融,煤气作业,特殊作业及特种设备,危险化学品';
					case '有色':
						return '可燃性粉尘,有限空间,高温熔融,煤气作业,特殊作业及特种设备,危险化学品';
					default:
						return '';
				}
			},
			baseData() {
				return this._getBaseInfo(this.baseAndSafetyInfoData);
			},
			safetyData() {
				return this._changeSafetyInfo(this.baseAndSafetyInfoData);
			},
			riskData() {
				var all = [];
				this._changeRiskInfo(this.riskInfoData);
				all.push(...this.dustFinalData);
				all.push(...this.spaceFinalData);
				all.push(...this.highFinalData);
				all.push(...this.gasFinalData);
				all.push(...this.workFinalData);
				all.push(...this.dangerFinalData);
				if (this.clodFinalData.length > 0) {
					all.push(this.clodFinalData); 
				}
				
				console.log(all, '++++')
				return all;
			},
		},
		created() {
			this._initData();
		},
		methods: {
			_initData() {
				var opts = {
					company_id: this.userInfo.company_id,
					//|| 2433,
					//2478,
					// 2433, 食品
					// 2282
				};
				this._getInfo(opts);
				this._getRiskInfo(opts);
			},
			_getInfo(opts) {
				this.isShowTable = false;
				this.$http.post('info', opts).then(res => {
					if (res.code == 200) {
						this.baseAndSafetyInfoData = res.data;
						if (this.baseAndSafetyInfoData.scale == 3) {
							this.isScale = true;
						}
						this.isShowTable = true;
					}
				});
			},
			_getRiskInfo(opts) {
				this.$http.post('riskInfo', opts).then(res => {
					if (res.code == 200) {
						this.riskInfoData = res.data;
					}
				});
			},
			//修改
			onEditInfo(num) {
				if (num == 1) {
					uni.navigateTo({
						url: '../writeData/base',
						fail(err) {
							console.log(err)
						}
					})
				} else if (num == 2) {
					uni.navigateTo({
						url: '../writeData/safety'
					})
				} else if (num == 3) {
					var url = this._changeGoToPage(this.baseAndSafetyInfoData.industry_category_zfl || "");
					uni.navigateTo({
						url,
						fail(err) {
							console.log(err)
						}
					})
				}
			},
			//基本信息
			_getBaseInfo(nv) {
				var base = nv;
				if (!base.id) return;
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var arr = [
					[this._changeTabelValue("企业名称", base['name'], half, keyW), this._changeTabelValue("社信代码", base['credit_code'],
						half, keyW)],
					[this._changeTabelValue("法人代表", base['cegal_person'], half, keyW), this._changeTabelValue("法人联系电话", base['phone'],
						half, keyW)],
					[this._changeTabelValue("注册地址", base['produce_address'], contentW, keyW, 3)],
					[this._changeTabelValue("生产经营地址", base['reg_address'], contentW, keyW, 3)],
					[this._changeTabelValue("从业人员", base['number_of_employees'], half, keyW), this._changeTabelValue("生产经营状态",
						produceTo(base.produce_state, base.produce_stop_reason), half, keyW, base['number_of_employees'] == (null ||
							undefined) ? 3 : 1)],
				];
				if (!this.isScale) {
					arr.push(
						[this._changeTabelValue("安全管理负责人", base['sp_principal'], half, keyW), this._changeTabelValue("安全管理负责人电话", base[
							'sp_principal_phone'], half, keyW)],

						[this._changeTabelValue("安全员", this._changeSecurity_officer(base['security_officer']), half, keyW), this._changeTabelValue(
							"上年产值", base['lastyear_value'] == "0.00" ? null : (base['lastyear_value'] + '万'), half, keyW)],

						[this._changeTabelValue("行业类别", base['industry_category'], half, keyW), this._changeTabelValue("主要工序", base[
							'main_process'], half, keyW)]
					);
				}


				arr.push([this._changeTabelValue("主营产品", this._changeMain_products(base['main_products']), contentW, keyW, 3)])
				return arr;
			},
			//安全信息
			_changeSafetyInfo(nv) {
				var base = nv;
				if (!nv.id) return;
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var propertyTo = {
						1: '自有',
						2: '租赁'
					},
					propertyCertTo = {
						1: '有',
						2: '无'
					},
					commonTo = {
						1: '是',
						2: '否'
					};
				var arr = [
					[this._changeTabelValue("厂房性质", propertyTo[base['factory_property']], half, keyW),
						this._changeTabelValue("主要能源", this._changeEnergy(base['energy']), half, keyW)
					],

					[this._changeTabelValue("是否通过消防验收", this._changeCommon(commonTo, base['fire_inspection']), half, keyW, this._changeCol(
							base['fire_hydrant'])),
						this._changeTabelValue("是否配备消火栓", this._changeCommon(commonTo, base['fire_hydrant']), half, keyW, this._changeCol(
							base['fire_inspection']))
					],

					[this._changeTabelValue("投保情况", this._changeInsurance(base['insured'], base['insuredOther']), half, keyW, this._changeCol(
							base['property_cert'])),
						this._changeTabelValue("房屋产权证", this._changeCommon(propertyCertTo, base['property_cert']), half, keyW, this._changeCol(
							base['insured']))
					],

					[this._changeTabelValue("职业卫生三同时", this._changeCommon(commonTo, base['health_inspection']), half, keyW, this._changeCol(
							base['health_inspection_pj']), false),
						this._changeTabelValue("职业卫生现状评价", '', half, keyW, this._changeCol(base['health_inspection_pj']), false)
					],

					[this._changeTabelValue("安全三同时", null, half, keyW, 1, false),
						this._changeTabelValue("安全现状评价", null, half, keyW, 1, false)
					],

					[this._changeTabelValue("安全生产标准化情况", null, half, keyW, 1, false),
						this._changeTabelValue("应急预案", null, half, keyW, 1, false)
					],
				];
				return arr;
			},
			//风险信息
			_changeRiskInfo(nv) {
				var all = [];
				for (var i = 0; i < nv.length; i++) {
					var temp = nv[i];
					var state = temp.state;

					if (state == 1) {
						var type = temp.type;
						var content = temp.content;

						if (content == "" || content == undefined || content == null || content == "{}") return;
						var obj = {};
						try {
							obj = JSON.parse(content);
						} catch (e) {
							this.log(e)
						}
						if (type == 1 && this.industry.indexOf('有限空间') !== -1) {
							if (obj.space) {
								var opts = obj.space;
								this.spaceFinalData = this._changeSpace1(opts)
								console.log(111111111)
							} else if (obj.space2) {
								var opts = obj.space2;
								this.spaceFinalData = this._changeSpace2(opts)
								console.log(2222222222)
							} else if (obj.space3) {
								var opts = obj.space3;
								console.log(333333333)
								var list = obj.infoData;
								this.spaceFinalData = this._changeSpace3(opts, list)
							}
							// this.log("循环 有限空间 风险信息", this.spaceFinalData)
						}
						if (type == 2 && this.industry.indexOf('特殊作业及特种设备') !== -1) {
							this.log(obj)
							if (obj.workOne != undefined) {
								var opts = obj.workOne;
								this.workFinalData = this._changeSpecialJob1(opts);
							} else if (obj.workTwo != undefined) {
								var opts = obj.workTwo;
								this.workFinalData = this._changeSpecialJob2(opts);
							}
							// this.log("循环 特殊作业及特种设备 风险信息", this.workFinalData)
						}
						if (type == 3 && this.industry.indexOf('可燃性粉尘') !== -1) {
							if (obj.dustOne != undefined) {
								var opts = obj.dustOne;
								this.dangerFinalData = this._changeDustOne(opts);
							} else if (obj.dustTwo != undefined) {
								var opts = obj.dustTwo;
								this.dangerFinalData = this._changeDustTwo(opts);
							}
							// this.log("循环 可燃性粉尘 风险信息", this.dangerFinalData)
						}
						if (type == 4 && this.industry.indexOf('危险化学品') !== -1) {
							var left = obj.leftData;
							var right = obj.rightData;
							var all = this._changeDanger(left, right);

							// this.dangerFinalData = all;
						}
						if (type == 5 && this.industry.indexOf('高温熔融') !== -1) {
							this.highFinalData = this._changeHigh(obj);
							// this.log("循环 高温熔融 风险信息", this.highFinalData)
						}
						if (type == 6 && this.industry.indexOf('冷库') !== -1) {
							var arr = this._changeColdStorage(obj);
							if (arr.length > 0) {
								this.clodFinalData = arr;
							}
							
							// this.log("循环 冷库 风险信息", this.clodFinalData)
						}
						if (type == 7 && this.industry.indexOf('煤气作业') !== -1) {
							this.gasFinalData = this._changeGasWork(obj);
							// this.log("循环 煤气作业 风险信息", this.gasFinalData)
						}

					}
				}
			},
			//危险化学品
			_changeDanger(leftArr, rightArr) {
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var left = this._changeDangerArray(leftArr, "气体类", w, keyW);
				// var right = this._changeDangerArray(rightArr,  '液体类/固体类', w, keyW);
				var right = [];
				var all = [];
				left[0][0].row = left.length || 0;
				// right[0][0].row = right.length || 0;
				all.push([this._changeTabelValue("危险化学品", null, w, keyW)]);
				// all.push(...left, ...right);
				all.push(...left);
				all[0][0].row = all.length;
				return all;
			},
			_changeDangerArray(arr, str, w, keyW) {
				var narr = [];
				var specialTo = {
					1: '有专用库房存放',
					2: '无专用库房存放'
				};
				var purposeTo = {
					1: '制冷',
					2: '其他'
				};
				var saveTo = {
					1: '瓶',
					2: '罐',
					3: '箱'
				};
				var sinUnitTo = {
					1: 'm³',
					2: '㎏',
					3: 'L'
				};
				var _self = this;
				narr.push([this._changeTabelValue(str, null, w, keyW)]);
				var index = 0;
				var ele = [];
				for (var i = 0; i < arr.length; i++) {
					var temp = arr[i];
					if (temp['value']) {
						var cur = temp.data;
						ele.push(
							[this._changeTabelValue(temp['name'], null, w, keyW)],
							[this._changeTabelValue('', '存储方式:' + saveTo[cur.save], w, keyW),
								this._changeTabelValue('', '数量：' + cur.maxNum || 0, w, keyW)
							],
							[this._changeTabelValue('', '容积：' + cur.sinNum || 0, w, keyW),
								this._changeTabelValue('', specialTo[cur.special] || '未获取到库房存放数据', w, keyW)
							]
						);
						if (cur.special == 1) {
							ele.push([this._changeTabelValue('', '库房数量：' + cur.specialNum || 0, w, keyW)]);
						}
						ele.push([this._changeTabelValue('', cur.source == 1 ? `购买于：${this._getBuyCompany(cur.companyData)}` : '自主生产', w,
							keyW)]);
					}
				}

				narr.push(...ele)
				narr[0][0].row = narr.length;
				// console.log(narr)
				return narr;

				// for (var i = 0; i < arr.length; i++) {
				// 	var temp = arr[i];
				// 	if (temp['value']) {
				// 		var cur = temp.data;
				// 		ele[index] = []
				// 		ele[index].push([
				// [ this._changeTabelValue(temp['name'], null, w, keyW) ],
				// 		 [ this._changeTabelValue('', '存储方式:' + saveTo[cur.save], w, keyW),
				// 		   this._changeTabelValue('',  '数量：' + cur.maxNum || 0, w, keyW)],
				// 		[this._changeTabelValue('',  '容积：' + cur.sinNum || 0, w, keyW),
				// 		 this._changeTabelValue('',  specialTo[cur.special] || '未获取到库房存放数据', w, keyW)]


				// 		]
				// 		);
				// 		if (cur.special == 1) {
				// ele[index].push([this._changeTabelValue('', '库房数量：' + cur.specialNum || 0, w, keyW, 2)]);
				// 		}
				// ele[index].push([this._changeTabelValue('', cur.source == 1 ? `购买于：${this._getBuyCompany(cur.companyData)}` : '自主生产', w, keyW)]);
				// 		index ++;
				// 	}
				// } 


				// return narr;
			},

			///获取购买公司  -  危险化学品
			_getBuyCompany(data) {
				var temp = [];
				data.forEach(item => {
					temp.push(`\n单位名称:${item.buyCompany};信用代码:${item.code};联系人:${item.name};联系电话:${item.phone}`)
				})
				if (temp.length > 0) {
					return temp.join(',')
				} else {
					return '';
				}
			},
			myTypeof(target) {
				var template = {
					"[object Array]": "array",
					"[object Object]": "object",
					"[object Number]": "number - object",
					"[object Boolean]": "boolean - object",
					"[object String]": "string - object"
				};
				if (target == null) {
					return "null"
				} else if (typeof(target) == "object") {
					var str = Object.prototype.toString.call(target);
					return template[str];
				} else {
					return typeof(target);
				}
			},
			//_changeHigh 高温熔融
			_changeHigh(opts) {
				this.log(opts, '高温熔融');
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var speciesTo = {
					1: '钢',
					2: '铁',
					3: '铝',
					4: '铜',
					5: '其他',
				};
				var pouringTo = {
					1: '全自动机械浇筑',
					2: '人工浇筑',
					3: '全自动机械浇筑+人工浇筑'
				}
				var all = [];
				var temp = [];

				all.push(
					[this._changeTabelValue("高温熔融", null, w, keyW)],
					[this._changeTabelValue("浇筑方式", pouringTo[opts.pouring], w, keyW, 3)],
					[this._changeTabelValue("熔炼金属种类", opts.species == 5 ? opts.speciesOther : speciesTo[opts.species], w, keyW, 3)],
					[this._changeTabelValue("高温熔融金属转运方式", this._changeArray2Str(opts.turnType), w, keyW, 3)],
				);
				for (var i = 0; i < this.listData.length; i++) {
					var item = this.listData[i].data;
					for (var j = 0; j < item.length; j++) {
						var ele = item[j];
						if (opts[ele['checkValue']]) {
							temp[0] = [this._changeTabelValue("熔炉装置", null, w, keyW)];
							temp.push([
								this._changeTabelValue(ele['checkName'], null, w, keyW),
								this._changeTabelValue("", opts[ele['num']] + '个', w, keyW),
								this._changeTabelValue("", '最大熔炼量:' + opts[ele['maxNum']], w, keyW)
							])
						}
					}
				}
				if (temp.length > 0) {
					temp[0][0].row = temp.length;
					all.push(...temp);
				}
				all[0][0]['row'] = all.length;
				return all;
			},
			//拼接用电 _changeSpecialJob1
			_Splicing(obj, w, keyW) {
				console.log(obj['state'], obj['useDcSelect'] == 1,obj['type'] == 1, obj)
				var str = '';
				var arr = [];
				if (obj['state']) {
					if (obj['useDcSelect'] == 1) {
						if (obj['type'] == 1) {
							str += `单位名称:${obj.name};信用代码:${obj.code};联系人:${obj.content};联系电话:${obj.phone}`
						} else {
							str += `姓名:${obj.name}; 特种作业操作证编号:${obj.code};联系电话:${obj.phone}`
						}
						arr.push( [ this._changeTabelValue("", `作业人员${obj.useDcNum}名`, w, keyW),
									this._changeTabelValue("", str || null, w, keyW, 2)] );
					}else {
						arr.push([
								  this._changeTabelValue("", `作业人员${obj.useDcNum}名`, w, keyW, 3)]);
					}
				}  
				
				return arr;
			},
			//特殊作业及特种设备 1
			_changeSpecialJob1(opts) {
				this.log(opts, '特殊作业及特种设备 1');
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var all = [];
				all.push([this._changeTabelValue("特殊作业", null, w, keyW)]);
				////////////用电/////////////////
				var electricityArr = [  
					[this._changeTabelValue('用电', null, w, keyW)]
				];
				var electricityTempArr = [];
				var obj = {
					code: opts.ydCode,
					content: opts.ydContact,
					name: opts.ydName,
					phone: opts.ydPhone,
					state: opts.ydState,
					type: opts.ydType,
					useDcSelect: opts.useDcSelect,
					useDcNum: opts.useDcNum
				};
				electricityTempArr.push(...this._Splicing(obj)); 
				electricityArr.push(...electricityTempArr);
				////////////用电///////////////// 


				////////////////动火作业////////////////
				var fireArr = [
					[this._changeTabelValue('动火作业', null, w, keyW)]
				];
				var fireTempArr = this._comparedCommon(opts, this.dhData);
				var f_temp = []
				for (var  i = 0; i < fireTempArr.length; i ++) {
					f_temp.push([this._changeTabelValue(fireTempArr[i]['name'], null, w, keyW), 
						   this._changeTabelValue('', `作业人员${fireTempArr[i]['value']}名`, w, keyW, 2)
						   ])
				}
				fireArr.push(...f_temp);
				////////////////动火作业////////////////
				
				/////////////吊装转运///////////
				var devicArr = [ //吊装转运
					[this._changeTabelValue('吊装转运', null, w, keyW)]
				];
				var devicTempArr = this._comparedCommon(opts, this.hoistingData, false, 'ts');
				this._specialFillArr(devicArr, devicTempArr);
				/////////////吊装转运///////////
				var tsArr = [ /// 特种设备/
					[this._changeTabelValue('特种设备', null, w, keyW)]
				];
				
				var tsTempArr = this._comparedCommon(opts, opts.deviceData, false, 'ts');
				this._specialFillArr(tsArr, tsTempArr);
 
				electricityArr[0][0]['row'] = electricityArr.length;
				fireArr[0][0]['row'] = fireArr.length;
				devicArr[0][0]['row'] = devicArr.length;
				tsArr[0][0]['row'] = tsArr.length;
				if (electricityArr.length > 0) {
					all.push(...electricityArr);
				}
				if (fireArr.length > 1) {
					all.push(...fireArr);
				}
				if (devicArr.length > 1) {
					all.push(...devicArr);
				}
				if (tsArr.length > 0) {
					all.push(...tsArr);
				} 
				all[0][0]['row'] = all.length;
				return all;
			},
			//特殊作业及特种设备 2
			_changeSpecialJob2(opts) {
				this.log(opts, "特殊作业及特种设备 2");
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var all = [];

				var fireTempArr = [
					[this._changeTabelValue('动火作业', null, w, keyW)]
				];
				var devicTempArr = [
					[this._changeTabelValue('吊装转运', null, w, keyW)]
				]; //吊装转运
				var electricityArr = [
					[this._changeTabelValue('电工作业', null, w, keyW)]
				];
				var fireArr = this._comparedCommon(opts, this.dhData, true);
				this._commonSpecialJob(all, opts, w, keyW, devicTempArr);
				this._fillArr(fireTempArr, fireArr, w, keyW, true, 'ts');

				electricityArr.push([
					this._changeTabelValue('', `${opts.uniqueSelect == 1 ? '有' : '无'}专用变电站/配电房(室)`, w, keyW, this.commonCol)
				]);
				if (opts.uniqueSelect == 1) {
					electricityArr.push([
						this._changeTabelValue('', opts.uniqueWork == 1 ? '自有电工作业' : '外包电工作业', w, keyW),
						this._changeTabelValue('', `作业人员${opts.uniqueWorkNum}名`, w, keyW, this.commonCol - 1),
					]);
				}

				fireTempArr[0][0]['row'] = fireTempArr.length;
				this.log(fireTempArr, "????????????????????")
				electricityArr[0][0]['row'] = electricityArr.length;
				all.push(...electricityArr);
				if (fireTempArr.length > 1) {
					all.push(...fireTempArr);
				}
				if (devicTempArr.length > 1) {
					all.push(...devicTempArr);
				}
				all[0][0]['row'] = all.length;
				return all;
			},
			_commonSpecialJob(all, opts, w, keyW, devicTempArr) {
				var deviceData = opts.deviceData;
				var devicegArr = this._comparedCommon(opts, deviceData, false, 'ts');

				all.push([this._changeTabelValue("特殊作业", null, w, keyW)]);

				this._specialFillArr(devicTempArr, devicegArr);

				devicTempArr[0][0]['row'] = devicTempArr.length;

			},
			//特殊作业 填充arr
			_specialFillArr(arr, sourceArr, w, keyW) {
				var temp = [];
				for (var i = 0; i < sourceArr.length; i++) {
					temp.push([this._changeTabelValue(sourceArr[i]['name'], null, w, keyW),
						this._changeTabelValue("", '数量' + sourceArr[i]['value'] + '台', w, keyW),
						this._changeTabelValue("", '作业人员' + sourceArr[i]['man'] + '名', w, keyW)
					]);
				}
				arr.push(...temp);
			},
			//有限空间 -- Space1
			_changeSpace1(opts) {
				this.log(opts)
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var all = [];
				var list = opts.listData;
				var listArr = this._comparedCommon(opts, list, true);
				all.push([this._changeTabelValue("有限空间", null, w, keyW)]);
				this._fillArr(all, listArr, w, keyW, true);
				this.log(listArr, '1111111111')
				all[0][0].row = all.length;
				return all;
			},
			//有限空间 -- Space2
			_changeSpace2(opts) {
				this.log(opts, "有限空间 -- Space2");
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var leftData = opts.leftData;
				var rightBotData = opts.rightBotData;
				var rightTopData = opts.rightTopData;
				var leftArr = this._comparedCommon(opts, leftData);
				var rightBotArr = this._comparedCommon(opts, rightBotData);
				var rightTopArr = this._comparedCommon(opts, rightTopData);
				this.log(leftArr, rightBotArr, rightTopArr);
				var all = [];
				all.push([this._changeTabelValue("有限空间", null, w, keyW)]);
				this._fillArr(all, leftArr, w, keyW);
				this._fillArr(all, rightBotArr, w, keyW);
				this._fillArr(all, rightTopArr, w, keyW);
				all[0][0].row = all.length;
				return all;
			},
			//有限空间 -- Space3
			_changeSpace3(opts, list) {
				this.log(opts, list)
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var all = [];
				var listArr = this._comparedCommon(opts, list, true);
				all.push([this._changeTabelValue("有限空间", null, w, keyW)]);
				this._fillArr(all, listArr, w, keyW, true);
				all[0][0].row = all.length;
				return all;
			},
			//填充 有限空间 -- Space 数组  从0开始的异世界
			_fillArr(all, arr, w, keyW, out = false, state) {
				var len = arr.length;
				var temp = [];
				var outTo = {
						1: '是',
						2: '不是'
					},
					typeTo = {
						1: '企业',
						2: '个人'
					};
				for (var i = 0; i < len; i++) {
					if (out) {
						var str = ``;
						if (arr[i]['out'] == '1') {
							str =
								`${ outTo[arr[i]['out']] }外包作业；
									  承包方类型：${ typeTo[arr[i]['out']] }；
									  ${ arr[i]['type'] == 1 ? '信用代码' : '特种作业操作证编号' }：${ arr[i]['code'] }；
									  ${ arr[i]['type'] == 1 ?  '联系人：' + arr[i]['contact'] : '' }
									  联系电话：${ arr[i]['phone'] }`;
						} else {
							str = `${ outTo[arr[i]['out']] }外包作业；`;
						}


						if (state == 'ts') {
							this.log(arr[i], "================")
							temp.push([
								this._changeTabelValue(arr[i]['name'], null, w, keyW),
								this._changeTabelValue("", '作业人员' + arr[i]['num'] + '名', w, keyW),
								this._changeTabelValue('', str, w, keyW, 2)
							])
						} else {
							temp.push([this._changeTabelValue(arr[i]['name'], arr[i]['value'] + '个', w, keyW),
								this._changeTabelValue('', str, w, keyW, 2)
							])
						}

					} else {

						temp.push(this._changeTabelValue(arr[i]['name'], arr[i]['value'] + '个', w, keyW))
					}
				}
				if (out) {
					all.push(...temp)
				} else {
					var originArr = [];
					this.handleArr(temp, originArr, 2);
					all.push(...originArr);
				}

			},
			//数组 拆分 根据num拆分 最终返回新数组
			/**
			 * @param {Object} arr 源数组
			 * @param {Object} oarr 新数组
			 * @param {Object} num 每次拆分的个数
			 */
			handleArr(arr, oarr, num) {
				if (arr.length == 0) {
					return oarr;
				} else {
					oarr.push(arr.splice(0, num));
					for (var i = 0; i < oarr.length; i++) {
						if (oarr[i].length == 1) {
							oarr[i][0]['col'] = 3;
						}
					}
					this.handleArr(arr, oarr, num);
				}
			},
			//对比对象和数组中相同 再将相同的返回 
			_comparedCommon(opts, arr, out = false, state) {
				var narr = [];
				for (var prop in opts) {
					for (var i = 0; i < arr.length; i++) {
						var temp = arr[i];
						if (prop == temp['checkValue']) {
							if (opts[temp['checkValue']]) {
								if (out) {
									narr.push({
										name: temp['checkName'],
										value: opts[temp['num']],
										out: opts[temp['out']], //是否外包作业
										type: opts[temp['type']], //承包方类型
										unitOrCompanyName: opts[temp['name']], //'单位名称'  '个人姓名'
										code: opts[temp['code']], //'信用代码'  '特种作业操作证编号'
										phone: opts[temp['phone']], //联系电话
										contact: opts[temp['contact']] || '', //联系人
										num: opts[temp['num']] || '', //作业人数
									});
								} else {
									if (state == 'ts') { //特殊作业
										narr.push({
											name: temp['checkName'],
											value: opts[temp['num']],
											man: opts[temp['man']], //作业人数
										});
									} else {
										narr.push({
											name: temp['checkName'],
											value: opts[temp['num']]
										});
									}
								}
							}
						}
					}
				}
				return narr;
			},
			//  //可燃性粉尘
			_changeDustOne(opts) {
				this.log(opts, '可燃性粉尘_changeDustOne');
				if (opts.dustType[0] == '无') return;
				let dustOutTo = {
						1: '湿式除尘',
						2: '干式除尘',
						3: '不除尘'
					},
					dustClearTo = {
						1: '人工',
						2: '机器',
						3: '人工和机器',
						4: '不清灰'
					},
					setDustTo = {
						1: '中央集尘',
						2: '工位独立集尘',
						3: opts.setDustOther
					},
					suckDustTo = {
						1: '正压吹送',
						2: '负压吸尘'
					},
					dustModeTo = {
						1: '沉降室',
						2: '旋风除尘',
						3: '布袋除尘',
						4: '其他'
					},
					windTo = {
						1: '机械通风',
						2: '自然通风'
					};
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var all = [];
				this._changeCommonDust(opts, all, w, keyW);
				var mode = [this._changeTabelValue('清灰方式', dustClearTo[opts.dustClear], w, keyW)];
				if (opts.dustClear != 3) {
					mode[0].col = 1;
					mode.push(this._changeTabelValue('清灰次数', (opts.dustNum && opts.dustNum > 0) ? (opts.dustNum + '次/天') : '不清洗', w,
						keyW))
				}
				// all.push(mode);
				if (opts.dustOut == 1 || opts.dustOut == 2) {
					mode.push(this._changeTabelValue("主要集尘方式", setDustTo[opts.setDust], w, keyW),
						this._changeTabelValue("数量", opts.postNum + '套', w, keyW),
						this._changeTabelValue("吸尘方式", suckDustTo[opts.suckDust], w, keyW),
						this._changeTabelValue("防爆设施", this._changeArray2Str(opts.poom, opts.poomOther, '其他'), w, keyW)
					);
					if (opts.dustOut == 2) {
						mode.push(
							this._changeTabelValue("除尘方式", this._changeArray2Str(opts.dustMode), w, keyW, 3)
						);
					}
				} else if (opts.dustOut == 3) {
					mode.push(this._changeTabelValue("车间通风方式", windTo[opts.wind], w, keyW));
				}
				var arr = [];
				this.handleArr(mode, arr, 2);
				all.push(...arr);
				all[0][0].row = all.length;
				return all;
			},
			// //可燃性粉尘-食品
			_changeDustTwo(opts) {
				this.log(opts, "可燃性粉尘-食品_changeDustTwo")
				if (opts.dustType[0] == '无') return;
				var setDustTo = {
						1: '中央集尘',
						2: '分散集尘',
						3: '不集尘'
					},
					dustLandTo = {
						1: '尘降室',
						2: '集尘器',
						3: '布袋'
					},
					dustFaciTo = {
						1: '布袋',
						2: '过滤器',
						3: '旋风除尘'
					};
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var all = [];
				this._changeCommonDust(opts, all, w, keyW);
				var temp = [];
				if (opts.dustOut == 1) {
					temp.push(this._changeTabelValue('出尘设备', opts.dustEqui + '套', w, keyW), this._changeTabelValue('作业人数', opts.workNum,
						w, keyW));
				} else if (opts.dustOut == 2) {
					temp.push(this._changeTabelValue('集尘方式', setDustTo[opts.setDust], w, keyW));
					if (opts.setDust == 1) {
						all.push([this._changeTabelValue('主要尘降设施', dustLandTo[opts.dustLand], w, keyW),
							this._changeTabelValue('防爆设施', this._changeArray2Str(opts.preventExp), w, keyW)
						]);
					} else if (opts.setDust == 2) {
						temp.push(this._changeTabelValue('集尘设施', dustFaciTo[opts.dustFaci], w, keyW));
					} else if (opts.setDust == 3) {
						temp.push(this._changeTabelValue('工位', opts.postNum + '个', w, keyW));
					}
				}
				if (temp.length == 1) {
					temp.push(this._changeTabelValue('粉尘清洗频次', `每天${opts.dustRinseNum || 0}次`, w, keyW));
				} else {
					all.push([this._changeTabelValue('粉尘清洗频次', `每天${opts.dustRinseNum || 0}次`, w, keyW, 3)]);
				}
				all.push(temp);

				all[0][0].row = all.length;
				return all;
			},
			//可燃性粉尘 -- 共用部分
			_changeCommonDust(opts, all, w, keyW) {
				all.push([this._changeTabelValue("可燃性粉尘", null, w, keyW),
						this._changeTabelValue("粉尘类别", this._changeArray2Str(opts.dustType, opts.dustOther, '其他:'), w, keyW),
						this._changeTabelValue("厂房结构", this._changeArray2Str(opts.homeStru), w, keyW)
					],
					[this._changeTabelValue("涉尘车间最多人数", opts.maxNum, w, keyW),
						this._changeTabelValue("除尘方式", opts.dustType == 1 ? '湿式' : '干式', w, keyW)
					]);
			},
			//冷库
			_changeColdStorage(obj) {
				let zlTo = {
					1: '液氨',
					2: '氟利昂R12',
					3: '氟利昂R22',
					4: '二氧化碳',
					5: '其他'
				};
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var arr = [];
				
				if (obj.lkSelct == 1) {
					console.log(obj, "?????????????/")
					arr = [this._changeTabelValue("冷库", null, w, keyW),
						   this._changeTabelValue("制冷剂", zlTo[obj['zljSelect']], w, keyW, 3)
					]
				}
				
				return arr;
			},
			//煤气作业
			_changeGasWork(dataS) {
				var listData = dataS.listData;
				var arr = [];
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var all = [];
				var _gas = [this._changeTabelValue("煤气作业", null, w, keyW), this._changeTabelValue("产能(万吨)", dataS.num, w, keyW, 4)];
				all.push(_gas);
				var temp = [];
				for (var i = 0; i < listData.length; i++) {
					var ele = listData[i];
					if (dataS[ele['checkValue']]) {
						temp[0] = [this._changeTabelValue("煤气锅炉", null, w, keyW)];
						// console.log(ele['checkName'], '煤气作业')
						temp.push([
							this._changeTabelValue(ele['checkName'], null, w, keyW),
							this._changeTabelValue("", dataS[ele['num']] + '个', w, keyW),
							this._changeTabelValue("", ele['specName'] + ':' + dataS[ele['specNum']], w, keyW, 2)
						])
					}
				}
				if (temp.length > 0) {
					temp[0][0].row = temp.length;
					all.push(...temp);
				}
				all[0][0]['row'] = all.length;
				return all;
			},
			// 是or否 有or无
			_changeCommon(toOBJ, str) {
				if (str == undefined || str == null || str == '') return null;
				return toOBJ[str];
			},
			_changeCol(str) {
				if (str == undefined || str == null || str == '') return 3;
				return 1;
			},
			//array --> str
			_changeArray2Str(arr, arr1, str) {
				if (arr == null || arr == undefined) return null;
				var narr = [];
				narr.push(arr.join(','));
				if (arr1 && arr1.length > 0) {
					var type = typeof arr1;
					if (type == "object") {
						narr.push(str + arr1.join(','));
					} else if (type == 'string') {
						narr.push(str + arr1);
					}
				}
				if (narr && narr.length > 0) {
					return narr.join(',');
				} else {
					return null;
				}

			},

			//主营产品
			_changeMain_products(str) {
				if (str == undefined || str == null || str == '' || str == ',') return null;
				var arr = str.split(",");
				var result = '';
				for (var i = 0; i < arr.length; i++) {
					var temp = arr[i].split('-');
					if (i == 0) {
						result = temp[1];
					} else {
						result += ", " + temp[1];
					}
				}
				return result;
			},
			//安全员
			_changeSecurity_officer(str) {
				if (str == undefined || str == null || str == '' || str == ',') return null;
				var arr = str.split(",");
				return `专职${arr[0]}名;兼职${arr[1]}名`;
			},
			//能源
			_changeEnergy(str) {
				if (str == null || str == undefined || str == "") return null;
				var arr;
				var nstr = '';
				try {
					arr = str.split(',');
					var energr = arr[0] || "";
					var enArray = energr.split('-');
					var typeTo = {
						1: '电',
						2: '天然气',
						3: '煤',
						4: '液化石油气',
						5: '醇基燃料',
						6: '生物燃料'
					};
					var unitTo = {
						1: 'm³',
						2: '㎏',
						3: 'L'
					};
					// this.energy2 + "," + this.energy3 + ',' + this.energy4 + ',' + this.energy4Unit + ',' + this.energy5;
					var narr = [];
					for (var i = 0; i < enArray.length; i++) {
						var temp = enArray[i];
						if (temp == 1) {
							//电
							narr.push(typeTo[temp] + `(${ arr[4] == 1 ? '有配电房' : '无配电房' })`);
						}
						if (temp == 2) {
							//天然气
							narr.push(typeTo[temp] +
								`(${arr[1] == 1 ? '管输' : '罐装-' + (arr[2] == 1 ? '自产' : '外购') + '-最大存储量' + arr[3] + unitTo[arr[5]]})`)
						} else {
							narr.push(typeTo[temp]);
						}
					}

				} catch (e) {
					this.log(e, 'common-table -- _changeEnergy')
				}
				return narr.join(',');
			},
			//保险
			_changeInsurance(str, other) {
				var insured = {
					0: '无',
					1: '工伤保险',
					2: '安全生产责任险'
				};
				if (str == "" || str == undefined || str == null) return null;
				if (other == "" || other == undefined || other == null) {
					other = '无';
				}
				var arr,
					narr = [];
				try {
					arr = str.split(",");
					for (var i = 0; i < arr.length; i++) {
						var temp = arr[i];
						if (temp == 3) {
							narr.push(`其他:${other}`);
						} else {
							narr.push(insured[temp]);
						}
					}
				} catch (e) {
					//TODO handle the exception
					this.log(e, "_changeInsurance");
				}
				return narr.join(',');
			},

			/**
			 * key 
			 * val
			 * w  val所占的宽度
			 * keyW key所占的宽度
			 * col 所跨的行数
			 * show 是否显示
			 * row 跨行
			 */
			_changeTabelValue(key, value, w, keyW, col, show = true, row) {
				if (value == null || value == undefined) {
					value = null;
				}
				return {
					key,
					value,
					w,
					keyW,
					col,
					show,
					row
				}

			},

			_changeGoToPage(name) {
				switch (name) {
					case '塑料':
						return '../writeData/riskMainPage/plastic';
					case '纺织':
						return '../writeData/riskMainPage/textile';
					case '食品':
						return '../writeData/riskMainPage/food';
					case '建材':
						return '../writeData/riskMainPage/buildingMaterials';
					case '纸制品':
						return '../writeData/riskMainPage/paperProducts';
					case '商贸':
						return '../writeData/riskMainPage/business';
					case '轻工':
						return '../writeData/riskMainPage/industryFurniture'; //comm
					case '家具':
						return '../writeData/riskMainPage/industryFurniture'; //comm
					case '机械':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					case '烟草':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					case '冶金':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					case '有色':
						return '../writeData/riskMainPage/machineryTobaccoMetallurgyAndColored'; //comm1
					default:
						return '';
				}
			}
		}

	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.a_t_slot {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 180upx;
		font-size: 30upx;
		color: #f56c6c;
		text-decoration: underline;
	}

	.risk_info {}
</style>
 
