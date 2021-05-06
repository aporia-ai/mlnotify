<template>
	<div class="app-header bg-black text-white py-10 px-16">
		<div class="h-20 flex justify-center items-center">
			<div class="flex-1">asd</div>
			<div class="">
				<LogoWithText class="flex-auto" />
			</div>
			<div class="flex-1 text-right">asd</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import LogoWithText from '../assets/logo-with-text.svg'

export default Vue.extend({
	name: 'AppHeader',
	components: {
		LogoWithText,
	},
})
</script>
<style lang="scss" scoped>
.header {
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.02), 0px 1px 10px rgba(0, 0, 0, 0.04), 0px 2px 24px rgba(0, 0, 0, 0.02);
}
</style>
