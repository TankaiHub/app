<template>
	<view class="com_app_input-search">
		<view class="c_a_i_s_wrap">
			<input class="c_a_i_s_input" v-model="searchVal" confirm-type="search" placeholder="请输入社信代码或者企业名称" auto-focus @confirm="search"
			 @input="onKeyInput" placeholder-class="tui-input-plholder" />
			<view hover-class="hoverClass" @click="onSearch" class="c_a_i_s_btn">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal:''
			}
		},
		methods: {
			search() {

			},
			onKeyInput() {

			},
			onSearch() {
				this.$emit("onSearch", this.searchVal);
			}
		}
	}
</script>

<style lang="less">
	.com_app_input-search {
		width: 100%;
		height: 35px;
		border: 1px solid #ccc;
		border-radius: 5px;
		overflow: hidden;

		.c_a_i_s_wrap {
			position: relative;
			width:100%;
			height:35px;
			.c_a_i_s_input {
				position: absolute;
				top: 0;
				left: 0;
				margin-left: 10px;
				width: 75%;
				height: 35px;
				line-height: 35px;
				font-size: 14px;
			}

			.c_a_i_s_btn {
				position: absolute;
				top: 0;
				right: 0;
				width: 20%;
				height: 35px;
				line-height: 35px;
				text-align: center;
				background-color: #54a0ff;
				color: #fff;
				border: 1px solid #54a0ff;
				font-size: 14px;
				&.hoverClass{
					background-color: #66b1ff;
				}
			}
		}
	
	}
</style>
