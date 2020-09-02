<template>
	<view class="app_common_table_container">
		<view class="common_table_wrap">
			<view class="base_info">
				<app-title text="基本信息"></app-title>
				<table cellspacing="0" class="border_1px_all_409eff">
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
			</view>
			<view class="safety_info mar_bottom_10px mar_top_10px">
				<app-title text="安全信息"></app-title>
				<table cellspacing="0" class="border_1px_all_409eff width100">
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
			</view>
			<view class="risk_info  mar_bottom_10px mar_top_10px">
				<scroll-view scroll-x="true">
					<app-title text="风险信息"></app-title>
					<table cellspacing="0" class="border_1px_all_409eff  width125">
						<tr v-for="(item, index) in riskData" :key='index'>
							<block v-for="(ele, indx) in item" :key='indx'>
								<td :rowspan="ele.row" v-if="ele.key != '' && ele.show" :style="{ width:ele.keyW + 'px' }" class="border_1px_all_409eff font_weight_bold padding_5px border_right_none border_bottom_none"
								 :class="{ border_left_none:indx == 0, border_top_none:index == 0 }">
									{{ele.key}}
								</td>
								<td :colspan="ele.col" v-if="ele.value != null && ele.show" class="border_1px_all_409eff padding_8px border_right_none border_bottom_none"
								 :class="{ border_top_none:index == 0 }">
									{{ele.value}}
								</td>
							</block>
						</tr>
					</table>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import appTitle from "@/components/app-title/app-title"
	import cell from "./cell.js"
	import {
		produceTo
	} from "@/common/js/change.js"
	export default {
		props: {
			baseAndSafetyInfoData: {
				type: Object,
				default: () => {
					return {};
				}
			},
			riskInfoData: {
				type: [Array, Object],
				default: () => {
					return [];
				}
			},

		},
		data() {
			return {
				baseData: [],
				safetyData: [],
				riskData: [],
			}
		},
		components: {
			appTitle,
			cell
		},
		watch: {
			// 
			baseAndSafetyInfoData(nv) {
				this.baseData = this._getBaseInfo(nv);
				this.safetyData = this._changeSafetyInfo(nv);
			},
			riskInfoData(nv) {
				this.riskData = this._changeRiskInfo(nv);
			}
		},
		computed: {
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
		},
		created() {


		},
		methods: {
			//基本信息
			_getBaseInfo(nv) {
				var base = nv;
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
					[this._changeTabelValue("安全管理负责人", base['sp_principal'], half, keyW), this._changeTabelValue("安全管理负责人电话", base[
						'sp_principal_phone'], half, keyW)],
					[this._changeTabelValue("安全员", this._changeSecurity_officer(base['security_officer']), half, keyW), this._changeTabelValue(
						"上年产值", base['lastyear_value'] == "0.00" ? null : (base['lastyear_value'] + '万'), half, keyW)],
					[this._changeTabelValue("行业类别", base['industry_category'], half, keyW), this._changeTabelValue("主要工序", base[
						'main_process'], half, keyW)],
					[this._changeTabelValue("主营产品", this._changeMain_products(base['main_products']), contentW, keyW, 3)]
				];
				return arr;
			},
			//安全信息
			_changeSafetyInfo(nv) {
				var base = nv;
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
						this._changeType(type, content, all);
					}
				}
				return all;
			},
			//风险信息 -- 根据type判断风险类别
			_changeType(type, content, all) {
				if (content == "" || content == undefined || content == null || content == "{}") return;
				var obj = {};
				try {
					obj = JSON.parse(content);
				} catch (e) {
					this.log(e)
				}

				switch (type) {
					case 1:

						break;
					case 2:
						break;
					case 3:
						if (obj.dustOne != undefined) {
							var opts = obj.dustOne;
							all.push(...this._changeDustOne(opts));
						} else if (obj.dustTwo != undefined) {
							var opts = obj.dustTwo;
							all.push(...this._changeDustTwo(opts));
						}
						break;
					case 4:
						break;
					case 5:
						break;
					case 6:
						all.push(this._changeColdStorage(obj));
						break;
					case 7:
						all.push(...this._changeGasWork(obj));
						break;
				}
				return all;
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
					mode.push(this._changeTabelValue('清灰次数', (opts.dustNum && opts.dustNum > 0) ? (opts.dustNum + '次/天') : '不清洗', w,
						keyW))
				}
				all.push(mode);
				if (opts.dustOut == 1 || opts.dustOut == 2) {
					all.push([this._changeTabelValue("主要集尘方式", setDustTo[opts.setDust], w, keyW),
						this._changeTabelValue("数量", opts.postNum + '套', w, keyW)
					]);
					all.push([
						this._changeTabelValue("吸尘方式", suckDustTo[opts.suckDust], w, keyW),
						this._changeTabelValue("防爆设施", this._changeArray2Str(opts.poom, opts.poomOther, '其他'), w, keyW)
					])
					if (opts.dustOut == 2) {
						all.push([this._changeTabelValue("除尘方式", this._changeArray2Str(opts.dustMode), w, keyW, 3)]);
					}
				} else if (opts.dustOut == 3) {
					all.push([this._changeTabelValue("车间通风方式", windTo[opts.wind], w, keyW)])
				}
				all[0][0].row = all.length;
				return all;
			},
			// //可燃性粉尘-食品
			_changeDustTwo(opts) {
				console.log(opts, "可燃性粉尘-食品_changeDustTwo")
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
					all.push([this._changeTabelValue('出尘设备', opts.dustEqui + '套', w, keyW), this._changeTabelValue('作业人数', opts.workNum, w, keyW)]); 
				} else if (opts.dustOut == 2) {
					all.push([this._changeTabelValue('集尘方式', setDustTo[opts.setDust], w, keyW)]); 
					if (opts.setDust == 1) {
						all.push([this._changeTabelValue('主要尘降设施', dustLandTo[opts.dustLand], w, keyW), 
								  this._changeTabelValue('防爆设施', this._changeArray2Str(opts.preventExp), w, keyW)]); 
					} else if (opts.setDust == 2) {
						all.push([this._changeTabelValue('集尘设施', dustFaciTo[opts.dustFaci], w, keyW)]); 
					} else if (opts.setDust == 3) {
						all.push([this._changeTabelValue('工位', opts.postNum + '个', w, keyW)]); 
					}
				}
				all.push([this._changeTabelValue('粉尘清洗频次',`每天${opts.dustRinseNum || 0}次`, w, keyW, 3)]); 
				
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
					arr = [this._changeTabelValue("冷库", null, half, keyW),
						this._changeTabelValue("制冷剂", zlTo[obj['zljSelect']], half, keyW, 3)
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
				if (dataS.stoveCheck) {
					temp.push([this._changeTabelValue("", "高炉", w, keyW), this._changeTabelValue("", dataS.stoveNum + '个', w, keyW),
						this._changeTabelValue("", '规格m³:' + dataS.stoveSpec, w, keyW, 2)
					])
				}
				if (dataS.turnCheck) {
					temp.push([this._changeTabelValue("", "转炉", w, keyW), this._changeTabelValue("", dataS.turnNum + '个', w, keyW),
						this._changeTabelValue("", `规格t：${dataS.turnSpec}`, w, keyW, 2)
					])
				}
				if (dataS.dcCheck) {
					temp.push([this._changeTabelValue("", "", w, keyW), this._changeTabelValue("", dataS.dcNum + '个', w, keyW), this._changeTabelValue(
						"", `规格(t)：${dataS.dcSpec}`, w, keyW, 2)])
				}
				if (dataS.gasCheck) {
					temp.push([this._changeTabelValue("", "煤气罐", w, keyW), this._changeTabelValue("", dataS.gasNum + '个', w, keyW),
						this._changeTabelValue("", `规格(万m³)：${dataS.gasSpec}`, w, keyW, 2)
					])
				}
				if (listData.length > 4) {
					for (var i = 4; i < listData.length; i++) {
						if (dataS[listData[i].checkValue]) {
							temp.push([
								this._changeTabelValue("", listData[i].checkName, w, keyW),
								this._changeTabelValue("", `${dataS[listData[i].num]}个`, w, keyW),
								this._changeTabelValue("", `${listData[i].specName}:${dataS[listData[i].specNum]}`, w, keyW, 2)
							])
						}
					}
				}
				if (temp.length > 0) {
					temp[0] = [this._changeTabelValue("煤气锅炉", null, w, keyW), ...temp[0]]
					all.push(...temp);
				}
				all[0][0].row = all.length;
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
				return narr.join(',');
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
			}
		}

	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.risk_info {}
</style>
