<template>
	<view class="add" style="height: 100%;background-color: #F3F4F6;">
		<!-- 头部 -->
		<u-navbar :is-back="false" :border-bottom='false' title="编辑承运商">
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
						公司
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector" @confirm="returndata"></u-picker>
						<span @click="openpicker(1)">{{form.companyname}}</span>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 公司类型 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						公司类型
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="show2" mode="selector" :default-selector="[0]" :range="selectortype" @confirm="returncompanydata"></u-picker>
						<span @click="openpicker(2)">{{form.companyleibie}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 客户名称 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						客户名称
					</u-col>
					<u-col span="5">
						<input v-model="form.name" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
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
						<input v-model="form.contact" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						联系电话
					</u-col>
					<u-col span="5">
						<input v-model="form.phone" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
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
				selector:["公司名称1","公司名称2","公司名称3"],
				// 公司类型
				selectortype:["普通承运公司","落地配公司"],
				// 支付方式
				paymethod:["月结","周结","日结","现付"],
				// 控制选择器弹出
				show1: false,
				show2: false,
				show3: false,
				form: {
					companyname:'请选择',//公司名称
					companyleibie:'请选择',//公司类别
					pay:'请选择',
					name:'',//客户名称	
					contact:'',//联系人
					phone:'',//客户电话
					address:'',//联系地址
				},
				self_id:"",			
							
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
			},
			//确认提交
			submit(){
				// group_code: "group_202106121328596313571586",//公司
				// normal:this.companyType,
				// cost_type:this.pay,
				// company_name:  this.form.company_name,       //客户名称
				// tel: this.form.tel,//手机号
				// contacts: this.form.contacts, //联系人
				// address: this.form.address,//地址
				// self_id: "",
				// type: 'carriers',
				var data={
					group_code :"group_202106121328596313571586",
					normal:this.form.companyleibie,
					company_name:this.form.name,
					cost_type:this.form.pay,
					tel:this.form.phone,
					contacts:this.form.contact,
					address:this.form.address,
					self_id:this.self_id,
					type: 'carriers',
				}
				api.tms_group_addgroup(data).then(res=>{
					if(res.code==200){
						console.log("編輯成功")
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
			// suah(){
			// 	var data={}
			// 	api.user_add_binding(data).then(res=>{
					
			// 	})
			// }
		},
		onLoad() {
			
		},
		created() {
			var a=this.$store.state.a1
			console.log(a.self_id)
			console.log(a.company_name)
			console.log(a.create_user_name)
			console.log(a.type)
			console.log(a.group_name)
			console.log(a.cost_type)
			console.log(a.contacts)
			console.log(a.address)
			console.log(a.tel)
			console.log(a.group_code)
			console.log(a.cost_type_show)
			console.log(a.use_flag)
			console.log(a.type_show)
			
			// form: {
			// 	companyname:'请选择',//公司名称
			// 	companyleibie:'请选择',//公司类别
			// 	pay:'请选择',
			// 	name:'',//客户名称	
			// 	contact:'',//联系人
			// 	phone:'',//客户电话
			// 	address:'',//联系地址
			// },
			this.self_id=a.self_id
			this.form.companyname=a.group_name //公司名称
			this.form.companyleibie=a.type_show //公司类别
			this.form.pay=a.cost_type_show //支付方式
			this.form.name=a.company_name //客户名称
			this.form.contact=a.contacts//联系人
			this.form.phone=a.tel//客户电话
			this.form.address=a.address//联系地址
			
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
