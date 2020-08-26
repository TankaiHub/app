<template>
	<view class="app_edit_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="编辑"></uni-nav-bar>
		<view class="edit_wrapper padding_10px">
			<uni-list class="n_ent_list_wrap">
				<uni-list-item title="生产经营状态：" :showArrow="false">
					<view class="" slot="right">
						<app-picker-select :isBorder="false" textAlign="right" placeholder="请选择生产经营状态" :selectValue="inptDataInfo.produce_state"
						 :selectData="produceStateData" @onSelectClear="onSelectClear('produce_state')" @onSelectBtn="onSelectBtn($event, 'produce_state')"></app-picker-select>
					</view>
				</uni-list-item>
				<uni-list-item title="停产停业原因：" :showArrow="false" v-if="isShowProduceStopReason">
					<view class="" slot="right">
						<input type="text" class="n_ent_list_input" v-model="inptDataInfo.produce_stop_reason" placeholder="请输入停产停业原因" />
					</view>
				</uni-list-item>
				<uni-list-item title="注册地址：" :showArrow="false">
					<view class="" slot="right">
						<view class="n_ebt_input clearfix">
							<input class="n_ent_list_input b_ent_addr_inp" v-model="inptDataInfo.regAddressStr" @click="onShowSelectAddress"
							 type="text" name="comRegAddr" placeholder="请选择注册地址" disabled />
							<text class="n_ent_close" @click="onClearInputContent">X</text>
						</view>
						<lb-picker v-model="mSleVal" mode='multiSelector' :level="4" :props="selectPrors" :list='list' ref="lb" @confirm="onSelectAddress"></lb-picker>
					</view>
				</uni-list-item>
				<uni-list-item title="详细地址：" :showArrow="false">
					<view class="" slot="right">
						<input type="text" class="n_ent_list_input" v-model="inptDataInfo.reg_detail_address" placeholder="请输入详细地址" />
					</view>
				</uni-list-item>
				<uni-list-item title="生产经营地址：" :showArrow="false">
					<view class="" slot="right">
						<app-picker-select :isBorder="false" textAlign="right" placeholder="请选择生产经营地址" :selectValue="inptDataInfo.address_same"
						 :selectData="addressSameData" @onSelectClear="onSelectClear('address_same')" @onSelectBtn="onSelectBtn($event, 'address_same')"></app-picker-select>
					</view>
				</uni-list-item>
				<uni-list-item :showArrow="false" v-if="isShowAddressSame">
					<view class="" slot="right">
						<view class="n_ebt_input clearfix">
							<input class="n_ent_list_input b_ent_addr_inp" v-model="inptDataInfo.openAddressStr" @click="onShowSelectOpenAddress"
							 type="text" name="comAddr" placeholder="请选择经营地址" disabled />
							<text class="n_ent_close" @click="onClearOpenInputContent">X</text>
						</view>
						<lb-picker mode='multiSelector' :level="4" :props="selectPrors" :list='list' ref="op_lb" @confirm="onSelectOpenAddress"></lb-picker>
					</view>
				</uni-list-item>
				<uni-list-item title="详细地址：" :showArrow="false" v-if="isShowAddressSame">
					<view class="" slot="right">
						<input type="text" class="n_ent_list_input" v-model="inptDataInfo.open_detail_address" placeholder="请输入详细地址" />
					</view>
				</uni-list-item>



			</uni-list>
			<view class="a_r_p_w_btn_wrap mar_top_20px">
				<button class="half" type="default" @click="onCancel">取消</button>
				<button class="half" type="primary" @click="onSubmit">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import LbPicker from '@/components/lb-picker'

	import {
		mapState,
		mapMutations
	} from "vuex"

	import {
		resolveAddress
	} from "@/common/js/change.js"
	import address from '@/common/js/address'

	export default {
		data() {
			return {
				produceStateData: [{
					label: '正常经营',
					value: '1',
					show: true,
				}, {
					label: '停产停业',
					value: '2',
					show: true,
				}, {
					label: '关闭（注销/搬迁）',
					value: '3',
					show: true,
				}],
				selectPrors: {
					label: 'address',
					value: 'number',
					children: 'option'
				},
				addressSameData: [{
					label: '与注册地址一致',
					value: '1',
					show: true,
				}, {
					label: '与注册地址不一致',
					value: '2',
					show: true,
				}],
				list: address,
				mSleVal: [], //地址默认绑定值
				drawerVisible: false, //导航显示 
				regAddressStr: '', //注册地址
				openAddressStr: '', //经营地址
				inptDataInfo: {
					company_id: '',
					produce_state: '', //生产经营状态
					produce_stop_reason: '', //停产停业原因
					reg_detail_address: '', //详细地址
					address_same: '', // 生产经营地址
					regAddressStr: '', //注册地址
					openAddressStr: '', //经营地址
					open_detail_address: '', //生产经营详细地址
					community: '',
					street: '',
					district: "01",
				},
				isShowAddressSame: false, //是否显示生产经营地址
				isShowProduceStopReason: false, //是否显示停产停业原因
			}
		},
		computed: {
			...mapState(["userInfo", 'userHomeInfoData']),
		},
		components: {
			appPickerSelect,
			LbPicker
		},
		onLoad() {

			this._initData(this.userHomeInfoData);
		},
		methods: {
			//导航
			onNavBarLeft() {
				this.onCancel();
			},
			_initData(data) {
				// console.log("新增", data.name)
				// this.inptDataInfo['name'] = data.name;
				// this.inptDataInfo['credit_code'] = data.credit_code;
				// this.inptDataInfo['scale'] = data.scale;
				this.inptDataInfo['company_id'] = data.company_id;
				this.inptDataInfo['produce_state'] = data.produce_state; //
				var produce_address = data.produce_address;
				var reg_address = data.reg_address;
				if (reg_address == produce_address) {
					this.inptDataInfo['address_same'] = '1';
					this.isShowAddressSame = false;
					this.inptDataInfo['community'] = data.community;
					this.inptDataInfo['street'] = data.street;
				} else {
					this.inptDataInfo['address_same'] = '2';
					this.isShowAddressSame = true;
					this.inptDataInfo['openCommunity'] = data.community;
					this.inptDataInfo['openStreet'] = data.community;
				}
				if (reg_address != null) {
					var reg_arr = resolveAddress(reg_address, this.list);
					var numArr = reg_arr.numberArray;
					var textArray = reg_arr.textArray;
					this.regAddressStr = textArray.join("");
					this.inptDataInfo.regAddressStr = this.regAddressStr;
					this.inptDataInfo.reg_detail_address = reg_arr.detail;

				}
				if (produce_address != null) {
					var pro_arr = resolveAddress(produce_address, this.list);
					var numArr = pro_arr.numberArray;
					var textArray = pro_arr.textArray;
					this.openAddressStr = pro_arr.textArray.join("");
					this.inptDataInfo.openAddressStr = this.openAddressStr;
					this.inptDataInfo.open_detail_address = pro_arr.detail;
				}
			},
			//////////////////open select///////////////////
			//显示地址选择
			onShowSelectOpenAddress() {

				setTimeout(() => {
					console.log(this.$refs, this.$refs.op_lb);
					this.$refs.op_lb.show();
				}, 200);
			},
			onSelectOpenAddress(opts) {
				var item = opts.item,
					len = item.length - 1,
					openCommunity = item[len].number,
					index = len - 1 < 0 ? 0 : len - 1,
					openStreet = item[index].number,
					str = '';

				for (var i = 0; i < item.length; i++) {
					str += (item[i].address)
				}
				this.openAddressStr = str;
				this.inptDataInfo.openAddressStr = str;
				this.inptDataInfo.openCommunity = openCommunity;
				this.inptDataInfo.openStreet = openStreet;
			},
			//清除经营地址 及相关的数据
			onClearOpenInputContent() {
				this.openAddressStr = "";
				this.inptDataInfo.openAddressStr = "";
				this.inptDataInfo.openCommunity = "";
				this.inptDataInfo.openStreet = "";
				this.inptDataInfo.open_detail_address = "";
			},


			//后退
			onCancel() {
				uni.reLaunch({
					url: '../home'
				});
			},
			_getLatAndLon(str) {
				console.log('执行', str)
				console.log(str)
				return new Promise((resolve, reject) => {
					plus.maps.Map.geocode(str, {
						city: '023'
					}, (event) => {
						var address = event.address; // 转换后的地理位置
						var point = event.coord; // 转换后的坐标信息
						var coordType = event.coordType; // 转换后的坐标系类型 
						resolve(point);
					}, (e) => {
						console.log("Failed:", e);
						resolve();
					});
				});

			},
			//提交
			async onSubmit() {
				var data = this.inptDataInfo;
				if (data.produce_state == '') {
					uni.showToast({
						title: '请选择生产经营状态',
						icon: "none"
					});
					return;
				}
				if (data.produce_stop_reason == "" && this.isShowProduceStopReason) {
					uni.showToast({
						title: '请输入停产停业原因',
						icon: 'none'
					})
					return;
				}
				if (data.regAddressStr == "") {
					uni.showToast({
						title: '请选择注册地址',
						icon: 'none'
					})
					return;
				}
				if (data.reg_detail_address == "") {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none'
					})
					return;
				}
				if (data.address_same == "") {
					uni.showToast({
						title: '请选择生产经营地址',
						icon: 'none'
					})
					return;
				}
				if (this.isShowAddressSame) {
					if (data.openAddressStr == "") {
						uni.showToast({
							title: '请选择经营地址',
							icon: 'none'
						})
						return;
					}
					if (data.open_detail_address == "") {
						uni.showToast({
							title: '请输入详细地址',
							icon: 'none'
						})
						return;
					}
				}
				var opts = {};
				opts.address_same = data.address_same;
				opts.community = data.community;
				opts.street = data.street;
				opts.company_id = data.company_id;
				opts.produce_state = data.produce_state; // 生产经营状态
				opts.reg_address = data.regAddressStr + data.reg_detail_address; //注册地址
				opts.produce_stop_reason = data.produce_stop_reason;
				opts.district = "01";
				var str,
					_self = this;
				if (data.address_same == 1) {
					opts.community = data.community;
					opts.street = data.street;
					opts.produce_address = opts.reg_address; //生产经营地址  
					str = data.regAddressStr;
				} else if (data.address_same == 2) { 
					opts.community = data.openCommunity;
					opts.street = data.openStreet;
					opts.produce_address = data.openAddressStr + data.open_detail_address; //生产经营地址  
					str = data.openAddressStr;
				}
				this._getLatAndLon(this.inptDataInfo.regAddressStr).then(res => {
					console.log(res)
					opts.lat = res.latitude;
					opts.lng = res.longitude;
					this.$http.post('save', opts).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title:"修改成功",
								icon:"success",
								success() {
									setTimeout(()=> {
										_self.onCancel();
									}, 1500)
								}
							})
						}
					})


				});

				return;

			},


			//////////select//////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this.inptDataInfo[key] = e.value;
					if (key == 'address_same' && e.value == '2') {
						this.isShowAddressSame = true;
					} else if (key == 'address_same' && e.value == '1') {
						this.isShowAddressSame = false;
					}
					if (key == 'produce_state' && (e.value == '2' || e.value == '3')) {
						this.isShowProduceStopReason = true;
					} else if (key == 'produce_state' && (e.value == '1')) {
						this.isShowProduceStopReason = false;
						this.inptDataInfo.produce_stop_reason = "";
					}
				}
			},
			onSelectClear(str) {
				this.inptDataInfo[str] = "";
				if (str == "address_same") {
					this.isShowAddressSame = false;
				}
				if (str == 'produce_state') {
					this.isShowProduceStopReason = false;
				}
			},
			onShowSelectAddress() {
				this.$refs.lb.show();
			},
			onSelectAddress(opts) {
				var item = opts.item,
					len = item.length - 1,
					community = item[len].number,
					index = len - 1 < 0 ? 0 : len - 1,
					street = item[index].number,
					str = '';

				for (var i = 0; i < item.length; i++) {
					str += (item[i].address)
				}
				this.inptDataInfo.regAddressStr = str;
				this.inptDataInfo.community = community;
				this.inptDataInfo.street = street;
			},
			onClearInputContent() {
				this.inptDataInfo.regAddressStr = "";
				this.inptDataInfo.community = "";
				this.inptDataInfo.street = "";
				this.inptDataInfo.reg_detail_address = "";
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_edit_container {
		.edit_wrapper {

			.n_ent_list_wrap {

				.n_ebt_input {
					.b_ent_addr_inp {
						float: left;
					}

					.n_ent_close {
						margin-left: 5px;
						float: left;
						width: 20px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						font-size: 12px;

					}
				}

				.n_ent_list_input {
					text-align: right;
					font-size: 14px;
				}

				.a_r_p_w_btn_wrap {
					display: flex;
					justify-content: space-between;
					margin-top: 30px;
				}
			}

			.a_r_p_w_btn_wrap {
				display: flex;
				justify-content: space-between;

			}
		}
	}
</style>
