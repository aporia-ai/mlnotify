<template>
	<div class="inline-block my-4" style="font-size:inherit" :style="{ width: `${width}px` }">
		<Transition :name="transition" mode="out-in">
			<slot :option="currentOption" :options="options">
				<span :key="currentOption" class="inline-block text-blue-1">{{ currentOption }}</span>
			</slot>
		</Transition>
		<span ref="widthChecker" style="font-size:inherit" class="invisible absolute inline-block text-blue-1"></span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import isEqual from 'lodash/isEqual'

export default Vue.extend({
	name: 'ChangingText',
	props: {
		interval: {
			type: Number,
			default: 3 * 1000,
		},
		options: {
			type: Array as () => string[],
			required: true,
		},
		transition: {
			type: String,
			default: 'fade-up',
		},
	},
	data() {
		return {
			currentOptionIndex: 0,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			intervalToken: null as any,
			resizeObserver: null as null | ResizeObserver,
			width: 0,
		}
	},
	computed: {
		currentOption(): string {
			return this.options[this.currentOptionIndex]
		},
	},
	watch: {
		options: {
			handler(newValue, oldValue) {
				if (!isEqual(newValue, oldValue)) {
					this.calcWidth()
				}
			},
		},
	},
	mounted() {
		this.calcWidth()
		this.resizeObserver = new ResizeObserver(() => this.calcWidth())
		this.resizeObserver.observe(this.$el)

		this.intervalToken = setInterval(() => {
			const isLast = this.currentOptionIndex === this.options.length - 1

			if (isLast) this.currentOptionIndex = 0
			else this.currentOptionIndex++
		}, this.interval)
	},
	destroyed() {
		clearInterval(this.intervalToken)
		if (this.resizeObserver) this.resizeObserver.disconnect()
	},
	methods: {
		calcWidth() {
			const elWidthChecker = this.$refs.widthChecker as HTMLElement
			let width = 0
			if (!elWidthChecker) return

			this.options.forEach(option => {
				elWidthChecker.innerText = option
				width = width < elWidthChecker.clientWidth ? elWidthChecker.clientWidth : width
			})

			this.width = width
			elWidthChecker.innerText = ''
		},
	},
})
</script>

<style lang="scss" scoped>
.fade-up-enter-active,
.fade-up-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter {
	opacity: 0;
	transform: translateY(2rem);
}
.fade-up-leave-to {
	opacity: 0;
	transform: translateY(-2rem);
}
</style>
