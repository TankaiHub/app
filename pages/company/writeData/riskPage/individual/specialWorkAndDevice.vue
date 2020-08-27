<template>
	<view class="app_special_work_and_device_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drawerVisible:false
			}
		},
		methods:{
			onNavBarLeft() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
</style>
