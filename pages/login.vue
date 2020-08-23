<template>
	<view class="page_login">
		<uni-nav-bar title="登录" ></uni-nav-bar>
		<app-login></app-login>
	</view>
	
</template>

<script>
	import appLogin from "@/components/app-login/app-login"
	export default {
		data() {
			return{
				
			}
		},
		components:{
			appLogin
		}
	}
</script>

<style lang="less">
	
	.page_login{
		// height:100%;
	}
</style>
