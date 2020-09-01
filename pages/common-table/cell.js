import show from './show.vue'
export default{
	props:{
		data:[String, Number, Array, Object],
		isBorder:{
			type:Boolean,
			default:false
		}
	},
	components:{
		show
	},
	render(h) {
		var temp = this.data;  
		console.log(temp)
		return h(show, {
			props:{
				data:temp,
				w:temp.w,
				keyW: temp.keyW,
				isBorderTop:this.isBorder 
			}
		});
	},
}