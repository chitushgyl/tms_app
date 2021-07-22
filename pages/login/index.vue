<template>
	<view class="content">
		<view class="box">
			<view class="tit">
				<p style='color: #1D2026;font-size: 23px;'>欢迎登录赤途</p>
			</view>
			<form>
				<view class="uni-form-item uni-column">
					<input class="uni-input" name="input" v-model="phone" maxlength="11" placeholder="请输入手机号"
						style="height: 50px;border-bottom: 1px solid #ccc;" />
				</view>
				<view class="uni-form-item uni-column" style="position: relative;" v-if="showpass==true">
					<input class="uni-input" name="inputPwd" v-model="codes" maxlength="4" placeholder="请输入验证码"
						style="height: 50px;border-bottom: 1px solid #ccc;" />

					<button type="button" @click="submit" class="mui-btn mui-btn-primary mui-btn-outlined shadowbutton"
						v-if="showText==true">发送验证码</button>
					<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined shadowbutton"
						v-else>{{second}} S后重新发送</button>
				</view>
				<view class="uni-form-item uni-column pass" style="position: relative;" v-else>
					<!-- <u-input v-model="password" type="password" password-icon="passwordIcon"
						style="height: 50px;border-bottom: 1px solid #ccc;" /> -->
					<input :type="showPassword?type_password:type_text " class="uni-input" name="inputPwd"
						v-model="password" placeholder="请输入密码" style="height: 50px;border-bottom: 1px solid #ccc;" />
					<span class="Eyes">
						<image src="../../images/login/noeye.png" v-if="showPassword" style=" width:20px; height:12px;"
							v-model="codeVal" @click="xs" title="显示密码" />
						<image src="../../images/login/eyes.png" v-else style=" width:20px; height:12px;" @click="xs"
							title="隐藏密码" />
					</span>
				</view>
				<view class="uni-btn-v" style="margin-top: 32px;padding-bottom:10px;">
					<u-button type="primary" style="border-radius: 22px;" @click="foot">登录</u-button>
				</view>
				<p @click='pass' v-if='showpass==true'>使用账户密码登录</p>
				<p @click='code' v-else>使用验证码登录</p>
			</form>
			<view class="agreement">
				<label>
					<image src="../../images/login/checked.png" class="radioimg">
				</label>
				<p class=''>登录即代表阅读并同意 <span>《用户协议》</span>和<span>《隐私政策》</span></p>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				phone: '',
				codes: '',
				password: '',
				switchStatus: 1,
				hadsendCode: false,
				showText: true,
				second: 60,
				showpass: true,
				passwordIcon: false,
				eye: true,
				showPassword: true,
				type_password: 'password',
				type_text: "text",
				codeVal: ''
			}
		},
		onLoad() {

		},
		created() {},
		methods: {

			// 获取验证码
			submit() {
				var that = this;
				// 判断登录方式
				if (that.switchStatus == 1 && !that.hadsendCode) { // 验证码登陆且还未发送验证码
					// 	// 获取手机号,验证手机号格式
					if (!(/^1[345789]\d{9}$/.test(that.phone))) {
						// mui.toast("请填写正确的手机号码");
						this.$refs.uToast.show({
							title: '请填写正确的手机号码',
							type: 'warning',
							// url: '/pages/user/index'
						})
						return false;
					}
					this.showText = false;
					var data = {
						tel: that.phone
					}
					var time = 60;
					var timer = null;
					timer = setInterval(function() {
						// 定时器到底了 兄弟们回家啦
						if (that.second == 1) {
							clearInterval(timer);
							that.showText = true;
							that.second = 0
						} else {
							console.log('hehe')
							that.second--;
						}
					}, 1000)

				} else if (switchStatus == 2) { // 密码登录
					console.log('12345')
				}
			},
			//切换登录方式
			pass() {
				this.showpass = false;
				// this.showPassword = true;
			},
			code() {
				this.showpass = true;
				// this.showPassword = false;
			},
			//隐藏显示密码
			xs() {
				this.showPassword = !this.showPassword;
			},

			foot() {
				console.log('这是数据' + this.uniurl)
				if (this.showpass) {
					var data = {
						clientid: "clientid",
						tel: this.phone,
						code: this.codeVal,
						id_type: "carriage",
					};
					api.login_tel_login(data).then(res => {
						// console.log(JSON.stringify(res))
						// return false
						if (res.code == '200') {
							uni.setStorageSync('ftoken', res.ftoken);
							uni.setStorageSync('dtoken', res.dtoken);
							uni.setStorageSync('project_type', res.project_type);
							// uni.switchTab({
							// 	url: '/pages/3pl_user/car_info'
							// });
							uni.navigateTo({
								url: '/pages/3pl_user/car_info'
							});
						} else {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'warning',
								position: 'bottom'
							})
						}
					});
				} else {
					if (!(/^1[345789]\d{9}$/.test(this.phone))) {
						this.$refs.uToast.show({
							title: '请填写正确的手机号码',
							type: 'warning',
						})
						return false;
					}
					console.log('123')
					var data = {
						clientid: "clientid",
						tel: this.phone,
						password: this.password,
						id_type: "carriage",
					};
					api.login(data).then(res => {
						// console.log(JSON.stringify(res))
						// return false
						if (res.code == '200') {
							uni.setStorageSync('ftoken', res.ftoken);
							uni.setStorageSync('dtoken', res.dtoken);
							uni.setStorageSync('project_type', res.project_type);
							uni.switchTab({
								url: '/pages/3pl_user/car_info'
							});
							// if (self.list[index].system_admin) {
							// 	localStorage.group_code = self.list[index].system_admin.group_code
							// }
							// uni.navigateTo({
							// 	url: '/pages/3pl_user/car_info'
							// });
						} else {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'warning',
								position: 'bottom'
							})
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	body {
		width: 100%;
		height: 100%;
	}

	uni-page-wrapper {
		background-color: #fff !important;
	}

	uni-input {
		height: 50px !important;
	}

	.content {
		height: 100%;
		background-color: #fff;

		.box {
			border-top: 1px solid #EEEEEE;
			padding-top: 50px;
			height: 100%;
			width: 80%;
			margin: auto;
			position: relative;

			.Eyes {
				position: absolute;
				top: 17px;
				right: 15px;
			}

			.shadowbutton {
				width: 100px;
				height: 35px;
				line-height: 35px;
				position: absolute;
				right: 0px;
				bottom: 8px;
				font-size: 10px;
				color: #A3ACBF;
				border: 1px solid #A3ACBF;
			}

			.tit {
				margin: 50px auto 75px;
			}

			.agreement {
				position: absolute;
				left: 0px;
				bottom: 20px;
				font-size: 12px;

				uni-label {
					image {
						width: 15px;
						height: 15px;
					}
				}

				p {
					display: inline-block;
				}
			}
		}

	}
</style>
