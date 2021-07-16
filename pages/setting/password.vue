<template>
	<view class="setting">
		<u-navbar :is-back="false" :border-bottom='false' title="设置登录密码">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<!-- 正文内容 -->
			<view class="" style="background-color: white;padding-bottom: 20px;">
				<p style='padding:20px;color: #2972E9;'>温馨提示: 初次用短信登录的用户,初始密码为 123456</p>
				<u-form :model="form" ref="uForm" label-width='90px' label-align='center'>
					<u-form-item label="原始密码" prop="oldpasword">
						<u-input v-model="form.oldpasword" :type="type" :password-icon="passwordIcon" />
					</u-form-item>
					<u-form-item label="新密码" prop="newpassword">
						<u-input v-model="form.newpassword" :type="type" :password-icon="passwordIcon" />
					</u-form-item>
					<u-form-item label="确人密码" prop="newpasswords">
						<u-input v-model="form.newpasswords" :type="type" :password-icon="passwordIcon" />
					</u-form-item>
				</u-form>
				<u-button style="margin: 20px 10px 0px;" @click="show=true" type="primary" shape="circle">保存</u-button>
			</view>
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
				form: {
					oldpasword: '',
					newpassword: '',
					newpasswords: ''
				},
				rules: {
					oldpasword: [{
						required: true,
						min: 5,
						message: '原始密码不能少于5个字',
						trigger: 'change'
					}],
					newpassword: [{
						required: true,
						min: 5,
						message: '新密码不能少于5个字',
						trigger: 'change'
					}],
					newpasswords: [{
						required: true,
						min: 5,
						message: '确人密码不能少于5个字',
						trigger: 'change'
					}],
				},
				type: 'password',
				passwordIcon: true,
				show: false,
				content: '你确定要修改当前密码吗？',
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
			}
		},
		methods: {
			confirm() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let data = {
							password: this.form.oldpasword,
							new_pwd: this.form.newpassword,
							com_pwd: this.form.newpasswords
						}
						api.update_password(data).then(res => {
							console.log('res' + JSON.stringify(res))
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: res.msg,
									type: 'success',
									position: 'bottom'
								})
								uni.removeStorageSync('ftoken');
								uni.removeStorageSync('dtoken');
								uni.removeStorageSync('project_type');
								uni.reLaunch({
									url: '/pages/login/index'
								})
							}

						})
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	page {
		background-color: #F3F4F6;
	}
</style>
<style lang="scss" scoped>
	.u-input[data-v-460c1d26] {
		padding-right: 25px !important;
	}
</style>
