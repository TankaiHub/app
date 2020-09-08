<template>
	<view class="app_high_container">
		<!-- 高温熔融 -->
		<view class="high_wrap">
			<uni-list>
				<uni-list-item title="高温熔融" :showArrow="false" class="list_border_1px">
					<view class="" slot="right">
						<app-picker-select placeholder="请选择高温熔融" :selectValue="highData.state" :selectData="commonArray" :isBorder="false"
						 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('state')" @onSelectBtn="onSelectBtn($event, 'state')"></app-picker-select>
					</view>
				</uni-list-item>
				<block v-if="highData.state==1">
					<uni-list-item title="熔炼金属种类" :showArrow="false" class="list_border_1px">
						<view class="" slot="right">
							<app-picker-select placeholder="请选择熔炼金属种类" :selectValue="highData.species" :selectData="classArray" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('species')"
							 @onSelectBtn="onSelectBtn($event, 'species')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="其他熔炼金属种类" :showArrow="false" class="list_border_1px" v-if="highData.species == 5">
						<view class="" slot="right">
							<input type="text" class="float_left width100px text_align_right" v-model="highData.speciesOther"
							 placeholder-style="color:#ccc" placeholder="请输入其他熔炼金属种类" />
						</view>
					</uni-list-item>
				</block>
			</uni-list>
			<block v-if="highData.state==1">
				<app-item-input v-for="(item, index) in listData" :key="index" :title="item.title" class="mar_top_10px">
					<view class="high_item_wrap" slot='item'>
						<checkbox-group v-for="(ele, inx) in item.data" :key="inx" class="mar_top_10px mar_bottom_10px" @change="onCheckBox($event, ele, index)">
							<label>
								<checkbox :value="checkValue" :checked="highData[ele.checkValue]" /><text class="font_weight_bold vertical_align_center">{{ele.checkName}}</text>
							</label>
							<uni-list>
								<uni-list-item title="数量" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入数量" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="highData[ele.num]" />
										<text class="mar_left_10px float_left">个</text>
									</view>
								</uni-list-item>
								<uni-list-item title="最大熔炼量(t)" :showArrow="false" class="list_border_1px">
									<view class="n_ent_list_down_wrap clearfix" slot="right">
										<input type="number" placeholder="请输入最大熔炼量" placeholder-style="color:#ccc" class="text_align_right float_left"
										 v-model="highData[ele.maxNum]" />
									</view>
								</uni-list-item>
							</uni-list>
						</checkbox-group>
					</view>
				</app-item-input>

				<uni-list>
					<uni-list-item title="浇筑方式" :showArrow="false" class="list_border_1px">
						<view class="" slot="right">
							<app-picker-select placeholder="请选择浇筑方式" :selectValue="highData.pouring" :selectData="pouringArray" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('pouring')"
							 @onSelectBtn="onSelectBtn($event, 'pouring')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="高温熔融金属转运方式" :showArrow="false" class="list_border_1px">
						<view class="" slot="right">
							<view class="n_show_list_wrap" @click="onTabShow('turnShow')">
								<text class="color_ccc" v-if="high_select_list && high_select_list.length == 0">请选择高温熔融金属转运方式</text>
								<view class="n_show_item text_align_right" v-for="(item, index) in high_select_list" :key="index">{{item.label}}</view>
							</view>

							<multiple-select v-model="turnShow" :data="turnTypeArray" :default-selected="defaultSelected" @confirm="selectBtn"
							 label-name="label" value-name="value" :checkAll="true" :isPlural="true">
							</multiple-select>
						</view>
					</uni-list-item>
				</uni-list>
			</block>
		
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appItemInput from "@/components/app-item-input/app-item-input"
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				checkValue: 'cb',
				turnShow: false,
				high_select_list: [],
				defaultSelected: [],
				highData: {
					state: '',
					species: '',
					speciesOther: '',
					pouring: '',
					turnType: [], 
				},
				pouringArray: [{
						label: '全自动机械浇筑',
						value: "1",
						show: true,
					},
					{
						label: '人工浇筑',
						value: "2",
						show: true,
					},
					{
						label: '全自动机械浇筑+人工浇筑',
						value: "3",
						show: true,
					}
				],
				turnTypeArray: [{
						label: '轨道车转运',
						value: "轨道车转运",
						show: true,
					},
					{
						label: '行车转运',
						value: "行车转运",
						show: true,
					},
					{
						label: '叉车转运',
						value: "叉车转运",
						show: true,
					},
					{
						label: '人工转运',
						value: "人工转运",
						show: true,
					},
					{
						label: '出场道路运输',
						value: "出场道路运输",
						show: true,
					},
					{
						label: '不需转运',
						value: "不需转运",
						show: true,
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
				classArray: [{
						label: '钢',
						value: "1",
						show: true,
					},
					{
						label: '铁',
						value: "2",
						show: true,
					},
					{
						label: '铝',
						value: "3",
						show: true,
					},
					{
						label: '铜',
						value: "4",
						show: true,
					},
					{
						label: '其他',
						value: "5",
						show: true,
					}
				],
				listData: [{
						title: '熔炉装置',
						data: [{
								checkName: '中频炉',
								checkValue: 'midCheck',
								num: 'midNum',
								maxNum: 'midMaxNum'
							},
							{
								checkName: '熔铝炉',
								checkValue: 'meltCheck',
								num: 'miltNum',
								maxNum: 'miltMaxNum'
							},
							{
								checkName: '冲天炉',
								checkValue: 'dayCheck',
								num: 'dayNum',
								maxNum: 'dayMaxNum'
							},
						]
					},
					{
						title: '炼钢炉',
						data: [{
								checkName: '平炉',
								checkValue: 'flatCheck',
								num: 'flatNum',
								maxNum: 'flatMaxNum'
							},
							{
								checkName: '转炉',
								checkValue: 'turnCheck',
								num: 'turnNum',
								maxNum: 'turnMaxNum'
							},
							{
								checkName: '电炉',
								checkValue: 'dcCheck',
								num: 'dcNum',
								maxNum: 'dcMaxNum'
							},
						]
					},
				],
			}
		},
		components: {
			appPickerSelect,
			appItemInput,
			multipleSelect
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			onSelectClear(str) {
				this.$set(this['highData'], key, '');
			},
			onSelectBtn(e, key) {
				if (e.flag) {
					this.$set(this['highData'], key, e.value);
				}
			},
			selectBtn(data) {
				this.high_select_list = data;
				this.highData.turnType = data;
			},
			onTabShow(str) {
				this[str] = true;
			},
			onCheckBox(e, item, index) {
				var val = e.detail.value; 
				console.log(item)
				if (val.length > 0) {
					this.$set(this.highData, item.checkValue, true);
				}else {
					this.$set(this.highData, item.checkValue, false);
				}
			},
			submit() {
				var special, 
					speciesTo = {
						1: '钢',
						2: '铁',
						3: '铝',
						4: '铜',
						5: '其他'
					}
				special = speciesTo[this.highData.species]; 
				var opts = {
					company_id: this.userInfo.company_id,
					type: 5,
					special: special,
					state: this.highData.state,
					content: JSON.stringify(this.highData)
				};
				this.$http.post('riskSave', opts).then(res=>{
					if (res.code == 200) {
						this.$emit("changeNext", true);
					}
				})
				
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
