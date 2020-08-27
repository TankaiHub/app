<template>
	<view class="app_edit_com_info">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="编辑"></uni-nav-bar>
		<view class="ed_c_in_wrap">
			<uni-list>
				<uni-list-item title="被检查单位" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right border" type="text" placeholder="请输入被检查单位" v-model="admin_law_company_detail_info.company_name" />
					</view>
				</uni-list-item> 
				<uni-list-item title="检查场所" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="text" placeholder="请输入检查场所" v-model="admin_law_company_detail_info.inspection_site" />
					</view>
				</uni-list-item>
				<uni-list-item title="法定代表人" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="text" placeholder="请输入法定代表人" v-model="admin_law_company_detail_info.cegal_person" />
					</view>
				</uni-list-item>
				<uni-list-item title="检查时间" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" @click="onclcik" type="text" disabled placeholder="请输入检查时间" v-model="timeStr" />
						<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange'></date-time-picker>
					</view>
				</uni-list-item>
				<uni-list-item title="单位地址" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="text" placeholder="请输入单位地址" v-model="admin_law_company_detail_info.reg_address" />
					</view>
				</uni-list-item>
				<uni-list-item title="邮政编码" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="number" placeholder="请输入邮政编码" v-model="admin_law_company_detail_info.postal_code" />
					</view>
				</uni-list-item>
				<uni-list-item title="职务" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="text" placeholder="请输入职务" v-model="admin_law_company_detail_info.position" />
					</view>
				</uni-list-item>
				<uni-list-item title="所属行业" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="text" placeholder="请输入所属行业" v-model="admin_law_company_detail_info.industry" />
					</view>
				</uni-list-item>
				<uni-list-item title="联系人" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="text" placeholder="请输入联系人" v-model="admin_law_company_detail_info.c_name" />
					</view>
				</uni-list-item>
				<uni-list-item title="联系电话" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" type="number" placeholder="请输入联系电话" v-model="admin_law_company_detail_info.phone" />
					</view>
				</uni-list-item>
			</uni-list>
			<view class="cancel_determine_btn_wrap">
				<button class="cancel_btn half can_det_btn" @click="onCancel" type="default">取消</button>
				<button class="determine_btn half can_det_btn" @click="onDetermine" type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker'
	import { DivideAthousandTime, changeTime } from '@/common/js/base.js'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				drawerVisible: false,
				dateString: '',
				type: 'date',
				timeStr:''
			}
		},
		computed: {
			...mapState(['admin_law_company_detail_info']),
			indicatorStyle() {
				return {
					background: 'rgba(204, 204, 204, .5)',
					height: '40px',
				};
			}
		},
		components: {
			appNav,
			DateTimePicker
		},
		created() {
			try{
				var time = this.admin_law_company_detail_info.inspection_time ;
				this.timeStr = changeTime(time, 'yy/mm/dd');
			}catch(e){
				//TODO handle the exception
				this.timeStr = "";
			}
			
			// this.timeStr = 
		},
		methods: {
			...mapMutations(['set_admin_law_company_detail_info']),
			onNavBarLeft() {
				uni.navigateBack();
			},
			onCancel() {
				uni.navigateBack();
			},
			onDetermine() {
				var opts = {
					...this.admin_law_company_detail_info
				};
				var _self = this;
				
				try{
					// 
					var time = new Date(this.timeStr).getTime(); ////待转换	
					var time_num = DivideAthousandTime(time);
					opts.inspection_time = time_num;
				}catch(e){
					opts.inspection_time = "";
				}
				this.$http.post('infoEdit', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title:"修改成功",
							icon:"success",
							success() {
								setTimeout(()=>{
									_self.onCancel();
								}, 1000)
							}
						})
					}
				})
			},
			onclcik() {
				this.$refs['date-time'].show();
			},
			dateTimeChange(e) {
				var reg = /\-/g; 
				this.timeStr = e.replace(reg, "/");
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_edit_com_info {
		.ed_c_in_wrap {
			padding: 20rpx;
		}
	}
</style>
