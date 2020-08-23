<template>
	<view class="app_table_sort_header_container">
		<view class="a_t_s_h_hearder_wrap clearfix" v-if="isShow">
			<!-- header - item -->
			<view :style="{ width:(100 / this.headerDataArray.length) + '%' }" class="a_t_s_h_item" v-for="(item, index) in headerDataArray" :key="index">
				<view  class="" v-if="item.type == 'index'">{{item.name}}</view>
				<view  class="" v-if="item.type == 'sort'">
					<text>{{item.name}}</text>
					<view class="a_t_s_h_icon_btn_wrap">
						<view class="a_t_s_h_icon_btn a_t_s_h_btn_up"></view>
						<view class="a_t_s_h_icon_btn a_t_s_h_btn_down"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	export default{
		props:{
			headerDataArray:Array
		},
		data() {
			return{
				w:0,
				isShow:false,
			}
		},
		computed:{
			
		},
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.app_table_sort_header_container{
		.a_t_s_h_hearder_wrap{
			
			.a_t_s_h_item{
				float: left;
				text-align: center;
				border:1px solid #ccc;
				box-sizing: border-box;
			}
		}
	}
</style>
