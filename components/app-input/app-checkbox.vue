<template>
	<view class="cmp_checkbox_container" @click="onChange">
		<view :class="{ isActive:isActive }" 
			  class="cmp_checkbox_bd" 
		      :style="{ width:width*2 + 'upx', height:height*2+'upx',color:isActive?color:'', borderColor: isActive?color:''  }">
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 22
			},
			height: {
				type: Number,
				default: 22
			},
			color: {
				type: String,
				default: "#007aff"
			},
			isActive:Boolean
		},
		model:{
			prop:"isActive",
			event:'changeCheckBox'
		},
		data() {
			return {
				bool:false
			}
		},
		created() {
			this.bool = this.isActive;
		},
		methods:{
			onChange() {  
				if (this.isActive) {
					this.$emit('changeCheckBox', false);
				}else {
					this.$emit('changeCheckBox', true);
				}
			}
		}
	}
</script>

<style lang="less">
	.cmp_checkbox_container {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;

		.cmp_checkbox_bd {
			margin-right: 5px;
			appearance: none;
			outline: 0;
			border: 1px solid #d1d1d1;
			background-color: #fff;
			border-radius: 3px;
			position: relative;
			&.isActive{
				&::before {
					font: normal normal normal 14px/1 uni;
					content: "\EA08";
					font-size: 22px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -48%) scale(.73);
				}
			}
			
		}
	}
</style>
