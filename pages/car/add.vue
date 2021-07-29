<template>
	<view class="add" style="height: 100%;background-color: #F3F4F6;">
		<!-- 头部 -->
		<u-navbar :is-back="false" :border-bottom='false' title="添加车辆">
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
					<u-col span="7" class="left">
						<span id="left"  style="margin-left: -4px;">车辆号码</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;"> 
						<u-keyboard :mask="false" @change="valChange" @backspace="backspace" ref="uKeyboard" mode="car" v-model="show1" ></u-keyboard>
						<!-- <u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector" @confirm="returndata"></u-picker> -->
						<!-- <span>{{form.car_number}}</span> -->
						<input :value="form.car_number" placeholder="请输入车牌号"/>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆类型 -->
				<u-row  @click="openpicker(5)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7" class="left">
						<span id="left"  style="margin-left: -4px;">车辆类型</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showcar_type_name" mode="selector" :default-selector="[0]" :range="selectortype" @confirm="returncar_type_namedata"></u-picker>
						<span>{{form.car_type_name}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 温控类型 -->
				<u-row  @click="openpicker(4)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7" class="left">
						<span id="left"  style="margin-left: -4px;">温控类型</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showtms_control_type_showtype" mode="selector" :default-selector="[0]" :range="Temperaturecontroltype" @confirm="returnTemperaturecontroltype"></u-picker>
						<span>{{form.tms_control_type_show}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆属性 -->
				<u-row  @click="openpicker(6)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7" class="left">
						<span id="left"  style="margin-left: -4px;">车辆属性</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showcheliangshuxing" mode="selector" :default-selector="[0]" :range="cheliangshuxing" @confirm="returncheliangshuxing"></u-picker>
						<span >{{form.car_possess_show}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆注册日期 -->
				<u-row @click="openpicker(7)" gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7" class="left">
						<span id="left"  style="margin-left: -4px;">车辆注册日期</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<u-picker v-model="showcardate" mode="time" :default-selector="[0]" :range="cheliangshuxing" @confirm="returncardate"></u-picker>
						<span>{{form.cardate}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 司机姓名 -->
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7" class="left" style="padding-left: 5px;">
						<span id="left"  style="margin-left: -4px;">司机姓名</span>
					</u-col>
					<u-col span="5" class="a" style="text-align: right;padding-right: 10px;">
						<input v-model="form.contacts" id="all_name" type="text" style="" placeholder="请填写司机姓名" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- 司机电话 -->
				<u-row gutter="16" style="height: 50px; background-color: #FFFFFF;border-bottom: 1px solid #C0C0C0;">
					<u-col span="7" class="left" style="padding-left: 5px;">
						<span id="left"  style="margin-left: -4px;">司机电话</span>
					</u-col>
					<u-col span="5" style="text-align: right;padding-right: 10px;">
						<input v-model="form.tel" id="all_name" type="text" style="" placeholder="请填写司机电话" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<u-button type="primary" shape="circle"
					style="width: 90%;position: fixed; bottom: 20px; left: 50%;transform: translateX(-50%);" @click="submit">
					确认</u-button>
				<u-toast ref="uToast" />
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data(){
			return{
				show:false,
				// 车辆类型
				selectortype:[],
				selectortypeyingwen:[],
				// 支付方式
				paymethod:["月结","周结","日结","现付"],
				Temperaturecontroltype:["冷冻","冷藏","常温","恒温","冷冻/冷藏"],
				cheliangshuxing:["自有","租赁"],
				// 控制选择器弹出
				show1: false,
				showcheliangshuxing:false,
				showcar_type_name: false,
				showtms_control_type_showtype:false,
				showcardate:false,
				form: {
					car_number:"",//车牌号
					car_type_name:"请选择车辆类型", //车辆类型
					tms_control_type_show:'请选择温控类型', //温控类型
					car_possess_show:"请选择车辆属性", //车辆属性
					cardate:'请选择注册日期' ,//车辆注册日期
					contacts:'',
					tel:'',//客户电话
				},
				car_possess:'',
				token:null,
				control:'',
				//车辆类型
				car_type_list:[],
				cartypeid:'',
				group_code:'',
			}
		},
		methods:{
			
			back(){
				uni.navigateBack()
			},
			// 弹出框弹出事件
			openpicker(i){
				if(i==1){
					// 车辆号码
					this.show1=true
				}
				if(i==4){
					// 弹出温控
					this.showtms_control_type_showtype=true
				}
				if(i==5){
					// 弹出车辆类型
					this.showcar_type_name=true
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
				
				this.form.car_number+=val;
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if(this.form.car_number.length) this.form.car_number = this.form.car_number.substr(0, this.form.car_number.length - 1);
					console.log(this.value);
			},
			// 车牌号回调
			returndata(item){
				this.form.car_number=item;
				console.log(this.form.car_number)
			},
			//车辆类型回调
			returncar_type_namedata(item){
				this.form.car_type_name=this.selectortype[item]
				console.log(this.form.car_type_name)
				this.cartypeid=this.selectortypeyingwen[item]
				console.log(this.cartypeid)
			},
			//温控回调
			returnTemperaturecontroltype(item){
				this.form.tms_control_type_show=this.Temperaturecontroltype[item]
				if(this.form.tms_control_type_show=="冷冻"){
					this.control="freeze"
					console.log(this.control)
				}
				if(this.form.tms_control_type_show=="冷藏"){
					this.control="refrigeration"
					console.log(this.control)
				}
				if(this.form.tms_control_type_show=="常温"){
					this.control="normal"
					console.log(this.control)
				}
				if(this.form.tms_control_type_show=="恒温"){
					this.control="constant"
					console.log(this.control)
				}
				if(this.form.tms_control_type_show=="冷冻/冷藏"){
					this.control="cold"
					console.log(this.control)
				}
				console.log(this.form.tms_control_type_show)
			},
			// 车辆属性回调
			returncheliangshuxing(item){
				this.form.car_possess_show=this.cheliangshuxing[item]
				if(this.form.car_possess_show=="自有"){
					this.car_possess="oneself"
					console.log(this.car_possess)
				}
				if(this.form.car_possess_show=="租赁"){
					this.car_possess="lease"
					console.log(this.car_possess)
				}
				console.log(this.form.car_possess_show)
			},
			// 注册日期回调
			returncardate(item){
				console.log(item)
				this.form.cardate=item.year+"-"+item.month+"-"+item.day
				console.log(this.form.cardate)
			},
			submit(){
				if (this.form.car_number == '') {
					this.$refs.uToast.show({
						title: '车牌号不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.cartypeid == '') {
					this.$refs.uToast.show({
						title: '车辆类型不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.control == '') {
					this.$refs.uToast.show({
						title: '温控类型不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.car_possess == '') {
					this.$refs.uToast.show({
						title: '车辆属性不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.form.cardate == '' || this.form.cardate == "请选择注册日期") {
					this.$refs.uToast.show({
						title: '车辆注册日期不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.form.contacts == '') {
					this.$refs.uToast.show({
						title: '司机姓名不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.form.tel == '') {
					this.$refs.uToast.show({
						title: '司机电话不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				var projecttype=uni.getStorageSync("project_type")
				console.log(projecttype)
				var group_code=uni.getStorageSync('group_code')//获取当前登录用户的公司
				console.log(group_code)
				var submitdata={
						token:"",
						control: this.control,
						board_time:this.form.cardate,
						car_number:this.form.car_number,
						car_possess:this.car_possess,
						car_type_id:this.cartypeid,
						contacts:this.form.contacts,
						tel:this.form.tel,
						group_code:group_code,
				}
				if(projecttype == 'user' || projecttype == 'carriage'){
					console.log('submitData' + JSON.stringify(submitdata))
					api.api_car_addCar(submitdata).then(res=>{
						console.log(res)
						console.log(res.code)
						if(res.code == 200){
							console.log("添加成功")
							// var pages = getCurrentPages(); //当前页
							// var beforePage = pages[pages.length - 2]; //上个页面路由
							// beforePage.$vm.loadcarlist(1)
							uni.$emit('loadcarlist');
							this.back()
						}else{
							this.$refs.uToast.show({
								title: res.msg,
								type: 'error',
								position: 'bottom'
							})
							return false
						}
						
						// if(res.code == 308){
						// this.$refs.uToast.show({
						// 	title: res.msg,
						// 	type: 'default',
						// 	position: 'bottom'
						// })
						// 	return false
						// }
					})
				}else{
					console.log('submitData' + JSON.stringify(submitdata))
					api.tms_car_addCar(submitdata).then(res=>{
						if(res.code == 200){
							this.$refs.uToast.show({
								title: res.msg,
								type: 'default',
								position: 'bottom'
							})
							console.log("添加成功")
							// var pages = getCurrentPages(); //当前页
							// var beforePage = pages[pages.length - 2]; //上个页面路由
							// beforePage.$vm.loadcarlist(1)
							uni.$emit('loadcarlist');
							this.back()
						}else{
							this.$refs.uToast.show({
								title: res.msg,
								type: 'default',
								position: 'bottom'
							})
							return false
						}
						// if(res.code == 308){
						// this.$refs.uToast.show({
						// 	title: res.msg,
						// 	type: 'default',
						// 	position: 'bottom'
						// })
						// 	return false
						// }
					})
				}
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
							this.selectortypeyingwen.push(typeid)
						}
						console.log(this.selectortype)
						console.log(this.selectortypeyingwen)
					}
				})
			},
		},
		onLoad() {
			
		},
		created() {
			// var a=this.$store.state.a1
			// this.self_id=a.self_id
			var p=this.$store.state.caradd
			// this.group_code=p.addgroup_code
			// console.log(this.group_code)
			this.loadcartype()
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
