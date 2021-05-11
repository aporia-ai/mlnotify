<template>
	<div class="text-center">
		<template v-for="(num, idx) in displayedNumber">
			<div
				:key="num + idx"
				class="card font-orelega md:text-5xl md:px-4 md:py-3 text-xl px-3 py-1 rounded inline-block mb-1"
			>
				{{ num }}
			</div>
			<div
				v-if="!(idx + 1 === displayedNumber.length)"
				:key="num + idx + 'comma'"
				class="inline-block text-lg md:text-2xl align-bottom comma md:mx-1 mb-2"
			>
				{{ (displayedNumber.length - (idx + 1)) % 3 === 0 ? ',' : '' }}
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
	width: 8px;
}
</style>
