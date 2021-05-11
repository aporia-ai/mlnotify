<template>
	<Transition name="fade">
		<div
			v-if="modelValue"
			class="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black-05-opacity"
			@click="$emit('close')"
		>
			<div class="bg-white-0 rounded-lg text-center m-8 p-4" @click.stop>
				<div class="text-right">
					<XIcon class="inline-block h-6 md:h-8 cursor-pointer" @click="$emit('close')" />
				</div>
				<div class="px-4 pb-2">
					<div class="text-2xl mb-2 font-bold">Never miss a thing</div>
					<div class="mb-11 text-grey-7">Get notified whenever there is a news alert in your area</div>
					<NotificationIcon class="inline-block mb-11" />
					<button
						class="rounded-lg bg-blue-1 w-full p-2 text-white-0 md:text-lg text-sm hover:opacity-70 transition-opacity"
						@click="$emit('approve')"
					>
						Yes Definitely!
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>
<script lang="ts">
import Vue from 'vue'

import NotificationIcon from '../assets/icons/notification.svg'
import XIcon from '../assets/icons/x.svg'

export default Vue.extend({
	name: 'MobileNotificationDialog',
	components: {
		NotificationIcon,
		XIcon,
	},
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
	},
})
</script>
