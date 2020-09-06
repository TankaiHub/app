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
		let _content = this.owner.$scopedSlots.content();
		return h(
			'uni-view', // 标签名称 - 第一个参数 
			[
				this.owner.$slots.default,
				h(
					'uni-view', {
						'class': {
							'slotsWrap': true
						}
					},
					[h('uni-view', _content, this.data)]
				)
			]
		)
	}
};
