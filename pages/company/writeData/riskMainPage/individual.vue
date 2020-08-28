<template>
	<view class="app_individual_container">
		<!-- 个体 -->
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="individual_wrapper padding_10px">
			<app-nav :data='navData' :active="currentIndex"></app-nav>
			<!-- 特殊作业及特种设备 -->
			<special-work-and-device v-if="currentIndex == 0" ref="sp_word_dev"></special-work-and-device>
			<!-- 危险化学品 -->
			<hazardous-chemicals v-if="currentIndex == 1" ref="ha_ch_ele"></hazardous-chemicals>

			<view class="mar_top_20px mar_bottom_20px dis_flex_center">
				<button type="primary" @click="onSubmit(false)" v-if="currentIndex > 0">上一步</button>
				<button type="primary" @click="onSubmit(true)" v-if="currentIndex == 0">下一步</button>
				<button type="primary" @click="onSubmit(true)" v-if="currentIndex == 1">预览</button>
			</view>
		</view>
	</view>
</template>

<script>
	import specialWorkAndDevice from '../riskPage/specialWorkAndDevice.vue'
	import hazardousChemicals from '../riskPage/hazardousChemicals.vue'
	import appNav from '../riskPage/nav.vue'
	export default {
		data() {
			return {
				drawerVisible: false,
				currentIndex: 1,
				navData: ['特殊作业及特种设备', '危险化学品'],
			}
		},
		onLoad() {

		},
		onBackPress(e) {
			if (e.from == "backbutton") {
				return true;
			} else if (e.from == 'navigateBack') {
				return true;
			}
		},
		components: {
			specialWorkAndDevice,
			hazardousChemicals,
			appNav
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {

			},
			/**
			 * @param {Object} bool true下一步  false上一步
			 */
			onSubmit(bool) {
				var _self = this;
				if (bool) { // true下一步
					console.log(this.currentIndex)
					switch (this.currentIndex) {
						case 0:
							this._changePage1();
							break;
						case 1:
							this._changePage2();
							break;
					}

				} else { //false上一步
					if (this.currentIndex == 0) {
						uni.navigateTo({
							url: '../safety'
						});
						return;
					} else {
						this.currentIndex--; //上一步
						this._initData();
					}


				}
			},
			_changePage1() {
				var opts = this.$refs.sp_word_dev.getData();
				var _self = this;
				this.$http.post('riskSave', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
							success() {
								setTimeout(() => {
									_self.currentIndex++;
								}, 1500);
							}
						})
					}
				});
			},
			_changePage2() {
				
				var opts = this.$refs.ha_ch_ele.getData();
				var _self = this;  
				this.$http.post('riskSave', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
							success() {
								setTimeout(() => {
									// _self.currentIndex++;
								}, 1500);
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
