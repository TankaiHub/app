<template>
	<view class="com_app_login">
		<view class="l_bg_wrap"></view>
		<view class="l_top_text_wrap">
			<view class="l_text_ch">重庆市工贸八大行业安全生产管理系统</view>
			<view class="l_text_en">CHONGQIN WORK SAFETY MANAGEMENT SYSTEM FOR KEY INDUSTRY AND TRADE SECTORS</view>
		</view>
		<view class="l_mask_view" v-if="!isShowLoginForm">
			<view class="l_img_btn_wrap">
				<view class="l_left_btn l_btn" @click="onChangeLogin(true)"></view>
				<view class="l_right_btn l_btn" @click="onChangeLogin(false)"></view>
			</view>
		</view>
		<view class="l_form_wrap" v-if="isShowLoginForm">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column l_inp_wrap">
					<input class="uni-input" value="yjjcjx" name="account" :placeholder="changeLoginStatus ? '请输入社信代码':'请输入账号'" />
					<input class="uni-input" value="65465922" :password="true" name="psd" placeholder="请输入密码" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				changeLoginStatus: false,
				isShowLoginForm: false
			}
		},
		computed: {
			...mapState(["adminUserInfo", "userInfo"])
		},
		methods: {
			...mapMutations(['set_adminUserInfo', 'set_userInfo']),
			onChangeLogin(bool) {
				this.changeLoginStatus = bool;
				this.isShowLoginForm = true;
			},
			formSubmit(e) {
				var account = e.detail.value.account;
				var psd = e.detail.value.psd;
				if (account == '') {
					uni.showToast({
						title: this.changeLoginStatus ? '请输入社信代码' : '请输入账号',
						icon: 'none'
					})
					return;
				}
				if (psd == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return;
				}
				if (this.changeLoginStatus) {
					this.login(account, psd);
				} else {
					this.loginAdmin(account, psd);
				}
			},
			loginAdmin(account, pwd) {
				var opts = {
					account,
					pwd
				};
				this.$http.post("loginAdmin", opts).then(res => {
					this.set_adminUserInfo(res.data);
					var token = res.data.jwt;
					uni.setStorageSync('token', token);
					uni.reLaunch({
						url: './check/index/index'
					});
				});
			},
			login(account, password) {
				var opts = {
					account,
					password
				};
				this.$http.post("login", opts).then(res => {
					this.set_userInfo(res.data);
				});
			}
		}
	}
</script>

<style lang="less">
	.com_app_login {
		width: 100%;
		height: 100%;

		.l_bg_wrap{
			position: fixed;
			top:0;
			left:0;
			bottom:0;
			right:0;
			background-image: url("../../static/login_back.png");
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			z-index:-1;
		}
		.l_top_text_wrap {
			padding-top:40px;
			.l_text_ch,
			.l_text_en {
				text-align: center;
				color: #fff;
			}

			.l_text_ch {
				font-size: 18px;
			}

			.l_text_en {
				font-size: 14px;
				margin: 20px;
			}
		}


		.l_mask_view {
			.l_img_btn_wrap {
				display: flex;
				justify-content: center;
				margin-top: 100px;

				.l_btn {
					width: 100px;
					height: 100px;
					background-position: center center;
					background-repeat: no-repeat;
					background-size: cover;

					&.l_left_btn {
						margin-right: 20px;
						background-image: url('../../static/longin_type_qiye.png');

					}

					&.l_right_btn {
						background-image: url('../../static/login_type_anjian.png');
					}
				}
			}
		}

		.l_form_wrap {
			margin: 20px auto;
			width: 90%;

			.l_inp_wrap {
				input {
					margin-bottom: 10px;
					padding-left: 5px;
					height: 40px;
					border: 1px solid #ccc;
					border-radius: 5px;
					font-size: 14px;
				}
			}
		}
	}
</style>
