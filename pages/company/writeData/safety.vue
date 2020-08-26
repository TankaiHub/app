<template>
	<view class="app_safety_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="基本信息"></uni-nav-bar>
		<view class="safety_wrapper">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drawerVisible:false,
			}
		},
		methods:{
			onNavBarLeft() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
</style>
