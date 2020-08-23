<template>
	<view class="app_table_header_container">
		<view class="a_t_h_hearder_wrap">
			<view class="">
				<view class="a_t_h_h_item_wrap"  v-for="(item, index) in headerArray" >
					 <view class="a_p_h_item check_box" v-if="isShowCheck && item.type=='check'">
					 	<checkbox-group @change="onChangeBox">
					 		<label>
					 			<checkbox value="cb" :disabled="isDisabled" :checked="isCheck" color="#007aff" style="transform:scale(0.7)" />
					 		</label>
					 	</checkbox-group>
					 </view> 
					<view class="a_p_h_item" :key="index" :style="{ width:item.width + 'px' }" :class="{ isExpand:(item.type == 'expand') }">
						<view class="">
							{{item.label}}
						</view>
					</view> 
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		props: { 
			type: String,
			isShowCheck:Boolean,
			tableData:Array, 
			isCheck:Boolean,
			tableIndex:Number
		},
		data() {
			return {  
				config:[],
				
			}
		},
		watch:{ 
			 
		},
		computed:{
			
			...mapState(['table_data']),
			headerArray() {
				// return uni.getStorageSync("config") || [];
				
				return this.table_data;
			},
			isDisabled() {
				if (this.tableData.length == 0) {
					return true;
				}else {
					return false;
				}
			}
		},
		created() { 
		},
		methods: {
			onChangeBox(e) {
				var val = e.detail.value[0];
				var flag;
				if (!val) {
					flag = false;
				} else {
					flag = true;
				}
				this.$emit("onChangeBox", flag);
			}
		}
	}
</script>

<style lang="less">
	.app_table_header_container {
		// margin-bottom: 10px;
		width: 100%;
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #ccc;

		.a_t_h_hearder_wrap {
			display: flex;
			justify-content: space-between;
			.a_t_h_h_item_wrap{
				display: inline-block;
				.a_p_h_item{
					display: inline-block;
					// text-align: center;
					font-size: 14px;
					    color: #409eff;
					&.check_box{
						// margin-right:20px;
					}
				}
			} 
		}
	}
</style>
