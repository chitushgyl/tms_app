<template>
	<view class="body-view" style="background-color: #F3F4F6;padding-bottom: 100px;">
		<view class="logo" style="background-color: #0088F4; width: 100%;text-align: center;">
			<image src="../../images/order/login.png">
		</view>
		<!-- 头部 -->
		<!-- <view class=""> -->
		<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
			<block v-for="(item,index) in carData" :key="index">
				<view class="menu-topic-view" v-bind:id="'tabNum'+index" @click="swichMenu(item,index)">
					<view :class="[currentTab==index ? 'menu-topic-act' : 'menu-topic']">
						<view class="menu-topic-txt">{{item.parame_name}}</view>
						<view class="menu-topic-bottom">
							<view class="menu-topic-bottom-color"></view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<!-- 右边小箭头 -->
		<view class="right-arrow"><text class="iconfont icon-arrow-right-o"></text> </view>
		<!-- 显示区域 -->
		<swiper :current="currentTab" class="swiper-box-list" duration="0.0005" :data-index='currentTab'
			@change="swiperChange" circular>
			<swiper-item v-for="(item,index1) in carData" :key='index1'>
				<view class="uni-flex uni-row item">
					<u-row gutter="16">
						<u-col span="7" style="height:150px;box-sizing: border-box;">
							<view style="width: 100%;height: 100%; ">
								<image :src="item.img" style="width: 100%;height: 80%;margin-top: 15px;" mode="">
								</image>
							</view>
						</u-col>
						<u-col span="5" style="box-sizing: border-box;">
							<ul>
								<li style="width:100%;text-align:left;" v-cloak>
									核载标准&nbsp;<span v-cloak>{{item.allweight}}</span>
								</li>
								<li style="width:100%;text-align:left;" v-cloak>
									车厢内径&nbsp;<span v-cloak>{{item.dimensions}}</span>
								</li>
								<li style="width:100%;text-align:left;" v-cloak>
									均衡体积&nbsp;<span v-cloak>{{item.allvolume}}</span>
								</li>
							</ul>
						</u-col>
					</u-row>
				</view>
			</swiper-item>
		</swiper>
		<!-- </view> -->
		<view class="" style="margin-top: 20px;">
			<!-- <u-card :show-head="false"> -->

			<view class="" style="margin: 16px;background-color: white;padding:16px;border-radius: 15px;">
				<view class="">
					<u-radio-group v-model="radio" @change="radioGroupChange">
						<u-radio name="1" @change="radioChange">
							城际
						</u-radio>
						<u-radio name="2" @change="radioChange">
							同城
						</u-radio>
					</u-radio-group>
				</view>

				<view class="clearfix" v-for="(item,index) in address_list" :key='index'>
					<view class="address clearfix" style="float: left;margin-bottom: 10px;margin-top: 20px;"
						@click="send_info(index)">
						<image src="../../images/f.png" mode=""
							style="width: 25px;height: 25px;padding-top: 10px;padding-right: 10px;"></image>
						<view class="send_ad">
							<p class='contact'>{{item.send_info_tel}}</p>
							<p class='adds'>{{item.send_info}}</p>
						</view>
					</view>
					<view class="address clearfix" style="float: left;" @click="gather_info(index)">
						<image src="../../images/s.png" mode=""
							style="width: 25px;height: 25px;padding-top: 10px;padding-right: 10px;"></image>
						<view class="send_ad">
							<p class='contact'>{{item.gather_info_tel}}</p>
							<p class='adds'>{{item.gather_info}}</p>
						</view>
					</view>
					<view class="add">
						<i style='font-style: normal;' v-if="index == 0" @click="add_address_list">+添加</i>
						<i v-if="index > 0" @click="del_address_list(index)"
							style="font-style:normal;font-size: 14px;">删除</i>
					</view>
				</view>
			</view>

			<!-- </u-card> -->
		</view>
		<view class="">
			<!-- <u-card :show-head="false"> -->
			<view class="" style="margin: 16px;background-color: white;padding:16px;border-radius: 15px;">
				<view class="clearfix" style="margin-top: 15px;margin-bottom: 15px;">
					<p class='le'>预估里程</p>
					<p class='ri'>{{km}}公里</p>
				</view>
				<view class="clearfix">
					<p class='le'>预估运费</p>
					<p class='ri'>{{countprice}}元</p>
				</view>
				<u-button @click="submit" type="primary" style="margin-top: 60px;border-radius: 22px">我要用车</u-button>
			</view>
			<!-- </u-card> -->
		</view>
		<tabBar></tabBar>
	</view>

</template>

<script>
	import api from '@/api/api.js';
	// import tabbar from '@/components/tabbar.vue'
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				carData: [],
				radio: 1,
				address_list: [{
					send_info: '添加装车地址',
					send_info_tel: '装车地址联系人',
					send_address_id: '',
					gather_info: '添加目的地址',
					gather_info_tel: '目的地址联系人',
					gather_address_id: '',
					good_name: '货物',
					good_number: 1,
					good_weight: 1,
					good_volume: 1,
					// control_type:[],//温度信息
					clod: "",
					clod_name: ''
				}],
				index: 0,
				info: '',
				anticipatedfreight: {
					car_type: '',
					pick_flag: '1', //是否装货
					send_flag: '1', //是否卸货
					gather_address: [{
						area: "",
						city: "",
						info: "",
						pro: ""
					}, ], //收货地址数组
					send_address: [{
						area: "",
						city: "",
						info: "",
						pro: ""
					}, ], //发货地址数组
					gatherCanUse: false, //判断是否可用
					sendCanUse: false, //判断是否可用
					weight: '',
					volume: '',
				},
				km: 0,
				countprice: ''
			}
		},
		// components: {
		// 	tabbar: tabbar
		// },
		onLoad: function() {},
		created() {
			this.getType()
		},
		methods: {
			//车辆信息接口
			getType() {
				var data = {};
				api.getType(data).then(res => {
					var lis = res.data.info;
					// console.log(res);
					this.carData = lis;
					this.anticipatedfreight.car_type = lis[0].self_id
				});
			},
			// 单选
			radioChange(e) {
				// console.log(e);
			},

			radioGroupChange(e) {
				// console.log(e);
			},
			submit() {
				uni.navigateTo({
					url: '/pages/3pl_user/form'
				})
			},
			// 添加按钮
			add_address_list() {
				this.address_list.push({
					send_info: '添加装车地址',
					send_info_tel: '装车地址联系人',
					send_address_id: '',
					gather_info: '添加目的地址',
					gather_info_tel: '目的地址联系人',
					gather_address_id: '',
					good_name: '货物',
					good_number: 1,
					good_weight: 1,
					good_volume: 1,
					control_type: '',
					clod: '',
					clod_name: '',
				});
				this.anticipatedfreight.gather_address.push({
					area: "",
					city: "",
					info: "",
					pro: ""
				});
				this.anticipatedfreight.send_address.push({
					area: "",
					city: "",
					info: "",
					pro: ""
				});
			},
			// 删除添加地址
			del_address_list(index) {
				var list = this.address_list
				list.splice(index, 1);
				this.address_list = list;
				// mui('.mui-numbox').numbox();
			},

			//顶部切换
			swichMenu: async function(item, current) { //点击其中一个 menu
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
				// console.log(current)
				this.anticipatedfreight.car_type = item.self_id
			},
			swiperChange: async function(e) {
				this.anticipatedfreight.car_type = e.target.dataset.info.self_id
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			send_info(item) {
				this.index = item;
				this.info = 'send_info';
				uni.navigateTo({
					url: '/pages/address/index'
				})
			},
			gather_info(item) {
				this.index = item
				this.info = 'gather_info';
				uni.navigateTo({
					url: '/pages/address/index'
				})
			},
			//获取地址
			shiQu() {
				var addcar_info = this.$store.state.addcar_info;
				// console.log(addcar_info)
				if (this.info == 'send_info') {
					this.address_list[this.index].send_info = addcar_info.sheng_name + addcar_info.shi_name + addcar_info
						.qu_name
					this.address_list[this.index].send_info_tel = addcar_info.contacts + addcar_info.tel
					this.address_list[this.index].send_address_id = addcar_info.self_id
					this.anticipatedfreight.send_address.forEach((item, indexs) => {
						if (this.index == indexs) {
							item.area = addcar_info.qu_name;
							item.city = addcar_info.shi_name;
							item.info = addcar_info.address;
							item.pro = addcar_info.sheng_name;
						}
						this.anticipatedfreight.sendCanUse = true;
					})

				} else {
					this.address_list[this.index].gather_info = addcar_info.sheng_name + addcar_info.shi_name + addcar_info
						.qu_name
					this.address_list[this.index].gather_info_tel = addcar_info.contacts + addcar_info.tel
					this.address_list[this.index].gather_address_id = addcar_info.self_id
					this.anticipatedfreight.gather_address.forEach((item, indexs) => {
						if (this.index == indexs) {
							item.area = addcar_info.qu_name;
							item.city = addcar_info.shi_name;
							item.info = addcar_info.address;
							item.pro = addcar_info.sheng_name;
						}
						this.anticipatedfreight.gatherCanUse = true;
					})

				}
				let cando = false;
				this.address_list.forEach((item, index) => {
					if (item.send_address_id && item.gather_address_id) {
						cando = true;
					} else {
						cando = false;
					}
				})
				// console.log(cando)
				if (cando) {
					// console.log(this.anticipatedfreight)
					var data = this.anticipatedfreight
					api.api_order_count_klio(data).then(res => {
						// console.log(JSON.stringify(res))
						this.km = res.data.km;
						this.countprice = res.data.countprice + '~' + res.data.maxprice;
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.clearfix:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.menu-topic {
		margin-left: 0px !important;
		margin-right: 0px !important;
		padding-left: 14px !important;
		padding-right: 14px !important;
	}

	.menu-topic-act {
		margin-left: 0px !important;
		margin-right: 0px !important;
		padding-left: 14px !important;
		padding-right: 14px !important;
	}

	.le {
		width: 50%;
		float: left;
	}

	.ri {
		width: 50%;
		text-align: right;
		float: right;
	}

	.add {
		width: 30%;
		text-align: center;
		float: right;
		position: relative;
		bottom: 15px;
	}

	uni-view {
		box-sizing: content-box;
	}

	.menu-topic-bottom-color {
		width: 100% !important;
	}

	.u-card__head .body-view {
		height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		align-items: flex-start;
		justify-content: center;
	}

	.body-view .logo {
		text-align: center;
		height: 44px;
		line-height: 44px;
		padding-top: 20px;

		uni-image {
			width: 124px;
			height: 20px;

		}
	}

	.body-view .right-arrow {
		position: absolute;
		top: 22upx;
		right: 0upx;
		padding-left: 60upx;
		padding-right: 20upx;
		line-height: 42upx;
		background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 60%);
	}

	.address {
		width: 70%;

		image {
			float: left;
		}

		.send_ad {
			float: left;
			width: 85%;

			.contact {
				font-size: 18px;
				color: rgb(68, 68, 68);
				font-weight: 700;
			}

			.adds {
				font-size: 15px;
				color: rgb(153, 153, 153);
				overflow-wrap: break-word;
				word-break: break-all;
			}
		}
	}

	.body-view .right-arrow .iconfont {
		font-size: 24upx;
		font-family: iconfont;
		color: #909399;
	}

	.top-menu-view {
		display: flex;
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		height: 86upx;
		border-top: 1px solid #d8dbe6;
		border-bottom: 1px solid #d8dbe6;
	}

	.top-menu-view .menu-topic-view {
		display: inline-block;
		white-space: nowrap;
		height: 86upx;
		position: relative;
	}

	.top-menu-view .menu-topic-view .menu-topic {
		margin-left: 30upx;
		margin-right: 10upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic:first-child {
		margin-left: 30upx;
	}

	.top-menu-view .menu-topic-view:last-child .menu-topic {
		margin-right: 80upx;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-txt {
		font-size: 30upx;
		color: #303133;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom .menu-topic-bottom-color {
		width: 40upx;
		height: 4upx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act {
		margin-left: 30upx;
		margin-right: 10upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view:last-child .menu-topic-act {
		margin-right: 80upx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-txt {
		font-size: 30upx;
		color: #3d7eff;
		font-weight: 600;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom .menu-topic-bottom-color {
		width: 40upx;
		height: 6upx;
		background: #3d7eff;
	}

	.swiper-box-list {
		/* flex: 1; */
		width: 100%;
		height: 150px;
		background-color: #FFFFFF;
	}

	.swiper-topic-list {
		height: 100%;
		width: 100%;
	}
</style>
