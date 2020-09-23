<template>
	<view class="cmp_title_container">
		<view class="c_t_wrap">
			{{text}}
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: String
		}
	}
</script>

<style lang="less">
	.cmp_title_container {

		.c_t_wrap {
			position: relative;
			padding-left: 10px;
			line-height: 35px;
			color: #54a0ff;
			font-size: 15px;
			text-align: left;
			font-weight: 700;

			&::after {
				content: "";
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
				width: 4px;
				height: 22px;
				color: #505050;
				background-color: #54a0ff;
				border-radius: 2px;
				font-size: 14px;
			}
		}
	}
</style>
