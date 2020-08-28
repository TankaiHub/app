<template>
	<view class="app_gas_and_liquid_solid_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="信息填写"></uni-nav-bar>
		<scroll-view scroll-y="true" :style="{ height:screenHeight * 2 + 'upx'}"> 
			<view class="gas_and_liquid_solid_wrap">
				<uni-list>
					<uni-list-item title="液氨用途" :showArrow="false" v-if="isShowLiquidAmmonia">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="purposeArray" :selectValue="gasLSData.purpose" placeholder="请选择液氨用途" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('purpose')" @onSelectBtn="onSelectBtn($event, 'purpose')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="存储方式" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="saveArray" :selectValue="gasLSData.save" placeholder="请选择存储方式" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('save')" @onSelectBtn="onSelectBtn($event, 'save')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="数量" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<input type="number" placeholder="请输入数量" placeholder-style="color:#ccc" class="text_align_right" v-model="gasLSData.maxNum" />
						</view>
					</uni-list-item>
					<uni-list-item :title="gasLSData.save==1?'单瓶容积':gasLSData.save==2?'单罐容积':'单箱容积'" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<input type="number" placeholder="请输入容积" placeholder-style="color:#ccc" class="text_align_right" v-model="gasLSData.sinNum" />
						</view>
					</uni-list-item>
					<uni-list-item title="单位" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="sinUnitArray" :selectValue="gasLSData.sinUnit" placeholder="请选择单位" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('sinUnit')" @onSelectBtn="onSelectBtn($event, 'sinUnit')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="是否有专用库房存放" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="specialArray" :selectValue="gasLSData.special" placeholder="请选择是否有专用库房"
							 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('special')"
							 @onSelectBtn="onSelectBtn($event, 'special')"></app-picker-select>
						</view>
					</uni-list-item>
					<uni-list-item title="库房数量" :showArrow="false"  v-if="gasLSData.special==1">
						<view class="n_ent_list_down_wrap" slot="right">
							<input type="number" placeholder="库房数量" placeholder-style="color:#ccc" class="text_align_right" v-model="gasLSData.specialNum" />
						</view>
					</uni-list-item>
					<uni-list-item title="物品来源" :showArrow="false" class="list_border_1px">
						<view class="n_ent_list_down_wrap" slot="right">
							<app-picker-select :selectData="sourceArray" :selectValue="gasLSData.source" placeholder="请选择物品来源" :isBorder="false"
							 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('source')" @onSelectBtn="onSelectBtn($event, 'source')"></app-picker-select>
						</view>
					</uni-list-item> 
					<block  v-for="(item,index) in companyData" v-if="gasLSData.source==1">
						<uni-list-item :showArrow="false" >
							<view class="">
								 购买公司
								 <image src="../../../../static/icon/del.png" v-if="item.del" mode="aspectFill" class="img_size_40px vertical_align_center mar_left_5px" @click="onDelCompany"></image>
							</view>
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="text" placeholder="请输入购买公司" placeholder-style="color:#ccc" class="text_align_right" v-model="item.buyCompany" />
								
							</view>
						</uni-list-item>
						<uni-list-item title="社信代码" :showArrow="false">
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="text" placeholder="请输入社信代码" placeholder-style="color:#ccc" class="text_align_right" v-model="item.code" />
							</view>
						</uni-list-item>
						<uni-list-item title="姓名" :showArrow="false">
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="text" placeholder="请输入姓名" placeholder-style="color:#ccc" class="text_align_right" v-model="item.name" />
							</view>
						</uni-list-item>
						<uni-list-item title="联系人电话" :showArrow="false" class="list_border_1px">
							<view class="n_ent_list_down_wrap" slot="right">
								<input type="number" placeholder="请输入联系人电话" placeholder-style="color:#ccc" class="text_align_right" v-model="item.phone" />
							</view>
						</uni-list-item>
					</block>
					<app-btn-add v-if="gasLSData.source==1" text="增加'另一家购买公司'" class="mar_left_10px" @onBtn="onAddBtn"></app-btn-add> 
				</uni-list>
				<view class="mar_top_20px mar_bottom_20px dis_flex_center">
					<button type="default" @click="onSubmit(false)">取消</button>
					<button type="primary" @click="onSubmit(true)">确定</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import appBtnAdd from "@/components/app-btn/app-btn-add"
	export default {
		props:{
			data:Object
		}, 
		data() {
			return {
				screenHeight:600,
				drawerVisible: false,
				gasLSData: {
					purpose: '', //液氨用途
					save: '', //存储方式
					maxNum: '', //数量
					sinNum: '', //容积
					sinUnit: '', //单位
					special: '', //是否有专用库房存放
					specialNum: '', //库房数量
					source: '', //物品来源
				},
				purposeArray: [{
					label: "制冷",
					value: "1",
					show:true,
				}, {
					label: "其他",
					value: "2",
					show:true,
				}],
				saveArray: [{
					label: "瓶",
					value: "1",
					show:true,
				}, {
					label: "罐",
					value: "2",
					show:true,
				}, {
					label: "箱",
					value: "3",
					show:true,
				}],
				sinUnitArray: [{
					label: "m³",
					value: "1",
					show:true,
				}, {
					label: "㎏",
					value: "2",
					show:true,
				}, {
					label: "L",
					value: "3",
					show:true,
				}],
				specialArray: [{
					label: "有",
					value: "1",
					show:true,
				}, {
					label: "无",
					value: "2",
					show:true,
				}],
				sourceArray: [{
					label: "购买",
					value: "1",
					show:true,
				}, {
					label: "自主生产",
					value: "2",
					show:true,
				}],
				companyData: [{
					buyCompany: '',
					code: '',
					name: '',
					phone: '',
				}],
			}
		},
		components:{
			appPickerSelect,
			appBtnAdd
		},
		computed:{
			isShowLiquidAmmonia() {//是否显示液氨
				console.log(this.data.name, "是否显示液氨");
				if (this.data.name == '液氨') {
					return true;
				}else {
					return false;
				}
			},
		},
		created() {
			 this.screenHeight = uni.getSystemInfoSync().screenHeight - 50;
		},
		methods: {
			onNavBarLeft(bool) {
				this.$emit("onNavBarLeft", bool);
			},
			onSelectBtn(e, key) {
				if (e.flag) {
					this['gasLSData'][key] = e.value;
				}
			},
			onSelectClear(key) {
				this['gasLSData'][key] = '';
			},
			//删除购买企业
			onDelCompany(index) {
				this.companyData.splice(index, 1);
			},
			/**
			 * @param {Object} bool true-确定 false-取消
			 */
			onSubmit(bool) {
				//校验数据
				this.onNavBarLeft(bool);
				if (this.gasLSData['source'] == 1) {
					this.gasLSData['companyData'] = this.companyData;
				}
				if (bool) {
					this.$emit("change", this.gasLSData);
				}
			},
			//添加购买企业
			onAddBtn() {
				this.companyData.push({
					buyCompany: '',
					code: '',
					name: '',
					phone: '',
					del:true,
				});
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.app_gas_and_liquid_solid_container {}
</style>
