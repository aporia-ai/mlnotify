import { ClientApiConstructor } from './types'

import DefaultLayout from './layouts/Default.vue'
import './styles/index.scss'

const client: ClientApiConstructor = async function(Vue: Vue.VueConstructor): Promise<void> {
	Vue.component('Layout', DefaultLayout)
}

export default client
