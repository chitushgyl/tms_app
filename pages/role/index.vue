<template>
	<view class="role" style="width: 100%; background-color: #F3F4F6;">
		<!-- 角色身份 -->
		<view>
			<u-navbar :is-back="false" :background="background" title-color='white' title="角色身份">
				<view class="slot-wrap" style="margin-left: 10px;">
					<u-icon name="arrow-leftward" color="white" size="28"></u-icon>
				</view>
			</u-navbar>
			<view class="" style="padding-bottom: 80px;box-sizing: content-box;">
				<!-- 正文内容 -->
				<view class="main" v-for="(item, index) in csListArrl" :key="index" :data-index="index"
					@touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd">
					<view class="order-item" :style="'right:'+item.right+'px'" style="height: 85px;">
						<view :style="{background:item.color ? item.color : '#0088F4',width:'100%',height:'85px',}">
							<view class="wrap" style="height: 85px;">
								<u-row gutter="16" style="height: 85px;">
									<u-col span="2">
										<view class="demo-layout bg-purple" style="margin-left: 10px;">
											<image :src="item.img" mode="" style="width: 46px;height: 46px;"></image>
										</view>
									</u-col>
									<u-col span="8">
										<view class="demo-layout bg-purple-light">
											<p style='color: white;'>
												<span
													v-if="item.admin_login">{{item.admin_login}}{{item.company_type}}</span>
												<span v-else-if="item.company_name">{{item.company_type}}
													{{item.company_name}}</span>
												<span v-else>{{item.company_type}}</span>
											</p>
											<p style='color: white;'><span
													v-if="item.group_name!==null">所属公司：{{item.group_name}}</span>
												<span v-if="item.button_show!='N'"
													class="details">{{item.attestation_show}} {{item.view_show}}</span>
											</p>
										</view>
									</u-col>
									<u-col span="2">
										<view class="demo-layout bg-purple-dark" @click="switchs(item)"
											v-if="item.show=='Y'">
											<image src="../../images/role.png" mode=""
												style="width: 50px;height: 30px;"></image>
										</view>
									</u-col>
								</u-row>
							</view>
							<view class="remove" @click="delData(item)">删 除</view>
							<!-- <view class="edit" @click="editData(item)">编 辑</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="wrap">
				<u-row gutter="16" style="height:60px; ">
					<u-col span="6">
						<view class="demo-layout bg-purple">
							<u-button :hair-line='false' style="background-color:#F3DCAE;color:#333;font-weight: 600;"
								shape="circle" @click="certification">
								企业认证
							</u-button>
						</view>
					</u-col>
					<u-col span="6">
						<view class="demo-layout bg-purple-light">
							<u-button :hair-line='false' style="background-color: #0088f4;color:#fff;font-weight: 600;"
								shape="circle" @click="binding">
								绑定角色
							</u-button>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<u-modal v-model="show" :title='title' :show-cancel-button='true' :content="content"
			:cancel-style="cancel_style" @confirm='confirm'></u-modal>
	</view>
</template>

<script>
	import api from '@/api/api.js';
	export default {
		data() {
			return {
				//列表数据，可根据自己的业务获取
				csListArrl: [],
				userlist: [],
				title: '',
				content: '',
				show: false,
				//左滑默认宽度
				delBtnWidth: 80,
				background: {
					backgroundColor: '#0088F4',
				},
				cancel_style: {
					borderRight: '1px solid #e4e7ed'
				},
				self_id: '',
				type: '',
			}
		},
		created() {
			this.user_binding_page();
		},
		methods: {
			//角色列表接口
			user_binding_page() {
				var data = {};
				api.user_binding_page(data).then(res => {
					this.csListArrl = res.data;
				})
			},

			//开始触摸滑动
			drawStart(e) {
				console.log("开始触发" + this.company_type);
				var touch = e.touches[0];
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				console.log('1234')
				for (var index in this.csListArrl) {
					this.$set(this.csListArrl[index], 'right', 0);
				}
				var touch = e.touches[0];
				var item = this.csListArrl[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', disX);
				} else {
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				console.log("滑动结束");
				var item = this.csListArrl[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
				} else {
					this.$set(this.csListArrl[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//删除方法
			delData(item) {
				this.title = '删除角色';
				this.content = '确认删除角色';
				this.show = true
				this.self_id = item.self_id;
			},
			editData(item) {
				uni.showModal({
					title: '提示',
					content: "确认编辑该项目？",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			switchs(item) {
				this.title = '切换角色';
				this.content = '确认切换角色';
				this.show = true
				this.self_id = item.self_id;
				this.type = item.type
			},
			confirm() {
				if (this.title == '切换角色') {
					var data = {
						self_id: this.self_id
					}
					api.user_switchover(data).then(res => {
						uni.setStorageSync('dtoken', res.user_token);
						uni.setStorageSync('project_type', type);
					})
				} else if (this.title == '删除角色') {
					var data = {
						self_id: this.self_id
					}
					api.user_delete(data).then(res => {
						// uni.setStorageSync('dtoken', res.user_token);
						// uni.setStorageSync('project_type', type);
						console.log(res)
					})
				}
			},
			certification() {
				// console.log('123456')
				uni.navigateTo({
					url: '/pages/role/certification'
				})
			},
			binding() {
				uni.navigateTo({
					url: '/pages/role/binding'
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F3F4F6
	}
</style>
<style lang="scss" scoped>
	.main {
		width: 90%;
		height: 85px;
		margin: 10px auto 10px;
		// background-color: #0088F4;
		border-radius: 10px;
		overflow: hidden;
	}

	.order-item {
		width: 100%;
		display: flex;
		position: relative;
		align-items: right;
		flex-direction: row;
	}

	.remove {
		margin-left: -5%;
		width: 80px;
		height: 100%;
		background-color: red;
		color: #FFFFFF;
		position: absolute;
		top: 0;
		right: -80px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}

	.edit {
		width: 80px;
		height: 100%;
		background-color: green;
		color: white;
		position: absolute;
		top: 0;
		right: -160px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}

	.foot {
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 60px;
		background-color: white;
	}

	.u-btn--bold-border[data-v-6e15e680] {
		border: none;
	}
</style>
