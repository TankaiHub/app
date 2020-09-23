<template>
	<view class="app_gas_and_liquid_solid_container">
		<!-- 危险化学品 信息填写 -->
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="信息填写"></uni-nav-bar>
		<scroll-view scroll-y="true" :style="{ height:screenHeight * 2 + 'upx'}">
			<view class="gas_and_liquid_solid_wrap">
				<uni-list>
					<uni-list-item title="液氨用途" :showArrow="false" v-if="isShowLiquidAmmonia">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="purposeArray" :selectValue="gasLSData.purpose" placeholder="请选择液氨用途" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('purpose')"
							 @onSelectBtn="onSelectBtn($event, 'purpose')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="存储方式" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="saveArray" :selectValue="gasLSData.save" placeholder="请选择存储方式" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('save')" @onSelectBtn="onSelectBtn($event, 'save')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="数量" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<input type="number" placeholder="请输入数量" placeholder-style="color:#ccc" class="text_align_right" v-model="gasLSData.maxNum" />
						</view>
					</uni-list-item>
					<uni-list-item :title="gasLSData.save==1?'单瓶容积':gasLSData.save==2?'单罐容积':'单箱容积'" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<input type="number" placeholder="请输入容积" placeholder-style="color:#ccc" class="text_align_right" v-model="gasLSData.sinNum" />
						</view>
					</uni-list-item>
					<uni-list-item title="单位" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="sinUnitArray" :selectValue="gasLSData.sinUnit" placeholder="请选择单位" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('sinUnit')"
							 @onSelectBtn="onSelectBtn($event, 'sinUnit')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="是否有专用库房存放" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="specialArray" :selectValue="gasLSData.special" placeholder="请选择是否有专用库房"
							 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('special')"
							 @onSelectBtn="onSelectBtn($event, 'special')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="库房数量" :showArrow="false" v-if="hasHouse">
						<view class="n_ent_list_down_wrap" slot="right">
							<input type="number" placeholder="请输入库房数量" placeholder-style="color:#ccc" class="text_align_right" v-model="gasLSData.specialNum" />
						</view>
					</uni-list-item>
					<uni-list-item title="物品来源" :showArrow="false" class="list_border_1px">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="sourceArray" :selectValue="gasLSData.source" placeholder="请选择物品来源" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('source')" @onSelectBtn="onSelectBtn($event, 'source')"></app-picker-select>
						</view>
					</uni-list-item>
					<block v-for="(item,index) in companyData" :key="index" v-if="openCompany">
						<uni-list-item :showArrow="false">
							<view class="">
								购买公司
								<image src="../../../../static/icon/del.png" v-if="item.del" mode="aspectFill" class="img_size_40px vertical_align_center mar_left_5px"
								 @click="onDelCompany(index)"></image>
							</view>
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="text" placeholder="请输入购买公司" placeholder-style="color:#ccc" class="text_align_right" v-model="item.buyCompany" />

							</view>
						</uni-list-item>
						<uni-list-item title="社信代码" :showArrow="false">
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="text" placeholder="请输入社信代码" placeholder-style="color:#ccc" class="text_align_right" v-model="item.code" />
							</view>
						</uni-list-item>
						<uni-list-item title="姓名" :showArrow="false">
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="text" placeholder="请输入姓名" placeholder-style="color:#ccc" class="text_align_right" v-model="item.name" />
							</view>
						</uni-list-item>
						<uni-list-item title="联系人电话" :showArrow="false" class="list_border_1px">
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="number" placeholder="请输入联系人电话" placeholder-style="color:#ccc" class="text_align_right" v-model="item.phone" />
							</view>
						</uni-list-item>
					</block>
					<app-btn-add v-if="gasLSData.source==1" text="增加'另一家购买公司'" class="mar_left_10px" @onBtn="onAddBtn"></app-btn-add>
				</uni-list>
				<view class="mar_top_20px mar_bottom_20px dis_flex_center">
					<button type="default" @click="onSubmit(false)">取消</button>
					<button type="primary" @click="onSubmit(true)">确定</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appBtnAdd from "@/components/app-btn/app-btn-add"
	import {deepClone} from '@/common/js/base.js'
	export default {
		props: {
			glData: Object,
			isShow:Boolean
		},
		data() {
			return {
				screenHeight: 600,
				drawerVisible: false, //
				gasRule: [{
					msg: '请选择液氨用途',
					key: 'purpose',
					dependent: 'isShowLiquidAmmonia', //依赖
					dependent_val: true, //依赖值
					dependent_is_other: true,
				}, {
					msg: '请选择存储方式',
					key: 'save'
				}, {
					msg: '请输入数量',
					key: 'maxNum'
				}, {
					msg: '请输入容积',
					key: 'sinNum'
				}, {
					msg: '请选择单位',
					key: 'sinUnit'
				}, {
					msg: '请选择是否有专用库房',
					key: 'special'
				}, {
					msg: '请输入库房数量',
					key: 'specialNum',
					dependent: 'special', //依赖
					dependent_val: 1, //依赖值 
					has_dependent: true
				}, {
					msg: '请选择物品来源',
					key: 'source',
				}],
				gasLSData: {
					purpose: '', //液氨用途
					save: '', //存储方式
					maxNum: '', //数量
					sinNum: '', //容积
					sinUnit: '', //单位
					special: '', //是否有专用库房存放
					specialNum: '', //库房数量
					source: '', //物品来源
				},

				purposeArray: [{
					label: "制冷",
					value: "1",
					show: true,
				}, {
					label: "其他",
					value: "2",
					show: true,
				}],
				saveArray: [{
					label: "瓶",
					value: "1",
					show: true,
				}, {
					label: "罐",
					value: "2",
					show: true,
				}, {
					label: "箱",
					value: "3",
					show: true,
				}],
				sinUnitArray: [{
					label: "m³",
					value: "1",
					show: true,
				}, {
					label: "㎏",
					value: "2",
					show: true,
				}, {
					label: "L",
					value: "3",
					show: true,
				}],
				specialArray: [{
					label: "有",
					value: "1",
					show: true,
				}, {
					label: "无",
					value: "2",
					show: true,
				}],
				sourceArray: [{
					label: "购买",
					value: "1",
					show: true,
				}, {
					label: "自主生产",
					value: "2",
					show: true,
				}],
				companyData: [{
					buyCompany: '',
					code: '',
					name: '',
					phone: '',
				}],
				openCompany:false,
				hasHouse:false
			}
		},
		components: {
			appPickerSelect,
			appBtnAdd
		},
		computed: {
			isShowLiquidAmmonia() { //是否显示液氨
				// console.log(this.data.name, "是否显示液氨");
				if (this.glData.name == '液氨') {
					return true; 
				} else {
					return false;
				}
			},
		},
		watch:{
			isShow(nv) {
				if (nv) {
					
				}
			}
		},
		created() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight - 50;
			this._syncData();
			console.log("?????",this.isShow)
		},
		methods: {
			_syncData() { 
				var source = deepClone(this.glData, {}); 
				var data = source.data; 
				this.gasLSData = data; 
				if (this.gasLSData.source == 1) {
					this.openCompany = true; 
				}else {
					this.openCompany = false; 
				}  
				if (this.gasLSData.special == 1) {
					this.hasHouse = true; 
				} else {
					this.hasHouse = false; 
				} 
				
				if (data && data.companyData) { 
					var temp = data.companyData;
					this.companyData = [];
					if (!Array.isArray(temp)) {
						for (var prop in temp) {
							this.companyData.push(temp[prop]);
						}
					}else {
						this.companyData = temp;
					} 
				}
			},
			onNavBarLeft(bool) {
				this.$emit("onNavBarLeft", bool);
			},
			onSelectBtn(e, key) {
				if (e.flag) {
					this['gasLSData'][key] = e.value; 
					if (key == "source") { 
						if (e.value == '1') {
							this.openCompany = true;
						}else {
							this.openCompany = false;
						}
					}
					if (key == 'special') { 
						if (e.value == 1) {
							this.hasHouse = true;
						}else {
							this.hasHouse = false;
						}
					}
				}
			},
			onSelectClear(key) {
				this['gasLSData'][key] = '';
			},
			//删除购买企业
			onDelCompany(index) {
				this.companyData.splice(index, 1);
			},
			/**
			 * @param {Object} bool true-确定 false-取消
			 */
			onSubmit(bool) {
				if (bool) {
					//校验数据
					var bool = this._cheangeRule(this.gasRule, this.gasLSData);
					if (!bool) return false;
					var buyBool = this._changeBuyCompany(); 
					if (!buyBool) return false;
					if (this.gasLSData['source'] == 1) {
						this.gasLSData['companyData'] = this.companyData;
					}
					this.$emit("change", this.gasLSData);
				}
				this.onNavBarLeft(bool);
			},
			//添加购买企业
			onAddBtn() { 
				this.companyData.push({
					buyCompany: '',
					code: '',
					name: '',
					phone: '',
					del: true,
				});
			},
			_contains() {
				Array.prototype.contains = function(str) {
					for (var i = 0; i < this.length; i++) {
						if (this[i] == str) return true;
					}
					return false;
				}
			},
			_cheangeRule(rule, socue) {
				this._contains();
				for (var i = 0; i < rule.length; i++) {
					var temp = rule[i];
					if (temp['isArray']) {

						if (temp['dependent_type'] == "Array") {
							var contains = socue[temp['dependent']].contains(temp['dependent_val']);
							if (!contains && temp['not_eq_dep_val']) {
								if (socue[temp['key']].length == 0) {
									this.toast(temp['msg']);
									return false;
								}
							}
							if (contains) {
								if (socue[temp['key']].length == 0) {
									this.toast(temp['msg']);
									return false;
								}
							}
						} else if (temp['dependent_is_other']) {
							if (this[temp['dependent']] == temp['dependent_val']) {
								if (socue[temp['key']].length == 0) {
									this.toast(temp['msg']);
									return false;
								}
							}
						} else if (socue[temp['key']].length == 0) {
							this.toast(temp['msg']);
							return false;
						}
					} else {

						if (temp['dependent_is_other']) {
							if (this[temp['dependent']] == temp['dependent_val']) {
								if (socue[temp['key']] == '' || socue[temp['key']] == undefined || socue[temp['key']] == null) {
									this.toast(temp['msg']);
									return false;
								}
							}
						} else if (temp['dependent_type'] == "Array") {
							var contains = socue[temp['dependent']].contains(temp['dependent_val']);
							if (!contains && temp['not_eq_dep_val']) {
								if (socue[temp['key']] == '' || socue[temp['key']] == undefined || socue[temp['key']] == null) {
									this.toast(temp['msg']);
									return false;
								}
							}
						} else {

							if (temp['has_dependent']) {
								if (socue[temp['dependent']] == temp['dependent_val']) {
									if (socue[temp['key']] == '' || socue[temp['key']] == undefined || socue[temp['key']] == null) {
										this.toast(temp['msg']);
										console.log(temp['msg'])
										return false;
									}
								}
							} else {
								if (socue[temp['key']] == '' || socue[temp['key']] == undefined || socue[temp['key']] == null) {
									this.toast(temp['msg']);
									console.log(temp['msg'])
									return false;
								}
							}
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
			_changeBuyCompany() { 
				console.log(this.gasLSData.source)
				if (this.gasLSData.source == 2) return true;
				for (var i = 0; i < this.companyData.length; i++) {
					var temp = this.companyData[i];
					if (temp['buyCompany'] == "") {
						this.toast("请输入购买公司");
						return false;
					}
					if (temp['code'] == '') {
						this.toast('请输入社信代码');
						return false;
					}
					if (temp['name'] == '') {
						this.toast('请输入姓名');
						return false
					}
					if (temp['phone'] == '') {
						this.toast('请选择物品来源');
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

	.app_gas_and_liquid_solid_container {}
</style>
