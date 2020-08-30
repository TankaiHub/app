<template>
	<uni-drawer :visible="drawerVisible" :mode="drawerMode" @close="onUniDrawerClose">
		<view class="app_nav_container">
			<view class="outer_wrap" v-for="(item, index) in currentNavData" :key="index">
				<view @click="onItem(item, index)" class="padding_10px_top_bt">{{ item.text }}</view>
				<view class="center_wrap" v-if="level2Array && level2Array.length > 0 && level2CurrentIndex == index">
					<view class="" v-for="(ele, ind) in level2Array" :key='ind'>
						<view class="" @click="onLevel2(ele, ind)"  class="padding_10px_top_bt">{{ele.text}}</view>
						<view class="in_wrap" v-if="level3Array && level3Array.length > 0 && level3CurrentIndex == ind">
							<view class="" v-for="(child, i) in level3Array" :key="i">
								<view class="" @click="onLevel3(child, i)" class="padding_10px_top_bt">{{child.text}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-drawer>

</template>

<script>
	import {
		navData,
		comNavData
	} from "@/common/js/dataArray.js"
	export default {
		props: {
			drawerVisible: {
				type: Boolean,
				default: false
			},
			currentNav:{
				type:String, 
				default:'index'
			},
		},
		data() {
			return {
				drawerMode: "left", //导航位置 
				currentNavData:[],
				level2Array: [],
				level3Array: [],
				level2CurrentIndex: -1,
				level3CurrentIndex: -1
			}
		},
		model:{
			prop:"drawerVisible",
			event:"change"
		},
		created() { 
			if (this.currentNav == 'index') {
				this.currentNavData = navData;
			}else if (this.currentNav == 'company') {
				this.currentNavData = comNavData;
			}
		},
		methods: {
			onItem(item, index) {
				this.level2CurrentIndex = index;
				this.level2Array = item.children;
				var _self = this;
				if (item.href != '') {
					uni.navigateTo({
						url: item.href,
						success() {
							_self.onUniDrawerClose();
							this.log("success")
						},
						fail(e) {
							this.log("fail", e)
						}
					})
				}


			},
			onLevel2(item, index) {
				this.level3CurrentIndex = index;
				this.level3Array = item.children;
				var _self = this;
				if (item.href != '') {
					uni.navigateTo({
						url: item.href,
						success() {
							_self.onUniDrawerClose();
							this.log("success")
						},
						fail(e) {
							this.log("fail", e)
						}
					})
				}
			},
			onLevel3(item, index) {
				var _self = this;
				if (item.href != '') {
					uni.navigateTo({
						url: item.href,
						success() {
							_self.onUniDrawerClose();
							this.log("success")
						},
						fail(e) {
							this.log("fail", e)
						}
					})
				}
			},
			//导航 关闭
			onUniDrawerClose(e) {
				this.$emit("change", false)
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.app_nav_container {
		padding-top:30px;
		width: 100%;
		font-size: 14px;

		.outer_wrap,
		.center_wrap,
		.in_wrap {
			padding-left: 30px;
		}

		.an_item {
			line-height: 45px;
		}
	}
</style>
