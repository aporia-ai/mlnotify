<template>
	<div class="text-center">
		<template v-for="(num, idx) in displayedNumber">
			<div :key="num + idx" class="card font-orelega text-5xl px-4 py-3 rounded inline-block">
				{{ num }}
			</div>
			<div
				:key="num + idx + 'comma'"
				class="inline-block text-2xl align-bottom comma mx-1 mb-1"
				:class="{ 'text-transparent': !shouldShowComma(displayedNumber, idx) }"
			>
				,
			</div>
		</template>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'Count',
	props: {
		count: {
			type: Number,
			required: true,
			validator: count => count >= 0,
		},
	},
	computed: {
		displayedNumber(): string[] {
			let num = this.count
			const arr = []

			if (num === 0) return ['0']

			while (num > 0) {
				arr.unshift('' + (num % 10))
				num = Math.floor(num / 10)
			}
			return arr
		},
	},
	methods: {
		shouldShowComma(displayedNumber: string[], idx: number): boolean {
			const isLast = displayedNumber.length === idx + 1
			const shouldShowComma = (displayedNumber.length - (idx + 1)) % 3 === 0
			console.log(isLast, shouldShowComma, idx)
			return shouldShowComma && !isLast
		},
	},
})
</script>
<style lang="scss" scoped>
.card {
	box-shadow: 0px 0px 0.8383233547210693px 0px rgba(0, 0, 0, 0.04),
		0px 6.706586837768555px 5.029940128326416px 0px rgba(0, 0, 0, 0.04),
		0px 0px 20.119760513305664px 0px rgba(0, 0, 0, 0.06);
}
.comma {
	line-height: 0;
}
</style>
