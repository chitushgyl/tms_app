<template>
	<view class="add">
		<u-navbar :is-back="false" :border-bottom='false' title="添加地址">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<view class="wrap">
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #e1e1df;">
					<u-col span="1">
						<view class="demo-layout bg-purple">
							<image src="../../images/user/address.png" style="width: 18px;height: 18px;" mode="">
							</image>
						</view>
					</u-col>
					<u-col span="10">
						<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" :value="multiIndex"
							@change="pickerChange" @columnchange="pickerColumnchange">
							<view class="demo-layout bg-purple-light" @click="show=true">
								{{province}} {{city}} {{area}}
							</view>
						</picker>

					</u-col>
					<u-col span="1">
						<view class="demo-layout bg-purple-dark">
							<image src="../../images/user/rightthree.png" style="width: 8px;height: 14px;" mode="">
							</image>
						</view>
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #e1e1df;">
					<u-col span="1">
						<view class="demo-layout bg-purple">
							<image src="../../images/user/information.png" style="width: 18px;height: 18px;" mode="">
							</image>
						</view>
					</u-col>
					<u-col span="10">
						<view class="demo-layout bg-purple-light">
							<u-input v-model="address" type="text" :border="false" placeholder='详细信息' />
						</view>
					</u-col>
					<u-col span="1">
						<view class="demo-layout bg-purple-dark"></view>
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;border-bottom: 1px solid #e1e1df;">
					<u-col span="1">
						<view class="demo-layout bg-purple">
							<image src="../../images/user/name.png" style="width: 18px;height: 18px;" mode="">
							</image>
						</view>
					</u-col>
					<u-col span="10">
						<view class="demo-layout bg-purple-light">
							<u-input v-model="contacts" type="text" :border="false" placeholder='联系人' />
						</view>
					</u-col>
					<u-col span="1">
						<view class="demo-layout bg-purple-dark"></view>
					</u-col>
				</u-row>
				<u-row gutter="16" style="height: 50px;">
					<u-col span="1">
						<view class="demo-layout bg-purple">
							<image src="../../images/user/phone.png" style="width: 18px;height: 18px;" mode="">
							</image>
						</view>
					</u-col>
					<u-col span="10">
						<view class="demo-layout bg-purple-light">
							<u-input v-model="tel" type="text" :border="false" placeholder='联系电话' />
						</view>
					</u-col>
					<u-col span="1">
						<view class="demo-layout bg-purple-dark"></view>
					</u-col>
				</u-row>
			</view>
		</view>

		<u-button type="primary" shape="circle" style="margin-left: 10px; margin-right: 10px; margin-top: 80px;"
			@click="submit">保存
		</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				address: '',
				contacts: '',
				tel: '',
				show: false,
				province: '请选择省市区',
				city: '',
				area: '',
				oldpProvinceDataList: [],
				newProvinceDataList: [
					[],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
				// select: '选择省市区',
				temp_cityArr: [],
				cityData3: [],
				addressData: {
					name: '',
					phone: '',
					address: ''
				},
				quiId: '',
				address_id: null
			}
		},
		onLoad() {

		},
		created() {
			this.get_city()
		},
		methods: {
			// 省市区确认事件
			pickerChange(e) {
				this.multiIndex = e.detail.value;
				// 数组内的下标
				// console.log(this.multiIndex);
				// 获取省
				// console.log(this.newProvinceDataList[0][this.multiIndex[0]])
				// 获取市
				// console.log(this.newProvinceDataList[1][this.multiIndex[1]])
				// 获取区
				this.province = this.newProvinceDataList[0][this.multiIndex[0]];
				this.city = this.newProvinceDataList[1][this.multiIndex[1]];
				this.area = this.newProvinceDataList[2][this.multiIndex[2]]
				if (this.province == '香港' || this.province == '澳门') {
					mui.toast("该区域暂未开通不支持设为地址");
					return false;
				}
				// console.log(this.quiId)
			},
			pickerColumnchange(e) {
				// 第几列滑动
				// console.log(e.detail.column);
				// 第几列滑动的下标
				// console.log(e.detail.value)
				// 第一列滑动
				if (e.detail.column === 0) {
					this.multiIndex[0] = e.detail.value
					this.newProvinceDataList[1] = this.oldpProvinceDataList[this.multiIndex[0]].children.map((item,
						index) => {
						return item.text
					})
					if (this.oldpProvinceDataList[this.multiIndex[0]].children.length === 1) {
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].children[0].children
							.map((item,
								index) => {
								return item.text
							})
						this.quiId = this.oldpProvinceDataList[this.multiIndex[0]].children[0].children[0].value;

					} else {
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].children[this
							.multiIndex[
								1]].children.map((item, index) => {
							return item.text
						})
						this.quiId = this.oldpProvinceDataList[this.multiIndex[0]].children[this
							.multiIndex[1]].children[0].value
					}
					// 第一列滑动  第二列 和第三列 都变为第一个
					this.multiIndex.splice(1, 1, 0)
					this.multiIndex.splice(2, 1, 0)
				}
				// 第二列滑动
				if (e.detail.column === 1) {
					this.multiIndex[1] = e.detail.value
					this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].children[this.multiIndex[
							1]]
						.children.map((item, index) => {
							return item.text
						})
					// 第二列 滑动 第三列 变成第一个
					this.quiId = this.oldpProvinceDataList[this.multiIndex[0]].children[this.multiIndex[1]].children[0]
						.value;
					this.multiIndex.splice(2, 1, 0)
				}
				// 第三列滑动
				if (e.detail.column === 2) {
					this.multiIndex[2] = e.detail.value
					console.log(e.detail)
					this.quiId = this.oldpProvinceDataList[this.multiIndex[0]].children[this.multiIndex[1]].children[this
						.multiIndex[2]].value;
				}
			},
			//获取城市数据
			get_city() {
				var data = {}
				api.get_city(data).then(res => {
					var temp_cityArr = res.data.info;
					var temp_sheng = [];
					var temp_city = [];
					var temp_qug = [];
					for (var i = 0; i < temp_cityArr.length; i++) {
						if (temp_cityArr[i].level == 1) {
							temp_sheng.push(temp_cityArr[i])
						}
						if (temp_cityArr[i].level == 2) {
							temp_city.push(temp_cityArr[i])
						}
						if (temp_cityArr[i].level == 3) {
							temp_qug.push(temp_cityArr[i])
						}
					}

					//制作二级和三级的联动
					temp_city.forEach((item, index) => {
						item.children = [];
						temp_qug.forEach((items) => {
							if (item.id == items.parent_id) {
								let json = {};
								json.value = items.id;
								json.text = items.name;
								item.children.push(json);
							}
						})
					})
					//制作一级和二级的联动
					temp_sheng.forEach((item, index) => {
						item.children = [];
						temp_city.forEach((items) => {
							if (item.id == items.parent_id) {
								let json = {};
								json.value = items.id;
								json.text = items.name;
								json.children = items.children;
								item.children.push(json);
							}
						})
					})
					this.oldpProvinceDataList = temp_sheng.map(item => {
						return {
							value: item.id,
							text: item.name,
							children: item.children
						}
					})
					// 吧数据放入对应的列表
					for (let i = 0; i < this.oldpProvinceDataList.length; i++) {
						this.newProvinceDataList[0].push(this.oldpProvinceDataList[i].text);
					}
					for (let i = 0; i < this.oldpProvinceDataList[0].children.length; i++) {
						this.newProvinceDataList[1].push(this.oldpProvinceDataList[0].children[i].text);
					}
					for (let i = 0; i < this.oldpProvinceDataList[0].children[0].children.length; i++) {
						this.newProvinceDataList[2].push(this.oldpProvinceDataList[0].children[0].children[i]
							.text);
					}
					this.quiId = this.oldpProvinceDataList[0].children[0].children[0].value
				})
			},
			//保存
			submit() {
				if (this.province == '请选择省市区') {
					this.$refs.uToast.show({
						title: '省市区不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.address == '') {
					this.$refs.uToast.show({
						title: '详细地址不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.contacts == '') {
					this.$refs.uToast.show({
						title: '联系人不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				if (this.tel == '') {
					this.$refs.uToast.show({
						title: '联系电话不能为空',
						type: 'default',
						position: 'bottom'
					})
					return false
				}
				var group_code = uni.getStorageSync("group_code")
				var submitData = {
					self_id: this.address_id,
					pro: this.province,
					city: this.city,
					area: this.area,
					qu: this.quiId,
					group_code: group_code,
					address: this.address,
					contacts: this.contacts,
					tel: this.tel
				};
				api.api_address_addAddress(submitData).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
						uni.$emit('address')
						uni.navigateBack()
						
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'default',
							position: 'bottom'
						})
					}
				})
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
	.content {
		padding-left: 20px;
		padding-right: 20px;
		background-color: white;
		margin-top: 10px;
	}
</style>
