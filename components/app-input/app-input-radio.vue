<template>
	<view class="cmp_input_radio_container" :style="{ width:width+'upx', height:height+'upx', 'background-color':color }">
		<view class="cmp_i_rd_wrap" :style="{ width:width/2 + 'upx', height:height/2 + 'upx' }"></view>
		<input class="cmp_i_rd_inp_bd" type="text" v-model="isRadio" disabled />
	</view>
</template>

<script>
	export default{
		props:{
			width:{
				type:Number,
				default:40
			},
			height:{
				type:Number,
				default:40
			},
			color:{
				type:String,
				default:"#409EFF"
			},
			isRadio:[String, Number]
		},
		created() {
			console.log(this.isRadio)
		}
	}
</script>

<style lang="less">
	.cmp_input_radio_container{
		position: relative;
		border:2upx solid #ccc;
		border-radius: 50%;
		box-sizing: border-box;
		.cmp_i_rd_wrap{
			position: absolute;
			top:50%;
			left:50%;
			transform: translateX(-50%) translateY(-50%);
			background-color: #fff;
			border-radius: 50%;
		}
		.cmp_i_rd_inp_bd{
			display: none;
		}
	}
</style>
