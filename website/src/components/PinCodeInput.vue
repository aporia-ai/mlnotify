<template>
	<div class="pin-code-input flex">
		<div v-for="(_, index) in codeLength" :key="index" class="digit-container bg-blue-2 p-5 mr-3 rounded-lg">
			<input
				ref="digits"
				v-model="digitsArray[index]"
				class="digit outline-none bg-transparent font-orelega text-4xl"
				type="tel"
				pattern="[0-9]"
				:autofocus="autoFocus && !loading && index === 0"
				maxlength="1"
				:disabled="disabled"
				@input="onValueChange(index)"
				@focus="onFocus($event, index)"
				@keydown="onKeyDown($event, index)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

/* eslint-disable no-unused-vars */
// For some reason, ESLint says this enum is unused, hence the eslint-disable
enum KeyCode {
	Backspace = 8,
	Left = 37,
	Right = 39,
	Up = 38,
	Down = 40,
}
/* eslint-enable no-unused-vars */

export default Vue.extend({
	name: 'PinCodeInput',
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	props: {
		modelValue: {
			type: String,
			required: true,
		},
		autoFocus: {
			type: Boolean,
			default: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		codeLength: {
			type: Number,
			default: 6,
		},
	},
	data() {
		return {
			digitsArray: new Array(6).fill(''),
		}
	},
	watch: {
		modelValue: {
			handler(newValue: string) {
				if (newValue === this.digitsArray.join('')) return

				this.digitsArray = Object.assign(new Array(6).fill(''), (newValue + '').split(''))
			},
			immediate: true,
		},
		digitsArray: {
			handler(newValue) {
				const newModelValue = newValue.join('')
				if (this.modelValue === newModelValue) return

				this.$emit('update:modelValue', newModelValue)
				if (newValue.length === this.codeLength) {
					this.$emit('done', newModelValue)
				}
			},
		},
	},
	methods: {
		onFocus(e: FocusEvent): void {
			const target = e.target as HTMLInputElement
			target.select()
		},
		onValueChange(index: number): void {
			this.digitsArray[index] = this.digitsArray[index].replace(/[^\d]/gi, '')

			if (this.digitsArray[index] && index < 5) {
				const element = (this.$refs.digits as HTMLInputElement[])[index + 1]
				element.focus()
				element.select()
			}
		},
		onKeyDown(e: KeyboardEvent, index: number): void {
			switch (e.keyCode) {
				case KeyCode.Backspace: {
					if (!this.digitsArray[index] && index > 0) {
						const element = (this.$refs.digits as HTMLInputElement[])[index - 1]
						element.focus()
						element.select()
					}
					break
				}
				case KeyCode.Left:
					e.preventDefault()
					if (index > 0) {
						const element = (this.$refs.digits as HTMLInputElement[])[index - 1]
						element.focus()
					}
					break
				case KeyCode.Right:
					e.preventDefault()
					if (index < 5) {
						const element = (this.$refs.digits as HTMLInputElement[])[index + 1]
						element.focus()
					}
					break
				case KeyCode.Up:
				case KeyCode.Down:
					e.preventDefault()
					break
			}
		},
	},
})
</script>
<style lang="scss" scoped>
.digit {
	width: 22px;
}
</style>
