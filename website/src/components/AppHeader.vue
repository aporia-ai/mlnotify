<template>
	<div class="app-header bg-black text-white-0 py-2 md:px-10 px-4">
		<div class="md:h-20 h-8 flex justify-center items-center">
			<div class="flex-1"></div>
			<div>
				<RouterLink to="/">
					<LogoWithText class="flex-auto md:h-12 h-7" />
				</RouterLink>
			</div>
			<div class="flex-1 flex flex-row justify-end items-center md:divide-x-2 md:divide-white-0">
				<a
					href="https://www.aporia.com/meet-mlnotify/"
					target="_blank"
					class="text-sm pr-3 "
				>
					<span class="hidden md:inline-block">The story behind MLNotify</span>
				</a>
				<a
					href="https://github.com/aporia-ai/mlnotify"
					target="_blank"
					class="transition-opacity hover:opacity-70 text-right text-sm pl-3"
				>
					<GithubIcon class="fill-current github-icon inline-block" />
					<span class="hidden md:inline-block ml-3">Github</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../assets/logo-with-text.svg'
import GithubIcon from '../assets/icons/github.svg'

export default Vue.extend({
	name: 'AppHeader',
	components: {
		LogoWithText,
		GithubIcon,
	},
})
</script>
<style lang="scss" scoped>
.header {
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.02), 0px 1px 10px rgba(0, 0, 0, 0.04), 0px 2px 24px rgba(0, 0, 0, 0.02);
}
.github-icon {
	width: 22px;
	height: 22px;
}
</style>
