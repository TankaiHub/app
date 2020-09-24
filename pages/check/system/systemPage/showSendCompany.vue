<template>
	<view class="app_showSendCompany_container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="onNavBarLeft" title="发送邮件-选择"></uni-nav-bar>
		<view class="showSendCompany_wrap">
			<uni-list>
				<uni-list-item :title="`${index+1}、${item}`" :showArrow="false" v-for="(item, index) in admin_email_send.company_name" :key="index">
					<view class="a_l_p_bk_list_item_right" slot="right">
						<image src="../../../../static/icon/del.png" class="img_size_40px" mode="aspectFill" @click="onDelete('company_name', 'company_id',item, index)"></image>
					</view>
				</uni-list-item>
				<uni-list-item :title="`${admin_email_send.company_name.length + index+1}、${item}`" :showArrow="false" v-for="(item, index) in admin_email_send.son_name" :key="index+'_'">
					<view class="a_l_p_bk_list_item_right" slot="right">
						<image src="../../../../static/icon/del.png" class="img_size_40px" mode="aspectFill" @click="onDelete('son_name', 'r_admin_number', item, index)"></image>
					</view>
				</uni-list-item>
			</uni-list>
			<view class="not_data" v-if="admin_email_send.length == 0">
				没有数据
			</view>
			<button type="primary" class="width150px" @click="onSendNext">下一步</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return{
				
			}
		},
		computed: {
			...mapState(['admin_email_send']),
		},
		methods:{
			...mapMutations(['set_admin_email_send']),
			onNavBarLeft() {
				uni.navigateBack();
			},
			onSendNext() {
				if (this.admin_email_send.length == 0) {
					uni.showToast({
						title:'请选择',
						icon:'none'
					})
					return;
				}
				uni.navigateTo({
					url:'./companyMsgSend'
				})
			},
			onDelete(tag, other,item, index) {
				// this.admin_email_send.splice(index, 1);
				this.admin_email_send[tag].splice(index, 1);
				this.admin_email_send[other].splice(index, 1);
				this.$store.commit('set_admin_email_send', this.admin_email_send);
			},
		}
	}
</script>

<style lang="less">
	@import url("@/common/less/base.less");
</style>
