module.exports = {
	publicPath: './',
	devServer: {
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://api.56cold.com/index.php/',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/bpi': {
				target: 'http://api.56cold.com/index.php/',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/bpi': ''
				}
			},
		}
	},
	pwa: {
		iconPaths: {
			favicon32: 'favicon.ico',
			favicon16: 'favicon.ico',
			appleTouchIcon: 'favicon.ico',
			maskIcon: 'favicon.ico',
			msTileImage: 'favicon.ico'
		}
	},
	configureWebpack: {
		devServer: {
			// 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
			disableHostCheck: true
		}
	},
}
