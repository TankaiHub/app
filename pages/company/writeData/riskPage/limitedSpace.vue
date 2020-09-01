<template>
	<view class="app_limited_space_container">
		<!-- 有限空间 -->
		<view class="limited_space_wrap">
			<view class="l_sp_wrap">
				<!-- 槽罐 -->
				<app-item-input title="槽罐" textAlign="center">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<checkbox-group @change="onCheckBox($event, 'leftData', item, index)" v-for="(item, index) in leftData" :key="index">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<checkbox :value="item.checkValue" :checked="item.check" /><text class="font14 font_weight_bold vertical_align_center line_height_36px">{{item.checkName}}</text>
										</label>
										<image v-if="item.del" @click="onDel('leftData', item, index)" src="../../../../static/icon/del.png" class="img_size_40px vertical_align_center mar_left_5px"
										 mode="aspectFill"></image>
									</view>
									<view class="l_sp_list_item_right float_right line_height_36px">
										<text class="float_right">个</text>
										<input type="number" v-model="limitedSpaceData[item.num]" :class="{ border_blue_focus:item.check}" class="text_align_center border_1px_all_ccc padding_4px mar_left_right_5px border_radius_5 width80px float_right" />
										<text class="float_right">数量</text>
									</view>
								</view>
							</view>
						</checkbox-group>
						<!-- <checkbox-group @change="onTankCheckBox">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<checkbox :value="tankVal" :checked="tankCheck" /><text class="font14 font_weight_bold vertical_align_center line_height_36px">无</text>
										</label>
									</view>
								</view>
							</view>
						</checkbox-group> -->
					</view>
				</app-item-input>

				<app-btn-add text="添加" @onBtn="onAddBtn('leftData')"></app-btn-add>
			</view>

			<view class="l_sp_wrap mar_bottom_10px mar_top_10px">
				<!-- 工艺设备 -->
				<app-item-input title="工艺设备" textAlign="center">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<checkbox-group @change="onCheckBox($event, 'rightTopData', item, index)" v-for="(item, index) in rightTopData"
						 :key="index">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<checkbox :value="item.checkValue" :checked="item.check" /><text class="font14 font_weight_bold vertical_align_center line_height_36px">{{item.checkName}}</text>
										</label>
										<image v-if="item.del" @click="onDel('rightTopData', item, index)" src="../../../../static/icon/del.png"
										 class="img_size_40px vertical_align_center mar_left_5px" mode="aspectFill"></image>
									</view>
									<view class="l_sp_list_item_right float_right line_height_36px">
										<text class="float_right">个</text>
										<input type="number" v-model="limitedSpaceData[item.num]" :class="{ border_blue_focus:item.check}" class="text_align_center border_1px_all_ccc padding_4px mar_left_right_5px border_radius_5 width80px float_right" />
										<text class="float_right">数量</text>
									</view>
								</view>
							</view>
						</checkbox-group>
					</view>
				</app-item-input>
				<app-btn-add text="添加" @onBtn="onAddBtn('rightTopData')"></app-btn-add>
			</view>

			<view class="l_sp_wrap">
				<!-- 公辅设备设施 -->
				<app-item-input title="公辅设备设施" textAlign="center">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<checkbox-group @change="onCheckBox($event, 'rightBotData', item, index)" v-for="(item, index) in rightBotData"
						 :key="index">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<checkbox :value="item.checkValue" :checked="item.check" /><text class="font14 font_weight_bold vertical_align_center line_height_36px">{{item.checkName}}</text>
										</label>
										<image v-if="item.del" @click="onDel('rightBotData', item, index)" src="../../../../static/icon/del.png"
										 class="img_size_40px vertical_align_center mar_left_5px" mode="aspectFill"></image>
									</view>
									<view class="l_sp_list_item_right float_right line_height_36px">
										<text class="float_right">个</text>
										<input type="number" v-model="limitedSpaceData[item.num]" :class="{ border_blue_focus:item.check}" class="text_align_center border_1px_all_ccc padding_4px mar_left_right_5px border_radius_5 width80px float_right" />
										<text class="float_right">数量</text>
									</view>
								</view>
							</view>
						</checkbox-group>
					</view>
				</app-item-input>
				<app-btn-add text="添加" @onBtn="onAddBtn('rightBotData')"></app-btn-add>
			</view>

			<hFormAlert v-if="isShowCancel" placeholder="请输入名称" title='添加' confirmText="确定" @confirm="onDetermine($event)"
			 @cancel="onCancel"></hFormAlert>
			<app-btn-check text="无" @change="onChange" :check="isNotInvolv"></app-btn-check>
		</view>
	</view>
</template>

<script>
	import appBtnAdd from "@/components/app-btn/app-btn-add"
	import appItemInput from "@/components/app-item-input/app-item-input"
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue'
	import appBtnCheck from "@/components/app-btn/app-btn-check"

	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				limitedSpaceData: {

				},
				leftData: [{
						checkName: '糖化罐',
						checkValue: 'sugarCheck',
						num: 'sugarNum',
						check: false,
					},
					{
						checkName: '层流罐',
						checkValue: 'flowCheck',
						num: 'flowNum',
						check: false,
					},
					{
						checkName: '调浆罐',
						checkValue: 'tjCheck',
						num: 'tjNum',
						check: false,
					},
					{
						checkName: '发酵罐(池)',
						checkValue: 'fjCheck',
						num: 'fjNum',
						check: false,
					},
					{
						checkName: '种子罐',
						checkValue: 'zzCheck',
						num: 'zzNum',
						check: false,
					},
					{
						checkName: '流加糖罐',
						checkValue: 'ljCheck',
						num: 'ljNum',
						check: false,
					},
					{
						checkName: '维持罐',
						checkValue: 'wcCheck',
						num: 'wcNum',
						check: false,
					},
					{
						checkName: '消泡沫剂罐',
						checkValue: 'xpmCheck',
						num: 'xpmNum',
						check: false,
					},
					{
						checkName: '等电罐',
						checkValue: 'ddCheck',
						num: 'ddNum',
						check: false,
					},
					{
						checkName: '浸泡罐',
						checkValue: 'qpCheck',
						num: 'qpNum',
						check: false,
					},
				],
				rightTopData: [{
						checkName: '烤炉',
						checkValue: 'klCheck',
						num: 'klNum',
						check: false,
					},
					{
						checkName: '蒸煮塔',
						checkValue: 'zztCheck',
						num: 'zztNum',
						check: false,
					},
					{
						checkName: '料仓',
						checkValue: 'lcCheck',
						num: 'lcNum',
						check: false,
					},
					{
						checkName: '腌制池',
						checkValue: 'yzcCheck',
						num: 'yzcNum',
						check: false,
					},
				],
				rightBotData: [{
						checkName: '污水池(沟、槽)',
						checkValue: 'wscCheck',
						num: 'wscNum',
						check: false,
					},
					{
						checkName: '冷库',
						checkValue: 'lkCheck',
						num: 'lkNum',
						check: false,
					},
				],
				currentAdd: '', //那个模块添加条目
				isShowCancel: false, //是否显示弹窗
				// tankVal: 'tankVal', //槽罐 无
				// tankCheck: false, //槽罐 无
				isNotInvolv: false,
			}
		},
		components: {
			appBtnAdd,
			appItemInput,
			hFormAlert,
			appBtnCheck
		},
		computed: {
			...mapState(['userInfo']),
		},
		created() {
			this._initData();
		},
		methods: {
			_initData() {
				this._changeLeftData('', false, true);
				this._changeRightBotData('',false, true);
				this._changeRightTopData('',false, true);
			},
			//添加
			onAddBtn(tag) {
				this.currentAdd = tag;
				this.isShowCancel = true;
			},
			onCheckBox(e, tag, item, index) {
				var val = e.detail.value;
				this.isNotInvolv = false;
				if (val.length > 0) {
					item.check = true;
				} else {
					item.check = false;
				}
				this['limitedSpaceData'][item.checkValue] = item.check;
				this.log(val, tag, item, index);
			},
			// 槽罐 无
			// onTankCheckBox(e) {
			// 	var val = e.detail.value;
			// 	if (val.length > 0) {
			// 		this.tankCheck = true;
			// 	} else {
			// 		this.tankCheck = false;
			// 	}
			// 	for (var i = 0; i < this.leftData.length; i++) {
			// 		var temp = this.leftData[i];
			// 		temp['check'] = false;
			// 	}
			// },
			onDel(tag, item, index) {
				this[tag].splice(index, 1);
			},
			//弹窗确定
			onDetermine(checkName) {
				let index = this[this.currentAdd].length;
				var obj = {
					checkName,
					check: false,
					del: true,
					num: 'otherNum' + index,
					checkValue: 'otherCheck' + index
				};
				this[this.currentAdd].push(obj);
				this.isShowCancel = false;

			},
			//弹窗取消
			onCancel() {
				this.isShowCancel = false;
			},
			//不涉及
			onChange(e) {
				this.isNotInvolv = e;
				this._changeLeftData('change', false);
				this._changeRightBotData('change', false);
				this._changeRightTopData('change', false);
			},
			_changeLeftData(state='', bool, init=false) {
				for (var i = 0; i < this.leftData.length; i++) {
					var temp = this.leftData[i];
					if (state == 'change') {
						temp['check'] = bool;
					}
					if (init) {
						this['limitedSpaceData'][temp.checkValue] = temp.check;
					}
				}
			},
			_changeRightTopData(state='', bool, init=false) {
				for (var i = 0; i < this.rightTopData.length; i++) {
					var temp = this.rightTopData[i];
					if (state == 'change') {
						temp['check'] = bool;
					}
					if (init) {
						this['limitedSpaceData'][temp.checkValue] = temp.check;
					}
				}
			},
			_changeRightBotData(state='', bool, init=false) {
				for (var i = 0; i < this.rightBotData.length; i++) {
					var temp = this.rightBotData[i];
					if (state == 'change') {
						temp['check'] = bool;
					}
					if (init) {
						this['limitedSpaceData'][temp.checkValue] = temp.check;
					}
				}
			},
			submit() {
				var base = {
					...this.limitedSpaceData,
					state: this.isNotInvolv,
					leftData: this.leftData,
					rightTopData: this.rightTopData,
					rightBotData: this.rightBotData
				}
				var opts = {
					company_id: this.userInfo.company_id,
					content: JSON.stringify(base),
					state: this.isNotInvolv ? 2 : 1,
					type: 1,
				};
				this.$http.post('riskSave', opts).then(res=> {
					if (res.code == 200) {
						this.log(res);
						this.$emit("changeNext", true);
					}
				});
			},
		}

	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_limited_space_container {
		.limited_space_wrap {
			.l_sp_wrap {
				.l_sp_u_list {
					.uni-list-item {
						padding-left: 0;

						.uni-list-item__container.uni-list-item--first {
							padding: 24upx 0;
						}
					}
				}
			}
		}
	}
</style>
