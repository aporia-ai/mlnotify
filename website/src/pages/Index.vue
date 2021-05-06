<template>
	<Layout class="text-4xl">
		Index Page 3
		{{ $store.state.statistics }}
	</Layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Index',
})
</script>
