<template>
	<div class="flex justify-center p-2">
		<div class="text-grey-7 flex justify-center items-center text-xs md:text-base">
			<div>Made with</div>
			<div>
				<HeartIcon class="heart block w-5 h-3 md:h-5 md:mx-1 text-red fill-current" />
			</div>
			<div>by</div>
			<a href="https://aporia.com" target="_blank" class="block transition-opacity hover:opacity-70">
				<AporiaLogo alt="Aporia" class="block ml-2 h-5 md:h-7" />
			</a>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import HeartIcon from '../assets/icons/heart.svg'
import AporiaLogo from '../assets/aporia/logo-with-text.svg'

export default Vue.extend({
	name: 'AppFooter',
	components: {
		HeartIcon,
		AporiaLogo,
	},
})
</script>
<style lang="scss" scoped>
.heart {
	@keyframes heartbeat {
		0% {
			transform: scale(0.75);
		}
		10% {
			transform: scale(1);
		}
		20% {
			transform: scale(0.75);
		}
		30% {
			transform: scale(1);
		}
		40% {
			transform: scale(0.75);
		}
		50% {
			transform: scale(0.75);
		}
		100% {
			transform: scale(0.75);
		}
	}
	animation: heartbeat 2s infinite ease;
}
</style>
