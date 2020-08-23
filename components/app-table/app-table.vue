<template>
	<view class="cmp_app_table_container">
		<view class="c_a_t_wrap">
			<slot></slot>
			<app-table-header :isShowCheck="isShowCheck" :isCheck='isCheck' :tableIndex="tableIndex" :tableData="tableData"
			 @onChangeBox="onHeaderChangeBox"></app-table-header>
			<view class="app_table_body_container">
				<view class="a_t_b_wrap">
					<!-- table -->
					<view class="a_t_b_table_wrap">
						<!-- body -->
						<view class="a_t_b_table_body  clearfix">
							<!-- tr -->
							<view class="a_t_b_table_body_tr clearfix" v-for="(item, index) in tableData" :key="'tr'+index">
								<!-- td -->
								<view class="clearfix" :class="{isExpand:isExpand && index == currentIndex}">
									<view class="clearfix" @click="onTableTdBar(item, index)">
										<view class="a_t_b_table_body_td clearfix" v-for="(ele, indx) in conf" :key="'tb-'+indx">
											<!-- 下三角 -->
											<view class="a_t_b_table_td_cell" :style="{ width:(ele.width || 30) + 'px' }" v-if="ele.type == 'expand'"
											 @click="onTableTd(item, index)">
												V
											</view>

											<view class="a_t_b_table_td_check_box" v-if="ele.type == 'check'">
												<checkbox-group @change="onChangeBox($event, item)">
													<label>
														<checkbox :value="'check'+index" :checked="item.checked" color="#007aff" style="transform:scale(0.7)" />
														<input type="text" v-if="false" v-model="'cs' + item.checked">
													</label>
												</checkbox-group>
											</view>


											<view class="a_t_b_table_td_index" :style="{ width:(ele.width || 40) + 'px' }" v-if="ele.type == 'index'">
												{{index + 1}}
											</view>
											<view :style="{width: (ele.width || tdW) +  'px' }" class="a_t_b_table_td_col" v-if="ele.prop">
												<text v-if="ele.type == 'time'" :style="{ width:(ele.width || 30) + 'px' }">{{changeTime(item[ele.prop])}}</text>
												<text v-if="ele.type == 'time-yy-mm'" :style="{ width:(ele.width || 30) + 'px' }">{{changeTime(item[ele.prop], 'yy-mm')}}</text>
												<text v-else>{{item[ele.prop]}}</text>
											</view>
										</view>
									</view>

									<slot name="myslot" v-if="isExpand && index == currentIndex && changeState" :data="currentTd"></slot>
								</view>

							</view>

							<view class="not_data" v-if="tableData.length == 0">
								暂无数据
							</view>

						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * check-box  启动  需要在tableData数据中携带checked（boolean）字段
	 * 
	 * 
	 */
	import appTableHeader from "./app-table-header.vue"
	import appTableBody from "./app-table-body.vue"
	import appTableFooter from "./app-table-footer.vue"
	import appTableColumn from "./app-table-column.vue"

	import {
		mapState,
		mapMutations
	} from 'vuex'
	let tableIdSeed = 1;
	export default {
		props: {
			changeState: Boolean,
			headerArray: Array,
			isShowExpand: { //显示展开
				type: Boolean,
				default: false
			},
			tableData: { //
				type: Array,
				default: []
			},
			type: {
				type: String,
				default: 'index'
			},
			isShowCheck: {
				type: Boolean,
				default: false
			},
			isClickBar: {
				type: Boolean,
				default: false
			},
			page: {
				type: Number,
				default: 1
			},
			pageSize: {
				type: Number,
				default: 10
			}
		},
		data() {
			// var table = new Table(this, {});
			return {
				tableIndex: 0,
				tableId: '',
				renderExpanded: null,

				checkArray: [],


				isCheck: false,
				tdW: 0,
				////////////////////
				currentTd: {},
				vNode: null,
				oldIndex: -1,
				isExpand: false,
				currentIndex: -1,

				selectArray: [],
				tempArr: []
			}
		},
		watch: {
			page(nv) {
				var p = this.page;
				this.onChangeState(false);
				this.isExpand = false;
				this.oldIndex = -1;
				this.currentIndex = -1;
				this.isCheck = false;
				this.tableIndex++;
			},
			pageSize(nv) {
				var ps = this.pageSize;
				this.onChangeState(false);
				this.isExpand = false;
				this.isCheck = false;
				this.oldIndex = -1;
				this.currentIndex = -1;
				this.tableIndex++;
			},
			changeState(nv) {
				if (!nv) {
					this.isCheck = false;
					this.tableIndex++;
					this.isExpand = false;
					this.oldIndex = -1;
					this.currentIndex = -1;
				}
			},
			tableData(nv) {
				this.onChangeState(false);
				this.isExpand = false;
				this.isCheck = false;
				this.oldIndex = -1;
				this.currentIndex = -1;
				this.tableIndex++;
			}
		},
		model: {
			prop: 'changeState',
			event: "onChangeState"
		},
		computed: {
			...mapState(['table_data']),
			isDisabled() {
				if (this.tableData.length == 0) {
					return true;
				} else {
					return false;
				}
			},
			conf() {

				return this.table_data
			},
		},
		components: {
			appTableHeader,
			appTableBody,
			appTableFooter,
			appTableColumn
		},
		created() {
			this.$store.commit('set_table_data', []);
			this.tableId = 'cmp-table_' + tableIdSeed++;
			try {
				const res = uni.getSystemInfoSync();
				this.tdW = res.windowWidth - 40 - 60 - 20;
				if (this.isShowCheck) {
					this.tdW = this.tdW - 40;
				}

			} catch (e) {
				this.tdW = 200;
				if (this.isShowCheck) {
					this.tdW = this.tdW - 40;
				}
			}


		},
		methods: {
			...mapMutations(['set_table_data']),
			getTableData() {
				return this.selectArray;
			},
			onTableTdBar(item, index) {
				if (!this.isClickBar) return;
				this.tableTdChange(item, index);
			},
			onTableTd(item, index) {
				if (this.isClickBar) return;
				this.tableTdChange(item, index);

			},
			tableTdChange(item, index) {
				this.currentIndex = index;
				this.currentTd = item;
				if (this.oldIndex == -1) {
					this.isExpand = true;
					this.onChangeState(true);
					this.oldIndex = index;
					// console.log('1111111111')
				} else if (this.oldIndex == index) {
					this.isExpand = false;
					this.onChangeState(false);
					this.oldIndex = -1;
					// console.log(this.oldIndex == index, '22222222222')
				} else if (this.oldIndex != index) {
					this.oldIndex = index;
					this.isExpand = false; //关闭上一个
					this.onChangeState(false);
					this.onChangeState(true);
					this.isExpand = true; //再次打开 开启下一个
					// console.log("3333333333333333", this.oldIndex, index)
				}
			},
			///body -- check-box
			onChangeBox(e, item) {
				var val = e.detail.value;
				if (val.length == 0) { //
					item['checked'] = false;
					this.isCheck = false;
				} else {
					item['checked'] = true;
				}
				this.pushData(item, item['checked']);
			},
			onChangeState(bool) {
				this.$emit("onChangeState", bool);
			},
			///////header事件
			onHeaderChangeBox(e) {
				this.isCheck = e;
				this.changeTableData(this.isCheck);
			},
			changeTableData(bool) {
				for (var i = 0; i < this.tableData.length; i++) {
					this.tableData[i].checked = bool;
					this.pushData(this.tableData[i], bool);
				}

			},

			pushData(item, bool) {
				var arr = this.selectArray;
				var temp = [];
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id == item.id) {
						this.spliceData(arr, i);
					}
				}
				if (bool) {
					this.selectArray.push(item);
					if (this.selectArray.length == this.tableData.length) {
						this.isCheck = true;
					} else {
						this.isCheck = false;
					}
				}
			},
			spliceData(arr, i) {
				arr.splice(i, 1);
			},
			changeTime(time, format) {
				if (!time) return 0;
				time = time * 1000;
				var d = new Date(time),
					y = d.getFullYear(),
					m = ('0' + (d.getMonth() + 1)).slice(-2),
					day = ('0' + d.getDate()).slice(-2);
				switch (format) {
					case 'yy-mm':
						return y + '-' + m;
					default:
						return y + '-' + m + '-' + day;
				}

			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_app_table_container {
		.p_c_t_table_wrap {

			// table
			.p_c_t_table_bd {
				width: 100%;

				//head
				.p_c_t_table_head_wrap {
					.p_c_t_table_head_bd {
						// display: flex;
						// justify-content: space-between;
						// width:100%;
						border: 1px solid #ccc;
					}
				}

				//body
				.p_c_t_table_body_wrap {
					.p_c_t_table_tr {
						margin: 10px 0;
						padding-bottom: 10px;
						border-bottom: 1px solid #ccc;

						.p_c_t_table_tr_all_wrap {
							.p_c_t_table_tr_all {
								border-bottom: 1px solid transparent;

								&.p_c_t_bor {
									padding-bottom: 10px;
									border-bottom-color: #ccc;
								}

								.p_c_t_table_td {
									float: left;

									&.p_c_t_center {
										text-align: center;
									}
								}
							}
						}

					}
				}

				//td
				.p_c_t_table_td {}

			}

			// .p_c_t_table_bd {
			// 	display: table;
			// 	width: 100%;

			// 	.p_c_t_table_head_wrap {
			// 		display: table-header-group;

			// 		.p_c_t_table_head_bd {
			// 			display: table-row;

			// 		}
			// 	}

			// 	.p_c_t_table_body_wrap {
			// 		display: table-row-group;

			// 		.p_c_t_table_tr {
			// 			display: table-row;

			// 			color: #000;

			// 			&.even {
			// 				background-color: rgb(114, 123, 200);
			// 				font-weight: 500;
			// 			}
			// 		}
			// 	}

			// 	.p_c_t_table_td {
			// 		padding: 10px 0;
			// 		display: table-cell;
			// 		border-bottom: 1px solid #ccc;

			// 		&.td_index {
			// 			text-align: center;
			// 		}

			// 		.p_c_t_table_td_bd {
			// 			position: relative;

			// 			.s_icon {
			// 				position: absolute;
			// 				right: -10px;
			// 				width: 0;
			// 				height: 0;
			// 				border-width: 5px;
			// 				border-style: solid;

			// 				&.s_up_icon {
			// 					bottom: -2px;
			// 					border-color: red transparent transparent transparent;
			// 				}

			// 				&.s_down_icon {
			// 					top: -2px;
			// 					border-color: transparent transparent red transparent;

			// 				}
			// 			}
			// 		}


			// 	}
			// }

			.p_c_t_table_tr_no_data {
				width: 100%;

				.td_on_data {
					line-height: 60px;
					text-align: center;
				}
			}
		}






		////////////////////table  ---------------------     table/////////////////////////////////////////
		.app_table_body_container {

			.a_t_b_wrap {
				.a_t_b_table_wrap {
					.a_t_b_table_body {
						.a_t_b_table_body_tr {
							border-bottom: 1px solid #ccc;

							.isExpand {
								border-bottom: 1px solid #ccc;
							}

							.a_t_b_table_body_td {
								float: left;
								padding: 10px 0;
								line-height: 30px;

								&:last-child {
									// width:70%;
								}

								.a_t_b_table_td_cell {
									width: 30px;
									height: 30px;
									text-align: center;
								}

								.a_t_b_table_td_index {
									height: 30px;
									text-align: center;
								}

								.a_t_b_table_td_col {
									// width: 100%;
									white-space: normal;
									word-break: break-all;
								}
							}
						}
					}
				}
			}
		}







	}
</style>
