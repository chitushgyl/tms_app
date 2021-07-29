<template>
	<view  style="background-color: #F3F4F6;">
			<!-- 头部 -->
			<u-navbar :is-back="false" :border-bottom='false' title="承运商列表">
				<view @click="toindex" class="slot-wrap" style="margin-left: 10px;">
					<u-icon  name="arrow-leftward" size="28"></u-icon>
				</view>
			</u-navbar>
			<view class="content">
			<view class="wrap">
				<!-- <view class="wrap"> -->
				<mescroll-uni @init="mescrollInit" top="125" bottom="80" @down="downCallback" @up="upCallback"
					:up="upOption">
				<u-row gutter="16" v-for="(item,index) in carriers" :key='index'
					style="background-color: white;padding-top: 10px;padding-bottom: 10px;margin-bottom: 15px;width: 95%;margin-left: 10px;"
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
				</mescroll-uni>
				<!-- <u-loadmore :status="status" /> -->
				<u-toast ref="uToast" />
			</view>
			<!-- </mescroll-uni> -->
			<!-- 没有请求到数据时显示页面 -->
			</view>
			<u-button type="primary" shape="circle"
				style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="toadd">
				添加承运商</u-button>
				<u-modal v-model="show" :content="content" @confirm="confirm" :show-cancel-button='true'
					:cancel-style="cancel_style"></u-modal>
	</view>
</template>

<script>
	let timer = null
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
				index: 0,
				loadfalse:false,
				page:1,
				status: '',
				mescroll: null,
				showloading:null,
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					empty: {
						icon: "https://www.mescroll.com/img/mescroll-empty.png", //图标,默认null
						fixed: true, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						top: "300rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						tip: '~ 暂无承运商 ~', // 提示
						zIndex: 99 // fixed定位z-index值
					}
				},
			}
		},
		// onLoad() {
		// 	uni.$on('loaddata', () => {
		// 	    this.mescroll.resetUpScroll()
		// 	   })
		// },
		onShow() {
			uni.$on('loaddata', () => {
			    this.mescroll.resetUpScroll()
			   })
		},
		methods:{
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			// 下拉回调
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			// 上拉回调
			upCallback(mescroll) {
				this.loaddata(mescroll.num)
			},
			toindex(){
				uni.switchTab({
					url:'/pages/user/index'
				})
			},
			// 加载列表数据
			loaddata(page){
				var data={
					page: page,
					type: "carriers"
				}
				console.log(data.page)
				api.tms_group_groupPage(data).then(res=>{
					if(res.code==200){
						var lis = res.data.items;
						// this.carriers=res.data.items
						console.log("加载数据成功")
						this.mescroll.endSuccess(lis.length);
						if(page==1){
							this.carriers=[];
						}
						this.carriers=this.carriers.concat(lis)
						console.log(this.carriers)
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
					}
				})
			},
			// 编辑
			editcarriers(item,index){
				console.log(item)
				console.log(index)
				var data={}
				data.self_id=item.self_id
				this.$store.commit('a1',data)
				uni.navigateTo({
					url:'/pages/carriers/editor'
				})
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
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
						this.loaddata(1)
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
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
<style>
	page {
		background-color:#F3F4F6 ;
	}
</style>
<style lang="scss" scoped>
	.title{
		color: #000000 !important;
	}
	.content {
		width: 95%;
		padding-bottom: 80px;
		// background-color: white;
		border-radius: 10px;
		margin: 10px auto 0px;
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
