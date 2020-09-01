<template>
	<view class="app_common_table_container">
		<view class="common_table_wrap">
			<view class="base_info">
				<app-title text="基本信息"></app-title>
				<table cellspacing="0" class="border_1px_all_409eff">
					<tr v-for="(item, index) in baseData" :key='index'>
						<block v-for="(ele, indx) in item" :key='indx'>
							<td class="border_1px_all_409eff padding_5px border_right_none border_bottom_none" :class="{ border_left_none:indx == 0, border_top_none:index == 0 }">
								{{ele.key}}
							</td>
							<td :colspan="ele.col" class="border_1px_all_409eff padding_8px border_right_none border_bottom_none" :class="{ border_top_none:index == 0 }">
								{{ele.value}}
							</td>
						</block>

					</tr>
				</table>
			</view>
			<view class="safety_info mar_bottom_10px mar_top_10px">
				<app-title text="安全信息"></app-title>
				<table cellspacing="0" class="border_1px_all_409eff">
					<tr v-for="(item, index) in safetyData" :key='index'>
						<block v-for="(ele, indx) in item" :key='indx'>
							<td class="border_1px_all_409eff padding_5px border_right_none border_bottom_none" :class="{ border_left_none:indx == 0, border_top_none:index == 0 }">
								{{ele.key}}
							</td>
							<td :colspan="ele.col" class="border_1px_all_409eff padding_8px border_right_none border_bottom_none" :class="{ border_top_none:index == 0 }">
								{{ele.value}}
							</td>
						</block>
					
					</tr>
				</table>
			</view>
			<view class="risk_info">
				<app-title text="风险信息"></app-title>
				<table cellspacing="0" class="border_1px_all_409eff"></table>
			</view>
		</view>
	</view>
</template>

<script>
	import appTitle from "@/components/app-title/app-title"
	import cell from "./cell.js"
	import {
		produceTo
	} from "@/common/js/change.js"
	export default {
		props: {
			baseAndSafetyInfoData: {
				type: Object,
				default: () => {
					return {};
				}
			},
			riskInfoData: {
				type: [Array, Object],
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				baseData: [],
				safetyData:[]
			}
		},
		components: {
			appTitle,
			cell
		},
		watch: {
			// 
			baseAndSafetyInfoData(nv) {
				this.baseData = this._getBaseInfo(nv);
				this.safetyData = this._changeSafetyInfo(nv);
			},
		},
		computed: {
			s_width() {
				return uni.getSystemInfoSync().windowWidth - 20 || 320;
			}
		},
		created() {


		},
		methods: {
			_getBaseInfo(nv) {
				var base = nv;
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var arr = [
					[this._changeTabelValue("企业名称", base['name'], half, keyW), this._changeTabelValue("社信代码", base['credit_code'],
						half, keyW)],
					[this._changeTabelValue("法人代表", base['cegal_person'], half, keyW), this._changeTabelValue("法人联系电话", base['phone'],
						half, keyW)],
					[this._changeTabelValue("注册地址", base['produce_address'], contentW, keyW, 3)],
					[this._changeTabelValue("生产经营地址", base['reg_address'], contentW, keyW, 3)],
					[this._changeTabelValue("从业人员", base['number_of_employees'], half, keyW), this._changeTabelValue("生产经营状态",
						produceTo(base.produce_state, base.produce_stop_reason), half, keyW)],
					[this._changeTabelValue("安全管理负责人", base['sp_principal'], half, keyW), this._changeTabelValue("安全管理负责人电话", base[
						'sp_principal_phone'], half, keyW)],
					[this._changeTabelValue("安全员", this._changeSecurity_officer(base['security_officer']), half, keyW), this._changeTabelValue(
						"上年产值", base['lastyear_value'] + '万', half, keyW)],
					[this._changeTabelValue("行业类别", base['industry_category'], half, keyW), this._changeTabelValue("主要工序", base[
						'main_process'], half, keyW)],
					[this._changeTabelValue("主营产品", this._changeMain_products(base['main_products']), contentW, keyW, 3)]
				];
				return arr;
			},
			_changeSafetyInfo(nv) {
				var base = nv;
				var w = this.s_width;
				var contentW = this.s_width - 20 - 4 - 70;
				var half = contentW / 2 - 70;
				var keyW = 70;
				var arr = [
					[this._changeTabelValue("厂房性质", base['name'], half, keyW), this._changeTabelValue("主要能源", base['credit_code'],
						half, keyW)],
					[this._changeTabelValue("是否通过消防验收", base['cegal_person'], half, keyW), this._changeTabelValue("是否配备消火栓", base['phone'],
						half, keyW)], 
					[this._changeTabelValue("投保情况", base['number_of_employees'], half, keyW), this._changeTabelValue("房屋产权证",
						produceTo(base.produce_state, base.produce_stop_reason), half, keyW)],
					[this._changeTabelValue("职业卫生三同时", base['sp_principal'], half, keyW), this._changeTabelValue("职业卫生现状评价", base[
						'sp_principal_phone'], half, keyW)],
					[this._changeTabelValue("安全三同时", this._changeSecurity_officer(base['security_officer']), half, keyW), this._changeTabelValue(
						"安全现状评价", base['lastyear_value'] + '万', half, keyW)],
					[this._changeTabelValue("安全生产标准化情况", base['industry_category'], half, keyW), this._changeTabelValue("应急预案", base[
						'main_process'], half, keyW)], 
				];
				return arr;
			},
			//主营产品
			_changeMain_products(str) {
				if (str == undefined || str == null || str == '' || str == ',') return "";
				var arr = str.split(",");
				var result = '';
				for (var i = 0; i < arr.length; i++) {
					var temp = arr[i].split('-');
					if (i == 0) {
						result = temp[1];
					} else {
						result += ", " + temp[1];
					}
				}
				return result;
			},
			//安全员
			_changeSecurity_officer(str) {
				if (str == undefined || str == null || str == '' || str == ',') return "";
				var arr = str.split(",");
				return `专职${arr[0]}名;兼职${arr[1]}名`;

			},
			//
			_changeTabelValue(key, value, w, keyW, col) {
				if (value == null || value == undefined) {
					value = null;
				}
				return {
					key,
					value,
					w,
					keyW,
					col
				}
			}
		}

	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.c_table {
		display: table;

		.c_table_body {
			display: table-row-group;
		}
	}
</style>
