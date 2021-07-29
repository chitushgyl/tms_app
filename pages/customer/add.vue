<template>
	<view class="add" style="height: 100%; background-color: #F3F4F6;">
		<!-- 头部 -->
		<u-navbar :is-back="false" :border-bottom='false' title="添加客户">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<u-toast ref="uToast" />
		<!-- 主体 -->
		<view class="content">
			<view class="wrap">
				<!-- 公司 -->
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom:1px solid #C0C0C0 ;">
					<u-col span="7" class="left">
						<span  style="margin-left: -4px;">所属公司</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector" @confirm="returndata"></u-picker>
						<span @click="openpicker(1)">{{form.companyname}}</span>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 客户名称 -->
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom:1px solid #C0C0C0 ;">
					<u-col span="7" class="left">
						<span  style="margin-left: -4px;">客户名称</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.name" id="all_name" type="text" style="" placeholder="请填写客户名称" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- 结算方式 -->
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom:1px solid #C0C0C0 ;">
					<u-col span="7" class="left">
						<span  style="margin-left: -4px;">结算方式</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="show3" mode="selector" :default-selector="[0]" :range="paymethod" @confirm="returnpaymethoddata"></u-picker>
						<span @click="openpicker(3)">{{form.pay}}</span>
					<!-- <input @click="openpicker(3)" v-model="form.pay" id="all_name" type="text" style="" :placeholder="form.pay" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom:1px solid #C0C0C0 ;">
					<u-col span="7" class="left">
						<span  style="margin-left: -4px;">联系人</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.contact" id="all_name" type="text" style="" placeholder="请填写联系人" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;background-color: #FFFFFF;border-bottom:1px solid #C0C0C0 ;">
					<u-col span="7" class="left">
						<span  style="margin-left: -4px;">联系电话</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.phone" id="all_name" type="text" style="" placeholder="请填写手机号" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom:1px solid #C0C0C0 ;">
					<u-col span="7" class="left">
						<span  style="margin-left: -4px;">地址信息</span>
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
				// 公司名
				selector:[],
				selectorgroupcode:[],
				companygroupcode:"",
				// 支付方式
				paymethod:["月结","周结","日结","现付"],
				// 控制选择器弹出
				show1: false,
				show3: false,
				pay1:"",
				form: {
					companyname:'请选择公司',//公司名称
					pay:'请选择结算方式',
					name:'',//客户名称	
					contact:'',//联系人
					phone:'',//客户电话
					address:'',//联系地址
				},
							
							
			}
		},
		methods:{
			// // 返回父页面
			// returnup(){
			// 	var pages=getCurrentPages();//当前页
			// 	var beforPage=pages[pages.length-2];//上个页面路由
			// 	beforPage.$vm.returnload()
			// 	uni.navigateBack()
			// },
			// 加载公司数据
			loadcompany(){
				var data={}
				api.company_companyPage(data).then(res=>{
					if(res.code==200){
						var list = res.data.items;
						for(var i in list){
							console.log(list[i].group_name);
							if (list[i].self_id && list[i].group_name) {
								var one = {};
								one.value = list[i].self_id;
								one.text = list[i].group_name;
								this.selector.push(one.text);
								this.selectorgroupcode.push(one.value);
							}
						}
						console.log(this.selector)
						console.log(this.selectorgroupcode)
					}
				})
			},
			
			// 弹出框弹出事件
			openpicker(i){
				if(i==1){
					this.show1=true
				}
				if(i==3){
					this.show3=true
				}
			},
			// 公司回调
			returndata(item){
				this.form.companyname=this.selector[item];
				this.companygroupcode=this.selectorgroupcode[item];
			},
			// 结算方式回调
			returnpaymethoddata(item){
				this.form.pay=this.paymethod[item]
				console.log(this.form.pay)
				if(this.form.pay== "月结"){
					this.pay1 = "monthly"
					console.log(this.pay1)
				}
				if(this.form.pay=="周结"){
					this.pay1 = "weeks"
					console.log(this.pay1)
				}
				if(this.form.pay== "日结"){
					this.pay1 = "day"
					console.log(this.pay1)
				}
				if(this.form.pay== "现付"){
					this.pay1 = "nowPay"
					console.log(this.pay1)
				}
			},
			//确认提交
			submit(){
				console.log(this.form)
				
				if(this.companygroupcode ==''){
					this.$refs.uToast.show({
						title: '所属公司不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.name ==''){
					this.$refs.uToast.show({
						title: '所客户姓名不能为空',
						type: 'default',
					})
					return false
				}
				if(this.pay1 ==''){
					this.$refs.uToast.show({
						title: '结算方式不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.contact ==''){
					this.$refs.uToast.show({
						title: '联系人不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.phone ==''){
					this.$refs.uToast.show({
						title: '联系电话不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.address ==''){
					this.$refs.uToast.show({
						title: '地址不能为空',
						type: 'default',
					})
					return false
				}
				var data={
					group_code:this.companygroupcode,
					company_name:this.form.name,
					cost_type:this.pay1,
					tel:this.form.phone,
					contacts:this.form.contact,
					address:this.form.address,
					self_id:"",
					type:'customer'
				}
				console.log(JSON.stringify(data))
				api.tms_group_addgroup(data).then(res=>{
					if(res.code==200){
						console.log(res)
						console.log("添加成功")
						var pages = getCurrentPages(); //当前页
						var beforePage = pages[pages.length - 2]; //上个页面路由
						beforePage.$vm.loaddata(1)
						this.$refs.uToast.show({
							title: "添加成功",
							type: 'success',
							position: 'bottom',
						})
						this.back()
					}
				})
			},
			back(){
				uni.navigateBack()
			}
		},
		onLoad() {
			
		},
		created() {
			this.loadcompany()
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
