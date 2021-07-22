<template>
	<!-- <view class="uni-tabbar">
		<view class="uni-tabbar__item" v-for="(item,index) in list" :key="index" @tap="changeTab(item)">
			<view class="icon" :class="[item.fontIcon , item.pagePath == pagePath?'uni-active':'']"></view>
			<view v-if="false" class="uni-tabbar__bd">
				<view class="uni-tabbar__icon">
					<image v-if="item.pagePath == pagePath" class="uni-w-42 uni-h-42" mode="aspectFit"
						:src="item.selectedIconPath"></image>
					<image v-else class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.iconPath"></image>
				</view>
			</view>
			<view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
				{{item.text}}
			</view>
		</view>
	</view> -->
	<view class="uni-tabbar">
		<view class="uni-tabbar__item" v-for="(item,index) in list" :key="index" @tap="changeTab(item)">
			<!-- 	<view class="icon" :class="[item.fontIcon , item.app_url == app_url?'uni-active':'']"></view> -->
			<view class="uni-tabbar__bd">
				<view class="uni-tabbar__icon">
					<image v-if="item.app_url == app_url" style="width:22px; height: 22px;" class="uni-w-42 uni-h-42"
						mode="aspectFit" :src="item.active_img"></image>
					<image v-else style="width:22px; height: 22px;" class="uni-w-42 uni-h-42" mode="aspectFit"
						:src="item.inactive_img"></image>
				</view>
			</view>

			<view class="uni-tabbar__label" :class="{'active': item.app_url == app_url}">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		props: {
			app_url: null
		},
		data() {
			return {
				current: 0,
				// list: [{
				// 		"pagePath": "/pages/3pl_user/car_info",
				// 		// "iconPath": "/static/tabBar/home.png",
				// 		// "selectedIconPath": "/static/tabBar/home_col.png",
				// 		"text": "整车",
				// 		"fontIcon": "icon-shouye"
				// 	},
				// 	{
				// 		"pagePath": "/pages/3pl_line/index",
				// 		// "iconPath": "/static/tabBar/person.png",
				// 		// "selectedIconPath": "/static/tabBar/person_col.png",
				// 		"text": "零担",
				// 		"fontIcon": "icon-wode"
				// 	},
				// 	{
				// 		"pagePath": "/pages/user/index",
				// 		// "iconPath": "/static/tabBar/person.png",
				// 		// "selectedIconPath": "/static/tabBar/person_col.png",
				// 		"text": "我的",
				// 		"fontIcon": "icon-wode",
				// 	}
				// ]
				list: []
			}
		},
		created() {
			this.user_foot()
		},
		methods: {
			user_foot() {
				var projectType = uni.getStorageSync("project_type");
				var data = {
					project_type: projectType
				};
				api.user_foot(data).then(res => {
					// console.log(res);
					if (res.code == 200) {
						this.list = res.data
					}
				});
			},
			changeTab(item) {
				// console.log(item)
				var page = item.app_url;
				// 这里使用reLaunch关闭所有的页面，打开新的栏目页面
				// console.log(page)
				uni.reLaunch({
					url: page
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		color: #1ca6ec;
	}

	[nvue] uni-scroll-view,
	[nvue] uni-swiper-item,
	[nvue] uni-view {
		flex-direction: unset;
	}

	[nvue-dir-column] uni-swiper-item,
	[nvue-dir-column] uni-view {
		flex-direction: unset;
	}

	.uni-tabbar {
		position: fixed;
		bottom: 0;
		z-index: 999;
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 60px;
		padding: 16upx 0;
		box-sizing: border-box;
		border-top: solid 1upx #ccc;
		background-color: #fff;
		box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);

		.uni-tabbar__item {
			display: block;
			line-height: 24upx;
			font-size: 20upx;
			text-align: center;
		}

		.uni-tabbar__icon {
			height: 42upx;
			line-height: 42upx;
			text-align: center;
		}

		.icon {
			display: inline-block;
		}

		.uni-tabbar__label {
			line-height: 24upx;
			font-size: 24upx;
			color: #999;

			&.active {
				color: #1ca6ec;
			}
		}
	}
</style>
