<template>
	<view class="app_limited_space_container">
		<!-- 有限空间 -->


		<view class="limited_space_wrap">
			<view class="l_sp_wrap">
				<!-- 槽罐 -->
				<app-item-input title="槽罐" textAlign="center">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<block v-for="(item, index) in leftData" :key="index">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<app-checkbox v-model="limitedSpaceData[item['checkValue']]" @changeCheckBox="onCheckBox($event, 'leftData', item, index)">
												<text class="font14 font_weight_bold vertical_align_center line_height_36px">{{item.checkName}}</text>
											</app-checkbox>
										</label>
										<image v-if="item.del" @click="onDel('leftData', item, index)" src="../../../../static/icon/del.png" class="img_size_40px vertical_align_center mar_left_5px"
										 mode="aspectFill"></image>
									</view>
									<view class="l_sp_list_item_right float_right line_height_36px">
										<text class="float_right">个</text>
										<input type="number" v-model="limitedSpaceData[item.num]" :class="{ border_blue_focus:limitedSpaceData[item['check']]}"
										 class="text_align_center border_1px_all_ccc padding_4px mar_left_right_5px border_radius_5 width80px float_right" />
										<text class="float_right">数量</text>
									</view>
								</view>
							</view>
						</block> 
					</view>
				</app-item-input>

				<app-btn-add text="添加" @onBtn="onAddBtn('leftData')"></app-btn-add>
			</view>

			<view class="l_sp_wrap mar_bottom_10px mar_top_10px">
				<!-- 工艺设备 -->
				<app-item-input title="工艺设备" textAlign="center">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<block v-for="(item, index) in rightTopData" :key="index">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<app-checkbox v-model="limitedSpaceData[item['checkValue']]" @changeCheckBox="onCheckBox($event, 'rightTopData', item, index)">
												<text class="font14 font_weight_bold vertical_align_center line_height_36px">{{item.checkName}}</text>
											</app-checkbox>
										</label>
										<image v-if="item.del" @click="onDel('rightTopData', item, index)" src="../../../../static/icon/del.png"
										 class="img_size_40px vertical_align_center mar_left_5px" mode="aspectFill"></image>
									</view>
									<view class="l_sp_list_item_right float_right line_height_36px">
										<text class="float_right">个</text>
										<input type="number" v-model="limitedSpaceData[item.num]" :class="{ border_blue_focus:limitedSpaceData[item['check']]}"
										 class="text_align_center border_1px_all_ccc padding_4px mar_left_right_5px border_radius_5 width80px float_right" />
										<text class="float_right">数量</text>
									</view>
								</view>
							</view>
						</block>
						<!-- <checkbox-group @change="onCheckBox($event, 'rightTopData', item, index)" v-for="(item, index) in rightTopData"
						 :key="index">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<checkbox :value="item.checkValue" :checked="limitedSpaceData[item['check']]" /><text class="font14 font_weight_bold vertical_align_center line_height_36px">{{item.checkName}}</text>
										</label>
										<image v-if="item.del" @click="onDel('rightTopData', item, index)" src="../../../../static/icon/del.png"
										 class="img_size_40px vertical_align_center mar_left_5px" mode="aspectFill"></image>
									</view>
									<view class="l_sp_list_item_right float_right line_height_36px">
										<text class="float_right">个</text>
										<input type="number" v-model="limitedSpaceData[item.num]" :class="{ border_blue_focus:limitedSpaceData[item['check']]}"
										 class="text_align_center border_1px_all_ccc padding_4px mar_left_right_5px border_radius_5 width80px float_right" />
										<text class="float_right">数量</text>
									</view>
								</view>
							</view>
						</checkbox-group> -->
					</view>
				</app-item-input>
				<app-btn-add text="添加" @onBtn="onAddBtn('rightTopData')"></app-btn-add>
			</view>

			<view class="l_sp_wrap">
				<!-- 公辅设备设施 -->
				<app-item-input title="公辅设备设施" textAlign="center">
					<view class="s_w_a_d_item_wrap" slot='item'>
						<block v-for="(item, index) in rightBotData" :key="index">
							<view class="l_sp_list">
								<view class="l_sp_list_item clearfix">
									<view class="l_sp_list_item_left float_left line_height_36px">
										<label class="line_height_36px">
											<app-checkbox v-model="limitedSpaceData[item['checkValue']]"  @changeCheckBox="onCheckBox($event, 'rightBotData', item, index)">
												<text class="font14 font_weight_bold vertical_align_center line_height_36px">{{item.checkName}}</text>
											</app-checkbox>
										</label>
										<image v-if="item.del" @click="onDel('rightBotData', item, index)" src="../../../../static/icon/del.png"
										 class="img_size_40px vertical_align_center mar_left_5px" mode="aspectFill"></image>
									</view>
									<view class="l_sp_list_item_right float_right line_height_36px">
										<text class="float_right">个</text>
										<input type="number" v-model="limitedSpaceData[item.num]" :class="{ border_blue_focus:limitedSpaceData[item['check']]}"
										 class="text_align_center border_1px_all_ccc padding_4px mar_left_right_5px border_radius_5 width80px float_right" />
										<text class="float_right">数量</text>
									</view>
								</view>
							</view>
						</block> 
					</view>
				</app-item-input>
				<app-btn-add text="添加" @onBtn="onAddBtn('rightBotData')"></app-btn-add>
			</view>

			<hFormAlert v-if="isShowCancel" placeholder="请输入名称" title='添加' confirmText="确定" @confirm="onDetermine($event)"
			 @cancel="onCancel"></hFormAlert>
			<!-- <app-btn-check text="无" @change="onChange" :check="isNotInvolv"></app-btn-check> -->
			<app-checkbox v-model="isNotInvolv" @changeCheckBox="onChange">
				<text class="font_weight_bold vertical_align_center">无</text>
			</app-checkbox>
		</view>
	</view>
</template>

<script>
	import appBtnAdd from "@/components/app-btn/app-btn-add"
	import appItemInput from "@/components/app-item-input/app-item-input"
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue'
	import appBtnCheck from "@/components/app-btn/app-btn-check"
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
				c_b: false,
				limitedSpaceData: {},

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
			appBtnCheck,
			appCheckbox
		},
		watch: {
			bool(nv) {
				console.log(nv)
				if (nv) {
					this._syncData();
					console.log("nv", nv)
				}
			}
		},
		computed: {
			...mapState(['userInfo']),

		},
		created() {
			this._initData();
			this._syncData(); 
		},
		methods: {
			_syncData() { 
				
				if (this.cmpData != undefined || this.cmpData != null) {
					var content = this.cmpData.content;
					var state = this.cmpData.state;
					if (content != undefined) {
						var con_data = JSON.parse(content); 
						var data = con_data.space2;
						this.leftData = data['leftData'];
						this.rightTopData = data['rightTopData'];
						this.rightBotData = data['rightBotData'];
						this.limitedSpaceData = data;
					} 
					this.isNotInvolv = state == 1 ? false : true;
					
				}
			},
			_changeArrayVal() {

			},
			_initData() {
				this._changeLeftData('', false, true);
				this._changeRightBotData('', false, true);
				this._changeRightTopData('', false, true);
			},
			//添加
			onAddBtn(tag) {
				this.currentAdd = tag;
				this.isShowCancel = true;
			},
			onCheckBox(e, tag, item, index) {
				// var val = e.detail.value;
				this.isNotInvolv = false;
				// if (val.length > 0) {
				// 	item.check = true;
				// } else {
				// 	item.check = false;
				// }
				// this['limitedSpaceData'][item['checkValue']] = item.check;
				// this.log(val, tag, item, index);
				// this.$forceUpdate();
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
				this._changeLeftData('change', false, true);
				this._changeRightBotData('change', false, true);
				this._changeRightTopData('change', false, true);
			},
			_changeLeftData(state = '', bool, init = false) {
				for (var i = 0; i < this.leftData.length; i++) {
					var temp = this.leftData[i];
					if (state == 'change') {
						temp['check'] = bool;
					}
					if (init) {
						this.$set(this['limitedSpaceData'], temp.checkValue, temp.check);
					}
				}
				this.$forceUpdate();
			},
			_changeRightTopData(state = '', bool, init = false) {
				for (var i = 0; i < this.rightTopData.length; i++) {
					var temp = this.rightTopData[i];
					if (state == 'change') {
						temp['check'] = bool;
					}
					if (init) {
						this.$set(this['limitedSpaceData'], temp.checkValue, temp.check);
					}
				}
				this.$forceUpdate()
			},
			_changeRightBotData(state = '', bool, init = false) {
				for (var i = 0; i < this.rightBotData.length; i++) {
					var temp = this.rightBotData[i];
					if (state == 'change') {
						temp['check'] = bool;
					}
					if (init) {
						this.$set(this['limitedSpaceData'], temp.checkValue, temp.check);
					}
				}
				this.$forceUpdate()
			},
			_loopArr(arr, source) {
				for (var i = 0; i < arr.length; i++) {
					var temp = arr[i];
					if (source[temp['checkValue']]) {
						if (source[temp['num']] == "" || source[temp['num']] == undefined || source[temp['num']] == null) {
							this.toast(`请输入${ temp['checkName'] }的数量`);
							return false;
						}
					}
				}
				return true;
			},
			_changeNotInvolv(arr, source) {
				for (var i = 0; i < arr.length; i++) {
					var temp = arr[i];
					if (source[temp['checkValue']]) {
						return false;
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
			submit() {
				var arr = this.leftData.concat(this.rightTopData, this.rightBotData);
				var bool = this._loopArr(arr, this.limitedSpaceData);
				if (this._changeNotInvolv(arr, this.limitedSpaceData) && !this.isNotInvolv) {
					this.toast('请选择无');
					return "interrupt"
				};
				if (!bool) return "interrupt";
				this.limitedSpaceData.state = this.isNotInvolv;
				var base = {
					...this.limitedSpaceData,
					state: this.isNotInvolv,
					leftData: this.leftData,
					rightTopData: this.rightTopData,
					rightBotData: this.rightBotData
				}
				var opts = {
					company_id: this.userInfo.company_id,
					content: JSON.stringify({space2:base}),
					state: this.isNotInvolv ? 2 : 1,
					type: 1,
				};
				this.$http.post('riskSave', opts).then(res => {
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
