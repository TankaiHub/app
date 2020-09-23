<template>
	<view class="app_special_work_and_device_container">
		<!--特殊作业和特种设备-->
		<view class="special_work_and_device_wrap mar_top_10px">
			<!-- <checkbox-group @change="checkboxChange"> -->
				<app-item-input title="动火作业">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<view class="swad_item mar_bottom_10px">
							<label>
								<app-checkbox v-model="wordData.cutCheck" @changeCheckBox="checkboxChange">
									<text class="font_weight_bold">气焊(割)</text>
								</app-checkbox>
								<!-- <checkbox :value="checkVal.cutCheck" :checked="wordData.cutCheck" /><text class="font_weight_bold">气焊(割)</text> -->
							</label>
							<uni-list>
								<uni-list-item title="作业人员" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData.cutNum" />
										<text class="mar_left_10px float_left">名</text>
									</view>
								</uni-list-item>
							</uni-list>
						</view>
						<view class="swad_item mar_bottom_10px">
							<label>
								<app-checkbox v-model="wordData.dcCheck">
									<text class="font_weight_bold">电焊</text>
								</app-checkbox>
								<!-- <checkbox :value="checkVal.dcCheck" :checked="wordData.dcCheck" /><text class="font_weight_bold">电焊</text> -->
							</label>
							<uni-list>
								<uni-list-item title="作业人员" :showArrow="false">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData.dcNum" />
										<text class="mar_left_10px float_left">名</text>
									</view>
								</uni-list-item>
								<uni-list-item title="高温作业" :showArrow="false">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData.highT" />
										<text class="mar_left_10px float_left">名</text>
									</view>
								</uni-list-item>
								<uni-list-item title="高处作业" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData.highGround" />
										<text class="mar_left_10px float_left">名</text>
									</view>
								</uni-list-item>
							</uni-list>
						</view>
					</view>
				</app-item-input>
				<!-- 用电 -->
				<app-item-input title="用电" class="mar_bottom_10px">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<uni-list>
							<uni-list-item title="是否外包" :showArrow="false">
								<view class="n_ent_list_down_wrap" slot="right">
									<app-picker-select :selectData="outValueArray" :selectValue="wordData.useDcSelect" placeholder="请选择是否外包"
									 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('useDcSelect')"
									 @onSelectBtn="onSelectBtn($event, 'useDcSelect')"></app-picker-select>
								</view>
							</uni-list-item>
							<uni-list-item title="作业人员" :showArrow="false" class="list_border_1px">
								<view class="n_ent_list_down_wrap clearfix" slot="right">
									<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
									 v-model="wordData.useDcNum" />
									<text class="mar_left_10px float_left">名</text>
								</view>
							</uni-list-item>

							<block v-if="wordData.useDcSelect==1">
								<uni-list-item title="承包方类型" :showArrow="false">
									<view class="n_ent_list_down_wrap" slot="right">
										<app-picker-select :selectData="checkValueArray" :selectValue="wordData.ydType" placeholder="请选择承包方类型"
										 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('ydType')"
										 @onSelectBtn="onSelectBtn($event, 'ydType')"></app-picker-select>
									</view>
								</uni-list-item>

								<block v-if="wordData.ydType && wordData.useDcSelect==1">
									<uni-list-item :title="wordData.ydType == 1 ? '单位名称' : '姓名'" :showArrow="false" class="list_border_1px">
										<view class="n_ent_list_down_wrap clearfix" slot="right">
											<input type="text" :placeholder="wordData.ydType == 1 ? '请输入单位名称' : '请输入姓名'" placeholder-style="color:#ccc"
											 class="text_align_right float_left" v-model="wordData.ydName" />
										</view>
									</uni-list-item>
									<uni-list-item :title="wordData.ydType == 1 ? '信用代码' : '特种作业操作证编号'" :showArrow="false" class="list_border_1px">
										<view class="n_ent_list_down_wrap clearfix" slot="right">
											<input type="text" :placeholder="wordData.ydType == 1 ? '请输入信用代码' : '请输入特种作业操作证编号'" placeholder-style="color:#ccc"
											 class="text_align_right float_left" v-model="wordData.ydCode" />
										</view>
									</uni-list-item>
									<uni-list-item title="联系人" :showArrow="false" class="list_border_1px" v-if="wordData.ydType==1">
										<view class="n_ent_list_down_wrap clearfix" slot="right">
											<input type="text" placeholder="请输入联系人" placeholder-style="color:#ccc" class="text_align_right float_left"
											 v-model="wordData.ydContact" />
										</view>
									</uni-list-item>
									<uni-list-item title="联系电话" :showArrow="false" class="list_border_1px">
										<view class="n_ent_list_down_wrap clearfix" slot="right">
											<input type="number" placeholder="请输入联系电话" placeholder-style="color:#ccc" class="text_align_right float_left"
											 v-model="wordData.ydPhone" />
										</view>
									</uni-list-item>


								</block>

							</block>

						</uni-list>
					</view>
				</app-item-input>
				<!-- 吊装转运 -->
				<app-item-input title="吊装转运">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<view class="swad_item mar_bottom_10px" v-for="(item, index) in hoistingData" :key='index'>
							<label>
								<app-checkbox v-model="wordData[item.checkValue]" @changeCheckBox="checkboxChange">
									<text class="font_weight_bold">{{item.checkName}}</text>
								</app-checkbox>
								<!-- <checkbox :value="checkVal[item.checkValue]" :checked="wordData[item.checkValue]" /><text class="font_weight_bold">{{item.checkName}}</text> -->
							</label>
							<uni-list>
								<uni-list-item title="数量" :showArrow="false">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入数量" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData[item.num]" />
										<text class="mar_left_10px float_left">台</text>
									</view>
								</uni-list-item>
								<uni-list-item title="作业人员" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData[item.man]" />
										<text class="mar_left_10px float_left">名</text>
									</view>
								</uni-list-item>
							</uni-list>
						</view>
					</view>
				</app-item-input>
				<!-- 特种设备 -->
				<app-item-input title="特种设备">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<view class="swad_item mar_bottom_10px" v-for="(item, index) in deviceData" :key='index'>
							<label>
								<app-checkbox v-model="wordData[item.checkValue]" @changeCheckBox="checkboxChange">
									<text class="font_weight_bold">{{item.checkName}}</text>
								</app-checkbox>
								<!-- <checkbox :value="checkVal[item.checkValue]" :checked="wordData[item.checkValue]" /><text class="font_weight_bold">{{item.checkName}}</text> -->
							</label>
							<uni-list>
								<uni-list-item title="数量" :showArrow="false">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入数量" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData[item.num]" />
										<text class="mar_left_10px float_left">台</text>
									</view>
								</uni-list-item>
								<uni-list-item title="作业人员" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData[item.man]" />
										<text class="mar_left_10px float_left">名</text>
									</view>
								</uni-list-item>
							</uni-list>
						</view>
					</view>
				</app-item-input>
			<!-- </checkbox-group> -->
			<app-btn-add text="添加" @onBtn="onAddBtn"></app-btn-add>
			<app-checkbox v-model="isNotInvolv" @changeCheckBox="onChange">
				<text class="font_weight_bold vertical_align_center">不涉及特殊作业及特种设备</text>
			</app-checkbox>
			<!-- <app-btn-check text="不涉及特殊作业及特种设备" @change="onChange" :check="isNotInvolv"></app-btn-check> -->
			<hFormAlert v-if="isShowCancel" placeholder="请输入名称" title='名称' confirmText="添加" @confirm="onDetermine($event, 'deviceData')"
			 @cancel="onCancel"></hFormAlert>

		</view>
	</view>
</template>

<script>
	import appItemInput from "@/components/app-item-input/app-item-input"
	import appBtnAdd from "@/components/app-btn/app-btn-add"
	import appBtnCheck from "@/components/app-btn/app-btn-check"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue'
	import appCheckbox from "@/components/app-input/app-checkbox"

	import {
		mapState,
		mapMutations
	} from 'vuex'


	export default {
		props:{
			cmpData:{
				type:Object,
				default() {
					return {};
				},
			},
			bool:Boolean
		},
		data() {
			return {
				checkVal: {
					cutCheck: 'cutCheck',
					dcCheck: 'dcCheck',
					trainCheck: 'trainCheck',
					forkliftCheck: 'forkliftCheck',
					otherCheck: 'otherCheck',
					stressCheck: 'stressCheck',
					stoveCheck: 'stoveCheck',
				},
				wordRuel:[
					{
						msg: '请输入气焊(割)作业人员人数',
						key: "cutNum", 
						dependent: 'cutCheck', //依赖 
						dependent_val: true, //依赖值
					},{
						msg: ['请输入电焊作业人员人数', '请输入电焊高温作业人员人数', '请输入电焊高处作业人员人数'],
						key: ['dcNum', 'highT', 'highGround'], 
						msgIsArray:true,
						keyIsArray:true,
						dependent: 'dcCheck', //依赖 
						dependent_val: true, //依赖值
					}
				],
				wordData: {
					cutCheck: false, //气焊(割) -- 是否选中
					cutNum: '', //气焊(割) -- 作业人员
					dcCheck: false,
					dcNum: '', //电焊 -- 作业人员
					highT: '', //电焊 --高温作业
					highGround: '', //电焊 -- 高处作业
					useDcSelect: '', //是否外包
					ydType: '', //外包 -- 承包方类型
					useDcNum: '', //外包--是否外包
					ydName: '', //承包方 单位名称'/'姓名
					ydCode: '', //承包方 信用代码 / 特种作业操作证编号
					ydContact: '', //承包方 联系人
					ydPhone: '', //承包方 联系电话
					/////吊装转运st
					trainCheck: false,
					trainNum: '',
					trainMan: '',
					forkliftCheck: false,
					forkliftNum: '',
					forkliftMan: '',
					otherCheck: false,
					otherNum: '',
					otherMan: '',
					/////吊装转运end
					////特种设备st
					stressCheck: false,
					stressNum: '',
					stressMan: '',
					stoveCheck: false,
					stoveNum: '',
					stoveMan: '',
					///特种设备end
					dhState: false, //电焊
					gwState: false,
					gcState: false, //
					ydState: false, //用电
					dzzyState: false, //吊装转运
					tzsbState: false, //特种设备
					state: false, //是否涉及
				},
				//吊装转运
				hoistingData: [{
						checkName: '行车',
						checkValue: 'trainCheck',
						num: 'trainNum',
						numProp: 'trainNum',
						man: 'trainMan',
						manProp: 'trainMan',
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
				//特种设备
				deviceData: [{
						checkName: '压力容器',
						checkValue: 'stressCheck',
						num: 'stressNum',
						numProp: 'stressNum',
						man: 'stressMan',
						manProp: 'stressMan'
					},
					{
						checkName: '锅炉',
						checkValue: 'stoveCheck',
						num: 'stoveNum',
						numProp: 'stoveNum',
						man: 'stoveMan',
						manProp: 'stoveMan'
					},
				],
				isShowCancel: false, //添加其他特种设备
				isNotInvolv: false, //是否不涉及
				//是否外包
				outValueArray: [{
					label: '外包电工',
					value: "1",
					show: true,
				}, {
					label: '自有电工',
					value: "2",
					show: true,
				}],
				//承包方类型
				checkValueArray: [{
					label: '企业',
					value: "1",
					show: true,
				}, {
					label: '个人',
					value: "2",
					show: true,
				}],
				// 是  否
				commonArray: [{
					label: '是',
					value: "1",
					show: true,
				}, {
					label: '否',
					value: "2",
					show: true,
				}],
				uniqueWorkArray: [{
					label: '自有电工作业',
					value: "1",
					show: true,
				}, {
					label: '外包电工作业',
					value: "2",
					show: true,
				}],
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		components: {
			appItemInput,
			appBtnAdd,
			appBtnCheck,
			appPickerSelect,
			hFormAlert,
			appCheckbox
		},
		watch:{
			bool(nv) {
				if (nv) {
					this._syncData();
				}
			}
		},
		created() {
			this._syncData();
		},
		methods: {
			_syncData() {
				console.log(this.cmpData)
				if (this.cmpData != undefined || this.cmpData != null) {
					var content = this.cmpData.content;
					var state = this.cmpData.state;
					if (content != undefined || content != "") {
						var data = JSON.parse(content); 
						console.log(data)
						this.wordData = data['workOne'];
						this.deviceData = data['workOne']['deviceData'];
						// this.wordData = this.work_one_data['workOne'];
						// this.deviceData = this.work_one_data['workOne']['deviceData'];
						
					} 
					this.isNotInvolv = state == 1 ? false : true;
					
				}
			},
			checkboxChange() {
				// var arr = e.detail.value;
				// var checkVal = this.checkVal;
				this.isNotInvolv = false;
				// this.wordData['dhState'] = false;
				// this.wordData['gcState'] = false;
				// this.wordData['gwState'] = false;
				// this.wordData['ydState'] = false;
				// this.wordData['dzzyState'] = false;

				// for (var prop in this.checkVal) {
				// 	this.wordData[prop] = false;
				// 	for (var i = 0; i < arr.length; i++) {
				// 		if (arr[i] == 'cutCheck') {
				// 			this.wordData['dhState'] = true;
				// 		}
				// 		if (arr[i] == 'dcCheck') {
				// 			this.wordData['gcState'] = true;
				// 			this.wordData['gwState'] = true;
				// 		}
				// 		if (arr[i] == 'useDcSelect') {
				// 			this.wordData['ydState'] = true;
				// 		}
				// 		if (arr[i] == 'trainCheck' || arr[i] == 'forkliftCheck' || arr[i] == 'otherCheck') {
				// 			this.wordData['dzzyState'] = true;
				// 		}
				// 		for (var j = 0; j < this.deviceData.length; j++) {
				// 			if (arr[i] == this.deviceData[j][prop]) {
				// 				this.wordData['tzsbState'] = true;
				// 			}
				// 		}
				// 		if (arr[i] == prop) {
				// 			this.wordData[prop] = true;
				// 		}
				// 	}
				// }
				// this.$forceUpdate()
			},
			_hasArray(arr, str) {
				var flag = false;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == str) {
						flag = true;
					}
				}
				return flag;
			},
			onAddBtn() {
				this.isShowCancel = true;
			},
			//alert st
			onDetermine(e, key) {
				var len = this[key].length;
				console.log(len)
				this[key].push({
					checkName: e,
					checkValue: 'otherCheck' + len,
					num: 'otherNum' + len,
					numProp: 'otherNumProp' + len,
					man: 'otherMan' + len,
					manProp: 'otherMan' + len
				});
				this.wordData['otherCheck' + len] = true;
				this.wordData['otherNum' + len] = '';
				this.wordData['otherMan' + len] = '';

				this.checkVal['otherCheck' + len] = 'otherCheck' + len;
				this.isShowCancel = false;
				this.isNotInvolv = false;
				this.$forceUpdate();
			},
			onCancel() {
				this.isShowCancel = false;
			},
			//alert end
			//不涉及
			onChange(bool) {
				this.isNotInvolv = bool;
				if (bool) {
					this.wordData['dhState'] = false;
					this.wordData['gcState'] = false;
					this.wordData['gwState'] = false;
					this.wordData['ydState'] = false;
					this.wordData['dzzyState'] = false;
					for (var prop in this.checkVal) {
						if (this.wordData[prop]) {
							this.wordData[prop] = false;
						}

					}
				}
				this.$forceUpdate()
			},
			getData() {
				this.wordData.state = this.isNotInvolv;
				var temp = {
					workOne: {
						...this.wordData,
						deviceData: this.deviceData
					}
				}
				var opts = {
					company_id: this.userInfo.company_id,
					content: JSON.stringify(temp),
					state: this.isNotInvolv ? 2 : 1,
					type: 2,
				};
				return opts;
			},
			submit() {
				var arr = this.hoistingData.concat(this.deviceData)
				var ruleBool = this._cheangeRule(this.wordRuel, this.wordData);
				if (!ruleBool) return "interrupt";
				var loopBool = this._loopArr(arr, this.wordData);
				if (!ruleBool) return "interrupt"; 
				if (!ruleBool && !loopBool && !this.isNotInvolv) {
					this.toast('请选择不涉及特殊作业及特种设备');
					return "interrupt"
				}
				if (!ruleBool || !loopBool) return "interrupt";
				var opts = this.getData();
				this.$http.post('riskSave', opts).then(res => {
					if (res.code == 200) {
						this.log(res);
						this.$emit("changeNext", true);
					}
				});
			},
			_loopArr(arr, source) {
				for (var i = 0; i < arr.length; i++) {
					var temp = arr[i]; 
					if (source[temp['checkValue']]) {
						if (source[temp['num']] == "" || source[temp['num']] == undefined || source[temp['num']] == null) {
							this.toast(`请输入${ temp['checkName'] }的数量`);
							return false;
						}
						if (source[temp['man']] == "" || source[temp['man']] == undefined || source[temp['man']] == null) {
							this.toast(`请输入${ temp['checkName'] }作业人员人数`);
							return false;
						}
					}
				}
				return true;
			},
			toast(title) {
				uni.showToast({
					title,
					icon: 'none'
				})
			},
			_cheangeRule(rule, socue) {
				for (var i = 0; i < rule.length; i ++) {
					var temp = rule[i];  
					if (socue[temp['dependent']] == temp['dependent_val']) {
						if (temp['keyIsArray']) {
							for (var j = 0; j < temp['key'].length; j ++) {
								var ele = socue[temp['key'][j]];
								if (ele == '' || ele == undefined || ele == null) {
									this.toast(temp['msg'][j]);
									return false;
								}
							}
						}else {
							if (socue[temp['key']] == '' || socue[temp['key']] == undefined || socue[temp['key']] == null) {
								this.toast(temp['msg']);
								return false;
							}
						}
					}
				}
				return true;
			},
			//////select
			onSelectBtn(e, key) {
				if (e.flag) {
					this.wordData[key] = e.value;
					this.$forceUpdate();
				}
			},
			onSelectClear(str) {
				this.wordData[str] = '';
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
