export default {
	props: {
		data: Object 
	},
	computed: {
		owner() {
			let parent = this.$parent;
			while (parent && !parent.tableId) {
				parent = parent.$parent;
			}
			return parent;
		},
	},
	render: function(h) {
		let col = this.owner.$scopedSlots.col();
		return h(
			'uni-view', // 标签名称 - 第一个参数 
			[
				this.owner.$slots.default, 
				h(
					'uni-view',
					[h('uni-view', col, this.data)]
				)
			]  
		)
	}
};
