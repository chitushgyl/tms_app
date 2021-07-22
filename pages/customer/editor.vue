<template>
	<view class="add" style="height: 100%;background-color: #F3F4F6;">
		<!-- 头部 -->
		<u-navbar :is-back="false" :border-bottom='false' title="编辑客户">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<!-- 主体 -->
		<view class="content">
			<view class="wrap">
				<!-- 公司 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						所属公司
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector" @confirm="returndata"></u-picker>
						<span @click="openpicker(1)">{{form.companyname}}</span>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 客户名称 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						客户名称
					</u-col>
					<u-col span="5">
						<input  v-model="form.name" id="all_name" type="text" style="" placeholder="请填写客户名称" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- 结算方式 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						结算方式
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="show3" mode="selector" :default-selector="[0]" :range="paymethod" @confirm="returnpaymethoddata"></u-picker>
						<span @click="openpicker(3)">{{form.pay}}</span>
					<!-- <input @click="openpicker(3)" v-model="form.pay" id="all_name" type="text" style="" :placeholder="form.pay" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						联系人
					</u-col>
					<u-col span="5">
						<input v-model="form.contact" id="all_name" type="text" style="" placeholder="请填写联系人" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						联系电话
					</u-col>
					<u-col span="5">
						<input v-model="form.phone" id="all_name" type="text" style="" placeholder="请填写手机号" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						地址信息
					</u-col>
					<u-col span="5">
						<input v-model="form.address" id="all_name" type="text" style="" placeholder="请填写联系地址" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
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
				selector:["请选择","东风快递"],
				// 支付方式
				paymethod:["请选择","月结","周结","日结","现付"],
				// 控制选择器弹出
				show1: false,
				show2: false,
				show3: false,
				cost_type:"",
				self_id:"",
				pay1:"",
				form: {
					companyname:'请选择公司',//公司名称
					pay:'请选择支付方式',
					name:'',//客户名称	
					contact:'',//联系人
					phone:'',//客户电话
					address:'',//联系地址
				},
							
							
			}
		},
		methods:{
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
				this.form.companyname=this.selector[item];
			},
			// 公司类型回调
			returncompanydata(item){
				this.form.companyleibie=this.selectortype[item]
			},
			// 结算方式回调
			returnpaymethoddata(item){
				this.form.pay=this.paymethod[item]
				console.log(this.form.pay)
				if(this.form.pay=="月结"){
					this.pay1 = "monthly"
					console.log(this.pay1)
				}
				if(this.form.pay=="周结"){
					this.pay1 = "weeks"
					console.log(this.pay1)
				}
				if(this.form.pay=="日结"){
					this.pay1 = "day"
					console.log(this.pay1)
				}
				if(this.form.pay=="现付"){
					this.pay1 = "nowPay"
					console.log(this.pay1)
				}
			},
			//确认提交
			submit(){
				// var data={
				// 	group_code :"group_202106121328596313571586",
				// 	normal:this.form.companyleibie,
				// 	company_name:this.form.name,
				// 	cost_type:this.form.pay,
				// 	tel:this.form.phone,
				// 	contacts:this.form.contact,
				// 	address:this.form.address,
				// 	self_id:"company_202107201038347148747258",
				// 	type: 'carriers',
				// }
				var subdata={
					group_code: "group_202106121328596313571586",
					company_name:this.form.name,
					cost_type:this.pay1,
					tel:this.form.phone,
					contacts:this.form.contact,
					address:this.form.address,
					self_id:this.self_id,
					type:'customer'
				}
				console.log(subdata.group_code)
				console.log(subdata.company_name)
				console.log(subdata.cost_type)
				console.log(subdata.tel)
				console.log(subdata.contacts)
				console.log(subdata.address)
				console.log(subdata.self_id)
				console.log(subdata.type)
				console.log(JSON.stringify(subdata))
				api.tms_group_addgroup(subdata).then(res=>{
					if(res.code==200){
						console.log(res)
						console.log("编辑成功")
						this.back()
					}
				})
				console.log(this.form)
			},
			back(){
				uni.navigateTo({
					url:'/pages/carriers/list'
				})
			}
		},
		onLoad() {
			
		},
		created() {
			//初始化页面
			var custedit=this.$store.state.custedit
			console.log(custedit.group_name)
			console.log(custedit.group_code)
			console.log(custedit.self_id)
			console.log(custedit.company_name)
			console.log(custedit.type)
			console.log(custedit.tel)
			console.log(custedit.cost_type)
			console.log(custedit.contacts)
			console.log(custedit.address)
			console.log(custedit.cost_type_show)
			this.self_id=custedit.self_id
			this.form.companyname=custedit.group_name//公司名称
			this.form.pay=custedit.cost_type_show//结算
			this.form.name=custedit.company_name//客户
			this.form.contact=custedit.contacts//联系人
			this.form.phone=custedit.tel//电话
			this.form.address=custedit.address//地址
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
