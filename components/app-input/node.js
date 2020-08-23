import appTreeNode from "./app-input-tree-node.vue"
import { merge } from "@/common/js/base.js"
import { mapState, mapMutations } from "vuex"
export default{
	props:{
		node:{
			type:Object,
			default:{}
		}
	},
	computed:{
		...mapState(['admin_law_add_law_plan_arr']),
	},
	watch:{
		
	},
	components:{
		appTreeNode
	},
	render(h, opts) {
		var node = merge(this.node);
		var _self= this;
		// return this.createNode(h, appTreeNode, {
		// 	props:{
		// 		node
		// 	}
		// }); 
		return h(appTreeNode, {
			props:{
				node,
				index:node.level
			},
			on:{
				onChange(e) {  
					
					if (node.children) {
							
					}else {
						e.index = node.level;
					}
					_self.$emit('onChange', e);
				}
			}
		});
	},
	methods:{
		...mapMutations(['set_admin_law_add_law_plan_arr']),
		createNode(h, cmp, obj) {
			var node;
			var item = obj.props.node;
			var len;
			try{
				len = item.child.length;
			}catch(e){
				len = 0;
			}
			console.log(len, "len") ;
			while(len --) {
				if (len == 0) break;
				// node = this.createNode(h, cmp, obj);
				console.log(item)
			}
			// return node;
		}
	}
}