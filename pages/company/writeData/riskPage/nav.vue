<template>
	<view class="app_nav_container">
		<view class="nav_wrapp">
			<scroll-view scroll-x="true" class="nv_list_wrap clearfix line_height_30px" :scroll-left="s_left">
				<block v-for="(item, index) in data"
				 :key="index">
					<text class="nv_l_item padding_bt_5px line_height_30px" :class="{ border_2px_409eff:index == active, border_2px:index == active, mar_right_10px:index < data.length - 1 }">{{index + 1}}.{{item}}</text>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: Array,
			active:Number
		},
		computed:{
			s_left() { 
				return (80 * this.active);
			},
			s_w() {
				var w;
				try{
					w = uni.getSystemInfoSync().windowWidth - 20;
				}catch(e){
					w = 375 - 20;
				}
				return w;
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less"); 
	.app_nav_container {
		.nav_wrapp {
			.nv_list_wrap {
				white-space: nowrap;

				.nv_l_item {}
			}
		}

		::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}
	}
</style>
