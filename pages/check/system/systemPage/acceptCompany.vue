<template>
	<view class="app_acceptCompany_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="接收单位"></uni-nav-bar>
		<view class="acceptCompany_wrap padding_10px">
			<view class="a_c_top_btn_wrap clearfix mar_bottom_10px">
				<view :class="{ isActive:retype == 1 }" @click="onChange(1)" class="ac_t_btn_l text_align_center width50px font16 border_1px_all_ccc float_left padding_10px">企业</view>
				<view :class="{ isActive:retype == 2 }" @click="onChange(2)" class="ac_t_btn_r text_align_center width110px font16 border_1px_all_ccc border_left_none padding_10px float_left">监管部门/单位</view>
			</view>
			<view class="a_c_m_top_wrap" v-if="retype == 1">
				<view class="app_table_wrap">
					<app-table-new ref="table" :tableData="tableData" :isShowExpand="true" :headerArray='headerArray' :showContent="showContent"
					 :isShowIndex="true">
						<block class="" slot="content" slot-scope="props" v-if="props.data">
							<view class="table_hide_total_container" v-if="props.data">
								<view class="a_t_ul table_hide_info_wrap">
									<view class="a_t_li">
										<label>生产经营状态</label>
										<view class="info_bd">
											{{ (props.data.produce_state == "" || props.data.produce_state == null) ? "" : produce_stateTo[props.data.produce_state]}}
										</view>
									</view>
									<view class="a_t_li clearfix" @click="onLookDetail(props.data)">
										<label>已读状态</label>
										<view class="info_bd"> {{stateTo[props.data.read_state]}}</view>
									</view>
								</view>
							</view>
						</block>
					</app-table-new>
				</view>
				<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
				 @onNext="onNext"></app-pagination>
			</view>
			<view class="a_c_m_top_wrap" v-if="retype == 2">
				<view class="app_table_wrap">
					<app-table-new ref="table" :tableData="tableData2" :isShowExpand="true" :headerArray='headerArray2' :showContent="showContent2"
					 :isShowIndex="true">
						<block class="" slot="content" slot-scope="props" v-if="props.data">
							<view class="table_hide_total_container" v-if="props.data">
								<view class="a_t_ul table_hide_info_wrap"> 
									<view class="a_t_li clearfix" @click="onLookDetail(props.data)">
										<label>已读状态</label>
										<view class="info_bd"> {{stateTo[props.data.read_state]}}</view>
									</view>
								</view>
							</view>
						</block>
					</app-table-new>
				</view>
				<app-pagination :total="total2" :page="page2" :pageSize="pageSize2" @onSelectItem="onSelectItem2" @onPrev="onPrev2"
				 @onNext="onNext2"></app-pagination>
			</view>
		</view>
	</view>
</template>

<script>
	import appTableNew from "@/components/app-table/app-table-new"
	import appPagination from '@/components/app-table/app-pagination'
	export default {
		data() {
			return {
				retype: 1,
				tableData: [],
				tableData2: [],
				page2: 1,
				pageSize2: 10,
				page: 1,
				pageSize: 10,
				total: 0,
				total2: 0,
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
				showContent: [{
					key: 'name',
					isInWidth: true,
					width: 0,
				}],
				headerArray2: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '编号',
						isInWidth: false,
						width: 100
					},
					{
						key: '部门名称',
						isInWidth: false,
						width: 120
					}
				],
				showContent2: [{
					key: 'number',
					width: 100,
				}, {
					key: 'name',
					width: 120,
				}],
				produce_stateTo: {
					1: '正常经营',
					2: '关闭(注销/搬迁)',
					3: '停产停业-正常放假',
					4: '停产停业-应急部门责令停产',
					5: '停产停业-其他部门责令停产',
					6: '停产停业-拟停产搬迁'
				},
				stateTo: {
					1: '未读',
					2: '已读'
				},
				email_id: '',
			}
		},
		components: {
			appTableNew,
			appPagination
		},
		onLoad(opts) {
			this.email_id = opts.email_id;
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				var opts = {
					page: this.page,
					page_size: this.pageSize,
					email_id: this.email_id,
					retype: this.retype,
				}
				if (this.retype == 2) {
					opts.page = this.page2;
					opts.page_size = this.pageSize2;
				}
				this.$http.post('reListS', opts).then((res) => {
					if (res.code == 200) {
						if (this.retype == 1) {
							this.total = res.Total;
							this.tableData = res.data;
						}else{
							this.total2 = res.Total;
							this.tableData2 = res.data;
						}
					}
				})
			},
			onLookDetail(data) {
				console.log(data)
			},
			onChange(num) {
				this.retype = num;
				this._initData();
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
			onSelectItem2(num) {
				this.pageSize2 = num;
				this.page2 = 1;
				this._initData();
			},
			onPrev2(page) {
				this.page2 = page - 1;
				this._initData();
			},
			onNext2(page) {
				this.page2 = page + 1;
				this._initData();
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_acceptCompany_container {
		.acceptCompany_wrap {
			.a_c_top_btn_wrap {
				.ac_t_btn_l {
					border-top-left-radius: 10upx;
					border-bottom-left-radius: 10upx;
				}

				.ac_t_btn_r {
					border-top-right-radius: 10upx;
					border-bottom-right-radius: 10upx;
				}

				.isActive {
					background-color: #409eff;
					color: #fff;
				}
			}
		}
	}
</style>
