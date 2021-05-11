<template>
	<section class="enter-code-section bg-white-0 py-8 px-4">
		<h3 class="font-orelega text-2xl mb-10 text-center">Enter the ID Training Code here</h3>
		<PinCodeInput v-model="code" class="mb-10" @keyup.enter.native="submit" />
		<button
			class="rounded-lg bg-blue-1 w-full p-2 text-white-0 text-2xl hover:opacity-70 transition-opacity"
			@click="submit"
		>
			Get Notified
		</button>
	</section>
</template>
<script lang="ts">
import Vue from 'vue'
import PinCodeInput from './PinCodeInput.vue'
export default Vue.extend({
	name: 'EnterCodeSection',
	components: { PinCodeInput },
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	props: {
		modelValue: {
			type: String,
			required: true,
		},
	},
	computed: {
		code: {
			get(): string {
				return this.modelValue
			},
			set(newVal: string): void {
				this.$emit('update:modelValue', newVal)
			},
		},
	},
	methods: {
		submit() {
			if (this.code.length < 6) return

			this.$router.push(`/training/${this.code}`)
		},
	},
})
</script>
<style lang="scss" scoped>
.enter-code-section {
	box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 8px 6px 0px rgba(0, 0, 0, 0.04),
		0px 0px 24px 0px rgba(0, 0, 0, 0.06);
}
</style>
