<template>
	<view>
		<u-navbar  :is-back="false" title="发布列表">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content" >
			<view class="list">
				<view class="scroll-container">
					<mescroll-uni @init="mescrollInit" top="125" bottom="80" @down="downCallback" @up="upCallback"
						:up="upOption">
						<view class="order" v-for="(item,index) in linelist" :key='index'>
							<view class="wrap">
								<view class="" @click="details(item)">
									<u-row gutter="16" style="height:40px;font-size: 12px;">
										<u-col span="8">
											<view class="demo-layout bg-purple">
												<!-- <span
													style="padding: 2px 4px; height: 24px;line-height: 20px;margin-right: 10px;border-radius: 4px;font-size: 12px;"
													:style="{'backgroundColor':item.order_type_color,'color':item.order_type_font_color}">{{item.order_type_show}}</span> -->
												<span>
												班次号：{{item.shift_number}}
												</span>
											</view>
										</u-col>
									</u-row>
									<u-row gutter="16" style="border-top: 1px solid #e8e9ea;padding-top: 9px;">
										<u-col span="4">
											<view class="demo-layout bg-purple u-text-left ">
												<p class='u-font-17' style="font-weight: 600;">
												{{item.send_shi_name}}
												</p>
												<p style='color: #a2a3a4;'>
												{{item.send_qu_name}}
												</p>
											</view>
										</u-col>
										<u-col span="4">
											<view class="demo-layout bg-purple-light u-text-center">
												<div class="set_center_day" >{{item.trunking}}天</div>
												<image src="../../images/driver/line_line.png" class="set_center_img">
												</image>
											</view>
										</u-col>
										<u-col span="4">
											<view class="demo-layout bg-purple-dark u-text-right ">
												<p class='u-font-17' style="font-weight: 600;">
												{{item.gather_shi_name}}
												</p>
												<p style='color: #a2a3a4;'>
												{{item.gather_qu_name}}
												</p>
											</view>
										</u-col>
									</u-row>
									
									<u-row gutter="16" style="height: 30px;border-bottom: 1px solid #e8e9ea;">
										<u-col span="6">
											<view class="demo-layout bg-purple u-text-left u-line-1">
												<span style='color: #a2a3a4;'>
													发车时间:{{item.depart_time}}
												</span>
											</view>
										</u-col>
										<u-col span="6">
											<view class="demo-layout bg-purple-dark u-text-right u-line-1">
												￥<span style='color: #FC5854;font-size:20px;'>
													{{item.min_money}}
												</span>
											</view>
										</u-col>
									</u-row>
								</view>
								<u-row gutter="16" style="height: 45px;">
									<u-col span="6">
									</u-col>
									<u-col span="6">
										<view class="demo-layout bg-purple-dark u-text-right">
											<u-button size="mini" type="primary" @click="editr(item,index)">编辑</u-button>	
											<u-button style="margin-left: 10px;" size="mini" type="error" @click="del(item.self_id)">删除</u-button>
										</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</mescroll-uni>
					<u-button type="primary" shape="circle"
						style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="toadd">
						添加线路</u-button>
					<u-modal v-model="show" :content="content" @confirm="confirm" :show-cancel-button='true'
						:cancel-style="cancel_style"></u-modal>
				</view>
				<!-- <u-loadmore :status="status" /> -->
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	let timer = null
	import api from '@/api/api.js'
	export default{
		data() {
			return {
				item_self_id:"",
				list: [],
				current: 0,
				status: '',
				statusNum: '',
				pageNum: '1',
				stat: 'loadmore',
				linelist: [],
				show: false,
				content: '',
				title: '',
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
				self_id: '',
				data_id: '',
				mescroll: null,
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					empty: {
						icon: "https://www.mescroll.com/img/mescroll-empty.png", //图标,默认null
						fixed: true, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						top: "300rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						tip: '~ 暂无线路 ~', // 提示
						zIndex: 99 // fixed定位z-index值
					}
				},
				editdata:[],
			}
		},
		created() {
			// this.getline()
		},
		onShow() {
			uni.$on('loadlist', () => {
				this.mescroll.resetUpScroll()
			})
		},
		methods:{
			//获取线路信息
			// getline(){
			// 	var data={
			// 		self_id:''
			// 	}
			// 	api.tms_line_createLine(data).then(res=>{
			// 		if(res.code==200){
			// 			console.log(JSON.stringify(res))
			// 		}
			// 	})
			// },
			// 加载列表数据
			loadlist(pageNum){
				var data = {
					startcity: '',
					endcity: '',
					page: pageNum,
					template: '',
					state: '',
					status: '1',
				}
				var project_type=uni.getStorageSync("project_type")
				console.log(project_type)
				api.tms_line_linePage(data).then(res=>{
					// min_number:this.qibujianshu,
					// start_price:this.qibujiage,
					// unit_price:this.chaochujianshudanjia,
					// max_price:this.fengdingjiage,
					// if(res.code==200){
					// 	this.linelist = res.data.items;
					// }
					// console.log('res' + JSON.stringify(res))
					this.mescroll.endSuccess(res.data.items.length);
					if (pageNum == 1) {
						// console.log(mescroll.num)
						this.linelist = [];
					}
					this.linelist = this.linelist.concat(res.data.items);
					
				})
			},
			toadd(){
				uni.navigateTo({
					url:"/pages/line/add"
				})
			},
			del(self_id){
				this.content = '你确定要删除当前这条数据吗'
				this.show = true;
				this.self_id = self_id;
				console.log(this.self_id)
			},
			confirm(){
				var data={
					self_id:this.self_id
				}
				console.log(data.self_id)
				// var project_type=uni.getStorageSync("project_type")
				// console.log(project_type)
				api.tms_line_lineDelFlag(data).then(res=>{
					if(res.code==200){
						console.log("删除成功")
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
						uni.$emit('loadlist');	
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
					}
				})	
						
			},
			editr(item,index){
				// console.log(item.self_id)
				// this.item_self_id=item.self_id
				// console.log(this.item_self_id)
				// var data={
				// 	self_id:this.item_self_id
				// }
				// console.log(data.self_id)
				// 	api.tms_line_createLine(data).then(res=>{
				// 		if(res.code==200){
				// 			console.log(JSON.stringify(res))
				// 			console.log(res.data.info)
				// 			this.editdata=res.data.info
				// 			console.log(JSON.stringify(this.editdata))
				// 			this.$store.commit("lineedit",this.editdata)
				// 		}
				// 	})
					this.$store.commit("lineedit",item)
				uni.navigateTo({
					url:'/pages/line/edit'
				})
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
				this.loadlist(mescroll.num)
			},
			
			api_order_orderList() {
				console.log('134')
				var data = {}
			
			},
			api_order_orderPage(pageNum, status) {
				var data = {
					page: pageNum,
					status: status
				}
			},
			back(){
				uni.navigateBack()
			},
			// 详情
			details(item) {
				console.log(JSON.stringify(item))
				uni.navigateTo({
					url: '/pages/order_user/details?self_id=' + item.self_id
				})
			},
			//支付取消下单按钮点击
			vehical_done(item, id) {
				console.log(item)
				this.self_id = item.self_id
				this.data_id = id
			},
			
			
			
			
			
			
		}
		
	}
</script>

<style>
	page {
		background-color: #F3F4F6;
	}
</style>

<style lang="scss" scoped>
	.btn_color {
		width: 70px;
		// height: 30px;
		text-align: center;
		line-height: 30px;
		margin-left: 10px;
		display: inline-block;
		background-color: #0088f4;
		color: #fff;
		border: 1px solid #0088f4;
		border-radius: 5px;
	}

	.listlog {
		width: 190px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.content {
		// border-top: 1px solid #ccc;
		// padding-bottom: 80px;

		.list {
			// margin-left: 6px;
			// margin-right: 6px;
			// margin-top: 60px;

			.order {
				background-color: white;
				border-radius: 5px;
				border: 1px solid #cecfcf;
				margin-bottom: 10px;
				margin-left: 6px;
				margin-right: 6px;

				.wrap {
					padding-left: 10px;
					padding-right: 10px;

					.set_center_img {
						height: 6px;
						width: 70%;
					}
				}
			}


		}
	}
</style>