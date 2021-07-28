<template>
	<view>
		<u-navbar :is-back="false" title="发布线路">
			<view class="slot-wrap" style="margin-left: 10px;" @click="gotabpolice">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<!-- 添加地址 -->
			<view style="margin: 10px;background-color: white;padding:16px;border-radius: 15px;">
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
					<view class="address clearfix" style="float: left;" >
						<image src="../../images/s.png" mode=""
							style="width: 25px;height: 25px;padding-top: 10px;padding-right: 10px;"></image>
						<view class="send_ad">
							<p class='contact'>{{item.gather_info}}</p>
							<p class='adds'>{{item.gather_info_tel}}</p>
						</view>
					</view>
					<view class="add">
					</view>
				</view>
			</view>
			<!-- 表单 -->
			<view style="margin: 10px;background-color: white;padding:16px;border-radius: 15px;">
				<u-row gutter="16"> 
					<u-col span="6" class="left">
						<span id="leftspan">提货服务</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-switch v-model="checked1"></u-switch>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16"  class="row" v-if="this.checked1">
					<u-col span="6" class="left">
						<span id="leftspan">提货费</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-keyboard ref="uKeyboard" @change="tihuofei_change" mode="number" v-model="show3" :mask="false" @confirm="tihuofei_confirm" @backspace="tihuofei_back"></u-keyboard>
						<input placeholder="提货费(元)" />
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">配送服务(直配)</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-switch v-model="checked2"></u-switch>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16"  class="row" v-if="this.checked2">
					<u-col span="6" class="left">
						<span id="leftspan">配送费</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-keyboard ref="uKeyboard" @change="peisongfei_change" mode="number" v-model="show2" :mask="false" @confirm="peisongfei_confirm" @backspace="peisongfei_back"></u-keyboard>
						<input placeholder="配送费(元)" />
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">配送服务(共配)</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-switch v-model="checked3"></u-switch>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16"  class="row" v-if="this.checked3">
					<u-col span="6" class="left">
						<span id="leftspan">落地配价格</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-icon name="arrow-right" size="25" @click="toprice"></u-icon>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">发车时间</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-picker mode="time" v-model="show"  @confirm="datetimeback"></u-picker>
						<input  :placeholder="form.datetime"  @click="pickup(1)"/>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">时效</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<u-keyboard ref="uKeyboard" @change="shixiao_change" mode="number" v-model="show1" :mask="false" @confirm="shixiao_comfirm" @backspace="shixiao_back"></u-keyboard>
						<span @click="pickup(2)">{{form.date}}天</span>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">温控类型</span>
					</u-col>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="12" class="left">
						<u-button style="margin: 10px;" size="mini" type="default">冷冻</u-button>
						<u-button style="margin: 10px;" size="mini" type="default">冷藏</u-button>
						<u-button style="margin: 10px;" size="mini" type="default">常温</u-button>
						<u-button style="margin: 10px;" size="mini" type="default">恒温</u-button>
						<u-button style="margin: 10px;" size="mini" type="default">冷冻/冷藏</u-button>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed"style="margin-top:5px" ></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">干线周期</span>
					</u-col>
				</u-row>
				<u-row gutter="16" class="row" >
					<u-col span="12" class="left">
						<u-button style="margin-left: 15px;" size="mini" type="default">星期一</u-button>
						<u-button style="margin-left: 30px;" size="mini" type="default">星期二</u-button>
						<u-button style="margin-left: 30px;" size="mini" type="default">星期三</u-button>
						<u-button style="margin-left: 30px;" size="mini" type="default">星期四</u-button>
					</u-col>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="12" class="left">
						<u-button style="margin-left: 15px;" size="mini" type="default">星期五</u-button>
						<u-button style="margin-left: 30px;" size="mini" type="default">星期六</u-button>
						<u-button style="margin-left: 30px;" size="mini" type="default">星期日</u-button>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px" ></u-line>
				</u-row>
				<u-row gutter="16"style="margin-top: 15px;" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">单价(元/公斤)</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<input v-model="form.danjiaprice" placeholder="请输入单价"/>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">多点提货费(元/每点)</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<input v-model="form.duodianprice" placeholder="请输入多点提货费(元/每点)"/>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">最低工钱费(元)</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<input v-model="form.zuidiprice" placeholder="请输入最低工钱费(元)"/>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-button style="margin-top: 30px;" type="primary" size="default" shape="circle">发布</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	let timer = null
	import api from '@/api/api.js'
	export default{
		data(){
			return{
				checked1:false,
				checked2:false,
				checked3:false,
				// 控制时效
				show1:false,
				// 控制发车时间
				show:false,
				// 配送费
				show2:false,
				// 提货费
				show3:false,
				form:{
					// 单价
					danjiaprice:null,
					// 多点
					duodianprice:null,
					// 最低
					zuidiprice:null,
					// 时效
					date:1,
					//发车时间
					datetime:'请选择发车时间',
				},
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
				// 提货费
				tihuofei:null,
			}
		},
		created() {
			
		},
		methods:{
			// 配送费
			peisongfei_back(){},
			peisongfei_change(val){
				
			},
			peisongfei_confirm(){},
			// 时效
			shixiao_change(val){},
			shixiao_comfirm(){},
			shixiao_back(){},
			// 提货费选择器
			tihuofei_change(val){
				this.tihuofei+=val
				console.log(this.tihuofei)
			},
			tihuofei_back(){
				// 删除value的最后一个字符
				if(this.tihuofei.length) this.tihuofei = this.tihuofei.substr(0, this.tihuofei.length - 1);
				console.log(this.tihuofei);
			},
			tihuofei_confirm(){
				
			},
			toprice(){
				uni.navigateTo({
					url:'/pages/line/luodipeijiage'
				})
			},
			changeday(val){
				console.log(val)
				this.form.date+=val
				console.log(this.form.date)
			},
			backspace() {
				// 删除value的最后一个字符
				if(this.form.date.length) this.form.date = this.form.date.substr(0, this.form.date.length - 1);
				console.log(this.value);
			},
			// 日期回调
			datetimeback(item){
				this.form.datetime=item.year+"-"+item.month+"-"+item.day
			},
			// 时效回调
			shixiaoback(item){
				console.log(item)
				this.form.date=item
			},
			// 选择器弹起
			pickup(i){
				if(i==1){
					this.show=true
				}
				if(i==2){
					this.show1=true
				}
			},
			
			gotabpolice() {
				uni.navigateBack()
			},
		},
	}
</script>

<style>
	page {
		background-color: #F3F4F6;
	}
</style>
<style lang="scss" scoped>
	.row{
		margin-top: 15px;
	}
	#leftspan{
		font-size: 18px;
		font-weight: 400;
	}
	.left{
		text-align: left;
		font-size: 15px;
	}
	.right{
		text-align: right;
	}
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
	.clearfix:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
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