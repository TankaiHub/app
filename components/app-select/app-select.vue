<template>
	<view class="cmp_app_select_container">
		<!--  -->
		<view class="c_a_s_text_wrap"  @click="onSelect" hover-class="isSelect">
			<text>{{number}}条/页</text>
			<!-- <input type="text" v-model="number" disabled @focus="onSelect" /> -->
			<text :class="{c_a_s_icon:true, is_reverse:isShowSelect}">V</text>
		</view>
		<view class="c_a_s_pagin_wrap" v-if="isShowSelect">
			<view class="c_a_s_top"></view> 
			<view class="c_a_s_item" :class="{ isActive:index == activeIndex }" @click="onItem(item, index)" v-for="(item, index) in paginationData" :key="index">{{item}}条/页</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			 
			
		},
		data () {
			return {
				paginationData: [10, 20, 50, 100],
				number:10,
				isShowSelect:false,
				activeIndex:0
			}
		},
		methods:{
			onSelect() {
				this.isShowSelect = !this.isShowSelect;
			},
			onItem(item, index) {
				var oldVal = this.number;
				this.number = item;
				this.isShowSelect = false;
				this.activeIndex = index;
				if (oldVal == this.number) return;
				this.$emit("onSelectItem", item);
				
			}
		}
	}
</script>

<style lang="less">
	.cmp_app_select_container{
		position: relative;
		width:100%;
		height:30px;
		line-height: 30px;
		
		text-align: center;
		.c_a_s_text_wrap{
			border:1px solid #ccc;
			border-radius: 5px;
			.c_a_s_icon{
				display: inline-block; 
				transition: all .3s;
				&.is_reverse{
					transform: rotateZ(180deg);
					
				}
			}
			&.isSelect{
				border-color: #409EFF;
				
			}
		}
		.c_a_s_pagin_wrap{
			margin-top:5px;
			position: relative;
			border:1px solid #ccc;
			border-radius: 5px;
			z-index: 999;
			background-color: #fff;
			.c_a_s_top{
				position: absolute;
				top:-15px;
				left:50%;
				transform: translateX(-50%);
				width:20px;
				height:20px;
				&::after{
					content: "";
					position: absolute;
					top:0;
					left:0;
					width:0;
					height:0;
					border-width: 8px;;
					border-style: solid;
					border-color: transparent transparent #ccc transparent;
					z-index:8;
				}
				&::before{
					content:'';
					position: absolute;
					top:2px;
					left:0;
					width:0;
					height:0;
					border-width: 8px;;
					border-style: solid;
					border-color: transparent transparent  #fff transparent;
					z-index:9;
				}
			}
			.c_a_s_item{ 
				padding:5px 0;
				width:100%; 
				border-bottom:1px solid #ccc;
				box-sizing: border-box;
				border-radius: 5px;
				&:last-child{
					border-bottom: none;
				}
				&.isActive{
					color:#007AFF;
				}
				
			}
		}
	}
</style>
