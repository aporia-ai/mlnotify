import VueRouter from 'vue-router'
import { MetaInfo } from 'vue-meta'

export interface ClientContext {
	appOptions: Record<string, unknown>
	router: VueRouter
	head: MetaInfo
	isClient: boolean
}
