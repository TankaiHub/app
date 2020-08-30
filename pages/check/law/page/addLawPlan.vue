<template>
	<view class="app_add_law_plan_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="新增"></uni-nav-bar>
		<view class="a_l_pl_wrap">
			<app-tree ref="tree" :treeState="treeState" :isDisabled="isDisabled"></app-tree>
			<view class="cancel_determine_btn_wrap">
				<button class="cancel_btn half can_det_btn" @click="onCancel" type="default">取消</button>
				<button class="determine_btn half can_det_btn" @click="onDetermine" type="primary">确认</button>
			</view>

 

			<!-- 获取的方案内容 -->
			<view class="a_l_pl_book_wrap" v-if="selectBookData.length > 0">
				<uni-list>
					<uni-list-item :title="`${index+1}、${item.plan}`" :showArrow="false" v-for="(item, index) in selectBookData" :key="index"
					 @click="onDelete(item, index)">
						<view class="a_l_p_bk_list_item_right" slot="right">
							<image src="../../../../static/icon/del.png" mode="aspectFill"></image>
						</view>
					</uni-list-item>
				</uni-list>
				<view class="cancel_determine_btn_wrap a_l_pl_book_btn_wrap">
					<button class="cancel_btn half can_det_btn" @click="onBookCancel" type="default">取消</button>
					<button class="determine_btn half can_det_btn" @click="onBookDetermine" type="primary">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appTree from "@/components/app-input/app-input-tree"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				drawerVisible: false,
				treeState: true,
				useApi: 'planListC', //planListCS
				notPlan: 0,
				bookData: [],
				selectBookData: [],
				isDisabled: false,
				st: '', //undefined -- 在原有的基础上新增   1 ---- 新增
				page: 1,
				pageSize: 10,
				selectkey: '',
				initListIds:'',//原有基础上新增 需先获取已有的
			}
		},
		components: {
			appNav,
			appTree
		},
		computed: {
			...mapState(['admin_law_detail_info', 'admin_law_add_law_plan_arr', 'admin_law_company_detail_info',
				'admin_law_add_law_plan_arr'
			]),
		},
		onLoad(opts) {
			var num = opts.num;
			var s = opts.s;
			this.st = s;
			if (num == 1) {
				this.isDisabled = true;
			} else {
				this.isDisabled = false;
			}
			if (s != undefined) {
				this.notPlan = s;
				this.useApi = 'planListC';
			} else {
				this.useApi = 'planListCS';
			}
			this._initData();
		},
		methods: {
			...mapMutations(['set_admin_law_detail_info', 'set_admin_law_add_law_plan_arr']),
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				var opts = {
					page: this.page,
					page_size: this.pageSize,
					key: this.selectkey,
					task_id: this.admin_law_detail_info.task_id
				}
				this.$http.post('planList', opts).then(res=> {
					if (res.code == 200) {
						var data = res.data;
						var str = '';
						for (var i = 0; i < data.length; i ++) {
							if (i == 0) {
								str = data[i].plan_id;
							}else {
								str += "," + data[i].plan_id;
							}
						}
						this.initListIds = str;
					}
				})
			},
			//取消
			onCancel() {
				this.treeState = false;
				setTimeout(() => {
					this.treeState = true;
					uni.navigateBack();
				}, 1000)

			},
			//确定
			async onDetermine() {
				var treeData = this.$refs.tree.getData();
				this.log(treeData)
				if (treeData.length == 0) {
					uni.showToast({
						title: '请选择方案！',
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: "加载中",
				});
				for (var i = 0; i < treeData.length; i++) {
					if (treeData[i].level == 1) {
						await this.getBook(treeData[i].label, "", "", false);
						this.log("640  ==== 1")
					} else if (treeData[i].level == 2) {
						await this.getBook('', treeData[i].label, "", false);
						this.log("640  ==== 2")
					} else if (treeData[i].level == 3) {
						await this.getBook('', "", treeData[i].label, false);
						this.log("640  ==== 3")
					}
				}
				uni.hideLoading();
			},
			async getBook(c1, c2, c3, isShowLoding) {
				var opts = {
					company_id: this.admin_law_detail_info.company_id,
					category1: c1,
					category2: c2,
					category3: c3,
				};
				await this.$http.post(this.useApi, opts, isShowLoding).then(res => {
					if (res.code == 200) {
						this.bookData = res.data;
						this.selectBookData.push(...this.bookData);
					}
				});

			},
			onDelete(item, index) {
				this.selectBookData.splice(index, 1);
			},



			///////////////////////////确定 book  方案///////////////////////////////
			onBookDetermine() {
				var _self = this;
				if (this.selectBookData.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择方案！'
					});
					return
				}

				if (this.st == 1) {
					let opts = {
						company_id: this.admin_law_detail_info.company_id,
						task_id: this.admin_law_detail_info.task_id,
						plan_ids: this.getIds()
					}
					this.$http.post('addPlan', opts).then(res => {
						if (res.code == 200) {
							_self.onCancel();

							uni.showToast({
								title: '新增成功',
								icon: 'none',
								success() {
									setTimeout(() => {
										_self.selectBookData = [];
										_self.$store.commit('set_admin_law_add_law_plan_arr', {
											label: [],
											bool: false
										});
									}, 1000);
								}
							})
						}
					})
				} else { 
					let opts = {
						info_id: this.admin_law_company_detail_info.info_id,
						plan_ids: this.getIds() + ',' + this.initListIds
					}
					this.$http.post('infoEdit', opts).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '新增成功',
								icon: 'none',
								success() {
									_self.selectBookData = [];
									_self.$store.commit('set_admin_law_add_law_plan_arr', {
										label: [],
										bool: false
									});
									setTimeout(() => {

										_self.onCancel();
									}, 1000);
								}
							})
						}
					})
				}
			},
			getIds() {
				var arr = [];
				for (var i = 0; i < this.selectBookData.length; i++) {
					var temp = this.selectBookData[i].plan_id;
					arr.push(temp);
				}
				return arr.join(",");
			},
			onBookCancel() {
				this.selectBookData = [];
			}
		},
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_add_law_plan_container {
		.a_l_pl_wrap {
			position: relative;
			padding: 20rpx;

			.a_l_pl_book_wrap {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: #fff;
				z-index: 99;

				.a_l_p_bk_list_item_right {
					width: 40rpx;
					height: 40rpx;

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.a_l_pl_book_btn_wrap {
					margin-top: 50rpx;
					margin-bottom: 100rpx;
				}
			}
		}
	}
</style>
