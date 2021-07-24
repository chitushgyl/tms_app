import request from '@/js/request.js'
module.exports = {
	// 登录
	login(data) {
		return request('/login/account_login', data);
	},
	// 车辆信息
	getType(data) {
		return request('/api/car/getType', data);
	},
	// 底部导航
	user_foot(data) {
		return request('/user/foot', data);
	},
	//零担页面
	linePage(data) {
		return request('/api/line/linePage', data);
	},
	//获取地址
	get_city(data) {
		return request('/api/address/get_city', data);
	},
	//我的 数据
	user_owm(data) {
		return request('/user/owm', data);
	},
	//角色列表
	user_binding_page(data) {
		return request('/user/binding_page', data);
	},
	// 更新App
	user_get_version(data) {
		return request('/user/get_version?type=user', data);
	},
	// 密码重置
	update_password(data) {
		return request('/user/update_pwd', data);
	},
	//注销账户
	user_off(data) {
		return request('/user/log_off', data);
	},
	//企业认证
	user_attestation(data) {
		return request('/user/attestation', data);
	},
	//常用地址列表
	api_address_addressPage(data) {
		return request('/api/address/addressPage', data);
	},
	// 删除常用地址
	api_address_addressDelFlag(data) {
		return request('/api/address/addressDelFlag', data);
	},
	// 添加常用地址
	api_address_addAddress(data) {
		return request('/api/address/addAddress', data);
	},
	//城际整车计算预估价格
	api_order_count_klio(data) {
		return request('/api/order/count_klio', data);
	},
	//切换角色
	user_switchover(data) {
		return request('/user/switchover', data);
	},
	//删除角色
	user_delete(data) {
		return request('/user/del_binding', data);
	},
	// 公司列表
	company_companyPage(data) {
		return request('/company/company/companyPage',data);
	},
	// 公司类型列表
	type_getType(data) {
		return request('/tms/type/getType',data);
	},
	//业务公司添加
	tms_group_addgroup(data){
		return request('/tms/group/addGroup',data);
	},
	//业务公司删除
	tms_group_groupDelFlag(data){
		return request('/tms/group/groupDelFlag',data);
	},
	//车辆列表
	tms_car_carPage(data) {
		return request('/tms/car/carPage', data);
	},
	//车辆添加
	tms_car_createCar(data) {
		return request('/tms/car/createCar', data);
	},
	//车辆添加
	tms_car_addCar(data) {
		return request('/tms/car/addCar', data);
	},
	//车辆删除
	tms_car_carDelFlag(data) {
		return request('/tms/car/carDelFlag', data);
	},
	
	  //车型列表
	api_car_getType(data) {
	 	return request('/api/car/getType', data);
	 },
	 tms_group_groupPage(data){
		return request('/tms/group/groupPage',data) 
	 },
	 tms_group_createGroup(data){
	 		return request('/tms/group/createGroup',data) 
	 },
	 // //车辆 -用户
	 api_car_carPage(data){
	 		return request('/api/car/carPage',data) 
	 },
	 api_car_creatCar(data){
	 		return request('/api/car/createCar',data) 
	 },
	 api_car_addCar(data){
	 		return request('/api/car/addCar',data) 
	 },
	 api_car_carDelFlag(data){
	 		return request('/api/car/carDelFlag',data) 
	 },
}
