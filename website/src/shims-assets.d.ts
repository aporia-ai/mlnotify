declare module '*.png' {
	const img = ''
	export default img
}

declare module '*.svg' {
	import Vue, { VueConstructor } from 'vue'
	const content: VueConstructor<Vue>
	export default content
}
declare module '*.svg?vueComponent' {
	import Vue, { VueConstructor } from 'vue'
	const content: VueConstructor<Vue>
	export default content
}

declare module '*.jpg' {
	const img = ''
	export default img
}
declare module '*.jpeg' {
	const img = ''
	export default img
}
