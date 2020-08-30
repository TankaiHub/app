<template>
	<view class="app_resourcePost_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="list" fixed="true" @clickLeft="onNavBarLeft" title="资源共享"></uni-nav-bar>
		<view class="a_r_p_wrap">
			<view class="a_r_p_top_btn_wrap">
				<button class="a_r_p_btn half" @click="onGoNewFile" type="default">新建文件夹</button>
				<button class="a_r_p_btn half" @click="onGoUpFile" type="primary">上传文件</button>
			</view>
			<view class="a_r_p_table_wrap">
				<p class='all_file_text'>
					<span v-if="pageData.length == 1">全部文件</span>
					<span class="page_item" v-else v-for="(item,index) in pageData" :key="index" @click="pageItemClick(item.id,index)">{{item.name}}/</span>
				</p>
				<ul class="list_wrap">
					<li v-for="(item, index) in listData" class="list_item_wrap " :key="index">
						<div class="file_wrap">
							<div class="file_icon item_con">
						 		<image src="../../../static/icon-file.png" class="icon-style" v-if="item.type==1" />
								<image :src="item.url" class="icon-style" v-if="item.type==2" />
								<image src="../../../static/icon-video.png" class="icon-style" v-if="item.type==3" />
								<image src="../../../static/icon-wenjian.png" class="icon-style" v-if="item.type==4" />

							</div>
							<div class="file_name_time_wrap item_con">
								<p>
									<view type="text" @click="fileClick(item)" v-if="item.type!=4">{{item.name}}
									</view>
									<view type="text" @click="fileClick(item)" v-if="item.type==4">
										{{item.name}}{{getFileType(item.url)}}</view>
								</p>
								<p class="time_text">{{changeTime(item.edittime)}}</p>
							</div>
							<!-- -->
							<div class="edit_wrap item_con" v-if="adminUserInfo.type==2">
								<view class="ewi_btn_wrap clearfix">
									<view @click="changeMes(item.file_id)" class="color_red_btb ed_w_i">删除</view>
									<view @click="editShow(item)" class="color_blue_btb mar_left_10px ed_w_i">编辑</view>
									<navigator  :href="item.url" download class="e_w_a_btn ed_w_i" v-if="item.type!=1">
										<view class="color_blue_btb ed_w_i">下载</view>
									</navigator >
								</view>
							</div>
						</div> 
					</li> 
					<li v-if="listData.length == 0" class="not_data">暂无数据</li>
				</ul>
				<!--分页-->
				 
				 <app-pagination :total="total" :page="page" :pageSize="pageSize" @onSelectItem="onSelectItem" @onPrev="onPrev"
				  @onNext="onNext"></app-pagination>
				 
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appPagination from '@/components/app-table/app-pagination'
	
	import { changeTime } from "@/common/js/base.js"

	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				changeTime,
				page: 1,
				pageSize: 10,
				total: 0,
				drawerVisible: false, //导航显示 
				uploadUrl: '',
				listData: [],
				pathData: [],
				selectkey: '',
				topPid: 1,
				showWindow: false,
				showWindowTitle: '',
				fileUrl: '',
				fileType: '',
				formLabelWidth: '80px',
				addVisible: false,
				addData: {},
				addRules: {
					type: {
						required: true,
						message: '必填',
						trigger: 'blur'
					},
					name: {
						required: true,
						message: '必填',
						trigger: 'blur'
					},
					description: {
						required: true,
						message: '必填',
						trigger: 'blur'
					},
					url: {
						required: true,
						message: '请上传',
						trigger: 'blur'
					},
				},
				editVisible: false,
				editData: {},
				editRules: {
					name: {
						required: true,
						message: '必填',
						trigger: 'blur'
					},
					description: {
						required: true,
						message: '必填',
						trigger: 'blur'
					},
				},
				fileList: [],
				pid: 1,
				pageData: [{
					name: "首页",
					id: 1
				}],
				refresh: true,
				showType: 1
			}
		},
		computed: {
			...mapState(['adminUserInfo'])
		},
		components: {
			appNav,
			appPagination
		},
		onShow() {
			this._initData()
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
				var opts = {
					page: this.page,
					pageSize: this.pageSize,
					key: this.selectkey,
					pid: this.pid,
					company_id: this.adminUserInfo.company_id,
				};
				this.getFileList(opts);
			},
			getFileList(opts) {
				this.listData = [];
				this.$http.post('fileListC', opts).then(res => {
					this.listData = res.data.list
					this.pathData = res.data.path
					this.total = res.Total
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
				this.log(this.page, "++++++++++++++++++")
			},
			onNext(page) {
				this.page = page + 1;
				this._initData();
				this.log(this.page, "-------------")
			},
		 
			//////////////list////////////////////
			// 文件单击时
			fileClick(item) {
				this.log(item)
				if (item.type == 1) {
					this.pid = item.file_id
					this._initData();
					this.pageData.push({
						name: item.name,
						id: item.file_id
					})
				} else if (item.type == 2) {
					this.showFile(2, item.url, item.name)
				} else if (item.type == 3) {
					this.showFile(3, item.url, item.name)
				} else {

				}
			},
			//目录单击
			pageItemClick(id, index) {
				this.pageData = this.pageData.splice(0, index + 1)
				this.pid = id
				this._initData();
			},
			//目录返回
			retrunPage() {
				if (this.pageData.length > 1) {
					this.pageData.pop();
					this.pid = this.pageData[this.pageData.length - 1].id;
					this._initData();
				}
			},
			// 显示图片或视频
			showFile(type, url, titel) {
				this.fileType = type
				this.fileUrl = url
				this.showWindowTitle = titel
				this.showWindow = true
			},
			//获取文件类型
			getFileType(url) {
				if (!url) {
					return ''
				}
				let fileName = url.lastIndexOf("."); //取到文件名开始到最后一个点的长度
				let fileNameLength = url.length; //取到文件名长度
				let fileFormat = '.' + url.substring(fileName + 1, fileNameLength); //截
				return fileFormat;
			},
			//获取文件名字
			getFileName(url) {
				if (!url) {
					return ''
				}
				let fileName = url.lastIndexOf("."); //取到文件名开始到最后一个点的长度
				let fileFormat = url.substring(0, fileName); //截
				return fileFormat;
			},
			
			onGoNewFile() {
				uni.navigateTo({
					url:'./systemPage/newCreateFile'
				})
			},
			onGoUpFile() {
				uni.navigateTo({
					url:'./systemPage/upFile'
				})
			},

		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_resourcePost_container * {
		font-size: 14px;
	}

	.app_resourcePost_container {
		.a_r_p_wrap {
			padding: 10px;

			.page_item {
				color: #00a0e9;
			}

			.all_file_text {
				margin: 10px 0 0;
			}

			.a_r_p_top_btn_wrap {
				display: flex;
				justify-content: space-between;

				.a_r_p_btn {
					margin: 0;
					padding: 0 5px;
				}
			}

			.list_wrap {
				padding: 0;

				.list_item_wrap {
					margin: 20px 0;
					.file_wrap {

						.file_icon {
							margin-right: 10px;
							width: 30px;
							height: 25px;

							.icon-style {
								width: 30px;
								height: 30px;
							}
						}

						.file_name_time_wrap {
							width: 50%;

							p {
								padding: 0;
								margin: 0;
								width: 100%;
								line-height: 20px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap; 
								font-size: 14px;

								&.time_text {
									line-height: 15px;
									font-size: 12px;
									color: #999;
								}
							}
						}

						.edit_wrap {
							text-align: right;
							width: 35%;

							.e_w_a_btn {
								margin-left: 10px;
							}
							.ewi_btn_wrap{
								float: right;
								width:110px;
								text-align: right;
								.ed_w_i{
									display: inline-block;
								}
							}
						}

						.item_con {
							display: inline-block;
							vertical-align: middle;
						}
					}
				}
			}

		}
	}
</style>
