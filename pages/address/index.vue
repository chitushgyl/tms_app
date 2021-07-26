<template>
	<view class="address">
		<u-navbar :is-back="false" :border-bottom='false' title="常用地址">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="wrap" v-if="adressList!=''">
				<!-- <view class="wrap"> -->
				<u-row gutter="16" v-for="(item,index) in adressList" :key='index'
					style="background-color: white;padding-top: 10px;padding-bottom: 10px;margin-bottom: 15px;"
					@click='adr(item,index)'>
					<u-col span="8">
						<view class="demo-layout bg-purple" style="margin-left: 10px;">
							<p style='margin-bottom: 10px;'>{{item.contacts}}&nbsp;{{item.tel}}</p>
							<p>{{item.sheng_name}}&nbsp;{{item.shi_name}}&nbsp;{{item.qu_name}}&nbsp;{{item.address}}
							</p>
						</view>
					</u-col>
					<u-col span="2">
						<view class="demo-layout bg-purple-light" @click="dele(item,index)">
							<image src="../../images/tool/delete.png" mode=""
								style="width: 15px;height: 15px;vertical-align:sub;"></image>
							<span style='color: red;'>删除</span>
						</view>
					</u-col>
					<u-col span="2">
						<view class="demo-layout bg-purple-dark" @click="editor(item,index)">
							<image src="../../images/tool/edit.png" mode=""
								style="width: 15px;height: 15px;vertical-align:sub;"></image>
							<span style='color:#0088F4;'>编辑</span>
						</view>
					</u-col>
				</u-row>
				<u-loadmore :status="status" />
			</view>
			<view v-else>
				<view class="listlog">
					<image src="../../images/empty/noAddress.png" mode=""></image>
					<p style='text-align: center;'>暂无可用地址</p>
				</view>
			</view>
		</view>
		<u-button type="primary" shape="circle"
			style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="submit">
			添加地址</u-button>
		<u-modal v-model="show" :content="content" @confirm="confirm" :show-cancel-button='true'
			:cancel-style="cancel_style"></u-modal>
	</view>
</template>

<script>
	let timer = null
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				adressList: [
					{
						"self_id": "address_202107171315071793989499",
						"sheng_name": "安徽省",
						"shi_name": "芜湖市",
						"qu_name": "鸠江区",
						"qu": 2237,
						"address": "政通路66号",
						"particular": null,
						"create_time": "2021-07-17 13:15:07",
						"company_name": null,
						"group_name": "东风快递",
						"use_flag": "Y",
						"contacts": "21",
						"tel": "12",
						"total_user_id": null,
						"button_info": [{
							"id": 612,
							"img": null,
							"name": "编辑",
							"jump_url": null,
							"use_type": "edit",
							"color": "#00B8FF",
							"but_type": "primary",
							"flag": "delete_flag",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 609,
							"img": null,
							"name": "详情",
							"jump_url": null,
							"use_type": "details",
							"color": "#00B8FF",
							"but_type": "primary",
							"flag": "create",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 610,
							"img": null,
							"name": "启用/禁用",
							"jump_url": null,
							"use_type": "ajax",
							"color": "#00B8FF",
							"but_type": "info",
							"flag": "use_flag",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 611,
							"img": null,
							"name": "删除",
							"jump_url": null,
							"use_type": "ajax",
							"color": "#ed5565",
							"but_type": "danger",
							"flag": "delete_flag",
							"show_flag": "text",
							"an_name": null
						}],
						"user_total": null
					}, {
						"self_id": "address_202107171315072442766996",
						"sheng_name": "安徽省",
						"shi_name": "芜湖市",
						"qu_name": "鸠江区",
						"qu": 2237,
						"address": "中江大道010县",
						"particular": null,
						"create_time": "2021-07-17 13:15:07",
						"company_name": null,
						"group_name": "东风快递",
						"use_flag": "Y",
						"contacts": "12",
						"tel": "12",
						"total_user_id": null,
						"button_info": [{
							"id": 612,
							"img": null,
							"name": "编辑",
							"jump_url": null,
							"use_type": "edit",
							"color": "#00B8FF",
							"but_type": "primary",
							"flag": "delete_flag",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 609,
							"img": null,
							"name": "详情",
							"jump_url": null,
							"use_type": "details",
							"color": "#00B8FF",
							"but_type": "primary",
							"flag": "create",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 610,
							"img": null,
							"name": "启用/禁用",
							"jump_url": null,
							"use_type": "ajax",
							"color": "#00B8FF",
							"but_type": "info",
							"flag": "use_flag",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 611,
							"img": null,
							"name": "删除",
							"jump_url": null,
							"use_type": "ajax",
							"color": "#ed5565",
							"but_type": "danger",
							"flag": "delete_flag",
							"show_flag": "text",
							"an_name": null
						}],
						"user_total": null
					}, {
						"self_id": "address_202107171144588727414296",
						"sheng_name": "安徽省",
						"shi_name": "芜湖市",
						"qu_name": "镜湖区",
						"qu": 2236,
						"address": "5",
						"particular": null,
						"create_time": "2021-07-17 11:44:58",
						"company_name": null,
						"group_name": "东风快递",
						"use_flag": "Y",
						"contacts": "1",
						"tel": "5",
						"total_user_id": null,
						"button_info": [{
							"id": 612,
							"img": null,
							"name": "编辑",
							"jump_url": null,
							"use_type": "edit",
							"color": "#00B8FF",
							"but_type": "primary",
							"flag": "delete_flag",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 609,
							"img": null,
							"name": "详情",
							"jump_url": null,
							"use_type": "details",
							"color": "#00B8FF",
							"but_type": "primary",
							"flag": "create",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 610,
							"img": null,
							"name": "启用/禁用",
							"jump_url": null,
							"use_type": "ajax",
							"color": "#00B8FF",
							"but_type": "info",
							"flag": "use_flag",
							"show_flag": "text",
							"an_name": null
						}, {
							"id": 611,
							"img": null,
							"name": "删除",
							"jump_url": null,
							"use_type": "ajax",
							"color": "#ed5565",
							"but_type": "danger",
							"flag": "delete_flag",
							"show_flag": "text",
							"an_name": null
						}],
						"user_total": null
					}
				],
				page: 1,
				status: 'loadmore',
				show: false,
				content: '',
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
				self_id: '',
				index: 0
			}
		},
		onLoad() {
			uni.$on('address', () => {
				this.api_address_addressPage(1)
			})
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2]; //上个页面路由
			this.froute = beforePage.route
		},
		created() {
			this.api_address_addressPage(1)
		},
		// 下拉刷新
		onPullDownRefresh() {
			var page = 1
			this.api_address_addressPage(page)
		},
		//上拉加载
		onReachBottom() {
			var that = this;
			// 阻止重复加载
			if (timer !== null) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => this.api_address_addressPage(that.page), 500)
		},
		methods: {
			//列表数据
			api_address_addressPage(page) {
				var data = {
					page: page
				}
				uni.showNavigationBarLoading()
				api.api_address_addressPage(data).then(res => {
					uni.stopPullDownRefresh();
					uni.hideNavigationBarLoading();
					var lis = res.data.info;
					if (lis == '') {
						this.status = 'nomore';
						return false
					}
					if (lis.length == 10) {
						this.status = 'loadmore';
					} else {
						this.status = 'nomore';
					}
					if (page == 1) {
						this.adressList = lis;
					} else {
						console.log('1234')
						this.adressList = this.adressList.concat(lis)
					}
					this.page = ++page;

				})
			},
			//删除
			dele(item, index) {
				this.content = '你确定要删除当前这个地址吗'
				this.show = true;
				this.self_id = item.self_id;
				this.index = index
			},
			confirm() {
				var data = {
					self_id: this.self_id
				}
				api.api_address_addressDelFlag(data).then(res => {
					console.log('列表数据' + JSON.stringify(res))
					// this.adressList.splice(this.index, 1);
					this.api_address_addressPage(1)
				})
			},
			//添加
			submit() {
				uni.navigateTo({
					url: '/pages/address/add'
				})
			},
			// 编辑
			editor(item, index) {
				console.log(item)
				this.$store.commit("addValue", item)
				uni.navigateTo({
					url: '/pages/address/editor'
				})
			},
			adr(item, index) {
				// console.log(item)
				// console.log(index)
				if (this.froute == 'pages/3pl_user/car_info') {
					this.$store.commit("addcar_info", item)
					var pages = getCurrentPages(); //当前页
					var beforePage = pages[pages.length - 2]; //上个页面路由
					beforePage.$vm.shiQu()
					uni.navigateBack()
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
		width: 90%;
		margin: 10px auto 0px;
		padding-bottom: 80px;
		// background-color: white;
		border-radius: 10px;

		.wrap {
			.u-view {}
		}

		.listlog {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
