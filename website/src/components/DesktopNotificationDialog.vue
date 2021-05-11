<template>
	<Transition name="fade">
		<div
			v-if="modelValue"
			class="fixed top-0 left-0 p-40 h-screen w-screen flex justify-center items-center bg-black-05-opacity"
		>
			<div class="text-white-0 w-1/2">
				<div class="relative text-center pl-4">
					<PermissionsArrowIcon class="permissions-arrow absolute right-full bottom-1/2" />
					<div class="text-2xl mb-3">Click on Allow to receive notification</div>
					<div>Stay updated .......</div>
				</div>
			</div>
		</div>
	</Transition>
</template>
<script lang="ts">
import Vue from 'vue'

import PermissionsArrowIcon from '../assets/icons/permission-arrow.svg'
export default Vue.extend({
	name: 'DesktopNotificationDialog',
	components: {
		PermissionsArrowIcon,
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
<style lang="scss" scoped>
.permissions-arrow {
	width: 271px;
	max-width: 50%;
}
</style>
