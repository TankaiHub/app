<template>
	<view class="cmp_picker_select_value_container">
		<view class="cmp_p_s_v_wrap">
			<input type="text" v-model="selectVal" disabled />
			<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column> 
					<view class="item" v-for="(item,index) in selectData" :key="index">
						<text>{{item}}</text> 
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			selectData:Array
		},
		data() {
			return{
				selectVal:'',
				value: [0],
				/*
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
			}
		},
	}
</script>

<style>
</style>
