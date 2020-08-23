<template>
	<view class="cmp_input_tree_container">
		<view class="inp_tree_wrap">
			<view class="in_t_list">
				<!-- <view class="in_t_list_item" v-for="(item, index) in treeData">
					<app-tree-node :treeState="treeState" :node="item" @onChange="getData" @onUnfold="onUnfold"></app-tree-node>
				</view> -->
				<view class="in_t_list_item mar_bottom_10px" v-for="(item, index) in treeList" :key="index">
					<view class="in_t_list_it_bd clearfix" v-if="item.show" :style="{
							   paddingLeft:item.rank * 20 + 'px'
						   }">
						<view class="in_t_li_it_up float_left in_t_l_i_icon mar_right_10px">
							<view v-if="item.isChild" class="border_1px_all_ccc" @click="onUnfold(item)">V</view>
						</view>
						<view class="in_t_li_it_check_box float_left" v-if="">
							<checkbox-group @change="checkboxChange($event, item)">
								<view>
									<checkbox :value="item.label" :disabled="item.disabled" :checked="item.checked" />
								</view>
							</checkbox-group>
						</view>
						<view class="in_t_li_it_text float_left" :class="{ color_ccc:item.disabled }" @click="onUnfold(item)">
							{{item.label}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		merge
	} from "@/common/js/base.js"
	import {
		lawData
	} from "@/common/js/dataArray.js"
	// import appTreeNode from "./app-input-tree-node.vue"
	import {
		mapState,
		mapMutations
	} from "vuex"
	
	/////扁平化数据
	
	export default {
		props: {
			treeState: Boolean,
			isDisabled: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				
				treeList: [],
				workData: {},
				dustData: {
					dustType: []
				},
				duststate: false,
				spaceData: {
					state: false
				},
				tszy: false,
				furnaceState: 2,
				chemistryState: false,
				infoData: {
					energy: [],
					main_process: []
				},
				work10max: false, //10以上作业人数
				work10min: false, //10以下作业人数
				work1: true, //个体
				isShowTree: false,
			}
		},
		watch: {
			treeState(nv) {
				if (!nv) {
					this.$store.commit("set_admin_law_add_law_plan_arr", {
						label: [],
						bool: false
					})
					// this._initTreeData(this.treeData);
				}
			},
		},

		components: {
			// appTreeNode
		},
		computed: {
			...mapState(['admin_law_add_law_plan_arr', 'admin_law_detail_info']),
		},
		created() {
			this.$store.commit("set_admin_law_add_law_plan_arr", {
				label: [],
				bool: false
			}) 
			if (this.isDisabled) {
				var _self = this;
				this.getInfo(function () {
					_self.renderTreeList(lawData);
				});
			}else {
				this.renderTreeList(lawData);
			} 
			
		},
		methods: {
			...mapMutations(['set_admin_law_add_law_plan_arr']),

			renderTreeList(list = [], rank = 0, parentId=[]) {
				for (var i = 0; i < list.length; i++) {
					this.treeList.push({
						"label": list[i].label,
						"disabled": list[i].disabled,
						"checked": list[i].checked,
						"level": list[i].level,
						id:list[i].id,
						rank,// 层级
						show: rank == 0,
						showChild: false, 
						parentId,
						isChild:Array.isArray(list[i].children) && list[i].children.length > 0
					});
					if(Array.isArray(list[i].children) && list[i].children.length > 0){
						let parents = [...parentId];
						parents.push(list[i].id);
						this.renderTreeList(list[i].children, rank+1, parents);
					}else{
						this.treeList[this.treeList.length-1].lastRank = true;
					}
				}
			} ,
			
			getData(obj) {
				console.log(obj)
				return this.admin_law_add_law_plan_arr;
			}, 
			onUnfold(item){
				let list = this.treeList;
				let id = item.id;
				if(item.lastRank === true){
					//点击最后一级时触发事件
					console.log("?????????????")
					this.$emit('treeItemClick', item);
					return;
				}
				item.showChild = !item.showChild;
				list.forEach(childItem=>{
					if(item.showChild === false){
						//隐藏所有子级
						if(!childItem.parentId.includes(id)){
							return;
						}
						if(childItem.lastRank !== true){
							childItem.showChild = false;
						}
						childItem.show = false;
					}else{
						if(childItem.parentId[childItem.parentId.length-1] === id){
							childItem.show = true;
						}
					}
				})
			},
			///////////////
			checkboxChange(e, node) {
				var val = e.detail.value;
				var obj = {
					val,
					index: node.level
				};
				if (val.length > 0) {
					obj.bool = true;
					node.checked = true;
					if (!node.isChild && node.rank == 0) {
						this.addLawPlan(node);
					}
					this._changeData(node, true);
					
				} else {
					obj.bool = false;
					node.checked = false;
					if (!node.isChild && node.rank == 0) {
						this.spliceLawPlan(node);
					}
					this._changeData(node, false);
				}
				console.log(obj)
				// this.$emit('onChange', obj);
			},
			
			_changeData(data, bool) { 
				// console.log(data)
				
				var id = data.id;
				var list = this.treeList;
				list.forEach((childItem, index)=> { 
					if (childItem.parentId.includes(id) && !childItem.disabled && bool) {
						childItem.checked = true;
						this.addLawPlan(childItem);
					}else if (childItem.parentId.includes(id) && !childItem.disabled && !bool){
						childItem.checked = false;
						this.spliceLawPlan(childItem);
					}
				}) 
				return;
				// var len;
				// try {
				// 	len = data.length;
				// } catch (e) {
				// 	len = 0;
				// }
				// if (len > 0) {
				// 	for (var i = 0; i < data.length; i++) {
				// 		if (data[i].children) {
				// 			this._changeData(data[i].children, bool);
				// 		}
				// 		if (data[i].disabled) continue;
				// 		if (bool) {
				// 			data[i].checked = true;
				// 		} else {
				// 			data[i].checked = false;
				// 		}
				// 	}
				// }
			},
			
			addLawPlan(childItem) {
				console.log(childItem)
				if (childItem.isChild && childItem.rank > 0) return;
				this.$store.commit("set_admin_law_add_law_plan_arr", {
					label: childItem,
					bool: true
				});
			},
			spliceLawPlan(childItem) {
				if (childItem.isChild && childItem.rank > 0) return;
				var arr = this.admin_law_add_law_plan_arr;
				for (var i = 0; i < arr.length; i ++) {
					if (arr[i]['label'] == childItem["label"]) {
						arr.splice(i, 1);
					}
					this.$store.commit("set_admin_law_add_law_plan_arr", {
						label: arr,
						bool: false
					})
				}
			},
			
			// _chaneData(data, index) {
			// 	var len = data.length;
			// 	var arr = [];
			// 	for (var i = 0; i < data.length; i++) {
			// 		if (data[i].children) {
			// 			var checked = this._chaneData(data[i].children);
			// 			data[i].checked = checked;
			// 		} else {

			// 			if (data[i].checked && i == len - 1) {
			// 				console.log(i, len - 1)
			// 				return true;
			// 			} else if (!data[i].checked) {
			// 				return false;
			// 			}
			// 		}
			// 	}
			// },
			//恢复到初始
			_initTreeData(data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].children) {
						data[i].checked = false;
						console.log(data[i].checked)
						this._initTreeData(data[i].children);
					} else {
						data[i].checked = false;
					}
				}
			}, 
			///////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////
			getInfo(callback) {
				this.$http.post('info', {
					company_id: this.admin_law_detail_info.company_idsss
				}).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this.infoData = {
							...data,
							energy: data.energy ? data.energy.split(',')[0].split('-') : '',
							energy5: data.energy ? data.energy.split(',')[4] : 2,
							main_process: data.main_process ? data.main_process.split(',') : []
						}
						this.workNum();
						this.changeDisabled(() => { 
								//天然气
								// var list = this.treeList;
								// list.forEach((item, index)=> {
								// 	if (item.label == '天然气' && this.infoData.energy.indexOf('2') !== -1) {
								// 		item.disabled = false;
								// 	}
								// 	if (item.label == '液化石油气' && this.infoData.energy.indexOf('4') !== -1) {
								// 		item.disabled = false;
								// 	}
								// 	if (item.label == '醇基、生物油等液体燃料' && this.infoData.energy.indexOf('5') !== -1) {
								// 		item.disabled = false;
								// 	}
								// 	if (this.infoData.main_process.indexOf('喷涂') !== -1) {
								// 		item.disabled = false;
								// 	} 
								// });
								if (this.infoData.energy.indexOf('2') !== -1) {
									lawData[2].children[1].disabled = false;
									
								}
								// 液化石油气
								if (this.infoData.energy.indexOf('4') !== -1) {
									lawData[2].children[2].disabled = false;
								}
								// 醇基、生物油等液体燃料
								if (this.infoData.energy.indexOf('5') !== -1) {
									lawData[2].children[3].disabled = false;
								}
								if (this.infoData.main_process.indexOf('喷涂') !== -1) {
									lawData[3].children[3].children[4].disabled = false;
								} 
							this.getIndustry(callback)
						});
					}


				})
			},
			changeDisabled(callback) {
				this.isShowTree = false;
				setTimeout(() => {
					var t = lawData;
					for (var i = 0; i < t.length; i++) {
						if (i > 1) {
							t[i].disabled = true;
							if (t[i].label == "能源使用安全") {
								t[i].disabled = false;
							}
							if (t[i].label == "日常管理安全") {
								t[i].disabled = false;
							}
							var c1 = t[i].children;
							if (c1 && c1.length > 0) {
								for (var j = 0; j < c1.length; j++) {
									c1[j].disabled = true;
									if (c1[j].label == '电') {
										c1[j].disabled = false;
									}
									if (c1[j].label == '管理安全') {
										c1[j].disabled = false;
									}
									if (c1[j].label == '设备安全') {
										c1[j].disabled = false;
										if (this.work1) {
											c1[j].disabled = true;
										}
									}
									if (c1[j].label == '人员安全') {
										c1[j].disabled = false;
									}
									if (c1[j].label == '特殊作业安全') {
										c1[j].disabled = false;
									}
									if (c1[j].label == '外包作业安全') {
										c1[j].disabled = false;
										if (this.work1) {
											c1[j].disabled = true;
										}
									}
									var c2 = c1[j].children;
									if (c2 && c2.length > 0) {
										console.log(33)
										for (var m = 0; m < c2.length; m++) {
											c2[m].disabled = true;
											if (c2[m].label == "电工作业") {
												c2[m].disabled = false;
											}
											if (c2[m].label == "吊装作业") {
												c2[m].disabled = false;
											}
											if (c2[m].label == "高空作业") {
												c2[m].disabled = false;
											}
										}
									}
								}
							}
						}
					}
					this.isShowTree = true;
					callback && callback()
				}, 20);
			},
			getIndustry(callback) {
				var arr = lawData;
				this.isShowTree = false;
				this.$http.post('riskInfo', {
					company_id: this.admin_law_detail_info.company_idsss
				}).then(res => {
					if (res.code == 200) {
						var datas = res.data;
						for (let i = 0; i < datas.length; i++) {
							console.log(datas[i].type, "=+++++++++++++=")
							if (datas[i].type == 1) {
								if (datas[i].state == 1) {
									this.spaceData.state = true
									arr[4].children[1].disabled = false;
								}
							}
							if (datas[i].type == 2) {
								if (this.infoData.industry_category === '建材' || this.infoData.industry_category === '食品') {
									this.workData = JSON.parse(datas[i].content).workOne || {};
								} else {
									this.workData = JSON.parse(datas[i].content).workTwo || {};
								}
								var w = this.workData;
								//动火作业 
								if (w.cutCheck || w.dcCheck) {
									arr[3].children[3].children[0].disabled = false;

								}
								// //电工作业
								// if (w.uniqueWorkNum && w.uniqueWorkNum > 0) {
								//     arr[3].children[3].children[1].disabled = false;
								// }
								//特种设备
								if (w.trainCheck || w.forkliftCheck || w.potCheck || w.stressCheck) {
									// arr[3].children[3].children[2].disabled = true;
								}

							}
							if (datas[i].type == 3) {

								if (this.infoData.industry_category === '食品') {
									this.dustData = JSON.parse(datas[i].content).dustTwo || {};
								} else {
									this.dustData = JSON.parse(datas[i].content).dustOne || {};
								}
								//可燃性粉尘
								if (datas[i].state == 1 && this.dustData.dustType.indexOf('无') == -1) {
									this.duststate = true;
									arr[4].disabled = false;
									arr[4].children[0].disabled = false;
								}
							}
							//危险化学品
							if (datas[i].type == 4) {
								let s = JSON.parse(datas[i].content),
									state = false;
								[...s.leftData, ...s.rightData].forEach((data) => {
									if (data.value) state = true
								})
								this.chemistryState = state;
								if (this.chemistryState) {
									arr[4].children[3].disabled = false;
									arr[4].children[3].children[0].disabled = false;
									arr[4].children[3].children[1].disabled = false;
								}
							}
							if (datas[i].type == 5) {
								this.furnaceState = datas[i].state
								console.log(arr[4].children[2].label, "arr[4].children[2].children[0]  arr[4].children[2]")
								if (this.furnaceState == 1) {
									arr[4].children[2].disabled = false;
								}
							}
						}
						this.isShowTree = true;
						callback && callback();
					}

				})
				console.log("data========================727", arr)
			},
			workNum() {
				this.work1 = false
				this.work10max = false
				this.work10min = false
				if (this.infoData.scale == 3) {
					this.work1 = true
				} else if (this.infoData.number_of_employees >= 10) {
					this.work10max = true
				} else if (this.infoData.number_of_employees < 10) {
					this.work10min = true
				} else {
					this.work10max = true
				}

				if (this.workData.state || this.work1) {
					lawData[3].children[1].disabled = true;
				}
				if (this.work1) {
					lawData[3].children[0].disabled = true;
				}
				console.log('判断企业规模', this.work1, this.work10max, this.work10min)
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.in_t_l_i_icon {
		font-size: 28upx;
		width: 48upx;
		height: 48upx;
		line-height: 48upx;
		text-align: center;
	}
</style>
