<template>
	<view  style="background-color: #F3F4F6;">
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
							<p style='margin-bottom: 10px;font-size: 16px;'>{{item.car_number}}&nbsp;{{item.tel}}</p>
							<p style='font-size: 13px;color: #555555;'>{{item.car_type_name}}&nbsp;{{item.tms_control_type_show}}&nbsp;{{item.car_possess_show}}&nbsp;{{item.contacts}}</p>
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
				<u-loadmore :status="status" />
				<u-toast ref="uToast" />
			</view>
			<!-- 没有请求到数据时显示页面 -->
			<view v-if="showfalse">
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
	let timer = null
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
				index: 0,
				showfalse:false,
				addgroupcode:"",
				page:1,
				status: 'loadmore',
			}
		},
		onLoad() {
			
		},
		// created() {
		// 	this.loadcarlist()
		// },
		onShow() {
			this.loadcarlist(1)
		},
		//下拉刷新
		onPullDownRefresh() {
			// var page = 1
			// this.api_address_addressPage(page)
			this.loadcarlist(1)
		},
		//上拉加载
		onReachBottom() {
			var that = this;
			console.log(that.page)
			// 阻止重复加载
			if (this.timer !== null) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => this.loadcarlist(that.page), 500)
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
						this.$refs.uToast.show({
							title: "删除成功",
							type: 'default',
							position: 'bottom'
						})
						this.loadcarlist(1)
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
					}
				})
			},
			//加载列表数据
			loadcarlist(page){
				var project_type=uni.getStorageSync("project_type")
				console.log(project_type)
				var data={
					page:page
				}
				if(project_type=='user' || project_type== 'carriage'){
					api.api_car_carPage(data).then(res=>{
						if(res.code==200){
							console.log(JSON.stringify(res.data.info));
						}else{
							this.showfalse=true
						}
					})
				}else{
					uni.showNavigationBarLoading()
					api.tms_car_carPage(data).then(res=>{
						uni.stopPullDownRefresh();
						uni.hideNavigationBarLoading();
						if(res.code==200){
							this.addgroupcode=res.data.items[0].group_code
							var lis=res.data.items
							if(lis==''){
								this.status = 'nomore';
								return false
							}
							if (lis.length == 10) {
								this.status = 'loadmore';
							} else {
								this.status = 'nomore';
							}
							if (page == 1) {
								this.cars = lis;
							} else {
								console.log('1234')
								this.cars = this.cars.concat(lis)
							}
							this.page = ++page;
							console.log(this.cars)
							console.log(this.page)
							console.log(this.addgroupcode)
							console.log(this.cars)
							console.log("加载数据成功")
						}else{
							this.showfalse=true
							this.$refs.uToast.show({
								title: res.msg,
								type: 'default',
								position: 'bottom'
							})
						}
					})
				}
			},
			//跳转添加页面
			toadd(){
				var data={
					addgroup_code:this.addgroupcode
				}
				console.log(data.addgroup_code)
				this.$store.commit("caradd",data)
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
					group_code:item.group_code,//公司编号
					
				}
				this.$store.commit("caredit",data)
				
				uni.navigateTo({
					url:'/pages/car/editor'
				})
			},
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
