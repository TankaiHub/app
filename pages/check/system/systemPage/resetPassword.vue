<template>
	<view class="app_reset_pass_word_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="修改密码"></uni-nav-bar>
		<view class="a_r_p_w_wrap">
			<app-title text="修改密码"></app-title>
			<uni-list>
				<uni-list-item title="旧密码" :showArrow="isShowArrow">
					<view class="" slot='right'>
						<input type="text" placeholder="请输入旧密码" v-model="oldPsd" />
					</view>
				</uni-list-item>
				<uni-list-item title="新密码" :showArrow="isShowArrow">
					<view class="" slot='right'>
						<input type="text" placeholder="请输入新密码" v-model="newPsd" />
					</view>
				</uni-list-item>
				<uni-list-item title="确认密码" :showArrow="isShowArrow">
					<view class="" slot='right'>
						<input type="text" placeholder="请再次输入新密码" v-model="oncePsd" />
					</view>
				</uni-list-item>
			</uni-list>
			<view class="a_r_p_w_btn_wrap">
				<button class="half" type="default" @click="onCancel">取消</button>
				<button class="half" type="primary" @click="onSubmit">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appTitle from "@/components/app-title/app-title"
	import appNav from "@/components/app-nav/app-nav"
	export default {
		data() {
			return {
				drawerVisible: false,
				isShowArrow: false,
				oldPsd: '',
				newPsd: '',
				oncePsd: '',
			}
		},
		components: {
			appTitle,
			appNav
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			validation() {
				var flag = true;
				console.log(this.oldPsd == '')
				if (this.oldPsd == '') {
					this.flag = false;
					uni.showToast({
						title: "请输入旧密码",
						icon: 'none'
					})
					return flag;
				};
				if (this.newPsd == '') {
					this.flag = false;
					uni.showToast({
						title: "请输入新密码",
						icon: 'none'
					})
					return flag;
				};
				if (this.oncePsd == '') {
					this.flag = false;
					uni.showToast({
						title: "请确认新密码",
						icon: 'none'
					})
					return flag;
				}
				if (this.oncePsd != this.newPsd) {
					this.flag = false;
					uni.showToast({
						title: "密码不一致",
						icon: 'none'
					})
					return flag;
				}

			},
			onCancel() {
				uni.navigateBack()
			},
			onSubmit() {
				if (!this.validation()) return;
				var opts = {
					oldPwd: this.oldPsd,
					newPwd: this.newPsd,
					affirmPwd: this.oncePsd,
				};
				thi.$http.post('editPwd', thi.editform).then(res => {
					if (res.code == 200) {
						console.log('success')
					}
				})
			},
		},
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_reset_pass_word_container {
		.a_r_p_w_wrap {
			padding: 10px;

			input {
				text-align: right;
			}

			.a_r_p_w_btn_wrap {
				display: flex;
				justify-content: space-between;
				margin-top: 30px;
			}
		}
	}
</style>
