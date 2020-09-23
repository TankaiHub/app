<template>
	<view class="cmp_picker_select_dust_type_container c_t_sel" :class="{ border_1px_all_ccc:isBorder, padding_5px:isPadding }">
		<view class="cmp_p_s_d_t_wrap ">
			<view class="c_t_wrap">
				<view class="c_t_bd">
					<input class="" placeholder-style="color:#ccc" type="text" v-model="selectVal" disabled placeholder="选择粉尘类别"
					 @click="onInp" :style="{ textAlign:textAlign }" />
					<view class="" @click="onClose" v-if="isShowClose"><!--c_t_close_btn-->
						<image src="../../static/icon/close.png" mode="aspectFill" class="img_size_40px vertical_align_center"></image>
					</view>
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
							<view class="item" v-for="(item,index) in dustTypeData" :key="index">
								<text>{{item}}</text>
							</view>
						</picker-view-column>
					</picker-view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			industry_category: String,
			initVal: [String, Number], 
			textAlign: {
				type: String,
				default: 'left'
			},
			isBorder: {
				type: Boolean,
				default: true
			},
			isShowClose: {
				type: Boolean,
				default: true
			},
			isPadding: {
				type: Boolean,
				default: true
			},
			isShowNot: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				selectVal: '',
				value: [0],
				/*
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				isShowPickerSelect: false,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
			}
		},
		watch: {
			industry_category(nv) {
				if (nv == '') {
					this.onClose();
				}
			},
			initVal(nv) {
				this.selectVal = nv;
			},
		},
		computed: {

			//粉尘类别
			dustTypeData() {
				switch (this.industry_category) {
					case '0':
						return ['镁粉', '铝粉', '铝铁合金粉', '钙铝合金粉', '铜硅合金粉', '硅粉', '锌粉', '钛粉', '镁合金粉', '硅铁合金粉',
							'树脂粉', '橡胶粉', '聚酯纤维', '甲基纤维', '亚麻', '棉花', '玉米淀粉', '淀粉', '大米淀粉', '小麦淀粉', '果糖粉',
							'果胶酶粉', '土豆淀粉', '小麦粉', '大豆粉', '大米粉', '奶粉', '乳糖粉', '饲料', '鱼骨粉', '血粉', '烟叶粉尘', '木粉', '纸浆粉',
							'褐煤粉尘', '褐煤/无烟煤(80:20)粉尘', '硫磺', '过氧化物', '染料', '静电粉末涂料', '调色剂', '萘', '硬脂酸铅', '硬脂酸钙', '硬脂酸钙', '乳化剂'
						];
					case '机械':
						return ['镁粉', '铝粉', '铝铁合金粉', '钙铝合金粉', '铜硅合金粉', '硅粉', '锌粉', '钛粉', '镁合金粉', '硅铁合金粉',
							'硫磺', '过氧化物', '染料', '静电粉末涂料', '调色剂', '萘', '硬脂酸铅', '硬脂酸钙', '硬脂酸钙', '乳化剂'
						];

					case '纺织':
						return ['聚酯纤维', '甲基纤维', '亚麻', '棉花', '硫磺', '过氧化物', '染料', '静电粉末涂料', '调色剂', '萘', '硬脂酸铅', '硬脂酸钙', '硬脂酸钙', '乳化剂'];

					case '建材':
						return ['褐煤粉尘', '褐煤/无烟煤(80:20)粉尘', '硫磺', '过氧化物', '染料', '静电粉末涂料', '调色剂', '萘', '硬脂酸铅', '硬脂酸钙', '硬脂酸钙', '乳化剂'];
					case '烟草':
						return ['烟叶粉尘', '硫磺', '过氧化物', '染料', '静电粉末涂料', '调色剂', '萘', '硬脂酸铅', '硬脂酸钙', '硬脂酸钙', '乳化剂'];

					case '商贸':
						return ['镁', '铝', '镁合金', '铝铁合金', '树脂粉', '橡胶粉', '硫磺', '过氧化物', '染料', '静电粉末涂料', '调色剂', '萘', '硬脂酸铅', '硬脂酸钙', '硬脂酸钙',
							'乳化剂'
						];
					case '轻工':
						return ['玉米淀粉', '大米淀粉', '小麦淀粉', '果糖粉', '果胶酶粉', '土豆淀粉', '小麦粉', '大豆粉',
							'大米粉', '奶粉', '乳糖粉', '饲料', '鱼骨粉', '血粉', '烟叶粉尘', '木粉', '纸浆粉', '树脂粉', '橡胶粉',
							'硫磺', '过氧化物', '染料', '静电粉末涂料', '调色剂', '萘', '硬脂酸铅', '硬脂酸钙', '硬脂酸钙', '乳化剂'
						];
					case '冶金':
						return ['褐煤粉尘', '褐煤/无烟煤(80:20)粉尘'];
					case '有色':
						return ['褐煤粉尘', '褐煤/无烟煤(80:20)粉尘'];
					default:
						return [];
				}
			},
			 
		},
		methods: {
			onInp() {
				this.visible = true;
				this.isShowPickerSelect = true;
			},
			bindChange(e) { 
				this.value = e.detail.value;
			},
			onBtn(bool) {
				this.visible = false;
				this.isShowPickerSelect = false;
				if (bool) {
					this.selectVal = this.dustTypeData[this.value];
					this.$emit("onSelectBtn", this.selectVal);
				}
			},
			onClose() {
				this.selectVal = "";
				this.value = [0];
				this.$emit("onSelectClose");
			},
			onMask() {
				this.isShowPickerSelect = false;
				this.visible = false;
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_picker_select_dust_type_container {

		// width: 100%;
		.cmp_p_s_d_t_wrap {
			.cmp_psdt_inp_close {

				.cmp_psdt_inp_bd {}

				.cmp_psdt_close {}
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
		}
	}
</style>
