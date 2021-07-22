<template>
	<view class="add" style="height: 100%;background-color: #F3F4F6;">
		<!-- 头部 -->
		<u-navbar :is-back="false" :border-bottom='false' title="添加承运商">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<u-toast ref="uToast" />
		<!-- 主体 -->
		<view class="content">
			<view class="wrap">
				<!-- 公司 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						公司
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector_companyName" @confirm="returndata"></u-picker>
						<span @click="openpicker(1)">{{form.group_code}}</span>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 公司类型 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						公司类型
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="show2" mode="selector" :default-selector="[0]" :range="selector_companyType" @confirm="returncompanydata"></u-picker>
						<span @click="openpicker(2)">{{form.normal}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 客户名称 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						客户名称
					</u-col>
					<u-col span="5">
						<input v-model="form.company_name" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- 结算方式 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						结算方式
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="show3" mode="selector" :default-selector="[0]" :range="paymethod" @confirm="returnpaymethoddata"></u-picker>
						<span @click="openpicker(3)">{{form.cost_type}}</span>
					<!-- <input @click="openpicker(3)" v-model="form.pay" id="all_name" type="text" style="" :placeholder="form.pay" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						联系人
					</u-col>
					<u-col span="5">
						<input v-model="form.contacts" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						联系电话
					</u-col>
					<u-col span="5">
						<input v-model="form.tel" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						联系地址
					</u-col>
					<u-col span="5">
						<input v-model="form.address" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- <u-button @click="load_type_getType">加载</u-button> -->
				<u-button type="primary" shape="circle"
					style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="submit">
					确认</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data(){
			return{
				// 公司名
				selector_companyName:[],
				// 公司类型
				selector_companyType:["请选择","普通承运公司","落地配公司"],
				// 支付方式
				paymethod:["请选择","月结","周结","日结","现付"],
				// 控制选择器弹出
				show1: false,
				show2: false,
				show3: false,
				// var data = {
				// 	group_code: self.group_id,
				// 	company_name: name,
				// 	cost_type: self.paystate_id,
				// 	tel: contact_tel,
				// 	contacts: contact_name,
				// 	address: self.address ? self.address : '',
				// 	self_id: self.get_id,
				// 	type: 'carriers',
				// 	normal: self.types,
				// };
				pay:'',
				companyType:'',
				form: {
					group_code:'请选择',//公司名称
					normal:'请选择',//公司类别
					cost_type:'请选择', //结算方式
					company_name:'',//客户名称	
					contacts:'',//联系人
					tel:'',//客户电话
					address:'',//联系地址
					
				},
							
							
			}
		},
		created() {
			this.load_company_companyPage()
			// this.load_type_getType()
		},
		methods:{
			// 提交事件
			submit(){
				if(this.form.group_code=='请选择'){
					this.$refs.uToast.show({
						title: '公司名称不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.normal=='请选择'){
					this.$refs.uToast.show({
						title: '公司类型不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.company_name==''){
					this.$refs.uToast.show({
						title: '客户名称不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.cost_type==''){
					this.$refs.uToast.show({
						title: '结算方式不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.create_user_name==''){
					this.$refs.uToast.show({
						title: '联系人不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.tel==''){
					this.$refs.uToast.show({
						title: '联系电话不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.address==''){
					this.$refs.uToast.show({
						title: '地址不能为空',
						type: 'default',
					})
					return false
				}
				// var group_code = uni.getStorageSync("group_code")
				// var group_code = uni.getStorageSync("group_code")
				// console.log(this.group_code)
				var submidata={
				// if(form.normal ==  "普通承运公司" ){
				// 	this.companyType == "N"
				// 	console.log(this.companyType)
				// }
				// // // paymethod:["请选择","月结","周结","日结","现付"],
				// if(form.cost_type=="月结"){
				// 	this.pay == "monthly"
				// }
				// if(form.cost_type=="周结"){
				// 	this.pay == "weeks"
				// }
				// if(form.cost_type=="日结"){
				// 	this.pay == "day"
				// }
				// if(form.cost_type=="现付"){
				// 	this.pay == "nowPay"
				// }
				group_code: "group_202106121328596313571586",//公司
				normal:this.companyType,
				// normal: this.form.normal,//公司类型
				// cost_type: this.form.cost_type,//支付方式
				cost_type:this.pay,
				company_name:  this.form.company_name,       //客户名称
				tel: this.form.tel,//手机号
				contacts: this.form.contacts, //联系人
				address: this.form.address,//地址
				self_id: "",
				type: 'carriers',
				}
				console.log(submidata)
				api.tms_group_addgroup(submidata).then(res=>{
					if(res.code == 200){
						console.log(res)
						this.$refs.uToast.show({
							title: "添加成功",
							type: 'success',
							position: 'bottom',
							url:"/pages/carriers/list"
						})
					}else{
						thi.$refs.uToast.show({
							title: "添加失败",
							type:'error'
						})
					}
				})
			},
			// 加载公司列表数据
			load_company_companyPage(){
				var data={}
				api.company_companyPage(data).then(res=>{
					console.log(res)
					for(var i=0;i<res.data.items.length;i++){
						this.selector_companyName.push(res.data.items[i].group_name)
					}
				})
				
			},
			// 加载公司类型数据
			// load_type_getType(){
			// 	var data={}
			// 	api.type_getType(data).then(res=>{
			// 		console.log(res)
			// 	})
			// },
			// 弹出框弹出事件
			openpicker(i){
				if(i==1){
					this.show1=true
				}
				if(i==2){
					this.show2=true
				}
				if(i==3){
					this.show3=true
				}
			},
			// 公司回调
			returndata(item){
				this.form.group_code=this.selector_companyName[item];
				console.log(this.form.group_code)
			},
			// 公司类型回调
			returncompanydata(item){
				this.form.normal=this.selector_companyType[item]
				console.log(this.selector_companyType[1])
				console.log(this.form.normal)
				if(this.form.normal=this.selector_companyType[1]){
					this.companyType = "N"
					console.log(this.companyType)
				}
			},
			// 结算方式回调
			returnpaymethoddata(item){
				// paymethod:["请选择","月结","周结","日结","现付"],
				this.form.cost_type=this.paymethod[item]
				console.log(this.form.cost_type)
				if(this.form.cost_type== "月结"){
					this.pay = "monthly"
					console.log(this.pay)
				}
				if(this.form.cost_type=="周结"){
					this.pay = "weeks"
					console.log(this.pay)
				}
				if(this.form.cost_type== "日结"){
					this.pay = "day"
					console.log(this.pay)
				}
				if(this.form.cost_type== "现付"){
					this.pay = "nowPay"
					console.log(this.pay)
				}
			},
			
			back(){
				uni.navigateTo({
					url:'/pages/carriers/list'
				})
				this.load_company_companyPage()
			}
		},
		onLoad() {
			
		}
		
	}
</script>

<style>
	.content {
		width: 95%;
		margin: 10px auto 0px;
		padding-bottom: 80px;
		// background-color: white;
		border-radius: 10px;
	
		.wrap {
			.u-view {}
		}
	
		/* .listlog {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		} */
	}
	.a{
		color: #909399;
	}
	/* 左边文字 */
	.left{
		font-weight: 700;
		font-size: 15px;
	}
</style>
