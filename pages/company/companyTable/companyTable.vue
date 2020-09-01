<template>
	<view class="app_company_table_contaier">
		
		<!-- 企业 info -->
		<!-- <app-nav v-model="drawerVisible" currentNav="company"></app-nav> -->
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="风险信息"></uni-nav-bar>
		<view class="company_table_wrap padding_10px">
			<common-table :baseAndSafetyInfoData="baseAndSafetyInfoData" :riskInfoData="riskInfoData"></common-table>
		</view>
	</view>
</template>

<script>
	import commonTable from "../../common-table/common-table.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default{
		data() {
			return {
				baseAndSafetyInfoData:{},
				riskInfoData:{},
			};
		},
		components:{
			commonTable
		},
		computed: {
			...mapState(['userInfo']),
		},
		onLoad() {
			this._initData();
		},
		methods:{
			onNavBarLeft() {
				
			},
			_initData() {
				var opts = {
					company_id:this.userInfo.company_id || 2282
				};
				this._getInfo(opts);
				this._getRiskInfo(opts);
			},
			_getInfo(opts){
				this.$http.post('info', opts).then(res=> {
					if (res.code == 200) {
						this.baseAndSafetyInfoData = res.data;
					}
				});
			},
			_getRiskInfo(opts) { 
				this.$http.post('riskInfo', opts).then(res=> {
					if (res.code == 200) {
						this.riskInfoData = res.data
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
