<template>
	<div></div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
	name: '404',
	beforeMount() {
		this.$router.replace({ name: 'Index' })
	},
})
</script>
