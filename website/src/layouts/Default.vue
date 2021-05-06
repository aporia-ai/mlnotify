<template>
	<div class="layout text-black">
		<AppHeader />
		<slot />
	</div>
</template>

<script>
import Vue from 'vue'
import AppHeader from '../components/AppHeader.vue'

export default Vue.extend({
	name: 'Default',
	components: {
		AppHeader,
	},
})
</script>
<style lang="scss"></style>
