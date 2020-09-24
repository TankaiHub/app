<template>
	<view class="page_password_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="忘记密码"></uni-nav-bar>
		<view class="password_wrap padding_10px">
			<uni-list>
				<uni-list-item title="手机号" :showArrow="false">
					<view class="psd_item" slot="right">
						<input type="text" placeholder="请输入新手机号" v-model="psdData.phone" />
					</view>
				</uni-list-item>
				<uni-list-item title="验证码" :showArrow="false">
					<view class="psd_item psd_code" slot="right">
						<input type="text" class="" placeholder="请输入验证码" v-model="psdData.code" />
						<button type="primary" class="get_code_btn  mar_left_10px" :disabled="isShowSec" @click="onGetCode">{{text}}
							<text v-show="isShowSec">(S)</text>
						</button>
					</view>
				</uni-list-item>
				<uni-list-item title="新密码" :showArrow="false">
					<view class="psd_item" slot="right">
						<input type="text" placeholder="请输入新密码" v-model="psdData.newPwd" />
					</view>
				</uni-list-item>
				<uni-list-item title="确认密码" :showArrow="false">
					<view class="psd_item" slot="right">
						<input type="text" placeholder="请再次输入密码" v-model="psdData.surePwd" />
					</view>
				</uni-list-item>
			</uni-list>
			<view class="psd_btn_wrap dis_flex_center">
				<button type="default" class="width100px line_height_30px height30px" @click="onBack">返回</button>
				<button type="primary" class="width100px line_height_30px height30px" @click="onSubmit">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				psdData:{
					phone:'',
					code:'',
					newPwd:'',
					surePwd:''
				},
				text:'获取验证码',
				isShowSec:false,
			}
		},
		methods:{
			onNavBarLeft() {
				uni.navigateBack();
			},
			onGetCode() {
				if (this.psdData.phone == '') {
					this.toast("请输入新手机号");
					return;
				} 
				
				this.$http.post('getPwd', {str:this.psdData.phone}).then(res=> {
					if (res.code == 200) {
						console.log(res);
						this._timer(); 
						var data = res.data;
						this._getCode(this.psdData.phone, data.pwd);
					} 
				}); 
			},
			_getCode(phone, pwd) {
				var _self = this;
				uni.request({
					url:'http://spmsapi.cqxddwl.com/index/other/sendRegisterSms',
					data:{
						phone,
						pwd
					},
					success(res) {
						if (res.code == 200) {
							_self.toast("发送成功", "bottom");
						}
					}
				})
			},
			_timer() {
				this.text = 60;
				this.isShowSec = true;
				this.timer = setInterval(()=> {
					this.text --;
					if (this.text == 0) {
						this.text = "重新发送";
						this.isShowSec = false;
						clearInterval(this.timer);
					}
				}, 1000);
			},
			onBack() {
				this.onNavBarLeft();
			},
			onSubmit() {
				
				if (this.psdData.phone == '') {
					this.toast("请输入新手机号");
					return;
				}
				if (this.psdData.code == '') {
					this.toast("请输入验证码");
					return;
				}
				if (this.psdData.newPwd == '') {
					this.toast("请输入新密码");
					return;
				}
				if (this.psdData.surePwd == '') {
					this.toast("请再次输入密码");
					return;
				}
				var _self = this;
				this.$http.post("forgetPwd", this.psdData).then(res=> {
					if (res.code == 200) {
						_self.toast("修改成功", "center", ()=> {
							setTimeout(()=> {
								_self.onNavBarLeft();
							}, 1500);
						});
					}
				});
			},
			toast(title, position, callbacl) {
				uni.showToast({
					title,
					icon:"none",
					position,
					success() {
						callbacl && callbacl()
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.page_password_container{
		.password_wrap{
			.psd_item{
				input	{
					text-align: right;
				}
			}
			.psd_code{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.get_code_btn{
				width:200upx;
				height: 60upx;
				line-height: 60upx;
			}
			.psd_btn_wrap{
				margin-top:200upx;
			}
		}
	}
</style>
