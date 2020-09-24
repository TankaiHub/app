<template>
	<view class="app_accountSettings_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="账号设置"></uni-nav-bar>
		<view class="a_a_wrap">
			<uni-list>
				<uni-list-item title="名字:" :showArrow="false" :rightText="adminUserInfo.admin_name"></uni-list-item>
				<uni-list-item title="手机号：" :showArrow="false" :rightText="adminUserInfo.phone"></uni-list-item>
				<uni-list-item title="部门：" :showArrow="false" :rightText="adminUserInfo.department"></uni-list-item>
				<uni-list-item title="岗位：" :showArrow="false" :rightText="adminUserInfo.post"></uni-list-item>
				<uni-list-item title="账号：" :showArrow="false" :rightText="adminUserInfo.account"></uni-list-item>
				<uni-list-item title="密码：" :showArrow="false" :rightText="handelPsd(adminUserInfo.pwd)"></uni-list-item>
			</uni-list>
			<button class="a_a_w_btn width80 ed_btn" type="primary" @click="onEditPsd">修改密码</button>
		</view>
	</view>
</template>
 
<script>
	import appNav from '@/components/app-nav/app-nav'
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				drawerVisible: false, //导航显示
			}
		},
		computed: {
			...mapState(['adminUserInfo']),
		},
		methods: {
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			//导航
			navClose(bool) {
				this.drawerVisible = bool;
			},
			//onEditPsd  修改密码
			onEditPsd() { 
				var _self =this;
				uni.navigateTo({
					url:'./systemPage/resetPassword',
					success() {
						_self.log("success")
					},
					fail(res) {
						_self.log("fail", res)
					}
				})
			},
			handelPsd(str) { 
				if (!str) {
					return '*';
				}
				var newStr = '';
				for (var i = 0; i < str.length / 2; i++) {
					newStr += "*";
				}
				return newStr;
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.app_accountSettings_container {
		.a_a_wrap {
			padding: 0 10px 10px;

			.a_a_w_btn {
				padding: 0 10px;
				margin: 10px auto;
				width: 80%;
			}
			.ed_btn{
				height:70upx;
				line-height: 70upx;
			}
		}
	}
</style>
