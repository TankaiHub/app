<template>
	<view class="app_limited_space__t_container">
		<!-- 有限空间 -->
		<view class="limited_space_t_wrap">
			<view class="l_spt_wrap">
				<uni-list v-for="(item, index) in allData" :key="index">
					<uni-list-item :showArrow="false" class="list_border_1px">
						<view class="">
							<checkbox-group @change="onCheckBox($event, item, index)">
								<label>
									<checkbox :value="checkValue" :checked="inSpaceData[item.checkValue]" /><text class="font_weight_bold vertical_align_center">{{item.checkName}}</text>
								</label>
							</checkbox-group>
						</view>
					</uni-list-item>
					<uni-list-item title="数量" :showArrow="false" class="list_border_1px">
						<view class="" slot='right'>
							<input type="number" class="float_left width100px text_align_right" v-model="inSpaceData[item.num]"
							 placeholder-style="color:#ccc" placeholder="请输入数量" />
							<text class="mar_left_10px float_left">个</text>
						</view>
					</uni-list-item>
					<uni-list-item title="是否外包作业" :showArrow="false" class="list_border_1px">
						<view class="" slot='right'>
							<app-picker-select placeholder="请选择是否外包作业" :selectValue="inSpaceData[item.out]" :selectData="outArray" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear(item.out)" @onSelectBtn="onSelectBtn($event, item.out)"></app-picker-select>
						</view>
					</uni-list-item>
					<block v-if="inSpaceData[item.out] == '1'">
						<uni-list-item title="承包方类型" :showArrow="false" class="list_border_1px">
							<view class="" slot='right'>
								<app-picker-select placeholder="请选择除尘类型" :selectValue="inSpaceData[item.type]" :selectData="typeArray"
								 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear(item.type)"
								 @onSelectBtn="onSelectBtn($event, item.type)"></app-picker-select>
							</view>
						</uni-list-item>
						<block v-if="inSpaceData[item.type]">
							<uni-list-item :title="inSpaceData[item.type]=='1'?'单位名称':'姓名'" :showArrow="false" class="list_border_1px">
								<view class="" slot='right'>
									<input type="text" class="float_left width100px text_align_right" v-model="inSpaceData[item.name]"
									 placeholder-style="color:#ccc" :placeholder="inSpaceData[item.type]=='1'?'请输入单位名称':'请输入姓名'" />
								</view>
							</uni-list-item>
							<uni-list-item :title="inSpaceData[item.type]=='1'?'信用代码':'特种作业操作证编号'" :showArrow="false" class="list_border_1px">
								<view class="" slot='right'>
									<input type="text" class="float_left width100px text_align_right" v-model="inSpaceData[item.code]"
									 placeholder-style="color:#ccc" :placeholder="inSpaceData[item.type]=='1'?'请输入信用代码':'请输入特种作业操作证编号'" />
								</view>
							</uni-list-item>

							<uni-list-item title="联系人" :showArrow="false" class="list_border_1px" v-if="inSpaceData[item.type]=='1'">
								<view class="" slot='right'>
									<input type="text" class="float_left width100px text_align_right" v-model="inSpaceData[item.contact]"
									 placeholder-style="color:#ccc" placeholder="请输入联系人" />
								</view>
							</uni-list-item>
							<uni-list-item title="联系电话" :showArrow="false" class="list_border_1px">
								<view class="" slot='right'>
									<input type="text" class="float_left width100px text_align_right" v-model="inSpaceData[item.phone]"
									 placeholder-style="color:#ccc" placeholder="请输入联系电话" />
								</view>
							</uni-list-item>
						</block>
					</block>
				</uni-list>
			</view>
			<app-btn-check text="不涉及有限空间" @change="onChange" :check="isNotInvolv"></app-btn-check>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appBtnCheck from "@/components/app-btn/app-btn-check"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: {
			spaceData: Object
		},
		data() {
			return {
				inSpaceData: {
					state:false
				},
				allData: [],
				checkValue: 'cb',
				isShowOut: false, //
				isShowConcat: false,
				isShowTypeItem: false,
				isNotInvolv:false,//不涉及
				outArray: [{
						label: '是',
						value: '1',
						show: true,
					},
					{
						label: '否',
						value: '2',
						show: true,
					}
				],
				typeArray: [{
						label: '企业',
						value: '1',
						show: true,
					},
					{
						label: '个人',
						value: '2',
						show: true,
					}
				],
				// 水泥
				oneData: [{
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
				],
				// 混泥土
				twoData: [{
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
				],
				//平板玻璃
				threeData: [{
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
				],
				//建筑卫生陶瓷
				fourData: [{
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
				],
				//石膏板
				fiveData: [{
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
				],
				//耐火材料
				sixData: [{
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
				],
				//公辅设备设施
				sevenData: [{
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
		},
		computed: {
			...mapState(['userInfo']),
		},
		components: {
			appPickerSelect,
			appBtnCheck
		},
		watch: {
			
		},
		created() {
			this._initData();
		},
		methods: {
			_initData() {
				this.allData = [...this.oneData, ...this.twoData, ...this.threeData, ...this.fourData, ...this.fiveData, ...this.sixData,
					...this.sevenData
				];
				this._clearCommon(this.allData, 'checkName');
			},
			_clearCommon(arr, check) {
				for (var i = 0; i < arr.length; i++) {
					for (var j = 0; j < arr.length; j++) {
						if (arr[i][check] == arr[j][check] && i != j) {
							arr.splice(j, 1);
						} else {
							var obj = {
								out: 'out' + j,
								name: 'outName' + j,
								code: 'outCode' + j,
								type: 'outType' + j,
								contact: 'outContact' + j,
								phone: 'outPhone' + j
							};
							arr[j] = Object.assign(arr[j], obj);
						}
					}
				}
			},
			onCheckBox(e, item, index) {
				var val = e.detail.value;
				this.isNotInvolv = false; 
				if (val.length > 0) {
					this.$set(this.inSpaceData, item.checkValue, true); 
				}else {
					this.$set(this.inSpaceData, item.checkValue, false); 
				} 
			},
			onSelectBtn(e, key, bool = true) { 
				if (e.flag) {
					this.$set(this.inSpaceData, key, e.value);  
				}
			},
			onSelectClear(str) {
				this.$set(this.inSpaceData, str, ''); 
			},
			//不涉及
			onChange(bool) {
				this.isNotInvolv = bool; 
				if (bool) { 
					var reg = /Check/g;
					for (var prop in this.inSpaceData) {
						if (prop.match(reg) != null && prop.match(reg).length > 0) {
							this.inSpaceData[prop] = false;
						}
					}
				}
			},
			submit() {
				this.inSpaceData.state = this.isNotInvolv;
				var content = {
					infoData:this.allData,
					space3:this.inSpaceData
				};
				var opts = {
					company_id: this.userInfo.company_id,
					type: 1,
					state: this.isNotInvolv ? 2 : 1, 
					content: JSON.stringify(content)
				};
				console.log(opts)
				this.$http.post('riskSave', opts).then(res=>{
					if (res.code == 200) {
						this.$emit("changeNext", true);
					}
				});
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
