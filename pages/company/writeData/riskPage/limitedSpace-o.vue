<template>
	<view class="app_limited_space_o_container">
		<!-- 有限空间 -->
		<view class="limited_space_o_wrap">
			<view class="l_spt_wrap">
				<uni-list v-for="(item, index) in listData" :key="index">
					<uni-list-item :showArrow="false" class="list_border_1px">
						<view class="">
							<!-- <checkbox-group @change="onCheckBox($event, item, index)"> -->
								<label>
									<app-checkbox v-model="inSpaceData[item['checkValue']]" @changeCheckBox="onCheckBox($event, item, index)">
										<text class="font_weight_bold vertical_align_center">{{item.checkName}}</text>
									</app-checkbox>
									<!-- <checkbox :value="checkValue" :checked="inSpaceData[item.checkValue]" /><text class="font_weight_bold vertical_align_center">{{item.checkName}}</text> -->
								</label>
								<image v-if="item.del" @click="onDel('listData', item, index)" src="../../../../static/icon/del.png" class="img_size_40px vertical_align_center mar_left_5px"
								 mode="aspectFill"></image>
							<!-- </checkbox-group> -->
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
				<app-btn-add text="添加" @onBtn="onAddBtn('listData')"></app-btn-add>
				<hFormAlert v-if="isShowCancel" placeholder="请输入名称" title='添加' confirmText="确定" @confirm="onDetermine($event)"
				 @cancel="onCancel"></hFormAlert>
			</view>
			<!-- <app-btn-check text="不涉及有限空间" @change="onChange" :check="isNotInvolv"></app-btn-check> -->
			<app-checkbox v-model="isNotInvolv" @changeCheckBox="onChange">
				<text class="font_weight_bold vertical_align_center">不涉及有限空间</text>
			</app-checkbox>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appBtnCheck from "@/components/app-btn/app-btn-check"
	import appBtnAdd from "@/components/app-btn/app-btn-add"
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
				inSpaceData: {
					state: false,
				},
				checkValue: 'cb',
				currentAdd: '', //那个模块添加条目
				isShowCancel: false, //是否显示弹窗
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
				isNotInvolv: false,
				listData: [{
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
						checkName: '消防水池',
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
			}
		},
		components: {
			appPickerSelect,
			appBtnCheck,
			appBtnAdd,
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
					console.log("nv", nv)
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
					if (content != undefined) {
						var con_obj = JSON.parse(content);
						console.log(con_obj)
						var data = con_obj.space;
						this.listData = data.listData;
						this.inSpaceData = data;
						console.log(this.inSpaceData)
					}
					this.isNotInvolv = state == 1 ? false : true;
				}
			},
			// this.inSpaceData.state = this.isNotInvolv;
			onCheckBox(e, item, index) {
				// var val = e.detail.value;
				this.isNotInvolv = false;
				/* if (val.length > 0) {
					this.$set(this.inSpaceData, item.checkValue, true);
				} else {
					this.$set(this.inSpaceData, item.checkValue, false);
				} */
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
					for (var i = 0; i < this.listData.length; i ++) {
						var temp = this.listData[i];
						this.inSpaceData[temp['checkValue']] = false;
					}
				}
				// if (bool) {
				// 	var reg = /Check/g;
				// 	for (var prop in this.inSpaceData) {
				// 		if (prop.match(reg) != null && prop.match(reg).length > 0) {
				// 			this.inSpaceData[prop] = false;
				// 		}
				// 	}
				// }
			},
			//添加
			onAddBtn(tag) {
				this.currentAdd = tag;
				this.isShowCancel = true;
			},
			onDel(tag, item, index) {
				this[tag].splice(index, 1);
			},
			//弹窗确定
			onDetermine(checkName) {
				let index = this[this.currentAdd].length;
				var obj = {
					checkName,
					checkValue: 'otherCheck' + index,
					num: 'otherNum' + index,
					out: 'otherOut' + index,
					name: 'otherName' + index,
					apt: 'otherApt' + index,
					code: 'otherCode' + index,
					type: 'otherType' + index,
					contact: 'otherContact' + index,
					phone: 'otherPhone' + index,
					del: true
				};
				this[this.currentAdd].push(obj);
				this.isShowCancel = false;

			},
			//弹窗取消
			onCancel() {
				this.isShowCancel = false;
			},
			toast(title) {
				uni.showToast({
					title,
					icon: 'none'
				})
			},
			submit() {
				var source = this.inSpaceData;
				var bool = this._changeRule([], source)
				if (!bool) return "interrupt";

				this.inSpaceData.state = this.isNotInvolv;

				var content = {
					space: this.inSpaceData
				};
				this.inSpaceData.listData = this.listData;
				var specialS = [];
				this.listData.forEach(data => {
					if (this.inSpaceData[data.checkValue]) {
						specialS.push(data.checkName)
					}
				});
				var opts = {
					company_id: this.userInfo.company_id,
					type: 1,
					special: specialS.join(','),
					state: this.isNotInvolv ? 2 : 1,
					content: JSON.stringify(content)
				};
				console.log(opts)
				this.$http.post('riskSave', opts).then(res => {
					if (res.code == 200) {
						this.$emit("changeNext", true);
					}
				});
			},
			_changeRule(rule, souce) {
				var flag = false;
				for (var i = 0; i < this.listData.length; i++) {
					var temp = this.listData[i];

					if (souce[temp['checkValue']]) {
						flag = true;
						if (souce[temp['num']] == '' || souce[temp['num']] == undefined) {
							console.log()
							this.toast(`请输入${ temp['checkName'] }的数量`);
							return false;
						}
						if (souce[temp['out']] == '' || souce[temp['out']] == undefined) {
							this.toast(`请选择${ temp['checkName'] }是否外包`);
							return false;
						}
						if (souce[temp['out']] == '1') {
							if (souce[temp['type']] == '' || souce[temp['type']] == undefined) {
								this.toast(`请选择${ temp['checkName'] }承包方类型`);
								return false;
							}
							if (souce[temp['type']] == '1') { //企业
								if (souce[temp['name']] == '' || souce[temp['name']] == undefined) {
									this.toast(`请输入单位名称`);
									return false;
								}
								if (souce[temp['code']] == '' || souce[temp['code']] == undefined) {
									this.toast(`请输入信用代码`);
									return false;
								}
								if (souce[temp['contact']] == '' || souce[temp['contact']] == undefined) {
									this.toast(`请输入联系人`);
									return false;
								}
								if (souce[temp['phone']] == '' || souce[temp['phone']] == undefined) {
									this.toast(`请输入联系电话`);
									return false;
								}
							}
							if (souce[temp['type']] == '2') { //个人
								if (souce[temp['name']] == '' || souce[temp['name']] == undefined) {
									this.toast(`请输入姓名`);
									return false;
								}
								if (souce[temp['code']] == '' || souce[temp['code']] == undefined) {
									this.toast(`请输入特种作业操作证编号`);
									return false;
								}
								if (souce[temp['phone']] == '' || souce[temp['phone']] == undefined) {
									this.toast(`请输入联系电话`);
									return false;
								}
							}
						}

					}

				}
				if (!flag) {
					if (!this.isNotInvolv) {
						this.toast(`请选择不涉及有限空间`);
						return false;
					}
				}
				return true;
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
