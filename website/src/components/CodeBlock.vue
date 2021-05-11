<template>
	<div
		class="code-block rounded-lg bg-grey-5 w-full md:pl-5 md:pr-3 md:py-4 pr-3 py-2 pl-5 text-grey-7 flex justify-between items-center md:mb-10 mb-6 text-xs md:text-base"
	>
		<div ref="code"><slot /></div>
		<div>
			<Transition name="fade">
				<span v-if="shouldShowCopyText" class="align-middle text-blue-1 font-semibold md:text-sm text-xs"
					>Copied</span
				>
			</Transition>
			<button
				class="cursor-pointer hover:opacity-80 transition-colors"
				:class="{ 'text-blue-1': shouldShowCopyText }"
			>
				<CopyIcon class="inline-block md:h-8 h-6" @click="copy" />
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

import CopyIcon from '../assets/icons/copy.svg'
export default Vue.extend({
	name: 'CodeSnippet',
	components: {
		CopyIcon,
	},
	data() {
		return {
			shouldShowCopyText: false,
			timeoutToken: null as null | ReturnType<typeof setTimeout>,
		}
	},
	destroyed() {
		if (this.timeoutToken !== null) clearTimeout(this.timeoutToken)
	},
	methods: {
		copy() {
			if (this.timeoutToken !== null) clearTimeout(this.timeoutToken)

			const el = this.$refs.code as HTMLElement
			this.copyToClipboard(el.innerText)
			this.shouldShowCopyText = true

			this.timeoutToken = setTimeout(() => {
				this.shouldShowCopyText = false
			}, 1000)
		},
		copyToClipboard(text: string) {
			const textArea = document.createElement('textarea')
			textArea.value = text

			textArea.style.top = '0'
			textArea.style.left = '0'
			textArea.style.position = 'fixed'
			textArea.style.opacity = '0'

			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			document.execCommand('copy')
			document.body.removeChild(textArea)
		},
	},
})
</script>
<style lang="scss" scoped>
.code-block {
	box-shadow: 5px 5px 20px 0px rgba(174, 174, 192, 0.5), -5px -5px 20px 0px rgba(255, 255, 255, 1);
}
</style>
