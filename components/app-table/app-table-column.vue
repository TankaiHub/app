<script>
	import { mapState, mapMutations } from 'vuex'
	
	let columnIdSeed = 1;
	
	function objectAssign(target) {
		for (let i = 1, j = arguments.length; i < j; i++) {
			let source = arguments[i] || {};
			for (let prop in source) {
				if (source.hasOwnProperty(prop)) {
					let value = source[prop];
					if (value !== undefined) {
						target[prop] = value;
					}
				}
			}
		}

		return target;
	};
	const defaults = {
		default: {
			order: ''
		},
		selection: {
			width: 48,
			minWidth: 48,
			realWidth: 48,
			order: '',
			className: 'el-table-column--selection'
		},
		expand: {
			width: 48,
			minWidth: 48,
			realWidth: 48,
			order: ''
		},
		index: {
			width: 48,
			minWidth: 48,
			realWidth: 48,
			order: ''
		}
	};
	const getDefaultColumn = function(type, options) {
		const column = {};
		objectAssign(column, defaults[type || 'default']);

		for (let name in options) {
			if (options.hasOwnProperty(name)) {
				const value = options[name];
				if (typeof value !== 'undefined') {
					column[name] = value;
				}
			}
		}

		if (!column.minWidth) {
			column.minWidth = 80;
		}

		column.realWidth = column.width === undefined ? column.minWidth : column.width;

		return column;
	};
	const parseWidth = (width) => {
		if (width !== undefined) {
			width = parseInt(width, 10);
			if (isNaN(width)) {
				width = null;
			}
		}
		return width;
	};
	export default {
		props: {
			type: {
				type: String,
				default: 'default'
			},
			label: String,
			className: String,
			labelClassName: String,
			prop: String,
			width: String,
			state: String
		},
		data() {
			return {
				isSubColumn: false,
				columnConfig: {}
			}
		},
		computed: {
			...mapState(['table_data']),
			owner() {
				let parent = this.$parent;
				while (parent && !parent.tableId) {
					parent = parent.$parent;
				}
				return parent;
			},
			columnOrTableParent() {
				let parent = this.$parent;
				while (parent && !parent.tableId && !parent.columnId) {
					parent = parent.$parent;
				}
				return parent;
			}
		},
		watch: {
			label(newVal) {
				if (this.columnConfig) {
					this.columnConfig.label = newVal;
				}
			},

			prop(newVal) {
				if (this.columnConfig) {
					this.columnConfig.property = newVal;
				}
			},
			className(newVal) {
				if (this.columnConfig) {
					this.columnConfig.className = newVal;
				}
			},

			labelClassName(newVal) {
				if (this.columnConfig) {
					this.columnConfig.labelClassName = newVal;
				}
			}
		},
		created() {
			
			this.$options.render = h => h('view' , this.$slots.default);   
			let type = this.type;
			let parent = this.columnOrTableParent;
			let owner = this.owner;
			const width = parseWidth(this.width);
			this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;
			let column = getDefaultColumn(type, {
				id: this.columnId,
				label: this.label,
				prop: this.prop,
				className: this.className,
				labelClassName: this.labelClassName,
				type,
				width,
				state: this.state
			});
			this.columnConfig = column;
			// var conf = uni.getStorageSync('config') || [];
			var conf = this.table_data;
			conf.push(this.columnConfig); 
			// uni.setStorageSync("config", conf);
			this.$store.commit('set_table_data', conf);
			// console.log(conf, "??????????????")
			let _self = this;
			if (type === 'expand') { 
				owner.renderExpanded = function(data) { 
					return _self.$scopedSlots.default ?
						_self.$scopedSlots.default(data) :
						_self.$slots.default;
				};


			}
		},
		methods:{
			...mapMutations(['set_table_data'])
		}
	}
</script>
