<template>
	<view class="cmp_alert_container a_mask">
		<view class="a_box">
			<view class="a_head">
				{{title}}
			</view>
			<view class="a_input clearfix">
				<view class="list_border_1px border_1px_409eff clearfix height50px" v-for="(item, index) in dataInfo">
					<view class="clearfix">
						<view class="float_left mar_bottom_10px mar_top_10px width70px">{{item.name}}</view>
						<view class="float_left mar_bottom_10px mar_top_10px">
							<input :type="item.type" :placeholder="item.placeholder" @input="onInp($event, index)" placeholder-style="color:#ccc" class="text_align_left border_none"
							 v-model="item.value" />
						</view>
					</view>
					<view class="red_color" v-show="emptyArr[index]">内容不能为空</view>
				</view> 
			</view>
			<view class="a_btn">
				<button @click="onBtn(false)" :style="{color:cancelColor}">{{cancelText}}</button>
				<button @click="onBtn(true)" :style="{color:confirmColor}">{{confirmText}}</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: { 
			title: {
				type: String,
				default: '提示'
			},
			placeholder: {
				type: String,
				default: '请点击输入'
			},
			name: {
				type: String,
				default: 'text'
			},
			type: {
				type: String,
				default: 'text'
			},
			value: {
				type: String,
				default: ''
			},
			cancelColor: {
				type: String,
				default: '#999999'
			},
			confirmColor: {
				type: String,
				default: '#333333'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			dataInfo:{
				type:Array,
				default() {
					return [];
				}
			}
		}, 
		data() {
			return {
				emptyArr:[],
			}
		},
		created() {
			
		},
		methods:{
			_initData() {
				for (var i = 0; i < this.dataInfo.length; i ++) {
					this.emptyArr.push(false);
				}
			},
			onInp(e, index) {
				this.$set(this.emptyArr, index, false); 
			},
			onBtn(bool) {
				for (var i = 0; i < this.dataInfo.length; i ++) {
					if (this.dataInfo[i]['value'] == '') {
						this.$set(this.emptyArr, i, true); 
						return;
					}
				}
				if (bool) {
					this.$emit('confirm',this.dataInfo);
				}else {
					this.$emit('cancel')
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.a_mask {
		position: fixed;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		.a_box {
			width: 80%;
			overflow: hidden;

			background-color: #fff;
			border-radius: 10upx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.a_head {
				text-align: center;
				font-size: 30upx;
				line-height: 88upx;
			}

			.a_input {
				padding: 30upx 20upx;
				font-size: 28upx;

				 

				.red_color {
					color: #FF0000;
					font-size: 24upx;
				}
			}

			.a_btn {
				text-align: center;
				font-size: 30upx;
				line-height: 88upx;
				display: flex;
				justify-content: space-between;
				border-top: 1upx solid #f5f5f5;

				button {
					width: 50%;
					background-color: #fff;
					font-size: 30upx;
					border-radius: 0upx;
					padding: 0;

					&::after {
						border: none
					}

					&:first-child {
						border-right: 1upx solid #f5f5f5;
						color: #999999;
						box-sizing: border-box;
					}

					&:last-child {
						color: #333;
					}
				}

			}
		}
	}
</style>
