<template>
	<view class="app_companyFeedbackRecovery_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="企业反馈-回收站"></uni-nav-bar>
		<view class="companyFeedbackRecovery_wrap padding_10px">
			<view class="a_c_f_search">
				<app-search class="a_c_f_search_cmp" @onSearch="onSearch"></app-search>
				<button class="a_c_f_btn width50px" type="primary" @click="onRestores">恢复</button>
			</view>
			<view class="a_c_f_select_wrap">
				<app-picker-select class="half" placeholder="地区分类" :selectValue="addressType" :selectData="addressTypeArray"
				 @onSelectClear="onSelectClear('addressType')" @onSelectBtn="onSelectBtn($event, 'addressType')"></app-picker-select>
				<app-picker-select class="half" placeholder="处理状态" :selectValue="admin_state" :selectData="adminStateData"
				 @onSelectClear="onSelectClear('admin_state')" @onSelectBtn="onSelectBtn($event, 'admin_state')"></app-picker-select>
			</view>
			<view class="app_table_wrap">
				<app-table-new ref="table" :tableData="binData" :isShowExpand="isShowExpand" :isShowCheckbox="isShowCheck"
				 @onContent="onContent" :headerArray='headerArray' :showContent="showContent" :isShowIndex="true">
					<block class="" slot="content" slot-scope="props">
						<view class="table_hide_total_container" v-if="props.data">
							<view class="a_t_ul table_hide_info_wrap">
								<view class="a_t_li clearfix">
									<label>时间</label>
									<view class="info_bd">{{changeTime(props.data.addtime, 'yy-mm-dd hh-mm-ss')}}</view>
								</view>
								<view class="a_t_li clearfix">
									<label>状态</label>
									<view class="info_bd">{{stateTo[props.data.state]}}</view>
								</view>
								<view class="a_t_li clearfix">
									<label>处理状态</label>
									<view class="info_bd">{{adminStateTo[props.data.admin_state]}}</view>
								</view>
							</view>
							<view class="tb_hide_btn_wrap">
								<button type="primary" @click="onRestore(props.data.id)" class="btn_tb">恢复</button>
							</view>
						</view>
					</block>
				</app-table-new>
			</view>
			<app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
			 @onNext="onNext"></app-pagination>
		</view>
	</view>
</template>

<script>
	import appSearch from '@/components/app-input/app-input-search'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appTableNew from "@/components/app-table/app-table-new"
	import appPagination from '@/components/app-table/app-pagination'
	import {
		changeTime
	} from '@/common/js/base.js'
	export default {
		data() {
			return {
				changeTime,
				isShowExpand: true, //表格是否展开
				headerArray: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '标题',
						isInWidth: true,
						width: 0
					}
				],
				showContent: [{
					key: 'title',
					isInWidth: true,
					width: 0,
					isClickContent: true
				}],


				isShowCheck: true,
				binData: [],
				total: 0,
				page: 1,
				pageSize: 10,
				searchVal: '',
				addressType: 1,
				addressTypeArray: [{
					label: '市',
					value: '1',
					show: true,
				}, {
					label: '区',
					value: '2',
					show: true,
				}, {
					label: '镇/街道',
					value: '3',
					show: true,
				}, {
					label: '村/社区',
					value: '4',
					show: true,
				}],
				admin_state: '',
				adminStateData: [{
					label: '已处理',
					value: '1',
					show: true,
				}, {
					label: '未处理',
					value: '2',
					show: true,
				}, {
					label: '已上报',
					value: '3',
					show: true,
				}],
				stateTo: {
					1: '未读',
					2: '已读,未回复',
					3: '已读,已回复',
					4: '已读,已回复'
				},
				adminStateTo: {
					1: '已处理',
					2: '未处理',
					3: '上报镇街',
					4: '上报区县'
				},
				numberValue: ''
			}
		},
		components: {
			appSearch,
			appPickerSelect,
			appTableNew,
			appPagination
		},
		onLoad() {
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				var opts = {
					page: this.page,
					/*当前页码*/
					page_size: this.pageSize,
					/*每页显示多少条数据*/
					type: this.addressType,
					admin_state: this.admin_state,
					key: this.searchVal,
					number: this.numberValue,
				}
				this.$http.post('feedbackListDel', opts).then(res => {
					if (res.code == 200) {
						this.total = res.Total;
						this.binData = res.data.list;
					}
				})
			},
			onSearch(val) {
				this.page = 1;
				this.searchVal = val;
				this._initData();
			},
			/////////////////////select////////////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this[key] = e.value;
					this.page = 1;
					this._initData();
				}
			},
			onSelectClear(str) {
				this.page = 1;
				this[str] = "";
				this._initData();
			},
			onRestores() {
				var tableData = this.$refs.table.getCheckItem();
				if (tableData.length == 0) {
					uni.showToast({
						title: '请选择要恢复的分类!',
						icon: 'none'
					})
					return
				}
				var str = '';
				for (var i = 0; i < tableData.length; i++) {
					var temp = tableData[i];
					if (i == 0) {
						str = temp.id;
					} else {
						str += ',' + temp.id;
					}
				}
				this.onRestore(str, true)
			},
			//恢复
			onRestore(id, bool = false) {
				var heeh = '该'
				if (bool) {
					heeh = '这些'
				}
				let _self = this;
				uni.showModal({
					title: '提示',
					content: '此操作将恢复' + heeh + '信息, 是否继续?',
					success: function(res) {
						if (res.confirm) {
							_self.$http.post('editStateFeedback', {
								id,
								state: 1
							}).then(res => {
								if (res.code == 200) {
									uni.showToast({
										title: '恢复成功',
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

	.a_c_f_search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;

		.a_c_f_search_cmp {
			width: 60%;
		}

		.a_c_f_btn {
			margin: 0;
			padding: 0 10px;
			height: 35px;
			line-height: 35px;
		}
	}

	.a_c_f_select_wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}
</style>
