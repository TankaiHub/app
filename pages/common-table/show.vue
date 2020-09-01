<template>
	<view class="cmp_show_container clearfix" :style="{ width: w + 'px'}">
		<view class="cmp_s_list" v-for="(item, index) in data" :key='index'> 
			<view class="cmp_show_wrap dis_flex">
				<view class="s_name s_show border_1px_all_409eff border_right_none font_weight_bold"  
				 :style="{ width: item.keyW + 'px' }">
					{{item.key}}
				</view>
				<view class="s_value s_show border_1px_all_409eff " >
					{{item.value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: [Array],
			w: [String, Number],
			keyW: [String, Number],
			isBorderTop: Boolean
		},
		watch: {
			data(nv) {
				console.log(nv, "watch")
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_show_container {
		display: table-row;

		.cmp_s_list {
			display: table-cell;
			// display:table-caption; 

			.cmp_show_wrap {
				.s_value {
					flex: 1;
				}

				.s_name {
					display: flex;
					align-items: center;
				}

				.s_show {
					padding: 10upx;
					border-bottom: none;
				}
			}
		}
	}
</style>
