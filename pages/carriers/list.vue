<template>
	<view  style="height: 100%;background-color: #F3F4F6;">
			<!-- 头部 -->
			<u-navbar :is-back="false" :border-bottom='false' title="承运商列表">
				<view @click="toindex" class="slot-wrap" style="margin-left: 10px;">
					<u-icon  name="arrow-leftward" size="28"></u-icon>
				</view>
			</u-navbar>
			<view class="content">
			<view class="wrap" v-if="carriers!=''">
				<!-- <view class="wrap"> -->
				<u-row gutter="16" v-for="(item,index) in carriers" :key='index'
					style="background-color: white;padding-top: 10px;padding-bottom: 10px;margin-bottom: 15px;"
						>
					<u-col span="8">
						<view class="demo-layout bg-purple" style="margin-left: 10px;">
							<p style='margin-bottom: 10px;font-size: 16px;'>{{item.company_name}}</p>
							<p style='font-size: 13px;color: #555555;'>{{item.company_name}}&nbsp;{{item.tel}}</p>
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
						<view class="demo-layout bg-purple-dark">
							<image src="../../images/tool/edit.png" mode=""
								style="width: 15px;height: 15px;vertical-align:sub;"></image>
							<span style='color:#0088F4;' @click="editcarriers(item,index)">编辑</span>
						</view>
					</u-col>
				</u-row>
				<!-- <u-loadmore :status="status" /> -->
			</view>
			<!-- 没有请求到数据时显示页面 -->
			<view v-else>
				<view class="listlog">
					<image src="../../images/empty/noAddress.png" mode=""></image>
					<p style='text-align: center;'>暂无承运商</p>
				</view>
			</view>
			</view>
			<u-button type="primary" shape="circle"
				style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="toadd">
				添加承运商</u-button>
				<u-modal v-model="show" :content="content" @confirm="confirm" :show-cancel-button='true'
					:cancel-style="cancel_style"></u-modal>
	</view>
</template>

<script>
	import api from '@/api/api.js';
	export default {
		data(){
			return{
				// 承运端列表
				carriers:[],
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
		created() {
			this.loaddata()
		},
		onPullDownRefresh() {
			// var page = 1
			// this.api_address_addressPage(page)
			this.loaddata()
		},
		methods:{
			//返回主页
			toindex(){
				uni.switchTab({
					url:'/pages/user/index'
				})
			},
			// 加载列表数据
			loaddata(){
				var data={
					page: 1,
					type: "carriers"
				}
				uni.showNavigationBarLoading()
				api.tms_group_groupPage(data).then(res=>{
					if(res.code==200){
						uni.stopPullDownRefresh();
						uni.hideNavigationBarLoading();
						this.carriers=res.data.items
						console.log("加载数据成功")
						console.log(this.carriers)
					}
						
				})
			},
			// 编辑
			editcarriers(item,index){
				console.log(item)
				console.log(index)
				var data={}
				data.self_id=item.self_id
				data.company_name=item.company_name
				data.create_user_name=item.create_user_name
				data.type=item.type
				data.group_name=item.group_name
				data.cost_type=item.cost_type
				data.contacts=item.contacts
				data.address=item.address
				data.tel=item.tel
				data.group_code=item.group_code
				data.cost_type_show=item.cost_type_show
				data.use_flag=item.use_flag
				data.type_show=item.type_show
				this.$store.commit('a1',data)
				console.log(data.self_id)
				console.log(data.company_name)
				console.log(data.create_user_name)
				console.log(data.type)
				console.log(data.group_name)
				console.log(data.cost_type)
				console.log(data.contacts)
				console.log(data.address)
				console.log(data.tel)
				console.log(data.group_code)
				console.log(data.cost_type_show)
				console.log(data.use_flag)
				console.log(data.type_show)
				uni.navigateTo({
					url:'/pages/carriers/editor'
				})
				// uni.navigateTo({
				//     url: '/pages/info/index?name=1',
				// });
				
			},
			
			// 删除
			dele(item, index) {
				console.log(item)
				console.log(index)
				this.content = '你确定要删除当前这条数据吗'
				this.show = true;
				this.self_id = item.self_id;
				this.index = index
				console.log(this.index)
			},
			confirm(){
				// 请求删除接口
				var data={
					self_id:this.self_id,
				}
				console.log("我是self_id"+data.self_id)
				api.tms_group_groupDelFlag(data).then(res=>{
					if(res.code==200){
						console.log(res)
						console.log("删除成功")
						this.loaddata()
					}
				})
			},
			//跳转添加页面
			toadd(){
				uni.navigateTo({
					url:'/pages/carriers/add'
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
