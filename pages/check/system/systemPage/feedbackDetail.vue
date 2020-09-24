<template>
	<view class="app_feedback_detail_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="企业反馈-详情"></uni-nav-bar>
		<view class="feedback_detail_wrap app_table_wrap">
			<app-table-new :tableData="allData" :isShowExpand="true" :headerArray='headerArray' :showContent="showContent"
			 :isShowIndex="true" @onContent="onContent">
				<block class="" slot="content" slot-scope="props">
					<view class="table_hide_total_container" v-if="props.data">
						<view class="a_t_ul table_hide_info_wrap">
							<view class="a_t_li border_1px" @click="onItem(props.data, 'wcl')">
								<label>未处理</label> 
								<view class="info_bd">{{props.data.wcl || 0}}</view>
							</view>
							<view class="a_t_li border_1px"  @click="onItem( props.data, 'ycl')">
								<label>已处理</label>
								<view class="info_bd">{{ props.data.ycl || 0}}</view>
							</view>
							<view class="a_t_li border_1px" @click="onItem(props.data, 'ysb')">
								<label>已上报</label>
								<view class="info_bd">{{props.data.ysb || 0}}</view>
							</view>
							<view class="a_t_li border_1px"  @click="onItem( props.data, 'count')">
								<label>反馈数量</label>
								<view class="info_bd">{{props.data.count || 0}}</view>
							</view>
						</view>
					</view>
				</block>
			</app-table-new>
		</view> 
	</view>
</template>

<script>
	import appTableNew from "@/components/app-table/app-table-new"
	import {
		getAddress
	} from '@/common/js/base.js'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				page: 1,
				pageSize: 10,
				allData: [],
				headerArray: [{
						key: '序号',
						width: 40,
						isInWidth: false,
					},
					{
						key: '区域',
						isInWidth: true,
						width: 0
					}
				],
				showContent: [{
					key: 'address',
					isInWidth: true,
					width: 0,
					isClickContent: true
				}],
				admin_state:'',
			}
		},
		computed: {
			...mapState(['admin_feedbackDetail']),
		},
		components: {
			appTableNew
		},
		onLoad() {
			this._initData();
		},
		methods: { 
			...mapMutations(['set_admin_feedbackDetail']),
			_initData() {
				var opts = {
					page: this.page,
					pageSize: this.pageSize
				}
				this.$http.post('statistics', opts).then(res => {
					if (res.code == 200) {
						this.allData = res.data.region;
					}
				})
			},
			onNavBarLeft() {
				uni.navigateBack();
			},
			onContent(opts) {
				var arr = this._changeAddr(opts.number, opts.address);
				var obj = {
					arr, 
					curNum:opts.number,
					state:'',
					in:true
				}
				this.$store.commit('set_admin_feedbackDetail', obj);
				this.onNavBarLeft();
			},
			onItem(opts, str) {
				var arr = this._changeAddr(opts.number, opts.address); 
				var state = '';
				switch(str) {
					case 'wcl':
						state = 2;
					break;
					case 'ycl':
						state = 1;
					break;
					case 'ysb':
						state = 3;
					break;
					case 'count':
						state = '';
					break;
				}
				var obj = {
					arr, 
					curNum:opts.number,
					state,
					in:true
				}
				this.$store.commit('set_admin_feedbackDetail', obj);
				this.onNavBarLeft();
				
			},
			_changeAddr(num, addstr) {
				var addrObj = getAddress(num);
				if (!addrObj) return {};
				var parent = addrObj.parentArr;
				var addrNum = [];
				var str = [];
				if (parent.length > 0) {
					for (var i = 0; i < parent.length; i++) {
						addrNum.push(parent[i]['number']);
						if (i == 0) {
							str = parent[i]['address'];
						}else {
							str += ' ' + parent[i]['address'];
						}
					}
				}
				addrNum.push(addrObj.number);
				str += " " + addstr;
				return {
					addrNum,
					curLevel:addrObj.level,
					str
				};
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_table_wrap {
		.table_hide_total_container {
 
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
