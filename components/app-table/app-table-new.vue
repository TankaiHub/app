<template>
	<view class="cmp_table_new_container" 
				:class="{ text_align_center:textAlign == 'center',
						   text_align_left:textAlign == 'left',
						   text_align_right:textAlign == 'right'}">

		<view class="table_wrap">
			<view class="table_header border_1px border_1px_ebeef5 padding_10px_top_bt">
				<view class="header_item dis_inline_block" v-if='isShowCheckbox'>
					<checkbox-group @change="onHeaderCheckBox">
						<label>
							<checkbox :value="checkboxVal" class="check_box_size" :disabled="tableData.length == 0" :checked="isCheckAll" />
						</label>
					</checkbox-group>
				</view>
				<view class="header_item dis_inline_block padding_5px" v-if="isShowExpand" :style="{ width:(expandWidth)*2+'upx' }"></view>
				<view class="header_item dis_inline_block padding_5px color_blue_btb font14 font_weight_bold" v-for="(item, index) in headerArray" :key="index" :style="{ width:item.isInWidth ? tdW*2 + 'upx' : item.width * 2 + 'upx' }">
					{{item.key}}
				</view>
			</view>

			<app-table></app-table> 
			<view class="table_body">
				<view class="body_tr" v-for="(item, index) in tableData" :key="index">
					<view class="border_1px border_1px_ebeef5 padding_10px" @click="onBar(index)">
						<view class="item_td dis_inline_block vertical_align_center" v-if='isShowCheckbox'>
							<checkbox-group @change="onItemCheckBox($event, index)">
								<label>
									<checkbox :value="checkboxVal" class="check_box_size" :checked="checkAll[index]" />
								</label>
							</checkbox-group>
						</view>
						<!-- 展开按钮 -->
						<view class="item_td padding_5px dis_inline_block text_align_center vertical_align_center height20px" :style="{ width:expandWidth*2+'upx' }"
						 :class="{ isRotate:!expandArray[index] }" v-if="isShowExpand" @click="onExpand(index)">
							<svg t="1599199292519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
							 p-id="1161" width="20" height="20">
								<path d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z"
								 p-id="1162" fill="#666666"></path>
							</svg>
						</view>
						<!-- index 序号 -->
						<view class="item_td width40px padding_5px dis_inline_block text_align_left vertical_align_center" v-if="isShowIndex">
							{{index+1}} </view>
						<!-- 当前显示的内容 -->
						<view class="item_td padding_5px dis_inline_block vertical_align_center" :style="{ width:(  ele.isInWidth ? tdW*2 + 'upx' : ele.width*2 +'upx' ) }"
						 v-for="(ele, indx) in showContent" :key="indx" @click="onContent(ele.isClickContent, item)">
								{{item[ele['key']]}}
						</view>
					</view>
					<view class="border_1px border_1px_ebeef5">
						<slot name="content" :data="item" v-if="expandArray[index]"></slot>
					</view>
				</view>
				<view class="not_data" v-if="tableData.length == 0">
					暂无数据
				</view>
			</view> 
		</view> 
	</view>
</template>

<script>
	import appTable from './table.js'
	import appCell from './cell.js'
	export default {
		props: {
			tableData: { //表格数据
				type: Array,
				default () {
					return [];
				}
			}, 
			isShowIndex: { //是否显示序号
				type: Boolean,
				default: false
			},
			isShowExpand: { //是否可以展开
				type: Boolean,
				default: false
			},
			headerArray: Array, //表头
			isShowCheckbox: { //是否显示多选框
				type: Boolean,
				default: false
			},
			isMultiple: { //是否展开多个
				type: Boolean,
				default: false,
			},
			isClickBar: { //是否点击bar展开
				type: Boolean,
				default: false
			},
			showContent: {
				type: Array,
				default () {
					return [];
				}
			},
			isShowCell:{
				type:Boolean,
				default:false
			},
			textAlign:{
				type:String,
				default:'left'
			}
		},
		data() {
			return {
				headerData: ['测试1', '测试2', '测试3'],
				checkboxVal: 'cb', //header 多选框状态
				expandArray: [], //展开状态
				oldExpandArray: [], //上一个展开状态
				expandWidth: 20, //展开按钮宽度
				tdW: 0, //td 宽度
				isCheckAll: false, //是否全选
				checkAll: []
			}
		},
		watch: {
			tableData(nv) {
				this._initData();
				this.isCheckAll = false; 
			},  
		},
		computed: {
			
		},
		components: {
			appTable,
			appCell
		},
		created() {
			//初始化
			this.tableId = 1;
			this._initData();
		},
		methods: {
			_initData() {
				//初始化 width
				this._changeInWidth();
				this._initExpand(false);
				this._initCheckBox(false);
			},
			//初始化展开项
			_initExpand(bool) {
				this.expandArray = []
				this.tableData.forEach((item, index) => {
					this.expandArray.push(bool);
				});
			},
			//初始化checkbox
			_initCheckBox(bool) {
				this.checkAll = [];
				this.tableData.forEach((item, index) => {
					this.checkAll.push(bool);
				});
			},
			//计算宽度
			_changeInWidth() {
				//初始化td name宽度
				try {
					const res = uni.getSystemInfoSync();
					//- padding20 -tr20  -svg -序号
					this.tdW = res.windowWidth - 20 - 20 - 15;
					for (var i = 0; i < this.showContent.length; i ++) {
						var temp = this.showContent[i]; 
						if (!temp['isInWidth']) { 
							if(temp['width']  && (temp['width'] != undefined || temp['width'] != 0)) { 
								this.tdW -= temp['width'];
							}
							
						}
					}
					
					if (this.isShowExpand) {
						this.tdW = this.tdW - 37;
					}
					if (this.isShowIndex) {
						this.tdW = this.tdW - 30 - 20;
					}
					if (this.isShowCheckbox) {
						this.tdW = this.tdW - 21;
					}

				} catch (e) {
					this.tdW = 200;
					if (this.isShowExpand) {
						this.tdW = this.tdW - 37;
					}
					if (this.isShowIndex) {
						this.tdW = this.tdW - 30;
					}
					if (this.isShowCheckbox) {
						this.tdW = this.tdW - 21;
					}
				}
			},
			//获取选择的item
			getCheckItem() {
				var arr = [];
				for (var i = 0; i < this.checkAll.length; i ++) {
					var temp = this.checkAll[i];
					if (temp) {
						arr.push(this.tableData[i]);
					}
				}
				return arr;
			},
			//是否展开
			onExpand(index) {
				if (this.isClickBar) return;
				this._changeExpand(index);
			},
			//展开 -- 操作
			_changeExpand(index) {
				this.oldExpandArray = this.expandArray;
				var bool = this.expandArray[index];
				this._initData();
				if (this.isMultiple) { //是否展开多个
					this.expandArray = this.oldExpandArray;
				}
				if (bool) {
					this.expandArray[index] = false;
				} else {
					this.expandArray[index] = true;
				}
			},
			//点bar 展开
			onBar(index) {
				if (!this.isClickBar) return;
				this._changeExpand(index);
			},
			//点击全选按钮
			onHeaderCheckBox(e) {
				var val = e.detail.value;
				if (val.length > 0) {
					this.isCheckAll = true;
				} else {
					this.isCheckAll = false;
				}
				this._initCheckBox(this.isCheckAll);
			},
			onItemCheckBox(e, index) {
				var val = e.detail.value;
				if (val.length > 0) {
					this.checkAll[index] = true;
				}else {
					this.checkAll[index] = false;
				}
				var state = this._changeAllState(this.checkAll);
				if(state) {
					if (!this.isCheckAll) {
						this.isCheckAll = true;
					}
				}else {
					this.isCheckAll = false;
				}
			},
			_changeAllState(arr) {
				for (var i = 0; i < arr.length; i ++) {
					if (!arr[i]) return false;
				}
				return true;
			},
			onContent(bool, item) {
				if (bool) {
					this.$emit('onContent', item);
				}
			}
		},

	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_table_new_container {
		.table_wrap {
			// display: table;
			width: 100%;

			.check_box_size {
				/deep/ .uni-checkbox-wrapper {
					.uni-checkbox-input {
						width: 28upx;
						height: 28upx;

						&::before {
							font-size: 28upx;
						}
					}
				}

			}

			.table_header {
				.header_item {}
			}

			.table_body {
				.body_tr {
					.item_td {
						transition: all .2s;
						line-height: 50upx;

						&.isRotate {
							transform: rotateZ(-90deg);
						}

						&.width20 {
							width: 40upx;
						}
					}
				}
			}
		}
	}
</style>
