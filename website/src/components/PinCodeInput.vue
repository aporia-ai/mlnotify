<template>
	<div class="pin-code-input flex justify-center md:space-x-3 space-x-1 sm:space-x-2">
		<div
			v-for="(_, index) in codeLength"
			:key="index"
			class="digit-container py-3 md:py-5 flex justify-center bg-blue-2 rounded-lg flex-1"
		>
			<input
				ref="digits"
				v-model="digitsArray[index]"
				class="digit outline-none bg-transparent font-orelega text-3xl md:text-4xl text-center"
				type="tel"
				pattern="[0-9]"
				:autofocus="autoFocus && index === 0"
				maxlength="1"
				autocomplete="off"
				spellcheck="false"
				:disabled="disabled"
				@input="onValueChange(index)"
				@paste="onPaste($event, index)"
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
		onPaste(event: ClipboardEvent, index: number) {
			if (!event.clipboardData) return

			const remainingInputLength = this.codeLength - index
			const pastedText = event.clipboardData
				.getData('text')
				.split('')
				.filter(char => {
					return !isNaN(+char) && char !== ' '
				})
				.map(char => +char + '') // Make sure they are indeed all numbers
				.slice(0, remainingInputLength)

			this.digitsArray.splice(index, pastedText.length, ...pastedText)

			const element = (this.$refs.digits as HTMLInputElement[])[pastedText.length - 1 + index]
			element.focus()
		},
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
	width: 100%;
	max-width: 2.75rem;
}
.digit-container {
	aspect-ratio: 58/90;
}
</style>
