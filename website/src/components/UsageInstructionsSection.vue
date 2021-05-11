<template>
	<section>
		<div class="font-orelega text-lg mb-4">1. Install package</div>
		<div
			class="code-block rounded-lg bg-grey-5 w-full pl-5 pr-3 py-4 text-grey-7 flex justify-between items-center mb-10"
		>
			<div>pip install mlnotify</div>
			<CopyIcon class="inline-block" />
		</div>
		<div class="font-orelega text-lg mb-4">2. Import package to code</div>
		<div
			class="code-block rounded-lg bg-grey-5 w-full pl-5 pr-3 py-4 text-grey-7 flex justify-between items-center mb-10"
		>
			<div>import mlnotify</div>
			<CopyIcon class="inline-block" />
		</div>
		<div class="font-orelega text-lg">3. Start training and copy the training code</div>
	</section>
</template>
<script lang="ts">
import Vue from 'vue'

import CopyIcon from '../assets/icons/copy.svg'
export default Vue.extend({
	name: 'UsageInstructionsSection',
	components: {
		CopyIcon,
	},
})
</script>
<style lang="scss" scoped>
.code-block {
	box-shadow: 5px 5px 20px 0px rgba(174, 174, 192, 0.5), -5px -5px 20px 0px rgba(255, 255, 255, 1);
}
</style>
