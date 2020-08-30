<template>
	<view class="cmp_app_picker_address">
		<!-- 	<view class="t_a_title_wrap c_t_wrap">
			<view class="t_a_title_bd c_t_bd">
				<text class="t_text_bd" @click="onPickerAddressTitle" :class="{ isActive:addressInfoText == '请选择' }">{{addressInfoText}}</text>
				<view class="t_a_close_btn c_t_close_btn" @click="onAddrClear">X</view>
			</view>

		</view> -->
		<view class="app_picker_address_wrap_bd" v-if="isShowPickerAddress">
			<view class="a_p_mask" @click="onMask"></view>
			<view class="minselCity">
				<view class="itmTps">
					<view class="lf" @click="onBtn(false)">取消</view>
					<view class="rg" @click="onBtn(true)">确定</view>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in citys" @click="onCityItem(item, index)" :key="index">{{item.address}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in areas" @click="onAreaItem(item, index)" :key="index">{{item.address}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in communitys" @click="onCommunityItem(item, index)" :key="index">{{item.address}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in streets" :key="index">{{item.address}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	import address from '@/common/js/address'
	export default {
		props: {
			currentAddr: [String, Number, Array],
		},
		data() {
			return {
				addressInfoText: '请选择',
				isShowPickerAddress: false,
				isClearAddress: false,
				citys: address,
				areas: [],
				communitys: [],
				streets: [],
				value: [0, 0, 0, 0],
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				finalNumber: '',
				finalAddress: '',
				finalLevel: '',
			}
		},

		created() {
			// this._initData();
			if (this.currentAddr && this.currentAddr.length > 0) {
				this.value = this.currentAddr;
			}
		},
		methods: {
			_initData() {
				this.communitys = [];
				address.forEach(item => {
					this.communitys.push(item);
				});
			},
			bindChange(e) {
				const val = e.detail.value;
				var oldVal = this.value;
				if (val[2] != oldVal[2]) {
					this.streets = [];
				}
				this.value = val;
			},
			onCityItem(item, index) {
				this.areas = item.option;
			},
			onAreaItem(item, index) {
				this.communitys = item.option;
			},
			onCommunityItem(item, index) {
				this.streets = item.option;
			},
			onBtn(flag) { // 回调函数 取消或确定 
				var city = this.citys[this.value[0]] || {},
					area = this.areas[this.value[1]] || {},
					community = this.communitys[this.value[2]] || {},
					street = this.streets[this.value[3]] || {},
					arr = [city, area, community, street],
					str = '',
					valueArr = [];
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].address != undefined) {
						if (i == 0) {
							str = arr[0].address;
						} else {
							str += ('-' + arr[i].address);
						}
						this.finalNumber = arr[i].number;
						this.finalAddress = arr[i].address;
						this.finalLevel = arr[i].level;
						valueArr.push(arr[i].number);
					}
				}
				var obj = {
					flag,
					// area,
					// community,
					// street,
					str,
					valueArr,
					finalNumber: this.finalNumber,
					finalAddress: this.finalAddress,
					finalLevel: this.finalLevel
				};
				this.isShowPickerAddress = false;
				this.isClearAddress = false;
				if (flag) {
					this.addressInfoText = obj.str;
					this.$emit("onAddressBtn", obj);
				}
				this.log(obj)

			},
			onMask() {
				this.isShowPickerAddress = false;
			},
			onPickerAddressTitle() {
				this.isShowPickerAddress = true;
			},
			show() {
				this.isShowPickerAddress = true;
			},
			onAddrClear() {
				var oldVal = this.addressInfoText;
				this.addressInfoText = "请选择";
				if (oldVal == this.addressInfoText) return;
				this.addressInfo = {};

				this.$emit("onClear");
			},
			breakClick(variable, str) {
				if (variable == str) {
					return true;
				}
				return false;
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_app_picker_address {

		// border:1px solid #ccc;
		.isActive {
			color: #ccc;
		}
	}

	.app_picker_address_wrap_bd {
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
				height: 100rpx;
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
