<template>
	<view class="address">
		<u-navbar :is-back="false" :border-bottom='false' title="常用地址">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="scroll-container">
				<mescroll-uni @init="mescrollInit" top="120" bottom="80" @down="downCallback" @up="upCallback"
					:up="upOption">
					<view class="wrap" style="width: 95%;margin-left: 2.5%;">
						<u-row gutter="16" v-for="(item,index) in adressList" :key='index'
							style="background-color: white;padding-top: 10px;padding-bottom: 10px;margin-bottom: 15px;">
							<u-col span="8" @click='adr(item,index)'>
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
					</view>
				</mescroll-uni>
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
				type:"",
				adressList:[],
				page: 1,
				status: 'loadmore',
				show: false,
				content: '',
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
				self_id: '',
				index: 0,
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					empty: {
						icon: "https://www.mescroll.com/img/mescroll-empty.png", //图标,默认null
						fixed: true, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						top: "300rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						tip: '~ 暂无地址 ~', // 提示
						zIndex: 99 // fixed定位z-index值
					}
				},
			}
		},
		onLoad(e) {
			// uni.$on('address', () => {
			// 	// this.api_address_addressPage(1)
			// })
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2]; //上个页面路由
			// this.froute = beforePage.route
			if(e.data){
				this.type=e.data
				console.log(this.type)
			}
		},
		// created() {
		// 	this.api_address_addressPage(1)
		// },
		// 下拉刷新
		// onPullDownRefresh() {
		// 	var page = 1
		// 	this.api_address_addressPage(page)
		// },
		// //上拉加载
		// onReachBottom() {
		// 	var that = this;
		// 	// 阻止重复加载
		// 	if (timer !== null) {
		// 		clearTimeout(timer)
		// 	}
		// 	timer = setTimeout(() => this.api_address_addressPage(that.page), 500)
		// },
		methods: {
			back(){
				uni.navigateBack()
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			// 下拉回调
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			// 上拉回调
			upCallback(mescroll) {
				this.api_address_addressPage(mescroll.num)
			},
			//列表数据
			api_address_addressPage(page) {
				var data = {
					page: page
				}
				var project_type = uni.getStorageSync("project_type");
				console.log(project_type)
				if (project_type == 'company' || project_type=='TMS3PL') {
					// uni.showNavigationBarLoading()
					api.tms_address_addressPage(data).then(res => {
						if (res.code == 200) {
							var lis = res.data.items;
							// console.log(JSON.stringify(lis))
							this.mescroll.endSuccess(res.data.items.length);
							if (page == 1) {
								this.adressList = [];
							}
							this.adressList = this.adressList.concat(res.data.items);
						}
						// uni.stopPullDownRefresh();
						// uni.hideNavigationBarLoading();
						// var lis = res.data.info;
						// if (lis == '') {
						// 	this.status = 'nomore';
						// 	return falses
						// }
						// if (lis.length == 10) {
						// 	this.status = 'loadmore';
						// } else {
						// 	this.status = 'nomore';
						// }
						// if (page == 1) {
						// 	this.adressList = lis;
						// } else {
						// 	console.log('1234')
						// 	this.adressList = this.adressList.concat(lis)
						// }
						// this.page = ++page;
					})
				} else {
					// uni.showNavigationBarLoading()
					api.api_address_addressPage(data).then(res => {
						// uni.stopPullDownRefresh();
						// uni.hideNavigationBarLoading();
						if (res.code == 200) {
							var lis = res.data.info;
							// console.log(JSON.stringify(lis))
							this.mescroll.endSuccess(res.data.info.length);
							if (page == 1) {
								console.log(page)
								this.adressList = [];
							}
							this.adressList = this.adressList.concat(res.data.info);
						}
						// var lis = res.data.info;
						// if (lis == '') {
						// 	this.status = 'nomore';
						// 	return false
						// }
						// if (lis.length == 10) {
						// 	this.status = 'loadmore';
						// } else {
						// 	this.status = 'nomore';
						// }
						// if (page == 1) {
						// 	this.adressList = lis;
						// } else {
						// 	console.log('1234')
						// 	this.adressList = this.adressList.concat(lis)
						// }
						// this.page = ++page;
					})
				}
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
				console.log(item)
				console.log(index)
				// if (this.froute != 'pages/user/user') {
				// 	this.$store.commit("addcar_info", item)
				// 	var pages = getCurrentPages(); //当前页
				// 	var beforePage = pages[pages.length - 2]; //上个页面路由
				// 	beforePage.$vm.shiQu()
				// 	uni.navigateBack()
				// }
				console.log(this.type)
				if(this.type==1){
					this.$store.commit("linesendadd", item)
					console.log(item)
					uni.navigateBack()
				}
				if(this.type==2){
					this.$store.commit("linegatadd", item)
					console.log(item)
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
		// width: 90%;
		// margin: 10px auto 0px;
		// padding-bottom: 80px;
		// // background-color: white;
		// border-radius: 10px;

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
