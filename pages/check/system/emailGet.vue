<template>
	<view class="app_email_get_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="收件箱"></uni-nav-bar>
		<view class="a_e_g_wrap">
			<app-table :tableData="tableData" :isShowCheck="isShowCheck">
				<!-- <app-table-column type="expand">
			<template slot-scope="props">
				<view class="">
					sknviodsbovindoivnoi
				</view>
			</template>
		</app-table-column> 
		 -->
				<app-table-column label="接收单位" prop="name"></app-table-column>
			</app-table>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appTable from '@/components/app-table/app-table'
	import appTableColumn from "@/components/app-table/app-table-column"
	export default {
		data() {
			return {
				isShowCheck:true,
				drawerVisible: false, //导航显示
				tableData:[],
				stateTo: {
					1: '未读',
					2: '已读'
				},
				deleteMoreData: [],
				pageSize: 10,
				page: 1,
				searchKey: '',
				total: 0,
			}
		},
		components:{
			appNav,
			appTable,
			appTableColumn
		},
		onShow() {
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				this.drawerVisible = true;
			},
			//导航
			navClose(bool) {
				this.drawerVisible = bool;
			},
			_initData() {
				const opts = {
					page: this.page,
					pageSize: this.pageSize,
					key: this.searchKey,
				};
				this.getEmailList(opts);
			},
			getEmailList(opts) {
				this.$http.post('emailList', opts).then(res => {
					this.listData = res.data;
					this.total = res.Total
				})
			},
			////////////table//////////////////
			/* 主页面多选框选择时把值赋值给数组*/
			deleteMoreSplice(val) {
				this.deleteMoreData = val;
			},
			/* 主页面拼接多个用户ID*/
			deleteMore(rows) {
				if (this.deleteMoreData.length == 0) {
					uni.showToast({
						title: '请选择要删除的分类',
						duration: 2000,
						icon: "none"
					});
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

				var heeh = '该'
				if (id.length > 1) {
					heeh = '这些'
				}
				let thi = this
				uni.showModal({
					title: '提示',
					content: `此操作将删除${heeh}信息, 是否继续?`,
					success: function(res) {
						if (res.confirm) {
							thi.deleteList(id)
						} else if (res.cancel) {
							uni.showToast({
								title: '已取消',
								duration: 2000,
								icon: "none"
							});
						}
					}
				});
			},
			//删除主页数据
			deleteList(deleteid) {
				let thi = this
				thi.$http.post('editStateEmail', {
					id: deleteid,
					state: 0
				}).then(res => {
					if (res.code == 200) {
						this._initData();
					}
				})
			},
			//回收站
			onGoRecycleBin() {
				uni.navigateTo({
					url: '../systemPage/emailRecycleBin'
				})
			},
		}
	}
</script>
<style lang="less">
	@import url("@/common/less/base.less");

	.app_email_get_container {
		.a_e_g_wrap {
			padding: 10px;

			.btn_a_table_wrap {
				position: relative;

				.btn_wrap {
					position: absolute;
					top: 0;
					right: 0;
					z-index: 9;
					margin-top: 12px;

					.b_w_bd {
						padding: 5px 8px;
					}
				}
			}
		}
	}
</style>
