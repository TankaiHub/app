<template>
	<view class="app_individual_container">
		<!-- 个体 -->
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="individual_wrapper padding_10px">
			<app-in-nav :data='navData' :active="currentIndex"></app-in-nav>
			<!-- 特殊作业及特种设备 -->
			<special-work-and-device v-if="currentIndex == 0" ref="page0" @changeNext="changeNext"></special-work-and-device>
			<!-- 危险化学品 -->
			<hazardous-chemicals v-if="currentIndex == 1" ref="page1" @changeNext="changeNext"></hazardous-chemicals>

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
	import appInNav from '../riskPage/nav.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				drawerVisible: false,
				currentIndex: 0,
				navData: ['特殊作业及特种设备', '危险化学品'],
				spaceData: {},
				workAndDevicData: {},
				dustData: {},
				hazardousChemicalsData: {},
				coldData: {},
				highData: {},
				gasData: {},
				requestInfo:{},
			}
		},
		components: {
			specialWorkAndDevice,
			hazardousChemicals,
			appInNav
		},
		watch: {
			currentIndex(nv) {
				uni.pageScrollTo({
					scrollTop: 0
				})
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		onLoad(opts) {
			this.requestInfo = opts;
			if (opts.p == 'max') {
				this.currentIndex = 1;
			}
			this._initData();
		},
		
	onBackPress(e) {
		if (e.from == "backbutton") {
			if ((this.requestInfo.p == 'h' || this.requestInfo.p == 't') && this.currentIndex == 0) {
				return false;
			} else {
				return true;
			}
			return true;
		} else if (e.from == 'navigateBack') {
			if ((this.requestInfo.p == 'h' || this.requestInfo.p == 't') && this.currentIndex == 0) {
				return false;
			} else {
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
				this.$http.post('riskInfo', opts).then(res => {
					if (res.code == 200) { 
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
			 * @param {Object} bool true下一步  false上一步
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
