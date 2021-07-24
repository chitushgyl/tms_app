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
						<span style="padding-left: 5px;">公司</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector" @confirm="returndata"></u-picker>
						<span @click="openpicker(1)">{{form.companyname}}</span>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 公司类型 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">公司类型</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="show2" mode="selector" :default-selector="[0]" :range="selectortype" @confirm="returncompanydata"></u-picker>
						<span @click="openpicker(2)">{{form.companyleibie}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 客户名称 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">客户名称</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.name" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
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
						<input v-model="form.contact" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">联系电话</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.phone" id="all_name" type="text" style="" placeholder="请输入" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						<span style="padding-left: 5px;">联系地址</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
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
				selector:[],
				//公司名对应id
				selectorid:[],
				// 公司类型
				selectortype:["普通承运公司","落地配公司"],
				// 支付方式
				paymethod:[],
				//支付方式编号列表
				// costidlist:[],
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
				control_data:[],
				self_id:"",			
				cost_type_list:[],
				group_code:"",
				normal:"",
				cost_type:"",
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
				console.log(item)
				this.form.companyname=this.selector[item];
				this.group_code=this.selectorid[item];
				console.log(this.form.companyname)
				console.log(this.group_code)
			},
			// 公司类型回调
			returncompanydata(item){
				console.log(item)
				this.form.companyleibie=this.selectortype[item]
				if(this.form.companyleibie=="普通承运公司"){
					this.normal="N"
					console.log(this.normal)
				}
				if(this.form.companyleibie=="落地配公司"){
					this.normal="S"
					console.log(this.normal)
				}
			},
			// 结算方式回调
			returnpaymethoddata(item){
				this.form.pay=this.paymethod[item]
				this.cost_type=this.cost_type_list[item]
				console.log(this.cost_type)
			},
			//确认提交
			submit(){
				var data={
					group_code :this.group_code,
					normal:this.normal,
					company_name:this.form.name,
					cost_type:this.cost_type,
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
				uni.navigateBack()
			},
			//加载公司列表数据
			load_company_companyPage(){
				var data={}
				api.company_companyPage(data).then(res=>{
					if(res.code==200){
						var conmpanyList=res.data.items
						for (var i in conmpanyList) {
							var groupName=conmpanyList[i].group_name
							var groupid=conmpanyList[i].group_code
							this.selector.push(groupName)
							this.selectorid.push(groupid)
						}
					}
				})
			},
			//跳转至编辑页时加载列表的数据
			loadedit(){
				var data={
					self_id:this.self_id,
				}
				console.log(data.self_id)
				api.tms_group_createGroup(data).then(res=>{
					if(res.code==200){
						var list_cost = res.data.tms_cost_type;
						console.log(JSON.stringify(list_cost));
						this.form.name=res.data.info.company_name//客户名称
						this.form.contact=res.data.info.contacts//联系人
						this.form.phone=res.data.info.tel//客户电话
						this.form.address=res.data.info.address//联系地址
						this.form.companyname=res.data.info.create_user_name //公司名称
						this.group_code=res.data.info.group_code //group_code
						this.normal=res.data.info.normal //normal
						this.cost_type=res.data.info.cost_type //cost_type
						if(res.data.info.normal=="N"){
							this.form.companyleibie="普通承运公司" //公司类别
						}
						if(res.data.info.normal=="S"){
							this.form.companyleibie="落地配公司" //公司类别
						}
						
						// this.form.companyleibie=a.type_show //公司类别
						this.form.pay=res.data.info.cost_type_show //支付方式
						this.cost_type_list=[];
						for (var i in list_cost) {
							var name = list_cost[i].name
							console.log(list_cost[i].name);
							if (list_cost[i].key && name) {
								var one = {};
								one.value = list_cost[i].key;
								one.text = name;
								this.cost_type_list.push(one.value);
								this.paymethod.push(one.text);
							}
						}
					}
				})
			}
		},
		onLoad() {
			
		},
		created() {
			var a=this.$store.state.a1
			this.self_id=a.self_id
			this.loadedit()
			this.load_company_companyPage()
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
