<template>
	<div></div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Page404',
	beforeMount() {
		this.$router.replace({ name: 'home' })
	},
})
</script>
