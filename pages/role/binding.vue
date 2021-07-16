<template>
	<view class="binding">
		<u-navbar :is-back="false" :border-bottom='false' title="绑定角色">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<h3>账号密码添加</h3>
			<!-- <u-form :model="form" ref="uForm">
				<u-form-item label="姓名">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="简介">
					<u-input v-model="form.intro" />
				</u-form-item>
			</u-form> -->
			<u-input v-model="form.name" />
			<u-input v-model="form.name" />
			<u-button type="primary" shape="circle" style="margin-top: 20px;margin-bottom: 20px;">提交
			</u-button>
			<p>注：该账号为企业管理严提供</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: ''
				}
			}
		}
	}
</script>

<style>
	page {
		/* background-color: #F3F4F6; */
	}
</style>
<style lang="scss" scoped>
	.content {
		width: 90%;
		margin: 10px auto 0px;
		padding-bottom: 20px;
		// background-color: white;
		border-radius: 10px;
	}
</style>
