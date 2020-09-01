<template>
	<view class="app_combustible_dust_container">
		<view class="combustible_dust_wrap">
			<uni-list>
				<uni-list-item title="粉尘类别" :showArrow="false" class="list_border_1px">
					<view class="" slot='right'>
						<view class="n_show_list_wrap" @click="onTabShow('dustShow')">
							<text class="color_ccc" v-if="dust_select_list && dust_select_list.length == 0">请选择粉尘类别</text>
							<view class="n_show_item text_align_right" v-for="(item, index) in dust_select_list" :key="index">{{item.label}}</view>
						</view>

						<multiple-select v-model="dustShow" :data="com_dustTypeData" :default-selected="dustDefaultSelected" @confirm="dustSelectBtn"
						 label-name="label" value-name="value" :checkAll="true" :isPlural="true">
						</multiple-select>
					</view>
				</uni-list-item>
				<block v-if="comData.dustType.length > 0">
					<block v-if="comData.dustType.indexOf('其他')!==-1">
						<uni-list-item title="其他粉尘类别" :showArrow="false" class="list_border_1px">
							<view class="" slot='right'>

								<view class="n_show_list_wrap" @click="onTabShow('otherShow')">
									<text class="color_ccc" v-if="other_select_list && other_select_list.length == 0">请选择粉尘类别</text>
									<view class="n_show_item text_align_right" v-for="(item, index) in other_select_list" :key="index">{{item.label}}</view>
								</view>

								<multiple-select v-model="otherShow" :data="dustOtherArray" :default-selected="otherDefaultSelected" @confirm="otherSelectBtn"
								 label-name="label" value-name="value" :checkAll="true" :isPlural="true">
								</multiple-select>

								<!-- <app-picker-select placeholder="请选择其他粉尘类别" :selectValue="comData.dustOther" :selectData="dustOtherArray"
								 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('dustOther')"
								 @onSelectBtn="onSelectBtn($event, 'dustOther')"></app-picker-select> -->
							</view>
						</uni-list-item>
					</block>
					<block v-if="comData.dustType.indexOf('无')==-1">
						<!-- 厂房结构 -->
						<uni-list-item title="厂房结构" :showArrow="false" class="list_border_1px">
							<view class="" slot='right'>
								<view class="n_ebt_input clearfix">
									<input class="n_ent_list_input b_ent_addr_inp text_align_right" placeholder-style="color:#ccc" v-model="homeStruTemp"
									 @click="onShowSelectHome" type="text" name="comRegAddr" placeholder="请选择厂房结构" disabled />
								</view>
								<lb-picker v-model="hSleVal" mode='multiSelector' :level="2" :list='homeStruList' ref="lb" @confirm="onSelectHome"></lb-picker>
							</view>
						</uni-list-item>
						<uni-list-item title="涉尘车间最多作业人数" :showArrow="false" class="list_border_1px">
							<view class="clearfix" slot='right'>
								<input type="text" class="float_left width100px text_align_right" v-model="comData.maxNum" placeholder-style="color:#ccc"
								 placeholder="请输入人数" />
								<text class="mar_left_10px float_left">名</text>
							</view>
						</uni-list-item>
						<uni-list-item title="除尘类型" :showArrow="false" class="list_border_1px">
							<view class="" slot='right'>
								<app-picker-select placeholder="请选择除尘类型" :selectValue="comData.dustOut" :selectData="dustOutArray" :isBorder="false"
								 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('dustOut')"
								 @onSelectBtn="onSelectBtn($event, 'dustOut')"></app-picker-select>
							</view>
						</uni-list-item>
						<block v-if="isShowWordDev">
							<uni-list-item title="作业人数" :showArrow="false" class="list_border_1px">
								<view class="clearfix" slot='right'>
									<input type="text" class="float_left width100px text_align_right" v-model="comData.workNum" placeholder-style="color:#ccc"
									 placeholder="请输入作业人数" />
									<text class="mar_left_10px float_left">名</text>
								</view>
							</uni-list-item>
							<uni-list-item title="出尘设备" :showArrow="false" class="list_border_1px">
								<view class="clearfix" slot='right'>
									<input type="text" class="float_left width100px text_align_right" v-model="comData.dustEqui" placeholder-style="color:#ccc"
									 placeholder="请输入出尘设备" />
									<text class="mar_left_10px float_left">套</text>
								</view>
							</uni-list-item>
						</block>
						<block v-if="d_mode">
							<uni-list-item title="主要集尘方式" :showArrow="false" class="list_border_1px">
								<view class="" slot='right'>
									<app-picker-select placeholder="请选择主要集尘方式" :selectValue="comData.setDust" :selectData="setDustArray" :isBorder="false"
									 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('setDust')"
									 @onSelectBtn="onSelectBtn($event, 'setDust')"></app-picker-select>
								</view>
							</uni-list-item>
							<block v-if="isShowFacility">
								<uni-list-item title="主要尘降设施" :showArrow="false" class="list_border_1px">
									<view class="" slot='right'>
										<app-picker-select placeholder="请选择主要尘降设施" :selectValue="comData.dustLand" :selectData="dustModeArray"
										 :isBorder="false" textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('dustLand')"
										 @onSelectBtn="onSelectBtn($event, 'dustLand')"></app-picker-select>
									</view>
								</uni-list-item>
								<uni-list-item title="防爆设施" :showArrow="false" class="list_border_1px">
									<view class="" slot='right'>
										<app-picker-select placeholder="请选择防爆设施" :selectValue="comData.preventExp" :selectData="poomArray" :isBorder="false"
										 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('preventExp', false)"
										 @onSelectBtn="onSelectBtn($event, 'preventExp', false)"></app-picker-select>
									</view>
								</uni-list-item>
							</block>
							<block v-if="isShowJFacility">
								<uni-list-item title="集尘设施" :showArrow="false" class="list_border_1px">
									<view class="" slot='right'>
										<app-picker-select placeholder="请选集尘设施" :selectValue="comData.dustFaci" :selectData="dustLandArray" :isBorder="false"
										 textAlign="right" :isShowClose="false" :isPadding="false" @onSelectClear="onSelectClear('dustFaci')"
										 @onSelectBtn="onSelectBtn($event, 'dustFaci')"></app-picker-select>
									</view>
								</uni-list-item>
							</block>
							<block v-if="isShowPost">
								<uni-list-item title="工位" :showArrow="false" class="list_border_1px">
									<view class="clearfix" slot='right'>
										<input type="number" class="float_left width100px text_align_right" v-model="comData.postNum"
										 placeholder-style="color:#ccc" placeholder="请输入工位个数" />
										<text class="mar_left_10px float_left">个</text>
									</view>
								</uni-list-item>
							</block>
						</block>
						<uni-list-item title="粉尘清洗频次" :showArrow="false" class="list_border_1px">
							<view class="clearfix" slot='right'>
								<input type="number" class="float_left width100px text_align_right" v-model="comData.dustRinseNum"
								 placeholder-style="color:#ccc" placeholder="请输入粉尘清洗频次" />
								<text class="mar_left_10px float_left">次/天</text>
							</view>
						</uni-list-item>

					</block>
				</block>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import appPickerSelectDustType from "@/components/app-picker/app-picker-select-dust-type"
	import LbPicker from '@/components/lb-picker'
	import appPickerSelect from '@/components/app-picker/app-picker-select'
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				isShowWordDev: false,
				d_mode: false,
				isShowFacility: false,
				isShowJFacility: false,
				isShowPost: false,
				dustType: '食品',
				comData: {
					dustType: [], //粉尘类别
					dustOther: [],
					homeStru: [], //厂房结构
					maxNum:'',//涉尘车间最多作业人数
					preventExp: [], //防爆设施
				},
				homeStruTemp: '', //厂房结构
				preventExp: '', //防爆设施
				homeStruList: [{
					value: '单层',
					label: '单层',
					children: [{
						value: '框架结构',
						label: '框架结构'
					}, {
						value: '非框架结构',
						label: '非框架结构'
					}]
				}, {
					value: '多层',
					label: '多层',
					children: [{
						value: '框架结构',
						label: '框架结构'
					}, {
						value: '非框架结构',
						label: '非框架结构'
					}]
				}],
				//其他粉尘类别
				dustOtherArray: [{
					label: '硫磺',
					value: '硫磺',
					show: true,
				}, {
					label: '过氧化物',
					value: '过氧化物',
					show: true,
				}, {
					label: '染料',
					value: '染料',
					show: true,
				}, {
					label: '静电粉末涂料',
					value: '静电粉末涂料',
					show: true,
				}, {
					label: '调色剂',
					value: '调色剂',
					show: true,
				}, {
					label: '萘',
					value: '萘',
					show: true,
				}, {
					label: '弱防腐剂',
					value: '弱防腐剂',
					show: true,
				}, {
					label: '硬脂酸铅',
					value: '硬脂酸铅',
					show: true,
				}, {
					label: '硬脂酸钙',
					value: '硬脂酸钙',
					show: true,
				}, {
					label: '乳化剂',
					value: '乳化剂',
					show: true,
				}],
				//除尘类型
				dustOutArray: [{
					label: "湿式除尘",
					value: "1",
					show: true,
				}, {
					label: "干式除尘",
					value: "2",
					show: true,
				}],
				//主要集尘方式
				setDustArray: [{
					label: "中央集尘",
					value: "1",
					show: true,
				}, {
					label: "工位独立集尘",
					value: "2",
					show: true,
				}, {
					label: "不集尘",
					value: "3",
					show: true,
				}],
				// 主要尘降设施
				dustModeArray: [{
						label: "尘降室",
						value: "1",
						show: true,
					},
					{
						label: "集尘器",
						value: "2",
						show: true,
					},
					{
						label: "布袋",
						value: "3",
						show: true,
					}
				],

				//防爆设施
				poomArray: [{
						label: '火花探测+自动灭火装置',
						value: "火花探测+自动灭火装置",
						show: true,
					},
					{
						label: "泄爆装置",
						value: "泄爆装置",
						show: true,
					},
					{
						label: '锁气闭灰',
						value: "锁气闭灰",
						show: true,
					},
				],
				//集尘设施
				dustLandArray: [{
						label: "布袋",
						value: "1",
						show: true,
					},
					{
						label: "过滤器",
						value: "2",
						show: true,
					},
					{
						label: "旋风除尘",
						value: "3",
						show: true,
					},
				],
				hSleVal: [], //厂房结构 默认
				dustDefaultSelected: [],
				dustShow: false,
				dust_select_list: [],
				other_select_list: [],
				otherShow: false,
				otherDefaultSelected: []
			}
		},
		components: {
			appPickerSelectDustType,
			appPickerSelect,
			LbPicker,
			multipleSelect
		},
		computed: {
			...mapState(['userInfo']),
			com_dustTypeData() {
				switch (this.dustType) {
					case '机械':
						return [{
							"value": "镁粉",
							"label": "镁粉"
						}, {
							"value": "铝粉",
							"label": "铝粉"
						}, {
							"value": "铝铁合金粉",
							"label": "铝铁合金粉"
						}, {
							"value": "钙铝合金粉",
							"label": "钙铝合金粉"
						}, {
							"value": "铜硅合金粉",
							"label": "铜硅合金粉"
						}, {
							"value": "硅粉",
							"label": "硅粉"
						}, {
							"value": "锌粉",
							"label": "锌粉"
						}, {
							"value": "钛粉",
							"label": "钛粉"
						}, {
							"value": "镁合金粉",
							"label": "镁合金粉"
						}, {
							"value": "硅铁合金粉",
							"label": "硅铁合金粉"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '塑料':
						return [{
							"value": "树脂粉",
							"label": "树脂粉"
						}, {
							"value": "橡胶粉",
							"label": "橡胶粉"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '纺织':
						return [{
							"value": "聚酯纤维",
							"label": "聚酯纤维"
						}, {
							"value": "甲基纤维",
							"label": "甲基纤维"
						}, {
							"value": "亚麻",
							"label": "亚麻"
						}, {
							"value": "棉花",
							"label": "棉花"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '食品':
						return [{
							"value": "淀粉",
							"label": "淀粉"
						}, {
							"value": "饲料",
							"label": "饲料"
						}, {
							"value": "乳糖粉",
							"label": "乳糖粉"
						}, {
							"value": "果糖粉",
							"label": "果糖粉"
						}, {
							"value": "奶粉",
							"label": "奶粉"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '建材':
						return [{
							"value": "褐煤粉尘",
							"label": "褐煤粉尘"
						}, {
							"value": "褐煤/无烟煤(80:20)粉尘",
							"label": "褐煤/无烟煤(80:20)粉尘"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '纸制品':
						return [{
							"value": "木粉",
							"label": "木粉"
						}, {
							"value": "纸浆粉",
							"label": "纸浆粉"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '商贸':
						return [{
							"value": "镁",
							"label": "镁"
						}, {
							"value": "铝",
							"label": "铝"
						}, {
							"value": "镁合金",
							"label": "镁合金"
						}, {
							"value": "铝铁合金",
							"label": "铝铁合金"
						}, {
							"value": "树脂粉",
							"label": "树脂粉"
						}, {
							"value": "橡胶粉",
							"label": "橡胶粉"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '轻工':
						return [{
							"value": "玉米淀粉",
							"label": "玉米淀粉"
						}, {
							"value": "大米淀粉",
							"label": "大米淀粉"
						}, {
							"value": "小麦淀粉",
							"label": "小麦淀粉"
						}, {
							"value": "果糖粉",
							"label": "果糖粉"
						}, {
							"value": "果胶酶粉",
							"label": "果胶酶粉"
						}, {
							"value": "土豆淀粉",
							"label": "土豆淀粉"
						}, {
							"value": "小麦粉",
							"label": "小麦粉"
						}, {
							"value": "大豆粉",
							"label": "大豆粉"
						}, {
							"value": "大米粉",
							"label": "大米粉"
						}, {
							"value": "奶粉",
							"label": "奶粉"
						}, {
							"value": "乳糖粉",
							"label": "乳糖粉"
						}, {
							"value": "饲料",
							"label": "饲料"
						}, {
							"value": "鱼骨粉",
							"label": "鱼骨粉"
						}, {
							"value": "血粉",
							"label": "血粉"
						}, {
							"value": "烟叶粉尘",
							"label": "烟叶粉尘"
						}, {
							"value": "木粉",
							"label": "木粉"
						}, {
							"value": "纸浆粉",
							"label": "纸浆粉"
						}, {
							"value": "树脂粉",
							"label": "树脂粉"
						}, {
							"value": "橡胶粉",
							"label": "橡胶粉"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '烟草':
						return [{
							"value": "烟叶粉尘",
							"label": "烟叶粉尘"
						}, {
							"value": "其他",
							"label": "其他"
						}];
					case '冶金':
						return [{
							"value": "褐煤粉尘",
							"label": "褐煤粉尘"
						}, {
							"value": "褐煤/无烟煤(80:20)粉尘",
							"label": "褐煤/无烟煤(80:20)粉尘"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					case '有色':
						return [{
							"value": "褐煤粉尘",
							"label": "褐煤粉尘"
						}, {
							"value": "褐煤/无烟煤(80:20)粉尘",
							"label": "褐煤/无烟煤(80:20)粉尘"
						}, {
							"value": "其他",
							"label": "其他"
						}, {
							"value": "无",
							"label": "无"
						}];
					default:
						return [];
				}
			}

		},
		methods: {
			/////////////////////select////////////////////////////
			// onSelectDustTypeBtn(val, key) { 
			// 	if (val == '无') {
			// 		this['comData'][key] = '无';
			// 	}else {
			// 		this['comData'][key] = val['value'];
			// 	}
			// },
			// onSelectDustTypeClose(type) {
			// 	this['comData'][type] = "";
			// },
			dustSelectBtn(data) {
				this.dust_select_list = data;
				this.comData.dustType = [];
				for (var i = 0; i < data.length; i++) {
					this.comData.dustType.push(data[i]['value']);
				}
			},
			otherSelectBtn(data) {
				this.other_select_list = data;
				this.comData.dustOther = [];
				for (var i = 0; i < data.length; i++) {
					this.comData.dustOther.push(data[i]['value']);
				}
			},
			onSelectBtn(e, key, bool = true) {
				if (e.flag) {
					if (bool) {
						this['comData'][key] = e.value;
					} else {
						this[key] = e.value;
						this['comData'][key][0] = e.value;
					}
					this._changeKey(key);
				}
			},
			_changeKey(key) {
				var data = this.comData;
				switch (key) {
					case 'dustOut':
						if (data.dustOut == 1) {
							this.isShowWordDev = true;
						} else {
							this.isShowWordDev = false
						}
						if (data.dustOut == 2) {
							this.d_mode = true;
						} else {
							this.d_mode = false;
						}
						break;
					case 'setDust':
						if (data.setDust == 1) {
							this.isShowFacility = true;
						} else {
							this.isShowFacility = false;
						}
						if (data.setDust == 2) {
							this.isShowJFacility = true;
						} else {
							this.isShowJFacility = false;
						}
						if (data.setDust == 3) {
							this.isShowPost = true;
						} else {
							this.isShowPost = false;
						}
						break;
				}
			},
			onSelectClear(str) {
				this['comData'][str] = "";
			},
			onShowSelectHome() {
				this.$refs.lb.show();
			},
			onSelectHome(opts) {
				var item = opts.item;
				var str = '';
				console.log(opts)
				for (var i = 0; i < item.length; i++) {
					var val = item[i]['value'];
					if (i == 0) {
						str = val;
					} else {
						str += " " + val;
					}
				}
				this.comData.homeStru = opts.value;
				this.homeStruTemp = str;
			},
			onTabShow(key) {
				this[key] = true;
			},
			/////////////////////////end///////////////////////////////
			submit() {
				var special = ''
				if (this.comData.dustType.indexOf('无') === -1) {
					if (this.comData.dustType.indexOf('其他') === -1) {
						special = this.comData.dustType.join(',')
					} else {
						special = [...this.comData.dustType, ...this.comData.dustOther].join(',')
					}
				}
				var opts = {
					company_id: 2282,
					content: JSON.stringify({dustTwo:this.comData}),
					special,
					state: this.comData.dustType.indexOf('无') === -1 ? 1 : 2,
					type: 3
				};
				this.$http.post("riskSave", opts).then(res => {
					if (res.code == 200) {
						this.log(res);
						this.$emit("changeNext", true);
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
