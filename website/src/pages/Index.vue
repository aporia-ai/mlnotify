<template>
	<Layout>
		<main class="p-4">
			<h1 class="font-orelega text-center text-6xl mt-16">Get notified when fit() is complete</h1>
			<!-- // TODO -->
			<h2 class="text-xl text-center mt-4">Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</h2>
			<Count class="mt-10" :count="1002"></Count>
		</main>
	</Layout>
</template>

<script lang="ts">
import Vue from 'vue'

import Count from '../components/Count.vue'

export default Vue.extend({
	name: 'Index',
	components: {
		Count,
	},
})
</script>
<style lang="scss" scoped>
.num {
	box-shadow: 0px 0px 0.8383233547210693px 0px rgba(0, 0, 0, 0.04),
		0px 6.706586837768555px 5.029940128326416px 0px rgba(0, 0, 0, 0.04),
		0px 0px 20.119760513305664px 0px rgba(0, 0, 0, 0.06);
}
</style>
