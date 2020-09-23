<template>
	<view class="app_companyMsg_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="发件箱"></uni-nav-bar>
		<view class="a_c_m_wrap padding_10px">
			<view class="clearfix">
				<button type="primary" class="float_right" @click="onSendEmail">发送邮件</button>
			</view>
			<view class="a_c_m_top_wrap">
				<view class="app_table_wrap">
					<app-table-new ref="table" :tableData="listData" :isShowExpand="true" @onContent="onContent" :headerArray='headerArray'
					 :showContent="showContent" :isShowIndex="true">
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
								</view>
								<view class="tb_hide_btn_wrap">
									<button type="primary" @click="onLookDetail(props.data)" class="btn_tb">查看详情</button>
								</view>
							</view>
						</block>
					</app-table-new>
				</view>
				<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
				 @onNext="onNext"></app-pagination>
			</view>
		</view>
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
				drawerVisible: false, //导航显示
				headerArray: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '接收单位',
						isInWidth: true,
						width: 0
					}
				],
				showContent: [{
					key: 'send',
					isInWidth: true,
					width: 0,
					isClickContent: true
				}],
				isShowCheck: true,
				listData: [],
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
				tableData: []
			}
		},
		components: {
			appNav,
			appTableNew,
			appPagination
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

					this.total = res.Total
					var data = res.data;
					for (var i = 0; i < data.length; i++) {
						var temp = data[i];
						temp['send'] = `${temp.company_count}家企业,${temp.admin_count}个部门`;
					}
					this.listData = data;

				})
			},

			onContent(opts) {
				uni.navigateTo({
					url:'./systemPage/acceptCompany?email_id=' + opts.email_id
				})
			},
			onLookDetail(opts) {
				console.log(opts, "?????????");
				uni.navigateTo({
					url:'./systemPage/companyMsgDetail?email_id=' + opts.email_id,
					fail(err) {
						console.log(err)
					}
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
			onSendEmail() {
				uni.navigateTo({
					url:'./systemPage/sendEmail'
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_table_wrap {
		.table_hide_total_container {

			// border-bottom: 1px solid #ccc; 
			.table_hide_info_wrap {
				padding: 0 10px;
			}

			.table_hide_info_wrap .a_t_li {
				height: 32px;
				line-height: 32px;
				font-size: 14px;
			}

			.table_hide_info_wrap .a_t_li.reg_addr {
				height: 100%;
			}

			.table_hide_info_wrap .a_t_li.reg_addr .info_bd,
			.table_hide_info_wrap .a_t_li.reg_addr label {
				float: left;
			}

			.table_hide_info_wrap .a_t_li.reg_addr label {
				height: 100%;
			}

			.table_hide_info_wrap .a_t_li.reg_addr .info_bd {
				width: 60%;
			}

			.table_hide_info_wrap .a_t_li label {
				display: inline-block;
				margin-right: 10px;
				width: 90px;
				text-align: right;
				color: #999;

			}

			.table_hide_info_wrap .a_t_li .info_bd {
				display: inline-block;
			}

			.tb_hide_btn_wrap {
				padding: 10px 0;
				display: flex;
				justify-content: space-between;
			}

			.tb_hide_btn_wrap .btn_tb {
				width: 94px;
				height: 32px;
			}
		}
	}
</style>
