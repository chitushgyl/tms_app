<template>
	<view class="user_guide">
		<u-navbar :is-back="false" :border-bottom='false' title="用户指南">
			<view class="slot-wrap" style="margin-left: 10px;">
				<u-icon name="arrow-leftward" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<h4 style=''>功能先进、优势明显</h4>
			<p>
				功能先进、优势明显：一是基于全国范围互联互通，信息共享；二是操作便捷简单，方便货主、车主使用；三是应用现时代移动互联网技术，具有超前性，颠覆了传统物流运营模式和习惯。同时，在生活、金融、信息、技术等领域提供了增值服务；四是理念先进，节省时间，提高效率，能有效降低社会物流成本。
			</p>
			<p style='margin-top: 20px;'>
				总之，【赤途供应链】信息平台解决了公路运输物流市场车、货配载环节的主要矛盾，为物流市场信息不对称现状提供了关键解决方案，创新了物流经营模式，是物流转型升级的需要，是现代物流发展的必然产物。</p>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page {
		background-color: #F3F4F6;
	}
</style>
<style lang="scss" scoped>
	.content {
		width: 90%;
		margin: 20px auto 0px;

		h4 {
			font-size: 17px;
			font-weight: 600;
			margin-bottom: 20px;
		}

		p {
			color: gray;
			text-indent: 35px;
			line-height: 25px;
		}
	}
</style>
