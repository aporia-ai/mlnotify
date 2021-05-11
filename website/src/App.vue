<template>
	<Layout>
		<Transition name="fade" mode="out-in">
			<RouterView :key="$route.path" />
		</Transition>
	</Layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'App',
	metaInfo() {
		return {
			title: this.$static.metadata.siteName,
			meta: [
				{
					key: 'description',
					name: 'description',
					content: this.$static.metadata.siteDescription,
				},
			],
		}
	},
})
</script>

<static-query>
query {
	metadata {
		siteName
		siteDescription
	}
}
</static-query>
