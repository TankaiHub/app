<template>
	<view class="cmp_empty_alert_container a_mask">
		<view class="a_box">
			<view class="a_head">
				{{title}}
			</view>
			<view class="a_input clearfix">
				<slot></slot>
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
		}, 
		data() {
			return {
				emptyArr:[],
			}
		},
		created() {
			
		},
		methods:{ 
			onInp(e, index) {
				this.$set(this.emptyArr, index, false); 
			},
			/**
			 * @param {Object} bool false-取消  true确定
			 */
			onBtn(bool) {
				this.$emit('onAlertBtn',  bool);
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.a_mask {
		position: fixed;
		z-index: 9;
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
