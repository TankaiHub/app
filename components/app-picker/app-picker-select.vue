<template>
	<view class="cmp_app_picker_select c_t_sel" :class="{ isBorder:isBorder, padding_5px:isPadding }">
		<view class="t_s_title_wrap c_t_wrap">
			<view class="t_s_title_bd c_t_bd">
				<!-- , isBorder:isBorder -->
				<input @click="onPickerSelectTitle" placeholder-style="color:#ccc"  :style="{ textAlign:textAlign }" v-model="curVal" :placeholder="placeholder" disabled />
				<input type="text" v-model="selectValue" v-show="isShow" />
				<view class="t_s_close_btn c_t_close_btn" v-if="isShowClose" @click="onSelectClear">X</view>
			</view>
		</view>
		<view class="app_picker_select_wrap_bd" v-if="isShowPickerSelect">
			<view class="a_p_mask" @click="onMask"></view>
			<view class="minselCity">
				<view class="itmTps">  
					<view class="lf" @click="onBtn(false)">取消</view>
					<view class="rg" @click="onBtn(true)">确定</view>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column> 
						<view class="item" v-for="(item,index) in selectData" :key="index"  v-if="item.show">
							<text>{{item.label}}</text> 
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script> 
	export default {
		props: {
			selectData: Array,
			placeholder: {
				type: String,
				default: ''
			},
			initSelect: {
				type: String,
				default: ''
			},
			isModel: {
				type: Boolean,
				default: false
			},
			selectValue: {
				type: [String, Number],
				default: ''
			},
			modelValue: [String, Number],
			textAlign:{
				type:String,
				default:'left'
			},
			isBorder:{
				type:Boolean,
				default:true
			},
			isShowClose:{
				type:Boolean,
				default:true
			},
			isPadding:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				isShow:false,
				isShowPickerSelect: false,
				isClearSelect: false, 
				value: [0],
				/*
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				currentSelect: {},
				curVal:''
			}
		},
		watch: {
			selectValue(newVal) {
				this._initData(newVal);
			},
			selectData() { 
				// this.onSelectClear();
			},
		},
		created() { 
			this._initData(this.selectValue);
		},
		methods: {
			_initData(newVal) {
				for (var i = 0; i < this.selectData.length; i ++) {
					if (newVal == this.selectData[i].value) {
						this.curVal = this.selectData[i].label;
						this.log(this.curVal)
					}
				}
			},
			bindChange(e) { //滑动选择项
				var val = e.detail.value;
				this.value = val;
				this.currentSelect = this.selectData[val[0]];
			},

			onBtn(flag) { // 回调函数 取消或确定 
				this.isShowPickerSelect = false;
				
				var obj = this.currentSelect;
				if (!obj.value) {
					obj = this.selectData[0];
				}
				this.curVal = obj.label;
				obj.flag = flag;
				if (flag) {
					this.$emit("onSelectBtn", obj);
				} 
			},
			onMask() {
				this.isShowPickerSelect = false;
			},
			onPickerSelectTitle() {
				this.isShowPickerSelect = true;
			},
			//清除
			onSelectClear() { 
				this.currentSelect = {}; 
				this.curVal = '';
				this.value = [0]; 
				this.$emit("onSelectClear"); 
		},
		breakClick(variable, str) {
			this.log(variable, str)
			if (variable == str) {
				return true;
			} else {
				return false;
			}

		},
	}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_app_picker_select {
		&.isBorder{
			border:1px solid #ccc;
		}
		.isActive {
			color: #ccc;
		}
	}

	.app_picker_select_wrap_bd {
		position: fixed;
		z-index: 5;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		.a_p_mask {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 100;
		}

		.minselCity {
			position: absolute;
			bottom: 0;
			left: 0;
			margin-top: 20px;
			width: 100vw;
			height: 650upx;
			background-color: #FFFFFF;
			z-index: 100;

			picker-view {
				width: 100vw;
				height: 650upx;
				background-color: #FFFFFF;
			}

			.item {
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				color: #000;
			}

			.itmTps {
				width: 100vw;
				height: 88upx;
				border-bottom: 1upx solid #f3f5f9;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.lf,
				.rg {
					font-size: 30upx;
					width: 88upx;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 88upx;
				}

				.lf {
					color: #666;
				}

				.rg {
					color: #000;
				}
			}

			.pickerCls {
				height: 100%;
			}
		}
	}
</style>
