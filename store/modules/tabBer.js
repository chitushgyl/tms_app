const tabBer = {
	state: {
		role:'',
		tabBarList: [],
	},
	mutations: {
		setRole(state,role){
			state.role = role;
			//先得到权限，再根据权限设置tabbarList
			state.tabBarList = tabBar[role];
		}
	},
}

export default tabBer