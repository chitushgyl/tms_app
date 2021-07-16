const request = (url = '', data = {}) => {
	var projectType = '';
	var ftoken = '';
	var dtoken = ''
	var api = 'http://api.56cold.com/index.php';
	if (uni.getStorageSync("project_type")) {
		projectType = uni.getStorageSync("project_type")
	} else {
		projectType = ''
	}
	if (uni.getStorageSync("ftoken")) {
		ftoken = uni.getStorageSync("ftoken")
	} else {
		ftoken = ''
	}
	if (uni.getStorageSync("dtoken")) {
		dtoken = uni.getStorageSync("dtoken")
	} else {
		dtoken = ''
	}
	var urls = api + url;
	console.log(JSON.stringify(data))
	console.log(urls)
	return new Promise((resolve, reject) => {
		uni.request({
			data: data,
			dataType: 'json',
			type: 'POST', //HTTP请求类型
			url: urls, //仅为示例，并非真实接口地址。
			timeout: 30000, //超时时间设置为30秒；
			header: {
				projectType: projectType,
				ftoken: ftoken, // 移动端用的   用的是api的接口
				dtoken: dtoken // 后端用的    用的tms开头的接口
			},
			success: (res) => {
				console.log(res)
				resolve(res.data);
			},
			fail: (err) => {
				if (err.errMsg != 'request:fail abort') {
					reject('连接超时，请检查您的网络')
				}
			},
			error: function(xhr, type, errorThrown) {
				console.log('12345')
			}
		})
		// uni.request({
		// 	type: 'POST', //HTTP请求类型
		// 	url: url,
		// 	data: data,
		// 	dataType: 'json',
		// 	headers: {
		// 		projectType: localStorage.project_type,
		// 		ftoken: localStorage.ftoken, // 移动端用的   用的是api的接口
		// 		dtoken: localStorage.dtoken // 后端用的    用的tms开头的接口
		// 	},
		// }).then((response) => {
		// 	console.log('response')
		// 	let [error, res] = response;
		// 	// 登录过期
		// 	if (res.code == 10086) {
		// 		uni.showToast({
		// 			title: '登录过期,请重新登录',
		// 			duration: 2000
		// 		});
		// 	};
		// 	resolve(res.data);

		// }).catch((error) => {
		// 	console.log('error')
		// 	let [err, res] = error;
		// 	reject(err);
		// });
	});
}
export default request
