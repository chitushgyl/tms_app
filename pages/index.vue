<template>
	<view class="content">
		<carInfo></carInfo>
		<line></line>
	</view>
</template>

<script>
	import carInfo from './pages/3pl_user/car_info.vue';
	import line from './pages/3pl_line/index.vue';
	export default {
		data() {
			return {}
		},
		components: {
			carInfo,
			line
		}
	}
</script>

<style>
</style>
