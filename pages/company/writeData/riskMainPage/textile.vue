<template>
	<view class="app_textile_container">
		<!-- 纺织 -->
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="business_wrapper padding_10px">
			<app-in-nav :data='navData' :active="currentIndex"></app-in-nav>
			<!--可燃性粉尘-->
			<combustible-dust v-if="currentIndex == 0" :cmpData="dustData" :bool="change_bool" ref="page0" @changeNext="changeNext"></combustible-dust>
			<!--有限空间-->
			<limitedSpace-o v-if="currentIndex == 1" :cmpData="spaceData" :bool="change_bool" ref="page1" @changeNext="changeNext" :spaceData="spaceData"></limitedSpace-o>
			<!-- 特殊作业及特种设备 -->
			<special-work-and-device-t v-if="currentIndex == 2" :cmpData="workAndDevicData" :bool="change_bool" ref="page2" @changeNext="changeNext"></special-work-and-device-t>
			<!-- 危险化学品 -->
			<hazardous-chemicals v-if="currentIndex == 3" :cmpData="hazardousChemicalsData" :bool="change_bool" ref="page3" @changeNext="changeNext"></hazardous-chemicals>
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
	import combustibleDust from '../riskPage/combustibleDust.vue'
	import limitedSpaceO from '../riskPage/limitedSpace-o.vue'
	import specialWorkAndDeviceT from '../riskPage/specialWorkAndDevice-t.vue'
	import hazardousChemicals from '../riskPage/hazardousChemicals.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				drawerVisible: false,
				currentIndex: 0,
				navData: ['可燃性粉尘', '有限空间', '特殊作业及特种设备', '危险化学品'],
				spaceData: {},
				workAndDevicData: {},
				dustData: {},
				hazardousChemicalsData: {},
				coldData: {},
				highData: {},
				gasData: {},
				change_bool:false,
				requestInfo:{},
			}
		},
		components: {
			appInNav,
			combustibleDust,
			limitedSpaceO, 
			specialWorkAndDeviceT,
			hazardousChemicals
		},
		computed: {
			...mapState(['userInfo']),
		},
		watch:{
			currentIndex(nv) {
				uni.pageScrollTo({
					scrollTop:0
				})
			}
		},
		onLoad(opts) {
			this.requestInfo = opts;
			if (opts.p == 'max') {
				this.currentIndex = 3;
			}
			this._initData();
		},
		onBackPress(e) {
			if (e.from == "backbutton") {
				if ((this.requestInfo.p == 'h' || this.requestInfo.p == 't') && this.currentIndex == 0) {
					return false; 
				}else {
					return true;
				} 
				return true;
			} else if (e.from == 'navigateBack') {
				if ((this.requestInfo.p == 'h' || this.requestInfo.p == 't') && this.currentIndex == 0) {
					return false; 
				}else {
					return true;
				} 
			}
		},
		methods: {
			onNavBarLeft() {
				if ((this.requestInfo.p == 'h' || this.requestInfo.p == 't') && this.currentIndex == 0) {
					this._router('', false, 1);
				}else {
					this.currentIndex --;
					if (this.currentIndex < 0) {
						this.currentIndex = 0;
						uni.redirectTo({
							url: '../safety'
						});
						return;
					}
				}
			},
			_router(url, bool, delta) {
				if (bool) {
					uni.navigateTo({
						url,
						fail(err) {
							console.log(err, '=======true======')
						}
					})
				}else {
					uni.navigateBack({
						delta
					})
				}
			},
			_initData(state) {
				var opts = {
					company_id: this.userInfo.company_id
				};
				this.change_bool = false;
				this.$http.post('riskInfo', opts).then(res => {
					if (res.code == 200) { 
						this._changeBaseData(res.data);
					}
				});
			},
			_changeBaseData(data) {
				for (var i = 0; i < data.length; i++) {
					var temp = data[i],
						type = temp.type,
						content = temp.content;
					this._changeType(type, temp);
				}
				this.change_bool = true;
			},
			_changeType(num, content) {
				// var content = this._changeJSON(content);
				switch (num) {
					case 1: //有限空间
						this.spaceData = content;
						break;
					case 2: //特殊作业及特种设备
						this.workAndDevicData = content;
						break;
					case 3: //可燃性粉尘 
						this.dustData = content;
						break;
					case 4: //危险化学品
						this.hazardousChemicalsData = content;
						break;
					case 5: //高温熔融
						this.highData = content;
						break;
					case 6: //冷库
						this.coldData = content;
						break;
					case 7: //煤气
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
			 		this._next();
			 	} else {
			 		this._back(); 
			 	} 
			 },
			_next() {
				var check = this.$refs['page' + this.currentIndex].submit();
				if (check == 'interrupt') return; 
				if (this.currentIndex == this.navData.length - 1) {
					this.currentIndex = this.navData.length - 1;
					uni.redirectTo({
						url:'./finalTable'
					});
					return;
				} 
				this._initData();
			},
			_back() {
				this.currentIndex--;
				if (this.currentIndex < 0) {
					this.currentIndex = 0;
					uni.redirectTo({
						url: '../safety'
					});
					return;
				}
				this._initData();
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
