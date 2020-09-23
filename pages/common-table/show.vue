<template>
	<view class="cmp_show_container clearfix">
		<view class="cmp_s_list">
			<table cellspacing="0"s class="border_1px_all_409eff width125">
				<tbody>
					<tr v-for="(item, index) in riskData" :key="index">						
						<block v-for="(ele, inx) in item" :key="inx+'_'">
							<td :rowspan="ele.trow" class="border_1px_all_409eff font_weight_bold padding_5px border_right_none border_bottom_none" v-if="ele.name!=='' && ele.value != null">
								{{ele.name}}</td>
							<td :colspan="ele.col" class="border_1px_all_409eff padding_8px border_right_none border_bottom_none" :rowspan="ele.row" v-if="ele.value != null && ele.value!=='' ">{{ele.value}}
							</td>
						</block>
					</tr>
				</tbody>
			</table>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: {
			baseAndSafetyInfoData: {
				type: Object,
				default () {
					return {};
				}
			},
			bool: Boolean
		},
		data() {
			return {
				maxCol: 100,
				companyData: {},
				dustData: [],
				spaceData: [],
				furnaceData: [],
				workData: [],
				gasData: [],
				chemistryData: [],
				coldData: [],
			}
		},
		computed: {
			...mapState(['userInfo']),
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
			riskData() {
				let cData = this.companyData,
					insured = {
						0: '无',
						1: '工伤保险',
						2: '安全生产责任险'
					},
					propertyTo = {
						1: '自有',
						2: '租赁'
					},
					propertyCertTo = {
						1: '有',
						2: '无'
					},
					fireInspectionTo = {
						1: '是',
						2: '否'
					},
					fireHydrantTo = {
						1: '是',
						2: '否'
					},
					health_inspectionTo = {
						1: '是',
						2: '否'
					},
					safety_inspectionTo = {
						1: '是',
						2: '否'
					}

				let s = [
					...this.dustData,
					...this.spaceData,
					...this.furnaceData,
					...this.gasData,
					...this.workData,
					...this.chemistryData,
					...this.coldData,
				]
				console.log(s, "==================")
				return s;
			},
		},

		created() {
			this.getInfo();
		},
		methods: {
			//获取风险信息
			getInfo() {
				var opts = {
					company_id: this.userInfo.company_id,
				}
				this.$http.post('riskInfo', opts).then(res => {
					if (res.code == 200) {
						var datas = res.data;
						console.log(datas)
					 
						datas.forEach(data => {
							if (data.type == 1 && this.industry.indexOf('有限空间') !== -1) {
								let spaceData = JSON.parse(data.content)
								if (spaceData.space) {
									this.spaceOne(spaceData.space)
								} else if (spaceData.space2) {
									this.spaceTwo(spaceData.space2)
								} else if (spaceData.space3) {
									this.spaceThree(spaceData.space3, spaceData.infoData)
								}
							}
							if (data.type == 2 && this.industry.indexOf('特殊作业及特种设备') !== -1) {
								let wData = JSON.parse(data.content)
								if (wData.workOne) {
									this.work(wData.workOne)
								} else if (wData.workTwo) {
									this.workTwo(wData.workTwo)
								}
							}

							if (data.type == 3 && this.industry.indexOf('可燃性粉尘') !== -1) {
								let dustData = JSON.parse(data.content)
								if (dustData.dustOne) {
									this.dustOne(dustData.dustOne)
								} else if (dustData.dustTwo) {
									this.dustTwo(dustData.dustTwo)
								}
							}
							if (data.type == 4 && this.industry.indexOf('危险化学品') !== -1) {
								this.chemistry(JSON.parse(data.content))
							}
							if (data.type == 5 && this.industry.indexOf('高温熔融') !== -1) {
								this.furnace(JSON.parse(data.content))
							}
							if (data.type == 6 && this.industry.indexOf('冷库') !== -1) {
								this.cold(JSON.parse(data.content))
							}
							if (data.type == 7 && this.industry.indexOf('煤气作业') !== -1) {
								this.gas(JSON.parse(data.content))
							}
						})
					}

				})
			},
			//冷库
			cold(dataS) {
				let zlTo = {
					1: '液氨',
					2: '氟利昂R12',
					3: '氟利昂R22',
					4: '二氧化碳',
					5: '其他'
				}
				if (dataS.lkSelct == 1) {
					this.coldData = [
						[{
							name: '冷库',
							value: ''
						}, {
							name: '制冷剂',
							value: zlTo[dataS.zljSelect],
							col: this.maxCol - 2
						}]
					]
				}
			},
			//危险化学品
			chemistry(dataS) {
				let s = [],
					s1 = [],
					s2 = []
				s1 = this.chemistryInfo(dataS.leftData)
				s2 = this.chemistryInfo(dataS.rightData)
				if (s1.length) {
					s1[0] = [{
						name: '气体类',
						value: '',
						trow: s1.length
					}, ...s1[0]]
				}
				if (s2.length) {
					s2[0] = [{
						name: '液体类/固体类',
						value: '',
						trow: s2.length
					}, ...s2[0]]
				}
				s = [...s1, ...s2]
				if (s.length) {
					s[0] = [{
						name: '危险化学品',
						value: '',
						trow: (s1.length + s2.length)
					}, ...s[0]]

				}
				this.chemistryData = s
				console.log(s, "危险化学品++++++++++++++++++++++++++++++++++++++++++++++")
			},
			//危险化学品信息获取
			chemistryInfo(dataS) {
				console.log('------------bbb-----', dataS)
				let s = [],
					specialTo = {
						1: '有专用库房存放',
						2: '无专用库房存放'
					},
					purposeTo = {
						1: '制冷',
						2: '其他'
					},
					saveTo = {
						1: '瓶',
						2: '罐',
						3: '箱'
					},
					sinUnitTo = {
						1: 'm³',
						2: '㎏',
						3: 'L'
					}

				dataS.forEach(data => {
					if (data.value) {
						let info = data.data,
							sum = 6,
							sG = [],
							sZ = [{
									name: data.name,
									value: '存储方式:' + saveTo[info.save],
									trow: 2
								},
								{
									name: '',
									value: '数量:' + info.maxNum || 0
								},
								{
									name: '',
									value: '容积:' + info.sinNum || 0 + sinUnitTo[info.sinUnit] || ''
								},
								{
									name: '',
									value: specialTo[info.special] || '未获取到库房存放数据'
								},
							]
						if (info.special == 1) {
							sum++
							sZ.push({
								name: '',
								value: '库房数量' + info.specialNum || 0
							})
						}
						sZ[sZ.length - 1].col = this.maxCol - sum

						sG = [{
								name: '',
								value: info.source == 1 ? `购买于：${this.getBuyCompany(info.companyData)}` : '自主生产',
								col: this.maxCol - 3
							}],

							s.push(sZ, sG)
					}
				})
				return s
			},
			//购买公司数据转换
			getBuyCompany(dataS) {
				let s = []
				dataS.forEach(data => {
					s.push(`\n单位名称:${data.buyCompany};信用代码:${data.code};联系人:${data.name};联系电话:${data.phone}`)
				})
				return s.join(',')
			},

			// 特殊作业
			work(dataS) {
				console.log('workd', dataS)
				let s1 = [],
					s2 = [],
					s3 = [],
					maxCol = this.maxCol,
					num = 0,
					s = []

				if (dataS.gwState) {
					s.push([{
						name: '高温作业',
						value: ''
					}, {
						name: '',
						value: `作业人员${dataS.highT}名`,
						col: maxCol - 2
					}])
					num++
				}
				if (dataS.gcState) {
					s.push([{
						name: '高处作业',
						value: ''
					}, {
						name: '',
						value: `作业人员${dataS.highGround}名`,
						col: maxCol - 2
					}])
					num++
				}
				let st = ''
				if (dataS.ydState) {
					if (dataS.useDcSelect == 1) {
						if (dataS.ydType == 1) {
							st += `单位名称:${dataS.ydName};信用代码:${dataS.ydCode};联系人:${dataS.ydContact};联系电话:${dataS.ydPhone}`
						} else {
							st += `姓名:${dataS.ydName}; 特种作业操作证编号:${dataS.ydCode};联系电话:${dataS.ydPhone}`
						}
						s.push([{
							name: '用电',
							value: ''
						}, {
							name: '',
							value: `作业人员${dataS.useDcNum}名`
						}, {
							name: '',
							value: st || null,
							col: maxCol - 3
						}])

					} else {
						s.push([{
							name: '用电',
							value: ''
						}, {
							name: '',
							value: `作业人员${dataS.useDcNum}名`,
							col: maxCol - 2
						}])
					}
					num++
				}
				if (dataS.cutCheck) {
					s1.push([{
						name: '气焊(割)',
						value: ''
					}, {
						name: '',
						value: `作业人员${dataS.cutNum}名`,
						col: maxCol - 3
					}])
					num++
				}
				if (dataS.dcCheck) {
					s1.push([{
						name: '电焊',
						value: ''
					}, {
						name: '',
						value: `作业人员${dataS.dcNum}名`,
						col: maxCol - 3
					}])
					num++
				}
				if (s1.length) {
					s1[0] = [{
						name: '动火作业',
						value: '',
						trow: s1.length
					}, ...s1[0]]
				}
				if (dataS.trainCheck) {
					s2.push([{
						name: '行车',
						value: ''
					}, {
						name: '',
						value: `数量${dataS.trainNum}台`
					}, {
						name: '',
						value: `作业人员${dataS.trainMan}名`,
						col: maxCol - 4
					}])
					num++
				}
				if (dataS.forkliftCheck) {
					s2.push(
						[{
							name: '叉车',
							value: ''
						}, {
							name: '',
							value: `数量${dataS.forkliftNum}台`
						}, {
							name: '',
							value: `作业人员${dataS.forkliftMan}名`,
							col: maxCol - 4
						}]
					)
					num++
				}
				if (dataS.otherCheck) {
					s2.push([{
						name: '其他',
						value: ''
					}, {
						name: '',
						value: `数量${dataS.otherNum}台`
					}, {
						name: '',
						value: `作业人员${dataS.otherMan}名`,
						col: maxCol - 4
					}])
					num++
				}
				if (s2.length) {
					s2[0] = [{
						name: '吊装转运',
						value: '',
						trow: s2.length
					}, ...s2[0]]
				}
				if (dataS.stressCheck) {
					s3.push([{
						name: '压力容器',
						value: ''
					}, {
						name: '',
						value: `数量${dataS.stressNum}台`
					}, {
						name: '',
						value: `作业人员${dataS.stressMan}名`,
						col: maxCol - 4
					}])
					num++
				}
				if (dataS.stoveCheck) {
					s3.push([{
						name: '锅炉',
						value: ''
					}, {
						name: '',
						value: `数量${dataS.stoveNum}台`
					}, {
						name: '',
						value: `作业人员${dataS.stoveMan}名`,
						col: maxCol - 4
					}])
					num++
				}
				if (dataS.deviceData) {
					dataS.deviceData.forEach((data, index) => {
						if (index > 1) {
							s3.push([{
								name: data.checkName,
								value: ''
							}, {
								name: '',
								value: `数量${dataS[data.num]}台`
							}, {
								name: '',
								value: `作业人员${dataS[data.man]}名`,
								col: maxCol - 4
							}])
							num++
						}
					})
				}

				if (s3.length) {
					s3[0] = [{
						name: '特种设备',
						value: '',
						trow: s3.length
					}, ...s3[0]]
				}

				s.push(...s1, ...s2, ...s3)
				if (s.length) {
					s[0] = [{
						name: '特殊作业',
						value: '',
						trow: num
					}, ...s[0]]
				}
				// s[0][s[0].length-1].col-=1

				this.workData = s

			},
			// 特殊作业
			workTwo(dataS) {
				if (dataS.state) {
					return
				}
				let max = this.maxCol,
					dS = [],
					s = [
						[{
							name: '特殊作业',
							value: '',
							trow: 10
						}, {
							name: '电工作业',
							value: '',
							trow: dataS.uniqueSelect == 1 ? 2 : 1
						}, {
							name: '',
							value: `${dataS.uniqueSelect == 1 ? '有' : '无'}专用变电站/配电房(室)`,
							col: max - 2
						}],
					]

				if (dataS.uniqueSelect == 1) {
					s.push([{
						name: '',
						value: dataS.uniqueWork == 1 ? '自有电工作业' : '外包电工作业'
					}, {
						name: '',
						value: `作业人员${dataS.uniqueWorkNum}名`,
						col: max - 3
					}])
				}

				let dhData = [{
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
					outTo = {
						1: '外包',
						2: '自有'
					},
					typeTo = {
						1: '企业',
						2: '个人'
					}

				dhData.forEach(data => {
					if (dataS[data.checkValue]) {
						if (dataS[data.out] == 1) {
							dS.push([{
								name: data.checkName,
								value: `作业人员${dataS[data.num]}名`
							}, {
								name: '',
								value: `${outTo[dataS[data.out]]}作业；
			              承包方类型：${typeTo[dataS[data.type]]}；
			              ${dataS[data.type] == 1 ? '单位名称' : '姓名'}:${dataS[data.name]}；
			            ${dataS[data.type] == 1 ? '信用代码' : '特种作业操作证编号'}:${dataS[data.code]}；
			             ${dataS[data.type] == 1 ? ('联系人:' + dataS[data.contact]) : ''}
			            联系电话:${dataS[data.phone]}`,
								col: this.maxCol - 4
							}])
						} else {
							dS.push([{
								name: data.checkName,
								value: `作业人员${dataS[data.num]}名`
							}, {
								name: '',
								value: `${outTo[dataS[data.out]]}作业`,
								col: this.maxCol - 4
							}])
						}
					}
				})

				// if(dataS.cutCheck){
				//   dS.push([{name:'',value:'高炉'},{name:'',value:`作业人员${dataS.cutNum}名`,col:max-4},{name:'',value:dataS.cutSelct==1?'自有':'外包'}])
				// }
				// if(dataS.dcCheck){
				//   dS.push([{name:'',value:'电焊'},{name:'',value:dataS.dcSelect==1?'自有':'外包'},{name:'',value:`作业人员${dataS.dcNum}名`,col:max-4}])
				// }
				if (dS.length > 0) {
					dS[0] = [{
						name: '动火作业',
						value: '',
						trow: dS.length
					}, ...dS[0]]
					s.push(...dS)
				}
				let infoS = [{
						name: '行车',
						value: `${dataS.trainNum}台`,
						man: `作业人员${dataS.trainMan}名`,
						check: 'trainCheck'
					},
					{
						name: '叉车',
						value: `${dataS.forkliftNum}台`,
						man: `作业人员${dataS.forkliftMan}名`,
						check: 'forkliftCheck'
					},
					{
						name: '锅炉',
						value: `${dataS.potNum}台`,
						man: `作业人员${dataS.potMan}名`,
						check: 'potCheck'
					},
					{
						name: '压力容器',
						value: `${dataS.stressNum}台`,
						man: `作业人员${dataS.stressMan}名`,
						check: 'stressCheck'
					},
				]
				let listData = dataS.deviceData || []
				if (listData.length > 4) {
					for (let i = 4; i < listData.length; i++) {
						if (dataS[listData[i].checkValue]) {
							infoS.push({
								name: listData[i].checkName,
								value: `${dataS[listData[i].num]}台`,
								man: `作业人员${dataS[listData[i].man]}名`,
								check: listData[i].checkValue
							})
						}
					}
				}
				let tS = []
				infoS.forEach(data => {
					if (dataS[data.check]) {
						tS.push([{
							name: '',
							value: data.name || null
						}, {
							name: '',
							value: data.value
						}, {
							name: '',
							value: data.man,
							col: max - 4
						}])
					}
				})
				if (tS.length) {
					tS[0] = [{
						name: '特种设备',
						value: '',
						trow: tS.length
					}, ...tS[0]]
					s.push(...tS)
				}

				s[0][0].trow = s.length
				this.workData = s

			},
			//煤气作业
			gas(dataS) {
				if (dataS.state != 1) {
					return
				}
				let max = this.maxCol,
					gS = [],
					s = [
						[{
							name: '煤气作业',
							value: '',
							trow: 4
						}, {
							name: '产能(万吨)',
							value: dataS.num,
							col: max - 2
						}],

					]
				if (dataS.stoveCheck) {
					gS.push([{
						name: '',
						value: '高炉'
					}, {
						name: '',
						value: dataS.stoveNum + '个'
					}, {
						name: '',
						value: `规格m³：${dataS.stoveSpec}`,
						col: max - 4
					}])
				}
				if (dataS.turnCheck) {
					gS.push([{
						name: '',
						value: '转炉'
					}, {
						name: '',
						value: dataS.turnNum + '个'
					}, {
						name: '',
						value: `规格t：${dataS.turnSpec}`,
						col: max - 4
					}])
				}
				if (dataS.dcCheck) {
					gS.push([{
						name: '',
						value: '电炉'
					}, {
						name: '',
						value: dataS.dcNum + '个'
					}, {
						name: '',
						value: `规格(t)：${dataS.dcSpec}`,
						col: max - 4
					}])
				}
				if (dataS.gasCheck) {
					gS.push([{
						name: '',
						value: '煤气罐'
					}, {
						name: '',
						value: dataS.gasNum + '个'
					}, {
						name: '',
						value: `规格(万m³)：${dataS.gasSpec}`,
						col: max - 4
					}])
				}
				let listData = dataS.listData || []
				if (listData.length > 4) {
					for (let i = 4; i < listData.length; i++) {
						if (dataS[listData[i].checkValue]) {
							gS.push([{
								name: '',
								value: listData[i].checkName
							}, {
								name: '',
								value: `${dataS[listData[i].num]}个`
							}, {
								name: '',
								value: `${listData[i].specName}:${dataS[listData[i].specNum]}`,
								col: max - 4
							}])
						}
					}

				}
				if (gS.length > 0) {
					gS[0] = [{
						name: '煤气锅炉',
						value: '',
						trow: gS.length
					}, ...gS[0]]
					s.push(...gS)
				}
				s[0][0].trow = s.length
				this.gasData = s

			},
			//高温熔融
			furnace(dataS) {
				if (dataS.state != 1) {
					return
				}
				let speciesTo = {
						1: '钢',
						2: '铁',
						3: '铝',
						4: '铜',
						5: '其他',
					},
					pouringTo = {
						1: '全自动机械浇筑',
						2: '人工浇筑',
						3: '全自动机械浇筑+人工浇筑'
					}
				let max = this.maxCol,
					zS = [],
					lS = [],
					s = [
						[{
							name: '高温熔融',
							value: '',
							trow: 7
						}, {
							name: '浇筑方式',
							value: pouringTo[dataS.pouring],
							col: max - 2
						}],
						[{
							name: '熔炼金属种类',
							value: dataS.species == 5 ? dataS.speciesOther : speciesTo[dataS.species],
							col: max - 2
						}],
						[{
							name: '高温熔融金属转运方式',
							value: dataS.turnType.join(',') || '',
							col: max - 2
						}]
					]
				if (dataS.midCheck) {
					zS.push([{
						name: '',
						value: '中频炉'
					}, {
						name: '',
						value: dataS.midNum + '个'
					}, {
						name: '',
						value: '最大熔炼量' + dataS.midMaxNum,
						col: max - 4
					}])
				}
				if (dataS.meltCheck) {
					zS.push([{
						name: '',
						value: '熔铝炉'
					}, {
						name: '',
						value: dataS.miltNum + '个'
					}, {
						name: '',
						value: '最大熔炼量' + dataS.miltMaxNum,
						col: max - 4
					}])
				}
				if (dataS.dayCheck) {
					zS.push([{
						name: '',
						value: '冲天炉'
					}, {
						name: '',
						value: dataS.dayNum + '个'
					}, {
						name: '',
						value: '最大熔炼量' + dataS.dayMaxNum,
						col: max - 4
					}])
				}
				if (zS.length > 0) {
					zS[0] = [{
						name: '熔炉装置',
						value: '',
						trow: zS.length
					}, ...zS[0]]
					s.push(...zS)
				}

				if (dataS.flatCheck) {
					lS.push([{
						name: '',
						value: '平炉'
					}, {
						name: '',
						value: dataS.flatNum + '个'
					}, {
						name: '',
						value: '最大熔炼量' + dataS.flatMaxNum,
						col: max - 4
					}])
				}
				if (dataS.turnCheck) {
					lS.push([{
						name: '',
						value: '转炉'
					}, {
						name: '',
						value: dataS.turnNum + '个'
					}, {
						name: '',
						value: '最大熔炼量' + dataS.turnMaxNum,
						col: max - 4
					}])
				}
				if (dataS.dcCheck) {
					lS.push([{
						name: '',
						value: '电炉'
					}, {
						name: '',
						value: dataS.dcNum + '个'
					}, {
						name: '',
						value: '最大熔炼量' + dataS.dcMaxNum,
						col: max - 4
					}])
				}
				if (lS.length > 0) {
					lS[0] = [{
						name: '熔炉装置(炼钢炉)',
						value: '',
						trow: lS.length
					}, ...lS[0]]
					s.push(...lS)
				}
				s[0][0].trow = s.length
				this.furnaceData = s
			},

			//有限空间
			spaceOne(dataS) {
				console.log('-------------spaceOne---------------', dataS)
				if (dataS.state) {
					return
				}
				let infoS = [{
							checkName: '化粪池',
							checkValue: 'septicTankCheck',
							num: 'septicTankNum',
							out: 'spticTankOut',
							name: 'septicTankName',
							apt: 'septicTankApt',
							code: 'septicTankCode',
							type: 'septicTankType',
							contact: 'septicTankContact',
							phone: 'septicTankPhone'
						},
						{
							checkName: '污水处理池',
							checkValue: 'sewageCheck',
							num: 'sewageNum',
							out: 'sewageOut',
							name: 'sewageName',
							apt: 'sewageApt',
							code: 'sewageCode',
							type: 'sewageType',
							contact: 'sewageContact',
							phone: 'sewagePhone'
						},
						{
							checkName: '消费水池',
							checkValue: 'expenseCheck',
							num: 'expenseNum',
							out: 'expenseOut',
							name: 'expenseName',
							apt: 'expenseApt',
							code: 'expenseCode',
							type: 'expenseType',
							contact: 'expenseContact',
							phone: 'expensePhone'
						},
						{
							checkName: '事故池',
							checkValue: 'accidentCheck',
							num: 'accidentNum',
							out: 'accidentOut',
							name: 'accidentName',
							apt: 'accidentApt',
							code: 'accidentCode',
							type: 'accidentType',
							contact: 'accidentContact',
							phone: 'accidentPhone'
						},
						{
							checkName: '循环水池',
							checkValue: 'forCheck',
							num: 'forNum',
							out: 'forOut',
							name: 'forName',
							apt: 'forApt',
							code: 'forCode',
							type: 'forType',
							contact: 'forContact',
							phone: 'forPhone'
						},
						{
							checkName: '料仓',
							checkValue: 'feedCheck',
							num: 'feedNum',
							out: 'feedOut',
							name: 'feedName',
							apt: 'feedApt',
							code: 'feedCode',
							type: 'feedType',
							contact: 'feedContact',
							phone: 'feedPhone'
						},
						{
							checkName: '罐体',
							checkValue: 'tankCheck',
							num: 'tankNum',
							out: 'tankOut',
							name: 'tankName',
							apt: 'tankApt',
							code: 'tankCode',
							type: 'tankType',
							contact: 'tankContact',
							phone: 'tankPhone'
						},
						{
							checkName: '电镀槽',
							checkValue: 'eleCheck',
							num: 'eleNum',
							out: 'eleOut',
							name: 'eleName',
							apt: 'eleApt',
							code: 'eleCode',
							type: 'eleType',
							contact: 'eleContact',
							phone: 'elePhone'
						},
					],
					outTo = {
						1: '是',
						2: '不是'
					},
					typeTo = {
						1: '企业',
						2: '个人'
					}

				let s = []
				dataS.listData.forEach(data => {
					if (dataS[data.checkValue]) {
						if (dataS[data.out] == 1) {
							s.push([{
								name: data.checkName,
								value: dataS[data.num] + '个'
							}, {
								name: '',
								value: `${outTo[dataS[data.out]]}外包作业；
			              承包方类型：${typeTo[dataS[data.type]]}；
			              ${dataS[data.type] == 1 ? '单位名称' : '姓名'}:${dataS[data.name]}；
			            ${dataS[data.type] == 1 ? '信用代码' : '特种作业操作证编号'}:${dataS[data.code]}；
			             ${dataS[data.type] == 1 ? ('联系人:' + dataS[data.contact]) : ''}
			            联系电话:${dataS[data.phone]}`,
								col: this.maxCol - 3
							}])
						} else {
							s.push([{
								name: data.checkName,
								value: dataS[data.num] + '个'
							}, {
								name: '',
								value: `${outTo[dataS[data.out]]}外包作业`,
								col: this.maxCol - 3
							}])
						}
					}
				})
				// let cols=  this.addCol(s,4)
				// let bs=  this.buildTwo(cols)
				if (s.length) {
					s[0] = [{
						name: '有限空间',
						value: '',
						trow: s.length
					}, ...s[0]]
				}
				this.spaceData = s

			},
			//有限空间
			spaceTwo(dataS) {
				console.log('-------------spaceTwo--------------', dataS)
				let infoS = [{
						title: '槽罐',
						data: dataS.leftData
					},
					{
						title: '工艺设备',
						data: dataS.rightTopData
					},
					{
						title: '公辅设备设施',
						data: dataS.rightBotData
					}
				]
				this.spaceData = this.getSpaceTwoInfo(dataS, infoS)
			},
			//获取有限空间信息，dataS：数据，infoS：模板数据
			getSpaceTwoInfo(dataS, infoS) {
				let S = [],
					num = 0
				infoS.forEach((data1) => {
					let fS = []
					data1.data.forEach(data2 => {
						if (dataS[data2.checkValue]) {
							fS.push({
								name: data2.checkName,
								value: dataS[data2.num] + '个'
							})
						}
					})
					if (fS.length) {
						fS = this.buildTwo(this.addCol(fS, 5))
						fS[0] = [{
							name: data1.title,
							value: '',
							trow: fS.length
						}, ...fS[0]]
					}
					num += fS.length
					S.push(...fS)
				})
				if (S.length) {
					S[0] = [{
						name: '有限空间',
						value: '',
						trow: num
					}, ...S[0]]
				}
				return S
			},
			//有限空间
			spaceThree(dataS, infoData) {
				let infoS = [{
						title: '水泥',
						data: [{
								checkName: '料',
								checkValue: 'liaoCheck11',
								prop: 'v1',
								num: 'liaoNum11'
							},
							{
								checkName: '储罐（仓）',
								checkValue: 'cgCheck12',
								prop: 'v1',
								num: 'cgNum12'
							},
							{
								checkName: '煤粉库（地坑、仓）',
								checkValue: 'mfkCheck13',
								prop: 'v1',
								num: 'mfkNum13'
							},
							{
								checkName: '筒型储存库',
								checkValue: 'txkCheck14',
								prop: 'v1',
								num: 'txkNum14'
							},
							{
								checkName: '立式磨',
								checkValue: 'lsmCheck15',
								prop: 'v1',
								num: 'lsmNum15'
							},
							{
								checkName: '球磨机',
								checkValue: 'qmjCheck16',
								prop: 'v1',
								num: 'qmjNum16'
							},
							{
								checkName: '选粉机',
								checkValue: 'xfjCheck17',
								prop: 'v1',
								num: 'xfjNum17'
							},
							{
								checkName: '电捕集罐',
								checkValue: 'dpCheck18',
								prop: 'v1',
								num: 'dpNum18'
							},
							{
								checkName: '煤气发生炉及上部密闭空间',
								checkValue: 'mqfsCheck19',
								prop: 'v1',
								num: 'mqfsNum19'
							},
							{
								checkName: '排水器室',
								checkValue: 'psqCheck110',
								prop: 'v1',
								num: 'psqNum110'
							},
							{
								checkName: '煤气排送机间',
								checkValue: 'mqpCheck111',
								prop: 'v1',
								num: 'mqpNum111'
							},
							{
								checkName: '净化设备',
								checkValue: 'jhCheck112',
								prop: 'v1',
								num: 'jhNum113'
							},
							{
								checkName: '回转窑',
								checkValue: 'hzkCheck114',
								prop: 'v1',
								num: 'hzkNum115'
							},
							{
								checkName: '预热器',
								checkValue: 'yrqCheck116',
								prop: 'v1',
								num: 'yrqNum117'
							},
							{
								checkName: '冷却机',
								checkValue: 'lqjCheck118',
								prop: 'v1',
								num: 'lqjNum119'
							},
							{
								checkName: '篦式冷却机',
								checkValue: 'asCheck120',
								prop: 'v1',
								num: 'asNum121'
							},
							{
								checkName: '其他',
								checkValue: 'qtCheck122',
								prop: 'v1',
								num: 'qtNum123'
							},
						]
					},
					{
						title: '混泥土',
						data: [{
								checkName: '料仓',
								checkValue: 'lcCheck21',
								prop: 'v1',
								num: 'lcNum2'
							},
							{
								checkName: '储罐（仓）',
								checkValue: 'cglCheck22',
								prop: 'v1',
								num: 'cglNum22'
							},
							{
								checkName: '搅拌仓',
								checkValue: 'jbcCheck23',
								prop: 'v1',
								num: 'jbcNum23'
							},
							{
								checkName: '其他',
								checkValue: 'qtTwoCheck24',
								prop: 'v1',
								num: 'qtTwoNum24'
							},
						]
					},
					{
						title: '平板玻璃',
						data: [{
								checkName: '料仓',
								checkValue: 'lcThreeCheck31',
								prop: 'v1',
								num: 'lcThreeNum31'
							},
							{
								checkName: '混合机',
								checkValue: 'hhjCheck32',
								prop: 'v1',
								num: 'hhjNum32'
							},
							{
								checkName: '回转窑',
								checkValue: 'hzqCheck33',
								prop: 'v1',
								num: 'hzqNum33'
							},
							{
								checkName: '储罐（仓）',
								checkValue: 'cgThreeCheck34',
								prop: 'v1',
								num: 'cgThreeNum34'
							},
							{
								checkName: '电捕集罐',
								checkValue: 'dpjgCheck35',
								prop: 'v1',
								num: 'dpjgNum35'
							},
							{
								checkName: '煤气发生炉及上部密闭空间',
								checkValue: 'mqfslCheck36',
								prop: 'v1',
								num: 'mqfslNum36'
							},
							{
								checkName: '排水器室',
								checkValue: 'psqThreeCheck37',
								prop: 'v1',
								num: 'psqThreeNum37'
							},
							{
								checkName: '煤气排送机间',
								checkValue: 'mqpsCheck38',
								prop: 'v1',
								num: 'mqpsNum38'
							},
							{
								checkName: '净化设备',
								checkValue: 'jhsbCheck39',
								prop: 'v1',
								num: 'jhsbNum39'
							},
							{
								checkName: '其他',
								checkValue: 'qtThreeCheck310',
								prop: 'v1',
								num: 'qtThreeNum310'
							},
						]
					},
					{
						title: '建筑卫生陶瓷',
						data: [{
								checkName: '立式磨',
								checkValue: 'lsmFourCheck41',
								prop: 'v1',
								num: 'lsmFourNum41'
							},
							{
								checkName: '球磨机',
								checkValue: 'qmjFourCheck42',
								prop: 'v1',
								num: 'qmjFourNum42'
							},
							{
								checkName: '泥浆池',
								checkValue: 'ljcCheck43',
								prop: 'v1',
								num: 'ljcNum43'
							},
							{
								checkName: '干燥塔',
								checkValue: 'gztCheck44',
								prop: 'v1',
								num: 'gztNum44'
							},
							{
								checkName: '回转窑',
								checkValue: 'hzzCheck45',
								prop: 'v1',
								num: 'hzzNum45'
							},
							{
								checkName: '电捕集罐',
								checkValue: 'dpjgCheck46',
								prop: 'v1',
								num: 'dpjgNum46'
							},
							{
								checkName: '煤气发生炉及上部密闭空间',
								checkValue: 'mqfslFourCheck47',
								prop: 'v1',
								num: 'mqfslFourNum47'
							},
							{
								checkName: '排水器室',
								checkValue: 'psqFourCheck48',
								prop: 'v1',
								num: 'psqFourNum48'
							},
							{
								checkName: '煤气排送机间',
								checkValue: 'mqpsFourCheck49',
								prop: 'v1',
								num: 'mqpsFourNum49'
							},
							{
								checkName: '净化设备',
								checkValue: 'jhsbFourCheck410',
								prop: 'v1',
								num: 'jhsbFourNum410'
							},
							{
								checkName: '竖窑',
								checkValue: 'jlCheck411',
								prop: 'v1',
								num: 'jlNum411'
							},
							{
								checkName: '电热干燥窑',
								checkValue: 'drgCheck412',
								prop: 'v1',
								num: 'drgNum412'
							},
							{
								checkName: '其他',
								checkValue: 'qtFourCheck413',
								prop: 'v1',
								num: 'qtFourNum413'
							},
						]
					},
					{
						title: '石膏板',
						data: [{
								checkName: '料仓',
								checkValue: 'lcFiveCheck51',
								prop: 'v1',
								num: 'lcFiveNum51'
							},
							{
								checkName: '干燥机',
								checkValue: 'gzjFiveCheck52',
								prop: 'v1',
								num: 'gzjFiveNum52'
							},
							{
								checkName: '回转窑',
								checkValue: 'hzzFiveCheck53',
								prop: 'v1',
								num: 'hzzFiveNum53'
							},
							{
								checkName: '其他',
								checkValue: 'qtFiveCheck54',
								prop: 'v1',
								num: 'qtFiveNum54'
							},
						]
					},
					{
						title: '耐火材料',
						data: [{
								checkName: '料仓',
								checkValue: 'sixLcCheck61',
								prop: 'v1',
								num: 'sixLcNum61'
							},
							{
								checkName: '电捕集罐',
								checkValue: 'sixDpCheck62',
								prop: 'v1',
								num: 'sixDpNum62'
							},
							{
								checkName: '煤气发生炉及上部密闭空间',
								checkValue: 'sixMqfsCheck63',
								prop: 'v1',
								num: 'sixMqfsNum63'
							},
							{
								checkName: '排水器室',
								checkValue: 'sixPsqCheck64',
								prop: 'v1',
								num: 'sixPsqNum64'
							},
							{
								checkName: '煤气排送机间',
								checkValue: 'sixMqCheck65',
								prop: 'v1',
								num: 'sixMqNum65'
							},
							{
								checkName: '净化设备',
								checkValue: 'sixJhCheck66',
								prop: 'v1',
								num: 'sixJhNum66'
							},
							{
								checkName: '其他',
								checkValue: 'sixQtCheck67',
								prop: 'v1',
								num: 'sixQtNum67'
							},
						]
					},
					{
						title: '公辅设备设施',
						data: [{
								checkName: '锅炉',
								checkValue: 'sevenGlCheck71',
								prop: 'v1',
								num: 'sevenGlNum71'
							},
							{
								checkName: '管道',
								checkValue: 'sevenGdCheck72',
								prop: 'v1',
								num: 'sevenGdNum72'
							},
							{
								checkName: '收粉器',
								checkValue: 'sevenSfqCheck73',
								prop: 'v1',
								num: 'sevenSfqNum73'
							},
							{
								checkName: '喷雾干燥塔',
								checkValue: 'sevenPwCheck74',
								prop: 'v1',
								num: 'sevenPwNum74'
							},
							{
								checkName: '除尘器',
								checkValue: 'sevenCcqCheck75',
								prop: 'v1',
								num: 'sevenCcqNum75'
							},
							{
								checkName: '烟道',
								checkValue: 'sevenYdCheck76',
								prop: 'v1',
								num: 'sevenYdNum76'
							},
							{
								checkName: '电缆沟',
								checkValue: 'sevenDlCheck77',
								prop: 'v1',
								num: 'sevenDlNum77'
							},
							{
								checkName: '电梯井道',
								checkValue: 'sevenDtCheck78',
								prop: 'v1',
								num: 'sevenDtNum78'
							},
							{
								checkName: '地坑',
								checkValue: 'sevenDkCheck79',
								prop: 'v1',
								num: 'sevenDkNum79'
							},
							{
								checkName: '水塔（水箱）',
								checkValue: 'sevenStCheck710',
								prop: 'v1',
								num: 'sevenStNum710'
							},
							{
								checkName: '蓄水池',
								checkValue: 'sevenCscCheck711',
								prop: 'v1',
								num: 'sevenCscNum711'
							},
							{
								checkName: '窖井',
								checkValue: 'sevenQjCheck712',
								prop: 'v1',
								num: 'sevenQjNum712'
							},
							{
								checkName: '下水道',
								checkValue: 'sevenXsdCheck713',
								prop: 'v1',
								num: 'sevenXsdNum713'
							},
							{
								checkName: '污水处理池（井）',
								checkValue: 'sevenWsCheck714',
								prop: 'v1',
								num: 'sevenWsNum714'
							},
							{
								checkName: '其他',
								checkValue: 'sevenQtCheck715',
								prop: 'v1',
								num: 'sevenQtNum715'
							},
						]
					}
				]
				// let s=this.getSpaceInfo(dataS,infoS)
				this.spaceData = this.getSpaceInfo(dataS, infoData)
			},
			//获取有限空间信息
			getSpaceInfo(dataS, infoS) {
				let S = [],
					num = 0
				console.log(dataS, infoS)
				infoS.forEach((data1, index1) => {
					let zb = index1,
						sT = ''
					// console.log(zb)
					// console.log('out'+zb)
					if (dataS['out' + zb] == 1) {
						sT = '是外包作业；'
						if (dataS['outType' + zb] == 1) {
							sT +=
								`承包方类型：企业；单位名称:${dataS['outName' + zb]}；信用代码:${dataS['outCode' + zb]}；联系人:${dataS['outContact' + zb]}；联系电话:${dataS['outPhone' + zb]}`
						} else if (dataS['outType' + zb] == 2) {
							sT += `承包方类型：个人；姓名:${dataS['outName' + zb]}；特种作业操作证编号:${dataS['outCode' + zb]}；联系电话:${dataS['outPhone' + zb]}`
						}
					} else {
						sT = '不是外包作业；'
					}
					if (dataS[data1.checkValue]) {
						S.push([{
							name: data1.checkName,
							value: dataS[data1.num] + '个'
						}, {
							name: '',
							value: sT,
							col: this.maxCol - 3
						}])
					}

				})
				console.log(S)

				// S= this.buildTwo( this.addCol(S,4))

				if (S.length) {
					S[0] = [{
						name: '有限空间',
						value: '',
						trow: S.length
					}, ...S[0]]
				}
				return S
			},
			// 给第二个元素添加col
			addCol(s, num) {
				s.forEach((data, index) => {
					if (index % 2 !== 0) {
						data.col = this.maxCol - num
					}
				})

				if (s.length % 2 !== 0 && s.length) {
					s[s.length - 1].col = this.maxCol - num + 2
				}
				return s

			},

			// 将对象分两个打包为一个数组
			buildTwo(s) {
				let zz = [],
					ss = []
				s.forEach((data, index) => {
					zz.push(data)
					if (index % 2 !== 0) {
						ss.push(zz)
						zz = []
					}
				})
				if (s.length % 2 !== 0) {
					ss.push([s[s.length - 1]])
				}
				return ss
			},
			//数组转字符串
			myJoin(data) {
				return (typeof(data) === 'object' || typeof(data) === 'Array') ? data.join(',') : null
			},
			//数组转字符串,带其他
			myJoinOther(data, other) {
				if (typeof(data) === 'object' || typeof(data) === 'Array') {
					let index = data.indexOf('其他')
					if (index != -1) {
						data.splice(index, 1)

						return data.join(',') + (data.length ? '；其他:' : '其他:') + other

					} else {
						return data.join(',')
					}
				}
			},
			//可燃性粉尘
			dustOne(dustData) {
				console.log('zzzzzzzzzzzzz11111zzzzzzzzzzzzzzzz')

				if (dustData.dustType.indexOf('无') !== -1) {
					console.log('zzzzzzzzzzzzz22222zzzzzzzzzzzzzzzz')
					return
				}
				console.log('zzzzzzzzzzzzz22222zzzzz333zzzzzzzzzzz')

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
						3: dustData.setDustOther
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
					},
					colNum = this.maxCol - 4
				let fc = [
					[{
						name: '可燃性粉尘',
						value: '',
						trow: 5
					}, {
						name: '粉尘类别',
						value: `${this.myJoin(dustData.dustType)}${dustData.dustType.indexOf('其他') !== -1 ? '；其他：' + this.myJoin(dustData.dustOther) : ''}`
					}, {
						name: '厂房结构',
						value: this.myJoin(dustData.homeStru),
						col: colNum
					}],
					[{
						name: '涉尘车间最多工作人数',
						value: dustData.maxNum + '人'
					}, {
						name: '除尘类型',
						value: dustOutTo[dustData.dustOut],
						col: colNum
					}],
				]
				console.log(
					`  ${this.myJoin(dustData.dustType)}   ${dustData.dustType.indexOf('其他') !== -1 ? '；其他：' + this.myJoin(dustData.dustOther) : ''}`,
					"904=============")
				let s = [{
					name: '清灰方式',
					value: dustClearTo[dustData.dustClear]
				}]
				if (dustData.dustClear != 3) {
					s.push({
						name: '清灰次数',
						value: (dustData.dustNum && dustData.dustNum > 0) ? (dustData.dustNum + '次/天') : '不清洗',
						col: colNum
					})
				}

				if (dustData.dustOut == 1 || dustData.dustOut == 2) {
					s.push({
						name: '主要集尘方式',
						value: setDustTo[dustData.setDust]
					}, {
						name: '数量',
						value: dustData.postNum + '套'
					}, {
						name: '吸尘方式',
						value: suckDustTo[dustData.suckDust]
					}, {
						name: '防爆设施',
						value: this.myJoinOther(dustData.poom, dustData.poomOther)
					}, )
					if (dustData.dustOut == 2) {
						s.push({
							name: '除尘方式',
							value: dustData.dustMode ? dustData.dustMode.join(',') : null
						})
					}
				} else if (dustData.dustOut == 3) {
					s.push({
						name: '车间通风方式',
						value: windTo[dustData.wind]
					})
				}
				fc.push(...this.buildTwo(this.addCol(s, 4)))
				fc[0][0].trow = fc.length
				this.dustData = fc
				console.log(fc, '930 ===================可燃性粉尘-食品')
			},

			//可燃性粉尘-食品
			dustTwo(dustData) {
				if (dustData.dustType.indexOf('无') !== -1) {
					return
				}
				let
					setDustTo = {
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
					},
					colNum = this.maxCol - 4

				let fc = [
					[{
						name: '可燃性粉尘',
						value: '',
						trow: 5
					}, {
						name: '粉尘类别',
						value: `${this.myJoin(dustData.dustType)}${dustData.dustType.indexOf('其他') !== -1 ? '；其他：' + this.myJoin(dustData.dustOther) : ''}`
					}, {
						name: '厂房结构',
						value: this.myJoin(dustData.homeStru),
						col: colNum
					}],
					[{
						name: '涉尘车间最多人数',
						value: dustData.maxNum
					}, {
						name: '除尘方式',
						value: dustData.dustType == 1 ? '湿式' : '干式',
						col: colNum
					}]
				]
				let s = []
				if (dustData.dustOut == 1) {
					s.push({
						name: '作业人数',
						value: dustData.workNum
					}, {
						name: '出尘设备',
						value: dustData.dustEqui + '套'
					}, )
				} else if (dustData.dustOut == 2) {
					s.push({
						name: '集尘方式',
						value: setDustTo[dustData.setDust]
					})
					if (dustData.setDust == 1) {
						s.push({
							name: '主要尘降设施',
							value: dustLandTo[dustData.dustLand]
						})
						s.push({
							name: '防爆设施',
							value: this.myJoin(dustData.preventExp)
						})
					} else if (dustData.setDust == 2) {
						s.push({
							name: '集尘设施',
							value: dustFaciTo[dustData.dustFaci]
						}, )
					} else if (dustData.setDust == 3) {
						s.push({
							name: '工位',
							value: dustData.postNum + '个'
						}, )
					}
				}
				s.push({
					name: '粉尘清洗频次',
					value: `每天${dustData.dustRinseNum || 0}次`
				})
				let cols = this.addCol(s, 4)
				let bs = this.buildTwo(cols)
				fc.push(...bs)

				fc[0][0].trow = fc.length
				console.log(fc, '978 ===================可燃性粉尘-食品')
				this.dustData = fc
			}

		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
