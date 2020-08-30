<template>
	<view class="app_food_container">
		<!-- 轻工 食品 -->
		<!-- 个体 -->
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="food_wrapper padding_10px">
			<app-nav :data='navData' :active="currentIndex"></app-nav>
			<!-- 有限空间 -->
			<limited-space v-if="currentIndex == 0" ref="page0"></limited-space> 
			<!-- 特殊作业及特种设备 -->
			<special-work-and-device v-if="currentIndex == 1" ref="page1"></special-work-and-device>
			<!-- 可燃性粉尘 -->
			<combustible-dust-food v-if="currentIndex == 2" ref="page2"></combustible-dust-food>
			<view class="mar_top_20px mar_bottom_20px dis_flex_center">
				<button type="primary" @click="onSubmit(false)" v-if="currentIndex >= 0">上一步</button>
				<button type="primary" @click="onSubmit(true)" v-if="currentIndex < navData.length - 1">下一步</button>
				<button type="primary" @click="onSubmit(true)" v-if="currentIndex == navData.length - 1">预览</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from '../riskPage/nav.vue'
	import limitedSpace from '../riskPage/limitedSpace.vue'
	import specialWorkAndDevice from '../riskPage/specialWorkAndDevice.vue'
	import combustibleDustFood from '../riskPage/combustibleDustFood.vue'
	export default {
		data() {
			return {
				drawerVisible: false,
				currentIndex:2,
				navData:['有限空间', '特殊作业及特种设备', '可燃性粉尘', '危险化学品', '冷库'],
			}
		},
		components: { 
			appNav,
			limitedSpace,
			specialWorkAndDevice,
			combustibleDustFood
		},
		methods: {
			onNavBarLeft() {

			},
			/**
			 * @param {Object} bool true-下一步 false-上一步
			 */
			onSubmit(bool) {
				if (bool) {
					if (this.currentIndex > this.navData.length - 1) {
						this.currentIndex = this.navData.length - 1;
					}else {
						// console.log(this.$refs['page'+this.currentIndex])
						this.$refs['page'+this.currentIndex].submit();
					}
					this.currentIndex ++;
					
				}else { 
					this.currentIndex --;
					if (this.currentIndex < 0) {
						this.currentIndex = 0;
						uni.redirectTo({
							url:'../safety'
						});
					}else {
						console.log("back")
					}
				}
				
			}, 
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
