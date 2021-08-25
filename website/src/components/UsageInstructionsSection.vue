<template>
	<section>
		<div class="font-orelega md:text-lg text-xs md:mb-4 mb-3">1. Install package</div>
		<CodeBlock class="md:mb-10 mb-6"><pre>pip3 install mlnotify</pre></CodeBlock>
		<div class="font-orelega md:text-lg text-xs md:mb-4 mb-3">2. Import package to code</div>
		<CodeBlock class="md:mb-10 mb-6"><pre>import mlnotify</pre></CodeBlock>
		<div class="font-orelega md:text-lg text-xs md:mb-4 mb-3">3. Run your model's training</div>
		<CodeBlock class="md:mb-5 mb-3"><pre>model.fit(X_train, y_train, ...)</pre></CodeBlock>
		<div class="text-xs ">...or just run <pre class="text-blue-1 inline">mlnotify.start()</pre> to test it quickly :)</div>
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
