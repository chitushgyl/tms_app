<template>
	<view class="form">
		<u-navbar :is-back="false" :border-bottom='false' title="下单" title-color='white' :background="background">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" color="white" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="adress">
				<view class="clearfix" v-for="(item,index) in address_list" :key='index'>
					<view class="address clearfix" style="float: left;margin-bottom: 10px;margin-top: 20px;">
						<image src="../../images/f.png" mode=""
							style="width: 25px;height: 25px;padding-top: 10px;padding-right: 10px;"></image>
						<view class="send_ad">
							<p class='contact'>{{item.send_info_tel}}</p>
							<p class='adds'>{{item.send_info}}</p>
						</view>
					</view>
					<view class="address clearfix" style="float: left;">
						<image src="../../images/s.png" mode=""
							style="width: 25px;height: 25px;padding-top: 10px;padding-right: 10px;"></image>
						<view class="send_ad">
							<p class='contact'>{{item.gather_info_tel}}</p>
							<p class='adds'>{{item.gather_info}}</p>
						</view>
					</view>
				</view>
				<view class="information">
					<view class="wrap">
						<u-row gutter="16">
							<u-col span="1" style="padding-left: 0px;">
								<view class="demo-layout bg-purple">
									<image style="width:25px;height:25px;vertical-align:sub;" src="../../images/h.png"
										mode=""></image>
								</view>
							</u-col>
							<u-col span="10">
								<view class="demo-layout bg-purple-light">
									<p>货物信息 冷冻 件 吨 方</p>
								</view>
							</u-col>
							<u-col span="1">
								<view class="demo-layout bg-purple-dark">
									<u-icon name="arrow-down" size="28"></u-icon>
								</view>
							</u-col>
						</u-row>
					</view>
				</view>
				<view class="allinformation">
					<view class="wrap">
						<u-row gutter="16">
							<u-col span="3">
								<view class="demo-layout bg-purple">
									<p>货物信息</p>
								</view>
							</u-col>
							<u-col span="9">
								<view class="demo-layout bg-purple-dark">
									<u-input input-align='right' type="text" :border="false" />
								</view>
							</u-col>
						</u-row>
						<u-row gutter="16">
							<u-col span="4">
								<view class="demo-layout bg-purple">
									<!-- 	<u-field label="" placeholder="请填写验证码" type="text">
										<span>件</span<span>件</span
									</u-field> -->
									<span>件</span>
								</view>
							</u-col>
							<u-col span="4">
								<view class="demo-layout bg-purple-light">
									<!-- 	<view style="display: inline-block;">
										<u-input type="text" :border="false" />
									</view> -->
									<span>吨</span>
								</view>

							</u-col>
							<u-col span="4">
								<view class="demo-layout bg-purple-dark">
									<!-- <u-input v-model="value" type="text" :border="false" /> -->
									<span>立方</span>
								</view>
							</u-col>
						</u-row>
					</view>
					<view class="">
						<p>温度</p>
						<!-- <button type="default">12</button> -->
					</view>
				</view>
			</view>
			<view class="orderinformation">
				<view class="wrap">
					<u-row gutter="16">
						<u-col span="3" style="padding-left: 10px;">
							<view class="demo-layout bg-purple">是否装卸</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-light">
								<!-- <u-button shape="circle">需要装货</u-button> -->
							</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-dark">
								<!-- <u-button shape="circle">需要卸货</u-button> -->
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3" style="padding-left: 10px;">
							<view class="demo-layout bg-purple">是否装卸</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-light">
								<!-- <u-button shape="circle">需要装货</u-button> -->
							</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-dark">
								<!-- <u-button shape="circle">需要卸货</u-button> -->
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3" style="padding-left: 10px;">
							<view class="demo-layout bg-purple">是否装卸</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-light">
								<!-- <u-button shape="circle">需要装货</u-button> -->
							</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-dark">
								<!-- <u-button shape="circle">需要卸货</u-button> -->
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3" style="padding-left: 10px;">
							<view class="demo-layout bg-purple">是否装卸</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-light">
								<!-- <u-button shape="circle">需要装货</u-button> -->
							</view>
						</u-col>
						<u-col span="4">
							<view class="demo-layout bg-purple-dark">
								<!-- <u-button shape="circle">需要卸货</u-button> -->
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		<u-picker mode="time" v-model="show"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#0088F4',
				},
				address_list: [{
					send_info: '添加装车地址',
					send_info_tel: '装车地址联系人',
					send_address_id: '',
					gather_info: '添加目的地址',
					gather_info_tel: '目的地址联系人',
					gather_address_id: '',
					good_name: '',
					good_number: '',
					good_weight: '',
					good_volume: '',
					// control_type:[],//温度信息
					clod: "",
					clod_name: ''
				}],
				itemStyle: {
					marginTop: '20px'
				},
				show: false
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
	.clearfix:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.u-size-default[data-v-6e15e680] {
		height: 30px;
		line-height: 30px
	}

	.content {
		width: 90%;

		margin: 10px auto;

		.adress {
			border-radius: 10px;
			background-color: white;
			padding-left: 10px;
			padding-right: 10px;

			.address {
				width: 80%;

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
		}

		.information {
			margin-top: 15px;
		}

		.orderinformation {
			margin-top: 10px;
			border-radius: 10px;
			background-color: white;
		}
	}
</style>
