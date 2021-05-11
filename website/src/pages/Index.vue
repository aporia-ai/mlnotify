<template>
	<main class="p-4 flex flex-col justify-between">
		<div>
			<h1 class="font-orelega text-center text-6xl mt-16 mb-4">Get notified when fit() is complete</h1>
			<h2 class="text-xl text-center mb-10">Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</h2>
			<Count class="mb-6" :count="statistics.totalTrainingsCount"></Count>
			<div class="text-center text-grey-1 text-xl">
				The amount of training so far
			</div>
		</div>
		<div>
			<div class="flex justify-around">
				<UsageInstructionsSection class="mx-4" />
				<EnterCodeSection v-model="code" class="mx-4" />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import Count from '../components/Count.vue'
import EnterCodeSection from '../components/EnterCodeSection.vue'
import UsageInstructionsSection from '../components/UsageInstructionsSection.vue'

export default Vue.extend({
	name: 'Index',
	components: {
		Count,
		EnterCodeSection,
		UsageInstructionsSection,
	},
	data() {
		return { code: '' }
	},
	computed: {
		...mapGetters({ statistics: 'statistics' }),
	},
})
</script>
