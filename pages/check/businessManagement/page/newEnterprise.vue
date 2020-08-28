<template>
	<view class="app_new_enterprise_container">
		<app-nav v-model="drawerVisible"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" :title="navTitle"></uni-nav-bar>
		<view class="n_ent_wrap">
			<app-title text="新增企业"></app-title>
			<view class="n_ent_list_wrap">
				<uni-list>
					<uni-list-item title="企业名称：" :showArrow="false">
						<view class="n_ent_list_down_wrap" slot="right">
							<input class="n_ent_list_input" @input="onInput" v-model="inptDataInfo.name" type="text" name="comName"
							 placeholder="请输入企业名称" />
							<lb-picker :props="companyProps" :list='companyData' ref="lb_com" @confirm="onCompanyItem"></lb-picker>
						</view>
					</uni-list-item> 

					<uni-list-item title="经营点：" :showArrow="false" v-if="isJyd">
						<view class="n_ent_list_down_wrap" slot="right">
							<input class="n_ent_list_input" v-model="inptDataInfo.point" type="text" name="comjyd" placeholder="请输入经营点" />
						</view>
					</uni-list-item>


					<uni-list-item title="社信代码：" :showArrow="false">
						<view class="" slot="right">
							<input class="n_ent_list_input" v-model="inptDataInfo.credit_code" :disabled="isDisable" type="text" name="comCode"
							 placeholder="请输入社信代码" />
						</view>
					</uni-list-item>
					<uni-list-item title="企业账号：" :showArrow="false" v-if="isShowCode && comAccount != ('' || null || undefined) && !isJyd">
						<view class="" slot="right">
							<input class="n_ent_list_input" v-model="comAccount" disabled type="text" name="comCode" placeholder="请输入企业账号" />
						</view>
					</uni-list-item>
					<uni-list-item title="企业规模：" :showArrow="false">
						<view class="" slot="right">
							<app-picker-select placeholder="请选择企业规模" :isBorder="false" textAlign="right" :selectData="comSizeData"
							 :selectValue="inptDataInfo.scale" @onSelectClear="onSelectClear('scale')" @onSelectBtn="onSelectBtn($event, 'scale')"></app-picker-select>
						</view>
					</uni-list-item>
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
								<input class="n_ent_list_input b_ent_addr_inp" v-model="regAddressStr" @click="onShowSelectAddress" type="text"
								 name="comRegAddr" placeholder="请选择注册地址" disabled />
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

					<uni-list-item v-if="isShowAddressSame && !isShowCode && !isJyd" title="经营点名称：" :showArrow="false">
						<view class="" slot="right">
							<input class="n_ent_list_input" type="text" v-model="inptDataInfo.newComPoint" name="comOpenDotName" placeholder="如：xx社区经营点" />
						</view>
					</uni-list-item>
					<uni-list-item :showArrow="false" v-if="isShowAddressSame">
						<view class="" slot="right">
							<view class="n_ebt_input clearfix">
								<input class="n_ent_list_input b_ent_addr_inp" v-model="openAddressStr" @click="onShowSelectOpenAddress" type="text"
								 name="comAddr" placeholder="请选择经营地址" disabled />
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
				<view class="a_r_p_w_btn_wrap">
					<button v-if="isShowCode && !isJyd" type="default" @click="onEditCompInof">修改企业信息 </button>
					<button type="default" @click="onCancel">取消</button>
					<button type="primary" @click="onSubmit">确定</button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import appNav from '@/components/app-nav/app-nav'
	import appTitle from "@/components/app-title/app-title"
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import LbPicker from '@/components/lb-picker'

	import {
		mapState
	} from "vuex"
	import address from '@/common/js/address'
	export default {
		data() {
			return {
				navTitle: '',
				drawerVisible: false,
				isJyd: false, //是否显示经营点 从detail  过来的
				inptDataInfo: {
					name: '',
					credit_code: '',
					scale: '',
					produce_state: '',
					produce_stop_reason: '', //停产原因
					/////注册地址
					regAddressStr: '',
					reg_detail_address: '',
					community: '',
					street: '',
					address_same: '',

					//经营点
					newComPoint: '',
					point: '',
					///////经营地址
					openAddressStr: '',
					open_detail_address: '',
					openCommunity: '',
					openStreet: ''
				},
				comAccount: '',
				isDisable: false, //社信代码是否禁选
				isShowCode: false,
				check: [],
				comSizeData: [{
					label: "规(限)上企业",
					value: "1",
					show: true,
				}, {
					label: "规(限)下企业",
					value: "2",
					show: true,
				}, {
					label: "个体工商户",
					value: "3",
					show: true,
				}],
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
				isShowProduceStopReason: false,
				list: address,
				selectPrors: {
					label: 'address',
					value: 'number',
					children: 'option'
				},
				companyProps: {
					label: 'name'
				},
				mSleVal: [], //'0', '01', '0104', '010402'
				isShowAddressSame: false,
				regAddressStr: '', //注册地址
				openAddressStr: '', //生产经营地址
				community: '', //城镇编号
				street: '', //城镇编号  
				openCommunity: '',
				openStreet: '',
				addressSameData: [{
					label: '与注册地址一致',
					value: '1',
					show: true,
				}, {
					label: '与注册地址不一致',
					value: '2',
					show: true,
				}],
				//------回收站------
				industry_category: '0',
				timer: null,
				companyData: [],
				current_state: ''
			}
		},
		computed: {
			...mapState(['admin_item_company_info']),
		},
		components: {
			appNav,
			appTitle,
			appPickerSelect,
			LbPicker
		},

		onLoad(opts) {
			this.navTitle = opts.title;
			this.current_state = opts.state;
			if (opts.state == 'nc') {
				this.isDisable = false;
				this.isShowCode = false;

			} else if (opts.state == 'ed') {
				console.log("load")
				this.isDisable = true;
				this.isShowCode = true;
				this.handleData(this.admin_item_company_info);
			} else if (opts.state == 'jyd') {
				this.isDisable = true;
				this.isShowCode = true;
				this.isJyd = true;
				this.handleData(this.admin_item_company_info);
			}

		},
		onShow() {

		},
		onUnload() {

		},
		methods: {
			onNavBarLeft() {
				this.clearData();
				uni.navigateBack();
			},
			handleData(data) {
				this.comAccount = data.account;
				this._assignment(data);
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
					// if (i == 0) {
					// 	str = item[i].address;
					// }else {
					str += (item[i].address)
					// }
				}
				this.regAddressStr = str;
				this.community = community;
				this.street = street;
				this.inptDataInfo.regAddressStr = str;
				this.inptDataInfo.community = community;
				this.inptDataInfo.street = street;
			},
			onClearInputContent() {
				this.regAddressStr = "";
				this.community = "";
				this.street = "";
				this.inptDataInfo.regAddressStr = "";
				this.inptDataInfo.community = "";
				this.inptDataInfo.street = "";
				this.inptDataInfo.reg_detail_address = "";
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
					// if (i == 0) {
					// 	str = item[i].address;
					// }else {
					str += (item[i].address)
					// }
				}
				this.openAddressStr = str;
				this.openCommunity = openCommunity;
				this.openStreet = openStreet;
				this.inptDataInfo.openAddressStr = str;
				this.inptDataInfo.openCommunity = openCommunity;
				this.inptDataInfo.openStreet = openStreet;
			},
			//清除经营地址 及相关的数据
			onClearOpenInputContent() {
				this.openAddressStr = "";
				this.openCommunity = '';
				this.openStreet = "";
				this.inptDataInfo.openAddressStr = "";
				this.inptDataInfo.openCommunity = "";
				this.inptDataInfo.openStreet = "";
				this.inptDataInfo.open_detail_address = "";
			},
			//获得回收站中的数据
			getRecycleBin(val) {
				this.$http.post('companyListBin', {
					industry_category: this.industry_category,
					key: val
				}).then(res => {
					if (res.code == 200) {
						this.companyData = res.data;
						this.$refs.lb_com.show();
					}
				})
			},
			/////
			onInput(e) {
				var val = e.detail.value;
				if (val == '') return;
				if (this.current_state == 'ed') return;
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					console.log(val)
					this.getRecycleBin(val);
				}, 1000);
			},
			//点击回收站的数据
			onCompanyItem(item) {
				console.log(item, "新增===============");
				if (item == null) return;
				this._assignment(item.item);
			},
			//处理数据
			_assignment(data) {
				console.log("新增", data.name)
				this.inptDataInfo['name'] = data.name;
				this.inptDataInfo['credit_code'] = data.credit_code;
				this.inptDataInfo['scale'] = data.scale;
				this.inptDataInfo['produce_state'] = data.produce_state;
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
					var reg_arr = this._resolveAddress(reg_address);
					var numArr = reg_arr.numberArray;
					var textArray = reg_arr.textArray;
					this.regAddressStr = textArray.join("");
					this.inptDataInfo.regAddressStr = this.regAddressStr;
					this.inptDataInfo.reg_detail_address = reg_arr.detail;

				}
				if (produce_address != null) {
					var pro_arr = this._resolveAddress(produce_address);
					var numArr = pro_arr.numberArray;
					var textArray = pro_arr.textArray;
					this.openAddressStr = pro_arr.textArray.join("");
					this.inptDataInfo.openAddressStr = this.openAddressStr;
					this.inptDataInfo.open_detail_address = pro_arr.detail;
				}
				console.log("新增", this.inptDataInfo)
			},
			//提交
			onSubmit() {
				var data = this.inptDataInfo;


				if (data.name == "") {
					uni.showToast({
						title: '请输入企业名称',
						icon: 'none'
					})
					return;
				}
				if (data.point == "" && this.isJyd) {
					uni.showToast({
						title: '请输入经营点名称',
						icon: 'none'
					})
					return;
				}
				if (data.credit_code == "") {
					uni.showToast({
						title: '请输入社会信用代码',
						icon: 'none'
					})
					return;
				}
				if (data.scale == "") {
					uni.showToast({
						title: '请选择企业规模',
						icon: 'none'
					})
					return;
				}
				if (data.produce_state == "") {
					uni.showToast({
						title: '请选择生产经营状态',
						icon: 'none'
					})
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
				if (data.newComPoint == "" && this.isShowAddressSame && !this.isShowCode && !this.isJyd) {
					uni.showToast({
						title: '请输入经营点名称',
						icon: 'none'
					})
					return;
				}

				if (data.openAddressStr == "" && this.isShowAddressSame) {
					uni.showToast({
						title: '请选择经营地址',
						icon: 'none'
					})
					return;
				}
				if (data.open_detail_address == "" && this.isShowAddressSame) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none'
					})
					return;
				}
				var opts = {};

				opts.produce_stop_reason = "";
				if (this.isShowProduceStopReason) {
					opts.produce_stop_reason = data.produce_stop_reason;
				}
				opts.credit_code = data.credit_code;
				opts.scale = data.scale;
				opts.produce_state = data.produce_state; // 生产经营状态
				opts.reg_address = data.regAddressStr + data.reg_detail_address; //注册地址
				opts.district = '01';
				opts.name = data.name;
				if (this.current_state == 'nc') {
					this._createEnterprose(data, opts);
				} else if (this.current_state == 'ed') {
					this._editEnterprise(data, opts);
				} else if (this.current_state == 'jyd') {
					this._addcompanyAddOP(data, opts);
				}

			},
			//新增企业
			_createEnterprose(data, opts) {
				if (data.address_same == 1) {
					opts.community = data.community;
					opts.street = data.street;
					opts.produce_address = opts.reg_address; //生产经营地址 
					this._sendCompanyAdd(opts);
				} else if (data.address_same == 2) {
					if (!this.isShowCode) {
						opts.name = data.name + data.newComPoint;
					}
					opts.community = data.openCommunity;
					opts.street = data.openStreet;
					opts.produce_address = data.openAddressStr + data.open_detail_address; //生产经营地址 
					this._sendCompanyAddOPS(opts);
				}
				console.log(data, opts, 'create')
			},
			//编辑企业
			_editEnterprise(data, opts) {
				var _self = this;
				opts.id = this.admin_item_company_info.id;
				opts.account = this.admin_item_company_info.account;
				opts.approval_status = this.admin_item_company_info.approval_status;
				opts.company_id = this.admin_item_company_info.company_id;
				opts.district = '01';
				opts.lat = this.admin_item_company_info.lat;
				opts.lng = this.admin_item_company_info.lng;
				opts.number_of_employees = this.admin_item_company_info.number_of_employees;
				opts.operating_point = this.admin_item_company_info.operating_point;
				if (data.address_same == 1) {
					opts.community = data.community;
					opts.street = data.street;
					opts.produce_address = opts.reg_address; //生产经营地址  
				} else if (data.address_same == 2) {
					if (!this.isShowCode) {
						opts.name = data.name + data.newComPoint;
					}
					opts.community = data.openCommunity;
					opts.street = data.openStreet;
					opts.produce_address = data.openAddressStr + data.open_detail_address; //生产经营地址  
				}
				console.log(data, opts, "edit")
				this.$http.post('companyEdit', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "修改成功",
							icon: "success",
							success() {
								setTimeout(() => {
									_self.onCancel();
								}, 2000);
							}
						})
					}

				})
			},
			//生产经营地址一致
			_sendCompanyAdd(opts) {
				var _self = this;
				this.$http.post('companyAdd', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "新增成功",
							icon: "success",
							success() {
								setTimeout(() => {
									_self.onCancel();
								}, 2000);
							}
						})

					}
				})
			},
			////生产经营地址不一致
			_sendCompanyAddOPS(opts) {
				var _self = this;
				this.$http.post('companyAddOPS', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "新增成功",
							icon: "success",
							success() {
								setTimeout(() => {
									_self.onCancel();
								}, 2000);
							}
						})
					}
				})
			},
			//新增经营点
			_addcompanyAddOP(data, opts) {

				//
				var _self = this;
				opts.point = data.point;
				opts.id = this.admin_item_company_info.id;
				opts.approval_status = this.admin_item_company_info.approval_status;
				opts.company_id = this.admin_item_company_info.company_id;
				opts.district = '01';
				opts.lat = this.admin_item_company_info.lat;
				opts.lng = this.admin_item_company_info.lng;
				opts.number_of_employees = this.admin_item_company_info.number_of_employees;
				opts.operating_point = this.admin_item_company_info.operating_point;
				opts.name = opts.name + opts.point;
				if (data.address_same == 1) {
					opts.community = data.community;
					opts.street = data.street;
					opts.produce_address = opts.reg_address; //生产经营地址  
					opts.address_same = 1;
				} else if (data.address_same == 2) {
					// if (this.isShowCode && this.isJyd) {
					// 	opts.name = data.name + data.newComPoint;
					// }
					opts.community = data.openCommunity;
					opts.street = data.openStreet;
					opts.produce_address = data.openAddressStr + data.open_detail_address; //生产经营地址  
					opts.address_same = 2;
				}
				this.$http.post('companyAddOP', opts).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "新增成功",
							icon: "success",
							success() {
								setTimeout(() => {
									_self.onCancel();
								}, 2000);
							}
						})
					}
				})
			},
			//后退
			onCancel() {
				this.clearData();
				uni.navigateBack()
			},
			//修改企业信息
			onEditCompInof() {
				
			},
			//清除数据
			clearData() {
				for (var prop in this.inptDataInfo) {
					this.inptDataInfo[prop] = '';
				}
			},

			//处理地址
			_resolveAddress(str) {
				/**
				 * try...cache 太多 全部提取为局部变量 
				 * 例：重庆市沙坪坝区青木关镇新青路社区2222递四方速递
				 */
				var textArray = [];
				var numberArray = [];
				//重庆市沙坪坝区青木关镇新青路社区2222递四方速递
				var first_reg = /.+?(省|市|自治区|自治州|县|区)/g;;
				var first_str = first_reg.exec(str);
				var str_f_bd ;
				var first_number ; 
				//沙坪坝区青木关镇新青路社区2222递四方速递
				var f_str;
				
				var second_reg;
				var second_str;
				var str_s_bd;
				var second_number;
				//青木关镇新青路社区2222递四方速递
				var s_str;
				
				
				var third_reg;
				var third_str;
				var t_str;
				var fourth_reg ;
				//新青路社区2222递四方速递
				var fourth_str;
				
				var reg = /(三峡商圈)/g;
				var reg1 = /(西站)/g;
				var reg2 = /(民防办)/g;
				var str_t_bd;
				var str_fo_bd;
				var third_number;
				var fourth_number;
				//2222递四方速递
				var fo_str;
				var arr;
				
				
				try {
					str_f_bd = first_str[0];
					first_number = this.changeNumber(str_f_bd);
					f_str = str.replace(str_f_bd, "");
					// console.log("去掉 --- 省|市|自治区|自治州|县|区 =得到", f_str) 
					second_reg = /.+?(区|县)/g;
					second_str = second_reg.exec(f_str);
					str_s_bd = second_str[0];
					second_number = this.changeNumber(str_s_bd);
					s_str = f_str.replace(str_s_bd, "");
					// console.log("去掉 --- 区|县 =得到", s_str)

					

					try {
						third_reg = /.+?(街道|镇)/g;
						third_str = third_reg.exec(s_str);
						str_t_bd = third_str[0];
						third_number = this.changeNumber(str_t_bd);
						t_str = s_str.replace(str_t_bd, "");
						// console.log( "去掉 --- 街道|镇 =得到", t_str);

						fourth_reg = /.+?(社区|村)/g;
						fourth_str = fourth_reg.exec(t_str);
						str_fo_bd = fourth_str[0];
						fourth_number = this.changeNumber(str_fo_bd);
						fo_str = t_str.replace(str_fo_bd, "");
						// console.log( "去掉 ---  社区|村 =得到", fo_str);
					} catch (e) {
						try {
							arr = reg.exec(s_str);
							// console.log(arr, "1111");
							if (arr == null) {
								arr = reg1.exec(s_str);
								// console.log(arr, "2222");
								if (arr == null) {
									arr = reg2.exec(s_str);
									// console.log(arr, "33333333");
								}
							}
							str_t_bd = arr[0];
							str_fo_bd = arr[1];
							third_number = this.changeNumber(str_t_bd)
							fourth_number = this.changeNumber(str_fo_bd, true);
							fo_str = s_str.replace(str_fo_bd + str_t_bd, "");
							// console.log("去掉 --- 三峡商圈|西站|民防办 =得到", fo_str);
						} catch (e) {
							str_t_bd = "";
							str_fo_bd = '';
							third_number = ""
							fourth_number = "";
							fo_str = s_str;
						}
					}


				} catch (e) {
					fo_str = str;
				} 
				// console.log( "最终得到：", str_t_bd, str_t_bd, third_number, fourth_number, fo_str)


				// console.log(fourth_number ,third_number, second_number, first_number,str_fo_bd)
				textArray = [str_f_bd, str_s_bd, str_t_bd, str_fo_bd];
				numberArray = [first_number, second_number, third_number, fourth_number];
				// console.log( "最终得到：", textArray, numberArray, fo_str)
				return {
					textArray,
					numberArray,
					detail: fo_str
				}


			},
			//获取地址number
			changeNumber(str, isCommon = false) {
				var number;
				this.list.forEach((item, index) => {

					if (item.address == str) {
						number = item.number;
					} else {
						item.option.forEach((ele, indx) => {
							if (ele.address == str) {
								number = ele.number;
							} else {
								ele.option.forEach((_center, _i) => {
									if (_center.address == str && !isCommon) {
										number = _center.number;
									} else {
										_center.option.forEach((_last) => {
											if (_last.address == str) {
												number = _last.number;
											}
										})
									}
								});
							}
						});
					}
				});
				return number;
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.app_new_enterprise_container {

		.n_ent_wrap {
			padding: 10px;

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
		}
	}
</style>
