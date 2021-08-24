import Vue from 'vue'
import VueGtag from 'vue-gtag'

declare module 'vue/types/vue' {
	interface Vue {
		$static: any
		$gtag: VueGtag
	}
}
