<template>
	<view class="add" style="height: 100%;background-color: #F3F4F6;">
		<!-- 头部 -->
		<u-navbar :is-back="false" :border-bottom='false' title="编辑车辆">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<!-- 主体 -->
		<u-toast ref="uToast" />
		<view class="content">
			<view class="wrap">
				<!-- 车辆 -->
				<u-row @click="openpicker(1)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7"   class="left">
						<div style="margin-left: -4px;">车牌号码</div>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-keyboard :mask="false" @change="valChange" @backspace="backspace" ref="uKeyboard" mode="car" v-model="show1" ></u-keyboard>
						<!-- <u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector" @confirm="returndata"></u-picker> -->
						<input :value="form.carid" :placeholder="this.createdcarid" />
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆类型 -->
				<u-row  @click="openpicker(5)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7"  class="left" style="float: left;">
						<span style="margin-left: -4px;">车辆类型</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showcartype" mode="selector" :default-selector="[0]" :range="selectortype" @confirm="returncartypedata"></u-picker>
						<span>{{form.car_type_name}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 温控类型 -->
				<u-row  @click="openpicker(4)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7"   class="left">
						<span  style="margin-left: -4px;">温控类型</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showwenkongtype" mode="selector" :default-selector="[0]" :range="Temperaturecontroltype" @confirm="returnTemperaturecontroltype"></u-picker>
						<span>{{form.wenkong}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆属性 -->
				<u-row  @click="openpicker(6)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7"  class="left">
						<span  style="margin-left: -4px;">车辆属性</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showcheliangshuxing" mode="selector" :default-selector="[0]" :range="cheliangshuxing" @confirm="returncheliangshuxing"></u-picker>
						<span >{{form.car_possess_show}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆注册日期 -->
				<u-row @click="openpicker(7)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7"   class="left">
						<span  style="margin-left: -4px;">车辆注册日期</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showcardate" mode="time" :default-selector="[0]" @confirm="returncardate"></u-picker>
						<span>{{form.cardate}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 司机姓名 -->
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7"   class="left">
						<span  style="margin-left: -4px;">司机姓名</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.name" id="all_name" type="text" style=""  style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- 司机电话 -->
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7"   class="left">
						<span  style="margin-left: -4px;">司机电话</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.phone" id="all_name" type="text" style=""  style="color: #1D2026;float: right;"  >
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
				// 车辆类型
				selectortype:[],
				selectortypetypeid:[],
				// 支付方式
				paymethod:["月结","周结","日结","现付"],
				// 温控列表
				Temperaturecontroltype:[],
				Temperaturecontroltypeyingwen:[],
				// 车辆属性
				cheliangshuxing:[],
				// 车辆属性英文
				cheliangshuxingyingwen:[],
				// 控制选择器弹出
				show1: false,
				showcheliangshuxing:false,
				showcartype: false,
				showwenkongtype:false,
				showcardate:false,
				form: {
					carid:"",//车牌号
					car_type_name:"", //车辆类型
					wenkong:"", //温控类型
					car_possess_show:"", //车辆属性
					cardate:"",//车辆注册日期
					name:"",
					phone:"",//客户电话
				},
				control:"",
				car_possess:"",	
				cartypeid:"",
				self_id:"",
				group_code:"",
				arr:[],
				a:"",
				createdcarid:""
			}
		},
		created() {
			var caredit=this.$store.state.caredit
			this.self_id=caredit.self_id,
			// this.group_code=caredit.group_code
			this.loadcardata()
			this.loadcartype()
		},
		methods:{
			// 弹出框弹出事件
			openpicker(i){
				if(i==1){
					// 车辆号码
					this.show1=true
				}
				if(i==4){
					// 弹出温控
					this.showwenkongtype=true
				}
				if(i==5){
					// 弹出车辆类型
					this.showcartype=true
				}
				if(i==6){
					// 弹出车辆属性
					this.showcheliangshuxing=true
				}
				if(i==7){
					this.showcardate=true
				}
			},
			// 键盘改变事件
			valChange(val){
				this.form.carid+=val;
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if(this.form.carid.length) this.form.carid = this.form.carid.substr(0, this.form.carid.length - 1);
					console.log(this.value);
			},
			// 车牌号回调
			returndata(item){
				this.form.carid=item;
				console.log(this.form.carid)
			},
			//车型回调
			returncartypedata(item){
				this.form.car_type_name=this.selectortype[item]
				this.cartypeid=this.selectortypetypeid[item]
				console.log(this.form.car_type_name)
				console.log(this.cartypeid)
			},
			//温控回调
			returnTemperaturecontroltype(item){
				this.form.wenkong=this.Temperaturecontroltype[item]
				this.control=this.Temperaturecontroltypeyingwen[item]
				console.log(this.form.wenkong)
				console.log(this.control)
			},
			// 车辆属性回调
			returncheliangshuxing(item){
				this.form.car_possess_show=this.cheliangshuxing[item]
				this.car_possess=this.cheliangshuxingyingwen[item]
				console.log(this.form.car_possess_show)
				console.log(this.car_possess)
			},
			// 注册日期回调
			returncardate(item){
				console.log(item)
				this.form.cardate=item.year+"-"+item.month+"-"+item.day
				console.log(this.form.cardate)
			},
			//加载车型数据
			loadcartype(){
				var data={
					token:''
				}
				api.api_car_getType(data).then(res=>{
					if(res.code==200){
						var cartypelist=res.data.info
						for(var i in cartypelist){
							var typeid=cartypelist[i].self_id
							var paramename=cartypelist[i].parame_name
							this.selectortype.push(paramename)
							this.selectortypetypeid.push(typeid)
						}
					}
				})
			},
			//进入编辑页面时加载数据
			loadcardata(){
				var data={
					self_id:this.self_id
				}
				console.log(data.self_id)
				var projecttype=uni.getStorageSync("project_type")
				if(projecttype == 'user' || projecttype == 'carriage'){
					api.api_car_creatCar(data).then(res=>{
						if(res.code==200){
							console.log("api执行")
							
						}
					})
				}else{
					api.tms_car_createCar(data).then(res=>{
						if(res.code==200){
							console.log(JSON.stringify(res))
							console.log("1111111111111111111111111")
							this.createdcarid = res.data.info.car_number//车牌号
							this.form.car_type_name=res.data.info.car_type_name//车辆类型
							this.form.wenkong=res.data.info.tms_control_type_show//温控类型
							this.form.car_possess_show=res.data.info.car_possess_show//车属性
							this.form.cardate=res.data.info.board_time//日期
							this.form.name=res.data.info.contacts//联系人
							this.form.phone=res.data.info.tel//电话
							this.car_possess=res.data.info.car_possess//车属性id
							console.log(this.car_possess)
							this.cartypeid=res.data.info.car_type_id
							console.log(this.cartypeid)
							this.control=res.data.info.control//温控id
							console.log(this.control)
							console.log(JSON.stringify(res.data.tms_car_possess_type))
							//车辆属性数组
							this.arr=res.data.tms_car_possess_type
							console.log(this.arr)
							for(var n in this.arr){
								// 车辆属性汉字
								var tms_proess_type_list_text=this.arr[n].name
								// 车辆属性英文
								var tms_proess_type_list_keys=this.arr[n].key
								this.cheliangshuxing.push(tms_proess_type_list_text)
								this.cheliangshuxingyingwen.push(tms_proess_type_list_keys)
							}
							var tms_control_type_list=res.data.tms_control_type
							for(var j in tms_control_type_list){
								var a=tms_control_type_list[j].name
								var b=tms_control_type_list[j].key
								this.Temperaturecontroltype.push(a)
								this.Temperaturecontroltypeyingwen.push(b)
							}
							console.log(this.Temperaturecontroltype)
							console.log(this.Temperaturecontroltypeyingwen)
						}
					})
				}
			},
			//确认提交
			submit(){
				if(this.form.carid==''){
					this.$refs.uToast.show({
						title: '请重新输入车牌号',
						type: 'default',
					})
					return false
				}
				if(this.cartypeid==''){
					this.$refs.uToast.show({
						title: '车辆类型不能为空',
						type: 'default',
					})
					return false
				}
				if(this.control==''){
					this.$refs.uToast.show({
						title: '温控不能为空',
						type: 'default',
					})
					return false
				}
				if(this.car_possess==''){
					this.$refs.uToast.show({
						title: '车辆属性不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.cardate==''){
					this.$refs.uToast.show({
						title: '注册日期不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.name==''){
					this.$refs.uToast.show({
						title: '联系人不能为空',
						type: 'default',
					})
					return false
				}
				if(this.form.phone==''){
					this.$refs.uToast.show({
						title: '请输入手机号',
						type: 'default',
					})
					return false
				}
				var projecttype1=uni.getStorageSync("project_type")
				var group_code=uni.getStorageSync('group_code')//获取当前登录用户的公司
				console.log(group_code)
				var data={
					token:"",
					self_id:this.self_id,
					control:this.control,
					board_time:this.form.cardate,
					car_number:this.form.carid,
					car_possess:this.car_possess,
					car_type_id:this.cartypeid,
					contacts:this.form.name,
					tel:this.form.phone,
					group_code:group_code
				}
				if(projecttype1 == 'user' || projecttype1 == 'carriage'){
					api.api_car_addCar(data).then(res=>{
						if(res.code==200){
							console.log("编辑成功")
							var pages = getCurrentPages(); //当前页
							var beforePage = pages[pages.length - 2]; //上个页面路由
							beforePage.$vm.loadcarlist(1)
							this.$refs.uToast.show({
								title: res.msg,
								type: 'default',
								position: 'bottom'
							})
							this.back()
						}else{
							this.$refs.uToast.show({
								title: res.msg,
								type: 'default',
								position: 'bottom'
							})
						}
						
					})
				}else{
					api.tms_car_addCar(data).then(res=>{
						if(res.code==200){
							console.log("编辑成功")
							var pages = getCurrentPages(); //当前页
							var beforePage = pages[pages.length - 2]; //上个页面路由
							beforePage.$vm.loadcarlist(1)
							this.$refs.uToast.show({
								title: "编辑成功",
								type: 'default',
								position: 'bottom'
							})
							this.back()
						}else{
							this.$refs.uToast.show({
								title: res.msg,
								type: 'default',
								position: 'bottom'
							})
						}
					})
				}
			},
			back(){
				uni.navigateBack()
			}
		},
		onLoad() {
			
		},
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
			display:flex;
			overflow: hidden;
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
