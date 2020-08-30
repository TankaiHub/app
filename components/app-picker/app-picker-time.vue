<template>
	<view class="cmp_app_picker_time c_t_sel padding_5px">
		<view class="t_s_title_wrap c_t_wrap">
			<view class="t_s_title_bd c_t_bd">
				<text class="t_text_bd" @click="onPickerSelectTitle" :class="{ isActive:currentSelectText == '请选择' }">{{currentSelectText}}{{text}}</text>
				<view class="t_s_close_btn c_t_close_btn" @click="onSelectClear">X</view>
			</view>
		</view>
		<view class="cmp_app_picker_time_wrap_bd" v-if="isShowPickerTime">
			<view class="a_p_mask" @click="onMask"></view>
			<view class="minselCity">
				<view class="itmTps">
					<view class="lf" @click="onBtn(false)">取消</view>
					<view class="rg" @click="onBtn(true)">确定</view>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in currentData" :key="index">{{item}}{{text}}</view>
					</picker-view-column>
					<!-- 	<picker-view-column v-if="isShowMonth">
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column v-if="isShowDay">
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column> -->
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	export default {
		props: {
			inValue: [Number, String],
			isShowYear: {
				type: Boolean,
				default: false,
			},
			isShowDay: {
				type: Boolean,
				default: false,
			},
			isShowMonth: {
				type: Boolean,
				default: false,
			},
			isModel:{
				type: Boolean,
				default: false,
			},
		},
		model: {
			prop: "inValue",
			event: "onSelect"
		},
		data() { 
			return {
				year,
				month,
				day:'', 
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				currentSelectText: "请选择",
				isShowPickerTime: false,

			}
		},
		computed: {
			currentData() {
				var years = [],
					days = [],
					months = [];
				for (let i = 1990; i <= date.getFullYear(); i++) {
					years.push(i)
				}
				for (let i = 1; i <= 12; i++) {
					months.push(i)
				}
				for (let i = 1; i <= 31; i++) {
					days.push(i)
				}
				if (this.isShowYear) {
					return years;
				}
				if (this.isShowMonth) {
					return months
				}
				if (this.isShowDay) {
					return days
				}
			},
			value: {
				get() {
					if (this.isShowYear) {
						return [99999]
					}
					if (this.isShowMonth) {
						return [month - 1]
					}
					if (this.isShowDay) {
						return [day - 1]
					}
				},
				set(val) {
					if (this.isShowYear) {
						this.year = val;
					}
					if (this.isShowMonth) {
						this.year = month;
					}
					if (this.isShowDay) {
						this.year = day;
					}
				}
			},
			text() {
				if (this.isShowYear) {
					return '年'
				}
				if (this.isShowMonth) {
					return '月'
				}
				if (this.isShowDay) {
					return '日'
				}
			}
		},
		created() {
			if (this.isShowYear) {
				this.currentSelectText = this.year;
			}
			// if (this.isShowMonth) {
			// 	this.currentSelectText = this.month;
			// }
		},
		methods: {
			bindChange(e) {
				const val = e.detail.value;
				this.log(this.currentSelectText, val)
				this.value = val;
				this.currentSelectText = this.currentData[val];
				
			},
			onBtn(flag) { // 回调函数 取消或确定 
				this.isShowPickerTime = false;
				var obj = {};
				if (this.currentSelectText == '请选择') { 
					this.currentSelectText = this.currentData[this.value];
					this.log(this.value, this.currentSelectText)
				}
				var currntVal = this.currentSelectText;
				obj.value = this.currentSelectText;
				obj.flag = flag;
				this.log(obj, this.isModel)
				if (flag) {
					this.currentSelectText = currntVal;
					if (this.isModel) {
						this.$emit("onSelect", currntVal)
					}else {
						this.$emit("onSelect", obj);
					}
					
				}
			},
			onMask() {
				this.isShowPickerTime = false;
			},
			onPickerSelectTitle() {
				this.isShowPickerTime = true;
			},
			onSelectClear() {
				var oldVal = this.currentSelectText;
				this.currentSelectText = "请选择";
				if (oldVal == this.currentSelectText) {
					return;
				}
				this.currentSelect = {};
				this.$emit("onSelectClear");
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_app_picker_time {
		border:1px solid #ccc;
		.isActive {
			color: #ccc;
		}
	}

	.cmp_app_picker_time_wrap_bd {
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
				line-height: 100rpx;
				text-align: center;
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



		// .pickerCls {
		// 	height: 100%;
		// }
	}
</style>
