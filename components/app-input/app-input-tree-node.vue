<template>
	<view class="cmp_app_input_tree_node_container mar_bottom_10px">
		<view class="cmp_in_t_n_wrap clearfix">
			<!-- <view class="cmp_yq_wrap clearfix">
				<view class="in_t_l_i_icon float_left mar_right_10px">
					<view v-if="node && node.children && node.children.length > 0" @click="onUnfold(node)">V</view>
				</view>
				<view class="in_t_l_i_wrap float_left">
					<checkbox-group @change="checkboxChange($event, node)">
						<view>
							<checkbox :value="node.label" :disabled="node.disabled" :checked="node.checked" />
						</view>
					</checkbox-group>
				</view>
				<view class="float_left" :class="{ color_ccc:node.disabled }" @click="onUnfold(node)">{{node.label}}</view>
			</view>

			<view class="mar_left_30px" v-show="node && node.children && node.children.length > 0 && node.isUnfold">
				<view class="" v-for="( ele, indx ) in node.children" :key="indx">
					<node :node="ele" @onChange="onChange"></node>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		props: {
			node: {
				type: Object,
				default: {}
			},
			treeState: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				arr: []
			}
		},
		watch: {

			"node.checked": {
				handler(newVal, oldVal) {
					if (newVal) {
						if (this.node.children) return;
						this.$store.commit("set_admin_law_add_law_plan_arr", {
							label: this.node,
							bool: true
						});
					}
					if (oldVal) {
						var arr = this.admin_law_add_law_plan_arr;
						for (var i = 0; i < arr.length; i++) {
							if (this.node.label == arr[i].label) {
								arr.splice(i, 1);

							}
						}
						this.$store.commit("set_admin_law_add_law_plan_arr", {
							label: arr,
							bool: false
						})
					}
				}
			}
		},
		computed: {
			...mapState(['admin_law_add_law_plan_arr']),
		}, 
		created() {

		},
		
		methods: {
			...mapMutations(['set_admin_law_add_law_plan_arr']),
			
			
			/////扁平化数据
			//check box
			checkboxChange(e, node) {
				var val = e.detail.value;
				var obj = {
					val,
					index: node.level
				};
				if (val.length > 0) {
					obj.bool = true;
					node.checked = true;
					this._changeData(node.children, true);
				} else {
					obj.bool = false;
					node.checked = false;
					this._changeData(node.children, false);
				}

				this.$emit('onChange', obj);
			},
			//node  
			onChange(e) {
				this.$emit('onChange', e);
			},
			//展开节点
			onUnfold(node) {
				if (node.isUnfold) {
					node.isUnfold = false;
				} else {
					node.isUnfold = true;
				}
				this.$emit("onUnfold", node);
			},
			//拿到  == 循环data的children  直到没有children 通过bool设置是否选中
			_changeData(data, bool) {
				var len;
				try {
					len = data.length;
				} catch (e) {
					len = 0;
				}
				if (len > 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].children) {
							this._changeData(data[i].children, bool);
						}
						if (data[i].disabled) continue;
						if (bool) {
							data[i].checked = true;
						} else {
							data[i].checked = false;
						}
					}
				}
			},

		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");

	.cmp_app_input_tree_node_container {
		.cmp_in_t_n_wrap {
			.cmp_yq_wrap {
				.in_t_l_i_icon {
					font-size: 28upx;
					width: 48upx;
					height: 48upx;
					line-height: 48upx;
					text-align: center;

					view {
						border: 1px solid #CCCCCC;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>
