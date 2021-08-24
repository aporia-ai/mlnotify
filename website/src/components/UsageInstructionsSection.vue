<template>
	<section>
		<div class="font-orelega md:text-lg text-xs md:mb-4 mb-3">1. Install package</div>
		<CodeBlock>pip3 install mlnotify</CodeBlock>
		<div class="font-orelega md:text-lg text-xs md:mb-4 mb-3">2. Import package to code</div>
		<CodeBlock>import mlnotify</CodeBlock>
		<div class="font-orelega md:text-lg text-xs">3. Start training and copy the training code</div>
	</section>
</template>
<script lang="ts">
import Vue from 'vue'

import CodeBlock from './CodeBlock.vue'
export default Vue.extend({
	name: 'UsageInstructionsSection',
	components: {
		CodeBlock,
	},
})
</script>
