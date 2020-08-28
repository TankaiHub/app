<template>
	<!-- 危险化学品 -->
	<view class="app_hazardous_chemicals_container">
		<view class="hazardous_chemicals_wrap">

			<!-- 气体类 -->
			<view class="h_c_gas_wrap">
				<app-item-input title="气体类">
					<view class="s_w_a_d_item_wrap clearfix" slot='item'>
						<checkbox-group @change="onCheckBox($event, 'leftData', item, index)" v-for="(item, index) in leftData" :key="index">
							<view class="swad_item float_left width50 mar_bottom_10px">
								<label>
									<checkbox :value="item.name" :checked="item.value" /><text class="font14 font_weight_bold">{{item.name}}</text>
								</label>
								<image v-if="item.del" @click="onDel('leftData', item, index)" src="../../../../static/icon/del.png" class="img_size_40px vertical_align_center mar_left_5px"
								 mode="aspectFill"></image>
								<block v-if="item.value  && item.data">
									<view class="border_1px_all_ccc border_radius_5 mar_top_10px mar_bottom_10px padding_10px width80 box_shadow3px_ccc">
										<text>{{getRow1(item.data)}}</text><br />
										<text>{{getRow2(item.data)}}</text>
										<image src="../../../../static/edit.png" class="img_size_40px" mode="aspectFill"></image>
									</view>
								</block>
							</view>
						</checkbox-group>
					</view>
				</app-item-input>

				<app-btn-add text="添加" @onBtn="onAddBtn('leftData')"></app-btn-add>
			</view>

			<!-- 液体类/固体类 -->
			<view class="h_c_liquid_solid_wrap mar_top_10px">
				<app-item-input title="液体类/固体类">
					<view class="s_w_a_d_item_wrap clearfix" slot='item'>
						<checkbox-group @change="onCheckBox($event, 'rightData', item, index)" v-for="(item, index) in rightData" :key="index">
							<view class="swad_item float_left width50 mar_bottom_10px">
								<label>
									<checkbox :value="item.name" :checked="item.value" /><text class="font14 font_weight_bold">{{item.name}}</text>
								</label>
								<image v-if="item.del" @click="onDel('rightData', item, index)" src="../../../../static/icon/del.png" class="img_size_40px vertical_align_center mar_left_5px"
								 mode="aspectFill"></image>
								<block v-if="item.value && item.data">
									<view class="border_1px_all_ccc border_radius_5 mar_top_10px mar_bottom_10px padding_10px width80 box_shadow3px_ccc">
										<text>{{getRow1(item.data)}}</text>
										<text>{{getRow2(item.data)}}</text><br />
										<image src="../../../../static/edit.png" class="img_size_40px" mode="aspectFill"></image>
									</view>
								</block>
							</view>
						</checkbox-group>
					</view>
				</app-item-input>
				<app-btn-add text="添加" @onBtn="onAddBtn('rightData')"></app-btn-add>
			</view>
			<hFormAlert v-if="isShowCancel" placeholder="请输入名称" title='添加特种设备' confirmText="确定" @confirm="onDetermine($event)"
			 @cancel="onCancel"></hFormAlert>
			<gas-and-liquid-solid-info class="galsi_bd" :data="currentAddInfoItem" @onNavBarLeft="onNavBarLeft" @change="onChangeInfo"
			 v-if="isShowAddInfo"></gas-and-liquid-solid-info>
			<app-btn-check text="不涉及危险化学品" @change="onChange" :check="isNotInvolv"></app-btn-check>
		</view>
	</view>
</template>

<script>
	import appItemInput from "@/components/app-item-input/app-item-input"
	import appBtnAdd from "@/components/app-btn/app-btn-add"
	import appBtnCheck from "@/components/app-btn/app-btn-check"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue'
	import gasAndLiquidSolidInfo from "./gasAndLiquidSolidInfo.vue"
	import {
		deepClone
	} from '@/common/js/base.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				isNotInvolv: false, //是否涉及
				isShowCancel: false, //是否显示弹窗
				leftData: [{
						name: '氮气',
						value: false,
						data: {}
					}, {
						name: '氩气',
						value: false,
						data: {}
					}, {
						name: '二氧化碳气',
						value: false,
						data: {}
					}, {
						name: '氧气',
						value: false,
						data: {}
					},
					{
						name: '乙炔',
						value: false,
						data: {}
					}, {
						name: '高能气',
						value: false,
						data: {}
					}, {
						name: '丙烷',
						value: false,
						data: {}
					}, {
						name: '液化气',
						value: false,
						data: {}
					},
					{
						name: '氢气',
						value: false,
						data: {}
					}
				],
				rightData: [{
						name: '醇基燃料',
						value: false,
						data: {}
					}, {
						name: '柴油',
						value: false,
						data: {}
					}, {
						name: '煤油',
						value: false,
						data: {}
					}, {
						name: '汽油',
						value: false,
						data: {}
					}, {
						name: '油墨',
						value: false,
						data: {}
					},
					{
						name: '洗网水',
						value: false,
						data: {}
					}, {
						name: '硫酸',
						value: false,
						data: {}
					}, {
						name: '乙酸',
						value: false,
						data: {}
					}, {
						name: '甲酸',
						value: false,
						data: {}
					}, {
						name: '液氨',
						value: false,
						data: {}
					},
					{
						name: '过氧化氢',
						value: false,
						data: {}
					}, {
						name: '次氯酸钠',
						value: false,
						data: {}
					}
				],
				currentAdd: '', //点击添加时的标记
				isShowAddInfo: false, //是否显示信息填写
				currentAddInfoItem: {},
			}
		},
		components: {
			appItemInput,
			appBtnAdd,
			appBtnCheck,
			appPickerSelect,
			hFormAlert,
			gasAndLiquidSolidInfo
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			onNavBarLeft(bool) {
				if (this.isShowAddInfo) {
					var temp = this.currentAddInfoItem;
					var str = temp.str;
					var index = temp.index;
					this.isShowAddInfo = false;
					if (!bool) {
						this[str][index]['value'] = false;

					}
				}
			},
			//不涉及
			onChange(bool) {
				this.isNotInvolv = bool;
				this._changeLeftData();
				this._changeRightData();
			},
			_changeLeftData() {
				for (var i = 0; i < this.leftData.length; i++) {
					var temp = this.leftData[i];
					temp['value'] = false;
				}
			},
			_changeRightData() {
				for (var i = 0; i < this.rightData.length; i++) {
					var temp = this.rightData[i];
					temp['value'] = false;
				}
			},
			//添加
			onAddBtn(tag) {
				this.currentAdd = tag;
				this.isShowCancel = true;
			},
			//弹窗确定
			onDetermine(name) {
				var obj = {
					name,
					value: false,
					data: {},
					del: true
				};
				this[this.currentAdd].push(obj);
				this.isShowCancel = false;

			},
			//弹窗取消
			onCancel() {
				this.isShowCancel = false;
			},
			/**
			 * @param {Object} tag  气体类 | 液体类/固体类
			 * @param {Object} item  
			 * @param {Object} index
			 */
			onDel(tag, item, index) {
				this[tag].splice(index, 1);
			},
			//气体类 checkbox
			onCheckBox(e, str, item, index) {
				var arr = e.detail.value;
				if (arr.length > 0) {
					this[str][index]['value'] = true;
					this.isShowAddInfo = true;
					this.isNotInvolv = false; 
					this.currentAddInfoItem = {
						str,
						...item,
						index
					};
				} else {
					this[str][index]['value'] = false;
				} 
			}, 
			//获取填写信息
			onChangeInfo(params) {
				// this.currentAddInfoItem.data = params;
				var temp = this.currentAddInfoItem;
				var str = temp.str;
				var index = temp.index;
				this[str][index]['data'] = params;
				console.log(str, index, params)
			},
			//获取第一行数据
			getRow1(data) {
				let saveTo = {
					1: '瓶',
					2: '罐',
					3: '箱'
				}
				return saveTo[data.save] + '装,' + data.maxNum + saveTo[data.save]
			},
			//获取第二行数据
			getRow2(data) {
				let specialTo = {
					1: '有',
					2: '无'
				}
				if (data.save == 1) {
					if (data.source == 1) {
						let s = ''
						data.companyData.forEach(data => {
							s += `购买自:${data.buyCompany}公司，${data.code},${data.name},${data.phone}；`
						})
						return s

					} else {
						return '自主生产'
					}
				} else if (data.save == 2) {
					return `${specialTo[data.special]}专用库房存放`
				}
			},
			getData() {
				var temp = {
					leftData: this.leftData,
					rightData: this.rightData
				}
				var dataS = [...this.leftData, ...this.rightData],
					special = []
				dataS.forEach(item => {
					if (item.value) {
						console.log(item['data']['purpose'], "39191919919")
						if (item.name == '液氨' && item['data'] && item['data']['purpose'] && item['data']['purpose'] == 1) {
							special.push('液氨', '涉氨制冷')
						} else {
							special.push(item.name)
						}
					}

				})
				var opts = {
					company_id: this.userInfo.company_id,
					special: special.join(','),
					state: this.isNotInvolv ? 2 : 1,
					type: 4,
					content: JSON.stringify(temp)
				}
				console.log(opts)
				return opts;
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_hazardous_chemicals_container {
		.hazardous_chemicals_wrap {
			.galsi_bd {
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 9999;
				background-color: #fff;
			}
		}
	}
</style>
