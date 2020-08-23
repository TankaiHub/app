<template>
	<view class="app_add_law_content_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="添加"></uni-nav-bar>
		<view class="a_l_con_wrap">
			<view class="a_l_con_title">检查内容</view>
			<view class="a_l_con_text_wrap">
				<textarea class="a_l_con_text_area" v-model="content" placeholder="请输入内容" />
				</view>
			<view class="a_l_con_switch_wrap clearfix">
				<view @click="onSwitch(true, 1)" class="a_l_com_sw_fh a_l_com_sw_btn" :class="{ isActive:isActive }">符合</view>
				<view @click="onSwitch(false, 2)" class="a_l_com_sw_bfh a_l_com_sw_btn" :class="{ isActive:!isActive }">不符合</view>
			</view>
			<view class="a_l_con_select_wrap" v-if="!isActive">
				<view class="a_l_con_title">处理措施</view>
				<app-picker-select placeholder="请选择处理方式" :selectValue="type" :selectData="typeSelectData"
				 @onSelectClear="onSelectClear('type')" @onSelectBtn="onSelectBtn($event, 'type')"></app-picker-select>
			</view>
			<view class="a_l_con_btn_wrap"> 
					<button class="a_l_con_btn half" @click="onCancel" type="default">取消</button>
					<button class="a_l_con_btn half" @click="onDetermine" type="primary">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appNav from "@/components/app-nav/app-nav"
	import appPickerSelect from '@/components/app-picker/app-picker-select'

	export default {
		data() {
			return {
				drawerVisible:false,
				taskId:'',
				content:'',
				conform:2,
				isActive:false,
				type:'',
				typeSelectData:[{
						label: "立即整改",
						value: "1",
						show:true,
					},{
						label: "责令限期整改",
						value: "2",
						show:true,
					}],
				
			}
		},
		components: {
			appNav,
			appPickerSelect
		},
		onLoad(opts) {
			this.taskId = opts.task_id;
		},
		methods:{
			onNavBarLeft() {
				uni.navigateBack()
			}, 
			
			/////////////////////select////////////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this[key] = e.value; 
				}
			},
			onSelectClear(str) {
				this[str] = ""; 
			},
			////////////////onSwitch//////////////
			onSwitch(bool, num) {
				this.isActive = bool;
				this.conform = num;
			},
			onCancel() {
				uni.navigateBack();
			},
			onDetermine() {
				if (this.content == '') {
					uni.showToast({
						title:"请输入内容",
						icon:'none'
					});
					return;
				} 
				if (this.conform == '') {
					uni.showToast({
						title:"请选择是否符合",
						icon:'none'
					});
					return;
				} 
				if (this.type == '') {
					uni.showToast({
						title:"请选择处理措施",
						icon:'none'
					});
					return;
				} 
				var opts = {
					task_id:this.taskId,
					content:this.content,
					conform:this.conform,
					type:this.type
				};
				var _self = this;
			   this.$http.post('cSubmit', opts).then(res=> {
					if (res.code == 200) {
						uni.showToast({
							title:"添加成功",
							icon:"success",
							success() {
								setTimeout(()=> {
									_self.onCancel();
								}, 2000);
							}
						})
					} 
			   })
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.app_add_law_content_container{
		.a_l_con_wrap{
			padding:10px;
			.a_l_con_text_wrap{
				height: 220upx;
				border:1px solid #ccc;
				box-sizing: border-box;
				border-radius: 10upx;
				.a_l_con_text_area{
					margin:0 auto;
					width:98%;
					height: 220upx;
				}
			}
			.a_l_con_switch_wrap{
				margin:20upx 0;
				width:300upx;
				border:1px solid #ccc;
				border-radius: 10upx;
				overflow: hidden;
				.a_l_com_sw_btn{
					padding:15upx 0;
					width:150upx;
					font-size: 28upx;
					text-align: center;
					&.a_l_com_sw_fh{
						float: left;
					}
					&.a_l_com_sw_bfh{
						float: right;
					}
					&.isActive{
						background-color: rgb(64, 158, 255);
						color:#fff;
					}
				}
			}
			.a_l_con_select_wrap{
				width:400upx;
			}
			
			.a_l_con_btn_wrap {
				margin: 100px auto 0;
				display: flex;
				justify-content: space-between;
				width: 200px;
			
				.a_l_con_btn {
					margin: 0;
					padding: 0 5px;
				}
			}
			.a_l_con_title{
				margin:20upx 0;
				color: rgb(64, 158, 255);
				font-size: 32upx;
				font-weight: 700;
			}
		}
	}
</style>
