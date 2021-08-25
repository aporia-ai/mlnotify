<template>
	<div class="flex justify-center p-2">
		<div class="text-grey-7 flex justify-center items-center text-xs md:text-base">
			<div>Made with</div>
			<div>
				<HeartIcon class="heart block w-5 h-3 md:h-5 md:mx-1 text-red fill-current" />
			</div>
			<div>by</div>
			<a
				href="https://aporia.com"
				target="_blank"
				class="block transition-opacity hover:opacity-70"
				@click="goTo('https://aporia.com')"
			>
				<AporiaLogo alt="Aporia" class="block ml-2 h-5 md:h-7" />
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeartIcon from '../assets/icons/heart.svg'
import AporiaLogo from '../assets/aporia/logo-with-text.svg'

export default Vue.extend({
	name: 'AppFooter',
	components: {
		HeartIcon,
		AporiaLogo,
	},
	methods: {
		goTo(url: string) {
			this.$gtag.event('click', {
				event_category: 'outbound',
				event_label: url,
				transport_type: 'beacon',
			})
		},
	},
})
</script>
<style lang="scss" scoped>

</style>
