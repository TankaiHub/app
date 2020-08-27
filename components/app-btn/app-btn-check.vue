<template>
	<view class="cmp_btn_check_container mar_top_10px mar_bottom_10px">
		<checkbox-group @change="onChange">
			<label>
				<checkbox :value="value" :checked="check" /><text class="font_weight_bold">{{text}}</text>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
	export default{
		props:{
			text:{
				type:String,
				default:''
			},
			check:Boolean
		},
		data() {
			return{
				value:'cb',
				isChecked:false
			}
		},
		methods:{
			onChange(e) {
				var val = e.detail.value;
				var flag = false;
				if (val.length > 0) {
					flag = true;
				}else {
					flag = false;
				}
				this.$emit("change", flag);
			}
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
	.cmp_btn_check_container{
		
	}
</style>
