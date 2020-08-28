<template>
	<view class="cmp_btn_add_container" @click="onBtn">
		<view class="dis_inline_block font18 font_weight_bold  color_blue_btb vertical_align_top">+</view>
		<view class="dis_inline_block font16 color_blue_btb vertical_align_bt">{{text}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			text:{
				type:String,
				default:''
			}
		},
		methods:{
			onBtn() {
				this.$emit("onBtn");
				
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.cmp_btn_add_container{
		// width:200px;   
	}
</style>
