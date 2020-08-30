<template>
	<view class="app_safety_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="安全信息"></uni-nav-bar>
		<view class="safety_wrapper">
			<uni-list>
				<uni-list-item title="厂房性质" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<app-picker-select :selectData="factoryPropertyArray" :selectValue="safetyData.factory_property" placeholder="请选择厂房性质"
						 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('factory_property')"
						 @onSelectBtn="onSelectBtn($event, 'factory_property')"></app-picker-select>
					</view>
				</uni-list-item>

				<block v-if="!isIndividual"> 
					<uni-list-item title="房屋产权证" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="propertyCertArray" :selectValue="safetyData.property_cert" placeholder="请选择房屋产权证"
							 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('property_cert')"
							 @onSelectBtn="onSelectBtn($event, 'property_cert')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="是否通过消防验收" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="commonArray" :selectValue="safetyData.fire_inspection" placeholder="请选择是否通过消防验收"
							 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('fire_inspection')"
							 @onSelectBtn="onSelectBtn($event, 'fire_inspection')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="是否配备消火栓" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="commonArray" :selectValue="safetyData.fire_hydrant" placeholder="请选择是否配备消火栓"
							 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('fire_hydrant')"
							 @onSelectBtn="onSelectBtn($event, 'fire_hydrant')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="投保情况" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<view class="n_show_list_wrap" @click="onTabShow('insuredShow')">
								<text class="color_ccc" v-if="insured_selse_list && insured_selse_list.length == 0">请选择投保情况</text>
								<view class="n_show_item text_align_right" v-for="(item, index) in insured_selse_list" :key="index">{{item.label}}</view>
							</view>
							<multiple-select v-model="insuredShow" :data="insuredArray" :default-selected="insuredDefaultSelected" @confirm="insuredSelectBtn"
							 label-name="label" value-name="value">
							</multiple-select>
						</view>
					</uni-list-item>
					<uni-list-item title="其他投保情况" :showArrow="false" v-if="isShowInsuredOther">
						<view class="n_ent_list_down_wrap" slot="right">
							<input type="text" placeholder="请输入其他投保情况" placeholder-style="color:#ccc" class="text_align_right" v-model="safetyData.insuredOther" />
						</view>
					</uni-list-item> 
				</block>


				<uni-list-item title="主要能源" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<view class="n_show_list_wrap" @click="onTabShow('energyShow')">
							<text class="color_ccc" v-if="energy_select_list && energy_select_list.length == 0">请选择主要能源</text>
							<view class="n_show_item text_align_right" v-for="(item, index) in energy_select_list" :key="index">{{item.label}}</view>
						</view>
						<multiple-select v-model="energyShow" :data="energyArray" :default-selected="energyDefaultSelected" @confirm="energySelectBtn"
						 label-name="label" value-name="value">
						</multiple-select>
					</view>
				</uni-list-item>
				<block v-if="isShowNaturalGasMode">
					<uni-list-item title="天然气供给方式" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="energy2Array" :selectValue="energy2" placeholder="请选择天然气供给方式" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('energy2', false)"
							 @onSelectBtn="onSelectBtn($event, 'energy2', false)"></app-picker-select>
						</view>
					</uni-list-item>
					<block v-if="isShowCannedMode">
						<uni-list-item title="购买渠道" :showArrow="false">
							<view class="n_ent_list_down_wrap" slot="right">
								<app-picker-select :selectData="energy3Array" :selectValue="energy3" placeholder="请选择购买渠道" :isBorder="false"
								 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('energy3', false)"
								 @onSelectBtn="onSelectBtn($event, 'energy3', false)"></app-picker-select>
							</view>
						</uni-list-item>
						<uni-list-item title="最大存储量" :showArrow="false">
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="number" placeholder="请输入最大存储量" placeholder-style="color:#ccc" class="text_align_right" v-model="energy4" />
							</view>
						</uni-list-item>
						<uni-list-item title="单位" :showArrow="false">
							<view class="n_ent_list_down_wrap" slot="right">
								<app-picker-select :selectData="energy4Array" :selectValue="energy4Unit" placeholder="请选择单位" :isBorder="false"
								 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('energy4Unit', false)"
								 @onSelectBtn="onSelectBtn($event, 'energy4Unit', false)"></app-picker-select>
							</view>
						</uni-list-item>
					</block>
				</block>
				<uni-list-item title="有无配电房" :showArrow="false" v-if="isShowPowerDistributionRoom">
					<view class="n_ent_list_down_wrap" slot="right">
						<app-picker-select :selectData="propertyCertArray" :selectValue="energy5" placeholder="请选择有无配电房" :isBorder="false"
						 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('energy5', false)"
						 @onSelectBtn="onSelectBtn($event, 'energy5', false)"></app-picker-select>
					</view>
				</uni-list-item>
			</uni-list>
			<view class="mar_top_20px mar_bottom_20px dis_flex_center">
				<button type="primary" @click="onSubmit(false)">上一步</button>
				<button type="primary" @click="onSubmit(true)">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				drawerVisible: false,

				safetyData: {
					company_id: '',
					factory_property: '', //厂房性质
					property_cert: '', //房屋产权证
					fire_inspection: '', //是否通过消防验收,
					fire_hydrant: '', //是否配备消火栓
					insured: '', //投保情况 
					insuredOther: '', //其他投保情况
					energy: '', //能源
					emergency_plan: '', //应急预案

					// emergency_plan2:'',//评审
					// emergency_plan3:'',//备案

					health_inspection: '', //职业卫生三同时
					// health_inspection_pj2:'',//职业卫生现状评价 

					health_inspection_pj: '', //职业卫生现状评价 -- 年月

					safety_inspection: '', //安全三同时

					// safety_inspection_pj2:'',//安全现状评价

					safety_inspection_pj: '', // 安全现状评价 -- 年月

					// safety_inspection_pj3:'',// 安全生产标准化情况
					// safety_inspection_pj4:'',// 达标类型
					// safety_inspection_pj5:'',// 达标等级
					// safety_inspection_pj6:'',// 达标--年月
				},
				//////////投保
				insured_selse_list: [], //选中 的 投保
				insuredDefaultSelected: [], //投保默认值
				insuredShow: false, //是否显示投保选择框
				isShowInsuredOther: false, //是否选择了其他投保情况

				//////////能源
				energy_select_list: [], //选中 的 能源
				energyDefaultSelected: [], //能源默认值
				energyStr: '', //能源
				energyShow: false, //是否显示能源选择框
				isShowNaturalGasMode: false, //是否显示天然气供给方式及其他
				energy2: '', //天然气供给方式
				isShowCannedMode: false, //罐装 时
				energy3: '', //购买渠道
				energy4: '', //最大存储量
				energy4Unit: '', //单位
				isShowPowerDistributionRoom: false, //是否显示配电房
				energy5: '', //有无配电房

				isIndividual: false, //是否是个体  true 个体  false非个体
				//厂房性质
				factoryPropertyArray: [{
					label: '自有',
					value: "1",
					show: true,
				}, {
					label: '租赁',
					value: "2",
					show: true,
				}],
				//有 or 无
				propertyCertArray: [{
					label: '有',
					value: "1",
					show: true,
				}, {
					label: '无',
					value: "2",
					show: true,
				}],
				//yes or no
				commonArray: [{
					label: '是',
					value: "1",
					show: true,
				}, {
					label: '否',
					value: "2",
					show: true,
				}],
				//投保情况
				insuredArray: [{
					label: '工伤保险',
					value: "1"
				}, {
					label: '安全生产责任险',
					value: "2"
				}, {
					label: '其他',
					value: "3"
				}, {
					label: '无',
					value: "0"
				}],
				//能源
				energyArray: [{
					label: '电',
					value: "1"
				}, {
					label: '天然气',
					value: "2"
				}, {
					label: '煤',
					value: "3"
				}, {
					label: '液化石油气',
					value: "4"
				}, {
					label: '醇基燃料',
					value: "5"
				}, {
					label: '生物燃料',
					value: "6"
				}],
				//天然气供给方式   
				energy2Array: [{
					label: '管输',
					value: "1",
					show: true,
				}, {
					label: '罐装',
					value: "2",
					show: true,
				}],
				//购买渠道
				energy3Array: [{
					label: '自产',
					value: "1",
					show: true,
				}, {
					label: '外购',
					value: "2",
					show: true,
				}],
				//最大存储量 单位
				energy4Array: [{
					label: 'm³',
					value: "1",
					show: true,
				}, {
					label: '㎏',
					value: "2",
					show: true,
				}, {
					label: 'L',
					value: "3",
					show: true,
				}],
				test:''
			}
		},
		computed: {
			...mapState(["userInfo"]),
		}, 
		components: {
			appPickerSelect,
			multipleSelect,
		},
		onLoad() {
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				this._getInfo();
			},
			//获取数据
			_getInfo() {
				var opts = {
					company_id: this.userInfo.company_id || 2244
				}; 
				this.log("11111111111111");
				this.$http.post('info', opts).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this._handleSafetyData(data);
					}
				});
			},
			//处理数据
			_handleSafetyData(data) {
				this.safetyData = {
					...data
				};
				//是否是个体
				this.isIndividual = this._isIndividual(data.scale);

				this.safetyData['factory_property'] = data.factory_property;
				this.safetyData['property_cert'] = data.property_cert;
				this.safetyData['fire_inspection'] = data.fire_inspection;
				this.safetyData['fire_hydrant'] = data.fire_hydrant;
				this.safetyData['insured'] = data.insured;
				this.safetyData['insuredOther'] = data.insuredOther;
				this.safetyData['energy'] = data.energy;
				this.safetyData['emergency_plan'] = data.emergency_plan;
				this.safetyData['health_inspection'] = data.health_inspection;
				this.safetyData['health_inspection_pj'] = data.health_inspection_pj;
				this.safetyData['safety_inspection'] = data.safety_inspection;
				this.safetyData['safety_inspection_pj'] = data.safety_inspection_pj;
				//获取到能源相关的数据
				var allEnergy = this._changeStr(data.energy, ',');
				var en = allEnergy[0];
				this.energyDefaultSelected = this._changeStr(en, '-');
				this.energy_select_list = this._changeArr(this.energyDefaultSelected, this.energyArray);
				for (var i = 0; i < this.energyDefaultSelected.length; i++) {
					var temp = this.energyDefaultSelected[i];
					try {
						if (temp == '1') {
							this.isShowPowerDistributionRoom = true;
						} else if (temp == '2') {
							this.isShowNaturalGasMode = true;
						}
					} catch (e) {
						this.isShowPowerDistributionRoom = false;
						this.isShowNaturalGasMode = false;
					}
				}
				this.energyStr = this.energy_select_list.map((el) => el.value).join("-");
				this['energy2'] = allEnergy[1] || '';
				if (this['energy2'] == 2) {
					this.isShowCannedMode = true;
				} 
				this['energy3'] = allEnergy[2] || '';
				this['energy4'] = allEnergy[3] || '';
				this['energy4Unit'] = allEnergy[4] || '';
				this.log(this['energy4Unit'], '111')
				this['energy5'] = allEnergy[5] || '';
				this.test = allEnergy[4] 
				//获取到投保数据
				this.insuredDefaultSelected = this._changeStr(data.insured, ',');
				//投保默认值
				this.insured_selse_list = this._changeArr(this.insuredDefaultSelected, this.insuredArray);
				this.log(this['energy4Unit'], '222')

			},
			//处理数组 把value相同的提出
			_changeArr(arr, or_arr) {
				var nArr = [];
				for (var i = 0; i < or_arr.length; i++) {
					for (var j = 0; j < arr.length; j++) {
						if (or_arr[i].value == arr[j]) {
							nArr.push(or_arr[i]);
						}
					}
				}
				return nArr;
			},
			//按照规则拆分字符串
			_changeStr(str, reg) {
				var arr;
				if (str == "") {
					arr = [];
				} else {
					try {
						arr = str.split(reg);
					} catch (e) {
						arr = [];
					}
				}
				return arr;
			},
			//是否是个体
			_isIndividual(num) {
				switch (num) {
					case 1:
						return false;
					case 2:
						return false;
					case 3:
						return true;
				}
			},
			/////////////////////select////////////////////////////
			onSelectBtn(e, key, bool = true) {
				if (e.flag) {
					if (bool) {
						this.safetyData[key] = e.value;
					} else {
						this[key] = e.value;
					}
					if (key == 'energy2' && e.value == '2') {
						this.isShowCannedMode = true;
					} else if (key == 'energy2' && e.value == '1') {
						this.isShowCannedMode = false;
						this.energy2 = "";
						this.energy3 = "";
						this.energy4 = "";
						this.energy4Unit = ""; 
					}
				}
			},
			onSelectClear(str, bool = true) {
				if (bool) {
					this.safetyData[str] = "";
				} else {
					this[str] = "";
				}
			},
			//多选change
			onTabShow(str) {
				this[str] = true;
			},
			//投保 选择确定
			insuredSelectBtn(data) {
				this.insured_selse_list = data;
				this.isShowInsuredOther = false;
				this.safetyData.insured = data.map((el) => {
					if (el.value == "3") {
						this.isShowInsuredOther = true;
					}else if (el.value == '0') {
						this.safetyData.insuredOther = '';
					}
					return el.value;
				}).join(",");
			},
			//能源 选择确定
			energySelectBtn(data) {
				this.energy_select_list = data;
				this.isShowNaturalGasMode = false;
				this.isShowPowerDistributionRoom = false;
				this.energyStr = data.map((el) => {
					if (el.value == "1") {
						this.isShowPowerDistributionRoom = true;
					} else if (el.value == "2") {
						this.isShowNaturalGasMode = true;
					}
					return el.value;
				}).join("-");
				if (!this.isShowNaturalGasMode) {
					this.energy2 = "";
					this.energy3 = "";
					this.energy4 = "";
					this.energy4Unit = ""; 
				}
				if (!this.isShowPowerDistributionRoom) {
					this.energy5 = '';
				}
			},
			onSubmit(bool) {
				if (bool) {
					this.safetyData.energy = this.energyStr + ',' + this.energy2 + "," + this.energy3 + ',' + this.energy4 + ',' +
						this.energy4Unit + ',' + this.energy5;
					this.safetyData.company_id = this.userInfo.company_id || 2244;
					var opts = {
						...this.safetyData
					};

					this.$http.post('safeInfoSave', opts).then(res => {
						if (res.code == 200) {
							var url = '';
							if (this.isIndividual) {//个体
								url = './riskMainPage/individual';
							}else {
								
							}

							uni.showToast({
								title: res.msg,
								icon: "success",
								success() {
									setTimeout(() => {
										uni.navigateTo({
											url
										})
									}, 1500);
								}
							})
						}
					});

				} else {
					uni.navigateTo({
						url: './base'
					})
				}
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
