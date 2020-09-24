<template>
	<view class="c_r_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="安全技术要求"></uni-nav-bar>
		<view class="c_r_wrap padding_10px">
			<app-title text="安全技术要求" class="padding_10px_top_bt">
				<view class="print_btn" @click="onPrint">打印</view>
			</app-title>
			<company-rules></company-rules>
		</view>
	</view>
</template>

<script>
	import CompanyRules from './CompanyRules' 
	import appTitle from "@/components/app-title/app-title"
	export default {
		data() {
			return {
				drawerVisible:false
			}
		},
		components:{
			CompanyRules,
			appTitle
		},
		methods:{
			onNavBarLeft() { 
				this.drawerVisible = true;
			},
			onPrint() {
				
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.c_r_container{
		.print_btn{
			position: absolute;
			top:50%;
			right:0;
			transform: translateY(-50%);
			// padding:20upx;
			width:80px;
			height:70upx;
			line-height: 70upx;
			text-align: center;
			border-radius: 10upx;
			background-color: #54a0ff;
			color:#fff;
		}
	}
	
</style>
