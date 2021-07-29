<template>
	<view>
		<u-navbar :is-back="false" title="落地配价格">
			<view class="slot-wrap" style="margin-left: 10px;" @click="gotabpolice">
				<u-icon @click="back" name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
		<view style="margin: 10px;background-color: white;padding:16px;border-radius: 15px;">
			<u-row gutter="16">
				<u-col span="6" class="left">
					<span id="leftspan">起步件数</span>
				</u-col>
				<u-col span="1">
					<span style="padding-left: 60px;">0~</span>
				</u-col>
				<u-col style="text-align: right;" span="5">
					<!-- <u-switch v-model="checked1"></u-switch> -->
					<input v-model="qibujianshu" placeholder="请输入"/>
				</u-col>
				<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
			</u-row>
			<u-row gutter="16" style="margin-top: 10px;">
				<u-col span="6" class="left">
					<span id="leftspan">起步价格</span>
				</u-col>
				<u-col span="1">
					<span style="color: red;padding-left: 60px;">￥</span>
				</u-col>
				<u-col style="text-align: right;" span="5">
					<!-- <u-switch v-model="checked1"></u-switch> -->
					
					<input v-model="qibujiage"  placeholder="请输入"/>
				</u-col>
				<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
			</u-row>	
			<u-row gutter="16" style="margin-top: 10px;">
				<u-col span="6" class="left">
					<span id="leftspan">超出件数单价</span>
				</u-col>
				<u-col span="1">
					<span style="color: red;padding-left: 60px;">￥</span>
				</u-col>
				<u-col style="text-align: right;" span="5">
					<!-- <u-switch v-model="checked1"></u-switch> -->
					<input  v-model="chaochujianshudanjia" placeholder="请输入"/>
				</u-col>
				<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
			</u-row>	
			<u-row gutter="16" style="margin-top: 10px;">
				<u-col span="6" class="left">
					<span id="leftspan">封顶价格</span>
				</u-col>
				<u-col span="1">
					<span style="color: red;padding-left: 60px;">￥</span>
				</u-col>
				<u-col style="text-align: right;" span="5">
					<!-- <u-switch v-model="checked1"></u-switch> -->
					<input v-model="fengdingjiage" placeholder="请输入"/>
				</u-col>
				<u-line class="u-line" border-style="solid" color="#e4e7ed" style="margin-top:5px"></u-line>
			</u-row>
			<u-button @click="ok" style="margin-top: 30px;" type="primary" size="default" shape="circle">确定</u-button>		
		</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				qibujianshu:null,
				qibujiage:null,
				chaochujianshudanjia:null,
				fengdingjiage:null,
				
			}
		},
		methods:{
			ok(){
				var data={
					qibujianshu:this.qibujianshu,
					qibujiage:this.qibujiage,
					chaochujianshudanjia:this.chaochujianshudanjia,
					fengdingjiage:this.fengdingjiage
					// chaochujianshudanjia=this.chaochujianshudanjia
					// fengdingjiage=this.fengdingjiage
				}
				console.log(data)
				this.$store.commit('luodipeijiage',data)
				uni.navigateBack()
			},
			back(){
				uni.navigateBack()
			}
		}
		
	}
</script>

<style>
	page {
		background-color: #F3F4F6;
	}
</style>
<style lang="scss" scoped>
	.row{
		margin-top: 15px;
	}
	#leftspan{
		font-size: 18px;
		font-weight: 400;
	}
	.left{
		text-align: left;
		font-size: 15px;
	}
	.right{
		text-align: right;
	}
	.btn_color {
		width: 70px;
		// height: 30px;
		text-align: center;
		line-height: 30px;
		margin-left: 10px;
		display: inline-block;
		background-color: #0088f4;
		color: #fff;
		border: 1px solid #0088f4;
		border-radius: 5px;
	}

	.listlog {
		width: 190px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.clearfix:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.address {
		width: 80%;
	
		image {
			float: left;
		}
	
		.send_ad {
			float: left;
			width: 85%;
	
			.contact {
				font-size: 18px;
				color: rgb(68, 68, 68);
				font-weight: 700;
			}
	
			.adds {
				font-size: 15px;
				color: rgb(153, 153, 153);
				overflow-wrap: break-word;
				word-break: break-all;
			}
		}
	}

	.content {
		// border-top: 1px solid #ccc;
		// padding-bottom: 80px;

		.list {
			// margin-left: 6px;
			// margin-right: 6px;
			// margin-top: 60px;

			.order {
				background-color: white;
				border-radius: 5px;
				border: 1px solid #cecfcf;
				margin-bottom: 10px;
				margin-left: 6px;
				margin-right: 6px;

				.wrap {
					padding-left: 10px;
					padding-right: 10px;

					.set_center_img {
						height: 6px;
						width: 70%;
					}
				}
			}


		}
	}
</style>
