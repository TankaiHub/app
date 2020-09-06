<template>
	<view class="app_building_materials_container">
		<!-- 建材 -->
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="business_wrapper padding_10px">
			<app-in-nav :data='navData' :active="currentIndex"></app-in-nav>
			<!-- 可燃性粉尘 -->
			<combustible-dust></combustible-dust>
		</view>
	</view>
</template>

<script>
	import appInNav from '../riskPage/nav.vue'
	
	import combustibleDust from "../riskPage/combustibleDust.vue"
	export default {
		data() {
			return {
				drawerVisible: false,
				currentIndex: 0,
				navData: ['可燃性粉尘', '有限空间', '特殊作业及特种设备', '危险化学品'],
			}
		},
		components: {
			appInNav,
			combustibleDust
		},
		methods: {
			onNavBarLeft() {

			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
