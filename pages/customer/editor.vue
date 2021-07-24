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
						<span style="padding-left: 5px;">所属公司</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="control_data" @confirm="returndata"></u-picker>
						<span @click="openpicker(1)">{{form.companyname}}</span>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 客户名称 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">客户名称</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input  v-model="form.name" id="all_name" type="text" style="" placeholder="请填写客户名称" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- 结算方式 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">结算方式</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="show3" mode="selector" :default-selector="[0]" :range="paymethod" @confirm="returnpaymethoddata"></u-picker>
						<span @click="openpicker(3)">{{form.pay}}</span>
					<!-- <input @click="openpicker(3)" v-model="form.pay" id="all_name" type="text" style="" :placeholder="form.pay" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">联系人</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.contact" id="all_name" type="text" style="" placeholder="请填写联系人" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">联系电话</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.phone" id="all_name" type="text" style="" placeholder="请填写手机号" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">地址信息</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
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
				// 支付方式
				paymethod:[],
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
				cost_type_list:[],
				group_code:"",
				// 公司
				control_data:[],//汉字
				control_data1:[],
				
							
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
				this.form.companyname=this.control_data[item];
				this.group_code=this.control_data1[item];
			},
			// 结算方式回调
			returnpaymethoddata(item){
				this.form.pay=this.paymethod[item]
				this.pay1=this.cost_type_list[item]
				console.log(this.pay1)
			},
			//确认提交
			submit(){
				var subdata={
					group_code: this.group_code,
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
				uni.navigateBack()
			},
			// 加载公司数据
			loadcompany(){
				var data={}
				api.company_companyPage(data).then(res=>{
					if(res.code==200){
						var list = res.data.items;
						this.control_data = [];
						for(var i in list){
							console.log(list[i].group_name);
							if (list[i].self_id && list[i].group_name) {
								var one = {};
								one.value = list[i].self_id;
								one.text = list[i].group_name;
								this.control_data.push(one.text);
								this.control_data1.push(one.value);
							}
						}
						console.log(this.control_data)
						console.log(this.control_data1)
					}
				})
			},
			// 加载客户数据
			loadcustomer(){
				var data={
					self_id:this.self_id
				}
				api.tms_group_createGroup(data).then(res=>{
					if(res.code==200){
						console.log(JSON.stringify(res))
						var list_cost = res.data.tms_cost_type;
						console.log(JSON.stringify(list_cost));
						this.cost_type_list = [];
						for(var i in list_cost){
							var name = list_cost[i].name
							if (list_cost[i].key && name) {
								var one = {};
								one.value = list_cost[i].key;
								one.text = name;
								this.paymethod.push(one.text);
								this.cost_type_list.push(one.value);
							}
					}
					console.log(this.paymethod)
					console.log(this.cost_type_list)
					// 渲染列表数据
					this.form.companyname=res.data.info.group_name
					this.form.pay=res.data.info.cost_type_show
					this.form.name=res.data.info.company_name
					this.form.contact=res.data.info.contacts
					this.form.phone=res.data.info.tel
					this.form.address=res.data.info.address
					this.pay1=res.data.info.cost_type
					this.group_code=res.data.info.group_code
				}
				})
			}
			
		},
		onLoad() {
			
		},
		created() {
			
			//初始化页面
			var custedit=this.$store.state.custedit
			this.self_id=custedit.self_id
			console.log(this.self_id)
			this.loadcustomer()
			this.loadcompany()
		}
	}
</script>

<style>
	.content {
		width: 90%;
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
