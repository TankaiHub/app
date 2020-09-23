<template>
	<view class="app_special_work_and_device_t_container">
		<!--特殊作业和特种设备-->
		<view class="special_work_and_device_t_wrap mar_top_10px">

			<app-item-input title="动火作业">
				<view class="s_w_a_d_t_item_wrap" slot='item'>
					<!-- <checkbox-group v-for="(item, index) in dhData" :key="index" @change="onCheckBox($event, item, index)"> -->
					<block v-for="(item, index) in dhData" :key="index">
						<view class="swadt_item mar_bottom_10px">
							<label>
								<app-checkbox v-model="wordData[item.checkValue]" @changeCheckBox="onCheckBox($event, item, index)">
									<text class="font_weight_bold vertical_align_center">{{item.checkName}}</text>
								</app-checkbox>
								<!-- <checkbox :value="checkValue" :checked="wordData[item.checkValue]" /><text class="font_weight_bold vertical_align_center">{{item.checkName}}</text> -->
							</label>
							<uni-list>
								<uni-list-item title="作业人员" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入作业人员人数" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="wordData[item.num]" />
										<text class="mar_left_10px float_left">名</text>
									</view>
								</uni-list-item>

								<uni-list-item title="是否外包" :showArrow="false">
									<view class="n_ent_list_down_wrap" slot="right">
										<app-picker-select :selectData="outValueArray" :selectValue="wordData[item.out]" placeholder="请选择是否外包"
										 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear(item.out)"
										 @onSelectBtn="onSelectBtn($event, item.out)"></app-picker-select>
									</view>
								</uni-list-item>

								<block v-if="wordData[item.out] == 1">
									<uni-list-item title="承包方类型" :showArrow="false">
										<view class="n_ent_list_down_wrap" slot="right">
											<app-picker-select :selectData="checkValueArray" :selectValue="wordData[item.type]" placeholder="请选择承包方类型"
											 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear(item.type)"
											 @onSelectBtn="onSelectBtn($event, item.type)"></app-picker-select>
										</view>
									</uni-list-item>

									<block v-if="wordData[item.type]">
										<uni-list-item :title="wordData[item.type] == 1 ? '单位名称' : '姓名'" :showArrow="false" class="list_border_1px">
											<view class="n_ent_list_down_wrap clearfix" slot="right">
												<input type="text" :placeholder="wordData[item.type] == 1 ? '请输入单位名称' : '请输入姓名'" placeholder-style="color:#ccc"
												 class="text_align_right float_left" v-model="wordData[item.name]" />
											</view>
										</uni-list-item>
										<uni-list-item :title="wordData[item.type] == 1 ? '信用代码' : '特种作业操作证编号'" :showArrow="false" class="list_border_1px">
											<view class="n_ent_list_down_wrap clearfix" slot="right">
												<input type="text" :placeholder="wordData[item.type] == 1 ? '请输入信用代码' : '请输入特种作业操作证编号'" placeholder-style="color:#ccc"
												 class="text_align_right float_left" v-model="wordData[item.code]" />
											</view>
										</uni-list-item>
										<uni-list-item title="联系人" :showArrow="false" class="list_border_1px" v-if="wordData[item.type]==1">
											<view class="n_ent_list_down_wrap clearfix" slot="right">
												<input type="text" placeholder="请输入联系人" placeholder-style="color:#ccc" class="text_align_right float_left"
												 v-model="wordData[item.contact]" />
											</view>
										</uni-list-item>
										<uni-list-item title="联系电话" :showArrow="false" class="list_border_1px">
											<view class="n_ent_list_down_wrap clearfix" slot="right">
												<input type="number" placeholder="请输入联系电话" placeholder-style="color:#ccc" class="text_align_right float_left"
												 v-model="wordData[item.phone]" />
											</view>
										</uni-list-item>
									</block>
								</block>
							</uni-list>
						</view>

					</block>

					<!-- </checkbox-group> -->
				</view>
			</app-item-input>
			<app-item-input title="电工作业">
				<view class="s_w_a_d_t_item_wrap" slot='item'>
					<view class="swadt_item mar_bottom_10px">
						<uni-list>
							<uni-list-item title="专用变电站/配电房(室)" :showArrow="false">
								<view class="n_ent_list_down_wrap" slot="right">
									<app-picker-select :selectData="commonArray" :selectValue="wordData.uniqueSelect" placeholder="请选择专用变电站/配电房(室)"
									 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('uniqueSelect')"
									 @onSelectBtn="onSelectBtn($event, 'uniqueSelect')"></app-picker-select>
								</view>
							</uni-list-item>
							<uni-list-item title="承接方类型" :showArrow="false">
								<view class="n_ent_list_down_wrap" slot="right">
									<app-picker-select :selectData="workOutTypeArray" :selectValue="wordData.uniqueWork" placeholder="请选择承接方类型"
									 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('uniqueWork')"
									 @onSelectBtn="onSelectBtn($event, 'uniqueWork')"></app-picker-select>
								</view>
							</uni-list-item>
							<uni-list-item title="作业人员" :showArrow="false">
								<view class="n_ent_list_down_wrap" slot="right">
									<input type="text" placeholder="请输入作业人员" placeholder-style="color:#ccc" class="text_align_right float_left"
									 v-model="wordData.uniqueWorkNum" />
									<text class="mar_left_10px float_left">名</text>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
				</view>
			</app-item-input>

			<app-item-input title="特种设备">
				<view class="s_w_a_d_t_item_wrap" slot='item'>
					<!-- <checkbox-group v-for="(item, index) in deviceData" :key='index' @change="onCheckBox($event, item, index)"> -->
					<block v-for="(item, index) in deviceData" :key='index'>
						<view class="swadt_item mar_bottom_10px">
							<label>
								<app-checkbox v-model="wordData[item.checkValue]" @changeCheckBox="onCheckBox($event, item, index)">
									<text class="font_weight_bold vertical_align_center">{{item.checkName}}</text>
								</app-checkbox>
								<!-- <checkbox :value="checkValue" :checked="wordData[item.checkValue]" /><text class="font_weight_bold vertical_align_center">{{item.checkName}}</text> -->
								<image v-if="item.del" @click="onDel('deviceData', item, index)" src="../../../../static/icon/del.png" class="img_size_40px vertical_align_center mar_left_5px"
								 mode="aspectFill"></image>
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

					</block>

					<!-- </checkbox-group> -->
				</view>
			</app-item-input>

			<app-btn-add text="添加" @onBtn="onAddBtn('deviceData')"></app-btn-add>
			<!-- <app-btn-check text="不涉及特殊作业及特种设备" @change="onChange" :check="isNotInvolv"></app-btn-check> -->
			<app-checkbox v-model="isNotInvolv" @changeCheckBox="onChange">
				<text class="font_weight_bold vertical_align_center">不涉及特殊作业及特种设备</text>
			</app-checkbox>
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
		props: {
			cmpData: {
				type: Object,
				default () {
					return {};
				},
			},
			bool: Boolean
		},
		data() {
			return {
				isShowCancel: false, //添加其他特种设备
				isNotInvolv: false, //是否不涉及
				currentAdd: '', //点击添加时的标记
				wordData: {
					uniqueSelect: '',
					uniqueWork: '',
					uniqueWorkNum: '',
					state: false,
				},
				checkValue: 'cb',
				deviceData: [{
						checkName: '行车',
						checkValue: 'trainCheck',
						num: 'trainNum',
						man: 'trainMan'
					},
					{
						checkName: '叉车',
						checkValue: 'forkliftCheck',
						num: 'forkliftNum',
						man: 'forkliftMan'
					},
					{
						checkName: '锅炉',
						checkValue: 'potCheck',
						num: 'potNum',
						man: 'potMan'
					},
					{
						checkName: '压力容器',
						checkValue: 'stressCheck',
						num: 'stressNum',
						man: 'stressMan'
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
				//是否外包
				outValueArray: [{
					label: '外包',
					value: "1",
					show: true,
				}, {
					label: '自有',
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
				commonArray: [{
					label: '有',
					value: "1",
					show: true,
				}, {
					label: '无',
					value: "2",
					show: true,
				}],
				workOutTypeArray: [{
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
		components: {
			appItemInput,
			appBtnAdd,
			appBtnCheck,
			appPickerSelect,
			hFormAlert,
			appCheckbox
		},
		computed: {
			...mapState(['userInfo']),
		},
		watch: {
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
				if (this.cmpData != undefined || this.cmpData != null) {
					var content = this.cmpData.content;
					var state = this.cmpData.state;
					if (content != undefined || content != "") {
						try{
							var con_obj = JSON.parse(content);
							var data = con_obj.workTwo;
							this.deviceData = data.deviceData;
							this.wordData = data; 
						}catch(e){
							//TODO handle the exception
							console.log(e)
						}

					}
					this.isNotInvolv = state == 1 ? false : true;

				}
			},
			onSelectBtn(e, key) {
				if (e.flag) {
					this.$set(this.wordData, key, e.value);
				}
			},
			onSelectClear(str) {
				this.$set(this.wordData, key, '');
			},

			//添加
			onAddBtn(tag) {
				this.currentAdd = tag;
				this.isShowCancel = true;
			},
			//弹窗确定
			onDetermine(name, key) {
				var len = this[key].length;
				var obj = {
					checkName: name,
					checkValue: 'otherCheck' + len,
					num: 'otherNum' + len,
					man: 'otherMan' + len,
					del: true
				};
				this[this.currentAdd].push(obj);
				this.isShowCancel = false;

			},
			onCancel() {
				this.isShowCancel = false;
			},
			onDel(tag, item, index) {
				this[tag].splice(index, 1);
			},
			onCheckBox(e, item, index) {
				// var val = e.detail.value;
				this.isNotInvolv = false;
				// if (val.length > 0) {
				// 	this.$set(this.wordData, item.checkValue, true);
				// } else {
				// 	this.$set(this.wordData, item.checkValue, false);
				// }
			},
			//不涉及
			onChange(bool) {
				this.isNotInvolv = bool;
				var arr = this.deviceData.concat(this.dhData);
				for (var i = 0; i < arr.length; i ++) {
					var temp = arr[i];
					this.wordData[temp['checkValue']] = false;
				}
				// if (bool) {
				// 	var reg = /Check/g;
				// 	for (var prop in this.wordData) {
				// 		if (prop.match(reg) != null && prop.match(reg).length > 0) {
				// 			this.wordData[prop] = false;
				// 		}
				// 	}
				// }
			},
			submit() {
				var bool = this._changeRule([], this.wordData);
				if (!bool) return "interrupt";
				// if (!this.isNotInvolv) {
				// 	this.toast('请选择不涉及特殊作业及特种设备');
				// 	return "interrupt";
				// }
				this.wordData.state = this.isNotInvolv;
				this.wordData.deviceData = this.deviceData;
				var content = {
					workTwo: this.wordData
				};
				var opts = {
					company_id: this.userInfo.company_id,
					content: JSON.stringify(content),
					type: 2,
					state: this.isNotInvolv ? 2 : 1,
				};
				this.$http.post("riskSave", opts).then(res => {
					if (res.code == 200) {
						this.$emit("changeNext", true);
					}
				});
			},
			_changeRule(rule, source) {
				var flag = false;
				for (let i = 0; i < this.dhData.length; i++) {
					var temp = this.dhData[i];
					if (source[temp['checkValue']]) {
						flag = true;
						if (source[temp['num']] == '' || source[temp['num']] == undefined) {
							this.toast('请输入作业人员人数');
							return false;
						}
						if (source[temp['out']] == '' || source[temp['out']] == undefined) {
							this.toast('请选择是否外包');
							return false;
						}

						if (source[temp['out']] == '1') {
							if (source[temp['type']] == '' || source[temp['type']] == undefined) {
								console.log(source[temp['out']], temp['out'], "==================")
								this.toast('请选择承包方类型');
								return false;
							}
							if (source[temp['type']] == '1') { //企业
								if (source[temp['name']] == '' || source[temp['name']] == undefined) {
									this.toast('请输入单位名称');
									return false;
								}
								if (source[temp['code']] == '' || source[temp['code']] == undefined) {
									this.toast('请输入信用代码');
									return false;
								}
								if (source[temp['contact']] == '' || source[temp['contact']] == undefined) {
									this.toast('请输入联系人');
									return false;
								}
								if (source[temp['phone']] == '' || source[temp['phone']] == undefined) {
									this.toast('请输入联系电话');
									return false;
								}
							} else if (source[temp['type']] == '2') {
								if (source[temp['name']] == '' || source[temp['name']] == undefined) {
									this.toast('请输入姓名');
									return false;
								}
								if (source[temp['code']] == '' || source[temp['code']] == undefined) {
									this.toast('请输入特种作业操作证编号');
									return false;
								}
								if (source[temp['phone']] == '' || source[temp['phone']] == undefined) {
									this.toast('请输入联系电话');
									return false;
								}
							}
						}
					}
				}

				if (source['uniqueSelect'] != '') {
					flag = true;
					if (source['uniqueWork'] == '' || source['uniqueWork'] == undefined) {
						this.toast('请选择承接方类型');
						return false
					}
					if (source['uniqueWorkNum'] == '' || source['uniqueWorkNum'] == undefined) {
						this.toast('请输入作业人员');
						return false;
					}
				}

				for (let j = 0; j < this.deviceData.length; j++) {
					var temp = this.deviceData[j];
					if (source[temp['checkValue']]) {
						flag = true;
						if (source[temp['num']] == '' || source[temp['num']] == undefined) {
							this.toast(`请输入${temp['checkName']}数量`);
							return false;
						}
						if (source[temp['man']] == '' || source[temp['man']] == undefined) {
							this.toast(`请输入${temp['checkName']}作业人员人数`);
							return false;
						}
					}
				}

				if (!flag && !this.isNotInvolv) {
					this.toast('请选择不涉及特殊作业及特种设备');
				}
				return true;
			},
			toast(title) {
				uni.showToast({
					title,
					icon: 'none'
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
