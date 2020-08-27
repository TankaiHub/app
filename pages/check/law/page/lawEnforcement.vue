<template>
	<!-- 开始检查 -->
	<view class="app_law_enforcement_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="检查"></uni-nav-bar>
		<view class="l_enf_wrap">
			<view class="l_enf_plan_wrap l_enf_common_wrap">
				<view class="l_enf_pl_title l_enf_common_title color_blue_btb text_blod">检查方案</view>
				<view class="l_enf_pl_content l_enf_common_content ">{{lawData.plan}}</view>
			</view>
			<view class="l_enf_norm_wrap l_enf_common_wrap">
				<view class="l_enf_no_title l_enf_common_title color_blue_btb text_blod">技术指导标准</view>
				<view class="l_enf_no_content l_enf_common_content">{{lawData.normal}}</view>
			</view>
			<view class="l_enf_content_wrap">
				<view class="l_enf_con_title_wrap clearfix">
					<text class="l_enf_con_t_text float_left">检查内容：</text>
					<checkbox-group @change="checkboxChange" class="float_left">
						<label class="l_enf_con_cb_wrap clearfix">
							<view class="float_left">
								<checkbox :value="checkboxVal" class="l_enf_cb_bd" :color="'#409EFF'" :disabled="isDisabled" :checked="isCheck" />
							</view>
							<view class="float_left l_enf_cb_text_bd" :class="{ color_blue_btb:isCheck }">{{checkContent}}</view>
						</label>
					</checkbox-group>
				</view>

				<view class="l_ent_content_list_bd_wrap" v-if="!isCheck">
					<view class="l_ent_con_li_b_wrap" v-for="(item, index) in lawData.content" :key="index">
						<view class="l_enf_item clearfix">
							<text class="float_left">{{index + 1}}、</text>
							<view class="l_enf_item_text float_left" :style="{ width:enfWidth+'upx' }">


								<radio-group @change="radioChange($event, item, index)">
									<label class="clearfix">
										<view class="float_left mar_bottom_10px">
											<radio :value="item['account_radio' + index]" :checked="item['account_isRadio' + index]" />
										</view>
										<view class="float_left mar_bottom_10px" :style="{ width:acWidth + 'upx' }">
											<view v-if="!item['is_show_account_input' + index]" class="dis_inline_block">{{(item.accord)}}</view>
											<input placeholder="请输入内容" :focus="item['is_show_account_input' + index]" @blur="onBlur('is_show_account_input' + index, index)"
											 v-if="item['is_show_account_input' + index]" class="l_enf_l_i_common l_enf_l_i_inp_bd" type="text" v-model="item.accord" />
											<view class="l_enf_l_i_common img_size_40upx mar_left_5px">
												<image v-show="item['account_isRadio' + index]" @click="onEditImg(item['account_radio' + index], index)"
												 class="img_size_40px mar_left_5px" src="../../../../static/edit.png" mode="aspectFill"></image>
											</view>
										</view>
									</label>

									<label class="clearfix ">
										<view class="float_left mar_bottom_10px">
											<radio :value="item['accord_n_radio' + index]" :checked="item['account_n_isRadio'+index]" />
										</view>
										<view class="float_left mar_bottom_10px" :style="{ width:acWidth + 'upx' }">
											<view v-if="!item['is_show_account_n_input' + index]" class="dis_inline_block">{{item.accord_n}}</view>
											<input placeholder="请输入内容" :focus="item['is_show_account_n_input' + index]" @blur="onBlur('is_show_account_n_input' + index, index)"
											 v-if="item['is_show_account_n_input' + index]" class="l_enf_l_i_common l_enf_l_i_inp_bd" type="text"
											 v-model="item.accord_n" />
											<view class="l_enf_l_i_common img_size_40upx mar_left_5px">
												<image v-if="item['account_n_isRadio' +index]" @click="onEditImg(item['accord_n_radio' + index], index)"
												 class="img_size_40px" src="../../../../static/edit.png" mode="aspectFill"></image>
											</view>
										</view>
										<view class="clearfix"></view>
										<view class="l_enf_select_wrap" v-if="item['account_n_isRadio'+index]">
											<app-picker-select placeholder="请选择处理措施" :selectValue="item['type_n'+index]" :selectData="typeData"
											 @onSelectClear="onSelectClear('type_n'+index, index)" @onSelectBtn="onSelectBtn($event, 'type_n'+index, index)"></app-picker-select>
										</view>
									</label>
								</radio-group>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="l_ent_btn_wrap">
				<view class="cancel_determine_btn_wrap">
					<button class="cancel_btn half can_det_btn" @click="onCancel" type="default">取消</button>
					<button class="determine_btn half can_det_btn" @click="onDetermine" type="primary">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	// import appRadio from "@/components/app-input/app-input-radio"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data(vm) {
			var _self = this;  
			return {
				drawerVisible: false, //导航
				lawData: {}, //请求的数据
				checkboxVal: 'cb', //复选框的状态
				isCheck: false, //复选框是否选中
				isDisabled: false, //复选框是否禁用
				checkContent: '', //复选框的文字
				acWidth: 400, //检查内容  -- 右边的文字宽度
				enfWidth: 430, //检查内容  -- 右边的文字宽度 + 单选框的宽度 
				flag: true, //提交时的锁
			}
		},
		components: {
			appNav,
			// appRadio,
			appPickerSelect
		},
		computed: {
			...mapState(['admin_law_item_plan_info', "admin_law_detail_info"]),
			typeData() {
				return [{ //select 的数据
					label: "立即整改",
					value: "1",
					show:true,
				}, {
					label: "责令限期整改",
					value: "2",
					show:true,
				}, {
					label: "移送",
					value: "3", 
					show:this.lawData.penalties == '2'
				}, {
					label: "当场处罚",
					value: "4", 
					show:this.lawData.penalties == '1'
				}]
			},
		},
		onLoad() {
			var _self = this;
			uni.getSystemInfo({
				success(res) {
					_self.acWidth = (res.screenWidth - 20 - 30 - 24 - 20) * 2; //padding index 
					_self.enfWidth = ((_self.acWidth / 2) + 30) * 2;
					_self._initData();
				}
			});

		},
		methods: {
			...mapMutations(['set_admin_law_item_plan_info', 'set_admin_law_detail_info']),
			//导航
			onNavBarLeft() {
				uni.navigateBack();
			},
			//初始化数据
			_initData() {
				var opts = {
					plan_id: this.admin_law_item_plan_info.plan_id
				};
				this.$http.post('contentList', opts).then(res => {
					console.log(res)
					if (res.code == 200) {
						var data = res.data;
						var content = data.content;
						var penalties = res.penalties;
						for (var i = 0; i < content.length; i++) {

							if (content[i].accord) {
								content[i]['account_radio' + i] = 'radio_1';
								content[i]['account_isRadio' + i] = false;
								content[i]['is_show_account_input' + i] = false;
							}
							if (content[i].accord_n) {
								content[i]['accord_n_radio' + i] = 'radio_2'
								content[i]['account_n_isRadio' + i] = false;
								content[i]['is_show_account_n_input' + i] = false;
								content[i]['type_n' + i] = '';
							}
						}

						this.lawData = data;
						if (data.bsj == null) {
							this.isDisabled = true;
							this.checkContent = "不涉及";
						} else {
							this.isDisabled = false;
							this.checkContent = data.bsj;
						} 

					}
				})
			},
			//是否涉及
			checkboxChange(e) {
				var val = e.detail.value;
				if (val.length > 0) {
					this.isCheck = true;
				} else {
					this.isCheck = false;
				}
			},
			//点击单选框
			radioChange(e, item, index) {
				var val = e.detail.value;
				var contents = this.lawData.content;
				var content = contents[index];
				this._clearState(contents);
				if (val == "radio_1") {
					content['account_isRadio' + index] = true;
					content['account_n_isRadio' + index] = false;
					content['is_show_account_n_input' + index] = false;
					content['type_n' + index] = "";
				} else if (val == "radio_2") {
					content['account_isRadio' + index] = false;
					content['account_n_isRadio' + index] = true;
					content['is_show_account_input' + index] = false;

				}
			},
			//点击编辑按钮
			onEditImg(val, index) {
				var contents = this.lawData.content;
				var content = contents[index];
				this._clearState(contents);
				if (val == "radio_1") {
					content['is_show_account_input' + index] = true;
					content['is_show_account_n_input' + index] = false;
				} else if (val == "radio_2") {
					content['is_show_account_input' + index] = false;
					content['is_show_account_n_input' + index] = true;

				}
			},
			//是否显示input框
			_clearState(contents) {
				for (var i = 0; i < contents.length; i++) {
					contents[i]['is_show_account_n_input' + i] = false;
					contents[i]['is_show_account_input' + i] = false;
				}
			},
			//select star////////
			onSelectBtn(e, key, index) {
				if (e.flag) {
					console.log(this['lawData']['content'])
					this['lawData']['content'][index][key] = e.value;
				}
			},
			onSelectClear(str) {
				this['lawData']['content'][index][str] = "";
			},
			//select end////////
			/////blur  input 框失去焦点
			onBlur(str, index) {
				this['lawData']['content'][index][str] = false;
			},
			//取消
			onCancel() {
				uni.navigateBack();
			},
			//确定
			onDetermine() {
				var opts;
				if (this.isCheck) { //选择不涉及
					opts = {
						task_id: this.admin_law_detail_info.task_id,
						content: this.checkContent,
						conform: "1",
						type: "",
						plan_id: this.admin_law_item_plan_info.plan_id,
						content_id: ""
					};
					this._notCheckSubmit(opts);
				} else { //
					var contents = this.lawData.content; //获取content数组
					var len = contents.length;
					if (!this.checkData(contents)) return; //校验
					contents.forEach((item, index) => { //循环 
						opts = { //配置参数
							task_id: this.admin_law_detail_info.task_id,
							plan_id: this.admin_law_item_plan_info.plan_id,
							content: this.getContent(item, index),
							conform: this.getRadio(item, index), //单选框
							type: this.getType(item, index), //处理措施
							content_id: item.content_id
						};
						console.log("befer", opts);
						this._submitBefterClear(opts, len, index); //提交前处理

					});
				}
			},
			//不涉及 --- 提交
			_notCheckSubmit(opts) {
				var _self = this;
				this.$http.post('cSubmit', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "提交成功",
							icon: "none",
							success() {
								setTimeout(() => {
									_self.onCancel();
								}, 1000);
							}
						})
					}
				})
			},

			//涉及-- 编辑提交先清空
			_submitBefterClear(opts, len, index) {
				var isShowLoading = false;
				this.$http.post('clear', {
					task_id: this.admin_law_detail_info.task_id,
					plan_id: this.admin_law_item_plan_info.plan_id,
				}, isShowLoading).then(res => {
					if (res.code == 200) {
						// console.log("clear success");
						this._checkSubmit(opts, len, index);
					}
				})
			},
			//涉及 ---- 提交
			_checkSubmit(opts, len, index) {
				var _self = this;
				var isShowLoading; 
				if (len - 1 > index) {
					isShowLoading = false;
				}else {
					isShowLoading = true;
				}
				console.log(len - 1 > index, '============', isShowLoading)
				this.$http.post('cSubmit', opts, isShowLoading).then(res => {
					if (res.code == 200) {
						if (len - 1 == index) {
							uni.showToast({
								title: "提交成功",
								icon: "none",
								success() {
									setTimeout(() => {
										_self.onCancel();
									}, 1000);
								}
							})
						}
					}
				})
			},
			//校验 
			checkData(contents) {
				var flag = true;
				contents.forEach((item, index) => {
					//校验  --  是否选中
					if (!item['account_isRadio' + index] && !item['account_n_isRadio' + index]) {
						uni.showToast({
							title: "请选择检查内容",
							icon: "none"
						});
						flag = false;
					}

					//校验  --  检查内容
					if (item['account_isRadio' + index] && item.accord == "") {
						uni.showToast({
							title: "检查内容不能为空",
							icon: "none"
						});
						flag = false;
					}
					if (item['account_n_isRadio' + index] && item.accord_n == "") {
						uni.showToast({
							title: "检查内容不能为空",
							icon: "none"
						});
						flag = false;
					}

					//校验  --  处理措施
					if (item['account_n_isRadio' + index] && item['type_n' + index] == "") {
						uni.showToast({
							title: "请选择处理措施",
							icon: "none"
						});
						flag = false;
					}
				})
				return flag;
			},

			//检查内容
			getContent(item, index) {
				if (item['account_isRadio' + index]) {
					return item.accord;
				} else if (item['account_n_isRadio' + index]) {
					return item.accord_n;
				}
			},
			//单选框
			getRadio(item, index) {
				if (item['account_isRadio' + index]) {
					return 1;
				} else if (item['account_n_isRadio' + index]) {
					return 2;
				}

			},
			//处理措施
			getType(item, index) {
				return item['type_n' + index] || '';
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_law_enforcement_container {
		.l_enf_wrap {
			padding: 20upx;

			.l_enf_common_wrap {
				margin-bottom: 20upx;

				.l_enf_common_title {
					margin: 20upx 0;
					font-size: 32upx;
				}

				.l_enf_common_content {}
			}

			.l_enf_content_wrap {
				.l_enf_con_title_wrap {
					.l_enf_con_t_text {
						font-size: 32upx;
						font-weight: bold;
					}

					.l_enf_con_cb_wrap {
						.l_enf_cb_text_bd {
							line-height: 48upx;
						}
					}
				}

				.l_ent_content_list_bd_wrap {
					margin: 20upx 0;

					.l_ent_con_li_b_wrap {
						margin: 20upx;

						.l_enf_item_text {
							.l_enf_ac_t {
								margin-bottom: 20upx;
								display: flex;
								align-items: center;
							}

							.l_enf_l_i_common {
								display: inline-block;
								// vertical-align: middle;
							}

							.l_enf_l_i_inp_bd {
								width: 85%;
								height: 64upx;
								border: 2upx solid #ccc;
								box-sizing: border-box;
								border-radius: 6upx;
							}

							.l_enf_select_wrap {
								width: 350upx;
							}
						}
					}
				}
			}

			.l_ent_btn_wrap {}


		}
	}
</style>
