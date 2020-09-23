<template>
	<view class="cmp_table_not_expand_container">
		<view class="cmp_table_wrap">
			<view class="cmp_table_header">
				<view class="cmp_table_header_group">
					<view class="cmp_table_header_td color_blue_btb" v-for="(item, index) in headerData" :style="{ 'text-align':item.center ? 'center' :'left' }"
					 :key='index'>{{item.text}}</view>
				</view>
			</view> 
			<view class="cmp_table_body">
				<view class="cmp_table_body_tr" v-for="(item, index) in tableData" :key="index">

					<view class="cmp_table_body_tr_td" v-for="(ele, indx) in tablePorps" :key="index+indx">
						<view class="cmp_table_b_tr_td_text" v-if="ele.isContent" :style="ele.style">
							{{item[ele.props]}}
						</view>
						<view class="cmp_table_b_tr_td_other_text" :style="ele.style" v-if="ele.isOther">
							<slot :data="item" name="other"></slot>
						</view>
					</view>
					<view class="cmp_table_body_tr_td" v-if="isShowOper">
						<slot :data="item"></slot>
					</view>
					<view class="cmp_table_body_tr_td cmp_table_body_tr_td_slot">
						<slot name="handle" :data="item"></slot>
					</view>
					<view class="cmp_table_body_tr_td cmp_table_body_tr_td_slot">
						<slot name="edit" :data="item"></slot>
					</view>
				</view>

			</view>
		</view>
		<view class="not_data" v-if="tableData && tableData.length == 0">
			暂无数据
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			headerData: Array,
			bodyData: Array,
			tablePorps: Array,
			isShowOper: Boolean
		},
		data() {
			return {
				disabledArray: [], 
			}
		},
		watch: {
			bodyData: { //监听的对象
				deep: true, //深度监听设置为 true
				handler: function(newV, oldV) {
					console.log('watch中：', newV)
				},
			}
		},
		computed:{
			tableData() {
				return this.bodyData
			}
		},
		created() { 
			 
		},
		methods: {

		}
	}
</script>


<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_table_not_expand_container {
		width: 100%;

		.cmp_table_wrap {
			display: table;
			width: 100%;

			.cmp_table_header {
				display: table-header-group;

				.cmp_table_header_group {
					display: table-row;

					.cmp_table_header_td {
						display: table-cell;
						padding-bottom: 10upx;
						font-size: 38upx;
						font-weight: bold;
						border-bottom: 2upx solid #ccc;
					}
				}
			}


			.cmp_table_body {
				display: table-row-group;

				.cmp_table_body_tr {
					display: table-row;
					border-bottom: 2upx solid #ccc;

					&.not_data {
						width: 100%;
					}

					.cmp_table_body_tr_td {
						display: table-cell;
						padding-bottom: 10upx;
						border-bottom: 2upx solid #ccc;
						vertical-align: middle;

						&.cmp_table_body_tr_td_slot {
							text-align: center;

						}

						.cmp_table_b_tr_td_text {
							position: relative;
							padding: 20upx 0;
							width: 200px;

							.cmp_table_b_tr_td_textarea {
								width: 100%;
								text-align: left;
							}

							.isBorder {
								border: 1px solid #ccc;
							}

							.cmp_table_edit_img {
								position: absolute;
								right: -50upx;
								top: 50%;
								transform: translateY(-50%);
								width: 40upx;
								height: 40upx;
							}

							.cmp_table_b_tr_td_other_text {
								vertical-align: middle;
							}
						}

					}
				}
			}




		}
	}
</style>
