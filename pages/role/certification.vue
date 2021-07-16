<template>
	<view class="certification">
		<u-navbar :is-back="false" :border-bottom='false' title="企业认证">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="information" style="background-color: white;border-radius: 10px;margin-bottom: 20px;">
				<u-form :model="form" ref="uForm" label-width='90px' label-align='center'>
					<u-form-item label="企业名称" prop="name">
						<u-input v-model="form.name" type="text" />
					</u-form-item>
					<u-form-item label="信用代码" prop="credit">
						<u-input v-model="form.credit" type="text" />
					</u-form-item>
					<u-form-item label="真实姓名" prop="username">
						<u-input v-model="form.username" type="text" />
					</u-form-item>
					<u-form-item label="身份证号" prop="Idcard">
						<u-input v-model="form.Idcard" type="text" />
					</u-form-item>
					<u-form-item label="联系电话" prop="phone">
						<u-input v-model="form.phone" type="text" />
					</u-form-item>
				</u-form>
			</view>
			<h3>企业认证资料</h3>
			<view class="photo">
				<!-- ../images/group_img.png -->
				<view class="wrap">
					<u-row gutter="16">
						<u-col span="6">
							<view class="demo-layout bg-purple" @click="upimage('image')">
								<image v-if="image==''" src="../../images/group_img.png"
									style="width: 100%;height: 120px;" mode="">
								</image>
								<image v-else :src="image" style="width: 100%;height: 120px;" mode="">
								</image>
							</view>
							<p style='text-align: center;'>营业执照</p>
						</u-col>
						<u-col span="6" v-if="project_type!='user'&& project_type!='company'">
							<view class="demo-layout bg-purple-light" @click="upimage('certificate')">
								<image v-if="road==''" src="../../images/group_img.png"
									style="width: 100%;height: 120px;" mode="">
								</image>
								<image v-else :src="road" style="width: 100%;height: 120px;" mode="">
								</image>
							</view>
							<p style='text-align: center;'>道路运营许可证</p>
						</u-col>
					</u-row>
				</view>
				<view class="" style="padding: 0px 10px 20px;">
					<p style="color: #333333;">温馨提示：</p>
					<p>拍摄时请参考实例照片，确保拍摄照片<span style="color: #2972E9;">信息清晰可见</span></p>
					<p>遮挡、模糊或传不相关照片都将导致审核不通过</p>
				</view>
			</view>
		</view>
		<u-button type="primary" shape="circle"
			style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="submit">提交
		</u-button>
		<u-action-sheet :list="list" v-model="show" @click="PhotoAlbum"></u-action-sheet>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					credit: '',
					username: '',
					Idcard: '',
					phone: '',
					up_type: ''
				},
				list: [{
					text: '从相册中选择'
				}],
				show: false,
				image: '',
				road: '',
				self_id: '',
				project_type: '',
				images: [],
				roads: [],
			}
		},
		created() {
			this.project_type = uni.getStorageSync("project_type")
		},
		methods: {
			upimage(item) {
				this.show = true;
				this.up_type = item
			},
			//打开相册
			PhotoAlbum(index) {
				var that = this
				// 从系统相册选择文件
				plus.gallery.pick(function(path) {
					// 压缩文件
					plus.zip.compressImage({
						src: path,
						dst: "_doc/chat/gallery/" + path,
						quality: 20,
						overwrite: true
					}, function(e) {
						console.log("压缩成功" + e.target);
						// self.setAttribute('src', e.target);
						//这里开始上传图片到oss服务器
						that.toOss(e.target);
					}, function(err) {
						this.$refs.uToast.show({
							title: '图片压缩失败',
							position: 'bottom',
						})
					});
				}, function(err) {});
			},
			//上传图片到oss服务器
			toOss(fileSrc) {
				var that = this
				var o_url = 'http://api.56cold.com/index.php/up/upload_img';
				var task = plus.uploader.createUpload(o_url, {
					method: 'post',
					blocksize: 204800,
					timeout: 10
				}, function(data, status) {
					if (status == 200) {
						var temp_urlInfo = JSON.parse(data.responseText);
						if (temp_urlInfo.code == 200) {
							if (that.up_type == 'image') {
								console.log('我的图片' + JSON.stringify(temp_urlInfo.data))
								that.images = [];
								that.images.push(temp_urlInfo.data);
								that.image = temp_urlInfo.data.url;
							} else {
								that.roads = [];
								that.roads.push(temp_urlInfo.data);
								that.road = temp_urlInfo.data.url;

							}
						}
					} else {
						this.$refs.uToast.show({
							title: '上传图片失败',
							position: 'bottom',
						})
					}
				});
				task.addFile(fileSrc, {
					key: 'inputfile'
				});
				task.addData('type', 'uploadImg');
				task.start();
			},
			submit() {
				// var data = {
				// 	self_id: this.self_id,
				// 	// token: localStorage.token,
				// 	name: this.form.name,
				// 	company_code: this.form.credit,
				// 	user_name: this.form.username,
				// 	identity_number: this.form.Idcard,
				// 	tel: this.form.phone,
				// 	type: 'company',
				// 	image: this.images,
				// 	road: this.roads,
				// }
				var data = {
					self_id: null,
					name: "55555555555",
					user_name: "5555",
					identity_number: "320481199703275816",
					tel: "15995658457",
					company_code: "555555555555555555",
					type: "company",
					image: [{
						"url": "https://chitull.oss-cn-beijing.aliyuncs.com/images/2021-07-14/7045069ea00e84c05b8e11b6017e2b94.png",
						"width": 580,
						"height": 870
					}],
					road: []
				}
				api.user_attestation(data).then(res => {
					console.log(JSON.stringify(res))
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
	.content {
		width: 90%;
		margin: 10px auto 0px;
		padding-bottom: 100px;

		.photo {
			margin-top: 20px;
			background-color: white;
			border-radius: 10px;

			.wrap {
				padding: 20px 10px;
			}
		}
	}
</style>
