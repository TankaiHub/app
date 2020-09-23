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
						<input class="text_align_right" @click="onclcik('date-time')" type="text" disabled placeholder="请选择检查时间" v-model="timeStr" />
						<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange($event, "timeStr")'></date-time-picker>
					</view>
				</uni-list-item>
				<uni-list-item title="结束时间" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" @click="onclcik('date-time-end')" type="text" disabled placeholder="请选择结束时间" v-model="timeEndStr" />
						<date-time-picker ref='date-time-end' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange($event, "timeEndStr")'></date-time-picker>
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
				<uni-list-item title="限期时间" :showArrow="false">
					<view class="" slot="right">
						<input class="text_align_right" @click="onclcik('date-time-limited')" type="text" disabled placeholder="请选择限期时间" v-model="timeLimitedStr" />
						<date-time-picker ref='date-time-limited' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange($event, "timeLimitedStr")'></date-time-picker>
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
				timeStr:'',
				timeEndStr:'',
				timeLimitedStr:''
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
				var endTime = this.admin_law_company_detail_info.inspection_time_stop ;
				var limTime = this.admin_law_company_detail_info.deadline ;
				this.timeStr = changeTime(time, 'yy/mm/dd');
				this.timeEndStr = changeTime(endTime, 'yy/mm/dd');
				this.timeLimitedStr = changeTime(limTime, 'yy/mm/dd');
			}catch(e){
				//TODO handle the exception
				this.timeStr = "";
				this.timeEndStr = "";
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
				if (this.timeStr == "无" || this.timeStr == undefined || this.timeStr == null) {
					uni.showToast({
						title:"开始时间不能为空",
						icon:'none'
					})
					return;
				}
				if (this.timeEndStr == "无" || this.timeEndStr == undefined || this.timeEndStr == null) {
					uni.showToast({
						title:"结束时间不能为空",
						icon:'none'
					})
					return;
				}
				if (this.timeLimitedStr == "无" || this.timeLimitedStr == undefined || this.timeLimitedStr == null) {
					uni.showToast({
						title:"结束时间不能为空",
						icon:'none'
					})
					return;
				}
				try{
					// 
					var time = new Date(this.timeStr).getTime(); ////待转换	
					var timeEnd = new Date(this.timeEndStr).getTime();
					var timeLim = new Date(this.timeLimitedStr).getTime();
					var time_num = DivideAthousandTime(time);
					var time_num_end = DivideAthousandTime(timeEnd); 
					var time_num_lim = DivideAthousandTime(timeLim); 
					opts.inspection_time = time_num;
					opts.inspection_time_stop = time_num_end;
					opts.deadline = time_num_lim;
					
					if (time > timeEnd) {
						uni.showToast({
							title:"结束时间不能小于开始时间",
							icon:'none'
						})
						return;
					}
				}catch(e){
					opts.inspection_time = "";
					opts.inspection_time_stop = "";
					opts.deadline = "";
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
			onclcik(str) {
				this.$refs[str].show();
			},
			dateTimeChange(e, key) {
				var reg = /\-/g; 
				this[key] = e.replace(reg, "/");
			}, 
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
