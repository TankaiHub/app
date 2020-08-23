<template>
	<view class="app_detail_business_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="详情"></uni-nav-bar>
		<view class="de_bus_wrap padding_10px">
			<view class="de_bus_top_btn dis_flex_center">
				<button type="primary" @click="onGoAdd">新增经营点</button>
				<button type="primary" @click="onGoLaw">添加执法任务</button>
				<button type="primary">地图导航</button>
			</view>
			<view class="de_bus_all_table_wrap">
				<!-- 基本信息 -->
				<view class="de_bus_a_t_base_table_wrap">
					<app-title text="基本信息 "></app-title>
					<view class="de_bus_t_wrap">
						<view class="">
							
						</view>
					</view>
				</view>
				
				
				
				
				
				
				
				
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appTitle from "@/components/app-title/app-title"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				drawerVisible:false,
			}
		},
		components:{
			appNav,
			appTitle
		},
		computed: {
			...mapState(['admin_item_company_info']),
		},
		methods:{
			onNavBarLeft() {
				
			},
			onGoAdd() {
				uni.navigateTo({
					url:'./newEnterprise?title=新增经营点&state=jyd',
					success() {
						console.log("success")
					},fail(res) {
						console.log(res)
					}
				})
			},
			onGoLaw() {
				uni.navigateTo({
					url:'../../law/page/addCompany?s=m&code=' + this.admin_item_company_info.credit_code
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.app_detail_business_container{
		.de_bus_wrap{
			
		}
	}
</style>
