<template>
	<view class="app_email_get_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="收件箱"></uni-nav-bar>
		<view class="a_e_g_wrap app_table_wrap">
			<view class="a_w_g_top_btn_wra clearfix">
				<button class="a_c_f_btn float_right width100px height30px line_height_30px mar_left_10px" type="warn" @click="onBin">回收站</button>
				<button class="a_c_f_btn float_right width100px height30px line_height_30px" type="warn" @click="onDels">删除</button>
			</view>
			<app-table-new ref="table" :tableData="tableData" :isShowExpand="true" :headerArray='headerArray'
			 :showContent="showContent" :isShowIndex="true" :isShowCheckbox="true">
				<block class="" slot="content" slot-scope="props" v-if="props.data">
					<view class="table_hide_total_container" v-if="props.data">
						<view class="a_t_ul table_hide_info_wrap">
							<view class="a_t_li clearfix" @click="onLookDetail(props.data)">
								<label>标题</label>
								<view class="info_bd"> {{props.data.title}}</view>
							</view>
							<view class="a_t_li clearfix">
								<label>时间</label>
								<view class="info_bd">{{changeTime(props.data.addtime, 'yy-mm-dd hh-mm-ss')}}</view>
							</view>
							<view class="a_t_li clearfix" @click="onLookDetail(props.data)">
								<label>状态</label>
								<view class="info_bd"> {{stateTo[props.data.state]}}</view>
							</view>
						</view>
						<view class="tb_hide_btn_wrap">
							<button type="primary" @click="onDetail(props.data)" class="btn_tb">查看详情</button>
							<button type="warn" @click="onDel(props.data.id)" class="btn_tb">删除</button>
						</view>
					</view>
				</block>
			</app-table-new>
		</view>
		<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
		 @onNext="onNext"></app-pagination>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appTableNew from "@/components/app-table/app-table-new"
	import appPagination from '@/components/app-table/app-pagination'
	import {
		changeTime
	} from '@/common/js/base.js'
	export default {
		data() {
			return {
				changeTime,
				isShowCheck: true,
				drawerVisible: false, //导航显示
				headerArray: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '发送单位',
						isInWidth: true,
						width: 0
					}
				],
				showContent: [{
					key: 's_name',
					isInWidth: true,
					width: 0,
					isClickContent: true
				}],
				tableData: [{
					s_name: "111111",
					title: '22222222',
					addtime: 12222222222,
					state: 1,
					email_id: 22
				}],
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
		components: {
			appNav,
			appTableNew,
			appPagination
		},
		onShow() {
			// this._initData();
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
				this._getEmailList(opts);
			},
			_getEmailList(opts) {
				this.$http.post('emailList', opts).then(res => {
					if (res.code == 200) {
						this.tableData = res.data;
						this.total = res.Total
					}
				})
			},
			onDels() {
				var tableData = this.$refs.table.getCheckItem();
				if (tableData.length == 0) {
					uni.showToast({
						title: '请选择要删除的分类!',
						icon: 'none'
					})
					return
				}
				var str = '';
				for (var i = 0; i < tableData.length; i++) {
					var temp = tableData[i];
					if (i == 0) {
						str = temp.email_id;
					} else {
						str += ',' + temp.email_id;
					}
				}
				this.onDel(str, true);

			},
			//回收站
			onBin() {
				uni.navigateTo({
					url: './systemPage/emailRecycleBin'
				})
			},
			//删除
			onDel(id, bool = false) {
				var heeh = '该'
				if (bool) {
					heeh = '这些'
				}
				let _self = this;
				uni.showModal({
					title: '提示',
					content: '此操作将删除' + heeh + '信息, 是否继续?',
					success: function(res) {
						if (res.confirm) {
							_self.$http.post('editStateEmail', {
								id,
								state: 0
							}).then(res => {
								if (res.code == 200) {
									uni.showToast({
										title: '删除成功',
										icon: 'none',
										success() {
											setTimeout(() => {
												_self._initData();
											}, 1500);
										}
									});
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				})
			}, 
			onDetail(data) {
				uni.navigateTo({
					url: './systemPage/emailDetail?email_id=' + data.email_id
				})
			},
			/////////////////分页///////////////////
			onSelectItem(num) {
				this.pageSize = num;
				this.page = 1;
				this._initData();
			},
			onPrev(page) {
				this.page = page - 1;
				this._initData();
				this.log(this.page, "----------------");
			},
			onNext(page) {
				this.page = page + 1;
				this._initData();
				this.log(this.page, "+++++++++++++");
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
