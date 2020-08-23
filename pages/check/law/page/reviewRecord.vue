<template>
	<view class="app_review_record_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="复查记录"></uni-nav-bar>
		<view class="r_rec_wrap"> 
			<app-table :headerData="headerData" :bodyData="tableData" :tablePorps="tableProps" :isShowOper="isShowOper">
				<template slot="handle" slot-scope="props">
					<text> {{lawState[(props.data.type || 0)]}} </text>
				</template>
			</app-table>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appTable from "@/components/app-table/app-table-not-expand"
	export default {
		data() {
			return{
				drawerVisible:false,
				tableData:[],
				headerData: [{
					text: "内容",
					width: 100,
					center: false,
				}, {
					text: "状态",
					width: 100,
					center: true
				}],
				tableProps:[{
					isContent:true,
					style:{},
					props:"content"
				}],
				isShowOper: false,
				lawState:['', '不需要整改', '整改中', '整改完成'],
			}
		},
		components: {
			appNav,
			appTable
		},
		onLoad(opts) {
			var task_id = opts.task_id;
			this._initData(task_id);
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData(task_id) {
				var opts = {
					task_id
				}
				this.$http.post('taskInfoZ', opts).then(res => {
					if (res.code == 200) {
						this.tableData = res.data.content_list;
					}
				})
			}
		},
	}
</script>

<style lang="less">
	.app_review_record_container{
		.r_rec_wrap{
			padding:20rpx;
		}
	}
</style>
