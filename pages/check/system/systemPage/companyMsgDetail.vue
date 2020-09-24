<template>
	<view class="page_companyMsgDetail_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="发件箱-查看详情"></uni-nav-bar>
		<view class="companyMsgDetail_wrap padding_10px">
			<view class="cmd_top_title clearfix">
				<view class="cmd_t_title float_left font18 font_weight_bold">
					{{detail.title}}
				</view>
				<view class="cmd_t_time float_right color_ccc">
					{{changeTime(detail.addtime, 'yy-mm-dd hh-mm-ss')}}
				</view>
			</view>
			<view class="cmd_content_wrap mar_top_10px mar_bottom_10px">

			</view>
			<view class="cmd_fj">
				<view class="font18 font_weight_bold" v-if="!detail.annex_url">
					附件：<text class="color_ccc">无附件</text>
				</view>
				<view class="font18 font_weight_bold" v-if="detail.annex_url">
					附件：<text class="color_blue_btb">下载附件</text>
				</view>
			</view>
			<app-item-input title="接收对象（企业）：" class="mar_top_10px mar_bottom_10px">
				<view class="app_table_wrap" slot="item">
					<app-table-new :tableData="tableData" :isShowExpand="true" :headerArray='headerArray' :showContent="showContent"
					 :isShowIndex="true">
						<block class="" slot="content" slot-scope="props">
							<view class="table_hide_total_container" v-if="props.data">
								<view class="a_t_ul table_hide_info_wrap">
									<view class="a_t_li clearfix">
										<label>社信代码</label>
										<view class="info_bd">{{props.data.credit_code}}</view>
									</view>
									<view class="a_t_li clearfix">
										<label>生产经营状态</label>
										<view class="info_bd">
											{{ (props.data.produce_state == "" || props.data.produce_state == null) ? "" : produce_stateTo[props.data.produce_state]}}
										</view>
									</view>
								</view>
							</view>
						</block>
					</app-table-new>
					<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
					 @onNext="onNext"></app-pagination>
				</view>
			</app-item-input>
			<app-item-input title="接收对象（监管部门/单位）：" class="mar_top_10px mar_bottom_10px">
				<view class="app_table_wrap" slot="item">
					<app-table-new :tableData="sonTableData" :headerArray='headerArray2' :showContent="showContent2"></app-table-new>
					<app-pagination :total="sonTotal" :page="sonPage" :pageSize="sonPageSize" @onSelectItem="onSelectItem2" @onPrev="onPrev2"
					 @onNext="onNext2"></app-pagination>
				</view>
			</app-item-input>
		</view>
	</view>
</template>

<script>
	import appItemInput from "@/components/app-item-input/app-item-input"
	import appTableNew from "@/components/app-table/app-table-new"
	import appPagination from '@/components/app-table/app-pagination'
	import {
		changeTime
	} from '@/common/js/base.js'
	export default {
		data() {
			return {
				changeTime,
				email_id: '',
				page: 1,
				pageSize: 10,
				tableData: [],
				total: 0,
				sonPage: 1,
				sonPageSize: 10,
				sonTableData: [],
				sonTotal: 0,
				detail: {},
				showContent: [{
					key: 'name',
					isInWidth: true,
					width: 0,
				}],
				showContent2: [{
					key: 'number',
					isInWidth: false,
					width: 100,
				}, {
					key: 'name',
					isInWidth: false,
					width: 100,
				}],
				headerArray: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '企业名称',
						isInWidth: true,
						width: 0
					}
				],
				headerArray2: [{
						key: '编号',
						width: 100,
						isInWidth: false,
					},
					{
						key: '部门名称',
						isInWidth: false,
						width: 100
					}
				],
				produce_stateTo: {
					1: '正常经营',
					2: '关闭(注销/搬迁)',
					3: '停产停业-正常放假',
					4: '停产停业-应急部门责令停产',
					5: '停产停业-其他部门责令停产',
					6: '停产停业-拟停产搬迁'
				},
			}
		},
		components: {
			appItemInput,
			appTableNew,
			appPagination
		},
		onLoad(opts) {
			this.email_id = opts.email_id,
				this._initData();
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				this._getReListS(1, this.page, this.pageSize);
				this._getReListS(2, this.sonPage, this.sonPageSize);
				this._getSEmailInfo();
			},
			_getSEmailInfo() {
				var opts = {
					email_id: this.email_id
				};
				this.$http.post('sEmailInfo', opts).then(res => {
					if (res.code == 200) {
						this.detail = res.data;
					}
				})
			},
			_getReListS(retype, page, pageSize) {
				var opts = {
					page,
					page_size: pageSize,
					email_id: this.email_id,
					retype,
				};
				this.$http.post('reListS', opts).then(res => {
					if (res.code == 200) {
						if (retype == 1) {
							this.tableData = res.data;
							this.total = res.Total;

						} else if (retype == 2) {
							this.sonTableData = res.data;
							this.sonTotal = res.Total;
						}
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
			/////////////222222222222
			onSelectItem2(num) {
				this.pageSize2 = num;
				this.page2 = 1;
			},
			onPrev2(page) {
				this.page2 = page - 1;
			},
			onNext(page) {
				this.page2 = page + 1;
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
