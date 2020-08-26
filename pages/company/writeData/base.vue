<template>
	<view class="app_base_container">
		<app-nav v-model="drawerVisible" currentNav="company"></app-nav>
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="基本信息"></uni-nav-bar>
		<view class="base_wrap padding_10px">
			<uni-list>
				<uni-list-item title="企业名称" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<input type="text" placeholder="填写正确的企业名称" class="text_align_right" v-model="baseInfoData.name" />
					</view>
				</uni-list-item>
				<uni-list-item title="社信代码" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<input type="text" placeholder="请输入社信代码" disabled class="text_align_right" v-model="baseInfoData.credit_code" />
					</view>
				</uni-list-item>
				<uni-list-item title="法人代表" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<input type="text" placeholder="填写法人代表名字" class="text_align_right" v-model="baseInfoData.cegal_person" />
					</view>
				</uni-list-item>
				<uni-list-item title="法人联系电话" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<input type="number" placeholder="请输入法人联系电话" class="text_align_right" v-model="baseInfoData.phone" />
					</view>
				</uni-list-item>
				<uni-list-item title="从业人员(名)" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<input type="number" placeholder="请输入人员数量" class="text_align_right" v-model="baseInfoData.number_of_employees" />
					</view>
				</uni-list-item>
				<uni-list-item title="上年产值" :showArrow="false">
					<view class="n_ent_list_down_wrap clearfix" slot="right">
						<input type="number" placeholder="请输入上年产值" class="text_align_right float_left" v-model="baseInfoData.lastyear_value" />
						<view class="float_left mar_left_5px">万元</view>
					</view>
				</uni-list-item>
				<uni-list-item title="安全管理负责人" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<input type="text" placeholder="请输入安全管理负责人" class="text_align_right" v-model="baseInfoData.sp_principal" />
					</view>
				</uni-list-item>
				<uni-list-item title="联系电话" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<input type="number" placeholder="请输入联系电话" class="text_align_right" v-model="baseInfoData.sp_principal_phone" />
					</view>
				</uni-list-item>
				<!-- //////////////////////////////////////////////////////////////////////////// -->
				<uni-list-item title="安全员" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<view class="clearfix">
							<view class="clearfix mar_bottom_5px">
								<view class="float_left mar_right_5px">专职:</view>
								<input type="text" class="float_left width100px" placeholder="无请填写0" v-model="security_officer" />
								<view class="float_left">人</view>
							</view>
							<view class="border_1px height10px"></view>
							<view class="clearfix mar_top_10px">
								<view class="float_left mar_right_5px">兼职:</view>
								<input type="text" class="float_left width100px" placeholder="无请填写0" v-model="security_officer2" />
								<view class="float_left">人</view>
							</view>
						</view>
					</view>
				</uni-list-item>
				<uni-list-item title="行业类别" :showArrow="false">
					<view class="n_ent_list_down_wrap clearfix" slot="right">
						<app-picker-select :selectData="categoryMenus" :selectValue="baseInfoData.industry_category" placeholder="请选择行业类别"
						 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('industry_category')"
						 @onSelectBtn="onSelectBtn($event, 'industry_category')"></app-picker-select>
						<view class="border_1px height10px" v-if="category1Menus && category1Menus.length > 0"></view>
						<app-picker-select class="mar_top_10px" :selectData="category1Menus" v-if="category1Menus && category1Menus.length > 0"
						 :selectValue="baseInfoData.industry_category_1" placeholder="请选择行业类别" :isBorder="false" textAlign="right"
						 :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('industry_category_1')" @onSelectBtn="onSelectBtn($event, 'industry_category_1')"></app-picker-select>
					</view>
				</uni-list-item>
				<uni-list-item title="主营产品" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right"> 
						<view class="n_show_list_wrap" @click="onTabInp(1)">
							<text class="color_ccc" v-if="main_selse_list && main_selse_list.length == 0">请选择</text> 
							<view class="n_show_item text_align_right" v-for="(item, index) in main_selse_list" :key="index">{{item.lbmc}}</view>
						</view>
						<multiple-select v-model="show" :data="main_list" :default-selected="defaultSelected" @confirm="mainSelectBtn"
						 label-name="lbmc" value-name="xldm">
						</multiple-select>
					</view>
				</uni-list-item>
				<uni-list-item title="主要工序" :showArrow="false">
					<view class="n_ent_list_down_wrap" slot="right">
						<view class="n_show_list_wrap" @click="onTabInp(2)">
							<text class="color_ccc" v-if="main_proess_selse_list && main_proess_selse_list.length == 0">请选择</text>
							<view class="n_show_item text_align_right" v-for="(item, index) in main_proess_selse_list" :key="index">{{item}}</view>
						</view>
						<multiple-select v-model="showPress" 
										 :data="main_proess_list" 
										 :default-selected="defaultProessSelected" 
										 @confirm="mainProessSelectBtn" 
										 @onOther="onOther"
										 :isPlural="isPlural">
						</multiple-select>
					</view>
				</uni-list-item>
			</uni-list>
			<hFormAlert v-if="isShowCancel" placeholder="请输入" title='添加主要工序' confirmText="添加" @confirm="onDetermine" @cancel="onCancel"></hFormAlert>
			
			<view class="mar_top_20px mar_bottom_20px">
				<button type="primary" @click="onSubmit">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect"
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue';

	import product from "@/common/js/product.json"

	import industryTypeTwo from '@/common/js/industryTypeTwo.json'
	import qingong from '@/common/js/qingong.json'

	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				drawerVisible: false, //导航显示 
				baseInfoData: {
					company_id:'',//id
					name: '', //企业名称
					credit_code: '', //社信代码
					cegal_person: '', //法人代表
					phone: '', //法人联系电话
					number_of_employees: '', //从业人员
					lastyear_value: '', //上年产值
					sp_principal: '', //安全管理负责人
					sp_principal_phone: '', //联系电话
					////////////////////////////////
					security_officer: '', //安全员专职&兼职
					industry_category: '', //行业类别
					industry_category_1: '', //主营产品 代码
					industry_category_zfl: '', //再分类
					main_products: '', //主营产品
					main_process: '', //主要工序
				},
				security_officer: '', //安全员专职
				security_officer2: '', //安全员兼职
				/////////////////////////////////
				//行业类别
				categoryMenus: [{
					label: '机械',
					value: '机械',
					show: true,
				}, {
					label: '纺织',
					value: '纺织',
					show: true,
				}, {
					label: '建材',
					value: '建材',
					show: true,
				}, {
					label: '商贸',
					value: '商贸',
					show: true,
				}, {
					label: '轻工',
					value: '轻工',
					show: true,
				}, {
					label: '烟草',
					value: '烟草',
					show: true,
				}, {
					label: '冶金',
					value: '冶金',
					show: true,
				}, {
					label: '有色',
					value: '有色',
					show: true,
				}],
				category1Menus: [],
				/////////////////////////


				/////
				show: false, //主营产品是否显示 - 双向绑定
				info: "",
				main_list: [], //主营产品数据源
				defaultSelected: [], //主营产品默认选中项
				main_selse_list: [], //选中的主营产品
				main_proess_list:[],//主要工序数据源
				main_proess_selse_list:[],//选中的主要工序
				defaultProessSelected:[], //主要工序默认选中项
				isPlural:false,
				showPress:false,//主要工序是否显示 - 双向绑定
				isShowCancel:false,//主要工序其他弹窗
			}
		},
		components: {
			appPickerSelect,
			multipleSelect,
			hFormAlert
		},
		computed:{
			...mapState(["userInfo"]),
		},
		onLoad() {
			this._initData();
		},
		methods: {
			onNavBarLeft() {
				uni.navigateBack();
			},
			_initData() {
				this._getInfo();
			},
			//获取数据
			_getInfo() {
				var opts = {
					company_id: this.userInfo.company_id || 2437
				};
				this.$http.post('info', opts).then(res=> {
					if (res.code == 200) {
						var data = res.data;
						this._handleBaseData(data);
					}
				});
			},
			//处理数据
			_handleBaseData(data) { 
				this.baseInfoData['company_id'] = data.company_id;
				this.baseInfoData['name'] = data.name;
				this.baseInfoData['credit_code'] = data.credit_code;
				this.baseInfoData['cegal_person'] = data.cegal_person;
				this.baseInfoData['phone'] = data.phone;
				this.baseInfoData['number_of_employees'] = data.number_of_employees;
				this.baseInfoData['lastyear_value'] = data.lastyear_value;
				this.baseInfoData['sp_principal'] = data.sp_principal;
				this.baseInfoData['sp_principal_phone'] = data.sp_principal_phone;
				this.baseInfoData['industry_category'] = data.industry_category;
				this.baseInfoData['industry_category_1'] = data.industry_category_1;
				this.baseInfoData['industry_category_zfl'] = data.industry_category_zfl;
				//安全员专职&兼职
				var security_officer_arr;
				// 主营产品
				var main_products_arr;
				//主要工序
				var main_process_arr;
				try{
					security_officer_arr = data.security_officer.split(','); 
					main_products_arr = data.main_products.split(',');
					main_process_arr = data.main_process.split(',');
				}catch(e){
					security_officer_arr = [];
					main_products_arr = [];
					main_process_arr = [];
				}
				this.security_officer = security_officer_arr[0];
				this.security_officer2 = security_officer_arr[1];
				this._changeProduct(data.industry_category);
				//主营产品 
				// this.baseInfoData['main_products'] = data.main_products;
				var temp = {
					dh:data.industry_category,
					value:data.industry_category_1
				};
				console.log(temp)
				this._changeLightIndustry(temp);
				
				var final_main_products_arr = this._handleProduct(main_products_arr);
				console.log(main_products_arr)
				this.defaultSelected = final_main_products_arr.nArr;
				this.main_selse_list = final_main_products_arr.tArr;
				//主要工序
				// this.baseInfoData['main_process'] = data.main_process;
				// main_process: "普通机加（钻铣磨冲剪压焊）,熔炼,锻造"
				this.main_proess_list = this._changeProcess();
				
				var final_main_process_arr = this._handleProess(main_process_arr);
				this.main_proess_list = this._compared(this.main_proess_list, final_main_process_arr);
				this.defaultProessSelected = main_process_arr;
				this.main_proess_selse_list = main_process_arr;
			}, 
			//处理主营产品
			_handleProduct(arr) {
				var nArr = [];
				var tArr = [];
				if (arr.length > 0) {
					for (var i = 0; i < arr.length; i ++) {
						if (arr[i].length > 0) {
							var temp = arr[i].split('-');
							nArr.push(temp[0]);
							tArr.push({
								lbmc:temp[1]
							});
						}
					}
				}
				return {
					nArr,
					tArr
				};
			},
			//处理主要工序
			_handleProess(arr) {
				var nArr = [];
				if (arr.length > 0) {
					for (var i = 0; i < arr.length; i ++) {
						if (arr[i].length > 0) {
							nArr.push(arr[i]);
						}
					}
				}
				return nArr;
			},
			_compared(arr, f_arr) {
				var nArr = [];
				for (var i = 0; i < arr.length - 2; i ++) {
					for (var j = 0; j < f_arr.length; j ++) {
						if (f_arr[j] == arr[i]) {
							f_arr.splice(j , 1);
						}
					}
				}
				nArr = arr.concat(f_arr);
				return nArr;
			},
			/////////////////////select////////////////////////////
			onSelectBtn(e, key) {
				if (e.flag) {
					this.baseInfoData[key] = e.value;
					this._changeSelect(key, e);
				}
			},
			onSelectClear(str) {
				this.baseInfoData[str] = "";
				this.main_selse_list = [];
				this.main_proess_selse_list = [];
			},
			//
			_changeSelect(key, e) {
				switch (key) {
					case 'industry_category':
						this._changeProduct(e.value);
						return;
					case 'industry_category_1':
						this._changeLightIndustry(e);
						return;
				}
			},
			// 根据 行业类别 选 主营产品  
			_changeProduct(val) {
				this.category1Menus = [];  
				industryTypeTwo.forEach((item, index) => {
					if (val == item.dh) {
						this.category1Menus.push({
							label: item.mc,
							value: item.zl,
							dh: item.dh,
							show: true,
						});
					}
				})
			},
			// 根据 主营产品 选 行业分类  
			_changeLightIndustry(e) {
				this.baseInfoData.industry_category_zfl = e.dh;
				this.main_list = [];
				qingong.forEach((item, index) => {
					if (item.zl == e.value) {
						this.baseInfoData.industry_category_zfl = item.zfl;
					}
				})
				product.forEach((item, index) => {
					var num = (item.xldm).substring(0, 3);
					if (num == this.baseInfoData.industry_category_1) {
						this.main_list.push(item);
					} 
				});
				this.main_proess_list = this._changeProcess();
			},
			//显示产品分类
			onTabInp(num) {
				switch(num) {
					case 1:
					this.show = true;
					break;
					case 2:
					this.showPress = true;
					break;
				}
				
			},
			//点击产品分类确定
			mainSelectBtn(data) {
				this.main_selse_list = data;
				this.baseInfoData.main_products = data.map((el) => (el.xldm + '-' + el.lbmc)).join(",");
			},
			//点击主要工序确定
			mainProessSelectBtn(data) {
				this.main_proess_selse_list = data;
				this.baseInfoData.main_process = data.map((el) => el).join(",");
			},
			onOther() {
				this.isShowCancel = true;
			},
			////////主要工序//////////////////////////////////////
			_changeProcess() {
				var arr = [];
				var data = [{
						"dh": "机械",
						"zfl": "机械",
						"process": "普通机加（钻铣磨冲剪压焊）"
					},
					{
						"dh": "机械",
						"zfl": "机械",
						"process": "熔炼"
					},
					{
						"dh": "机械",
						"zfl": "机械",
						"process": "锻造"
					},
					{
						"dh": "机械",
						"zfl": "机械",
						"process": "打磨"
					},
					{
						"dh": "机械",
						"zfl": "机械",
						"process": "喷涂"
					},
					{
						"dh": "商贸",
						"zfl": "商贸",
						"process": "仓储（库房）"
					},
					{
						"dh": "商贸",
						"zfl": "商贸",
						"process": "冻库"
					},
					{
						"dh": "商贸",
						"zfl": "商贸",
						"process": "锅炉房"
					},
					{
						"dh": "轻工",
						"zfl": "轻工",
						"process": "开料"
					},
					{
						"dh": "轻工",
						"zfl": "轻工",
						"process": "打磨"
					},
					{
						"dh": "轻工",
						"zfl": "轻工",
						"process": "喷涂"
					},
					{
						"dh": "轻工",
						"zfl": "轻工",
						"process": "砂光"
					},
					{
						"dh": "轻工",
						"zfl": "家具",
						"process": "开料"
					},
					{
						"dh": "轻工",
						"zfl": "家具",
						"process": "打磨"
					},
					{
						"dh": "轻工",
						"zfl": "家具",
						"process": "喷涂"
					},
					{
						"dh": "轻工",
						"zfl": "家具",
						"process": "砂光"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "打浆"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "纸前处理"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "纸板抄造"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "烫金"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "压文"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "印刷"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "模切"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "3D立体"
					},
					{
						"dh": "轻工",
						"zfl": "纸制品",
						"process": "UV其他"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "投料"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "搅拌"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "磨制"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "发酵"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "加工"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "储存"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "冷冻储存"
					},
					{
						"dh": "轻工",
						"zfl": "食品",
						"process": "包装"
					},
					{
						"dh": "轻工",
						"zfl": "塑料",
						"process": "注塑"
					},
					{
						"dh": "轻工",
						"zfl": "塑料",
						"process": "挤塑"
					},
					{
						"dh": "轻工",
						"zfl": "塑料",
						"process": "吹塑"
					},
					{
						"dh": "轻工",
						"zfl": "塑料",
						"process": "塑炼"
					},
					{
						"dh": "轻工",
						"zfl": "塑料",
						"process": "混炼"
					},
					{
						"dh": "轻工",
						"zfl": "塑料",
						"process": "硫化"
					},
					{
						"dh": "纺织",
						"zfl": "纺织",
						"process": "纺织"
					},
					{
						"dh": "纺织",
						"zfl": "纺织",
						"process": "纺纱"
					},
					{
						"dh": "纺织",
						"zfl": "纺织",
						"process": "织造"
					},
					{
						"dh": "建材",
						"zfl": "建材",
						"process": "水泥制造"
					},
					{
						"dh": "建材",
						"zfl": "建材",
						"process": "混凝土制造"
					},
					{
						"dh": "建材",
						"zfl": "建材",
						"process": "平板玻璃"
					},
					{
						"dh": "建材",
						"zfl": "建材",
						"process": "建筑卫生陶瓷"
					},
					{
						"dh": "建材",
						"zfl": "建材",
						"process": "石膏板"
					},
					{
						"dh": "建材",
						"zfl": "建材",
						"process": "耐火材料"
					},
				]
				if (this.baseInfoData.industry_category_zfl === '建材') {
					var BuildData = [{
							zl: '301',
							data: ['粉碎', '生料制备', '煤粉制备', '熟料制备', '冷却', '熟料混合', '熟料磨制', '储存', '分装', '煅烧', '磨料', '配料', '成型', '烘干', '包装']
						}, {
							zl: '302',
							data: ['原料存放', '配料', '皮带运输', '搅拌', '运输']
						}, {
							zl: '304',
							data: ['粉碎', '配料', '熔制', '成型', '热处理']
						}, {
							zl: '307',
							data: ['泥浆制备', '成型', '干燥', '施釉', '烧成']
						}, {
							zl: '308',
							data: ['粉碎', '煅烧', '成型', '干燥', '烧成', '包装']
						}],
						BuildOtherData = ['熔制', '热处理', '原料存放', '粉碎', '配料', '生料制备', '煤粉制备', '冷却', '熟料混合', '搅拌', '储存', '分装', '泥浆制备', '成型',
							'干燥', '烧成', '煅烧', '磨料', '包装'
						];
					BuildData.forEach(item => {
						if (item.zl == this.baseInfoData.industry_category_1) {
							arr = item.data;
						}
					});
					if (arr.length == 0) {
						arr = BuildOtherData;
					}
				}else {
					data.forEach(item=> {
						if (item.zfl ==  this.baseInfoData.industry_category_zfl) {
							arr.push(item.process)
						}
					})
				}
				var len = arr.length;
				arr[len - 2] = "其他";
				arr[len - 1] = '无';
				return arr;
			},
			//onDetermine 其他 主要工序
			onDetermine(text) { 
				console.log(text)
				var flag = true;
				if (flag) {
					flag = false;
					this.isShowCancel = false; 
					this.main_proess_list.unshift(text);
				}
			},
			onCancel() {
				this.isShowCancel = false;
			},
			//提交数据  下一步
			onSubmit() {
				var opts = this.baseInfoData;
				opts.company_id = 2437;
				opts.security_officer = this.security_officer + ',' + this.security_officer2;
				this.$http.post("save", opts).then(res=> {
					if (res.code == 200) {
						uni.showToast({
							title:"提交成功",
							icon:'success',
							success() {
								setTimeout(()=> {
									uni.navigateTo({
										url:'./safety'
									})
								}, 1500);
							}
						})
					}
				});
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
