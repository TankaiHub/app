<template>
	<view class="page_new_create_file_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="新建文件夹"></uni-nav-bar>
		<view class="n_c_f_wrap">
			<uni-list class="n_c_f_list_wrap">
				<uni-list-item title="文件标题" class="n_c_f_item" :showArrow="isShowArrow">
					<view class="n_c_f_new_file" slot="right">
						<input type="text" v-model="fileTitle" placeholder="请输入文件标题" />
					</view>
				</uni-list-item>
			</uni-list>
			<view class="n_c_f_top_btn_wrap">
				<button class="n_c_f_btn half" @click="onCancel" type="default">取消</button>
				<button class="n_c_f_btn half" @click="onDetermine" type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drawerVisible: false,
				isShowArrow: false,
				fileTitle: '',
				pid:1
			}
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			onCancel() {
				uni.navigateBack();
			},
			onDetermine() {
				if (this.fileTitle == '') {
					uni.showToast({
						title:"请输入文件标题",
						icon:'none'
					});
					return;
				} 
				var opts = {
					name: this.fileTitle,
					pid:this.pid,
					type:1
				};
				var _self = this;
				this.$http.post('upload', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title:res.msg,
							icon:'success',
							success() {
								setTimeout(()=>{
									_self.onCancel();
								}, 1000);
							}
						})
					}
				})
			}

		},

	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.page_new_create_file_container {
		.n_c_f_wrap {
			padding: 10px;
			.n_c_f_list_wrap{
				margin-top:50px;
			}
			.n_c_f_item {
				border: 1px solid #ccc;
				border-radius: 5px;

				.n_c_f_new_file {

					input {
						text-align: right;
					}
				}
			}

			.n_c_f_top_btn_wrap {
				margin: 100px auto 0;
				display: flex;
				justify-content: space-between;
				width: 200px;

				.n_c_f_btn {
					margin: 0;
					padding: 0 5px;
				}
			}
		}
	}
</style>
