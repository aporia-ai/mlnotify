<template>
	<div class="flex items-center lg:mt-6 flex-shrink-0">
		<div>Made with</div>
		<div>
			<Icon name="heart" class="heart block w-5 h-5 mx-2 text-aporiaRed" />
		</div>
		<div>by</div>
		<a href="https://aporia.com" target="_blank" class="block transition-opacity hover:opacity-70">
			<img :src="AporiaLogo" alt="Aporia" class="block ml-3 h-7 lg:h-6" />
		</a>
	</div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
	name: 'Footer',
})
</script>
