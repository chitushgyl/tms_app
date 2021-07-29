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
				<view class="clearfix">
					<view class="address clearfix" style="float: left;margin-bottom: 10px;margin-top: 20px;"
						>
						<image src="../../images/f.png" mode=""
							style="width: 25px;height: 25px;padding-top: 10px;padding-right: 10px;"></image>
						<view class="send_ad" @click="toaddress(1)">
							<p class='contact'>{{this.address_list.send_info}}</p>
							<p class='adds'>{{this.address_list.send_info_tel}}</p>
						</view>
					</view>
					<view class="address clearfix" style="float: left;" @click="toaddress" >
						<image src="../../images/s.png" mode=""
							style="width: 25px;height: 25px;padding-top: 10px;padding-right: 10px;"></image>
						<view class="send_ad" @click="toaddress(2)">
							<p class='contact'>{{this.address_list.gather_info}}</p>
							<p class='adds'>{{this.address_list.gather_info_tel}}</p>
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
						<input v-model="form.tihuofei"  placeholder="提货费(元)" />
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
						<!-- <u-keyboard ref="uKeyboard" @change="peisongfei_change" mode="number" v-model="show2" :mask="false" @confirm="peisongfei_confirm" @backspace="peisongfei_back"></u-keyboard> -->
						<input v-model="form.peisongfei" placeholder="配送费(元)" />
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
						<!-- <u-keyboard ref="uKeyboard" @change="shixiao_change" mode="number" v-model="show1" :mask="false" @confirm="shixiao_comfirm" @backspace="shixiao_back"></u-keyboard> -->
						<!-- <span @click="pickup(2)">{{form.date}}天</span> -->
						<input placeholder="时效(天)"  @click="pickup(2)" v-model="form.date" />
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
						<u-button style="margin: 10px;" size="mini" :type="controllerbtn1" @click="control(1)">冷冻</u-button>
						<u-button style="margin: 10px;" size="mini" :type="controllerbtn2" @click="control(2)">冷藏</u-button>
						<u-button style="margin: 10px;" size="mini" :type="controllerbtn3" @click="control(3)">常温</u-button>
						<u-button style="margin: 10px;" size="mini" :type="controllerbtn4" @click="control(4)">恒温</u-button>
						<u-button style="margin: 10px;" size="mini" :type="controllerbtn5" @click="control(5)">冷冻/冷藏</u-button>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed"style="margin-top:5px" ></u-line>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="6" class="left">
						<span id="leftspan">干线周期</span>
					</u-col>
				</u-row>
				<u-row gutter="16" class="row" style="display: flex;">
					<u-col span="12" class="left">
						<u-button style="margin-left: 15px;" size="mini" :type="btncolor1" @click="day(1)">星期一</u-button>
						<u-button style="margin-left: 30px;" size="mini" :type="btncolor2" @click="day(2)">星期二</u-button>
						<u-button style="margin-left: 30px;" size="mini" :type="btncolor3" @click="day(3)">星期三</u-button>
						<u-button style="margin-left: 30px;" size="mini" :type="btncolor4" @click="day(4)">星期四</u-button>
					</u-col>
				</u-row>
				<u-row gutter="16" class="row">
					<u-col span="12" class="left">
						<u-button style="margin-left: 15px;" size="mini" :type="btncolor5" @click="day(5)">星期五</u-button>
						<u-button style="margin-left: 30px;" size="mini" :type="btncolor6" @click="day(6)">星期六</u-button>
						<u-button style="margin-left: 30px;" size="mini" :type="btncolor0" @click="day(0)">星期日</u-button>
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
						<span id="leftspan">最低干线费(元)</span>
					</u-col>
					<u-col style="text-align: right;" span="6">
						<input v-model="form.zuidiprice" placeholder="请输入最低干线费(元)"/>
					</u-col>
					<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
				</u-row>
				<u-button @click="sumbuit1" style="margin-top: 30px;" type="primary" size="default" shape="circle">发布</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	let timer = null
	let count0=0
	let count1=0
	let count2=0
	let count3=0
	let count4=0
	let count5=0
	let count6=0
	let e1=0
	let e2=0
	let e3=0
	let e4=0
	let e5=0
	import api from '@/api/api.js'
	export default{
		data(){
			return{
				controllerbtn1:"default",
				controllerbtn2:"default",
				controllerbtn3:"default",
				controllerbtn4:"default",
				controllerbtn5:"default",
				group_code:"",
				//星期按钮颜色控制
				btncolor0:"default",
				btncolor1:"default",
				btncolor2:"default",
				btncolor3:"default",
				btncolor4:"default",
				btncolor5:"default",
				btncolor6:"default",
				// 干线周期
				time1:"N",
				time2:"N",
				time3:"N",
				time4:"N",
				time5:"N",
				time6:"N",
				time0:"N",
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
					danjiaprice:'',
					// 多点
					duodianprice:'',
					// 最低
					zuidiprice:'',
					// 时效
					date:'',
					//发车时间
					datetime:'请选择发车时间',
					// 提货费
					tihuofei:'',
					//配送费
					peisongfei:'',
				},
				address_list: {
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
					clod_name: '',
				},
				//温控
				controller:"",
				sumbuit:{
					gather_address_id:"",//常用发货地址id
					send_address_id:"",//常用送货地址id
					gather_qu:"",
					gather_address:"",
					gather_contacts_name:"",
					gather_contacts_tel:"",
					send_qu:"",
					send_address:"",
					send_contacts_name:"",
					send_contacts_tel:"",
				}
				
			}
		},
		created() {
			// var a=this.$store.state.linesendadd
			// console.log(a)
			// if(a!=null){
			// 	// 装车地址地址
			// 	this.address_list.send_info=a.sheng_name+a.shi_name+a.qu_name+a.address
			// 	console.log(this.address_list.send_info)
			// 	// 装车联系人
			// 	this.send_info_tel=a.contacts
			// }
			//当前登录用户的公司
			this.group_code=uni.getStorageSync("group_code")
			console.log(this.group_code)
		},
		onShow() {
			// console.log(this.address_list.send_info)
			var a=this.$store.state.linesendadd
			console.log(a)
			// gather_address_id:"",//常用发货地址id
			// send_address_id:"",//常用送货地址id
			// gather_qu:"",
			// gather_address:"",
			// gather_contacts_name:"",
			// gather_contacts_tel:"",
			// send_qu:"",
			// send_address:"",
			// send_contacts_name:"",
			// send_contacts_tel:"",
			
			if(a!=null){
				// 装车地址地址
				this.address_list.send_info=a.sheng_name+a.shi_name+a.qu_name+a.address
				console.log(this.address_list.send_info)
				// 装车联系人
				this.address_list.send_info_tel=a.contacts
				console.log(this.address_list.send_info_tel)
				this.sumbuit.gather_address_id=a.self_id
				this.sumbuit.gather_qu=a.qu_name
				this.sumbuit.gather_address=a.address
				this.sumbuit.gather_contacts_name=a.contacts
				this.sumbuit.gather_contacts_tel=a.tel
			}
			var b=this.$store.state.linegatadd
			console.log(b)
			if(b!=null){
				// 收货地址地址
				this.address_list.gather_info=b.sheng_name+b.shi_name+b.qu_name+b.address
				console.log(this.address_list.gather_info)
				// 收货地联系人
				this.address_list.gather_info_tel=b.contacts
				console.log(this.address_list.gather_info_tel)
				this.sumbuit.send_address_id=a.self_id
				this.sumbuit.send_qu=a.qu_name
				this.sumbuit.send_address=a.address
				this.sumbuit.send_contacts_name=a.contacts
				this.sumbuit.send_contacts_tel=a.tel
			}
		},
		methods:{
			//温控按钮变色
			control(a){
				console.log(a)
				if(a==1){
					e1++
					if(e1%2==1){
						this.controllerbtn1="primary"
						this.controller="freeze"
						console.log(this.controller)
					}
					if(e1%2==0){
						this.controllerbtn1="default"
					}
				}
				if(a==2){
					e2++
					if(e2%2==1){
						this.controllerbtn2="primary"
						this.controller="refrigeration"
						console.log(this.controller)
					}
					if(e2%2==0){
						this.controllerbtn2="default"
					}
				}
				if(a==3){
					e3++
					if(e3%2==1){
						this.controllerbtn3="primary"
						this.controller="normal"
						console.log(this.controller)
					}
					if(e3%2==0){
						this.controllerbtn3="default"
					}
				}
				if(a==4){
					e4++
					if(e4%2==1){
						this.controllerbtn4="primary"
						this.controller="constant"
						console.log(this.controller)
					}
					if(e4%2==0){
						this.controllerbtn4="default"
					}
				}
				if(a==5){
					e5++
					if(e5%2==1){
						this.controllerbtn5="primary"
						this.controller="cold"
						console.log(this.controller)
					}
					if(e5%2==0){
						this.controllerbtn5="default"
					}
				}
			},
			day(i){
				if(i==1){
					count1++
					if(count1%2==1){
						this.time1="Y"
						this.btncolor1="primary"
					}
					if(count1%2==0){
						this.time1="N"
						this.btncolor1="default"
					}
					console.log(this.time1)
				}
				if(i==2){
					count2++
					if(count2%2==1){
						this.time2="Y"
						this.btncolor2="primary"
					}
					if(count2%2==0){
						this.time2="N"
						this.btncolor2="default"
					}
					console.log(this.time2)
				}
				if(i==3){
					count3++
					if(count3%2==1){
						this.time3="Y"
						this.btncolor3="primary"
					}
					if(count3%2==0){
						this.time3="N"
						this.btncolor3="default"
					}
					console.log(this.time3)
				}
				if(i==4){
					count4++
					if(count4%2==1){
						this.time4="Y"
						this.btncolor4="primary"
					}
					if(count4%2==0){
						this.time4="N"
						this.btncolor4="default"
					}
					console.log(this.time4)
				}
				if(i==5){
					count5++
					if(count5%2==1){
						this.time5="Y"
						this.btncolor5="primary"
					}
					if(count5%2==0){
						this.time5="N"
						this.btncolor5="default"
					}
					console.log(this.time5)
				}
				if(i==6){
					count6++
					if(count6%2==1){
						this.time6="Y"
						this.btncolor6="primary"
					}
					if(count6%2==0){
						this.time6="N"
						this.btncolor6="default"
					}
					console.log(this.time6)
				}
				if(i==0){
					count0++
					if(count%2==1){
						this.time0="Y"
						this.btncolor0="primary"
					}
					if(count%2==0){
						this.time0="N"
						this.btncolor0="default"
					}
					console.log(this.time0)
				}
				
			},
			// 提交
			sumbuit1(){
				if(this.checked1){
					var picktype="pick"
				}
				if(this.checked2){
					var sendtype="send"
				}
				var data={
					type:"alone",//线路类型
					price:this.form.danjiaprice,//单价
					min_money:this.form.zuidiprice,//最低干线费用
					pick_type:picktype,//是否提货
					send_type:sendtype,//是否配送
					pick_price:this.form.tihuofei,//提货费
					send_price:this.form.peisongfei,//配送费
					depart_time:this.form.datetime,//发车时间
					control:this.controller,//温度
					group_code:this.group_code,//公司
					gather_address_id:this.sumbuit.gather_address_id,//常用发货地址id
					send_address_id:this.sumbuit.send_address_id,//常用送货地址id
					gather_qu:this.sumbuit.gather_qu,
					gather_address:this.sumbuit.gather_address,
					gather_contacts_name:this.sumbuit.gather_contacts_name,
					gather_contacts_tel:this.sumbuit.gather_contacts_tel,
					send_qu:this.sumbuit.send_qu,
					send_address:this.sumbuit.send_address,
					send_contacts_name:this.sumbuit.send_contacts_name,
					send_contacts_tel:this.sumbuit.send_contacts_tel,
					shift_number:'',//班次号
					trunking:this.form.date,//时效
					more_price:this.form.duodianprice,//多点提货费
					special:"2",
					time1:this.time1,//周一
					time2:this.time2,//周二
					time3:this.time3,//周三
					time4:this.time4,//周四
					time5:this.time5,//周五
					time6:this.time6,//周六
					time0:this.time0,//周日
				}
				api.tms_address_addAddress(data).then(res=>{
					if(res.code==200){
						console.log("添加成功")
						var pages = getCurrentPages(); //当前页
						var beforePage = pages[pages.length - 2]; //上个页面路由
						beforePage.$vm.loadlist(1)
						uni.navigateBack()
					}
				})
				
			},
			//去常用地址
			toaddress(i){
				console.log(i)
				if(i==1){
					uni.navigateTo({
						url:'/pages/address/index?data='+'1'+''
					})
				}
				if(i==2){
					uni.navigateTo({
						url:'/pages/address/index?data='+'2'+''
					})
				}
			},
			// 配送费
			// peisongfei_back(){},
			// peisongfei_change(val){
				
			// },
			// peisongfei_confirm(){},
			// 时效
			// shixiao_change(val){
			// 	if(this.form.data<10){
			// 		this.form.data=val
			// 	}
			// 	if(this.form.data>=10){
			// 		this.form.data+=val
			// 	}
			// 	// this.form.date+=val
			// },
			// shixiao_comfirm(item){
			// 	this.form.date=item
			// },
			// shixiao_back(){
			// 	// 删除value的最后一个字符
			// 	// if(this.form.date.length) this.form.date = this.form.date.substr(0, this.form.date.length - 1);
			// 	// console.log(this.form.date);
			// },
			// // 提货费选择器
			// tihuofei_change(val){
			// 	this.tihuofei+=val
			// 	console.log(this.tihuofei)
			// },
			// tihuofei_back(){
			// 	// 删除value的最后一个字符
			// 	if(this.tihuofei.length) this.tihuofei = this.tihuofei.substr(0, this.tihuofei.length - 1);
			// 	console.log(this.tihuofei);
			// },
			// tihuofei_confirm(){
				
			// },
			toprice(){
				uni.navigateTo({
					url:'/pages/line/luodipeijiage'
				})
			},
			// changeday(val){
			// 	console.log(val)
			// 	this.form.date+=val
			// 	console.log(this.form.date)
			// },
			backspace() {
				// 删除value的最后一个字符
				if(this.form.date.length) this.form.date = this.form.date.substr(0, this.form.date.length - 1);
				console.log(this.value);
			},
			// 日期回调
			datetimeback(item){
				this.form.datetime=item.year+"-"+item.month+"-"+item.day
				console.log(this.form.datetime)
			},
			// 时效回调
			// shixiaoback(item){
			// 	console.log(item)
			// 	this.form.date=item
			// },
			//选择器弹起
			pickup(i){
				if(i==1){
					this.show=true
				}
				// if(i==2){
				// 	this.show1=true
				// }
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