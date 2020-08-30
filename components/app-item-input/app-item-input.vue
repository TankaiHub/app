<template>
	<view class="cmp_item_input_container">
		<view class="cmp_i_i_title font18 font_weight_bold mar_bottom_10px" :class="{ text_align_center:center, text_align_left:left, text_align_right:right }">{{title}}</view>
		<view class="cmp_i_i_content_wrap">
			<view class="cmp_i_i_c_left"> 
				<slot name="item"></slot>  
			</view> 
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:''
			},
			name:{
				type:String,
				default:''
			},
			textAlign:{
				type:String,
				default:'left'
			}
		},
		data() {
			return {
				
			}
		},
		computed:{
			center() {
				if (this.textAlign == 'center') {
					return true;
				}
			},
			left() {
				if (this.textAlign == 'left') {
					return true;
				}
			},
			right() {
				if (this.textAlign == 'right') {
					return true;
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.cmp_item_input_container{
		.cmp_i_i_title{
			
		}
	}
</style>
