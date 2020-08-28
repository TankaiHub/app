<template>
	<view class="email_recycle_bin_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="回收站"></uni-nav-bar>
		<view class="e_r_b_wrap">
			
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				listData: [{ 
					title:1111111111,
					addtime:1111111111,
					state:1,
					s_name:111111,
					email_id:11
				}],
				stateTo: {
					1: '未读',
					2: '已读'
				},
				deleteMoreData: [],
			}
		},
		onShow() {
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack()
			},
			_initData() {
				this.getEmailListDel();
			},
			getEmailListDel() {
				this.$http.post('emailListDel').then(res => {
					this.listData = res.data;
				})
			},
			//删除主页数据
			deleteList(deleteid) {
				let thi = this
				thi.$http.post('editStateEmail', {
					id: deleteid,
					state: 1
				}).then(function(res) {
					if (res.code == 200) {
						thi._initData()
					}
				})
			},
			/* 主页面多选框选择时把值赋值给数组*/
			deleteMoreSplice(val) {
				this.deleteMoreData = val;
			},
			/* 主页面拼接多个用户ID*/
			deleteMore(rows) {
				if (this.deleteMoreData.length == 0) {
					uni.showToast({
						icon: "none",
						title: '请选择要恢复的分类!',
						duration: 2000
					})
					return
				} else {
					var ids = '';
					this.deleteMoreData.forEach(function(moreValue, moreIndex, moreArr) {
						if (moreIndex == 0) {
							ids = moreValue.email_id
						} else {
							ids += ',' + moreValue.email_id
						}
					})
					this.changeMessage(ids, 'main')
				}
			},
			//状态改变提示
			changeMessage(id, who) {
				console.log(id)
				var heeh = '该'
				if (id.length > 1) {
					heeh = '这些'
				}
				let thi = this
				uni.showModal({
					title: '提示',
					content: '此操作将恢复' + heeh + '信息, 是否继续?',
					success: function(res) {
						if (res.confirm) {
							thi.deleteList(id)
						} else if (res.cancel) {
							uni.showToast({
								icon: "none",
								title: '已取消',
								duration: 2000
							})
						}
					}
				});
			},
			onDetail(id) {
				
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.email_recycle_bin_container {
		.e_r_b_wrap {
			padding: 10px;
			position: relative;

			.fh_btn_wrap {
				position: absolute;
				top: 0;
				right: 10px;
				z-index: 9;
				margin-top: 12px;

				.b_w_bd {
					padding: 5px 8px;
				}
			}
		}
	}
</style>
