<template>
	<view class="app_companyMsg_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="发件箱"></uni-nav-bar>
		<view class="a_c_m_wrap">
			<view class="a_c_m_top_wrap">
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
	</view>
</template>
 
<script>
	import appNav from '@/components/app-nav/app-nav'
	import appTable from '@/components/app-table/app-table'
	import appTableColumn from "@/components/app-table/app-table-column"
	export default {
		data() {
			return {
				drawerVisible: false, //导航显示
				isShowCheck:true,
				listData: [{
					num: 22,
					date: '1577670610',
					title: '通知！2020.01.20-2020.01.26系统维护，平台暂不开放！',
				}],
				pageSize: 10,
				page: 1,
				searchKey: '',
				total: 0,
				sonVisible: false,
				sonCurrentPage: 1,
				sonPageSize: 10,
				sonDataTotal: 0,
				sonData: [],
				sonId: '',
				retype: 1,
				read_stateTo: {
					1: '已读',
					2: '未读'
				},
				read_stateTo2: {
					2: '已读',
					1: '未读'
				},
				tableData:[]
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
					page: this.currentPage,
					pageSize: this.pageSize,
					key: this.searchKey,
				}
				this.getSendList(opts);
			},
			getSendList(opts) {
				this.$http.post('sendList', opts).then(res => {
					this.listData = res.data
					this.total = res.Total

				})
			},
			//选择展示数量
			handleSizeChange(val) {
				this.pageSize = val
				this.getList()
			},
			//跳转页面
			handleCurrentChange(val) {
				this.currentPage = val
				this.getList()
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
