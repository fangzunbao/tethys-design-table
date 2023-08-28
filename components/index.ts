import TethysTable from './lib/tethys-table/src/index.vue'

import type { App, Component } from 'vue'
const components: { [name: string]: Component } = {
  TethysTable,
}
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
