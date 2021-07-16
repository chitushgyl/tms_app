<!-- <template>
	<view class="">
		<keep-alive></keep-alive>
		<tabbar></tabbar>
	</view>
</template> -->
<script>
	// import tabbar from './components/tabbar.vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},

	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	page{
		height: 100%;
	}
	uni-page-wrapper {
		uni-page-body{
			height: 100%;
		}
		// background-color: #F3F4F6
	}

	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	html,
	body,
	div,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	dl,
	dt,
	dd,
	ol,
	form,
	input,
	textarea,
	th,
	td,
	select {
		margin: 0;
		padding: 0;
	}

	* {
		// box-sizing: border-box;
	}

	html,
	body {
		min-height: 100%;
	}

	body {
		font-family: "Microsoft YaHei";
		font-size: 14px;
		color: #333;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: normal;
	}

	ul,
	ol {
		list-style: none;
	}

	img {
		border: none;
		vertical-align: middle;
	}

	a {
		text-decoration: none;
		color: #232323;
	}

	table {
		border-collapse: collapse;
		table-layout: fixed;
	}

	input,
	textarea {
		outline: none;
		border: none;
	}

	textarea {
		resize: none;
		overflow: auto;
	}

	.clearfix {
		zoom: 1;
	}

	.clearfix:after {
		content: ".";
		width: 0;
		height: 0;
		visibility: hidden;
		display: block;
		clear: both;
		overflow: hidden;
	}

	.fl {
		float: left
	}

	.fr {
		float: right
	}

	.tl {
		text-align: left;
	}

	.tc {
		text-align: center
	}

	.tr {
		text-align: right;
	}

	.ellipse {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.inline {
		display: inline-block;
		*display: inline;
		*zoom: 1;
	}
</style>
