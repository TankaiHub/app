<template>
	<view class="app_map_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="详情"></uni-nav-bar>
		<view class="map_wrap">
			<map name="" class="width100" :style="{ height:heightAll*2+'upx' }" :longitude="admin_item_company_info.lng"
			 :latitude="admin_item_company_info.lat" :markers="cover"></map>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				drawerVisible: false,

			}
		},
		computed: {
			...mapState(['admin_item_company_info']),
			heightAll() {
				var h;
				try {
					h = uni.getSystemInfoSync().windowHeight - 50
				} catch (e) {
					h = 500
				}
				return h;
			},
			cover() {
				var arr = [];
				var obj = {
					latitude:this.admin_item_company_info.lat,
					longitude:this.admin_item_company_info.lng,
					id:1,
					callout: {
						content: this.admin_item_company_info.name,
						color: '#000',
						fontSize: '16',
						padding:15,
						bgColor:"#fff",
						display:'BYCLICK', 
					}

				}
				arr.push(obj);
				return arr;

			}
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_map_container {
		.map_wrap {
			.map {
				height: 100%;
			}
		}
	}
</style>
