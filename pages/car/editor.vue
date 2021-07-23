<template>
	<view class="add" style="height: 100%;background-color: #F3F4F6;">
		<!-- 头部 -->
		<u-navbar :is-back="false" :border-bottom='false' title="编辑车辆">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<!-- 主体 -->
		<view class="content">
			<view class="wrap">
				<!-- 车辆 -->
				<u-row @click="openpicker(1)" gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						车辆号码
					</u-col>
					<u-col span="5" class="a">
						<u-keyboard :mask="false" @change="valChange" @backspace="backspace" ref="uKeyboard" mode="car" v-model="show1" ></u-keyboard>
						<!-- <u-picker v-model="show1" mode="selector" :default-selector="[0]" :range="selector" @confirm="returndata"></u-picker> -->
						<span>{{form.carid}}</span>
					<!-- <input @click="openpicker(1)" v-model="form.companyname" id="all_name" type="text" style="" :placeholder="form.companyname" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆类型 -->
				<u-row  @click="openpicker(5)" gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						车辆类型
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="showcartype" mode="selector" :default-selector="[0]" :range="selectortype" @confirm="returncartypedata"></u-picker>
						<span>{{form.car_type_name}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 温控类型 -->
				<u-row  @click="openpicker(4)" gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						温控类型
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="showwenkongtype" mode="selector" :default-selector="[0]" :range="Temperaturecontroltype" @confirm="returnTemperaturecontroltype"></u-picker>
						<span>{{form.wenkong}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆属性 -->
				<u-row  @click="openpicker(6)" gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						车辆属性
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="showcheliangshuxing" mode="selector" :default-selector="[0]" :range="cheliangshuxing" @confirm="returncheliangshuxing"></u-picker>
						<span >{{form.car_possess_show}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 车辆注册日期 -->
				<u-row @click="openpicker(7)" gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						车辆注册日期
					</u-col>
					<u-col span="5" class="a">
						<u-picker v-model="showcardate" mode="time" :default-selector="[0]" :range="cheliangshuxing" @confirm="returncardate"></u-picker>
						<span>{{form.cardate}}</span>
					<!-- <input @click="openpicker(2)" v-model="form.companyleibie" id="all_name" type="text" style="" :placeholder="form.companyleibie" style="color: #1D2026;float: right;"  > -->
					</u-col>
				</u-row>
				<!-- 司机姓名 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						司机姓名
					</u-col>
					<u-col span="5">
						<input v-model="form.name" id="all_name" type="text" style="" placeholder="请填写司机姓名" style="color: #1D2026;float: right;"  >
					</u-col>
				</u-row>
				<!-- 司机电话 -->
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #C0C0C0; background-color: #FFFFFF;">
					<u-col span="7" class="left">
						司机电话
					</u-col>
					<u-col span="5">
						<input v-model="form.phone" id="all_name" type="text" style="" placeholder="请填写司机电话" style="color: #1D2026;float: right;"  >
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
				selector:["请选择","公司名称1","公司名称2","公司名称3"],
				// 车辆类型
				selectortype:["4.2米","5.2米","6.8米","7.6米","9.6米","12.5米","15米"],
				// 支付方式
				paymethod:["请选择","月结","周结","日结","现付"],
				Temperaturecontroltype:["冷冻","冷藏","常温","恒温","冷冻/冷藏"],
				cheliangshuxing:["请选择","自有","租赁"],
				// 控制选择器弹出
				show1: false,
				showcheliangshuxing:false,
				showcartype: false,
				showwenkongtype:false,
				showcardate:false,
				form: {
					carid:"请输入车牌号",//车牌号
					car_type_name:"请选择车辆类型", //车辆类型
					wenkong:'请选择温控类型', //温控类型
					car_possess_show:"请选择车辆属性", //车辆属性
					cardate:'请选择注册日期' ,//车辆注册日期
					name:'',
					phone:'',//客户电话
				},
				control:'',
				car_possess:'',	
				cartypeid:'',
				self_id:'',
				group_code:''		
			}
		},
		methods:{
			// 弹出框弹出事件
			openpicker(i){
				if(i==1){
					// 车辆号码
					this.show1=true
					this.form.carid=''
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
				// this.form.carid='',
				this.form.carid+=val;
				// 切换键盘
				// if(this.form.carid.length==1){
					
				// }
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
			},
			//车辆类别回调
			returncartypedata(item){
				this.form.car_type_name=this.selectortype[item]
				if(this.form.car_type_name == "4.2米"){
					this.cartypeid="type_202102051755118039490396"
					console.log(this.cartypeid)
				}
				if(this.form.car_type_name== "5.2米"){
					this.cartypeid="type_202102051755118034654564"
					console.log(this.cartypeid)
				}
				if(this.form.car_type_name=="6.8米"){
					this.cartypeid="type_202102051755114564156121"
					console.log(this.cartypeid)
				}
				if(this.form.car_type_name=="7.6米"){
					this.cartypeid="type_202102051778945612315941"
					console.log(this.cartypeid)
				}
				if(this.form.car_type_name=="9.6米"){
					this.cartypeid="type_202102051755178946159791"
					console.log(this.cartypeid)
				}
				if(this.form.car_type_name=="12.5米"){
					this.cartypeid="type_202102051755123456156489"
					console.log(this.cartypeid)
				}
				if(this.form.car_type_name=="15米"){
					this.cartypeid="type_202102051755118789459489"
					console.log(this.cartypeid)
				}
			},
			//温控回调
			returnTemperaturecontroltype(item){
				this.form.wenkong=this.Temperaturecontroltype[item]
				if(this.form.wenkong=="冷冻"){
					this.control="freeze"
					console.log(this.control)
				}
				if(this.form.wenkong=="冷藏"){
					this.control="refrigeration"
					console.log(this.control)
				}
				if(this.form.wenkong=="常温"){
					this.control="normal"
					console.log(this.control)
				}
				if(this.form.wenkong=="恒温"){
					this.control="constant"
					console.log(this.control)
				}
				if(this.form.wenkong=="冷冻/冷藏"){
					this.control="cold"
					console.log(this.control)
				}
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
			},
			// 注册日期回调
			returncardate(item){
				console.log(item)
				this.form.cardate=item.year+"-"+item.day+"-"+item.month
			},
			//确认提交
			submit(){
				if(this.form.carid==''){
					this.$refs.uToast.show({
						title: '车牌号不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if(this.form.cardate==''){
					this.$refs.uToast.show({
						title: '注册日期不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
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
					group_code:this.group_code
				}
				console.log(data.token)
				console.log(data.self_id)
				console.log(data.control)
				console.log(data.board_time)
				console.log(data.car_number)
				console.log(data.car_possess)
				console.log(data.car_type_id)
				console.log(data.contacts)
				console.log(data.tel)
				console.log(data.group_code)
				console.log(this.form)
				api.tms_car_addCar(data).then(res=>{
					if(res.code==200){
						console.log("编辑成功")
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
			var caredit=this.$store.state.caredit
			// form: {
			// 	carid:"请输入车牌号",//车牌号
			// 	car_type_name:"请选择车辆类型", //车辆类型
			// 	wenkong:'请选择温控类型', //温控类型
			// 	car_possess_show:"请选择车辆属性", //车辆属性
			// 	cardate:'请选择注册日期' ,//车辆注册日期
			// 	name:'',
			// 	phone:'',//客户电话
			// },
			//进入编辑页时显示的数据
			this.form.carid=caredit.car_number,
			this.form.car_type_name=caredit.car_type_name,
			this.form.wenkong=caredit.tms_control_type_show,
			this.form.car_possess_show=caredit.car_possess_show,
			this.form.cardate="请选择",
			this.form.name=caredit.contacts,
			this.form.phone=caredit.tel,
			this.self_id=caredit.self_id,
			this.group_code=caredit.group_code
			console.log(this.form.carid)
			console.log(this.form.car_type_name)
			console.log(this.form.wenkong)
			console.log(this.form.car_possess_show)
			console.log(this.form.cardate)
			console.log(this.form.name)
			console.log(this.form.phone)
			console.log(this.self_id)
			console.log(this.group_code)
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
