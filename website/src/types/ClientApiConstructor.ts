import { VueConstructor } from 'vue'
import { ClientContext } from './ClientContext'

export type ClientApiConstructor = (_Vue: VueConstructor, _context: ClientContext) => void
