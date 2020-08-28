<template>
	<view class="app_individual_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="individual_wrapper padding_10px">
			<app-nav :data='navData' :active="currentIndex"></app-nav>
			<!-- 特殊作业及特种设备 -->
			<special-work-and-device v-if="currentIndex == 0" ref="sp_word_dev"></special-work-and-device> 
			
			 
			<view class="mar_top_20px mar_bottom_20px dis_flex_center">
				<button type="primary" @click="onSubmit(false)">上一步</button>
				<button type="primary" @click="onSubmit(true)">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import specialWorkAndDevice from '../riskPage/specialWorkAndDevice.vue'
	import appNav from '../riskPage/nav.vue'
	export default {
		data() {
			return {
				drawerVisible:false,
				currentIndex:0,
				navData:['特殊作业及特种设备', '危险化学品', '特殊作业及特种设备', '危险化学品','特殊作业及特种设备', '危险化学品'],
			}
		},
		onLoad() {
			 
		},
		onBackPress(e) {
			if (e.from == "backbutton") {
				return true;
			}else if (e.from == 'navigateBack'){
				return true;
			}
		},
		components:{
			specialWorkAndDevice,
			appNav
		},
		methods:{
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				
			},
			/**
			 * @param {Object} bool true下一步  false上一步
			 */
			onSubmit(bool) {
				if (bool) {
					if (this.currentIndex == 0) {
						var sp_word_dev_data = this.$refs.sp_word_dev.getData();
						console.log(sp_word_dev_data)
						this.currentIndex ++;
						
					}
					
					
					
				}else {
					if (this.currentIndex == 0) {
						uni.navigateTo({
							url:'../safety'
						})
					}else {
						this.currentIndex --;//上一步
						this._initData();
					}
					
					
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
