<template>
	<view class="3pl_line" style="background-color: #F3F4F6;width: 100%;height: 100%;">
		<u-navbar :is-back="false" title="零担列表"></u-navbar>
		<view class="content">
			<view class="">
				<u-dropdown :border-bottom='true'>
					<u-dropdown-item v-model="value1" title="默认排序" :options="options1"></u-dropdown-item>
					<u-dropdown-item class="send" title="始发地">
						<view class="slot-content" style="background-color: #FFFFFF;">
							<view style="padding-top:10px;">
								<span class='adress' style='margin-left: 15px;margin-right: 30px;'>{{allsheng}}</span>
								<span class='adress' style=''>{{allshi}}</span>
							</view>
							<view class="">
								<view class="top u-padding-top-10"
									style="height: 40px; border-bottom: 1px solid #c8c7cc;">
									<view v-for="(item1,index1) in list" :key='index1' @click="qieh(index1)"
										style="display: inline-block;margin-left: 15px" :class="{tab:current==index1}">
										{{item1.name}}
									</view>
								</view>
								<view class="swiper-bottom bg_white" style="height: 300px;">
									<swiper :duration="500" :current="current" :data-index='current' @change="toggle"
										circular style="height: 290px;">
										<swiper-item>
											<scroll-view scroll-y="true" style="height: 300px;">
												<view style="padding-bottom: 30px;">
													<view
														style="width: 25%;display: inline-block;text-align: center;margin-bottom: 10px;">
														<span class='city' data="0" @click='Allstart'
															:class="{select_active:selectedcity==''}">
															全国
														</span>
													</view>
													<view v-for="(item,index) in proAllData" :key='index'
														style="width: 25%;display: inline-block;text-align: center;margin-bottom: 10px;">
														<span class='city' :data="item.id" @click='start(item)'
															:class="{select_active:selectedcity==item.id}">
															{{item.pro}}
														</span>
													</view>
												</view>
											</scroll-view>
										</swiper-item>
										<swiper-item>
											<scroll-view scroll-y="true" style="height: 300px;">
												<view style="margin-bottom: 30px;">
													<view v-for="(item,index) in newCity" :key='index'
														style="width: 25%;display: inline-block;text-align: center;margin-bottom: 10px;">
														<span class='city' :data="item.id" @click='startCity(item)'
															:class="{select_active:selectedcitys==item.id}"
															style='overflow: hidden;'>
															{{item.city}}
														</span>
													</view>
												</view>
											</scroll-view>
										</swiper-item>
									</swiper>
								</view>
							</view>
							<view class="" style="z-index: 111;">
								<u-row>
									<u-col span="6" style="padding: 0;">
										<view class="demo-layout bg-purple"
											style="height: 40px; line-height: 40px;text-align: center;border: 1px solid #ccc;background-color: white;">
											重置
										</view>
									</u-col>
									<u-col span="6" style="padding: 0;">
										<view class="demo-layout bg-purple"
											style="height: 40px; line-height: 40px;text-align: center;border:1px solid #ccc;background-color: #007AFF;">
											确定
										</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</u-dropdown-item>
					<u-dropdown-item class="send" title="目的地">
						<view class="slot-content" style="background-color: #FFFFFF;">
							<view style="padding-top:10px;">
								<span class='adress' style='margin-left: 15px;margin-right: 30px;'>{{allsheng2}}</span>
								<span class='adress' style=''>{{allshi2}}</span>
							</view>
							<view class="">
								<view class="top u-padding-top-10"
									style="height: 40px; border-bottom: 1px solid #c8c7cc;">
									<view v-for="(item1,index1) in list" :key='index1' @click="qieh2(index1)"
										style="display: inline-block;margin-left: 15px" :class="{tab:current2==index1}">
										{{item1.name}}
									</view>
								</view>
								<view class="swiper-bottom bg_white" style="height: 300px;">
									<swiper :duration="500" :current="current2" :data-index='current2' @change="toggle2"
										circular style="height: 290px;">
										<swiper-item>
											<scroll-view scroll-y="true" style="height: 300px;">
												<view style="padding-bottom: 30px;">
													<view
														style="width: 25%;display: inline-block;text-align: center;margin-bottom: 10px;">
														<span class='city' data="0" @click='Allstart2'
															:class="{select_active:selectedcity2==''}">
															全国
														</span>
													</view>
													<view v-for="(item,index) in proAllData" :key='index'
														style="width: 25%;display: inline-block;text-align: center;margin-bottom: 10px;">
														<span class='city' :data="item.id" @click='start2(item)'
															:class="{select_active:selectedcity2==item.id}">
															{{item.pro}}
														</span>
													</view>
												</view>
											</scroll-view>
										</swiper-item>
										<swiper-item>
											<scroll-view scroll-y="true" style="height: 300px;">
												<view style="margin-bottom: 30px;">
													<view v-for="(item,index) in newCity2" :key='index'
														style="width: 25%;display: inline-block;text-align: center;margin-bottom: 10px;">
														<span class='city' :data="item.id" @click='startCity2(item)'
															:class="{select_active:selectedcitys2==item.id}"
															style='overflow: hidden;'>
															{{item.city}}
														</span>
													</view>
												</view>
											</scroll-view>
										</swiper-item>
									</swiper>
								</view>
							</view>
							<view class="" style="z-index: 111;">
								<u-row>
									<u-col span="6" style="padding: 0;">
										<view class="demo-layout bg-purple"
											style="height: 40px; line-height: 40px;text-align: center;border: 1px solid #ccc;background-color: white;">
											重置
										</view>
									</u-col>
									<u-col span="6" style="padding: 0;">
										<view class="demo-layout bg-purple"
											style="height: 40px; line-height: 40px;text-align: center;border:1px solid #ccc;background-color: #007AFF;">
											确定
										</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</u-dropdown-item>
					<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
				</u-dropdown>
			</view>
			<view class="wrap" v-if="carData!=''">
				<view class="item " v-for="(item, index) in carData" :key="index" style="border: none;">
					<view class="list" style="border-radius: 10px;">
						<image v-if="item.discount_show!=''" :src="item.discount_show"
							style="width: 22px;height: 20px; position: absolute; top: 0px;"></image>
						<u-row gutter="16" style="padding-top: 10px;padding-bottom: 10px;">
							<u-col span="9">
								<view class="list_left" style="margin-left: 20px;">
									<u-row gutter="16" style="margin-bottom: 6px;">
										<u-col span="4">
											<view class="demo-layout bg-purple u-text-left u-font-15"
												style="font-weight: 600;">
												{{item.send_shi_name}}
											</view>
										</u-col>
										<u-col span="4">
											<view class="demo-layout bg-purple-light u-text-center"
												style="margin-bottom: -14px">
												<view style="margin-bottom: -11px;" class="u-font-10">
													{{item.trunking_show}}
												</view>
												<image src="../../images/driver/line_line.png" class="set_center_img">
												</image>
												<view style="margin-top: -4px;" class="u-font-10">{{item.control}}
												</view>
											</view>
										</u-col>
										<u-col span="4">
											<view class="demo-layout bg-purple-dark u-text-right u-font-15"
												style="font-weight: 600;">
												{{item.gather_shi_name}}
											</view>
										</u-col>
									</u-row>
									<u-row gutter="16" style="margin-bottom: 6px;">
										<u-col span="6">
											<view class="demo-layout bg-purple u-text-left u-font-12"
												style="color:#a2a3a4;">
												{{item.send_qu_name}}
											</view>
										</u-col>

										<u-col span="6">
											<view class="demo-layout bg-purple-dark u-text-right u-font-12"
												style="color:#a2a3a4;">
												{{item.gather_qu_name}}
											</view>
										</u-col>
									</u-row>
									<u-row gutter="16">
										<u-col span="6">
											<view class="demo-layout bg-purple u-text-left u-font-12 u-line-1"
												style="color:#a2a3a4;">
												{{item.startime_show}}
											</view>
										</u-col>

										<u-col span="6">
											<view class="demo-layout bg-purple-dark u-text-right u-font-12 u-line-1"
												style="color:#a2a3a4;">
												{{item.sendprice_show}}
											</view>
										</u-col>
									</u-row>
								</view>
							</u-col>
							<u-col span="3">
								<view class="list_right u-text-center">
									<span class='u-font-19'
										style='color: #FC5854;font-weight: 500;'>{{item.price}}</span>
									<br>
									<span class='u-font-12' style='color: #FC5854;'>{{item.price_show}}</span>
								</view>
							</u-col>
						</u-row>
					</view>
				</view>
				<u-loadmore :status="status" />
				<view>
					<u-calendar v-model="show" :mode="mode" :min-date='minDate' :max-date='maxDate' @change="changes">
					</u-calendar>
					<view class="rli" @click="show = true">
						<view
							style="display:flex;justify-content: center;align-items: center;height:100%;padding:0;margin:0;color:#fff;">
							<span class="select_date" style="color:#fff;" v-cloak>{{time}}</span>
							<span class="select_week" style="color:#fff;margin-right: 5px;" v-cloak>{{week}}</span>
							<span style='color:white;margin-right: 5px;margin-top: -2px;'>|</span>
							<image src="../../images/bulk/cand.png" style="width:15px;height: 15px;" mode="">
							</image>
						</view>

					</view>
				</view>
			</view>
			<view v-else>
				<image src="../../images/empty/car.png" mode="" class="listlog"></image>
			</view>
		</view>
		<tabBar></tabBar>
	</view>
</template>

<script>
	let timer = null
	import api from '@/api/api.js';
	export default {
		data() {
			return {
				value1: 1,
				value2: 1,
				options1: [{
						label: '默认排序(按照发车时间最近)',
						value: 1,
					},
					{
						label: '干线费最低(按照最低干线收费)',
						value: 2,
					},

				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],
				carData: [],
				current: 0,
				current2: 0,
				status: 'loadmore',
				page: 1,
				show: false,
				mode: 'date',
				minDate: '',
				maxDate: '',
				time: '',
				week: '',
				allsheng: '全国',
				allshi: '城市',
				allsheng2: '全国',
				allshi2: '城市',
				list: [{
						name: '请选择省'
					},
					{
						name: '请选择市'
					}
				],
				proAllData: [],
				cityAllData: [],
				selectedcity: '',
				selectedcity2: '',
				newCity: [],
				newCity2: [],
				selectedcitys: '',
				selectedcitys2: ''
			}
		},
		created() {
			var page = 1
			this.linePage(page)
			this.get_city()
			//日历时间
			var date = new Date()
			var time1 = date.getTime()
			var max = 24 * 60 * 60 * 30
			var year = date.getFullYear()
			var month = date.getMonth() + 1
			var months = date.getMonth() + 3
			var day = date.getDate()
			this.minDate = year + '-' + month + '-' + day
			this.maxDate = year + '-' + months + '-' + day



			var a = new Array("日", "一", "二", "三", "四", "五", "六");
			var week = new Date().getDay();
			this.time = month + '月' + day + '日'
			this.week = "星期" + a[week];
		},
		// 下拉刷新
		onPullDownRefresh() {
			var page = 1
			this.linePage(page)
		},
		//上拉加载
		onReachBottom() {
			var that = this;
			// 阻止重复加载
			if (timer !== null) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => this.linePage(that.page), 500)
		},
		methods: {
			//始发地切换
			qieh(index) {
				// console.log(index)
				this.current = index;
			},
			qieh2(index) {
				console.log(1);
				this.current2 = index;
				// console.log(this.current2)
			},
			// 切换触发的事件
			toggle(e) {
				this.current = e.detail.current;
			},
			toggle2(e) {
				console.log(e)
				this.current2 = e.detail.current;

			},
			// 始发地选择省
			start(item) {
				this.current = 1;
				this.selectedcity = item.id;
				this.allsheng = item.pro;
				var arr = []
				//选择省下的城市
				for (var i = 0; i < this.cityAllData.length; i++) {
					if (this.cityAllData[i].provval == this.selectedcity) {
						var item = {};
						item['city'] = this.cityAllData[i].city;
						item['id'] = this.cityAllData[i].parval;
						arr.push(item);
						this.newCity = arr;
						// console.log(this.newCity)
					}
				}
				this.selectedcitys = this.newCity[0].id;
				this.allshi = this.newCity[0].city;
			},
			start2(item) {
				this.current2 = 1;
				console.log(this.current2)
				this.selectedcity2 = item.id;
				this.allsheng2 = item.pro;
				var arr = []
				//选择省下的城市
				for (var i = 0; i < this.cityAllData.length; i++) {
					if (this.cityAllData[i].provval == this.selectedcity2) {
						var item = {};
						item['city'] = this.cityAllData[i].city;
						item['id'] = this.cityAllData[i].parval;
						arr.push(item);
						this.newCity2 = arr;
						// console.log(this.newCity)
					}
				}
				this.selectedcitys2 = this.newCity2[0].id;
				this.allshi2 = this.newCity2[0].city;
			},
			// 始发地选择市
			startCity(item) {
				// console.log('12')
				this.selectedcitys = item.id;
				this.allshi = item.city;
			},
			startCity2(item) {
				// console.log('12')
				this.selectedcitys2 = item.id;
				this.allshi2 = item.city;
			},
			Allstart() {
				this.selectedcity = '';
				this.allsheng = '全国';
				this.allshi = '城市';
			},
			Allstart2() {
				this.selectedcity2 = '';
				this.allsheng2 = '全国';
				this.allshi2 = '城市';
			},
			closeDropdown() {
				// this.$refs.uDropdown.close();
			},
			// 零担列表内容
			linePage(page) {
				// console.log('升级后的' + page)
				var data = {
					startcity: '',
					endcity: '',
					page: page,
					template: '',
					// state:'',
					status: '1',
					time: '',
					cold: '',
					depart_time: '1'
				};
				uni.showNavigationBarLoading()
				api.linePage(data).then(res => {
					var lis = res.data.info;
					uni.stopPullDownRefresh();
					uni.hideNavigationBarLoading();
					if (lis == '') {
						this.status = 'nomore';
						return false
					}
					if (page == 1) {
						this.status = 'loadmore';
						this.carData = lis;
					} else {
						this.status = 'loadmore';
						this.carData = this.carData.concat(lis)
					}
					this.page = ++page;
				});
			},
			changes(e) {
				console.log(e);
				this.time = e.month + '月' + e.day + '日';
				this.week = e.week;
			},
			// 始发地 目的地数据
			get_city() {
				var data = {
					type: '1'
				};
				api.get_city(data).then(res => {
					var list = res.data.info;
					for (var i in list) {
						if (list[i].level == 2) {
							var one = {
								parent: '',
								provval: list[i].parent_id,
								city: list[i].name,
								py: '',
								parval: list[i].id
							};
							this.cityAllData.push(one);
						}
						if (list[i].level == 1) {
							var one = {
								pro: list[i].name,
								id: list[i].id
							};
							this.proAllData.push(one);
							// console.log('地址信息' + JSON.stringify(this.proAllData))
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab {
		color: #007aff;
	}

	.select_active {
		border: 1px solid #0088F4;
		background-color: #CCE7FD;
		color: #0088F4;
	}

	.u-tabs-scorll-flex[data-v-3b2b1a80] {
		justify-content: normal !important;
	}

	.u-tab-item-0 {
		flex: none;
	}

	.content {
		border-top: 1px solid rgb(238, 238, 238);
		padding-bottom: 58px;
		background-color: rgb(243, 244, 246);

		.send {
			.item {
				border-bottom: 1px #ececec solid;
				padding: 20rpx 0;
			}

			.top {
				background: #FFFFFF;
				height: 100rpx;
				position: fixed;
				left: 0;
				top: 80rpx;
				right: 0;
				box-shadow: 0px 10px 10px -10px #efefef;
				z-index: 999;
			}

			.city {
				width: 80px;
				display: inline-block;
				height: 33px;
				line-height: 33px;
				border: 1px solid #ccc;
				border-radius: 5px;
			}

			.swiper-bottom {
				margin-top: 110rpx;
				padding: 20rpx;
				width: 100%;
				height: 100%;
				position: relative;

			}
		}

		.adress {
			background-color: #CCE7FD;
			border-radius: 2px;
			color: #0088F4;
			padding: 6px 12px;
		}

		.wrap {
			.rli {
				width: 38%;
				height: 40px;
				background-color: rgb(0, 136, 244);
				line-height: 40px;
				position: fixed;
				bottom: 85px;
				left: 50%;
				transform: translateX(-50%);
				border-radius: 5px;
			}

			.list {
				width: 90%;
				background-color: white;
				margin: 15px auto;

				.list_left {
					.set_center_img {
						height: 6px;
						width: 70%;
					}
				}
			}
		}

		.u-dropdown {
			background-color: white;
		}

		.listlog {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
