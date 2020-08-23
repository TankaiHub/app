<template>
	<view class="app_table_body_container">
		<view class="a_t_b_wrap">
			<!-- table -->
			<view class="a_t_b_table_wrap">
				<!-- body -->
				<view class="a_t_b_table_body  clearfix">
					<!-- tr -->
					<view class="a_t_b_table_body_tr clearfix" v-for="(item, index) in tableData" :key="'tr'+index">
						<!-- td -->
						<view class="clearfix" :class="{isExpand:isExpand && index == currentIndex}" @click="onTableTdBar(item, index)">
							<view class="a_t_b_table_body_td clearfix" v-for="(ele, indx) in conf" :key="'tb-'+indx">
								<!-- 下三角 -->
								<view class="a_t_b_table_td_cell" :style="{ width:(ele.width || 30) + 'px' }" v-if="ele.type == 'expand'"
								 @click="onTableTd(item, index)">
									V
								</view>
								<view class="a_t_b_table_td_index" :style="{ width:(ele.width || 40) + 'px' }" v-if="ele.type == 'index'">
									{{index + 1}}
								</view>
								<view :style="{width: (ele.width || tdW) +  'px' }" class="a_t_b_table_td_col" v-if="ele.prop">
									<text v-if="ele.type == 'time'">{{changeTime(item[ele.prop])}}</text>
									<text v-else>{{item[ele.prop]}}</text>
								</view>
							</view>

							<slot name="myslot" v-if="isExpand && index == currentIndex" :data="currentTd"></slot>
						</view>

					</view>

					<view class="not_data" v-if="tableData.length == 0">
						暂无数据
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			tableData: Array,
			isClickBar: Boolean
		},
		data() {
			return {
				currentTd: {},
				vNode: null,
				oldIndex: -1,
				isExpand: false,
				currentIndex: -1,
				tdW: 0, 
			}
		},
		watch: {

		},
		components: {

		},
		computed: {

			table() {
				let parent = this.$parent;
				while (parent && !parent.tableId) {
					parent = parent.$parent;
				}
				return parent;
			},
			columnOrTableParent() {
				let parent = this.$parent;
				while (parent && !parent.tableId && !parent.columnId) {
					parent = parent.$parent;
				}
				return parent;
			},
			conf() {
				return uni.getStorageSync("config") || [];
			}
		},
		watch: {
			tableData(newVal) {
				if (newVal.length > 0) {
					this.tableData = newVal;
				}
			}
		},
		created() {
			try {
				const res = uni.getSystemInfoSync();
				this.tdW = res.windowWidth - 20 - 70 - 20;
			} catch (e) {
				this.tdW = 200;
			}
		},
		methods: {


			onTableTd(item, index) {
				if (this.isClickBar) return;
				this.tableTdChange(item, index);

			},
			onTableTdBar(item, index) {
				if (!this.isClickBar) return;
				this.tableTdChange(item, index);
			},
			tableTdChange(item, index) {
				console.log(this.$slots)
				this.currentIndex = index;
				// var tr = this.createDom('view', 'insert_dom'); 

				// var dom = document.getElementsByClassName('a_t_b_table_body_tr')[index];
				this.currentTd = item;
				var vNode = (this.table.renderExpanded ? this.table.renderExpanded({
					item,
					index
				}) : '');
				// if (vNode[0].elm) {
				// 	tr.innerHTML = vNode[0].elm.outerHTML; 
				// } else {
				// 	tr.innerHTML = '';
				// }  
				if (this.oldIndex == -1) {
					// this.insertAfter(tr, dom);
					this.isExpand = true;
					this.oldIndex = index;
					console.log('1111111111')
				} else if (this.oldIndex == index) {
					console.log(this.oldIndex == index, '22222222222')
					// this.removeDom(dom);
					this.isExpand = false;
					this.oldIndex = -1;
				} else if (this.oldIndex != index) {
					console.log("3333333333333333")
					// this.removeDom(dom);
					// this.insertAfter(tr, dom);
					this.oldIndex = index;
				}
			},


			createDom(tag, className) {
				var dom = document.createElement(tag);
				dom.className = className;
				return dom;
			},
			removeDom(dom) {
				var parent = dom.parentNode;
				var child = parent.getElementsByClassName("insert_dom")[0];
				if (child != null) {
					child.remove();
				}

			},
			insertAfter(newNode, referenceNode) {
				// if (referenceNode.nextSibling != null) {
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
				// }else {
				// 	var parent = referenceNode.parentNode;
				// 	parent.appendChild(newNode);
				// }

			},
			changeTime(time) {
				if (!time) return 0;
				time = time * 1000;
				var d = new Date(time),
					y = d.getFullYear(),
					m = ('0' + (d.getMonth() + 1)).slice(-2),
					day = ('0' + d.getDate()).slice(-2);
				return y + '-' + m + '-' + day;

			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

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

</style>
