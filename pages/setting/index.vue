<template>
	<view class="setting">
		<u-navbar :is-back="false" :border-bottom='false' title="设置">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<!-- 正文内容 -->
			<view class="">
				<u-cell-group>
					<u-cell-item @click='operation(1)' title="用户指南"></u-cell-item>
					<u-cell-item @click='operation(2)' title="法律条款"></u-cell-item>
					<u-cell-item @click='operation(3)' title="用户协议"></u-cell-item>
					<u-cell-item @click='operation(4)' title="隐私政策"></u-cell-item>
					<u-cell-item @click='operation(5)' title="关于我们"></u-cell-item>
					<u-cell-item @click='operation(6)' title="密码设置"></u-cell-item>
					<u-cell-item @click='cancellation' title="注销注销账户"></u-cell-item>
				</u-cell-group>
			</view>
			<u-button style="margin-top: 10px;" @click="show=true">退出</u-button>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="show" :content="content" :show-cancel-button='true' :cancel-style="cancel_style"
			@confirm="confirm"></u-modal>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				show: false,
				content: '你确定要退出当前账号吗？',
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
			}
		},
		methods: {
			//判断要进入哪个页面
			operation(item) {
				switch (item) {
					case 1:
						uni.navigateTo({
							url: '/pages/setting/user_guide'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/setting/Legal_provisions'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/setting/User_agreement'
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/setting/Privacy_policy'
						})
						break;
					case 5:
						uni.navigateTo({
							url: '/pages/setting/About_us'
						})
						break;
					case 6:
						uni.navigateTo({
							url: '/pages/setting/password'
						})
						break;

				}
			},
			//退出
			confirm() {
				uni.removeStorageSync('ftoken');
				uni.removeStorageSync('dtoken');
				uni.removeStorageSync('project_type');
				uni.reLaunch({
					url: '/pages/login/index'
				})
			},
			cancellation() {
				uni.showModal({
					title: '提示',
					content: '确定要注销当前账户吗？ 账户注销后数据将被清空！',
					success(res) {
						if (res.confirm) {
							var data = {}
							api.update_password(data).then(res => {
								uni.removeStorageSync('ftoken');
								uni.removeStorageSync('dtoken');
								uni.removeStorageSync('project_type');
								uni.reLaunch({
									url: '/pages/login/index'
								})
							})
						}
					}
				})

			}
		}
	}
</script>

<style>
	page {
		background-color: #F3F4F6;
	}
</style>
<style lang="scss" scoped>
	.u-hairline-border[data-v-6e15e680]:after {
		display: none;
	}
</style>
