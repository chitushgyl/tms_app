<template>
	<view  style="height: 100%;background-color: #F3F4F6;">
			<!-- 头部 -->
			<u-navbar :is-back="false" :border-bottom='false' title="我的车辆">
				<view class="slot-wrap" style="margin-left: 10px;">
					<u-icon @click="toindex" name="arrow-leftward" size="28"></u-icon>
				</view>
			</u-navbar>
			<view class="content">
			<view class="wrap" v-if="cars!=''">
				<!-- <view class="wrap"> -->
				<u-row gutter="16" v-for="(item,index) in cars" :key='index'
					style="background-color: white;padding-top: 10px;padding-bottom: 10px;margin-bottom: 15px;"
						>
					<u-col span="8">
						<view class="demo-layout bg-purple" style="margin-left: 10px;">
							<p style='margin-bottom: 10px;font-size: 16px;'>{{item.car_number}}</p>
							<p style='font-size: 13px;color: #555555;'>{{item.group_name}}&nbsp;{{item.tel}}</p>
						</view>
					</u-col>
					<u-col span="2">
						<view class="demo-layout bg-purple-light">
							<image src="../../images/tool/delete.png" mode=""
								style="width: 15px;height: 15px;vertical-align:sub;"></image>
							<span style='color: red;' @click="del(item,index)">删除</span>
						</view>
					</u-col>
					<u-col span="2">
						<view class="demo-layout bg-purple-dark">
							<image src="../../images/tool/edit.png" mode=""
								style="width: 15px;height: 15px;vertical-align:sub;"></image>
							<span style='color:#0088F4;' @click="toeditor(item,index)">编辑</span>
						</view>
					</u-col>
				</u-row>
				<!-- <u-loadmore :status="status" /> -->
			</view>
			<!-- 没有请求到数据时显示页面 -->
			<view v-else>
				<view class="listlog">
					<image src="../../images/empty/noAddress.png" mode=""></image>
					<p style='text-align: center;'>暂无车辆</p>
				</view>
			</view>
			</view>
			<u-button type="primary" shape="circle"
				style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="toadd">
				添加车辆</u-button>
				<!-- 删除的弹出层 -->
			<u-modal v-model="show" :content="content" @confirm="confirm" :show-cancel-button='true'
				:cancel-style="cancel_style"></u-modal>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data(){
			return{
				cars:[],
				show:false,
				content:'',
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
				self_id: '',
				index: 0
			}
		},
		onLoad() {
			
		},
		// onPullDownRefresh() {
		// 	console.log("下拉刷新已执行")
		// 	uni.showNavigationBarLoading(); //在当前页面显示导航条加载动画。
		// 			setTimeout(() => {
		// 				uni.hideNavigationBarLoading();
		// 				uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
		// 			}, 2000);
		// },
		created() {
			this.loadcarlist()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// var page = 1
			// this.api_address_addressPage(page)
			this.loadcarlist()
		},
		methods:{
			//返回主页
			toindex(){
				uni.switchTab({
					url:'/pages/user/index'
				})
			},
			//删除
			del(item,index){
				console.log(item)
				console.log(index)
				this.content = '你确定要删除当前这条数据吗'
				this.show = true;
				this.self_id = item.self_id;
				this.index = index
				console.log(this.index)
				console.log(this.show)
			},
			confirm(){
				var data={
					self_id:this.self_id
				}
				console.log("我是self_id"+data.self_id)
				api.tms_car_carDelFlag(data).then(res=>{
					if(res.code==200){
						console.log("删除成功")
						this.loadcarlist()
					}
				})
			},
			//加载列表数据
			loadcarlist(){
				var data={}
				uni.showNavigationBarLoading()
				api.tms_car_carPage(data).then(res=>{
					if(res.code==200){
						uni.stopPullDownRefresh();
						uni.hideNavigationBarLoading();
						this.cars=res.data.items
						console.log(this.cars)
						console.log("加载数据成功")
					}
				})
			},
			//跳转添加页面
			toadd(){
				uni.navigateTo({
					url:'/pages/car/add'
				})
			},
			// 跳转至编辑页面
			toeditor(item,index){
				console.log(item)
				console.log(index)
				var data={
					self_id:item.self_id,//车代号
					tms_control_type_show:item.tms_control_type_show,//温控
					car_number:item.car_number,//车牌号
					car_possess_show:item.car_possess_show,//车辆属性
					car_type_name:item.car_type_name,//车型
					contacts:item.contacts,//联系人
					tel:item.tel,//联系人手机号
					group_code:item.group_code//公司编号
				}
				this.$store.commit("caredit",data)
				
				uni.navigateTo({
					url:'/pages/car/editor'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		color: #000000 !important;
	}
	.content {
		width: 95%;
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
