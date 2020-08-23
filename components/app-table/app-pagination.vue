<template>
	<view class="cmp_app_pagination_container">
		<view class="c_a_p_wrap">
			<view class="c_a_p_all_total_text_wrap">共 {{total}} 条 </view>
			<view class="c_a_p_sel_wrap">
				<app-select @onSelectItem="onSelectItem"></app-select>
			</view>
			<view class="c_a_p_btn_wrap">
				<button @click="onPrev" class="c_a_p_btn" :disabled="isPrev" type="default">11</button>
				<button @click="onNext" class="c_a_p_btn" :disabled="isNext" type="default">11</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	import appSelect from '@/components/app-select/app-select'
	export default {
		props:{
			total:Number,
			page:Number,
			pageSize:Number
		},
		data() {
			return { 
				
			}
		},
		computed:{
			totalPage() { 
				return Math.ceil(this.total / this.pageSize);
			},
			isPrev() {
				if (this.page == 1) {
					return true;
				}else {
					return false;
				}
			},
			isNext() {
				if (this.page == this.totalPage) {
					return true;
				}else {
					return false;
				}
			},
		}, 
		components: {
			appSelect
		},
		methods:{
			onPrev() {
				if (this.page < 1) {
					return;
				}
				this.$emit("onPrev", this.page);
			},
			onNext() {
				this.$emit("onNext", this.page);
			},
			onSelectItem(num) {
				this.$emit("onSelectItem", num);
			}
		},
	}
</script>

<style lang="less">
	.cmp_app_pagination_container {
		margin-top:10px; 
		padding:0 10px 40px;
		.c_a_p_wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.c_a_p_sel_wrap{
				width:90px;
			}
			.c_a_p_btn_wrap {
				display: flex;
				justify-content: space-between;
				width: 90px;

				.c_a_p_btn {
					padding: 0 8px;
					height: 35px;
					font-size: 14px;
					
				}
			}
		}

	}
</style>
