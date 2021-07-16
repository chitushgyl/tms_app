<template>
	<view class="About_us">
		<u-navbar :is-back="false" :border-bottom='false' title="关于我们">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="logo">
				<image src="../../images/user/about_001.png" mode="" style=""></image>
				<p>赤途冷链 {{version}}</p>
			</view>
			<view class="">
				<u-cell-group>
					<u-cell-item @click='user_get_version' title="检查更新"></u-cell-item>
					<u-cell-item title="联系我们" value="400-9206101"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<u-modal title='升级新版本' v-model="show" :content="content" :cancel-style="cancel_style" @confirm="confirm">
		</u-modal>
		<u-toast ref="uToast" />
		<u-mask :show="maskshow">
			<view class="warp upline">
				<p>当前下载进度 {{progress}}%</p>
				<u-line-progress :striped="true" :striped-active="true" :show-percent='false' active-color="#2979ff"
					:percent="progress">
				</u-line-progress>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				version: '',
				ios_version: '',
				ios_state: '',
				android_version: '',
				android_state: '',
				show: false,
				maskshow: false,
				content: '温馨提示:请升级、新版本APP为您带来更好的服务体验',
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
				downloadApkUrl: "http://ytapi.56cold.com/update/user.apk",
				iosURL: 'https://itunes.apple.com/cn/app/%E8%B5%A4%E9%80%94%E5%86%B7%E9%93%BE/id1236772364?mt=8',
				progress: 0
			}
		},
		created() {
			// 获取本地应用资源版本号  
			var that = this;
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				// console.log("当前应用版本：" + inf.version + "---" + plus.runtime.version);
				that.version = inf.version;
			});
		},
		methods: {
			//获取最新版本
			user_get_version() {
				// this.show = true;
				var data = {};
				api.user_get_version(data).then(res => {
					if (res.code == 200) {
						var latestVersion = res.data.info;
						for (var i = 0; i < latestVersion.length; i++) {
							if (latestVersion[i].os == 'ios') {
								//苹果
								this.ios_version = latestVersion[i].app_version; // 苹果版本号	 
								this.ios_state = latestVersion[i].version_state; // 苹果升级状态 1 整包升级 2 差量升级 3 不升级
							} else {
								//安卓
								this.android_version = latestVersion[i].app_version; // 安卓版本号		
								this.android_state = latestVersion[i]
									.version_state; // 安卓需要升级状态 1 整包升级 2 差量升级 3不升级									
							}
						}
						this.checkOs();
					} else {
						console.log("检测更新失败！");
					}
				})
			},
			// 比较版本判断是否升级
			/**
			 * 判断手机系统检测升级
			 */
			checkOs() {
				if (plus.os.name == 'Android') { // 	Android 用户
					// 判断版本号
					console.log(this.version)
					console.log(this.android_version)
					var isupdate = this.compareVersion(this.version, this.android_version); // 是否需要升级
					if (!isupdate) {
						this.$refs.uToast.show({
							title: '已经是最新版本了',
							position: 'bottom',
						})
						return false;
					}
					switch (this.android_state) {
						case '1':
							this.show = true;
							break;
						case '2':
							// downWgt();
							break;
						case '3':
							break;
						default:
							break;
					}
				} else { // 苹果用户
					// 判断版本号
					console.log("是苹果机");
					var isupdate = this.compareVersion(this.version, this.ios_version); // 是否需要升级
					if (!isupdate) {
						this.$refs.uToast.show({
							title: '已经是最新版本了',
							position: 'bottom',
						})
						return false;
					}
					switch (this.ios_state) {
						case '1':
							this.show = true;
							break;
						case '2':
							// downWgt();
							break;
						case '3':
							break;
						default:
							break;
					}
				}
			},
			compareVersion(ov, nv) {
				if (!ov || !nv || ov == "" || nv == "") {
					return false;
				}
				var b = false,
					ova = ov.split(".", 4),
					nva = nv.split(".", 4);
				for (var i = 0; i < ova.length && i < nva.length; i++) {
					var so = ova[i],
						no = parseInt(so),
						sn = nva[i],
						nn = parseInt(sn);
					if (nn > no || sn.length > so.length) {
						return true;
					} else if (nn < no) {
						return false;
					}
				}
				if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
					return true;
				}
			},
			confirm() {
				var that = this;
				that.show = false;
				if (plus.os.name == 'Android') {
					var dtask = plus.downloader.createDownload(that.downloadApkUrl, {
						filename: '_doc/download/'
					}, function(d, status) {
						// 下载完成
						if (status == 200) {
							plus.runtime.install(d.filename, {}, function() {
								console.log('安装成功');
							}, function(DOMException) {
								alert(JSON.stringify(DOMException));
							});
						} else {
							alert('下载失败');
						}
					});
					//监听下载
					dtask.addEventListener("statechanged", function(download, status) {
						switch (download.state) {
							case 2:
								plus.nativeUI.closeWaiting();
								break;
							case 3:
								that.maskshow = true;
								var current = parseInt(100 * download.downloadedSize / download.totalSize);
								that.progress = current
								if (current == 100) {
									that.maskshow = false
								}
								break;
							case 4:
								mui.toast("下载完成");
								plus.nativeUI.closeWaiting();
								break;
						}
					});
					dtask.start();
				} else {
					plus.runtime.openURL(that.iosURL);
				}
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
	.content {
		.logo {
			background-color: white;
			text-align: center;
			padding-top: 110px;
			padding-bottom: 110px;
			margin-bottom: 10px;

			image {
				width: 100px;
				height: 100px;
			}
		}
	}

	.upline {
		background-color: white;
		text-align: center;
		padding: 20px 15px;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 70%;
		transform: translate(-50%, -50%);

		p {
			margin-bottom: 15px;
		}
	}
</style>
