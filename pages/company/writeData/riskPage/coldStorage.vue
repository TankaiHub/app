<template>
	<view class="app_cold_storage_container">
		<!-- 冷库 -->
		<view class="cold_storage_wrap">
			<uni-list>
				<uni-list-item title="冷库" :showArrow="false" class="list_border_1px">
					<view class="" slot="right">
						<app-picker-select placeholder="请选择是否有冷库" :selectValue="coldData.lkSelct" :selectData="lkSelctArray" :isBorder="false"
						 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('lkSelct')" @onSelectBtn="onSelectBtn($event, 'lkSelct')"></app-picker-select>
					</view>
				</uni-list-item>
				<uni-list-item title="制冷剂" :showArrow="false" class="list_border_1px">
					<view class="" slot='right'>
						<app-picker-select placeholder="请选择制冷剂" :selectValue="coldData.zljSelect" :selectData="zljSelectArray" :isBorder="false"
						 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('zljSelect')" @onSelectBtn="onSelectBtn($event, 'zljSelect')"></app-picker-select>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				coldData: {
					lkSelct: '',
					zljSelect: ''
				},
				lkSelctArray: [{
					label: "有",
					value: "1",
					show: true,
				}, {
					label: "无",
					value: "2",
					show: true,
				}],
				zljSelectArray: [{
					label: "液氨",
					value: "1",
					show: true,
				}, {
					label: "氟利昂R12",
					value: "2",
					show: true,
				}, {
					label: "氟利昂R22有",
					value: "3",
					show: true,
				}, {
					label: "二氧化碳",
					value: "4",
					show: true,
				}, {
					label: "其他",
					value: "5",
					show: true,
				}],
			}
		},
		components: {
			appPickerSelect
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			///selsec
			onSelectBtn(e, key) {
				this['coldData'][key] = e.value;
			},
			onSelectClear(key) {
				this['coldData'][key] = '';
			},
			getData() { 
				var opts = {
					company_id:  this.userInfo.company_id,
					content: JSON.stringify(this.coldData),
					state: 1,
					type: 6
				}
				return opts;
			},
			submit() {
				if (!this._changeData()) {
					return;
				}
				var opts = this.getData();
				this.$http.post("riskSave", opts).then(res=> {
					if (res.code == 200) {
						this.log(res);
						this.$emit("changeNext", true);
					}
				});
			},
			toast(title) {
				uni.showToast({
					title,
					icon:'none',
				})
			},
			_changeData() { 
				if (this.coldData.lkSelct == "") {
					this.toast("请选择是否有冷库");
					return false;
				}
				if (this.coldData.zljSelect == "") {
					this.toast("请选择制冷剂");
					return false
				} 
				return true;
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
