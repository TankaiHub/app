<template>
	<view class="app_food_container">
		<!-- 轻工 食品 --> 
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="food_wrapper padding_10px">
			<app-in-nav :data='navData' :active="currentIndex"></app-in-nav>
			<!-- 有限空间 -->
			<limited-space v-if="currentIndex == 0" ref="page0" @changeNext="changeNext"></limited-space>
			<!-- 特殊作业及特种设备 -->
			<special-work-and-device v-if="currentIndex == 1" ref="page1" @changeNext="changeNext"></special-work-and-device>
			<!-- 可燃性粉尘 -->
			<combustible-dust-food v-if="currentIndex == 2" ref="page2" @changeNext="changeNext"></combustible-dust-food>
			<!-- 危险化学品 -->
			<hazardous-chemicals v-if="currentIndex == 3" ref="page3" @changeNext="changeNext"></hazardous-chemicals>
			<!-- 冷库 -->
			<cold-storage v-if="currentIndex == 4" ref="page4" @changeNext="changeNext"></cold-storage>
			<view class="mar_top_20px mar_bottom_20px dis_flex_center">
				<button type="primary" @click="onSubmit(false)" v-if="currentIndex >= 0">上一步</button>
				<button type="primary" @click="onSubmit(true)" v-if="currentIndex < navData.length - 1">下一步</button>
				<button type="primary" @click="onSubmit(true)" v-if="currentIndex == navData.length - 1">预览</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appInNav from '../riskPage/nav.vue'
	import limitedSpace from '../riskPage/limitedSpace.vue'
	import specialWorkAndDevice from '../riskPage/specialWorkAndDevice.vue'
	import combustibleDustFood from '../riskPage/combustibleDustFood.vue'
	import hazardousChemicals from '../riskPage/hazardousChemicals.vue'
	import coldStorage from '../riskPage/coldStorage.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				drawerVisible: false,
				currentIndex:0,
				navData: ['有限空间', '特殊作业及特种设备', '可燃性粉尘', '危险化学品', '冷库'],
				spaceData:{},
				workAndDevicData:{},
				dustData:{},
				hazardousChemicalsData:{},
				coldData:{},
				highData:{},
				gasData:{},
			}
		},
		components: {
			appInNav,
			limitedSpace,
			specialWorkAndDevice,
			combustibleDustFood,
			hazardousChemicals,
			coldStorage
		},
		computed: {
			...mapState(['userInfo']),
		},
		onLoad() {
			this._initData();
		},
		methods: {
			onNavBarLeft() {

			},
			_initData(state) {
				var opts = {
					company_id:this.userInfo.company_id
				};
				this.$http.post('riskInfo', opts).then(res=> {
					if (res.code == 200) { 
						if (state == 'back') {
							this._back();
						}else if (state == 'next'){
							this._next();
						}
						this._changeBaseData(res.data);
					}
				});
			},
			_changeBaseData(data) {
				for (var i = 0; i < data.length; i ++) {
					var temp = data[i],
					    type = temp.type,
						content = temp.content;
					this._changeType(type, content);
				}
			},
			_changeType(num, content) {
				var content = this._changeJSON(content);
				switch(num) {
					case 1://有限空间
						this.spaceData = content;
					break;
					case 2://特殊作业及特种设备
						this.workAndDevicData = content;
					break;
					case 3://可燃性粉尘 -食物
						this.dustData = content;
					break;
					case 4://危险化学品
						this.hazardousChemicalsData = content;
					break;
					case 5://高温熔融
						this.highData = content;
					break; 
					case 6://冷库
						this.coldData = content;
					break; 
					case 7://煤气
						this.gasData = content;
					break; 
				}
			},
			_changeJSON(str) {
				return JSON.parse(str);
			}, 
			/**
			 * @param {Object} bool true-下一步 false-上一步
			 */
			onSubmit(bool) {
				if (bool) {
					this._initData('next');
				} else {
					this._initData('back');
				}

			},
			_next() {
				console.log(this.currentIndex , this.navData.length - 1)
				if (this.currentIndex == this.navData.length - 1) {
					this.currentIndex = this.navData.length - 1;
					uni.redirectTo({
						url: '../../companyTable/companyTable'
					});
				} else {
					this.$refs['page' + this.currentIndex].submit();
				}
			},
			_back() {
				this.currentIndex--;
				if (this.currentIndex < 0) {
					this.currentIndex = 0;
					uni.redirectTo({
						url: '../safety'
					});
				} 
			},
			changeNext(bool) {
				if (bool) {
					this.currentIndex++;
				}
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
