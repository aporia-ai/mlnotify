<template>
	<div class="layout text-black min-h-screen flex flex-col bg-grey-2 hover:layout-small">
		<AppHeader class="flex-grow-0" />
		<div class="flex-1">
			<slot />
		</div>
		<AppFooter class="flex-grow-0" />
	</div>
</template>

<script>
import Vue from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default Vue.extend({
	name: 'Default',
	components: {
		AppHeader,
		AppFooter,
	},
})
</script>
<style lang="scss">
.layout {
	background: url('../assets/bg/desktop/top-left.png') 0% 100px no-repeat,
		url('../assets/bg/desktop/bottom-left.png') bottom left no-repeat,
		url('../assets/bg/desktop/bottom-right.png') bottom right no-repeat;

	@media only screen and (max-width: 800px) {
		background: url('../assets/bg/mobile/top-left.png') 0% 100px no-repeat,
			url('../assets/bg/mobile/bottom-left.png') bottom left no-repeat,
			url('../assets/bg/mobile/bottom-right.png') right no-repeat;
	}
}
.layout-small {
	background: red;
}
</style>
