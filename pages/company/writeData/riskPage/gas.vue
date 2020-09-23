<template>
	<view class="app_gas_container">
		<view class="gas_wrap">
			<uni-list>
				<uni-list-item title="煤气作业" :showArrow="false" class="list_border_1px">
					<view class="" slot="right">
						<app-picker-select placeholder="请选择煤气作业" :selectValue="gasData.state" :selectData="commonArray" :isBorder="false"
						 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('state')" @onSelectBtn="onSelectBtn($event, 'state')"></app-picker-select>
					</view>
				</uni-list-item>
				<block v-if="gasData.state==1">
					<uni-list-item title="产能(万吨)" :showArrow="false" class="list_border_1px">
						<view class="" slot="right">
							<input type="text" class="float_left width100px text_align_right" v-model="gasData.num" placeholder-style="color:#ccc"
							 placeholder="请输入产能" />
						</view>
					</uni-list-item>
				</block>
			</uni-list>
			<block v-if="gasData.state==1">
				<app-item-input title="煤气锅炉" class="mar_top_10px">
					<view class="high_item_wrap" slot='item'>
						<checkbox-group v-for="(ele, inx) in listData" :key="inx" class="mar_top_10px mar_bottom_10px" @change="onCheckBox($event, ele, inx)">
							<label>
								<checkbox :value="checkValue" :checked="gasData[ele.checkValue]" />
								<text class="font_weight_bold vertical_align_center">{{ele.checkName}}</text>
							</label>
							<image v-if="ele.del" @click="onDel('listData', ele, inx)" src="../../../../static/icon/del.png" class="img_size_40px vertical_align_center mar_left_5px"
							 mode="aspectFill"></image>
							<uni-list>
								<uni-list-item title="数量" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<text class="mar_left_10px float_left">{{ele.specName}}</text>
										<input type="number" placeholder="请输入数量" placeholder-style="color:#ccc" class="text_align_right float_left width144px"
										 v-model="gasData[ele.specNum]" />
									</view>
								</uni-list-item>
								<uni-list-item title="最大熔炼量(t)" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<text class="float_left">数量</text>
										<input type="number" placeholder="请输入最大熔炼量" placeholder-style="color:#ccc" class="text_align_right float_left width120px"
										 v-model="gasData[ele.num]" />
										<text class="mar_left_10px float_left">个</text>
									</view>
								</uni-list-item>
							</uni-list>
						</checkbox-group>

					</view>
				</app-item-input>
				<app-btn-add text="添加" @onBtn="onAddBtn('listData')"></app-btn-add>

			</block>
			<app-alert v-if="isShowCancel" :dataInfo="dataInfo" title="添加煤气锅炉" @confirm="onDetermine" @cancel="onCancel"></app-alert>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appItemInput from "@/components/app-item-input/app-item-input"
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect"
	import appBtnAdd from "@/components/app-btn/app-btn-add"
	import appAlert from '@/components/h-form-alert/app-alert.vue'
	import appBtnCheck from "@/components/app-btn/app-btn-check"
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
				checkValue: 'cb',
				currentAdd: '', //那个模块添加条目
				isShowCancel: false, //是否显示弹窗
				gasData: {
					state:'',
					num:'',
				},
				dataInfo: [{
						name: '名称',
						value: '',
						placeholder: '请输入名称',
						type:'text',
					},
					{
						name: '单位名称',
						value: '',
						placeholder: '请输入单位名称',
						type:'text'
					}
				],
				commonArray: [{
					label: '有',
					value: "1",
					show: true,
				}, {
					label: '无',
					value: "2",
					show: true,
				}],
				listData: [{
						checkName: '高炉',
						checkValue: 'stoveCheck',
						num: 'stoveNum',
						specName: '规格(m³)',
						specNum: 'stoveSpec',
					},
					{
						checkName: '转炉',
						checkValue: 'turnCheck',
						num: 'turnNum',
						specName: '规格(t)',
						specNum: 'turnSpec'
					},
					{
						checkName: '电炉',
						checkValue: 'dcCheck',
						num: 'dcNum',
						specName: '规格(t)',
						specNum: 'dcSpec'
					},
					{
						checkName: '煤气罐',
						checkValue: 'gasCheck',
						num: 'gasNum',
						specName: '规格(万m³)',
						specNum: 'gasSpec'
					},
				],
			}
		},
		components: {
			appPickerSelect,
			appItemInput,
			multipleSelect,
			appBtnAdd,
			appAlert,
			appBtnCheck
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
						this.listData = con_obj.listData;
						this.gasData = con_obj;
						
					}
				}
			},
			//添加
			onAddBtn(tag) {
				this.currentAdd = tag;
				this.isShowCancel = true;
			},
			onDel(tag, item, index) {
				console.log(tag)
				this[tag].splice(index, 1);
			},
			//弹窗确定
			onDetermine(info) {
				let index = this[this.currentAdd].length;
				var checkName = info[0].value;
				var unit = info[1].value;
				var obj = {
					checkName,
					del: true,
					checkValue: 'customCheck' + index,
					num: 'customNum' + index,
					specName: `规格(${unit})`,
					specNum: 'customSpec' + index,
				};
				this[this.currentAdd].push(obj);
				this.isShowCancel = false;

			},
			//弹窗取消
			onCancel() {
				this.isShowCancel = false;
			},
			onSelectClear(str) {
				this.$set(this['gasData'], key, '');
			},
			onSelectBtn(e, key) {
				if (e.flag) {
					this.$set(this['gasData'], key, e.value);
				}
			},
			onTabShow(str) {
				this[str] = true;
			},
			onCheckBox(e, item, index) {
				var val = e.detail.value;
				if (val.length > 0) {
					this.$set(this.gasData, item.checkValue, true);
				} else {
					this.$set(this.gasData, item.checkValue, false);
				}
			},
			submit() {
				var bool = this._changeRule([], this.gasData);
				if (!bool) return "interrupt";
				this.gasData.listData = this.listData;
				var opts = {
					company_id: this.userInfo.company_id,
					type: 7,
					state: this.gasData.state,
					content: JSON.stringify(this.gasData)
				} 
				this.$http.post('riskSave', opts).then(res => {
					if (res.code == 200) {
						this.$emit("changeNext", true);
					}
				}) 
			},
			_changeRule(rule, socure) {
				if (socure['state'] == '' || socure['state'] == undefined) {
					this.toast('请选择煤气作业');
					return false;
				}
				if (socure['state'] == 1) {
					if (socure['num'] == '' || socure['num'] == undefined) {
						this.toast('请输入产能');
						return false;
					}
					
					for (var i = 0; i < this.listData.length; i ++) {
						var temp = this.listData[i];
						if (socure[temp['checkValue']]) {
							if (socure[temp['specNum']] == '' || socure[temp['specNum']] == undefined) {
								this.toast('请输入数量');
								return false;
							}
							if (socure[temp['num']] == '' || socure[temp['num']] == undefined) {
								this.toast('请输入最大熔炼量');
								return false;
							}
						}
					} 
				}
				return true;
			},
			toast(title) {
				uni.showToast({
					title,
					icon:'none'
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
