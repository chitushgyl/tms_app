<template>
	<view class="user" style="width: 100%;height: 100%; background-color: #F3F4F6;">
		<u-navbar :is-back="false" :border-bottom='false' title="我的" title-color='white' :background="background">
			<view class="navbar-right" slot="right" @click="setting">
				<view class="message-box right-item" style="padding-right: 20rpx;">
					<!-- <u-icon @click="exit()" name="setting" color="white" size="50"></u-icon> -->
					<image src="../../images/user/set.png" mode="" style="width: 20px;height: 20px;"></image>
				</view>
			</view>
		</u-navbar>
		<view class="contact_top" style="background-color: #0088F4;padding-top:45px;padding-bottom:45px;">
			<view>
				<u-row gutter="16">
					<u-col span="1"></u-col>
					<u-col span="2">
						<!-- <u-avatar bg-color="#0088F4" src="../../images/user/personimg.png">
						</u-avatar> -->
						<view class="">
							<image src="../../images/user/personimg.png" mode="" style="width: 41px; height: 41px;">
							</image>
						</view>
					</u-col>
					<u-col span="4">
						<span style='color: white;'>{{tel}}</span>
						<br>
						<span style='color: white;'>{{type_name}}</span>
						<!-- <view class="demo-layout bg-purple-light"></view> -->
					</u-col>

				</u-row>

			</view>
		</view>
		<view v-for="(item,index) in userlist" :key='index'>
			<view class=""
				style="width: 90%;background-color: #363D58;height: 50px;transform: translateY(-50%);margin: 0 auto;border-radius: 5px;"
				v-if="item.type=='attestation'">
				<!-- <span v-if="group_name!==null"
					style="float:left;font-weight:normal;height: 50px;line-height: 50px;margin-left: 20px; color: white;"
					v-cloak>{{item.group_name}}</span>-->
				<span style="font-weight:normal; height: 50px;line-height: 50px;margin-left: 20px;color: white;"
					v-cloak>{{item.title_show}}</span>
				<image class="" :src="item.inactive_img"
					style="float:right;width:70px; height: 25px; transform: translateY(50%); margin-right:20px;"
					@click="role">
				</image>
			</view>
			<view class="" style="width: 90%;background-color: white;margin: -25px auto 0; border-radius: 10px;"
				v-if="item.type=='list'">
				<u-row gutter="16">
					<u-col span="4" v-for="(item2,index2) in item.sys_foot" :key='index2'>
						<view class="demo-layout bg-purple u-text-center" style="margin-top:10px;margin-bottom: 10px;">
							<p>{{item2.number}}</p>
							<p>{{item2.name}}</p>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="" style="width: 90%;background-color: white;margin:10px auto; border-radius: 10px;"
				v-if="item.type!='list'">
				<u-row gutter="16" v-if="item.type!='attestation'&& item.type!='list'">
					<u-col span="3">
						<view class="demo-layout bg-purple u-text-center"
							style="margin-top:10px;margin-bottom: 10px;font-size: 17px; font-weight: 600;">
							{{item.name}}
						</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="3" v-for="(item2,index2) in item.sys_foot" :key='index2'>
						<view class="demo-layout bg-purple u-text-center" style="margin-bottom: 10px;">
							<image :src="item2.inactive_img" style="width:35px;height: 35px;" mode=""></image>
							<p>{{item2.name}}</p>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>



		<!-- <tabBar></tabBar> -->
	</view>
</template>

<script>
	import api from '@/api/api.js';
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#0088F4',
				},
				user: [],
				userlist: [],
				group_name: '',
				tel: '',
				type_name: ''
			}
		},
		onLoad: function() {
			console.log(1)
		},
		created() {
			this.user_owm()
		},
		methods: {
			//我的页面数据
			user_owm() {
				var that = this
				var projectType = uni.getStorageSync("project_type")
				var data = {
					project_type: projectType
				};
				api.user_owm(data).then(res => {
					that.user = res.data;
					that.userlist = res.info;
					that.group_name = res.data.group_code;
					that.tel = res.data.tel;
					if (res.data.type == user) {
						that.type_name = '司机'
					}
					uni.setStorageSync('group_code', res.data.group_code);
					console.log('我的页面返回数据' + JSON.stringify(res))
				})
			},
			//页面跳转
			role() {
				uni.navigateTo({
					url: '/pages/role/index'
				})
			},
			setting() {
				uni.navigateTo({
					url: '/pages/setting/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
</style>
